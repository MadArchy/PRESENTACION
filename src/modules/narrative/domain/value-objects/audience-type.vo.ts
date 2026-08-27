import { AudienceType } from '../narrative.types';
import { InvalidNarrativeRequestError } from '../errors/narrative-domain.error';

export const VALID_AUDIENCE_TYPES: AudienceType[] = [
  'EXECUTIVE',
  'INVESTOR',
  'BOARD',
  'COMMERCIAL',
  'TECHNICAL',
  'DUE_DILIGENCE',
  'INTERNAL_STRATEGY',
  'DEMO_DAY'
];

export class AudienceTypeVo {
  private readonly value: AudienceType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_AUDIENCE_TYPES.includes(normalized as AudienceType)) {
      throw new InvalidNarrativeRequestError(
        'audience',
        `AudienceType must be one of [${VALID_AUDIENCE_TYPES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as AudienceType;
  }

  getValue(): AudienceType {
    return this.value;
  }
}
