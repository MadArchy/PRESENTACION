import { ProjectSectionType } from '../../project/domain/project.types';

export type AudienceType =
  | 'EXECUTIVE'
  | 'INVESTOR'
  | 'BOARD'
  | 'COMMERCIAL'
  | 'TECHNICAL'
  | 'DUE_DILIGENCE'
  | 'INTERNAL_STRATEGY'
  | 'DEMO_DAY';

export type NarrativeObjective =
  | 'INFORM'
  | 'ALIGN'
  | 'PERSUADE'
  | 'RAISE_CAPITAL'
  | 'SELL'
  | 'ARCHITECTURE_REVIEW'
  | 'STRATEGIC_REVIEW'
  | 'DECISION_SUPPORT'
  | 'VALIDATE'
  | 'DUE_DILIGENCE';

export type NarrativeDuration =
  | 'THREE_MINUTES'
  | 'FIVE_MINUTES'
  | 'TEN_MINUTES'
  | 'TWENTY_MINUTES'
  | 'DEEP_DIVE';

export type NarrativeDepth = 'BRIEF' | 'STANDARD' | 'DEEP';

export type NarrativeLanguage = 'ES' | 'EN';

export type NarrativeRole =
  | 'OPENING'
  | 'CONTEXT'
  | 'PROBLEM'
  | 'TENSION'
  | 'OPPORTUNITY'
  | 'SOLUTION'
  | 'PROOF'
  | 'ECONOMICS'
  | 'DIFFERENTIATION'
  | 'RISK'
  | 'EXECUTION'
  | 'DECISION'
  | 'ASK'
  | 'CLOSING';

export type NarrativeStepStatus =
  | 'READY'
  | 'PARTIAL'
  | 'MISSING_CONTENT'
  | 'LANGUAGE_GAP'
  | 'OMITTED_BY_POLICY';

export type NarrativeReadiness =
  | 'READY'
  | 'READY_WITH_WARNINGS'
  | 'NOT_READY';

export type DurationStatus =
  | 'WITHIN_TARGET'
  | 'NORMAL_TOLERANCE'
  | 'MODERATE_OVERFLOW'
  | 'CRITICAL_OVERFLOW';

export interface NarrativeTiming {
  targetSeconds: number;
  estimatedSeconds: number;
  overflowSeconds: number;
  overflowPercent: number;
  status: DurationStatus;
}

export interface NarrativeRequest {
  projectId: string;
  projectVersion?: string;
  audience: AudienceType;
  objective: NarrativeObjective;
  duration: NarrativeDuration;
  language: NarrativeLanguage;
  depth: NarrativeDepth;
  profileId?: string;
}

export interface NarrativeStep {
  id: string;
  order: number;
  role: NarrativeRole;
  sectionType: ProjectSectionType;
  title: string;
  priority: number;
  depth: NarrativeDepth;
  estimatedSeconds: number;
  rationale: string;
  status: NarrativeStepStatus;
  sourceSectionId: string;
  languageUsed: 'es' | 'en';
  isLanguageFallback?: boolean;
}

export interface NarrativeGap {
  id: string;
  sectionType: ProjectSectionType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKING';
  reason:
    | 'SECTION_EMPTY'
    | 'SECTION_MISSING'
    | 'LANGUAGE_MISSING'
    | 'MANDATORY_SECTION_UNAVAILABLE'
    | 'INSUFFICIENT_DURATION';
  message: string;
}

export interface NarrativeWarning {
  code: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  sectionType?: ProjectSectionType;
  metadata?: Record<string, any>;
}

export interface NarrativePlan {
  id: string;
  projectId: string;
  projectVersion: string;
  profileId: string;
  profileVersion: string;
  request: NarrativeRequest;
  readiness: NarrativeReadiness;
  timing: NarrativeTiming;
  totalEstimatedSeconds: number;
  steps: NarrativeStep[];
  warnings: NarrativeWarning[];
  gaps: NarrativeGap[];
  omittedSectionTypes: ProjectSectionType[];
  generatedAt: string;
  engineVersion: string;
}

export interface NarrativeProfile {
  id: string;
  name: string;
  profileVersion: string;
  audience: AudienceType;
  supportedObjectives: NarrativeObjective[];
  mandatorySections: ProjectSectionType[];
  sectionPriorities: Partial<Record<ProjectSectionType, number>>;
  roleMappings: Partial<Record<ProjectSectionType, NarrativeRole>>;
  objectiveModifiers: Record<string, Partial<Record<ProjectSectionType, number>>>;
  durationBudgets: Partial<Record<NarrativeDuration, { minSteps: number; maxSteps: number; targetSeconds: number }>>;
}
