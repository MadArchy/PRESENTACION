/**
 * Venture Hub OS — Ask Project Copilot Use Case
 */

import {
  CopilotQueryContext,
  CopilotMessage,
  CopilotConversation
} from '../../domain/copilot-conversation.types';
import { CopilotAuthorizationPolicy } from '../../domain/policies/copilot-authorization.policy';
import {
  CopilotRetrievalPort,
  AiModelPortV2,
  ConversationRepositoryPort
} from '../../domain/ports/copilot-retrieval.port';
import { CopilotCitationMapperService, CopilotGroundingService } from '../../domain/services/copilot-citation-mapper.service';

export class AskProjectCopilotUseCase {
  constructor(
    private readonly retrievalAdapter: CopilotRetrievalPort,
    private readonly aiModelAdapter: AiModelPortV2,
    private readonly conversationRepo: ConversationRepositoryPort,
    private readonly citationMapper: CopilotCitationMapperService = new CopilotCitationMapperService(),
    private readonly groundingService: CopilotGroundingService = new CopilotGroundingService()
  ) {}

  public async execute(
    query: string,
    context: CopilotQueryContext,
    userAuthorizedProjectIds: string[],
    isSuspended: boolean = false
  ): Promise<{
    message: CopilotMessage;
    conversation: CopilotConversation;
  }> {
    // 1. Enforce query authorization (Copilot Access <= User Access)
    const authResult = CopilotAuthorizationPolicy.validateQueryAccess(
      context,
      userAuthorizedProjectIds,
      isSuspended
    );
    if (!authResult.allowed) {
      throw new Error(`UNAUTHORIZED_COPILOT_QUERY: ${authResult.reason}`);
    }

    // 2. Retrieve or create conversation thread
    const conversationId = context.conversationId || `conv-${context.projectId}-${Date.now()}`;
    let conversation: CopilotConversation = await this.conversationRepo.getConversation(conversationId);
    if (!conversation) {
      conversation = {
        id: conversationId,
        organizationId: context.organizationId,
        projectId: context.projectId,
        userId: context.userId,
        mode: context.mode || 'EXECUTIVE',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    // 3. Multi-source structured retrieval
    const contextPack = await this.retrievalAdapter.retrieveContextPack(context);

    // 4. Generate grounded AI response
    const aiResult = await this.aiModelAdapter.generateGroundedResponse(
      query,
      contextPack,
      conversation.mode,
      conversation.messages
    );

    // 5. Map citations and evaluate grounding
    const sources = this.citationMapper.mapCitations(aiResult.citedEntityIds, contextPack);
    const evaluatedGrounding = this.groundingService.evaluateGrounding(query, contextPack, sources);

    // 6. Assemble user and assistant messages
    const userMsg: CopilotMessage = {
      id: `msg-u-${Date.now()}`,
      conversationId: conversation.id,
      role: 'USER',
      content: query,
      createdAt: new Date().toISOString()
    };

    const assistantMsg: CopilotMessage = {
      id: `msg-a-${Date.now()}`,
      conversationId: conversation.id,
      role: 'ASSISTANT',
      content: aiResult.answerText,
      groundingStatus: evaluatedGrounding.status,
      sources,
      suggestedActions: (aiResult.suggestedActions || []).map(a => ({
        id: a.id,
        label: a.label,
        actionType: a.actionType as any,
        targetModule: a.targetModule,
        targetEntityId: a.targetEntityId
      })),
      followUpPrompts: aiResult.followUpPrompts || [],
      createdAt: new Date().toISOString()
    };

    conversation.messages.push(userMsg, assistantMsg);
    conversation.updatedAt = new Date().toISOString();
    await this.conversationRepo.saveConversation(conversation);

    return {
      message: assistantMsg,
      conversation
    };
  }
}
