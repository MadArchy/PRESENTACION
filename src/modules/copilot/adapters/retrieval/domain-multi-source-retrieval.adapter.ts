/**
 * Venture Hub OS — Multi-Source Domain Retrieval Adapter
 */

import {
  CopilotRetrievalPort
} from '../../domain/ports/copilot-retrieval.port';
import {
  CopilotQueryContext,
  GroundedContextPack
} from '../../domain/copilot-conversation.types';

export class DomainMultiSourceRetrievalAdapter implements CopilotRetrievalPort {
  constructor(
    private readonly projectDataProvider?: (projectId: string) => any
  ) {}

  public async retrieveContextPack(context: CopilotQueryContext): Promise<GroundedContextPack> {
    const rawData = this.projectDataProvider ? this.projectDataProvider(context.projectId) : null;

    if (rawData) {
      return {
        organizationId: context.organizationId,
        projectId: context.projectId,
        projectName: rawData.name || 'Arcana Protocol',
        sections: rawData.sections || [],
        claims: rawData.claims || [],
        evidence: rawData.evidence || [],
        dataRoomDocs: rawData.dataRoomDocs || [],
        unresolvedRisks: rawData.unresolvedRisks || [],
        retrievalTimestamp: new Date().toISOString()
      };
    }

    // Default rich sample dataset for Arcana
    return {
      organizationId: context.organizationId || 'org-arcana-01',
      projectId: context.projectId || 'proj-arcana-01',
      projectName: 'Arcana Decentralized Protocol',
      sections: [
        { id: 'sec-overview', title: 'Executive Overview', content: 'Arcana is a high-throughput, secure multi-tenant asset issuance protocol.' },
        { id: 'sec-market', title: 'Market & Opportunity', content: 'Enterprise tokenization TAM exceeds $16T by 2030.' },
        { id: 'sec-traction', title: 'Traction & Milestones', content: '12 pilot partners onboarded with $45M in testnet asset volume.' }
      ],
      claims: [
        { id: 'CL-01', text: 'Sub-second transaction finality under peak network load', supportStatus: 'SUPPORTED', materiality: 'HIGH' },
        { id: 'CL-02', text: '100% compliance with jurisdictional asset tokenization frameworks', supportStatus: 'UNSUPPORTED', materiality: 'CRITICAL' },
        { id: 'CL-03', text: 'Zero custodial key leakage in 2 years of testnet operation', supportStatus: 'SUPPORTED', materiality: 'HIGH' }
      ],
      evidence: [
        { id: 'EV-01', title: 'Testnet Benchmark Stress Audit Report Q2 2026', source: 'KPMG Cyber Lab', verified: true },
        { id: 'EV-02', title: 'Custodial Architecture Penetration Test', source: 'Trail of Bits', verified: true }
      ],
      dataRoomDocs: [
        { id: 'DOC-01', title: 'Smart Contract Formal Verification Specification', category: 'Technical', status: 'VERIFIED' },
        { id: 'DOC-02', title: 'Jurisdictional Regulatory Legal Opinion (US/EU)', category: 'Legal', status: 'MISSING' },
        { id: 'DOC-03', title: 'Tokenomics and Treasury Allocation Schedule', category: 'Financial', status: 'VERIFIED' }
      ],
      unresolvedRisks: [
        { id: 'RSK-01', title: 'Pending European MiCA compliance legal opinion document', severity: 'HIGH' }
      ],
      retrievalTimestamp: new Date().toISOString()
    };
  }
}
