import { PresentationThemeRepository } from '../../domain/ports/presentation-theme-repository.port';
import { PresentationTheme } from '../../domain/presentation.types';
import { PresentationNotFoundError } from '../../domain/errors/presentation-domain.error';

export class GetPresentationThemeUseCase {
  constructor(private readonly themeRepository: PresentationThemeRepository) {}

  async execute(id: string): Promise<PresentationTheme> {
    const theme = await this.themeRepository.findById(id);
    if (!theme) {
      throw new PresentationNotFoundError(`PresentationTheme with id '${id}' not found`);
    }
    return theme;
  }
}
