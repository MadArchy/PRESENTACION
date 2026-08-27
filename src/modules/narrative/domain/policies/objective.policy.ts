import { NarrativeObjective } from '../narrative.types';
import { ProjectSectionType } from '../../../project/domain/project.types';

export class ObjectivePolicy {
  getModifiers(objective: NarrativeObjective): Partial<Record<ProjectSectionType, number>> {
    switch (objective) {
      case 'RAISE_CAPITAL':
        return {
          MARKET: 15,
          BUSINESS_MODEL: 20,
          TRACTION: 25,
          ASK: 30,
          FINANCIALS: 20
        };
      case 'ARCHITECTURE_REVIEW':
        return {
          PRODUCT: 25,
          TECHNOLOGY: 35,
          RISKS: 20,
          ROADMAP: 15,
          FINANCIALS: -30,
          ASK: -40
        };
      case 'DECISION_SUPPORT':
      case 'STRATEGIC_REVIEW':
        return {
          EXECUTIVE_SUMMARY: 20,
          RISKS: 25,
          FINANCIALS: 20,
          ROADMAP: 20,
          TECHNOLOGY: -10
        };
      case 'SELL':
        return {
          PROBLEM: 25,
          SOLUTION: 30,
          CUSTOMER: 20,
          WHY_NOW: 20,
          FINANCIALS: -20,
          ASK: -30
        };
      case 'INFORM':
      case 'ALIGN':
      default:
        return {};
    }
  }
}
