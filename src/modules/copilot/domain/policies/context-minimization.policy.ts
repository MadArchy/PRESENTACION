import { CopilotTaskType, CopilotContextScope } from '../copilot.types';

export class ContextMinimizationPolicy {
  static getRequiredScopes(taskType: CopilotTaskType): CopilotContextScope[] {
    switch (taskType) {
      case 'PROJECT_ANALYSIS':
        return ['PROJECT', 'SECTION'];

      case 'GAP_ANALYSIS':
        return ['PROJECT', 'SECTION', 'NARRATIVE'];

      case 'NARRATIVE_CRITIQUE':
        return ['NARRATIVE', 'SECTION', 'CLAIMS'];

      case 'PRESENTATION_CRITIQUE':
        return ['PRESENTATION', 'NARRATIVE', 'TRUST'];

      case 'TRUST_REVIEW':
        return ['CLAIMS', 'EVIDENCE', 'TRUST'];

      case 'RISK_REVIEW':
        return ['SECTION', 'CLAIMS', 'TRUST'];

      case 'EXECUTIVE_SUMMARY_DRAFT':
        return ['PROJECT', 'SECTION'];

      case 'CONTENT_REWRITE_PROPOSAL':
        return ['SECTION', 'CLAIMS'];

      case 'PRESENTER_QA_PREPARATION':
        return ['SECTION', 'CLAIMS', 'PRESENTER'];

      case 'PRESENTER_TALKING_POINTS':
        return ['PRESENTATION', 'PRESENTER', 'SECTION'];

      case 'COMPARISON':
        return ['PROJECT', 'NARRATIVE'];

      case 'EXPLANATION':
        return ['CLAIMS', 'EVIDENCE', 'TRUST'];

      default:
        return ['PROJECT'];
    }
  }
}
