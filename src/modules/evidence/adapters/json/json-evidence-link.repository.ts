import { EvidenceLinkRepository } from '../../domain/ports/evidence-link-repository.port';
import { EvidenceLinkEntity } from '../../domain/entities/evidence-link.entity';
import { EvidenceLinkData } from '../../domain/evidence.types';

export class JsonEvidenceLinkRepository implements EvidenceLinkRepository {
  private links: Map<string, EvidenceLinkEntity> = new Map();
  private isLoaded = false;

  constructor(private readonly provider?: () => Promise<EvidenceLinkData[]> | EvidenceLinkData[]) {}

  private async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;

    if (this.provider) {
      const dataList = await this.provider();
      for (const data of dataList) {
        const entity = new EvidenceLinkEntity(data);
        this.links.set(entity.getId(), entity);
      }
    } else {
      const defaultArcanaLinks: EvidenceLinkData[] = [
        {
          id: 'link-arcana-001',
          claimId: 'claim-arcana-001',
          evidenceId: 'ev-arcana-001',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Visual master presentation establishes identity, Web3 & IoT focus.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-002',
          claimId: 'claim-arcana-002',
          evidenceId: 'ev-arcana-002',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Slide 2 specifies mathematical sealing on Polygon and <$0.02 cost per store.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-003',
          claimId: 'claim-arcana-003',
          evidenceId: 'ev-arcana-003',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Field analysis confirms 8% to 18% operational revenue leakage rate.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-004',
          claimId: 'claim-arcana-004',
          evidenceId: 'ev-arcana-004',
          projectId: 'arcana',
          relation: 'CONTEXT_ONLY',
          status: 'ACTIVE',
          rationale: 'Persona matrix provides context for multi-branch franchisee profiles.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-005',
          claimId: 'claim-arcana-005',
          evidenceId: 'ev-arcana-005',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Merkle anchoring protocol architecture document.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-006',
          claimId: 'claim-arcana-006',
          evidenceId: 'ev-arcana-006',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'ESP32-S3 hardware specification document.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-007',
          claimId: 'claim-arcana-007',
          evidenceId: 'ev-arcana-007',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Unit economics financial model lists $250 node hardware target.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-008',
          claimId: 'claim-arcana-008',
          evidenceId: 'ev-arcana-007',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Financial model specifies $49/mo SaaS target pricing.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-009',
          claimId: 'claim-arcana-009',
          evidenceId: 'ev-arcana-007',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Gross margin calculation in unit economics spreadsheet.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-010',
          claimId: 'claim-arcana-010',
          evidenceId: 'ev-arcana-008',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Benchmark report measures Ed25519 signature performance on hardware.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-011',
          claimId: 'claim-arcana-011',
          evidenceId: 'ev-arcana-009',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Fault tolerance logs confirm 30-day non-volatile buffer operation.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-012',
          claimId: 'claim-arcana-012',
          evidenceId: 'ev-arcana-010',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Pilot closure report documents 5-location trial completion.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-013',
          claimId: 'claim-arcana-013',
          evidenceId: 'ev-arcana-010',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'Roadmap document sets Phase 3 milestone target of 250 branches.',
          createdAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'link-arcana-014',
          claimId: 'claim-arcana-014',
          evidenceId: 'ev-arcana-011',
          projectId: 'arcana',
          relation: 'SUPPORTS',
          status: 'ACTIVE',
          rationale: 'SAFE term sheet specifies $350,000 USD round and use of funds.',
          createdAt: '2026-08-26T15:00:00Z'
        }
      ];

      for (const data of defaultArcanaLinks) {
        const entity = new EvidenceLinkEntity(data);
        this.links.set(entity.getId(), entity);
      }
    }

    this.isLoaded = true;
  }

  async listByProject(projectId: string): Promise<EvidenceLinkEntity[]> {
    await this.ensureLoaded();
    const all = Array.from(this.links.values());
    return all.filter(l => l.getProjectId() === projectId);
  }

  async listByClaim(claimId: string): Promise<EvidenceLinkEntity[]> {
    await this.ensureLoaded();
    const all = Array.from(this.links.values());
    return all.filter(l => l.getClaimId() === claimId);
  }

  async listByEvidence(evidenceId: string): Promise<EvidenceLinkEntity[]> {
    await this.ensureLoaded();
    const all = Array.from(this.links.values());
    return all.filter(l => l.getEvidenceId() === evidenceId);
  }
}
