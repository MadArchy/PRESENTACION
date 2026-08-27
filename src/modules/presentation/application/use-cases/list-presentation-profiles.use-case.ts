import { PresentationProfileRepository } from '../../domain/ports/presentation-profile-repository.port';
import { PresentationProfile } from '../../domain/presentation.types';

export class ListPresentationProfilesUseCase {
  constructor(private readonly profileRepository: PresentationProfileRepository) {}

  async execute(): Promise<PresentationProfile[]> {
    return this.profileRepository.list();
  }
}
