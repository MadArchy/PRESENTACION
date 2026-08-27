import { AudienceType } from '../narrative.types';
import { ProjectSectionType } from '../../../project/domain/project.types';

export class OrderingPolicy {
  getPreferredOrder(audience: AudienceType): ProjectSectionType[] {
    switch (audience) {
      case 'INVESTOR':
      case 'DEMO_DAY':
        return [
          'IDENTITY',
          'EXECUTIVE_SUMMARY',
          'PROBLEM',
          'WHY_NOW',
          'SOLUTION',
          'MARKET',
          'PRODUCT',
          'BUSINESS_MODEL',
          'COMPETITION',
          'TRACTION',
          'TECHNOLOGY',
          'FINANCIALS',
          'RISKS',
          'ROADMAP',
          'TEAM',
          'ASK'
        ];

      case 'TECHNICAL':
        return [
          'IDENTITY',
          'EXECUTIVE_SUMMARY',
          'PROBLEM',
          'CUSTOMER',
          'SOLUTION',
          'PRODUCT',
          'TECHNOLOGY',
          'RISKS',
          'ROADMAP',
          'TEAM',
          'ASK'
        ];

      case 'EXECUTIVE':
      case 'BOARD':
      default:
        return [
          'IDENTITY',
          'EXECUTIVE_SUMMARY',
          'PROBLEM',
          'CUSTOMER',
          'SOLUTION',
          'WHY_NOW',
          'MARKET',
          'BUSINESS_MODEL',
          'TRACTION',
          'FINANCIALS',
          'RISKS',
          'ROADMAP',
          'ASK'
        ];
    }
  }
}
