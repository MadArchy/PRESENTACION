import {
  DiligenceRequestData,
  DiligenceCategoryType,
  DocumentKind,
  DiligenceRequestStatus,
  DiligencePriority,
  FreshnessRule
} from '../data-room.types';
import {
  DiligenceCategoryVo,
  RequestStatusVo,
  DiligencePriorityVo
} from '../value-objects/diligence-category.vo';
import { DocumentKindVo } from '../value-objects/document-kind.vo';
import { InvalidDiligenceRequestError } from '../errors/data-room-domain.error';

export class DiligenceRequestEntity {
  private readonly id: string;
  private readonly projectId: string;
  private readonly projectVersion: string;
  private readonly category: DiligenceCategoryVo;
  private readonly title: string;
  private readonly description?: string;
  private readonly priority: DiligencePriorityVo;
  private status: RequestStatusVo;
  private readonly requiredDocumentKinds: DocumentKindVo[];
  private readonly linkedDocumentIds: string[];
  private readonly linkedClaimIds: string[];
  private readonly linkedEvidenceIds: string[];
  private readonly freshnessRule?: FreshnessRule;
  private readonly createdAt: string;
  private readonly updatedAt: string;

  constructor(data: DiligenceRequestData) {
    if (!data.id || data.id.trim().length === 0) {
      throw new InvalidDiligenceRequestError('id', 'Request ID cannot be empty');
    }
    if (!data.projectId || data.projectId.trim().length === 0) {
      throw new InvalidDiligenceRequestError('projectId', 'projectId cannot be empty');
    }
    if (!data.title || data.title.trim().length === 0) {
      throw new InvalidDiligenceRequestError('title', 'Request title cannot be empty');
    }

    this.id = data.id.trim();
    this.projectId = data.projectId.trim();
    this.projectVersion = data.projectVersion || '0.1.0';
    this.category = new DiligenceCategoryVo(data.category);
    this.title = data.title.trim();
    this.description = data.description;
    this.priority = new DiligencePriorityVo(data.priority);
    this.status = new RequestStatusVo(data.status);
    this.requiredDocumentKinds = (data.requiredDocumentKinds || []).map(k => new DocumentKindVo(k));
    this.linkedDocumentIds = [...(data.linkedDocumentIds || [])];
    this.linkedClaimIds = [...(data.linkedClaimIds || [])];
    this.linkedEvidenceIds = [...(data.linkedEvidenceIds || [])];
    this.freshnessRule = data.freshnessRule ? { ...data.freshnessRule } : undefined;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  getId(): string { return this.id; }
  getProjectId(): string { return this.projectId; }
  getProjectVersion(): string { return this.projectVersion; }
  getCategory(): DiligenceCategoryType { return this.category.getValue(); }
  getTitle(): string { return this.title; }
  getDescription(): string | undefined { return this.description; }
  getPriority(): DiligencePriority { return this.priority.getValue(); }
  getStatus(): DiligenceRequestStatus { return this.status.getValue(); }
  getRequiredDocumentKinds(): DocumentKind[] { return this.requiredDocumentKinds.map(k => k.getValue()); }
  getLinkedDocumentIds(): string[] { return [...this.linkedDocumentIds]; }
  getLinkedClaimIds(): string[] { return [...this.linkedClaimIds]; }
  getLinkedEvidenceIds(): string[] { return [...this.linkedEvidenceIds]; }
  getFreshnessRule(): FreshnessRule | undefined { return this.freshnessRule ? { ...this.freshnessRule } : undefined; }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }

  isSatisfied(): boolean { return this.status.isSatisfied(); }
  isBlocked(): boolean { return this.status.isBlocked(); }
  isCriticalOrHigh(): boolean { return this.priority.isCriticalOrHigh(); }

  toJSON(): DiligenceRequestData {
    return {
      id: this.id,
      projectId: this.projectId,
      projectVersion: this.projectVersion,
      category: this.getCategory(),
      title: this.title,
      description: this.description,
      priority: this.getPriority(),
      status: this.getStatus(),
      requiredDocumentKinds: this.getRequiredDocumentKinds(),
      linkedDocumentIds: this.getLinkedDocumentIds(),
      linkedClaimIds: this.getLinkedClaimIds(),
      linkedEvidenceIds: this.getLinkedEvidenceIds(),
      freshnessRule: this.getFreshnessRule(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
