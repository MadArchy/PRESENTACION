import {
  OrganizationRole,
  ProjectRole,
  Permission
} from '../security.types';

export class RolePermissionPolicy {
  public static readonly PERMISSION_CATALOG_VERSION = '1.2';
  public static readonly SECURITY_POLICY_VERSION = '1.0';

  private static readonly ORG_ROLE_PERMISSIONS: Record<OrganizationRole, Permission[]> = {
    ORG_OWNER: [
      'organization.read',
      'organization.manage',
      'organization.update_settings',
      'organization.suspend',
      'organization.archive',
      'organization.transfer_ownership',
      'members.read',
      'members.invite',
      'members.manage_roles',
      'members.suspend',
      'projects.read',
      'projects.create',
      'projects.update_settings',
      'projects.pause',
      'projects.archive',
      'projects.reactivate',
      'projects.transfer_ownership',
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
      'data_room.upload_file',
      'data_room.replace_file',
      'data_room.delete_file',
      'data_room.share_file',
      'data_room.manage_file_versions',
      'data_room.review_quarantined_file',
      'usage.read',
      'platform_health.read',
      'security.read',
      'security.manage',
      'audit.read'
    ],
    ORG_ADMIN: [
      'organization.read',
      'organization.manage',
      'organization.update_settings',
      'organization.suspend',
      'organization.archive',
      'members.read',
      'members.invite',
      'members.manage_roles',
      'members.suspend',
      'projects.read',
      'projects.create',
      'projects.update_settings',
      'projects.pause',
      'projects.archive',
      'projects.reactivate',
      'projects.manage_access',
      'projects.manage_settings',
      'data_room.delete_file',
      'data_room.share_file',
      'data_room.review_quarantined_file',
      'usage.read',
      'platform_health.read',
      'security.read',
      'audit.read'
    ],
    ORG_MEMBER: [
      'organization.read',
      'members.read',
      'projects.read',
      'usage.read'
    ],
    ORG_VIEWER: [
      'organization.read',
      'projects.read'
    ]
  };

  private static readonly PROJECT_ROLE_PERMISSIONS: Record<ProjectRole, Permission[]> = {
    PROJECT_ADMIN: [
      'projects.read',
      'projects.update_settings',
      'projects.pause',
      'projects.archive',
      'projects.reactivate',
      'projects.transfer_ownership',
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
      'data_room.upload_file',
      'data_room.replace_file',
      'data_room.delete_file',
      'data_room.share_file',
      'data_room.manage_file_versions',
      'data_room.review_quarantined_file',
      'usage.read'
    ],
    PROJECT_EDITOR: [
      'projects.read',
      'project_twin.read',
      'project_twin.edit',
      'claims.read',
      'claims.edit',
      'evidence.read',
      'evidence.manage',
      'narrative.read',
      'narrative.generate',
      'presentation.read',
      'presentation.generate',
      'copilot.use',
      'data_room.read',
      'data_room.read_confidential',
      'data_room.manage_metadata',
      'data_room.manage_requests',
      'data_room.upload_file',
      'data_room.replace_file',
      'data_room.manage_file_versions'
    ],
    PROJECT_ANALYST: [
      'projects.read',
      'project_twin.read',
      'claims.read',
      'evidence.read',
      'narrative.read',
      'presentation.read',
      'copilot.use',
      'data_room.read',
      'data_room.read_confidential'
    ],
    PROJECT_REVIEWER: [
      'projects.read',
      'project_twin.read',
      'claims.read',
      'claims.review',
      'evidence.read',
      'narrative.read',
      'presentation.read',
      'data_room.read',
      'data_room.read_confidential'
    ],
    PROJECT_PRESENTER: [
      'projects.read',
      'project_twin.read',
      'presentation.read',
      'presenter.use',
      'data_room.read'
    ],
    PROJECT_VIEWER: [
      'projects.read',
      'project_twin.read',
      'claims.read',
      'evidence.read',
      'narrative.read',
      'presentation.read',
      'data_room.read'
    ],
    EXTERNAL_REVIEWER: [
      'projects.read',
      'project_twin.read',
      'presentation.read',
      'data_room.read'
    ]
  };

  static getPermissionsForOrgRole(role: OrganizationRole): Permission[] {
    return [...(this.ORG_ROLE_PERMISSIONS[role] || [])];
  }

  static getPermissionsForProjectRole(role: ProjectRole): Permission[] {
    return [...(this.PROJECT_ROLE_PERMISSIONS[role] || [])];
  }

  static getEffectivePermissions(orgRole?: OrganizationRole, projectRole?: ProjectRole): Permission[] {
    const permissions = new Set<Permission>();
    if (orgRole) {
      this.getPermissionsForOrgRole(orgRole).forEach(p => permissions.add(p));
    }
    if (projectRole) {
      this.getPermissionsForProjectRole(projectRole).forEach(p => permissions.add(p));
    }
    return Array.from(permissions);
  }
}
