/**
 * Venture Hub OS — Copilot Context Resolver Service
 */

import { CopilotQueryContext, CopilotMode } from '../copilot-conversation.types';

export class CopilotContextResolverService {
  /**
   * Resolves runtime context for a Copilot query from session state, active route, and selected entity
   */
  public resolveContext(
    session: { activeOrgId: string; activeProjectId: string; userId: string },
    currentRoute: string = 'workspace',
    selectedEntityId?: string,
    mode: CopilotMode = 'EXECUTIVE'
  ): CopilotQueryContext {
    let currentModule = 'overview';

    if (currentRoute.includes('twin')) currentModule = 'project_twin';
    else if (currentRoute.includes('governance') || currentRoute.includes('claims') || currentRoute.includes('evidence')) currentModule = 'governance';
    else if (currentRoute.includes('dataroom')) currentModule = 'data_room';
    else if (currentRoute.includes('presentation')) currentModule = 'presentation';
    else if (currentRoute.includes('presenter')) currentModule = 'presenter';
    else if (currentRoute.includes('admin')) currentModule = 'administration';
    else if (currentRoute.includes('copilot')) currentModule = 'copilot_workspace';

    return {
      organizationId: session.activeOrgId,
      projectId: session.activeProjectId,
      userId: session.userId,
      currentModule,
      selectedEntityId,
      mode
    };
  }
}
