import { PresentationTheme } from '../presentation.types';

export interface PresentationThemeRepository {
  list(): Promise<PresentationTheme[]>;
  findById(id: string): Promise<PresentationTheme | null>;
}
