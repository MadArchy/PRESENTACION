import { CopilotProposalStatus } from '../copilot.types';
import { CopilotDomainError } from '../errors/copilot-domain.error';

export const VALID_PROPOSAL_STATUSES: CopilotProposalStatus[] = [
  'PROPOSED',
  'UNDER_REVIEW',
  'APPROVED',
  'REJECTED',
  'SUPERSEDED'
];

export class ProposalStatusVo {
  private readonly value: CopilotProposalStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'PROPOSED';
    if (!VALID_PROPOSAL_STATUSES.includes(normalized as CopilotProposalStatus)) {
      throw new CopilotDomainError(`Invalid proposal status: '${value}'. Must be one of [${VALID_PROPOSAL_STATUSES.join(', ')}]`);
    }
    this.value = normalized as CopilotProposalStatus;
  }

  getValue(): CopilotProposalStatus {
    return this.value;
  }
}
