import { LayoutVariant } from '../presentation.types';
import { InvalidPresentationDataError } from '../errors/presentation-domain.error';

export const VALID_LAYOUTS: LayoutVariant[] = [
  'HERO',
  'SPLIT',
  'STACKED',
  'GRID',
  'METRIC_WALL',
  'TIMELINE',
  'MATRIX',
  'DIAGRAM',
  'FULL_BLEED_MEDIA',
  'CONTENT_PLUS_EVIDENCE',
  'MINIMAL'
];

export class LayoutVariantVo {
  private readonly value: LayoutVariant;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_LAYOUTS.includes(normalized as LayoutVariant)) {
      throw new InvalidPresentationDataError(
        'layoutVariant',
        `LayoutVariant must be one of [${VALID_LAYOUTS.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as LayoutVariant;
  }

  getValue(): LayoutVariant {
    return this.value;
  }
}
