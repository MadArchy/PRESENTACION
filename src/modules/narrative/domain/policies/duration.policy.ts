import { NarrativeDuration, NarrativeDepth, NarrativeTiming, DurationStatus } from '../narrative.types';

export class DurationPolicy {
  public static readonly NORMAL_TOLERANCE_THRESHOLD = 0.10; // 10%
  public static readonly MODERATE_OVERFLOW_THRESHOLD = 0.20; // 20%

  getStepBounds(duration: NarrativeDuration): { minSteps: number; maxSteps: number; targetSeconds: number } {
    switch (duration) {
      case 'THREE_MINUTES':
        return { minSteps: 4, maxSteps: 6, targetSeconds: 180 };
      case 'FIVE_MINUTES':
        return { minSteps: 6, maxSteps: 8, targetSeconds: 300 };
      case 'TEN_MINUTES':
        return { minSteps: 8, maxSteps: 12, targetSeconds: 600 };
      case 'TWENTY_MINUTES':
        return { minSteps: 12, maxSteps: 18, targetSeconds: 1200 };
      case 'DEEP_DIVE':
      default:
        return { minSteps: 10, maxSteps: 25, targetSeconds: 1800 };
    }
  }

  calculateStepDurations(
    roles: string[],
    depth: NarrativeDepth,
    targetSeconds: number
  ): number[] {
    const stepCount = roles.length;
    if (stepCount === 0) return [];

    // Calculate raw relative weights based on role and depth
    const rawWeights = roles.map(role => {
      let w = 1.0;
      if (depth === 'BRIEF') w *= 0.85;
      if (depth === 'DEEP') w *= 1.25;

      if (['PROBLEM', 'SOLUTION', 'TECHNOLOGY', 'BUSINESS_MODEL'].includes(role)) {
        w *= 1.25;
      } else if (['OPENING', 'CLOSING', 'ASK'].includes(role)) {
        w *= 0.80;
      }
      return w;
    });

    const sumWeights = rawWeights.reduce((acc, w) => acc + w, 0);

    // Normalize weights so the sum closely matches the targetSeconds
    return rawWeights.map(w => {
      const normalizedSeconds = Math.round((w / sumWeights) * targetSeconds);
      return Math.max(15, normalizedSeconds);
    });
  }

  evaluateDuration(targetSeconds: number, estimatedSeconds: number): NarrativeTiming {
    const overflowSeconds = Math.max(0, estimatedSeconds - targetSeconds);
    const overflowPercent = targetSeconds > 0 ? (overflowSeconds / targetSeconds) * 100 : 0;

    let status: DurationStatus = 'WITHIN_TARGET';
    if (overflowPercent === 0) {
      status = 'WITHIN_TARGET';
    } else if (overflowPercent <= DurationPolicy.NORMAL_TOLERANCE_THRESHOLD * 100) {
      status = 'NORMAL_TOLERANCE';
    } else if (overflowPercent <= DurationPolicy.MODERATE_OVERFLOW_THRESHOLD * 100) {
      status = 'MODERATE_OVERFLOW';
    } else {
      status = 'CRITICAL_OVERFLOW';
    }

    return {
      targetSeconds,
      estimatedSeconds,
      overflowSeconds,
      overflowPercent: Math.round(overflowPercent * 10) / 10,
      status
    };
  }
}
