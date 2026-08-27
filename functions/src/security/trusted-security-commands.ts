import {
  OrganizationRole,
  ProjectRole,
  Organization,
  OrganizationMembership,
  ProjectAccessAssignment,
  AuditEvent
} from '../../src/modules/security/domain/security.types';

export interface CommandContext {
  callerUserId: string;
  isPlatformAdmin: boolean;
  requestId: string;
}

export class TrustedSecurityCommandsEngine {
  constructor(
    private readonly store: {
      getMembership: (orgId: string, userId: string) => Promise<OrganizationMembership | null>;
      getProjectAccess: (orgId: string, projectId: string, userId: string) => Promise<ProjectAccessAssignment | null>;
      saveOrganization: (org: Organization) => Promise<void>;
      saveMembership: (m: OrganizationMembership) => Promise<void>;
      saveProjectAccess: (p: ProjectAccessAssignment) => Promise<void>;
      appendAuditEvent: (e: AuditEvent) => Promise<void>;
    }
  ) {}

  async createOrganization(ctx: CommandContext, name: string, slug: string): Promise<Organization> {
    if (!ctx.callerUserId) throw new Error('Unauthenticated caller');

    const org: Organization = {
      id: `org-${Date.now()}`,
      name,
      slug: slug.toLowerCase().trim(),
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await this.store.saveOrganization(org);

    // Caller is primary ORG_OWNER
    const ownerMembership: OrganizationMembership = {
      organizationId: org.id,
      userId: ctx.callerUserId,
      role: 'ORG_OWNER',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: ctx.callerUserId,
      updatedBy: ctx.callerUserId
    };
    await this.store.saveMembership(ownerMembership);

    await this.store.appendAuditEvent({
      id: `evt-${Date.now()}`,
      organizationId: org.id,
      actorUserId: ctx.callerUserId,
      type: 'ORGANIZATION_CREATED',
      targetType: 'ORGANIZATION',
      targetId: org.id,
      occurredAt: new Date().toISOString(),
      requestId: ctx.requestId,
      metadata: { name, slug },
      source: 'TRUSTED_FUNCTION'
    });

    return org;
  }

  async addOrganizationMember(ctx: CommandContext, orgId: string, targetUserId: string, role: OrganizationRole): Promise<OrganizationMembership> {
    const callerMem = await this.store.getMembership(orgId, ctx.callerUserId);
    if (!callerMem || (!ctx.isPlatformAdmin && callerMem.role !== 'ORG_OWNER' && callerMem.role !== 'ORG_ADMIN')) {
      throw new Error('Caller lacks permission to add members to organization');
    }

    if (role === 'ORG_OWNER' && callerMem.role !== 'ORG_OWNER' && !ctx.isPlatformAdmin) {
      throw new Error('Only an ORG_OWNER or Platform Admin can assign the ORG_OWNER role');
    }

    const membership: OrganizationMembership = {
      organizationId: orgId,
      userId: targetUserId,
      role,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: ctx.callerUserId,
      updatedBy: ctx.callerUserId
    };
    await this.store.saveMembership(membership);

    await this.store.appendAuditEvent({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      actorUserId: ctx.callerUserId,
      type: 'MEMBER_ADDED',
      targetType: 'MEMBERSHIP',
      targetId: targetUserId,
      occurredAt: new Date().toISOString(),
      requestId: ctx.requestId,
      metadata: { role },
      source: 'TRUSTED_FUNCTION'
    });

    return membership;
  }

  async changeOrganizationMemberRole(ctx: CommandContext, orgId: string, targetUserId: string, newRole: OrganizationRole): Promise<OrganizationMembership> {
    const callerMem = await this.store.getMembership(orgId, ctx.callerUserId);
    if (!callerMem || (!ctx.isPlatformAdmin && callerMem.role !== 'ORG_OWNER' && callerMem.role !== 'ORG_ADMIN')) {
      throw new Error('Caller lacks permission to modify member roles');
    }

    if (ctx.callerUserId === targetUserId && callerMem.role !== 'ORG_OWNER' && newRole === 'ORG_OWNER') {
      throw new Error('Self-escalation to ORG_OWNER is prohibited');
    }

    const targetMem = await this.store.getMembership(orgId, targetUserId);
    if (!targetMem) throw new Error('Target membership does not exist');

    const beforeRole = targetMem.role;
    targetMem.role = newRole;
    targetMem.updatedAt = new Date().toISOString();
    targetMem.updatedBy = ctx.callerUserId;
    await this.store.saveMembership(targetMem);

    await this.store.appendAuditEvent({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      actorUserId: ctx.callerUserId,
      type: 'MEMBER_ROLE_CHANGED',
      targetType: 'MEMBERSHIP',
      targetId: targetUserId,
      occurredAt: new Date().toISOString(),
      requestId: ctx.requestId,
      before: { role: beforeRole },
      after: { role: newRole },
      metadata: {},
      source: 'TRUSTED_FUNCTION'
    });

    return targetMem;
  }

  async grantProjectAccess(ctx: CommandContext, orgId: string, projectId: string, targetUserId: string, role: ProjectRole): Promise<ProjectAccessAssignment> {
    const callerMem = await this.store.getMembership(orgId, ctx.callerUserId);
    if (!callerMem || (!ctx.isPlatformAdmin && callerMem.role !== 'ORG_OWNER' && callerMem.role !== 'ORG_ADMIN')) {
      throw new Error('Caller lacks permission to grant project access');
    }

    const assignment: ProjectAccessAssignment = {
      organizationId: orgId,
      projectId,
      userId: targetUserId,
      role,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: ctx.callerUserId,
      updatedBy: ctx.callerUserId
    };
    await this.store.saveProjectAccess(assignment);

    await this.store.appendAuditEvent({
      id: `evt-${Date.now()}`,
      organizationId: orgId,
      projectId,
      actorUserId: ctx.callerUserId,
      type: 'PROJECT_ACCESS_GRANTED',
      targetType: 'PROJECT_ACCESS',
      targetId: targetUserId,
      occurredAt: new Date().toISOString(),
      requestId: ctx.requestId,
      metadata: { role },
      source: 'TRUSTED_FUNCTION'
    });

    return assignment;
  }
}
