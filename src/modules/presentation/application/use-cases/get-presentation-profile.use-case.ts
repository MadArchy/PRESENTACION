import { PresentationProfileRepository } from '../../domain/ports/presentation-profile-repository.port';
import { PresentationProfile } from '../../domain/presentation.types';
import { PresentationNotFoundError } from '../../domain/errors/presentation-domain.error';

export class GetPresentationProfileUseCase {
  constructor(private readonly profileRepository: PresentationProfileRepository) {}

  async execute(id: string): Promise<PresentationProfile> {
    const profile = await this.profileRepository.findById(id);
    if (!profile) {
      throw new PresentationNotFoundError(`PresentationProfile with id '${id}' not found`);
    }
    return profile;
  }
}
