import {
  EvidenceData,
  EvidenceType,
  EvidenceStatus,
  EvidenceSource
} from '../evidence.types';
import { SourceReference } from '../../../project/domain/project.types';
import { EvidenceTypeVo } from '../value-objects/evidence-type.vo';
import { EvidenceStatusVo } from '../value-objects/evidence-status.vo';
import { InvalidEvidenceDataError } from '../errors/evidence-domain.error';

export class EvidenceEntity {
  private readonly id: string;
  private readonly projectId: string;
  private readonly projectVersion: string;
  private readonly type: EvidenceTypeVo;
  private status: EvidenceStatusVo;
  private readonly title: string;
  private readonly description?: string;
  private readonly source: EvidenceSource;
  private readonly sourceRefs?: SourceReference[];
  private readonly capturedAt: string;
  private readonly reviewedAt?: string;
  private readonly metadata?: Record<string, unknown>;

  constructor(data: EvidenceData) {
    if (!data.id || data.id.trim().length === 0) {
      throw new InvalidEvidenceDataError('id', 'Evidence ID cannot be empty');
    }
    if (!data.projectId || data.projectId.trim().length === 0) {
      throw new InvalidEvidenceDataError('projectId', 'Evidence projectId cannot be empty');
    }
    if (!data.title || data.title.trim().length === 0) {
      throw new InvalidEvidenceDataError('title', 'Evidence title cannot be empty');
    }

    this.id = data.id.trim();
    this.projectId = data.projectId.trim();
    this.projectVersion = data.projectVersion || '0.1.0';
    this.type = new EvidenceTypeVo(data.type);
    this.status = new EvidenceStatusVo(data.status);
    this.title = data.title.trim();
    this.description = data.description;
    this.source = { ...data.source };
    this.sourceRefs = data.sourceRefs ? [...data.sourceRefs] : undefined;
    this.capturedAt = data.capturedAt || new Date().toISOString();
    this.reviewedAt = data.reviewedAt;
    this.metadata = data.metadata;
  }

  getId(): string { return this.id; }
  getProjectId(): string { return this.projectId; }
  getProjectVersion(): string { return this.projectVersion; }
  getType(): EvidenceType { return this.type.getValue(); }
  getTypeVo(): EvidenceTypeVo { return this.type; }
  getStatus(): EvidenceStatus { return this.status.getValue(); }
  getStatusVo(): EvidenceStatusVo { return this.status; }
  getTitle(): string { return this.title; }
  getDescription(): string | undefined { return this.description; }
  getSource(): EvidenceSource { return { ...this.source }; }
  getSourceRefs(): SourceReference[] | undefined { return this.sourceRefs ? [...this.sourceRefs] : undefined; }
  getCapturedAt(): string { return this.capturedAt; }
  getReviewedAt(): string | undefined { return this.reviewedAt; }
  getMetadata(): Record<string, unknown> | undefined { return this.metadata; }

  setStatus(newStatus: EvidenceStatus): void {
    this.status = new EvidenceStatusVo(newStatus);
  }

  toJSON(): EvidenceData {
    return {
      id: this.id,
      projectId: this.projectId,
      projectVersion: this.projectVersion,
      type: this.getType(),
      status: this.getStatus(),
      title: this.title,
      description: this.description,
      source: this.getSource(),
      sourceRefs: this.getSourceRefs(),
      capturedAt: this.capturedAt,
      reviewedAt: this.reviewedAt,
      metadata: this.metadata
    };
  }
}
