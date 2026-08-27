import { ClaimType } from '../claim.types';
import { InvalidClaimDataError } from '../errors/claim-domain.error';

export const VALID_CLAIM_TYPES: ClaimType[] = [
  'FACT',
  'ESTIMATE',
  'ASSUMPTION',
  'TARGET',
  'HYPOTHESIS'
];

export class ClaimTypeVo {
  private readonly value: ClaimType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_CLAIM_TYPES.includes(normalized as ClaimType)) {
      throw new InvalidClaimDataError(
        'type',
        `ClaimType must be one of [${VALID_CLAIM_TYPES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as ClaimType;
  }

  getValue(): ClaimType {
    return this.value;
  }

  isFact(): boolean {
    return this.value === 'FACT';
  }

  requiresEvidence(): boolean {
    return this.value === 'FACT' || this.value === 'ESTIMATE';
  }
}
