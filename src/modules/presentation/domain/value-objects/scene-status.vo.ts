import { SceneStatus } from '../presentation.types';
import { InvalidPresentationDataError } from '../errors/presentation-domain.error';

const VALID_STATUSES: SceneStatus[] = [
  'READY',
  'READY_WITH_WARNINGS',
  'INCOMPLETE',
  'BLOCKED'
];

export class SceneStatusVo {
  private readonly value: SceneStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_STATUSES.includes(normalized as SceneStatus)) {
      throw new InvalidPresentationDataError(
        'sceneStatus',
        `SceneStatus must be one of [${VALID_STATUSES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as SceneStatus;
  }

  getValue(): SceneStatus {
    return this.value;
  }
}
