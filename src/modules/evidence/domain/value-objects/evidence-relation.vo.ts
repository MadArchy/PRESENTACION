import { EvidenceRelation } from '../evidence.types';
import { InvalidEvidenceDataError } from '../errors/evidence-domain.error';

const VALID_RELATIONS: EvidenceRelation[] = [
  'SUPPORTS',
  'PARTIALLY_SUPPORTS',
  'CONTRADICTS',
  'CONTEXT_ONLY'
];

export class EvidenceRelationVo {
  private readonly value: EvidenceRelation;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_RELATIONS.includes(normalized as EvidenceRelation)) {
      throw new InvalidEvidenceDataError(
        'relation',
        `EvidenceRelation must be one of [${VALID_RELATIONS.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as EvidenceRelation;
  }

  getValue(): EvidenceRelation {
    return this.value;
  }

  isSupports(): boolean {
    return this.value === 'SUPPORTS';
  }

  isContradicts(): boolean {
    return this.value === 'CONTRADICTS';
  }
}
