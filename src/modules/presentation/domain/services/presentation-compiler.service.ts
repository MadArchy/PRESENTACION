import { ProjectAggregate } from '../../../project/domain/entities/project.aggregate';
import { NarrativePlanEntity } from '../../../narrative/domain/entities/narrative-plan.entity';
import { NarrativeTrustContext } from '../../../narrative/application/use-cases/annotate-narrative-trust.use-case';
import { ClaimEntity } from '../../../claim/domain/entities/claim.entity';
import {
  PresentationProfile,
  PresentationTheme,
  PresentationScene,
  PresentationCompilerWarning,
  PresentationReadiness,
  PresentationTrustSummary,
  ContentBinding,
  TrustBinding,
  MediaBinding,
  SceneType,
  SceneRole
} from '../presentation.types';
import { PresentationDefinitionEntity } from '../entities/presentation-definition.entity';
import { SceneTemplateRegistry } from '../templates/scene-template.registry';

export class PresentationCompiler {
  public static readonly COMPILER_VERSION = '1.0.0';
  public static readonly SCHEMA_VERSION = '1.0';

  compile(
    project: ProjectAggregate,
    narrativePlan: NarrativePlanEntity,
    trustContext: NarrativeTrustContext,
    claims: ClaimEntity[],
    profile: PresentationProfile,
    theme: PresentationTheme
  ): PresentationDefinitionEntity {
    const warnings: PresentationCompilerWarning[] = [];
    const activeVersion = project.getCurrentVersionEntity();
    const steps = narrativePlan.getSteps();

    const claimsBySection = new Map<string, ClaimEntity[]>();
    for (const claim of claims) {
      const sec = claim.getSectionType();
      if (!claimsBySection.has(sec)) claimsBySection.set(sec, []);
      claimsBySection.get(sec)!.push(claim);
    }

    const scenes: PresentationScene[] = [];
    let orderCounter = 1;

    for (const step of steps) {
      const secType = step.getSectionType();
      const secEntity = activeVersion.getSection(secType);

      // 1. Resolve Scene Type from Profile or Registry
      let sceneType: SceneType = profile.scenePreferences[secType] || 'GENERIC_CONTENT';
      if (!SceneTemplateRegistry.has(sceneType)) {
        warnings.push({
          code: 'SCENE_TEMPLATE_FALLBACK',
          severity: 'WARNING',
          message: `SceneType '${sceneType}' not registered. Using GENERIC_CONTENT fallback.`
        });
        sceneType = 'GENERIC_CONTENT';
      }

      const template = SceneTemplateRegistry.get(sceneType);
      const role: SceneRole = (step.getRole() as SceneRole) || template.defaultRole;

      // 2. Build Content Bindings
      const bindings: ContentBinding[] = [];

      const content = (secEntity ? secEntity.getContent() : {}) as any;
      const secTitle = secEntity ? secEntity.getTitle() : { es: step.getTitle(), en: step.getTitle() };
      const secDesc = (content && content.summary) || { es: step.getRationale(), en: step.getRationale() };

      bindings.push({
        id: `binding-${orderCounter}-text`,
        type: 'TEXT',
        sourceType: 'PROJECT_SECTION',
        sourceRef: `section:${secType}`,
        label: secTitle,
        value: secDesc
      });

      if (content.painPoints || content.bullets || content.pillars) {
        const listItems = content.painPoints || content.bullets || content.pillars;
        bindings.push({
          id: `binding-${orderCounter}-bullets`,
          type: 'BULLET_LIST',
          sourceType: 'PROJECT_SECTION',
          sourceRef: `section:${secType}.bullets`,
          value: listItems
        });
      }

      if (content.metrics || content.financials || content.pricing) {
        bindings.push({
          id: `binding-${orderCounter}-metrics`,
          type: 'METRIC_SET',
          sourceType: 'PROJECT_SECTION',
          sourceRef: `section:${secType}.metrics`,
          value: content.metrics || content.financials || content.pricing
        });
      }

      if (content.milestones || content.phases) {
        bindings.push({
          id: `binding-${orderCounter}-roadmap`,
          type: 'ROADMAP',
          sourceType: 'PROJECT_SECTION',
          sourceRef: `section:${secType}.roadmap`,
          value: content.milestones || content.phases
        });
      }

      if (content.risks) {
        bindings.push({
          id: `binding-${orderCounter}-risks`,
          type: 'RISK_LIST',
          sourceType: 'PROJECT_SECTION',
          sourceRef: `section:${secType}.risks`,
          value: content.risks
        });
      }

      if (content.architectureNodes || content.nodes) {
        bindings.push({
          id: `binding-${orderCounter}-nodes`,
          type: 'ARCHITECTURE_NODES',
          sourceType: 'PROJECT_SECTION',
          sourceRef: `section:${secType}.architecture`,
          value: content.architectureNodes || content.nodes
        });
      }

      // 3. Build Trust Bindings from Governed Claims
      const sectionClaims = claimsBySection.get(secType) || [];
      const trustBindings: TrustBinding[] = sectionClaims.map(c => {
        const isUnsupported = c.getSupportStatus() === 'UNSUPPORTED';
        const isContradicted = c.getSupportStatus() === 'CONTRADICTED';
        const isMaterial = c.getMateriality() === 'CRITICAL' || c.getMateriality() === 'HIGH';

        if (c.getType() === 'FACT' && isUnsupported && isMaterial) {
          warnings.push({
            code: 'UNSUPPORTED_FACT_PRESENT',
            severity: 'WARNING',
            sceneId: `scene-${orderCounter}`,
            message: `Scene '${orderCounter}' presents unsupported material fact '${c.getId()}'.`
          });
        }

        return {
          claimId: c.getId(),
          claimType: c.getType(),
          supportStatus: c.getSupportStatus(),
          materiality: c.getMateriality(),
          labelRequired: c.getType() !== 'FACT' || isUnsupported || isContradicted,
          warningCode: isContradicted ? 'CLAIM_CONTRADICTED' : (isUnsupported ? 'FACT_UNSUPPORTED' : undefined),
          message: c.getText().es || c.getText().en
        };
      });

      // 4. Build Media Bindings
      const mediaBindings: MediaBinding[] = [];
      if (template.supportsMedia && secEntity) {
        const media = (content && content.media) || {};
        if (media.images && media.images.length > 0) {
          media.images.forEach((img: any, idx: number) => {
            mediaBindings.push({
              id: `media-${orderCounter}-${idx}`,
              type: 'IMAGE',
              sourceRef: img.url,
              alt: img.caption || secTitle.es || secTitle.en,
              role: 'HERO'
            });
          });
        }
      }

      // 5. Build Scene
      scenes.push({
        id: `scene-${String(orderCounter).padStart(2, '0')}`,
        order: orderCounter,
        type: sceneType,
        role,
        status: sectionClaims.some(c => c.getSupportStatus() === 'CONTRADICTED')
          ? 'BLOCKED'
          : (trustBindings.some(t => t.warningCode) || !secEntity || secEntity.getStatus() === 'DRAFT')
          ? 'READY_WITH_WARNINGS'
          : 'READY',
        title: secTitle,
        eyebrow: {
          es: `SECCIÓN ${String(orderCounter).padStart(2, '0')} · ${secType}`,
          en: `SECTION ${String(orderCounter).padStart(2, '0')} · ${secType}`
        },
        subtitle: secDesc,
        layout: template.defaultLayout,
        bindings,
        trustBindings,
        mediaBindings,
        sourceNarrativeStepId: step.getId(),
        sourceSectionType: secType,
        sourceSectionId: secEntity ? secEntity.getId() : undefined,
        estimatedSeconds: step.getEstimatedSeconds()
      });

      orderCounter++;
    }

    // 6. Compute Presentation Trust Summary
    let totalTargets = 0;
    let totalAssumptions = 0;
    let totalEstimates = 0;
    let totalHypotheses = 0;
    let supportedMaterial = 0;
    let unsupportedMaterial = 0;
    let contradicted = 0;

    for (const c of claims) {
      if (c.getType() === 'TARGET') totalTargets++;
      if (c.getType() === 'ASSUMPTION') totalAssumptions++;
      if (c.getType() === 'ESTIMATE') totalEstimates++;
      if (c.getType() === 'HYPOTHESIS') totalHypotheses++;

      if (c.getSupportStatus() === 'CONTRADICTED') contradicted++;
      if (c.getType() === 'FACT' && (c.getMateriality() === 'CRITICAL' || c.getMateriality() === 'HIGH')) {
        if (c.getSupportStatus() === 'SUPPORTED') supportedMaterial++;
        if (c.getSupportStatus() === 'UNSUPPORTED') unsupportedMaterial++;
      }
    }

    const trustSummary: PresentationTrustSummary = {
      referencedClaims: claims.length,
      supportedMaterialFacts: supportedMaterial,
      unsupportedMaterialFacts: unsupportedMaterial,
      contradictedClaims: contradicted,
      targets: totalTargets,
      assumptions: totalAssumptions,
      estimates: totalEstimates,
      hypotheses: totalHypotheses,
      readiness: trustContext.trustReadiness
    };

    // 7. Derive Presentation Readiness
    let readiness: PresentationReadiness = 'PRESENTATION_READY';
    if (
      narrativePlan.getReadiness() === 'NOT_READY' ||
      trustContext.trustReadiness === 'TRUST_NOT_READY' ||
      scenes.some(s => s.status === 'BLOCKED')
    ) {
      readiness = 'PRESENTATION_NOT_READY';
    } else if (
      narrativePlan.getReadiness() === 'READY_WITH_WARNINGS' ||
      trustContext.trustReadiness === 'TRUST_READY_WITH_WARNINGS' ||
      scenes.some(s => s.status === 'READY_WITH_WARNINGS') ||
      warnings.length > 0
    ) {
      readiness = 'PRESENTATION_READY_WITH_WARNINGS';
    }

    return new PresentationDefinitionEntity({
      id: `pres-${project.getSlug()}-${profile.id}-${theme.id}`,
      projectId: project.getId(),
      projectVersion: activeVersion.getVersion(),
      narrativePlanId: narrativePlan.getId(),
      narrativeProfileId: narrativePlan.getProfileId(),
      narrativeProfileVersion: narrativePlan.getProfileVersion(),
      presentationProfileId: profile.id,
      presentationProfileVersion: profile.profileVersion,
      themeId: theme.id,
      themeVersion: theme.version,
      language: narrativePlan.getRequest().language as 'ES' | 'EN',
      audience: narrativePlan.getRequest().audience,
      objective: narrativePlan.getRequest().objective,
      readiness,
      totalEstimatedSeconds: narrativePlan.getTotalEstimatedSeconds(),
      scenes,
      trustSummary,
      warnings,
      compilerVersion: PresentationCompiler.COMPILER_VERSION,
      schemaVersion: PresentationCompiler.SCHEMA_VERSION,
      generatedAt: new Date().toISOString()
    });
  }
}
