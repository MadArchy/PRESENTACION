import { EvidenceRepository } from '../../domain/ports/evidence-repository.port';
import { EvidenceEntity } from '../../domain/entities/evidence.entity';
import { EvidenceNotFoundError } from '../../domain/errors/evidence-domain.error';

export class GetEvidenceUseCase {
  constructor(private readonly evidenceRepository: EvidenceRepository) {}

  async execute(id: string): Promise<EvidenceEntity> {
    const evidence = await this.evidenceRepository.findById(id);
    if (!evidence) {
      throw new EvidenceNotFoundError(id);
    }
    return evidence;
  }
}
