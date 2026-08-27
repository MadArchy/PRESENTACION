import { ClaimRepository } from '../../domain/ports/claim-repository.port';
import { ClaimEntity } from '../../domain/entities/claim.entity';

export class ListProjectClaimsUseCase {
  constructor(private readonly claimRepository: ClaimRepository) {}

  async execute(projectId: string, projectVersion?: string): Promise<ClaimEntity[]> {
    return this.claimRepository.listByProject(projectId, projectVersion);
  }
}
