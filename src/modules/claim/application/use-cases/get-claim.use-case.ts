import { ClaimRepository } from '../../domain/ports/claim-repository.port';
import { ClaimEntity } from '../../domain/entities/claim.entity';
import { ClaimNotFoundError } from '../../domain/errors/claim-domain.error';

export class GetClaimUseCase {
  constructor(private readonly claimRepository: ClaimRepository) {}

  async execute(id: string): Promise<ClaimEntity> {
    const claim = await this.claimRepository.findById(id);
    if (!claim) {
      throw new ClaimNotFoundError(id);
    }
    return claim;
  }
}
