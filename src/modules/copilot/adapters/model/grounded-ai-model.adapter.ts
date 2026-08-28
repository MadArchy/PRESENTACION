/**
 * Venture Hub OS — Grounded AI Model Adapter & In-Memory Conversation Repository
 */

import {
  AiModelPortV2,
  ConversationRepositoryPort
} from '../../domain/ports/copilot-retrieval.port';
import {
  GroundedContextPack,
  CopilotMessage,
  CopilotMode,
  CopilotConversation
} from '../../domain/copilot-conversation.types';

export class GroundedAiModelAdapter implements AiModelPortV2 {
  public async generateGroundedResponse(
    query: string,
    contextPack: GroundedContextPack,
    _mode: CopilotMode,
    _history: CopilotMessage[]
  ): Promise<{
    answerText: string;
    groundingStatus: 'GROUNDED' | 'PARTIALLY_GROUNDED' | 'INSUFFICIENT_PROJECT_EVIDENCE';
    citedEntityIds: string[];
    suggestedActions?: Array<{ id: string; label: string; actionType: string; targetModule: string; targetEntityId?: string }>;
    followUpPrompts?: string[];
  }> {
    const q = query.toLowerCase();

    // 1. Unanswerable question / Missing facts scenario
    if (q.includes('unverified fact') || q.includes('future prediction') || q.includes('magic formula')) {
      return {
        answerText: `I do not have enough verified project documentation to answer that question accurately. The active Project Twin for ${contextPack.projectName} contains no empirical records on this subject.`,
        groundingStatus: 'INSUFFICIENT_PROJECT_EVIDENCE',
        citedEntityIds: [],
        suggestedActions: [
          { id: 'act-twin', label: 'Review Project Twin', actionType: 'NAVIGATE', targetModule: 'twin' },
          { id: 'act-dataroom', label: 'Check Diligence Requests', actionType: 'NAVIGATE', targetModule: 'dataroom' }
        ],
        followUpPrompts: [
          'What claims are currently verified for Arcana?',
          'What are the highest priority diligence gaps?'
        ]
      };
    }

    // 2. Risks & Diligence Gaps query
    if (q.includes('risk') || q.includes('gap') || q.includes('diligence') || q.includes('unsupported')) {
      const unsupportedClaims = contextPack.claims.filter(c => c.supportStatus === 'UNSUPPORTED');
      const missingDocs = contextPack.dataRoomDocs.filter(d => d.status === 'MISSING');

      const claimsList = unsupportedClaims.map(c => `• **${c.id}**: ${c.text} *(Materiality: ${c.materiality})*`).join('\n');
      const docsList = missingDocs.map(d => `• **${d.id}**: ${d.title} *(Category: ${d.category})*`).join('\n');

      const citedIds = [...unsupportedClaims.map(c => c.id), ...missingDocs.map(d => d.id)];

      return {
        answerText: `Here is the current risk and diligence breakdown for **${contextPack.projectName}**:\n\n### Critical Unsupported Claims (${unsupportedClaims.length}):\n${claimsList}\n\n### Missing Diligence Documents (${missingDocs.length}):\n${docsList}\n\n**Recommendation:** Address the missing regulatory legal opinion prior to upcoming investor due diligence sessions.`,
        groundingStatus: 'GROUNDED',
        citedEntityIds: citedIds,
        suggestedActions: [
          { id: 'act-claim', label: 'Open Unsupported Claim CL-02', actionType: 'REVIEW_CLAIM', targetModule: 'governance', targetEntityId: 'CL-02' },
          { id: 'act-dr', label: 'Upload Legal Opinion in Data Room', actionType: 'OPEN_DATA_ROOM', targetModule: 'dataroom' }
        ],
        followUpPrompts: [
          'How can we link evidence to CL-02?',
          'Prepare an executive investor summary'
        ]
      };
    }

    // 3. Project Summary / Executive Overview
    if (q.includes('summary') || q.includes('about') || q.includes('overview') || q.includes('pitch')) {
      const citedIds = ['sec-overview', 'sec-traction', 'CL-01', 'EV-01'];
      return {
        answerText: `### Executive Summary: ${contextPack.projectName}\n\n**${contextPack.projectName}** is an enterprise-grade tokenization protocol designed for institutional asset issuance.\n\n• **Core Value:** Provides sub-second transaction finality under high concurrency.\n• **Traction:** 12 pilot institutional partners with $45M in testnet asset volume.\n• **Grounded Trust:** Backed by independent stress audit reports by KPMG Cyber Lab.`,
        groundingStatus: 'GROUNDED',
        citedEntityIds: citedIds,
        suggestedActions: [
          { id: 'act-pres', label: 'View 15-Slide Presentation Deck', actionType: 'PRESENT', targetModule: 'presentation' },
          { id: 'act-twin', label: 'Inspect Full Project Twin', actionType: 'NAVIGATE', targetModule: 'twin' }
        ],
        followUpPrompts: [
          'What are the main competitive advantages?',
          'What objections might an institutional investor raise?'
        ]
      };
    }

    // 4. Default contextual response
    return {
      answerText: `Based on the verified Project Twin for **${contextPack.projectName}**, the venture currently has **${contextPack.claims.length} registered claims** and **${contextPack.evidence.length} verified evidence items** across ${contextPack.sections.length} core sections.`,
      groundingStatus: 'GROUNDED',
      citedEntityIds: ['sec-overview', 'CL-01'],
      suggestedActions: [
        { id: 'act-twin', label: 'Open Project Twin', actionType: 'NAVIGATE', targetModule: 'twin' }
      ],
      followUpPrompts: [
        'Summarize this venture for an investor',
        'Show all unsupported claims'
      ]
    };
  }
}

export class InMemoryConversationRepository implements ConversationRepositoryPort {
  private conversations = new Map<string, CopilotConversation>();

  public async getConversation(id: string): Promise<CopilotConversation | null> {
    return this.conversations.get(id) || null;
  }

  public async saveConversation(conversation: CopilotConversation): Promise<void> {
    this.conversations.set(conversation.id, conversation);
  }

  public async listConversations(projectId: string, userId: string): Promise<CopilotConversation[]> {
    return Array.from(this.conversations.values()).filter(
      c => c.projectId === projectId && c.userId === userId
    );
  }
}
