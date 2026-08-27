import { ClaimSupportStatus } from '../claim.types';
import { InvalidClaimDataError } from '../errors/claim-domain.error';

export const VALID_SUPPORT_STATUSES: ClaimSupportStatus[] = [
  'NOT_REQUIRED',
  'UNSUPPORTED',
  'PARTIALLY_SUPPORTED',
  'SUPPORTED',
  'CONTRADICTED'
];

export class ClaimSupportStatusVo {
  private readonly value: ClaimSupportStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_SUPPORT_STATUSES.includes(normalized as ClaimSupportStatus)) {
      throw new InvalidClaimDataError(
        'supportStatus',
        `ClaimSupportStatus must be one of [${VALID_SUPPORT_STATUSES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as ClaimSupportStatus;
  }

  getValue(): ClaimSupportStatus {
    return this.value;
  }

  isSupported(): boolean {
    return this.value === 'SUPPORTED';
  }

  isContradicted(): boolean {
    return this.value === 'CONTRADICTED';
  }
}
