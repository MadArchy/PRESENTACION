import { TimingDeviation, TimingState } from '../presenter.types';

export class PresenterTimingPolicy {
  public static readonly TOLERANCE_THRESHOLD = 0.10; // 10%

  static evaluate(
    actualElapsedSeconds: number,
    expectedCumulativeSeconds: number,
    totalTargetSeconds: number
  ): TimingDeviation {
    const deltaSeconds = actualElapsedSeconds - expectedCumulativeSeconds;
    const deltaPercent = expectedCumulativeSeconds > 0
      ? (deltaSeconds / expectedCumulativeSeconds)
      : 0;

    let state: TimingState = 'ON_TRACK';

    if (actualElapsedSeconds > totalTargetSeconds) {
      state = 'OVERTIME';
    } else if (deltaPercent > this.TOLERANCE_THRESHOLD) {
      state = 'BEHIND';
    } else if (deltaPercent < -this.TOLERANCE_THRESHOLD) {
      state = 'AHEAD';
    } else {
      state = 'ON_TRACK';
    }

    return {
      expectedCumulativeSeconds,
      actualElapsedSeconds,
      deltaSeconds,
      deltaPercent,
      state
    };
  }
}
