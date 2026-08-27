export type PlatformRole = 'PLATFORM_ADMIN' | 'PLATFORM_SUPPORT';

export type OrganizationRole =
  | 'ORG_OWNER'
  | 'ORG_ADMIN'
  | 'ORG_MEMBER'
  | 'ORG_VIEWER';

export type ProjectRole =
  | 'PROJECT_ADMIN'
  | 'PROJECT_EDITOR'
  | 'PROJECT_ANALYST'
  | 'PROJECT_REVIEWER'
  | 'PROJECT_PRESENTER'
  | 'PROJECT_VIEWER'
  | 'EXTERNAL_REVIEWER';

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';

export type OrganizationStatus = 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';

export type MembershipStatus = 'INVITED' | 'ACTIVE' | 'SUSPENDED' | 'REVOKED';

export type AccessAssignmentStatus = 'ACTIVE' | 'SUSPENDED' | 'REVOKED';

export type Permission =
  | 'organization.read'
  | 'organization.manage'
  | 'organization.update_settings'
  | 'organization.suspend'
  | 'organization.archive'
  | 'organization.transfer_ownership'
  | 'members.read'
  | 'members.invite'
  | 'members.manage_roles'
  | 'members.suspend'
  | 'projects.read'
  | 'projects.create'
  | 'projects.update_settings'
  | 'projects.pause'
  | 'projects.archive'
  | 'projects.reactivate'
  | 'projects.transfer_ownership'
  | 'projects.manage_access'
  | 'projects.manage_settings'
  | 'project_twin.read'
  | 'project_twin.edit'
  | 'claims.read'
  | 'claims.edit'
  | 'claims.review'
  | 'evidence.read'
  | 'evidence.manage'
  | 'narrative.read'
  | 'narrative.generate'
  | 'presentation.read'
  | 'presentation.generate'
  | 'presenter.use'
  | 'copilot.use'
  | 'copilot.configure_provider'
  | 'data_room.read'
  | 'data_room.read_confidential'
  | 'data_room.read_highly_confidential'
  | 'data_room.manage_metadata'
  | 'data_room.manage_requests'
  | 'data_room.upload_file'
  | 'data_room.replace_file'
  | 'data_room.delete_file'
  | 'data_room.share_file'
  | 'data_room.manage_file_versions'
  | 'data_room.review_quarantined_file'
  | 'usage.read'
  | 'platform_health.read'
  | 'security.read'
  | 'security.manage'
  | 'audit.read';

export type AuthorizationReasonCode =
  | 'ALLOW'
  | 'UNAUTHENTICATED'
  | 'EMAIL_NOT_VERIFIED'
  | 'USER_SUSPENDED'
  | 'ORGANIZATION_NOT_FOUND'
  | 'ORGANIZATION_SUSPENDED'
  | 'MEMBERSHIP_MISSING'
  | 'MEMBERSHIP_INACTIVE'
  | 'PROJECT_ACCESS_MISSING'
  | 'PROJECT_ACCESS_INACTIVE'
  | 'PERMISSION_MISSING'
  | 'CONFIDENTIALITY_PERMISSION_MISSING'
  | 'CROSS_ORGANIZATION_ACCESS'
  | 'INVALID_RESOURCE_CONTEXT';

export type AuditEventType =
  | 'ORGANIZATION_CREATED'
  | 'ORGANIZATION_RENAMED'
  | 'ORGANIZATION_SETTINGS_UPDATED'
  | 'ORGANIZATION_SUSPENDED'
  | 'ORGANIZATION_REACTIVATED'
  | 'ORGANIZATION_ARCHIVED'
  | 'ORGANIZATION_OWNERSHIP_TRANSFERRED'
  | 'MEMBER_ADDED'
  | 'MEMBER_ROLE_CHANGED'
  | 'MEMBER_SUSPENDED'
  | 'MEMBER_REACTIVATED'
  | 'MEMBER_REVOKED'
  | 'PROJECT_CREATED'
  | 'PROJECT_SETTINGS_UPDATED'
  | 'PROJECT_PAUSED'
  | 'PROJECT_REACTIVATED'
  | 'PROJECT_ARCHIVED'
  | 'PROJECT_OWNERSHIP_TRANSFERRED'
  | 'PROJECT_SECURITY_REGISTERED'
  | 'PROJECT_ACCESS_GRANTED'
  | 'PROJECT_ROLE_CHANGED'
  | 'PROJECT_ACCESS_SUSPENDED'
  | 'PROJECT_ACCESS_REACTIVATED'
  | 'PROJECT_ACCESS_REVOKED'
  | 'SECURITY_POLICY_CHANGED';

export interface AuthenticatedIdentity {
  userId: string;
  email?: string;
  displayName?: string;
  emailVerified: boolean;
  authProviderIds: string[];
  platformRole?: PlatformRole;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  primaryEmail?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  status: OrganizationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMembership {
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  status: MembershipStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface ProjectAccessAssignment {
  organizationId: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  status: AccessAssignmentStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface AuditEvent {
  id: string;
  organizationId?: string;
  projectId?: string;
  actorUserId: string;
  type: AuditEventType;
  targetType: string;
  targetId?: string;
  occurredAt: string;
  requestId?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  source: 'TRUSTED_FUNCTION';
}

export interface AuthorizationDecision {
  allowed: boolean;
  reasonCode: AuthorizationReasonCode;
  requiredPermissions: Permission[];
  grantedPermissions: Permission[];
  organizationId?: string;
  projectId?: string;
  policyVersion: string;
  message?: string;
}

export interface SecurityContext {
  identity: AuthenticatedIdentity;
  userProfile?: UserProfile;
  organization?: Organization;
  membership?: OrganizationMembership;
  projectAccess?: ProjectAccessAssignment;
  effectivePermissions: Permission[];
}

export interface ResourceSecurityEnvelope {
  organizationId: string;
  projectId?: string;
  confidentiality?: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'HIGHLY_CONFIDENTIAL';
}
