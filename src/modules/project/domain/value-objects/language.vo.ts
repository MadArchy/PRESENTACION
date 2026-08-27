import { Language } from '../project.types';
import { InvalidProjectDataError } from '../errors/project-domain.error';

const VALID_LANGUAGES: Language[] = ['es', 'en'];

export class LanguageVo {
  private readonly value: Language;

  constructor(value: string) {
    if (!VALID_LANGUAGES.includes(value as Language)) {
      throw new InvalidProjectDataError(
        'language',
        `Language must be one of [${VALID_LANGUAGES.join(', ')}], got '${value}'`
      );
    }
    this.value = value as Language;
  }

  getValue(): Language {
    return this.value;
  }
}
