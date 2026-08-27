import { ClaimRepository } from '../../domain/ports/claim-repository.port';
import { ClaimEntity } from '../../domain/entities/claim.entity';
import { ProjectSectionType } from '../../../project/domain/project.types';

export class ListSectionClaimsUseCase {
  constructor(private readonly claimRepository: ClaimRepository) {}

  async execute(projectId: string, sectionType: ProjectSectionType, projectVersion?: string): Promise<ClaimEntity[]> {
    return this.claimRepository.listBySection(projectId, sectionType, projectVersion);
  }
}
