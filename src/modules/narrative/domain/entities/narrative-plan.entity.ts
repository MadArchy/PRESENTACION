import { NarrativePlan, NarrativeRequest, NarrativeReadiness, NarrativeWarning, NarrativeGap, NarrativeTiming } from '../narrative.types';
import { ProjectSectionType } from '../../../project/domain/project.types';
import { NarrativeStepEntity } from './narrative-step.entity';
import { NarrativeCompilationError } from '../errors/narrative-domain.error';

export class NarrativePlanEntity {
  private readonly id: string;
  private readonly projectId: string;
  private readonly projectVersion: string;
  private readonly profileId: string;
  private readonly profileVersion: string;
  private readonly request: NarrativeRequest;
  private readonly readiness: NarrativeReadiness;
  private readonly timing: NarrativeTiming;
  private readonly totalEstimatedSeconds: number;
  private readonly steps: NarrativeStepEntity[];
  private readonly warnings: NarrativeWarning[];
  private readonly gaps: NarrativeGap[];
  private readonly omittedSectionTypes: ProjectSectionType[];
  private readonly generatedAt: string;
  private readonly engineVersion: string;

  constructor(data: NarrativePlan) {
    if (!data.id) throw new NarrativeCompilationError('NarrativePlan id cannot be empty');
    if (!data.projectId) throw new NarrativeCompilationError('NarrativePlan projectId cannot be empty');
    if (!data.engineVersion) throw new NarrativeCompilationError('NarrativePlan engineVersion is required');

    this.id = data.id;
    this.projectId = data.projectId;
    this.projectVersion = data.projectVersion;
    this.profileId = data.profileId;
    this.profileVersion = data.profileVersion;
    this.request = { ...data.request };
    this.readiness = data.readiness;
    this.timing = { ...data.timing };
    this.totalEstimatedSeconds = data.totalEstimatedSeconds;
    this.steps = data.steps.map(s => new NarrativeStepEntity(s));
    this.warnings = [...data.warnings];
    this.gaps = [...data.gaps];
    this.omittedSectionTypes = [...data.omittedSectionTypes];
    this.generatedAt = data.generatedAt;
    this.engineVersion = data.engineVersion;
  }

  getId(): string { return this.id; }
  getProjectId(): string { return this.projectId; }
  getProjectVersion(): string { return this.projectVersion; }
  getProfileId(): string { return this.profileId; }
  getProfileVersion(): string { return this.profileVersion; }
  getRequest(): NarrativeRequest { return { ...this.request }; }
  getReadiness(): NarrativeReadiness { return this.readiness; }
  getTiming(): NarrativeTiming { return { ...this.timing }; }
  getTotalEstimatedSeconds(): number { return this.totalEstimatedSeconds; }
  getSteps(): NarrativeStepEntity[] { return [...this.steps]; }
  getWarnings(): NarrativeWarning[] { return [...this.warnings]; }
  getGaps(): NarrativeGap[] { return [...this.gaps]; }
  getOmittedSectionTypes(): ProjectSectionType[] { return [...this.omittedSectionTypes]; }
  getGeneratedAt(): string { return this.generatedAt; }
  getEngineVersion(): string { return this.engineVersion; }

  toJSON(): NarrativePlan {
    return {
      id: this.id,
      projectId: this.projectId,
      projectVersion: this.projectVersion,
      profileId: this.profileId,
      profileVersion: this.profileVersion,
      request: this.getRequest(),
      readiness: this.readiness,
      timing: this.getTiming(),
      totalEstimatedSeconds: this.totalEstimatedSeconds,
      steps: this.steps.map(s => s.toJSON()),
      warnings: this.getWarnings(),
      gaps: this.getGaps(),
      omittedSectionTypes: this.getOmittedSectionTypes(),
      generatedAt: this.generatedAt,
      engineVersion: this.engineVersion
    };
  }
}
