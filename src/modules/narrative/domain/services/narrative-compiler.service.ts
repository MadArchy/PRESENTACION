import { ProjectAggregate } from '../../../project/domain/entities/project.aggregate';
import { ProjectSectionType } from '../../../project/domain/project.types';
import {
  NarrativeRequest,
  NarrativeProfile,
  NarrativeStep,
  NarrativeRole,
  NarrativeGap,
  NarrativeWarning,
  NarrativeReadiness
} from '../narrative.types';
import { NarrativePlanEntity } from '../entities/narrative-plan.entity';
import { AudiencePolicy } from '../policies/audience.policy';
import { ObjectivePolicy } from '../policies/objective.policy';
import { DurationPolicy } from '../policies/duration.policy';
import { OrderingPolicy } from '../policies/ordering.policy';
import { AudienceTypeVo } from '../value-objects/audience-type.vo';
import { NarrativeObjectiveVo } from '../value-objects/narrative-objective.vo';
import { NarrativeDurationVo } from '../value-objects/narrative-duration.vo';
import { NarrativeDepthVo } from '../value-objects/narrative-depth.vo';

export class NarrativeCompiler {
  private readonly audiencePolicy = new AudiencePolicy();
  private readonly objectivePolicy = new ObjectivePolicy();
  private readonly durationPolicy = new DurationPolicy();
  private readonly orderingPolicy = new OrderingPolicy();
  public static readonly ENGINE_VERSION = '1.0.0';

  compile(
    project: ProjectAggregate,
    request: NarrativeRequest,
    profile?: NarrativeProfile
  ): NarrativePlanEntity {
    // 1. Validate Value Objects
    new AudienceTypeVo(request.audience);
    new NarrativeObjectiveVo(request.objective);
    const durationVo = new NarrativeDurationVo(request.duration);
    const depthVo = new NarrativeDepthVo(request.depth);

    const activeVersion = project.getCurrentVersionEntity();
    const audienceDefaults = this.audiencePolicy.getDefaults(request.audience);
    const objectiveModifiers = this.objectivePolicy.getModifiers(request.objective);
    const stepBounds = profile?.durationBudgets?.[request.duration] || durationVo.getTargetStepBounds();
    const preferredOrder = this.orderingPolicy.getPreferredOrder(request.audience);

    const mandatorySections = profile?.mandatorySections || audienceDefaults.mandatorySections;
    const basePriorities: Record<string, number> = profile?.sectionPriorities || audienceDefaults.basePriorities;
    const roleMappings: Record<string, NarrativeRole> = profile?.roleMappings || audienceDefaults.roleMappings;

    const warnings: NarrativeWarning[] = [];
    const gaps: NarrativeGap[] = [];

    // 2. Score Section Relevance
    interface Candidate {
      type: ProjectSectionType;
      score: number;
      isMandatory: boolean;
      isAvailable: boolean;
      isDraft: boolean;
    }

    const candidates: Candidate[] = [];

    for (const secType of preferredOrder) {
      const isMandatory = mandatorySections.includes(secType);
      const basePri = basePriorities[secType] ?? 50;
      const mod = objectiveModifiers[secType] ?? 0;
      const secEntity = activeVersion.getSection(secType);

      const isAvailable = !!secEntity && secEntity.getStatus() !== 'EMPTY' && secEntity.getStatus() !== 'NOT_APPLICABLE';
      const isDraft = !!secEntity && secEntity.getStatus() === 'DRAFT';

      let score = basePri + mod;
      if (isMandatory) score += 50;
      if (!isAvailable) score -= 100;

      candidates.push({
        type: secType,
        score,
        isMandatory,
        isAvailable,
        isDraft
      });

      // Gap detection for mandatory sections
      if (isMandatory && (!secEntity || secEntity.getStatus() === 'EMPTY')) {
        gaps.push({
          id: `gap-${secType.toLowerCase()}`,
          sectionType: secType,
          severity: 'HIGH',
          reason: 'MANDATORY_SECTION_UNAVAILABLE',
          message: `Mandatory section '${secType}' is empty or missing from Project Twin.`
        });
      }
    }

    // 3. Select steps within budget (Duration Compression Order)
    const selectedTypes = new Set<ProjectSectionType>();

    // Step A: Always preserve all available mandatory sections
    candidates
      .filter(c => c.isMandatory && c.isAvailable)
      .forEach(c => selectedTypes.add(c.type));

    // Step B: Add optional sections up to maxSteps budget, ordered by score
    const remainingSlots = Math.max(0, stepBounds.maxSteps - selectedTypes.size);
    candidates
      .filter(c => !selectedTypes.has(c.type) && c.isAvailable)
      .sort((a, b) => b.score - a.score)
      .slice(0, remainingSlots)
      .forEach(c => selectedTypes.add(c.type));

    // Step C: Order selected sections according to narrative arc
    const finalSectionTypes = preferredOrder.filter(t => selectedTypes.has(t));
    const omittedSectionTypes = preferredOrder.filter(t => !selectedTypes.has(t));

    // 4. Calculate normalized step durations matching targetSeconds
    const roles = finalSectionTypes.map(st => roleMappings[st] || 'CONTEXT');
    const calculatedStepSeconds = this.durationPolicy.calculateStepDurations(
      roles,
      depthVo.getValue(),
      stepBounds.targetSeconds
    );

    const steps: NarrativeStep[] = [];
    let orderCounter = 1;
    let totalSeconds = 0;
    const requestedLangLower = (request.language.toLowerCase() as 'es' | 'en');

    finalSectionTypes.forEach((secType, index) => {
      const secEntity = activeVersion.getSection(secType)!;
      const role = roles[index];
      const estSec = calculatedStepSeconds[index] || 30;

      const titleObj = secEntity.getTitle();
      let stepTitle = titleObj[requestedLangLower] || titleObj.es || titleObj.en;
      let isFallback = false;
      let langUsed: 'es' | 'en' = requestedLangLower;

      if (!titleObj[requestedLangLower]) {
        isFallback = true;
        langUsed = requestedLangLower === 'en' ? 'es' : 'en';
        warnings.push({
          code: `WARN_LANG_FALLBACK_${secType}`,
          severity: 'WARNING',
          sectionType: secType,
          message: `Requested language '${request.language}' unavailable for section '${secType}'. Used '${langUsed.toUpperCase()}' fallback.`
        });
      }

      if (secEntity.getStatus() === 'DRAFT') {
        warnings.push({
          code: `INFO_DRAFT_SECTION_${secType}`,
          severity: 'INFO',
          sectionType: secType,
          message: `Section '${secType}' is currently in DRAFT status.`
        });
      }

      steps.push({
        id: `step-${orderCounter}`,
        order: orderCounter,
        role,
        sectionType: secType,
        title: stepTitle,
        priority: basePriorities[secType] ?? 50,
        depth: depthVo.getValue(),
        estimatedSeconds: estSec,
        rationale: `Selected for ${request.audience} audience with ${request.objective} objective (Role: ${role}).`,
        status: secEntity.getStatus() === 'DRAFT' ? 'PARTIAL' : 'READY',
        sourceSectionId: secEntity.getId(),
        languageUsed: langUsed,
        isLanguageFallback: isFallback
      });

      totalSeconds += estSec;
      orderCounter++;
    });

    // 5. Evaluate Duration Timing & Overflows
    const timing = this.durationPolicy.evaluateDuration(stepBounds.targetSeconds, totalSeconds);

    if (timing.status === 'MODERATE_OVERFLOW') {
      warnings.push({
        code: 'DURATION_OVERFLOW',
        severity: 'WARNING',
        message: `Narrative exceeds target duration by ${timing.overflowPercent}% (${timing.overflowSeconds}s over target).`,
        metadata: { ...timing }
      });
    } else if (timing.status === 'CRITICAL_OVERFLOW') {
      warnings.push({
        code: 'DURATION_OVERFLOW_CRITICAL',
        severity: 'CRITICAL',
        message: `Critical duration overflow: narrative exceeds target by ${timing.overflowPercent}% (${timing.overflowSeconds}s over target).`,
        metadata: { ...timing }
      });
    }

    // 6. Evaluate Readiness
    let readiness: NarrativeReadiness = 'READY';
    if (gaps.some(g => g.severity === 'HIGH' || g.severity === 'BLOCKING') || timing.status === 'CRITICAL_OVERFLOW') {
      readiness = 'NOT_READY';
    } else if (warnings.length > 0 || gaps.length > 0 || timing.status === 'MODERATE_OVERFLOW') {
      readiness = 'READY_WITH_WARNINGS';
    }

    return new NarrativePlanEntity({
      id: `plan-${project.getSlug()}-${request.audience.toLowerCase()}-${request.duration.toLowerCase()}`,
      projectId: project.getId(),
      projectVersion: activeVersion.getVersion(),
      profileId: profile?.id || `${request.audience.toLowerCase()}-standard`,
      profileVersion: profile?.profileVersion || '1.0',
      request,
      readiness,
      timing,
      totalEstimatedSeconds: totalSeconds,
      steps,
      warnings,
      gaps,
      omittedSectionTypes,
      generatedAt: new Date().toISOString(),
      engineVersion: NarrativeCompiler.ENGINE_VERSION
    });
  }
}
