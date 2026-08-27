import { EvidenceStatus } from '../evidence.types';
import { InvalidEvidenceDataError } from '../errors/evidence-domain.error';

const VALID_STATUSES: EvidenceStatus[] = [
  'AVAILABLE',
  'MISSING',
  'SUPERSEDED',
  'DISPUTED',
  'INVALID'
];

export class EvidenceStatusVo {
  private readonly value: EvidenceStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_STATUSES.includes(normalized as EvidenceStatus)) {
      throw new InvalidEvidenceDataError(
        'status',
        `EvidenceStatus must be one of [${VALID_STATUSES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as EvidenceStatus;
  }

  getValue(): EvidenceStatus {
    return this.value;
  }

  isAvailable(): boolean {
    return this.value === 'AVAILABLE';
  }

  isDisputedOrInvalid(): boolean {
    return this.value === 'DISPUTED' || this.value === 'INVALID';
  }
}
