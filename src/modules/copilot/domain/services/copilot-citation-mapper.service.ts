/**
 * Venture Hub OS — Copilot Citation & Grounding Services
 */

import {
  GroundedContextPack,
  CopilotSourceRef,
  GroundingStatus
} from '../copilot-conversation.types';

export class CopilotCitationMapperService {
  /**
   * Maps cited entity IDs to verified clickable CopilotSourceRef objects
   */
  public mapCitations(
    citedIds: string[],
    contextPack: GroundedContextPack
  ): CopilotSourceRef[] {
    const sources: CopilotSourceRef[] = [];
    const seen = new Set<string>();

    citedIds.forEach(id => {
      if (seen.has(id)) return;
      seen.add(id);

      // Check Claims
      const claim = contextPack.claims.find(c => c.id === id);
      if (claim) {
        sources.push({
          sourceType: 'CLAIM',
          sourceId: claim.id,
          label: `Claim ${claim.id}: ${claim.text.slice(0, 40)}...`,
          navigationTarget: `governance?claim=${claim.id}`
        });
        return;
      }

      // Check Evidence
      const ev = contextPack.evidence.find(e => e.id === id);
      if (ev) {
        sources.push({
          sourceType: 'EVIDENCE',
          sourceId: ev.id,
          label: `Evidence: ${ev.title}`,
          navigationTarget: `governance?evidence=${ev.id}`
        });
        return;
      }

      // Check Data Room Docs
      const doc = contextPack.dataRoomDocs.find(d => d.id === id);
      if (doc) {
        sources.push({
          sourceType: 'DATA_ROOM_DOC',
          sourceId: doc.id,
          label: `Data Room: ${doc.title}`,
          navigationTarget: `dataroom?doc=${doc.id}`
        });
        return;
      }

      // Check Project Twin Sections
      const section = contextPack.sections.find(s => s.id === id);
      if (section) {
        sources.push({
          sourceType: 'PROJECT_TWIN',
          sourceId: section.id,
          label: `Twin Section: ${section.title}`,
          navigationTarget: `twin?section=${section.id}`
        });
      }
    });

    return sources;
  }
}

export class CopilotGroundingService {
  /**
   * Evaluates the grounding quality of an AI output against the context pack
   */
  public evaluateGrounding(
    userQuery: string,
    contextPack: GroundedContextPack,
    citedSources: CopilotSourceRef[]
  ): {
    status: GroundingStatus;
    explanation?: string;
  } {
    // If context pack is empty or missing relevant project facts
    if (contextPack.sections.length === 0 && contextPack.claims.length === 0) {
      return {
        status: 'INSUFFICIENT_PROJECT_EVIDENCE',
        explanation: 'No verified Project Twin sections or claims are available for this project.'
      };
    }

    // Queries about unanswerable external/fictional topics
    const unanswerableKeywords = ['future prediction', 'magic formula', 'undocumented secret', 'unknown'];
    if (unanswerableKeywords.some(k => userQuery.toLowerCase().includes(k))) {
      return {
        status: 'INSUFFICIENT_PROJECT_EVIDENCE',
        explanation: "I don't have enough verified project information to answer that without speculating."
      };
    }

    if (citedSources.length > 0) {
      return { status: 'GROUNDED' };
    }

    return { status: 'PARTIALLY_GROUNDED' };
  }
}
