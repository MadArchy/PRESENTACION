import { EvidenceLinkEntity } from '../entities/evidence-link.entity';

export interface EvidenceLinkRepository {
  listByProject(projectId: string): Promise<EvidenceLinkEntity[]>;
  listByClaim(claimId: string): Promise<EvidenceLinkEntity[]>;
  listByEvidence(evidenceId: string): Promise<EvidenceLinkEntity[]>;
}
