import { ClaimMateriality } from '../claim.types';
import { InvalidClaimDataError } from '../errors/claim-domain.error';

const VALID_MATERIALITIES: ClaimMateriality[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export class ClaimMaterialityVo {
  private readonly value: ClaimMateriality;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_MATERIALITIES.includes(normalized as ClaimMateriality)) {
      throw new InvalidClaimDataError(
        'materiality',
        `ClaimMateriality must be one of [${VALID_MATERIALITIES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as ClaimMateriality;
  }

  getValue(): ClaimMateriality {
    return this.value;
  }

  isCriticalOrHigh(): boolean {
    return this.value === 'CRITICAL' || this.value === 'HIGH';
  }
}
