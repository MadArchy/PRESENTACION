import { AiProviderType, CopilotProposalStatus, CopilotFindingType } from '../copilot.types';
import { CopilotDomainError } from '../errors/copilot-domain.error';

export const VALID_AI_PROVIDERS: AiProviderType[] = ['MOCK', 'OPENAI', 'ANTHROPIC', 'GOOGLE', 'OLLAMA'];

export class ProviderTypeVo {
  private readonly value: AiProviderType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'MOCK';
    if (!VALID_AI_PROVIDERS.includes(normalized as AiProviderType)) {
      throw new CopilotDomainError(`Invalid AI Provider: '${value}'. Must be one of [${VALID_AI_PROVIDERS.join(', ')}]`);
    }
    this.value = normalized as AiProviderType;
  }

  getValue(): AiProviderType {
    return this.value;
  }
}

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
    const normalized = value ? value.toUpperCase().trim() : 'PENDING_REVIEW';
    if (!VALID_PROPOSAL_STATUSES.includes(normalized as CopilotProposalStatus)) {
      throw new CopilotDomainError(`Invalid proposal status: '${value}'`);
    }
    this.value = normalized as CopilotProposalStatus;
  }

  getValue(): CopilotProposalStatus {
    return this.value;
  }
}

export const VALID_FINDING_TYPES: CopilotFindingType[] = [
  'INSIGHT',
  'GAP',
  'RISK',
  'INCONSISTENCY',
  'OPPORTUNITY',
  'QUESTION',
  'TRUST_CONCERN',
  'PRESENTATION_CONCERN',
  'NARRATIVE_CONCERN'
];

export class FindingTypeVo {
  private readonly value: CopilotFindingType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'INSIGHT';
    if (!VALID_FINDING_TYPES.includes(normalized as CopilotFindingType)) {
      throw new CopilotDomainError(`Invalid finding type: '${value}'`);
    }
    this.value = normalized as CopilotFindingType;
  }

  getValue(): CopilotFindingType {
    return this.value;
  }
}
