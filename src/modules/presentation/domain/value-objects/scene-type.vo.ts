import { SceneType } from '../presentation.types';
import { InvalidPresentationDataError } from '../errors/presentation-domain.error';

export const VALID_SCENE_TYPES: SceneType[] = [
  'EXECUTIVE_HERO',
  'SECTION_DIVIDER',
  'PROBLEM_FRAME',
  'WHY_NOW',
  'SOLUTION_OVERVIEW',
  'PRODUCT_OVERVIEW',
  'MARKET_OVERVIEW',
  'BUSINESS_MODEL',
  'COMPETITIVE_LANDSCAPE',
  'TRACTION',
  'FINANCIAL_OVERVIEW',
  'TECHNOLOGY_OVERVIEW',
  'ARCHITECTURE_MAP',
  'RISK_OVERVIEW',
  'ROADMAP',
  'TEAM',
  'EVIDENCE_OVERVIEW',
  'DECISION_FRAME',
  'ASK',
  'CLOSING',
  'GENERIC_CONTENT'
];

export class SceneTypeVo {
  private readonly value: SceneType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_SCENE_TYPES.includes(normalized as SceneType)) {
      throw new InvalidPresentationDataError(
        'sceneType',
        `SceneType must be one of [${VALID_SCENE_TYPES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as SceneType;
  }

  getValue(): SceneType {
    return this.value;
  }
}
