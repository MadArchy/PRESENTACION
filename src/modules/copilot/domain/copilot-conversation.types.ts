/**
 * Venture Hub OS — Copilot Domain Types
 */

export type CopilotMode =
  | 'EXECUTIVE'
  | 'ANALYST'
  | 'INVESTOR'
  | 'DUE_DILIGENCE'
  | 'PRESENTER';

export type GroundingStatus =
  | 'GROUNDED'
  | 'PARTIALLY_GROUNDED'
  | 'INSUFFICIENT_PROJECT_EVIDENCE';

export interface CopilotSourceRef {
  sourceType: 'PROJECT_TWIN' | 'CLAIM' | 'EVIDENCE' | 'DATA_ROOM_DOC' | 'ADMIN_HEALTH';
  sourceId: string;
  label: string;
  navigationTarget?: string;
  excerpt?: string;
}

export interface CopilotActionSuggestion {
  id: string;
  label: string;
  actionType: 'NAVIGATE' | 'CREATE_PROPOSAL' | 'REVIEW_CLAIM' | 'OPEN_DATA_ROOM' | 'PRESENT';
  targetModule: string;
  targetEntityId?: string;
}

export interface CopilotMessage {
  id: string;
  conversationId: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  groundingStatus?: GroundingStatus;
  sources?: CopilotSourceRef[];
  suggestedActions?: CopilotActionSuggestion[];
  followUpPrompts?: string[];
  createdAt: string;
}

export interface CopilotConversation {
  id: string;
  organizationId: string;
  projectId: string;
  userId: string;
  mode: CopilotMode;
  messages: CopilotMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CopilotQueryContext {
  organizationId: string;
  projectId: string;
  userId: string;
  currentModule?: string;
  selectedEntityId?: string;
  conversationId?: string;
  mode?: CopilotMode;
}

export interface GroundedContextPack {
  organizationId: string;
  projectId: string;
  projectName: string;
  sections: Array<{ id: string; title: string; content: string }>;
  claims: Array<{ id: string; text: string; supportStatus: string; materiality: string }>;
  evidence: Array<{ id: string; title: string; source: string; verified: boolean }>;
  dataRoomDocs: Array<{ id: string; title: string; category: string; status: string }>;
  unresolvedRisks: Array<{ id: string; title: string; severity: string }>;
  retrievalTimestamp: string;
}
