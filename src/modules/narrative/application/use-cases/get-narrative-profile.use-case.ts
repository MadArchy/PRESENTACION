import { NarrativeProfileRepository } from '../../domain/ports/narrative-profile-repository.port';
import { NarrativeProfile } from '../../domain/narrative.types';
import { NarrativeProfileNotFoundError } from '../../domain/errors/narrative-domain.error';

export class GetNarrativeProfileUseCase {
  constructor(private readonly profileRepository: NarrativeProfileRepository) {}

  async execute(id: string): Promise<NarrativeProfile> {
    const profile = await this.profileRepository.findById(id);
    if (!profile) {
      throw new NarrativeProfileNotFoundError(id);
    }
    return profile;
  }
}
