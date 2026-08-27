import {
  CopilotProposal,
  CopilotProposalType,
  CopilotProposalTarget,
  CopilotProposalStatus
} from '../copilot.types';
import { ProposalStatusVo } from '../value-objects/proposal-status.vo';
import { InvalidCopilotProposalTransitionError } from '../errors/copilot-domain.error';

export class CopilotProposalEntity {
  private readonly id: string;
  private readonly proposalType: CopilotProposalType;
  private readonly target: CopilotProposalTarget;
  private readonly rationale: string;
  private readonly currentValue?: unknown;
  private proposedValue: unknown;
  private readonly sourceRefs: string[];
  private status: ProposalStatusVo;
  private reviewedAt?: string;
  private reviewedBy?: string;

  constructor(data: CopilotProposal) {
    this.id = data.id;
    this.proposalType = data.proposalType;
    this.target = { ...data.target };
    this.rationale = data.rationale;
    this.currentValue = data.currentValue;
    this.proposedValue = data.proposedValue;
    this.sourceRefs = [...(data.sourceRefs || [])];
    this.status = new ProposalStatusVo(data.status || 'PROPOSED');
    this.reviewedAt = data.reviewedAt;
    this.reviewedBy = data.reviewedBy;
  }

  getId(): string { return this.id; }
  getProposalType(): CopilotProposalType { return this.proposalType; }
  getTarget(): CopilotProposalTarget { return { ...this.target }; }
  getRationale(): string { return this.rationale; }
  getCurrentValue(): unknown { return this.currentValue; }
  getProposedValue(): unknown { return this.proposedValue; }
  getSourceRefs(): string[] { return [...this.sourceRefs]; }
  getStatus(): CopilotProposalStatus { return this.status.getValue(); }
  getReviewedAt(): string | undefined { return this.reviewedAt; }
  getReviewedBy(): string | undefined { return this.reviewedBy; }

  startReview(by = 'HUMAN_REVIEWER', timestamp = new Date().toISOString()): void {
    if (this.getStatus() !== 'PROPOSED') {
      throw new InvalidCopilotProposalTransitionError(this.getStatus(), 'UNDER_REVIEW');
    }
    this.status = new ProposalStatusVo('UNDER_REVIEW');
    this.reviewedAt = timestamp;
    this.reviewedBy = by;
  }

  approve(by = 'HUMAN_REVIEWER', timestamp = new Date().toISOString()): void {
    const curr = this.getStatus();
    if (curr !== 'PROPOSED' && curr !== 'UNDER_REVIEW') {
      throw new InvalidCopilotProposalTransitionError(curr, 'APPROVED');
    }
    this.status = new ProposalStatusVo('APPROVED');
    this.reviewedAt = timestamp;
    this.reviewedBy = by;
  }

  reject(by = 'HUMAN_REVIEWER', timestamp = new Date().toISOString()): void {
    const curr = this.getStatus();
    if (curr !== 'PROPOSED' && curr !== 'UNDER_REVIEW') {
      throw new InvalidCopilotProposalTransitionError(curr, 'REJECTED');
    }
    this.status = new ProposalStatusVo('REJECTED');
    this.reviewedAt = timestamp;
    this.reviewedBy = by;
  }

  edit(newProposedValue: unknown, by = 'HUMAN_REVIEWER', timestamp = new Date().toISOString()): void {
    const curr = this.getStatus();
    if (curr !== 'PROPOSED' && curr !== 'UNDER_REVIEW') {
      throw new InvalidCopilotProposalTransitionError(curr, 'UNDER_REVIEW');
    }
    this.proposedValue = newProposedValue;
    this.status = new ProposalStatusVo('UNDER_REVIEW');
    this.reviewedAt = timestamp;
    this.reviewedBy = by;
  }

  supersede(by = 'SYSTEM', timestamp = new Date().toISOString()): void {
    this.status = new ProposalStatusVo('SUPERSEDED');
    this.reviewedAt = timestamp;
    this.reviewedBy = by;
  }

  toJSON(): CopilotProposal {
    return {
      id: this.id,
      proposalType: this.proposalType,
      target: this.getTarget(),
      rationale: this.rationale,
      currentValue: this.currentValue,
      proposedValue: this.proposedValue,
      sourceRefs: this.getSourceRefs(),
      status: this.getStatus(),
      reviewedAt: this.reviewedAt,
      reviewedBy: this.reviewedBy
    };
  }
}
