import { TimingState } from '../presenter.types';
import { PresenterDomainError } from '../errors/presenter-domain.error';

export const VALID_TIMING_STATES: TimingState[] = ['ON_TRACK', 'AHEAD', 'BEHIND', 'OVERTIME'];

export class TimingStateVo {
  private readonly value: TimingState;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_TIMING_STATES.includes(normalized as TimingState)) {
      throw new PresenterDomainError(`Invalid timing state '${value}'. Must be one of [${VALID_TIMING_STATES.join(', ')}]`);
    }
    this.value = normalized as TimingState;
  }

  getValue(): TimingState {
    return this.value;
  }
}
