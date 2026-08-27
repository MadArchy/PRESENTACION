import { EvidenceRepository } from '../../domain/ports/evidence-repository.port';
import { EvidenceEntity } from '../../domain/entities/evidence.entity';

export class ListProjectEvidenceUseCase {
  constructor(private readonly evidenceRepository: EvidenceRepository) {}

  async execute(projectId: string, projectVersion?: string): Promise<EvidenceEntity[]> {
    return this.evidenceRepository.listByProject(projectId, projectVersion);
  }
}
