import { NarrativeDuration } from '../narrative.types';
import { InvalidNarrativeRequestError } from '../errors/narrative-domain.error';

export const VALID_NARRATIVE_DURATIONS: NarrativeDuration[] = [
  'THREE_MINUTES',
  'FIVE_MINUTES',
  'TEN_MINUTES',
  'TWENTY_MINUTES',
  'DEEP_DIVE'
];

export class NarrativeDurationVo {
  private readonly value: NarrativeDuration;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_NARRATIVE_DURATIONS.includes(normalized as NarrativeDuration)) {
      throw new InvalidNarrativeRequestError(
        'duration',
        `NarrativeDuration must be one of [${VALID_NARRATIVE_DURATIONS.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as NarrativeDuration;
  }

  getValue(): NarrativeDuration {
    return this.value;
  }

  getTargetStepBounds(): { minSteps: number; maxSteps: number; targetSeconds: number } {
    switch (this.value) {
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
}
