import { PresentationProfileRepository } from '../../domain/ports/presentation-profile-repository.port';
import { PresentationProfile } from '../../domain/presentation.types';

export class JsonPresentationProfileRepository implements PresentationProfileRepository {
  private profiles: Map<string, PresentationProfile> = new Map();
  private isLoaded = false;

  constructor(private readonly provider?: () => Promise<PresentationProfile[]> | PresentationProfile[]) {}

  private async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;

    if (this.provider) {
      const list = await this.provider();
      for (const p of list) {
        this.profiles.set(p.id, p);
      }
    } else {
      const defaultProfiles: PresentationProfile[] = [
        {
          id: 'investor-executive',
          profileVersion: '1.0',
          name: 'Investor Executive Master Profile',
          audience: 'INVESTOR',
          description: 'High-impact visual presentation profile optimized for angel, VC, and private equity venture pitches.',
          preferredDensity: 'STANDARD',
          scenePreferences: {
            IDENTITY: 'EXECUTIVE_HERO',
            EXECUTIVE_SUMMARY: 'SECTION_DIVIDER',
            PROBLEM: 'PROBLEM_FRAME',
            WHY_NOW: 'WHY_NOW',
            CUSTOMER: 'PROBLEM_FRAME',
            SOLUTION: 'SOLUTION_OVERVIEW',
            PRODUCT: 'PRODUCT_OVERVIEW',
            MARKET: 'MARKET_OVERVIEW',
            BUSINESS_MODEL: 'BUSINESS_MODEL',
            COMPETITION: 'COMPETITIVE_LANDSCAPE',
            TRACTION: 'TRACTION',
            FINANCIALS: 'FINANCIAL_OVERVIEW',
            TECHNOLOGY: 'TECHNOLOGY_OVERVIEW',
            RISKS: 'RISK_OVERVIEW',
            ROADMAP: 'ROADMAP',
            TEAM: 'TEAM',
            ASK: 'ASK'
          }
        },
        {
          id: 'executive-brief',
          profileVersion: '1.0',
          name: 'Executive Briefing Profile',
          audience: 'EXECUTIVE',
          description: 'Concise, decision-oriented presentation profile optimized for C-suite steering committees and board briefings.',
          preferredDensity: 'COMPACT',
          scenePreferences: {
            IDENTITY: 'EXECUTIVE_HERO',
            EXECUTIVE_SUMMARY: 'DECISION_FRAME',
            PROBLEM: 'PROBLEM_FRAME',
            SOLUTION: 'SOLUTION_OVERVIEW',
            PRODUCT: 'PRODUCT_OVERVIEW',
            BUSINESS_MODEL: 'BUSINESS_MODEL',
            FINANCIALS: 'FINANCIAL_OVERVIEW',
            RISKS: 'RISK_OVERVIEW',
            ROADMAP: 'ROADMAP',
            ASK: 'DECISION_FRAME'
          }
        },
        {
          id: 'technical-deepdive',
          profileVersion: '1.0',
          name: 'Technical Architecture Deep Dive',
          audience: 'TECHNICAL',
          description: 'Exhaustive systems architecture, security, data flows, and infrastructure review profile.',
          preferredDensity: 'SPACIOUS',
          scenePreferences: {
            IDENTITY: 'EXECUTIVE_HERO',
            EXECUTIVE_SUMMARY: 'SECTION_DIVIDER',
            PROBLEM: 'PROBLEM_FRAME',
            CUSTOMER: 'PROBLEM_FRAME',
            SOLUTION: 'SOLUTION_OVERVIEW',
            PRODUCT: 'PRODUCT_OVERVIEW',
            TECHNOLOGY: 'ARCHITECTURE_MAP',
            RISKS: 'RISK_OVERVIEW',
            ROADMAP: 'ROADMAP',
            TEAM: 'TEAM'
          }
        }
      ];

      for (const p of defaultProfiles) {
        this.profiles.set(p.id, p);
      }
    }

    this.isLoaded = true;
  }

  async list(): Promise<PresentationProfile[]> {
    await this.ensureLoaded();
    return Array.from(this.profiles.values());
  }

  async findById(id: string): Promise<PresentationProfile | null> {
    await this.ensureLoaded();
    return this.profiles.get(id) || null;
  }
}
