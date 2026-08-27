import {
  PresentationDefinition,
  PresentationReadiness,
  PresentationTrustSummary,
  PresentationCompilerWarning
} from '../presentation.types';
import { AudienceType, NarrativeObjective } from '../../../narrative/domain/narrative.types';
import { PresentationSceneEntity } from './presentation-scene.entity';
import { InvalidPresentationDataError } from '../errors/presentation-domain.error';

export class PresentationDefinitionEntity {
  private readonly id: string;
  private readonly projectId: string;
  private readonly projectVersion: string;
  private readonly narrativePlanId: string;
  private readonly narrativeProfileId: string;
  private readonly narrativeProfileVersion: string;
  private readonly presentationProfileId: string;
  private readonly presentationProfileVersion: string;
  private readonly themeId: string;
  private readonly themeVersion: string;
  private readonly language: 'ES' | 'EN';
  private readonly audience: AudienceType;
  private readonly objective: NarrativeObjective;
  private readonly readiness: PresentationReadiness;
  private readonly totalEstimatedSeconds: number;
  private readonly scenes: PresentationSceneEntity[];
  private readonly trustSummary: PresentationTrustSummary;
  private readonly warnings: PresentationCompilerWarning[];
  private readonly compilerVersion: string;
  private readonly schemaVersion: string;
  private readonly generatedAt: string;

  constructor(data: PresentationDefinition) {
    if (!data.id || data.id.trim().length === 0) {
      throw new InvalidPresentationDataError('id', 'PresentationDefinition ID cannot be empty');
    }
    if (!data.projectId || data.projectId.trim().length === 0) {
      throw new InvalidPresentationDataError('projectId', 'PresentationDefinition projectId cannot be empty');
    }
    if (!Array.isArray(data.scenes) || data.scenes.length === 0) {
      throw new InvalidPresentationDataError('scenes', 'PresentationDefinition must contain at least one scene');
    }

    this.id = data.id.trim();
    this.projectId = data.projectId.trim();
    this.projectVersion = data.projectVersion || '0.1.0';
    this.narrativePlanId = data.narrativePlanId;
    this.narrativeProfileId = data.narrativeProfileId;
    this.narrativeProfileVersion = data.narrativeProfileVersion || '1.0';
    this.presentationProfileId = data.presentationProfileId;
    this.presentationProfileVersion = data.presentationProfileVersion || '1.0';
    this.themeId = data.themeId;
    this.themeVersion = data.themeVersion || '1.0';
    this.language = data.language || 'EN';
    this.audience = data.audience;
    this.objective = data.objective;
    this.readiness = data.readiness || 'PRESENTATION_READY';
    this.totalEstimatedSeconds = data.totalEstimatedSeconds || 0;
    this.scenes = data.scenes.map(s => s instanceof PresentationSceneEntity ? s : new PresentationSceneEntity(s));
    this.trustSummary = { ...data.trustSummary };
    this.warnings = [...(data.warnings || [])];
    this.compilerVersion = data.compilerVersion || '1.0.0';
    this.schemaVersion = data.schemaVersion || '1.0';
    this.generatedAt = data.generatedAt || new Date().toISOString();
  }

  getId(): string { return this.id; }
  getProjectId(): string { return this.projectId; }
  getProjectVersion(): string { return this.projectVersion; }
  getNarrativePlanId(): string { return this.narrativePlanId; }
  getPresentationProfileId(): string { return this.presentationProfileId; }
  getThemeId(): string { return this.themeId; }
  getLanguage(): 'ES' | 'EN' { return this.language; }
  getAudience(): AudienceType { return this.audience; }
  getObjective(): NarrativeObjective { return this.objective; }
  getReadiness(): PresentationReadiness { return this.readiness; }
  getTotalEstimatedSeconds(): number { return this.totalEstimatedSeconds; }
  getScenes(): PresentationSceneEntity[] { return [...this.scenes]; }
  getTrustSummary(): PresentationTrustSummary { return { ...this.trustSummary }; }
  getWarnings(): PresentationCompilerWarning[] { return [...this.warnings]; }
  getCompilerVersion(): string { return this.compilerVersion; }
  getSchemaVersion(): string { return this.schemaVersion; }
  getGeneratedAt(): string { return this.generatedAt; }

  getScene(index: number): PresentationSceneEntity | null {
    return this.scenes[index] || null;
  }

  toJSON(): PresentationDefinition {
    return {
      id: this.id,
      projectId: this.projectId,
      projectVersion: this.projectVersion,
      narrativePlanId: this.narrativePlanId,
      narrativeProfileId: this.narrativeProfileId,
      narrativeProfileVersion: this.narrativeProfileVersion,
      presentationProfileId: this.presentationProfileId,
      presentationProfileVersion: this.presentationProfileVersion,
      themeId: this.themeId,
      themeVersion: this.themeVersion,
      language: this.language,
      audience: this.audience,
      objective: this.objective,
      readiness: this.readiness,
      totalEstimatedSeconds: this.totalEstimatedSeconds,
      scenes: this.scenes.map(s => s.toJSON()),
      trustSummary: this.getTrustSummary(),
      warnings: this.getWarnings(),
      compilerVersion: this.compilerVersion,
      schemaVersion: this.schemaVersion,
      generatedAt: this.generatedAt
    };
  }
}
