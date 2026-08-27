import { ProjectSettings, LifecycleDecision } from '../administration.types';

export class ModuleEnablementPolicy {
  public static readonly MODULE_ENABLEMENT_POLICY_VERSION = '1.0';

  public static canAccessModule(
    settings: ProjectSettings,
    moduleName: 'DATA_ROOM' | 'COPILOT' | 'PRESENTER'
  ): LifecycleDecision {
    if (moduleName === 'DATA_ROOM' && !settings.dataRoomEnabled) {
      return {
        allowed: false,
        reasonCode: 'MODULE_DISABLED',
        message: 'Data Room module is disabled for this project.'
      };
    }

    if (moduleName === 'COPILOT' && !settings.copilotEnabled) {
      return {
        allowed: false,
        reasonCode: 'MODULE_DISABLED',
        message: 'AI Copilot module is disabled for this project.'
      };
    }

    if (moduleName === 'PRESENTER' && !settings.presenterEnabled) {
      return {
        allowed: false,
        reasonCode: 'MODULE_DISABLED',
        message: 'Presenter module is disabled for this project.'
      };
    }

    return { allowed: true, reasonCode: 'ALLOW' };
  }
}
