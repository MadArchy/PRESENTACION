import { CopilotTaskType, CopilotTaskRisk } from '../copilot.types';

export class CopilotRiskPolicy {
  static classify(taskType: CopilotTaskType): CopilotTaskRisk {
    switch (taskType) {
      case 'PROJECT_ANALYSIS':
      case 'GAP_ANALYSIS':
      case 'TRUST_REVIEW':
      case 'RISK_REVIEW':
      case 'COMPARISON':
      case 'EXPLANATION':
        return 'READ_ONLY_ANALYSIS';

      case 'EXECUTIVE_SUMMARY_DRAFT':
      case 'PRESENTER_QA_PREPARATION':
      case 'PRESENTER_TALKING_POINTS':
        return 'DRAFT_GENERATION';

      case 'CONTENT_REWRITE_PROPOSAL':
      case 'NARRATIVE_CRITIQUE':
      case 'PRESENTATION_CRITIQUE':
        return 'CHANGE_PROPOSAL';

      default:
        return 'READ_ONLY_ANALYSIS';
    }
  }

  static isWriteActionPermitted(taskType: CopilotTaskType): boolean {
    const risk = this.classify(taskType);
    return risk === 'CHANGE_PROPOSAL' || risk === 'DRAFT_GENERATION';
  }
}
