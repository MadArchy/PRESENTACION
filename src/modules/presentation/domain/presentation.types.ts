import { BilingualText, ProjectSectionType } from '../../project/domain/project.types';
import { ClaimType, ClaimSupportStatus, ClaimMateriality, TrustReadiness } from '../../claim/domain/claim.types';
import { AudienceType, NarrativeObjective } from '../../narrative/domain/narrative.types';

export type SceneType =
  | 'EXECUTIVE_HERO'
  | 'SECTION_DIVIDER'
  | 'PROBLEM_FRAME'
  | 'WHY_NOW'
  | 'SOLUTION_OVERVIEW'
  | 'PRODUCT_OVERVIEW'
  | 'MARKET_OVERVIEW'
  | 'BUSINESS_MODEL'
  | 'COMPETITIVE_LANDSCAPE'
  | 'TRACTION'
  | 'FINANCIAL_OVERVIEW'
  | 'TECHNOLOGY_OVERVIEW'
  | 'ARCHITECTURE_MAP'
  | 'RISK_OVERVIEW'
  | 'ROADMAP'
  | 'TEAM'
  | 'EVIDENCE_OVERVIEW'
  | 'DECISION_FRAME'
  | 'ASK'
  | 'CLOSING'
  | 'GENERIC_CONTENT';

export type SceneRole =
  | 'OPENING'
  | 'CONTEXT'
  | 'PROBLEM'
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

export type SceneStatus =
  | 'READY'
  | 'READY_WITH_WARNINGS'
  | 'INCOMPLETE'
  | 'BLOCKED';

export type LayoutVariant =
  | 'HERO'
  | 'SPLIT'
  | 'STACKED'
  | 'GRID'
  | 'METRIC_WALL'
  | 'TIMELINE'
  | 'MATRIX'
  | 'DIAGRAM'
  | 'FULL_BLEED_MEDIA'
  | 'CONTENT_PLUS_EVIDENCE'
  | 'MINIMAL';

export type ContentBindingType =
  | 'TEXT'
  | 'BULLET_LIST'
  | 'KEY_VALUE'
  | 'METRIC'
  | 'METRIC_SET'
  | 'TABLE'
  | 'COMPARISON'
  | 'TIMELINE'
  | 'ROADMAP'
  | 'RISK_LIST'
  | 'ARCHITECTURE_NODES'
  | 'ARCHITECTURE_EDGES'
  | 'CLAIM'
  | 'CLAIM_SET'
  | 'EVIDENCE_SUMMARY'
  | 'MEDIA';

export interface ContentBinding {
  id: string;
  type: ContentBindingType;
  sourceType: 'PROJECT_SECTION' | 'NARRATIVE_STEP' | 'CLAIM' | 'EVIDENCE' | 'DERIVED';
  sourceRef: string;
  field?: string;
  label?: BilingualText;
  value: unknown;
  presentationHints?: {
    emphasis?: 'PRIMARY' | 'SECONDARY' | 'SUBTLE';
    priority?: number;
    format?: 'NUMBER' | 'CURRENCY' | 'PERCENT' | 'RATIO' | 'DURATION' | 'DATE' | 'TEXT';
    alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
    density?: 'COMPACT' | 'STANDARD' | 'SPACIOUS';
  };
}

export interface TrustBinding {
  claimId: string;
  claimType: ClaimType;
  supportStatus: ClaimSupportStatus;
  materiality: ClaimMateriality;
  labelRequired: boolean;
  warningCode?: string;
  message?: string;
}

export interface MediaBinding {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'ICON' | 'DIAGRAM';
  sourceRef: string;
  alt?: string;
  caption?: string;
  role?: string;
}

export interface PresentationScene {
  id: string;
  order: number;
  type: SceneType;
  role: SceneRole;
  status: SceneStatus;
  title: BilingualText;
  eyebrow?: BilingualText;
  subtitle?: BilingualText;
  layout: LayoutVariant;
  bindings: ContentBinding[];
  trustBindings: TrustBinding[];
  mediaBindings: MediaBinding[];
  sourceNarrativeStepId: string;
  sourceSectionType: ProjectSectionType;
  sourceSectionId?: string;
  estimatedSeconds: number;
}

export interface PresentationTrustSummary {
  referencedClaims: number;
  supportedMaterialFacts: number;
  unsupportedMaterialFacts: number;
  contradictedClaims: number;
  targets: number;
  assumptions: number;
  estimates: number;
  hypotheses: number;
  readiness: TrustReadiness;
}

export type PresentationReadiness =
  | 'PRESENTATION_READY'
  | 'PRESENTATION_READY_WITH_WARNINGS'
  | 'PRESENTATION_NOT_READY';

export interface PresentationCompilerWarning {
  code: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  sceneId?: string;
  message: string;
}

export interface PresentationDefinition {
  id: string;
  projectId: string;
  projectVersion: string;
  narrativePlanId: string;
  narrativeProfileId: string;
  narrativeProfileVersion: string;
  presentationProfileId: string;
  presentationProfileVersion: string;
  themeId: string;
  themeVersion: string;
  language: 'ES' | 'EN';
  audience: AudienceType;
  objective: NarrativeObjective;
  readiness: PresentationReadiness;
  totalEstimatedSeconds: number;
  scenes: PresentationScene[];
  trustSummary: PresentationTrustSummary;
  warnings: PresentationCompilerWarning[];
  compilerVersion: string;
  schemaVersion: string;
  generatedAt: string;
}

export interface SceneTemplate {
  sceneType: SceneType;
  defaultRole: SceneRole;
  supportedLayouts: LayoutVariant[];
  defaultLayout: LayoutVariant;
  requiredBindingTypes: ContentBindingType[];
  optionalBindingTypes: ContentBindingType[];
  supportsTrust: boolean;
  supportsMedia: boolean;
  maxItems?: number;
}

export interface PresentationProfile {
  id: string;
  profileVersion: string;
  name: string;
  audience: AudienceType;
  description: string;
  scenePreferences: Record<string, SceneType>;
  preferredDensity: 'COMPACT' | 'STANDARD' | 'SPACIOUS';
}

export interface ThemeColorTokens {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceHover: string;
  border: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSubtle: string;
  gold: string;
  statusSuccess: string;
  statusWarning: string;
  statusDanger: string;
  statusInfo: string;
}

export interface PresentationTheme {
  id: string;
  version: string;
  name: string;
  mode: 'DARK' | 'LIGHT';
  tokens: {
    color: ThemeColorTokens;
    typography: {
      fontFamilySans: string;
      fontFamilyMono: string;
      fontSizeDisplay: string;
      fontSizeHeadline: string;
      fontSizeSubheadline: string;
      fontSizeBody: string;
      fontSizeCaption: string;
    };
    spacing: {
      scenePadding: string;
      blockGap: string;
      elementGap: string;
    };
    radius: {
      card: string;
      pill: string;
      button: string;
    };
    elevation: {
      card: string;
      modal: string;
    };
    motion: {
      transitionFast: string;
      transitionNormal: string;
    };
  };
}
