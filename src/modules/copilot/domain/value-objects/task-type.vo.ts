import { CopilotTaskType } from '../copilot.types';
import { InvalidCopilotTaskTypeError } from '../errors/copilot-domain.error';

export const VALID_COPILOT_TASKS: CopilotTaskType[] = [
  'PROJECT_ANALYSIS',
  'GAP_ANALYSIS',
  'NARRATIVE_CRITIQUE',
  'PRESENTATION_CRITIQUE',
  'TRUST_REVIEW',
  'RISK_REVIEW',
  'EXECUTIVE_SUMMARY_DRAFT',
  'CONTENT_REWRITE_PROPOSAL',
  'PRESENTER_QA_PREPARATION',
  'PRESENTER_TALKING_POINTS',
  'COMPARISON',
  'EXPLANATION'
];

export class TaskTypeVo {
  private readonly value: CopilotTaskType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_COPILOT_TASKS.includes(normalized as CopilotTaskType)) {
      throw new InvalidCopilotTaskTypeError(value);
    }
    this.value = normalized as CopilotTaskType;
  }

  getValue(): CopilotTaskType {
    return this.value;
  }
}
