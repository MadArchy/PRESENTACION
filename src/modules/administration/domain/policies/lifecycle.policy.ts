import {
  OrganizationStatus,
  ProjectLifecycleStatus,
  LifecycleDecision
} from '../administration.types';

export class LifecyclePolicy {
  public static readonly ADMINISTRATION_POLICY_VERSION = '1.0';

  /**
   * Project status transition rules:
   * DRAFT -> ACTIVE, ARCHIVED
   * ACTIVE -> PAUSED, ARCHIVED
   * PAUSED -> ACTIVE, ARCHIVED
   * ARCHIVED -> ACTIVE
   */
  private static readonly ALLOWED_PROJECT_TRANSITIONS: Record<ProjectLifecycleStatus, ProjectLifecycleStatus[]> = {
    DRAFT: ['ACTIVE', 'ARCHIVED'],
    ACTIVE: ['PAUSED', 'ARCHIVED'],
    PAUSED: ['ACTIVE', 'ARCHIVED'],
    ARCHIVED: ['ACTIVE']
  };

  /**
   * Organization status transition rules:
   * ACTIVE -> SUSPENDED, ARCHIVED
   * SUSPENDED -> ACTIVE, ARCHIVED
   * ARCHIVED -> ACTIVE
   */
  private static readonly ALLOWED_ORG_TRANSITIONS: Record<OrganizationStatus, OrganizationStatus[]> = {
    ACTIVE: ['SUSPENDED', 'ARCHIVED'],
    SUSPENDED: ['ACTIVE', 'ARCHIVED'],
    ARCHIVED: ['ACTIVE']
  };

  public static validateProjectTransition(
    currentStatus: ProjectLifecycleStatus,
    targetStatus: ProjectLifecycleStatus
  ): LifecycleDecision {
    if (currentStatus === targetStatus) {
      return { allowed: true, reasonCode: 'ALLOW' };
    }

    const allowedTargets = this.ALLOWED_PROJECT_TRANSITIONS[currentStatus] || [];
    if (allowedTargets.includes(targetStatus)) {
      return { allowed: true, reasonCode: 'ALLOW' };
    }

    return {
      allowed: false,
      reasonCode: 'INVALID_TRANSITION',
      message: `Invalid project status transition from ${currentStatus} to ${targetStatus}`
    };
  }

  public static validateOrganizationTransition(
    currentStatus: OrganizationStatus,
    targetStatus: OrganizationStatus
  ): LifecycleDecision {
    if (currentStatus === targetStatus) {
      return { allowed: true, reasonCode: 'ALLOW' };
    }

    const allowedTargets = this.ALLOWED_ORG_TRANSITIONS[currentStatus] || [];
    if (allowedTargets.includes(targetStatus)) {
      return { allowed: true, reasonCode: 'ALLOW' };
    }

    return {
      allowed: false,
      reasonCode: 'INVALID_TRANSITION',
      message: `Invalid organization status transition from ${currentStatus} to ${targetStatus}`
    };
  }

  /**
   * Check if write operations are permitted for the project lifecycle state.
   * When PAUSED or ARCHIVED, all normal writes are blocked.
   */
  public static canWriteProject(projectStatus: ProjectLifecycleStatus): LifecycleDecision {
    if (projectStatus === 'ACTIVE' || projectStatus === 'DRAFT') {
      return { allowed: true, reasonCode: 'ALLOW' };
    }
    if (projectStatus === 'PAUSED') {
      return {
        allowed: false,
        reasonCode: 'PROJECT_PAUSED',
        message: 'Project is PAUSED. Write mutations are forbidden.'
      };
    }
    if (projectStatus === 'ARCHIVED') {
      return {
        allowed: false,
        reasonCode: 'PROJECT_ARCHIVED',
        message: 'Project is ARCHIVED. Write mutations are forbidden.'
      };
    }
    return {
      allowed: false,
      reasonCode: 'INVALID_TRANSITION',
      message: `Unknown project status '${projectStatus}'`
    };
  }

  /**
   * Check if read operations are permitted for the project lifecycle state.
   * PAUSED: Normal reads allowed.
   * ARCHIVED: Historical reads allowed for authorized users.
   */
  public static canReadProject(_projectStatus?: ProjectLifecycleStatus): LifecycleDecision {
    return { allowed: true, reasonCode: 'ALLOW' };
  }

  /**
   * Validates Last Owner Protection.
   * An organization or project cannot have its last owner removed, suspended, or downgraded.
   */
  public static validateOwnerProtection(
    isCurrentOwner: boolean,
    totalOwnerCount: number,
    action: 'REMOVE' | 'SUSPEND' | 'DOWNGRADE'
  ): LifecycleDecision {
    if (isCurrentOwner && totalOwnerCount <= 1) {
      return {
        allowed: false,
        reasonCode: 'OWNER_PROTECTION',
        message: `Cannot ${action.toLowerCase()} the sole active owner. Transfer ownership first.`
      };
    }
    return { allowed: true, reasonCode: 'ALLOW' };
  }
}
