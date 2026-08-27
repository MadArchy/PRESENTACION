import { SceneRuntimeState } from '../presenter.types';
import { PresenterDomainError } from '../errors/presenter-domain.error';

export const VALID_RUNTIME_STATES: SceneRuntimeState[] = ['NOT_VISITED', 'CURRENT', 'VISITED', 'SKIPPED'];

export class SceneRuntimeStateVo {
  private readonly value: SceneRuntimeState;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_RUNTIME_STATES.includes(normalized as SceneRuntimeState)) {
      throw new PresenterDomainError(`Invalid scene runtime state '${value}'. Must be one of [${VALID_RUNTIME_STATES.join(', ')}]`);
    }
    this.value = normalized as SceneRuntimeState;
  }

  getValue(): SceneRuntimeState {
    return this.value;
  }
}
