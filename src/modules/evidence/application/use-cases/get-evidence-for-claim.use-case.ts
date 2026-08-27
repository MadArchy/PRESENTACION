import { EvidenceRepository } from '../../domain/ports/evidence-repository.port';
import { EvidenceLinkRepository } from '../../domain/ports/evidence-link-repository.port';
import { EvidenceEntity } from '../../domain/entities/evidence.entity';
import { EvidenceLinkEntity } from '../../domain/entities/evidence-link.entity';

export interface ClaimEvidenceItem {
  evidence: EvidenceEntity;
  link: EvidenceLinkEntity;
}

export class GetEvidenceForClaimUseCase {
  constructor(
    private readonly evidenceRepository: EvidenceRepository,
    private readonly evidenceLinkRepository: EvidenceLinkRepository
  ) {}

  async execute(claimId: string): Promise<ClaimEvidenceItem[]> {
    const links = await this.evidenceLinkRepository.listByClaim(claimId);
    const result: ClaimEvidenceItem[] = [];

    for (const link of links) {
      if (!link.isActive()) continue;
      const ev = await this.evidenceRepository.findById(link.getEvidenceId());
      if (ev) {
        result.push({
          evidence: ev,
          link
        });
      }
    }

    return result;
  }
}
