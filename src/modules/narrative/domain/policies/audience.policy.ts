import { AudienceType, NarrativeRole } from '../narrative.types';
import { ProjectSectionType } from '../../../project/domain/project.types';

export interface AudienceProfileDefaults {
  mandatorySections: ProjectSectionType[];
  basePriorities: Record<ProjectSectionType, number>;
  roleMappings: Record<ProjectSectionType, NarrativeRole>;
}

export class AudiencePolicy {
  getDefaults(audience: AudienceType): AudienceProfileDefaults {
    switch (audience) {
      case 'INVESTOR':
      case 'DEMO_DAY':
        return {
          mandatorySections: ['EXECUTIVE_SUMMARY', 'PROBLEM', 'SOLUTION', 'MARKET', 'BUSINESS_MODEL', 'ASK'],
          basePriorities: {
            EXECUTIVE_SUMMARY: 100,
            PROBLEM: 95,
            WHY_NOW: 90,
            SOLUTION: 95,
            MARKET: 90,
            PRODUCT: 80,
            BUSINESS_MODEL: 95,
            COMPETITION: 85,
            TRACTION: 95,
            FINANCIALS: 85,
            TECHNOLOGY: 75,
            RISKS: 70,
            ROADMAP: 80,
            TEAM: 85,
            ASK: 100,
            IDENTITY: 60,
            CUSTOMER: 80
          },
          roleMappings: {
            IDENTITY: 'OPENING',
            EXECUTIVE_SUMMARY: 'OPENING',
            PROBLEM: 'PROBLEM',
            CUSTOMER: 'CONTEXT',
            WHY_NOW: 'OPPORTUNITY',
            SOLUTION: 'SOLUTION',
            MARKET: 'OPPORTUNITY',
            PRODUCT: 'SOLUTION',
            BUSINESS_MODEL: 'ECONOMICS',
            COMPETITION: 'DIFFERENTIATION',
            TRACTION: 'PROOF',
            FINANCIALS: 'ECONOMICS',
            TECHNOLOGY: 'DIFFERENTIATION',
            RISKS: 'RISK',
            ROADMAP: 'EXECUTION',
            TEAM: 'EXECUTION',
            ASK: 'ASK'
          }
        };

      case 'TECHNICAL':
      case 'ARCHITECTURE_REVIEW' as any:
        return {
          mandatorySections: ['PROBLEM', 'SOLUTION', 'PRODUCT', 'TECHNOLOGY', 'RISKS', 'ROADMAP'],
          basePriorities: {
            IDENTITY: 50,
            EXECUTIVE_SUMMARY: 80,
            PROBLEM: 95,
            CUSTOMER: 70,
            WHY_NOW: 75,
            SOLUTION: 95,
            MARKET: 40,
            PRODUCT: 95,
            BUSINESS_MODEL: 50,
            COMPETITION: 60,
            TRACTION: 65,
            FINANCIALS: 40,
            TECHNOLOGY: 100,
            RISKS: 90,
            ROADMAP: 85,
            TEAM: 70,
            ASK: 30
          },
          roleMappings: {
            IDENTITY: 'CONTEXT',
            EXECUTIVE_SUMMARY: 'CONTEXT',
            PROBLEM: 'PROBLEM',
            CUSTOMER: 'CONTEXT',
            WHY_NOW: 'TENSION',
            SOLUTION: 'SOLUTION',
            MARKET: 'CONTEXT',
            PRODUCT: 'SOLUTION',
            BUSINESS_MODEL: 'ECONOMICS',
            COMPETITION: 'DIFFERENTIATION',
            TRACTION: 'PROOF',
            FINANCIALS: 'ECONOMICS',
            TECHNOLOGY: 'SOLUTION',
            RISKS: 'RISK',
            ROADMAP: 'EXECUTION',
            TEAM: 'EXECUTION',
            ASK: 'DECISION'
          }
        };

      case 'EXECUTIVE':
      case 'BOARD':
      default:
        return {
          mandatorySections: ['EXECUTIVE_SUMMARY', 'PROBLEM', 'SOLUTION', 'BUSINESS_MODEL', 'ROADMAP'],
          basePriorities: {
            IDENTITY: 60,
            EXECUTIVE_SUMMARY: 100,
            PROBLEM: 90,
            CUSTOMER: 75,
            WHY_NOW: 80,
            SOLUTION: 90,
            MARKET: 75,
            PRODUCT: 70,
            BUSINESS_MODEL: 85,
            COMPETITION: 70,
            TRACTION: 85,
            FINANCIALS: 85,
            TECHNOLOGY: 60,
            RISKS: 85,
            ROADMAP: 90,
            TEAM: 70,
            ASK: 80
          },
          roleMappings: {
            IDENTITY: 'OPENING',
            EXECUTIVE_SUMMARY: 'OPENING',
            PROBLEM: 'PROBLEM',
            CUSTOMER: 'CONTEXT',
            WHY_NOW: 'OPPORTUNITY',
            SOLUTION: 'SOLUTION',
            MARKET: 'OPPORTUNITY',
            PRODUCT: 'SOLUTION',
            BUSINESS_MODEL: 'ECONOMICS',
            COMPETITION: 'DIFFERENTIATION',
            TRACTION: 'PROOF',
            FINANCIALS: 'ECONOMICS',
            TECHNOLOGY: 'DIFFERENTIATION',
            RISKS: 'RISK',
            ROADMAP: 'EXECUTION',
            TEAM: 'EXECUTION',
            ASK: 'DECISION'
          }
        };
    }
  }
}
