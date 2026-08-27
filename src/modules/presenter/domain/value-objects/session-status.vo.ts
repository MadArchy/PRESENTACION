import { PresenterSessionStatus } from '../presenter.types';
import { PresenterDomainError } from '../errors/presenter-domain.error';

export const VALID_SESSION_STATUSES: PresenterSessionStatus[] = ['IDLE', 'RUNNING', 'PAUSED', 'ENDED'];

export class SessionStatusVo {
  private readonly value: PresenterSessionStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_SESSION_STATUSES.includes(normalized as PresenterSessionStatus)) {
      throw new PresenterDomainError(`Invalid session status '${value}'. Must be one of [${VALID_SESSION_STATUSES.join(', ')}]`);
    }
    this.value = normalized as PresenterSessionStatus;
  }

  getValue(): PresenterSessionStatus {
    return this.value;
  }
}
