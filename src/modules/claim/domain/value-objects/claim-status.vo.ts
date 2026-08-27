import { ClaimStatus } from '../claim.types';
import { InvalidClaimDataError } from '../errors/claim-domain.error';

const VALID_STATUSES: ClaimStatus[] = ['DRAFT', 'ACTIVE', 'RETIRED'];

export class ClaimStatusVo {
  private readonly value: ClaimStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_STATUSES.includes(normalized as ClaimStatus)) {
      throw new InvalidClaimDataError(
        'status',
        `ClaimStatus must be one of [${VALID_STATUSES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as ClaimStatus;
  }

  getValue(): ClaimStatus {
    return this.value;
  }

  isActive(): boolean {
    return this.value === 'ACTIVE';
  }
}
