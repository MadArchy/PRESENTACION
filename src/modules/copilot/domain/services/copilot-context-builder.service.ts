import { ProjectAggregate } from '../../../project/domain/entities/project.aggregate';
import { ClaimEntity } from '../../../claim/domain/entities/claim.entity';
import { EvidenceEntity } from '../../../evidence/domain/entities/evidence.entity';
import {
  CopilotContextBundle,
  CopilotContextScope,
  CopilotSectionContext,
  CopilotClaimContext,
  CopilotEvidenceContext,
  CopilotSourceRef
} from '../copilot.types';

export class CopilotContextBuilderService {
  build(
    project: ProjectAggregate,
    scopes: CopilotContextScope[],
    claims?: ClaimEntity[],
    evidence?: EvidenceEntity[],
    trustSummary?: Record<string, unknown>,
    narrativePlan?: Record<string, unknown>,
    presentation?: Record<string, unknown>
  ): CopilotContextBundle {
    const versionEntity = project.getCurrentVersionEntity();
    const sourceRefs: CopilotSourceRef[] = [];
    const limitations: string[] = [];

    let sectionContexts: CopilotSectionContext[] | undefined;
    if (scopes.includes('SECTION') || scopes.includes('PROJECT')) {
      sectionContexts = versionEntity.getSections().map(sec => {
        const refs: CopilotSourceRef[] = (sec.getSourceRefs() || []).map(r => ({
          type: r.type,
          reference: r.reference,
          locator: r.locator
        }));
        sourceRefs.push(...refs);

        return {
          id: sec.getId(),
          type: sec.getType(),
          title: sec.getTitle(),
          status: sec.getStatus(),
          content: sec.getContent(),
          sourceRefs: refs
        };
      });
    }

    let claimContexts: CopilotClaimContext[] | undefined;
    if (scopes.includes('CLAIMS') && claims) {
      claimContexts = claims.map(c => {
        sourceRefs.push({
          type: 'CLAIM',
          reference: c.getId(),
          title: c.getText().es || c.getText().en
        });

        return {
          id: c.getId(),
          type: c.getType(),
          text: c.getText(),
          supportStatus: c.getSupportStatus(),
          materiality: c.getMateriality(),
          evidenceCount: c.getEvidenceLinkIds().length
        };
      });
    }

    let evidenceContexts: CopilotEvidenceContext[] | undefined;
    if (scopes.includes('EVIDENCE') && evidence) {
      evidenceContexts = evidence.map(e => {
        sourceRefs.push({
          type: 'EVIDENCE',
          reference: e.getId(),
          title: e.getTitle()
        });

        return {
          id: e.getId(),
          type: e.getType(),
          title: e.getTitle(),
          status: e.getStatus(),
          source: e.getSource()
        };
      });
    }

    if (!claims || claims.length === 0) {
      limitations.push('No formal Claim registry loaded for this context.');
    }
    if (!evidence || evidence.length === 0) {
      limitations.push('No primary Evidence artifacts attached.');
    }

    return {
      projectId: project.getId(),
      projectVersion: project.getCurrentVersion(),
      contextVersion: '1.0',
      scope: scopes,
      sections: sectionContexts,
      claims: claimContexts,
      evidence: evidenceContexts,
      trustSummary: scopes.includes('TRUST') ? trustSummary : undefined,
      narrative: scopes.includes('NARRATIVE') ? narrativePlan : undefined,
      presentation: scopes.includes('PRESENTATION') ? presentation : undefined,
      sourceRefs,
      limitations
    };
  }
}
