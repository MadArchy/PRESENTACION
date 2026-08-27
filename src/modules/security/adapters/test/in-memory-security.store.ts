import {
  AuthenticatedIdentity,
  UserProfile,
  Organization,
  OrganizationMembership,
  ProjectAccessAssignment,
  AuditEvent,
  OrganizationRole,
  ProjectRole
} from '../../domain/security.types';
import { AuthenticationPort } from '../../domain/ports/authentication.port';
import {
  UserProfileRepository,
  OrganizationRepository,
  OrganizationMembershipRepository,
  ProjectAccessRepository,
  AuditLogRepository,
  SecurityAdministrationPort
} from '../../domain/ports/user-profile-repository.port';
import { RoleEscalationError, ForbiddenError, UnauthorizedError } from '../../domain/errors/security-domain.error';

export class InMemorySecurityStore
  implements
    AuthenticationPort,
    UserProfileRepository,
    OrganizationRepository,
    OrganizationMembershipRepository,
    ProjectAccessRepository,
    AuditLogRepository,
    SecurityAdministrationPort
{
  private currentIdentity: AuthenticatedIdentity | null = null;
  private authListeners: ((identity: AuthenticatedIdentity | null) => void)[] = [];

  private users = new Map<string, UserProfile>();
  private organizations = new Map<string, Organization>();
  private memberships = new Map<string, OrganizationMembership>(); // key: `${orgId}:${userId}`
  private projectAccess = new Map<string, ProjectAccessAssignment>(); // key: `${orgId}:${projectId}:${userId}`
  private auditEvents = new Map<string, AuditEvent[]>(); // key: orgId

  constructor() {
    this.seedDefaults();
  }

  private seedDefaults(): void {
    // 1. Seed Arcana Organization
    const arcanaOrg: Organization = {
      id: 'org-arcana',
      name: 'Arcana Trust Network Org',
      slug: 'arcana-org',
      status: 'ACTIVE',
      createdAt: '2026-08-26T18:00:00Z',
      updatedAt: '2026-08-26T18:00:00Z'
    };
    this.organizations.set(arcanaOrg.id, arcanaOrg);

    // 2. Seed Users
    const usersList: UserProfile[] = [
      {
        userId: 'usr-owner-01',
        displayName: 'Elena Rostova (Founder)',
        primaryEmail: 'elena@arcana.network',
        status: 'ACTIVE',
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        userId: 'usr-admin-01',
        displayName: 'Marcus Vance (SecOps)',
        primaryEmail: 'marcus@arcana.network',
        status: 'ACTIVE',
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        userId: 'usr-editor-01',
        displayName: 'Sofia Chen (Tech Lead)',
        primaryEmail: 'sofia@arcana.network',
        status: 'ACTIVE',
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        userId: 'usr-reviewer-01',
        displayName: 'David K. (Venture Partner)',
        primaryEmail: 'david@sequoia-mock.com',
        status: 'ACTIVE',
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        userId: 'usr-suspended-01',
        displayName: 'Terminated Contractor',
        primaryEmail: 'contractor@arcana.network',
        status: 'SUSPENDED',
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      }
    ];
    usersList.forEach(u => this.users.set(u.userId, u));

    // 3. Seed Memberships
    this.memberships.set('org-arcana:usr-owner-01', {
      organizationId: 'org-arcana',
      userId: 'usr-owner-01',
      role: 'ORG_OWNER',
      status: 'ACTIVE',
      createdAt: '2026-08-26T18:00:00Z',
      updatedAt: '2026-08-26T18:00:00Z',
      createdBy: 'SYSTEM',
      updatedBy: 'SYSTEM'
    });

    this.memberships.set('org-arcana:usr-admin-01', {
      organizationId: 'org-arcana',
      userId: 'usr-admin-01',
      role: 'ORG_ADMIN',
      status: 'ACTIVE',
      createdAt: '2026-08-26T18:00:00Z',
      updatedAt: '2026-08-26T18:00:00Z',
      createdBy: 'usr-owner-01',
      updatedBy: 'usr-owner-01'
    });

    this.memberships.set('org-arcana:usr-editor-01', {
      organizationId: 'org-arcana',
      userId: 'usr-editor-01',
      role: 'ORG_MEMBER',
      status: 'ACTIVE',
      createdAt: '2026-08-26T18:00:00Z',
      updatedAt: '2026-08-26T18:00:00Z',
      createdBy: 'usr-admin-01',
      updatedBy: 'usr-admin-01'
    });

    this.memberships.set('org-arcana:usr-reviewer-01', {
      organizationId: 'org-arcana',
      userId: 'usr-reviewer-01',
      role: 'ORG_VIEWER',
      status: 'ACTIVE',
      createdAt: '2026-08-26T18:00:00Z',
      updatedAt: '2026-08-26T18:00:00Z',
      createdBy: 'usr-admin-01',
      updatedBy: 'usr-admin-01'
    });

    // 4. Seed Project Access for 'arcana'
    this.projectAccess.set('org-arcana:arcana:usr-admin-01', {
      organizationId: 'org-arcana',
      projectId: 'arcana',
      userId: 'usr-admin-01',
      role: 'PROJECT_ADMIN',
      status: 'ACTIVE',
      createdAt: '2026-08-26T18:00:00Z',
      updatedAt: '2026-08-26T18:00:00Z',
      createdBy: 'usr-owner-01',
      updatedBy: 'usr-owner-01'
    });

    this.projectAccess.set('org-arcana:arcana:usr-editor-01', {
      organizationId: 'org-arcana',
      projectId: 'arcana',
      userId: 'usr-editor-01',
      role: 'PROJECT_EDITOR',
      status: 'ACTIVE',
      createdAt: '2026-08-26T18:00:00Z',
      updatedAt: '2026-08-26T18:00:00Z',
      createdBy: 'usr-admin-01',
      updatedBy: 'usr-admin-01'
    });

    this.projectAccess.set('org-arcana:arcana:usr-reviewer-01', {
      organizationId: 'org-arcana',
      projectId: 'arcana',
      userId: 'usr-reviewer-01',
      role: 'EXTERNAL_REVIEWER',
      status: 'ACTIVE',
      createdAt: '2026-08-26T18:00:00Z',
      updatedAt: '2026-08-26T18:00:00Z',
      createdBy: 'usr-admin-01',
      updatedBy: 'usr-admin-01'
    });

    // Set initial authenticated identity as the Owner
    this.currentIdentity = {
      userId: 'usr-owner-01',
      email: 'elena@arcana.network',
      displayName: 'Elena Rostova (Founder)',
      emailVerified: true,
      authProviderIds: ['password']
    };
  }

  // --- AuthenticationPort ---

  async getCurrentIdentity(): Promise<AuthenticatedIdentity | null> {
    return this.currentIdentity ? { ...this.currentIdentity } : null;
  }

  async signInWithEmailPassword(email: string, _password: string): Promise<AuthenticatedIdentity> {
    const user = Array.from(this.users.values()).find(u => u.primaryEmail === email.toLowerCase().trim());
    if (!user) {
      throw new UnauthorizedError(`Usuario con email '${email}' no encontrado o credenciales inválidas`);
    }

    this.currentIdentity = {
      userId: user.userId,
      email: user.primaryEmail,
      displayName: user.displayName,
      emailVerified: true,
      authProviderIds: ['password']
    };

    this.notifyAuthListeners();
    return { ...this.currentIdentity };
  }

  async signOut(): Promise<void> {
    this.currentIdentity = null;
    this.notifyAuthListeners();
  }

  onAuthStateChanged(callback: (identity: AuthenticatedIdentity | null) => void): () => void {
    this.authListeners.push(callback);
    callback(this.currentIdentity);
    return () => {
      this.authListeners = this.authListeners.filter(l => l !== callback);
    };
  }

  private notifyAuthListeners(): void {
    this.authListeners.forEach(l => l(this.currentIdentity));
  }

  // --- UserProfileRepository ---

  async findUserProfileById(userId: string): Promise<UserProfile | null> {
    return this.users.get(userId) || null;
  }

  async saveUserProfile(profile: UserProfile): Promise<void> {
    this.users.set(profile.userId, profile);
  }

  // --- OrganizationRepository ---

  async findOrgById(id: string): Promise<Organization | null> {
    return this.organizations.get(id) || null;
  }

  async findOrgBySlug(slug: string): Promise<Organization | null> {
    return Array.from(this.organizations.values()).find(o => o.slug === slug) || null;
  }

  async listOrgsByUser(userId: string): Promise<Organization[]> {
    const orgIds = Array.from(this.memberships.values())
      .filter(m => m.userId === userId && m.status === 'ACTIVE')
      .map(m => m.organizationId);
    return Array.from(this.organizations.values()).filter(o => orgIds.includes(o.id));
  }

  async saveOrg(org: Organization): Promise<void> {
    this.organizations.set(org.id, org);
  }

  // --- OrganizationMembershipRepository ---

  async findMembership(organizationId: string, userId: string): Promise<OrganizationMembership | null> {
    return this.memberships.get(`${organizationId}:${userId}`) || null;
  }

  async listMembershipsByOrg(organizationId: string): Promise<OrganizationMembership[]> {
    return Array.from(this.memberships.values()).filter(m => m.organizationId === organizationId);
  }

  async listMembershipsByUser(userId: string): Promise<OrganizationMembership[]> {
    return Array.from(this.memberships.values()).filter(m => m.userId === userId);
  }

  async saveMembership(membership: OrganizationMembership): Promise<void> {
    this.memberships.set(`${membership.organizationId}:${membership.userId}`, membership);
  }

  // --- ProjectAccessRepository ---

  async findProjectAccess(organizationId: string, projectId: string, userId: string): Promise<ProjectAccessAssignment | null> {
    return this.projectAccess.get(`${organizationId}:${projectId}:${userId}`) || null;
  }

  async listProjectAccessByProject(organizationId: string, projectId: string): Promise<ProjectAccessAssignment[]> {
    return Array.from(this.projectAccess.values()).filter(
      p => p.organizationId === organizationId && p.projectId === projectId
    );
  }

  async listProjectAccessByUser(organizationId: string, userId: string): Promise<ProjectAccessAssignment[]> {
    return Array.from(this.projectAccess.values()).filter(
      p => p.organizationId === organizationId && p.userId === userId
    );
  }

  async saveProjectAccess(assignment: ProjectAccessAssignment): Promise<void> {
    this.projectAccess.set(`${assignment.organizationId}:${assignment.projectId}:${assignment.userId}`, assignment);
  }

  // --- AuditLogRepository ---

  async listAuditByOrg(organizationId: string, limit = 50): Promise<AuditEvent[]> {
    const events = this.auditEvents.get(organizationId) || [];
    return events.slice(-limit).reverse();
  }

  async listAuditByProject(organizationId: string, projectId: string, limit = 50): Promise<AuditEvent[]> {
    const events = (this.auditEvents.get(organizationId) || []).filter(e => e.projectId === projectId);
    return events.slice(-limit).reverse();
  }

  async findAuditById(organizationId: string, eventId: string): Promise<AuditEvent | null> {
    const events = this.auditEvents.get(organizationId) || [];
    return events.find(e => e.id === eventId) || null;
  }

  private appendAudit(event: AuditEvent): void {
    const orgId = event.organizationId || 'GLOBAL';
    const existing = this.auditEvents.get(orgId) || [];
    existing.push(event);
    this.auditEvents.set(orgId, existing);
  }

  // --- SecurityAdministrationPort (Trusted Commands) ---

  async createOrganization(name: string, slug: string, actorId: string): Promise<Organization> {
    const org: Organization = {
      id: `org-${Date.now()}`,
      name,
      slug,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.organizations.set(org.id, org);

    // Make actor ORG_OWNER
    this.memberships.set(`${org.id}:${actorId}`, {
      organizationId: org.id,
      userId: actorId,
      role: 'ORG_OWNER',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: actorId,
      updatedBy: actorId
    });

    this.appendAudit({
      id: `evt-${Date.now()}`,
      organizationId: org.id,
      actorUserId: actorId,
      type: 'ORGANIZATION_CREATED',
      targetType: 'ORGANIZATION',
      targetId: org.id,
      occurredAt: new Date().toISOString(),
      metadata: { name, slug },
      source: 'TRUSTED_FUNCTION'
    });

    return org;
  }

  async addOrganizationMember(orgId: string, email: string, role: OrganizationRole, actorId: string): Promise<OrganizationMembership> {
    const callerMembership = await this.findMembership(orgId, actorId);
    if (!callerMembership || (callerMembership.role !== 'ORG_OWNER' && callerMembership.role !== 'ORG_ADMIN')) {
      throw new ForbiddenError('MEMBERSHIP_MANAGE_DENIED', 'Caller lacks permission to add organization members');
    }

    if (role === 'ORG_OWNER' && callerMembership.role !== 'ORG_OWNER') {
      throw new RoleEscalationError('Only an ORG_OWNER can assign the ORG_OWNER role');
    }

    const userId = `usr-${Date.now()}`;
    const newProfile: UserProfile = {
      userId,
      displayName: email.split('@')[0],
      primaryEmail: email,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.set(userId, newProfile);

    const membership: OrganizationMembership = {
      organizationId: orgId,
      userId,
      role,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: actorId,
      updatedBy: actorId
    };
    this.memberships.set(`${orgId}:${userId}`, membership);

    this.appendAudit({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      actorUserId: actorId,
      type: 'MEMBER_ADDED',
      targetType: 'MEMBERSHIP',
      targetId: userId,
      occurredAt: new Date().toISOString(),
      metadata: { email, role },
      source: 'TRUSTED_FUNCTION'
    });

    return membership;
  }

  async changeOrganizationMemberRole(orgId: string, userId: string, newRole: OrganizationRole, actorId: string): Promise<OrganizationMembership> {
    const callerMembership = await this.findMembership(orgId, actorId);
    if (!callerMembership || (callerMembership.role !== 'ORG_OWNER' && callerMembership.role !== 'ORG_ADMIN')) {
      throw new ForbiddenError('MEMBERSHIP_MANAGE_DENIED', 'Caller lacks permission to modify member roles');
    }

    if (actorId === userId && callerMembership.role !== 'ORG_OWNER' && newRole === 'ORG_OWNER') {
      throw new RoleEscalationError('Self-escalation to ORG_OWNER is prohibited');
    }

    const targetMembership = await this.findMembership(orgId, userId);
    if (!targetMembership) {
      throw new ForbiddenError('MEMBER_NOT_FOUND', 'Target membership does not exist');
    }

    const beforeRole = targetMembership.role;
    targetMembership.role = newRole;
    targetMembership.updatedAt = new Date().toISOString();
    targetMembership.updatedBy = actorId;
    this.memberships.set(`${orgId}:${userId}`, targetMembership);

    this.appendAudit({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      actorUserId: actorId,
      type: 'MEMBER_ROLE_CHANGED',
      targetType: 'MEMBERSHIP',
      targetId: userId,
      occurredAt: new Date().toISOString(),
      before: { role: beforeRole },
      after: { role: newRole },
      metadata: {},
      source: 'TRUSTED_FUNCTION'
    });

    return targetMembership;
  }

  async suspendOrganizationMember(orgId: string, userId: string, actorId: string): Promise<OrganizationMembership> {
    const member = await this.findMembership(orgId, userId);
    if (!member) throw new ForbiddenError('MEMBER_NOT_FOUND', 'Member not found');
    member.status = 'SUSPENDED';
    member.updatedBy = actorId;
    member.updatedAt = new Date().toISOString();
    this.memberships.set(`${orgId}:${userId}`, member);

    this.appendAudit({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      actorUserId: actorId,
      type: 'MEMBER_SUSPENDED',
      targetType: 'MEMBERSHIP',
      targetId: userId,
      occurredAt: new Date().toISOString(),
      metadata: {},
      source: 'TRUSTED_FUNCTION'
    });

    return member;
  }

  async revokeOrganizationMember(orgId: string, userId: string, actorId: string): Promise<OrganizationMembership> {
    const member = await this.findMembership(orgId, userId);
    if (!member) throw new ForbiddenError('MEMBER_NOT_FOUND', 'Member not found');
    member.status = 'REVOKED';
    member.updatedBy = actorId;
    member.updatedAt = new Date().toISOString();
    this.memberships.set(`${orgId}:${userId}`, member);

    this.appendAudit({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      actorUserId: actorId,
      type: 'MEMBER_REVOKED',
      targetType: 'MEMBERSHIP',
      targetId: userId,
      occurredAt: new Date().toISOString(),
      metadata: {},
      source: 'TRUSTED_FUNCTION'
    });

    return member;
  }

  async grantProjectAccess(orgId: string, projectId: string, userId: string, role: ProjectRole, actorId: string): Promise<ProjectAccessAssignment> {
    const callerMembership = await this.findMembership(orgId, actorId);
    if (!callerMembership || (callerMembership.role !== 'ORG_OWNER' && callerMembership.role !== 'ORG_ADMIN')) {
      throw new ForbiddenError('PROJECT_MANAGE_ACCESS_DENIED', 'Caller lacks permission to grant project access');
    }

    const assignment: ProjectAccessAssignment = {
      organizationId: orgId,
      projectId,
      userId,
      role,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: actorId,
      updatedBy: actorId
    };
    this.projectAccess.set(`${orgId}:${projectId}:${userId}`, assignment);

    this.appendAudit({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      projectId,
      actorUserId: actorId,
      type: 'PROJECT_ACCESS_GRANTED',
      targetType: 'PROJECT_ACCESS',
      targetId: userId,
      occurredAt: new Date().toISOString(),
      metadata: { role },
      source: 'TRUSTED_FUNCTION'
    });

    return assignment;
  }

  async changeProjectRole(orgId: string, projectId: string, userId: string, newRole: ProjectRole, actorId: string): Promise<ProjectAccessAssignment> {
    const assignment = await this.findProjectAccess(orgId, projectId, userId);
    if (!assignment) throw new ForbiddenError('ASSIGNMENT_NOT_FOUND', 'Project access assignment not found');

    const beforeRole = assignment.role;
    assignment.role = newRole;
    assignment.updatedBy = actorId;
    assignment.updatedAt = new Date().toISOString();
    this.projectAccess.set(`${orgId}:${projectId}:${userId}`, assignment);

    this.appendAudit({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      projectId,
      actorUserId: actorId,
      type: 'PROJECT_ROLE_CHANGED',
      targetType: 'PROJECT_ACCESS',
      targetId: userId,
      occurredAt: new Date().toISOString(),
      before: { role: beforeRole },
      after: { role: newRole },
      metadata: {},
      source: 'TRUSTED_FUNCTION'
    });

    return assignment;
  }

  async suspendProjectAccess(orgId: string, projectId: string, userId: string, actorId: string): Promise<ProjectAccessAssignment> {
    const assignment = await this.findProjectAccess(orgId, projectId, userId);
    if (!assignment) throw new ForbiddenError('ASSIGNMENT_NOT_FOUND', 'Project access assignment not found');
    assignment.status = 'SUSPENDED';
    assignment.updatedBy = actorId;
    assignment.updatedAt = new Date().toISOString();
    this.projectAccess.set(`${orgId}:${projectId}:${userId}`, assignment);

    this.appendAudit({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      projectId,
      actorUserId: actorId,
      type: 'PROJECT_ACCESS_SUSPENDED',
      targetType: 'PROJECT_ACCESS',
      targetId: userId,
      occurredAt: new Date().toISOString(),
      metadata: {},
      source: 'TRUSTED_FUNCTION'
    });

    return assignment;
  }

  async revokeProjectAccess(orgId: string, projectId: string, userId: string, actorId: string): Promise<ProjectAccessAssignment> {
    const assignment = await this.findProjectAccess(orgId, projectId, userId);
    if (!assignment) throw new ForbiddenError('ASSIGNMENT_NOT_FOUND', 'Project access assignment not found');
    assignment.status = 'REVOKED';
    assignment.updatedBy = actorId;
    assignment.updatedAt = new Date().toISOString();
    this.projectAccess.set(`${orgId}:${projectId}:${userId}`, assignment);

    this.appendAudit({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      projectId,
      actorUserId: actorId,
      type: 'PROJECT_ACCESS_REVOKED',
      targetType: 'PROJECT_ACCESS',
      targetId: userId,
      occurredAt: new Date().toISOString(),
      metadata: {},
      source: 'TRUSTED_FUNCTION'
    });

    return assignment;
  }
}
