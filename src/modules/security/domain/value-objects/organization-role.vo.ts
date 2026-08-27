import {
  OrganizationRole,
  ProjectRole,
  UserStatus,
  Permission
} from '../security.types';
import { SecurityDomainError } from '../errors/security-domain.error';

export const VALID_ORG_ROLES: OrganizationRole[] = [
  'ORG_OWNER',
  'ORG_ADMIN',
  'ORG_MEMBER',
  'ORG_VIEWER'
];

export class OrganizationRoleVo {
  private readonly value: OrganizationRole;

  constructor(value: string) {
    const normalized = value ? (value.toUpperCase().trim() as OrganizationRole) : 'ORG_VIEWER';
    if (!VALID_ORG_ROLES.includes(normalized)) {
      throw new SecurityDomainError(`Invalid OrganizationRole: '${value}'`);
    }
    this.value = normalized;
  }

  getValue(): OrganizationRole {
    return this.value;
  }

  isOwner(): boolean {
    return this.value === 'ORG_OWNER';
  }

  isAdminOrOwner(): boolean {
    return this.value === 'ORG_OWNER' || this.value === 'ORG_ADMIN';
  }
}

export const VALID_PROJECT_ROLES: ProjectRole[] = [
  'PROJECT_ADMIN',
  'PROJECT_EDITOR',
  'PROJECT_ANALYST',
  'PROJECT_REVIEWER',
  'PROJECT_PRESENTER',
  'PROJECT_VIEWER',
  'EXTERNAL_REVIEWER'
];

export class ProjectRoleVo {
  private readonly value: ProjectRole;

  constructor(value: string) {
    const normalized = value ? (value.toUpperCase().trim() as ProjectRole) : 'PROJECT_VIEWER';
    if (!VALID_PROJECT_ROLES.includes(normalized)) {
      throw new SecurityDomainError(`Invalid ProjectRole: '${value}'`);
    }
    this.value = normalized;
  }

  getValue(): ProjectRole {
    return this.value;
  }

  isAdmin(): boolean {
    return this.value === 'PROJECT_ADMIN';
  }

  isEditor(): boolean {
    return this.value === 'PROJECT_ADMIN' || this.value === 'PROJECT_EDITOR';
  }
}

export const VALID_USER_STATUSES: UserStatus[] = ['ACTIVE', 'SUSPENDED', 'DEACTIVATED'];

export class UserStatusVo {
  private readonly value: UserStatus;

  constructor(value: string) {
    const normalized = value ? (value.toUpperCase().trim() as UserStatus) : 'ACTIVE';
    if (!VALID_USER_STATUSES.includes(normalized)) {
      throw new SecurityDomainError(`Invalid UserStatus: '${value}'`);
    }
    this.value = normalized;
  }

  getValue(): UserStatus {
    return this.value;
  }

  isActive(): boolean {
    return this.value === 'ACTIVE';
  }
}

export const ALL_PERMISSIONS: Permission[] = [
  'organization.read',
  'organization.manage',
  'members.read',
  'members.invite',
  'members.manage_roles',
  'members.suspend',
  'projects.read',
  'projects.create',
  'projects.manage_access',
  'projects.manage_settings',
  'project_twin.read',
  'project_twin.edit',
  'claims.read',
  'claims.edit',
  'claims.review',
  'evidence.read',
  'evidence.manage',
  'narrative.read',
  'narrative.generate',
  'presentation.read',
  'presentation.generate',
  'presenter.use',
  'copilot.use',
  'copilot.configure_provider',
  'data_room.read',
  'data_room.read_confidential',
  'data_room.read_highly_confidential',
  'data_room.manage_metadata',
  'data_room.manage_requests',
  'security.read',
  'security.manage',
  'audit.read'
];

export class PermissionVo {
  private readonly value: Permission;

  constructor(value: string) {
    if (!ALL_PERMISSIONS.includes(value as Permission)) {
      throw new SecurityDomainError(`Unknown permission: '${value}'`);
    }
    this.value = value as Permission;
  }

  getValue(): Permission {
    return this.value;
  }
}
