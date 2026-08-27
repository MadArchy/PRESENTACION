/**
 * Section Content Schemas — Venture Hub OS
 * Structured types and content definitions for the 17 canonical Project Twin sections.
 */

export interface IdentityContent {
  tagline: { es: string; en: string };
  foundedYear?: number;
  stage: string;
  headquarters?: string;
  brandAttributes?: string[];
  website?: string;
}

export interface ExecutiveSummaryContent {
  elevatorPitch: { es: string; en: string };
  coreValueProposition: { es: string; en: string };
  keyHighlights: string[];
  targetAudienceFocus?: {
    investor?: string;
    b2b?: string;
    tech?: string;
  };
}

export interface ProblemContent {
  problemStatement: { es: string; en: string };
  affectedSegments: string[];
  currentInefficiencies: string[];
  financialImpact?: string;
  urgencyDriver?: string;
}

export interface CustomerContent {
  idealCustomerProfile: string;
  primaryBuyerPersona: string;
  userPersonas: string[];
  tamSamSomContext?: string;
}

export interface SolutionContent {
  solutionOverview: { es: string; en: string };
  coreCapabilities: string[];
  keyDifferentiators: string[];
  unfairAdvantage?: string;
}

export interface WhyNowContent {
  marketTailwinds: string[];
  technologicalInflectionPoint: string;
  regulatoryOrMacroDriver?: string;
}

export interface MarketContent {
  tam?: string;
  sam?: string;
  som?: string;
  cagr?: string;
  marketDynamics: string[];
  sources?: string[];
}

export interface ProductContent {
  architectureOverview: string;
  coreModules: Array<{
    name: string;
    description: string;
    status: 'production' | 'pilot' | 'roadmap';
  }>;
  integrations?: string[];
}

export interface BusinessModelContent {
  monetizationStreams: Array<{
    name: string;
    type: 'saas' | 'hardware' | 'transaction_fee' | 'commission' | 'enterprise_license';
    pricingStructure: string;
  }>;
  unitEconomics?: {
    cac?: string;
    ltv?: string;
    grossMargin?: string;
    paybackPeriod?: string;
  };
}

export interface CompetitionContent {
  competitiveLandscape: string;
  directCompetitors: string[];
  indirectCompetitors: string[];
  defensibilityMoat: string[];
}

export interface TractionContent {
  pilotCustomers?: number;
  activeDeployments?: number;
  keyMetrics?: Record<string, string | number>;
  milestonesAchieved: string[];
}

export interface FinancialsContent {
  historicalFinancials?: Record<string, any>;
  projections?: Array<{
    year: string;
    revenue: string;
    grossMargin: string;
    ebitda?: string;
  }>;
  fundingHistory?: Array<{
    round: string;
    amount: string;
    date?: string;
    leadInvestors?: string[];
  }>;
}

export interface TechnologyContent {
  techStack: string[];
  hardwareSpecs?: string[];
  cryptographicOrAiPrimitives?: string[];
  patentsOrIp?: string[];
  securityAndCompliance?: string[];
}

export interface RisksContent {
  identifiedRisks: Array<{
    risk: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    mitigation: string;
  }>;
}

export interface RoadmapContent {
  phases: Array<{
    quarterOrPhase: string;
    milestones: string[];
    status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED';
  }>;
}

export interface TeamContent {
  founders: Array<{
    name: string;
    role: string;
    bio: string;
    pastExperience?: string[];
  }>;
  advisors?: Array<{
    name: string;
    area: string;
  }>;
}

export interface AskContent {
  targetAmount: string;
  instrument: 'SAFE' | 'Equity' | 'Convertible_Note' | 'Grant';
  useOfFunds: Array<{
    category: string;
    percentage: number;
    allocationGoal: string;
  }>;
  runwayMonths?: number;
}
