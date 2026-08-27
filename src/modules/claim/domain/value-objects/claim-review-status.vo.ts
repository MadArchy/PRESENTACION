import { ClaimReviewStatus } from '../claim.types';
import { InvalidClaimDataError } from '../errors/claim-domain.error';

const VALID_REVIEW_STATUSES: ClaimReviewStatus[] = [
  'UNREVIEWED',
  'REVIEW_REQUIRED',
  'REVIEWED',
  'CHANGES_REQUESTED'
];

export class ClaimReviewStatusVo {
  private readonly value: ClaimReviewStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_REVIEW_STATUSES.includes(normalized as ClaimReviewStatus)) {
      throw new InvalidClaimDataError(
        'reviewStatus',
        `ClaimReviewStatus must be one of [${VALID_REVIEW_STATUSES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as ClaimReviewStatus;
  }

  getValue(): ClaimReviewStatus {
    return this.value;
  }
}
