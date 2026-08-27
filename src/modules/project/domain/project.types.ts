export type ProjectStatus =
  | 'concept'
  | 'validation'
  | 'pilot'
  | 'active'
  | 'paused'
  | 'archived';

export type ProjectType =
  | 'SOFTWARE'
  | 'AI_PLATFORM'
  | 'DEEPTECH'
  | 'FOODTECH'
  | 'EDTECH'
  | 'INFRASTRUCTURE'
  | 'SERVICE'
  | 'PHYSICAL_BUSINESS'
  | 'HYBRID'
  | 'OTHER';

export type Language = 'es' | 'en';

export type ProjectSectionStatus =
  | 'EMPTY'
  | 'DRAFT'
  | 'IN_REVIEW'
  | 'VALIDATED'
  | 'NOT_APPLICABLE';

export type ProjectSectionType =
  | 'IDENTITY'
  | 'EXECUTIVE_SUMMARY'
  | 'PROBLEM'
  | 'CUSTOMER'
  | 'SOLUTION'
  | 'WHY_NOW'
  | 'MARKET'
  | 'PRODUCT'
  | 'BUSINESS_MODEL'
  | 'COMPETITION'
  | 'TRACTION'
  | 'FINANCIALS'
  | 'TECHNOLOGY'
  | 'RISKS'
  | 'ROADMAP'
  | 'TEAM'
  | 'ASK';

export interface SourceReference {
  type: 'legacy-deck' | 'raw-extract' | 'document' | 'metric';
  reference: string;
  locator?: string;
  note?: string;
}

export interface BilingualText {
  es: string;
  en: string;
}

export interface ProjectSectionData<T = any> {
  id: string;
  type: ProjectSectionType;
  title: BilingualText;
  status: ProjectSectionStatus;
  schemaVersion: string;
  content: T;
  sourceRefs?: SourceReference[];
  updatedAt: string;
}

export interface ProjectVersionData {
  id: string;
  projectId: string;
  version: string;
  status: ProjectStatus;
  createdAt: string;
  createdBy: string;
  changeSummary?: string;
  sections: ProjectSectionData[];
}

export interface ProjectTwinData {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  type: ProjectType;
  status: ProjectStatus;
  schemaVersion: string;
  currentVersion: string;
  defaultLanguage: Language;
  languages: Language[];
  theme?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
  kicker?: {
    es: string;
    en: string;
  };
  versions: ProjectVersionData[];
}

export interface ProjectSummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: ProjectStatus;
  type?: ProjectType;
  projectVersion: string;
  schemaVersion: string;
  defaultLanguage: Language;
  availableLanguages: Language[];
  theme?: string;
  totalSlides?: number;
  kicker?: {
    es: string;
    en: string;
  };
}

export interface ProjectManifest {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: ProjectStatus;
  type?: ProjectType;
  schemaVersion: string;
  projectVersion: string;
  defaultLanguage: Language;
  languages: Language[];
  theme?: string;
  capabilities: string[];
  totalSlides?: number;
  kicker?: {
    es: string;
    en: string;
  };
  entrypoints?: {
    project?: string;
    legacyDeck?: string;
  };
}

export type IssueSeverity = 'ERROR' | 'WARNING' | 'INFO';

export interface ValidationIssue {
  code: string;
  severity: IssueSeverity;
  path: string;
  message: string;
}

export interface ProjectValidationResult {
  valid: boolean;
  errorCount: number;
  warningCount: number;
  infoCount: number;
  issues: ValidationIssue[];
}
