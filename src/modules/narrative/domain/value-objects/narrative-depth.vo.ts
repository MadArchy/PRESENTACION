import { NarrativeDepth } from '../narrative.types';
import { InvalidNarrativeRequestError } from '../errors/narrative-domain.error';

const VALID_DEPTHS: NarrativeDepth[] = ['BRIEF', 'STANDARD', 'DEEP'];

export class NarrativeDepthVo {
  private readonly value: NarrativeDepth;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_DEPTHS.includes(normalized as NarrativeDepth)) {
      throw new InvalidNarrativeRequestError(
        'depth',
        `NarrativeDepth must be one of [${VALID_DEPTHS.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as NarrativeDepth;
  }

  getValue(): NarrativeDepth {
    return this.value;
  }
}
