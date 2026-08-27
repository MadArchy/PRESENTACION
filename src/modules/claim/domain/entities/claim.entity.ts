import {
  ClaimData,
  ClaimType,
  ClaimStatus,
  ClaimSupportStatus,
  ClaimReviewStatus,
  ClaimMateriality
} from '../claim.types';
import { ProjectSectionType, BilingualText, SourceReference } from '../../../project/domain/project.types';
import { ClaimTypeVo } from '../value-objects/claim-type.vo';
import { ClaimStatusVo } from '../value-objects/claim-status.vo';
import { ClaimSupportStatusVo } from '../value-objects/claim-support-status.vo';
import { ClaimReviewStatusVo } from '../value-objects/claim-review-status.vo';
import { ClaimMaterialityVo } from '../value-objects/claim-materiality.vo';
import { InvalidClaimDataError } from '../errors/claim-domain.error';

export class ClaimEntity {
  private readonly id: string;
  private readonly projectId: string;
  private readonly projectVersion: string;
  private readonly sectionType: ProjectSectionType;
  private readonly text: BilingualText;
  private readonly type: ClaimTypeVo;
  private status: ClaimStatusVo;
  private supportStatus: ClaimSupportStatusVo;
  private reviewStatus: ClaimReviewStatusVo;
  private readonly materiality: ClaimMaterialityVo;
  private evidenceLinkIds: string[];
  private readonly sourceRefs?: SourceReference[];
  private readonly createdAt: string;
  private updatedAt: string;

  constructor(data: ClaimData) {
    if (!data.id || data.id.trim().length === 0) {
      throw new InvalidClaimDataError('id', 'Claim ID cannot be empty');
    }
    if (!data.projectId || data.projectId.trim().length === 0) {
      throw new InvalidClaimDataError('projectId', 'Claim projectId cannot be empty');
    }
    if (!data.text || (!data.text.es && !data.text.en)) {
      throw new InvalidClaimDataError('text', 'Claim must provide text in at least one language');
    }

    this.id = data.id.trim();
    this.projectId = data.projectId.trim();
    this.projectVersion = data.projectVersion || '0.1.0';
    this.sectionType = data.sectionType;
    this.text = { ...data.text };
    this.type = new ClaimTypeVo(data.type);
    this.status = new ClaimStatusVo(data.status);
    this.supportStatus = new ClaimSupportStatusVo(data.supportStatus);
    this.reviewStatus = new ClaimReviewStatusVo(data.reviewStatus);
    this.materiality = new ClaimMaterialityVo(data.materiality);
    this.evidenceLinkIds = [...(data.evidenceLinkIds || [])];
    this.sourceRefs = data.sourceRefs ? [...data.sourceRefs] : undefined;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  getId(): string { return this.id; }
  getProjectId(): string { return this.projectId; }
  getProjectVersion(): string { return this.projectVersion; }
  getSectionType(): ProjectSectionType { return this.sectionType; }
  getText(): BilingualText { return { ...this.text }; }
  getType(): ClaimType { return this.type.getValue(); }
  getTypeVo(): ClaimTypeVo { return this.type; }
  getStatus(): ClaimStatus { return this.status.getValue(); }
  getSupportStatus(): ClaimSupportStatus { return this.supportStatus.getValue(); }
  getReviewStatus(): ClaimReviewStatus { return this.reviewStatus.getValue(); }
  getMateriality(): ClaimMateriality { return this.materiality.getValue(); }
  getMaterialityVo(): ClaimMaterialityVo { return this.materiality; }
  getEvidenceLinkIds(): string[] { return [...this.evidenceLinkIds]; }
  getSourceRefs(): SourceReference[] | undefined { return this.sourceRefs ? [...this.sourceRefs] : undefined; }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }

  setSupportStatus(newStatus: ClaimSupportStatus): void {
    this.supportStatus = new ClaimSupportStatusVo(newStatus);
    this.updatedAt = new Date().toISOString();
  }

  setReviewStatus(newStatus: ClaimReviewStatus): void {
    this.reviewStatus = new ClaimReviewStatusVo(newStatus);
    this.updatedAt = new Date().toISOString();
  }

  toJSON(): ClaimData {
    return {
      id: this.id,
      projectId: this.projectId,
      projectVersion: this.projectVersion,
      sectionType: this.sectionType,
      text: this.getText(),
      type: this.getType(),
      status: this.getStatus(),
      supportStatus: this.getSupportStatus(),
      reviewStatus: this.getReviewStatus(),
      materiality: this.getMateriality(),
      evidenceLinkIds: this.getEvidenceLinkIds(),
      sourceRefs: this.getSourceRefs(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
