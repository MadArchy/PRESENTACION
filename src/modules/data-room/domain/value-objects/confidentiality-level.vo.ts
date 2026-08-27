import { ConfidentialityLevel } from '../data-room.types';
import { InvalidDocumentDataError } from '../errors/data-room-domain.error';

export type { ConfidentialityLevel };

export const VALID_CONFIDENTIALITY_LEVELS: ConfidentialityLevel[] = [
  'PUBLIC',
  'INTERNAL',
  'CONFIDENTIAL',
  'HIGHLY_CONFIDENTIAL'
];

export class ConfidentialityLevelVo {
  private readonly value: ConfidentialityLevel;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'INTERNAL';
    if (!VALID_CONFIDENTIALITY_LEVELS.includes(normalized as ConfidentialityLevel)) {
      throw new InvalidDocumentDataError('confidentiality', `Must be one of [${VALID_CONFIDENTIALITY_LEVELS.join(', ')}], got '${value}'`);
    }
    this.value = normalized as ConfidentialityLevel;
  }

  getValue(): ConfidentialityLevel {
    return this.value;
  }
}
