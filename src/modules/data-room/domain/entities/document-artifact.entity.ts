import {
  DocumentArtifactData,
  DocumentKind,
  DiligenceCategoryType,
  DocumentStatus,
  ConfidentialityLevel,
  DocumentSource
} from '../data-room.types';
import { DocumentKindVo } from '../value-objects/document-kind.vo';
import {
  DiligenceCategoryVo,
  DocumentStatusVo,
  ConfidentialityLevelVo
} from '../value-objects/diligence-category.vo';
import { InvalidDocumentDataError } from '../errors/data-room-domain.error';
import { SourceReference } from '../../../project/domain/project.types';

export class DocumentArtifactEntity {
  private readonly id: string;
  private readonly projectId: string;
  private readonly projectVersion: string;
  private readonly title: string;
  private readonly description?: string;
  private readonly kind: DocumentKindVo;
  private readonly category: DiligenceCategoryVo;
  private status: DocumentStatusVo;
  private readonly confidentiality: ConfidentialityLevelVo;
  private readonly source: DocumentSource;
  private readonly assetRef?: string;
  private readonly issuedAt?: string;
  private readonly effectiveAt?: string;
  private readonly expiresAt?: string;
  private readonly reviewedAt?: string;
  private readonly owner?: string;
  private readonly projectSectionRefs: string[];
  private readonly claimRefs: string[];
  private readonly evidenceRefs: string[];
  private readonly requestRefs: string[];
  private readonly tags: string[];
  private readonly sourceRefs: SourceReference[];
  private readonly createdAt: string;
  private readonly updatedAt: string;

  constructor(data: DocumentArtifactData) {
    if (!data.id || data.id.trim().length === 0) {
      throw new InvalidDocumentDataError('id', 'Document ID cannot be empty');
    }
    if (!data.projectId || data.projectId.trim().length === 0) {
      throw new InvalidDocumentDataError('projectId', 'projectId cannot be empty');
    }
    if (!data.title || data.title.trim().length === 0) {
      throw new InvalidDocumentDataError('title', 'Document title cannot be empty');
    }

    this.id = data.id.trim();
    this.projectId = data.projectId.trim();
    this.projectVersion = data.projectVersion || '0.1.0';
    this.title = data.title.trim();
    this.description = data.description;
    this.kind = new DocumentKindVo(data.kind);
    this.category = new DiligenceCategoryVo(data.category);
    this.status = new DocumentStatusVo(data.status);
    this.confidentiality = new ConfidentialityLevelVo(data.confidentiality);
    this.source = { ...data.source };
    this.assetRef = data.assetRef;
    this.issuedAt = data.issuedAt;
    this.effectiveAt = data.effectiveAt;
    this.expiresAt = data.expiresAt;
    this.reviewedAt = data.reviewedAt;
    this.owner = data.owner;
    this.projectSectionRefs = [...(data.projectSectionRefs || [])];
    this.claimRefs = [...(data.claimRefs || [])];
    this.evidenceRefs = [...(data.evidenceRefs || [])];
    this.requestRefs = [...(data.requestRefs || [])];
    this.tags = [...(data.tags || [])];
    this.sourceRefs = [...(data.sourceRefs || [])];
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  getId(): string { return this.id; }
  getProjectId(): string { return this.projectId; }
  getProjectVersion(): string { return this.projectVersion; }
  getTitle(): string { return this.title; }
  getDescription(): string | undefined { return this.description; }
  getKind(): DocumentKind { return this.kind.getValue(); }
  getCategory(): DiligenceCategoryType { return this.category.getValue(); }
  getStatus(): DocumentStatus { return this.status.getValue(); }
  getConfidentiality(): ConfidentialityLevel { return this.confidentiality.getValue(); }
  getSource(): DocumentSource { return { ...this.source }; }
  getAssetRef(): string | undefined { return this.assetRef; }
  getIssuedAt(): string | undefined { return this.issuedAt; }
  getEffectiveAt(): string | undefined { return this.effectiveAt; }
  getExpiresAt(): string | undefined { return this.expiresAt; }
  getReviewedAt(): string | undefined { return this.reviewedAt; }
  getOwner(): string | undefined { return this.owner; }
  getProjectSectionRefs(): string[] { return [...this.projectSectionRefs]; }
  getClaimRefs(): string[] { return [...this.claimRefs]; }
  getEvidenceRefs(): string[] { return [...this.evidenceRefs]; }
  getRequestRefs(): string[] { return [...this.requestRefs]; }
  getTags(): string[] { return [...this.tags]; }
  getSourceRefs(): SourceReference[] { return [...this.sourceRefs]; }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }

  isCurrent(): boolean { return this.status.isCurrent(); }
  isMissing(): boolean { return this.status.isMissing(); }
  isStaleOrInvalid(): boolean { return this.status.isStaleOrInvalid(); }

  toJSON(): DocumentArtifactData {
    return {
      id: this.id,
      projectId: this.projectId,
      projectVersion: this.projectVersion,
      title: this.title,
      description: this.description,
      kind: this.getKind(),
      category: this.getCategory(),
      status: this.getStatus(),
      confidentiality: this.getConfidentiality(),
      source: this.getSource(),
      assetRef: this.assetRef,
      issuedAt: this.issuedAt,
      effectiveAt: this.effectiveAt,
      expiresAt: this.expiresAt,
      reviewedAt: this.reviewedAt,
      owner: this.owner,
      projectSectionRefs: this.getProjectSectionRefs(),
      claimRefs: this.getClaimRefs(),
      evidenceRefs: this.getEvidenceRefs(),
      requestRefs: this.getRequestRefs(),
      tags: this.getTags(),
      sourceRefs: this.getSourceRefs(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
