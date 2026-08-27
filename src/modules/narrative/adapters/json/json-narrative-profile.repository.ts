import { NarrativeProfileRepository } from '../../domain/ports/narrative-profile-repository.port';
import { NarrativeProfile, AudienceType } from '../../domain/narrative.types';

export class JsonNarrativeProfileRepository implements NarrativeProfileRepository {
  private profiles: Map<string, NarrativeProfile> = new Map();
  private isLoaded = false;

  constructor(private readonly provider?: () => Promise<NarrativeProfile[]> | NarrativeProfile[]) {}

  private async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;

    if (this.provider) {
      const list = await this.provider();
      list.forEach(p => this.profiles.set(p.id, p));
    } else {
      // Default built-in profiles
      const defaultProfiles: NarrativeProfile[] = [
        {
          id: 'investor-standard',
          name: 'Investor Standard Pitch',
          profileVersion: '1.0',
          audience: 'INVESTOR',
          supportedObjectives: ['RAISE_CAPITAL', 'INFORM', 'PERSUADE'],
          mandatorySections: ['EXECUTIVE_SUMMARY', 'PROBLEM', 'SOLUTION', 'MARKET', 'BUSINESS_MODEL', 'ASK'],
          sectionPriorities: {
            IDENTITY: 60,
            EXECUTIVE_SUMMARY: 100,
            PROBLEM: 95,
            CUSTOMER: 80,
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
            ASK: 100
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
          },
          objectiveModifiers: {
            RAISE_CAPITAL: {
              MARKET: 15,
              BUSINESS_MODEL: 20,
              TRACTION: 25,
              ASK: 30,
              FINANCIALS: 20
            }
          },
          durationBudgets: {
            THREE_MINUTES: { minSteps: 4, maxSteps: 6, targetSeconds: 180 },
            FIVE_MINUTES: { minSteps: 6, maxSteps: 8, targetSeconds: 300 },
            TEN_MINUTES: { minSteps: 8, maxSteps: 12, targetSeconds: 600 },
            TWENTY_MINUTES: { minSteps: 12, maxSteps: 18, targetSeconds: 1200 },
            DEEP_DIVE: { minSteps: 10, maxSteps: 25, targetSeconds: 1800 }
          }
        },
        {
          id: 'executive-brief',
          name: 'Executive Decision Brief',
          profileVersion: '1.0',
          audience: 'EXECUTIVE',
          supportedObjectives: ['DECISION_SUPPORT', 'STRATEGIC_REVIEW', 'INFORM', 'ALIGN'],
          mandatorySections: ['EXECUTIVE_SUMMARY', 'PROBLEM', 'SOLUTION', 'BUSINESS_MODEL', 'ROADMAP'],
          sectionPriorities: {
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
          },
          objectiveModifiers: {
            DECISION_SUPPORT: {
              EXECUTIVE_SUMMARY: 20,
              RISKS: 25,
              FINANCIALS: 20,
              ROADMAP: 20,
              TECHNOLOGY: -10
            }
          },
          durationBudgets: {
            THREE_MINUTES: { minSteps: 4, maxSteps: 5, targetSeconds: 180 },
            FIVE_MINUTES: { minSteps: 5, maxSteps: 7, targetSeconds: 300 },
            TEN_MINUTES: { minSteps: 7, maxSteps: 10, targetSeconds: 600 },
            TWENTY_MINUTES: { minSteps: 10, maxSteps: 15, targetSeconds: 1200 },
            DEEP_DIVE: { minSteps: 8, maxSteps: 20, targetSeconds: 1800 }
          }
        },
        {
          id: 'technical-deepdive',
          name: 'Technical Architecture Review',
          profileVersion: '1.0',
          audience: 'TECHNICAL',
          supportedObjectives: ['ARCHITECTURE_REVIEW', 'INFORM', 'VALIDATE'],
          mandatorySections: ['PROBLEM', 'SOLUTION', 'PRODUCT', 'TECHNOLOGY', 'RISKS', 'ROADMAP'],
          sectionPriorities: {
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
          },
          objectiveModifiers: {
            ARCHITECTURE_REVIEW: {
              PRODUCT: 25,
              TECHNOLOGY: 35,
              RISKS: 20,
              ROADMAP: 15,
              FINANCIALS: -30,
              ASK: -40
            }
          },
          durationBudgets: {
            THREE_MINUTES: { minSteps: 4, maxSteps: 6, targetSeconds: 180 },
            FIVE_MINUTES: { minSteps: 6, maxSteps: 9, targetSeconds: 300 },
            TEN_MINUTES: { minSteps: 9, maxSteps: 14, targetSeconds: 600 },
            TWENTY_MINUTES: { minSteps: 12, maxSteps: 18, targetSeconds: 1200 },
            DEEP_DIVE: { minSteps: 10, maxSteps: 25, targetSeconds: 1800 }
          }
        }
      ];

      defaultProfiles.forEach(p => this.profiles.set(p.id, p));
    }

    this.isLoaded = true;
  }

  async findById(id: string): Promise<NarrativeProfile | null> {
    await this.ensureLoaded();
    return this.profiles.get(id) || null;
  }

  async findByAudience(audience: AudienceType): Promise<NarrativeProfile | null> {
    await this.ensureLoaded();
    const list = Array.from(this.profiles.values());
    const found = list.find(p => p.audience === audience);
    return found || null;
  }

  async list(): Promise<NarrativeProfile[]> {
    await this.ensureLoaded();
    return Array.from(this.profiles.values());
  }
}
