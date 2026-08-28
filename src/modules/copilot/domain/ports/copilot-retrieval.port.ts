/**
 * Venture Hub OS — Copilot Retrieval & Model Ports
 */

import {
  CopilotQueryContext,
  GroundedContextPack,
  CopilotMessage,
  CopilotMode
} from '../copilot-conversation.types';

export interface CopilotRetrievalPort {
  retrieveContextPack(context: CopilotQueryContext): Promise<GroundedContextPack>;
}

export interface AiModelPortV2 {
  generateGroundedResponse(
    query: string,
    contextPack: GroundedContextPack,
    mode: CopilotMode,
    history: CopilotMessage[]
  ): Promise<{
    answerText: string;
    groundingStatus: 'GROUNDED' | 'PARTIALLY_GROUNDED' | 'INSUFFICIENT_PROJECT_EVIDENCE';
    citedEntityIds: string[];
    suggestedActions?: Array<{ id: string; label: string; actionType: string; targetModule: string; targetEntityId?: string }>;
    followUpPrompts?: string[];
  }>;
}

export interface ConversationRepositoryPort {
  getConversation(id: string): Promise<any | null>;
  saveConversation(conversation: any): Promise<void>;
  listConversations(projectId: string, userId: string): Promise<any[]>;
}
