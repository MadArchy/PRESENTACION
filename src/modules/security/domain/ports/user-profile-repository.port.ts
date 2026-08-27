import {
  UserProfile,
  Organization,
  OrganizationMembership,
  ProjectAccessAssignment,
  AuditEvent,
  OrganizationRole,
  ProjectRole
} from '../security.types';

export interface UserProfileRepository {
  findUserProfileById(userId: string): Promise<UserProfile | null>;
  saveUserProfile(profile: UserProfile): Promise<void>;
}

export interface OrganizationRepository {
  findOrgById(id: string): Promise<Organization | null>;
  findOrgBySlug(slug: string): Promise<Organization | null>;
  listOrgsByUser(userId: string): Promise<Organization[]>;
  saveOrg(org: Organization): Promise<void>;
}

export interface OrganizationMembershipRepository {
  findMembership(organizationId: string, userId: string): Promise<OrganizationMembership | null>;
  listMembershipsByOrg(organizationId: string): Promise<OrganizationMembership[]>;
  listMembershipsByUser(userId: string): Promise<OrganizationMembership[]>;
  saveMembership(membership: OrganizationMembership): Promise<void>;
}

export interface ProjectAccessRepository {
  findProjectAccess(organizationId: string, projectId: string, userId: string): Promise<ProjectAccessAssignment | null>;
  listProjectAccessByProject(organizationId: string, projectId: string): Promise<ProjectAccessAssignment[]>;
  listProjectAccessByUser(organizationId: string, userId: string): Promise<ProjectAccessAssignment[]>;
  saveProjectAccess(assignment: ProjectAccessAssignment): Promise<void>;
}

export interface AuditLogRepository {
  listAuditByOrg(organizationId: string, limit?: number): Promise<AuditEvent[]>;
  listAuditByProject(organizationId: string, projectId: string, limit?: number): Promise<AuditEvent[]>;
  findAuditById(organizationId: string, eventId: string): Promise<AuditEvent | null>;
}

export interface SecurityAdministrationPort {
  createOrganization(name: string, slug: string, actorId: string): Promise<Organization>;
  addOrganizationMember(orgId: string, email: string, role: OrganizationRole, actorId: string): Promise<OrganizationMembership>;
  changeOrganizationMemberRole(orgId: string, userId: string, newRole: OrganizationRole, actorId: string): Promise<OrganizationMembership>;
  suspendOrganizationMember(orgId: string, userId: string, actorId: string): Promise<OrganizationMembership>;
  revokeOrganizationMember(orgId: string, userId: string, actorId: string): Promise<OrganizationMembership>;
  
  grantProjectAccess(orgId: string, projectId: string, userId: string, role: ProjectRole, actorId: string): Promise<ProjectAccessAssignment>;
  changeProjectRole(orgId: string, projectId: string, userId: string, newRole: ProjectRole, actorId: string): Promise<ProjectAccessAssignment>;
  suspendProjectAccess(orgId: string, projectId: string, userId: string, actorId: string): Promise<ProjectAccessAssignment>;
  revokeProjectAccess(orgId: string, projectId: string, userId: string, actorId: string): Promise<ProjectAccessAssignment>;
}
