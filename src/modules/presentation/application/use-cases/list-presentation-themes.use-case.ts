import { PresentationThemeRepository } from '../../domain/ports/presentation-theme-repository.port';
import { PresentationTheme } from '../../domain/presentation.types';

export class ListPresentationThemesUseCase {
  constructor(private readonly themeRepository: PresentationThemeRepository) {}

  async execute(): Promise<PresentationTheme[]> {
    return this.themeRepository.list();
  }
}
