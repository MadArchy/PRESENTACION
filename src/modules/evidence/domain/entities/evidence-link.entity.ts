import {
  EvidenceLinkData,
  EvidenceRelation,
  EvidenceLinkStatus
} from '../evidence.types';
import { EvidenceRelationVo } from '../value-objects/evidence-relation.vo';
import { InvalidEvidenceDataError } from '../errors/evidence-domain.error';

export class EvidenceLinkEntity {
  private readonly id: string;
  private readonly claimId: string;
  private readonly evidenceId: string;
  private readonly projectId: string;
  private readonly relation: EvidenceRelationVo;
  private status: EvidenceLinkStatus;
  private readonly rationale?: string;
  private readonly createdAt: string;

  constructor(data: EvidenceLinkData) {
    if (!data.id || data.id.trim().length === 0) {
      throw new InvalidEvidenceDataError('id', 'EvidenceLink ID cannot be empty');
    }
    if (!data.claimId || data.claimId.trim().length === 0) {
      throw new InvalidEvidenceDataError('claimId', 'EvidenceLink claimId cannot be empty');
    }
    if (!data.evidenceId || data.evidenceId.trim().length === 0) {
      throw new InvalidEvidenceDataError('evidenceId', 'EvidenceLink evidenceId cannot be empty');
    }
    if (!data.projectId || data.projectId.trim().length === 0) {
      throw new InvalidEvidenceDataError('projectId', 'EvidenceLink projectId cannot be empty');
    }

    this.id = data.id.trim();
    this.claimId = data.claimId.trim();
    this.evidenceId = data.evidenceId.trim();
    this.projectId = data.projectId.trim();
    this.relation = new EvidenceRelationVo(data.relation);
    this.status = data.status || 'ACTIVE';
    this.rationale = data.rationale;
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  getId(): string { return this.id; }
  getClaimId(): string { return this.claimId; }
  getEvidenceId(): string { return this.evidenceId; }
  getProjectId(): string { return this.projectId; }
  getRelation(): EvidenceRelation { return this.relation.getValue(); }
  getRelationVo(): EvidenceRelationVo { return this.relation; }
  getStatus(): EvidenceLinkStatus { return this.status; }
  getRationale(): string | undefined { return this.rationale; }
  getCreatedAt(): string { return this.createdAt; }

  isActive(): boolean { return this.status === 'ACTIVE'; }

  setStatus(status: EvidenceLinkStatus): void {
    this.status = status;
  }

  toJSON(): EvidenceLinkData {
    return {
      id: this.id,
      claimId: this.claimId,
      evidenceId: this.evidenceId,
      projectId: this.projectId,
      relation: this.getRelation(),
      status: this.status,
      rationale: this.rationale,
      createdAt: this.createdAt
    };
  }
}
