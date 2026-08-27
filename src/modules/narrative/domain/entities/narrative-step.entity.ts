import { NarrativeStep, NarrativeRole, NarrativeDepth, NarrativeStepStatus } from '../narrative.types';
import { ProjectSectionType } from '../../../project/domain/project.types';
import { NarrativeCompilationError } from '../errors/narrative-domain.error';

export class NarrativeStepEntity {
  private readonly id: string;
  private readonly order: number;
  private readonly role: NarrativeRole;
  private readonly sectionType: ProjectSectionType;
  private readonly title: string;
  private readonly priority: number;
  private readonly depth: NarrativeDepth;
  private readonly estimatedSeconds: number;
  private readonly rationale: string;
  private readonly status: NarrativeStepStatus;
  private readonly sourceSectionId: string;
  private readonly languageUsed: 'es' | 'en';
  private readonly isLanguageFallback: boolean;

  constructor(data: NarrativeStep) {
    if (!data.id) throw new NarrativeCompilationError('Step id cannot be empty');
    if (!data.sourceSectionId) throw new NarrativeCompilationError('Step must link to a valid source section ID');

    this.id = data.id;
    this.order = data.order;
    this.role = data.role;
    this.sectionType = data.sectionType;
    this.title = data.title;
    this.priority = data.priority;
    this.depth = data.depth;
    this.estimatedSeconds = data.estimatedSeconds;
    this.rationale = data.rationale;
    this.status = data.status;
    this.sourceSectionId = data.sourceSectionId;
    this.languageUsed = data.languageUsed;
    this.isLanguageFallback = !!data.isLanguageFallback;
  }

  getId(): string { return this.id; }
  getOrder(): number { return this.order; }
  getRole(): NarrativeRole { return this.role; }
  getSectionType(): ProjectSectionType { return this.sectionType; }
  getTitle(): string { return this.title; }
  getPriority(): number { return this.priority; }
  getDepth(): NarrativeDepth { return this.depth; }
  getEstimatedSeconds(): number { return this.estimatedSeconds; }
  getRationale(): string { return this.rationale; }
  getStatus(): NarrativeStepStatus { return this.status; }
  getSourceSectionId(): string { return this.sourceSectionId; }
  getLanguageUsed(): 'es' | 'en' { return this.languageUsed; }
  getIsLanguageFallback(): boolean { return this.isLanguageFallback; }

  toJSON(): NarrativeStep {
    return {
      id: this.id,
      order: this.order,
      role: this.role,
      sectionType: this.sectionType,
      title: this.title,
      priority: this.priority,
      depth: this.depth,
      estimatedSeconds: this.estimatedSeconds,
      rationale: this.rationale,
      status: this.status,
      sourceSectionId: this.sourceSectionId,
      languageUsed: this.languageUsed,
      isLanguageFallback: this.isLanguageFallback
    };
  }
}
