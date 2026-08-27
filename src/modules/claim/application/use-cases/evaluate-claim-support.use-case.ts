import { ClaimEntity } from '../../domain/entities/claim.entity';
import { ClaimSupportExplanation } from '../../domain/claim.types';
import { ClaimSupportEvaluator } from '../../domain/services/claim-support-evaluator.service';
import { EvidenceRepository } from '../../../evidence/domain/ports/evidence-repository.port';
import { EvidenceLinkRepository } from '../../../evidence/domain/ports/evidence-link-repository.port';
import { EvidenceEntity } from '../../../evidence/domain/entities/evidence.entity';

export class EvaluateClaimSupportUseCase {
  private readonly evaluator = new ClaimSupportEvaluator();

  constructor(
    private readonly evidenceRepository: EvidenceRepository,
    private readonly evidenceLinkRepository: EvidenceLinkRepository
  ) {}

  async execute(claim: ClaimEntity): Promise<ClaimSupportExplanation> {
    const links = await this.evidenceLinkRepository.listByClaim(claim.getId());
    const evidenceList = await this.evidenceRepository.listByProject(claim.getProjectId());
    const evidenceMap = new Map<string, EvidenceEntity>(evidenceList.map(e => [e.getId(), e]));

    const result = this.evaluator.evaluate(claim, links, evidenceMap);
    claim.setSupportStatus(result.status);
    return result;
  }
}
