import { NarrativeObjective } from '../narrative.types';
import { InvalidNarrativeRequestError } from '../errors/narrative-domain.error';

export const VALID_NARRATIVE_OBJECTIVES: NarrativeObjective[] = [
  'INFORM',
  'ALIGN',
  'PERSUADE',
  'RAISE_CAPITAL',
  'SELL',
  'ARCHITECTURE_REVIEW',
  'STRATEGIC_REVIEW',
  'DECISION_SUPPORT',
  'VALIDATE',
  'DUE_DILIGENCE'
];

export class NarrativeObjectiveVo {
  private readonly value: NarrativeObjective;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_NARRATIVE_OBJECTIVES.includes(normalized as NarrativeObjective)) {
      throw new InvalidNarrativeRequestError(
        'objective',
        `NarrativeObjective must be one of [${VALID_NARRATIVE_OBJECTIVES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as NarrativeObjective;
  }

  getValue(): NarrativeObjective {
    return this.value;
  }
}
