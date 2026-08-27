import { EvidenceType } from '../evidence.types';
import { InvalidEvidenceDataError } from '../errors/evidence-domain.error';

export const VALID_EVIDENCE_TYPES: EvidenceType[] = [
  'DOCUMENT',
  'DATASET',
  'CALCULATION',
  'OBSERVATION',
  'EXPERIMENT',
  'SYSTEM_RECORD',
  'EXTERNAL_REFERENCE',
  'MEDIA',
  'OTHER'
];

export class EvidenceTypeVo {
  private readonly value: EvidenceType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_EVIDENCE_TYPES.includes(normalized as EvidenceType)) {
      throw new InvalidEvidenceDataError(
        'type',
        `EvidenceType must be one of [${VALID_EVIDENCE_TYPES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as EvidenceType;
  }

  getValue(): EvidenceType {
    return this.value;
  }
}
