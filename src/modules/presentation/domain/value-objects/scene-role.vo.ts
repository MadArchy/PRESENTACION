import { SceneRole } from '../presentation.types';
import { InvalidPresentationDataError } from '../errors/presentation-domain.error';

export const VALID_SCENE_ROLES: SceneRole[] = [
  'OPENING',
  'CONTEXT',
  'PROBLEM',
  'OPPORTUNITY',
  'SOLUTION',
  'PROOF',
  'ECONOMICS',
  'DIFFERENTIATION',
  'RISK',
  'EXECUTION',
  'DECISION',
  'ASK',
  'CLOSING'
];

export class SceneRoleVo {
  private readonly value: SceneRole;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_SCENE_ROLES.includes(normalized as SceneRole)) {
      throw new InvalidPresentationDataError(
        'sceneRole',
        `SceneRole must be one of [${VALID_SCENE_ROLES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as SceneRole;
  }

  getValue(): SceneRole {
    return this.value;
  }
}
