/**
 * Venture Hub OS — Copilot Authorization Policy
 * Invariant: COPILOT ACCESS <= USER ACCESS
 */

import { CopilotQueryContext } from '../copilot-conversation.types';

export class CopilotAuthorizationPolicy {
  public static readonly VERSION = '1.0.0';

  /**
   * Asserts that a user has active permissions to query Copilot for the requested project
   */
  public static validateQueryAccess(
    context: CopilotQueryContext,
    userAuthorizedProjectIds: string[],
    isSuspended: boolean = false
  ): { allowed: boolean; reason?: string } {
    if (isSuspended) {
      return { allowed: false, reason: 'SUSPENDED_USER_DENIED' };
    }

    if (!context.organizationId || !context.projectId || !context.userId) {
      return { allowed: false, reason: 'MISSING_MANDATORY_QUERY_CONTEXT' };
    }

    if (!userAuthorizedProjectIds.includes(context.projectId)) {
      return { allowed: false, reason: 'CROSS_PROJECT_OR_UNASSIGNED_RETRIEVAL_DENIED' };
    }

    return { allowed: true };
  }

  /**
   * Filters retrieved context pack items to strictly those the user is permitted to see
   */
  public static filterConfidentialContext<T extends { confidentialityLevel?: string }>(
    items: T[],
    userClearance: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'HIGHLY_CONFIDENTIAL'
  ): T[] {
    const levels = ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'HIGHLY_CONFIDENTIAL'];
    const userLevelIdx = levels.indexOf(userClearance);

    return items.filter(item => {
      if (!item.confidentialityLevel) return true;
      const itemLevelIdx = levels.indexOf(item.confidentialityLevel);
      return itemLevelIdx <= userLevelIdx;
    });
  }
}
