import { NarrativeProfileRepository } from '../../domain/ports/narrative-profile-repository.port';
import { NarrativeProfile } from '../../domain/narrative.types';

export class ListNarrativeProfilesUseCase {
  constructor(private readonly profileRepository: NarrativeProfileRepository) {}

  async execute(): Promise<NarrativeProfile[]> {
    return this.profileRepository.list();
  }
}
