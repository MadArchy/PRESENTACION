export type CopilotTaskType =
  | 'PROJECT_ANALYSIS'
  | 'GAP_ANALYSIS'
  | 'NARRATIVE_CRITIQUE'
  | 'PRESENTATION_CRITIQUE'
  | 'TRUST_REVIEW'
  | 'RISK_REVIEW'
  | 'EXECUTIVE_SUMMARY_DRAFT'
  | 'CONTENT_REWRITE_PROPOSAL'
  | 'PRESENTER_QA_PREPARATION'
  | 'PRESENTER_TALKING_POINTS'
  | 'COMPARISON'
  | 'EXPLANATION';

export type CopilotTaskRisk =
  | 'READ_ONLY_ANALYSIS'
  | 'DRAFT_GENERATION'
  | 'CHANGE_PROPOSAL';

export type CopilotContextScope =
  | 'PROJECT'
  | 'SECTION'
  | 'NARRATIVE'
  | 'PRESENTATION'
  | 'CLAIMS'
  | 'EVIDENCE'
  | 'TRUST'
  | 'PRESENTER';

export type CopilotResultStatus =
  | 'COMPLETED'
  | 'COMPLETED_WITH_WARNINGS'
  | 'FAILED'
  | 'BLOCKED';

export type CopilotFindingType =
  | 'INSIGHT'
  | 'GAP'
  | 'RISK'
  | 'INCONSISTENCY'
  | 'OPPORTUNITY'
  | 'QUESTION'
  | 'TRUST_CONCERN'
  | 'PRESENTATION_CONCERN'
  | 'NARRATIVE_CONCERN';

export type CopilotProposalType =
  | 'SECTION_TEXT_UPDATE'
  | 'BULLETS_UPDATE'
  | 'EXECUTIVE_SUMMARY_UPDATE'
  | 'SPEAKER_NOTE_SUGGESTION'
  | 'QA_CARD_SUGGESTION';

export type CopilotProposalStatus =
  | 'PROPOSED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'SUPERSEDED';

export type AiProviderType = 'MOCK' | 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'OLLAMA';

export interface AiModelCapabilities {
  provider: AiProviderType;
  modelId: string;
  supportsText: boolean;
  supportsStructuredOutput: boolean;
  supportsStreaming: boolean;
  supportsLargeContext?: boolean;
}

export interface AiCompletionRequest {
  systemPrompt: string;
  userPrompt: string;
  contextJson?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AiCompletionResponse {
  rawText: string;
  structuredJson?: Record<string, unknown>;
  tokensUsed?: { prompt: number; completion: number; total: number };
  providerMetadata?: Record<string, unknown>;
}

export interface CopilotSourceRef {
  type: string;
  reference: string;
  locator?: string;
  title?: string;
}

export interface CopilotSectionContext {
  id: string;
  type: string;
  title: { es: string; en: string };
  status: string;
  content: unknown;
  sourceRefs: CopilotSourceRef[];
}

export interface CopilotClaimContext {
  id: string;
  type: string;
  text: { es: string; en: string };
  supportStatus: string;
  materiality: string;
  evidenceCount: number;
}

export interface CopilotEvidenceContext {
  id: string;
  type: string;
  title: string;
  status: string;
  source?: unknown;
}

export interface CopilotContextBundle {
  projectId: string;
  projectVersion: string;
  contextVersion: string;
  scope: CopilotContextScope[];
  sections?: CopilotSectionContext[];
  narrative?: Record<string, unknown>;
  claims?: CopilotClaimContext[];
  evidence?: CopilotEvidenceContext[];
  trustSummary?: Record<string, unknown>;
  presentation?: Record<string, unknown>;
  presenter?: Record<string, unknown>;
  sourceRefs: CopilotSourceRef[];
  limitations: string[];
}

export interface CopilotFinding {
  id: string;
  type: CopilotFindingType;
  title: string;
  explanation: string;
  severity?: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH';
  sourceRefs: string[];
}

export interface CopilotProposalTarget {
  entityType: 'PROJECT_SECTION' | 'SPEAKER_NOTE' | 'QA_CARD';
  entityId: string;
  field?: string;
}

export interface CopilotProposal {
  id: string;
  proposalType: CopilotProposalType;
  target: CopilotProposalTarget;
  rationale: string;
  currentValue?: unknown;
  proposedValue: unknown;
  sourceRefs: string[];
  status: CopilotProposalStatus;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface CopilotCitation {
  id: string;
  sourceType: string;
  sourceRef: string;
  snippet?: string;
}

export interface CopilotGroundingSummary {
  sourcesAnalyzedCount: number;
  claimsReferencedCount: number;
  evidenceItemsReferencedCount: number;
  limitationsAcknowledged: boolean;
}

export interface CopilotWarning {
  code: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
}

export interface CopilotProviderSelection {
  provider: AiProviderType;
  modelId: string;
  temperature?: number;
}

export interface CopilotRequest {
  id: string;
  taskType: CopilotTaskType;
  projectId: string;
  projectVersion: string;
  contextScope: CopilotContextScope[];
  userInstruction?: string;
  providerConfig: CopilotProviderSelection;
  language: 'ES' | 'EN';
  createdAt: string;
}

export interface CopilotResult {
  id: string;
  requestId: string;
  status: CopilotResultStatus;
  summary: string;
  findings: CopilotFinding[];
  proposals: CopilotProposal[];
  citations: CopilotCitation[];
  grounding: CopilotGroundingSummary;
  warnings: CopilotWarning[];
  providerMetadata: {
    provider: AiProviderType;
    modelId: string;
    durationMs: number;
  };
  generatedAt: string;
}
