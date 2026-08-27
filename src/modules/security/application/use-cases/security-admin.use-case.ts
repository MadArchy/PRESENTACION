import { SecurityAdministrationPort, AuditLogRepository } from '../../domain/ports/user-profile-repository.port';
import {
  Organization,
  OrganizationMembership,
  ProjectAccessAssignment,
  AuditEvent,
  OrganizationRole,
  ProjectRole
} from '../../domain/security.types';

export class SecurityAdminUseCase {
  constructor(private readonly adminPort: SecurityAdministrationPort) {}

  async createOrganization(name: string, slug: string, actorId: string): Promise<Organization> {
    return this.adminPort.createOrganization(name, slug, actorId);
  }

  async addMember(orgId: string, email: string, role: OrganizationRole, actorId: string): Promise<OrganizationMembership> {
    return this.adminPort.addOrganizationMember(orgId, email, role, actorId);
  }

  async changeMemberRole(orgId: string, userId: string, role: OrganizationRole, actorId: string): Promise<OrganizationMembership> {
    return this.adminPort.changeOrganizationMemberRole(orgId, userId, role, actorId);
  }

  async suspendMember(orgId: string, userId: string, actorId: string): Promise<OrganizationMembership> {
    return this.adminPort.suspendOrganizationMember(orgId, userId, actorId);
  }

  async grantProjectAccess(orgId: string, projectId: string, userId: string, role: ProjectRole, actorId: string): Promise<ProjectAccessAssignment> {
    return this.adminPort.grantProjectAccess(orgId, projectId, userId, role, actorId);
  }

  async changeProjectRole(orgId: string, projectId: string, userId: string, role: ProjectRole, actorId: string): Promise<ProjectAccessAssignment> {
    return this.adminPort.changeProjectRole(orgId, projectId, userId, role, actorId);
  }

  async revokeProjectAccess(orgId: string, projectId: string, userId: string, actorId: string): Promise<ProjectAccessAssignment> {
    return this.adminPort.revokeProjectAccess(orgId, projectId, userId, actorId);
  }
}

export class ListAuditEventsUseCase {
  constructor(private readonly auditRepository: AuditLogRepository) {}

  async execute(orgId: string, projectId?: string): Promise<AuditEvent[]> {
    if (projectId) {
      return this.auditRepository.listAuditByProject(orgId, projectId);
    }
    return this.auditRepository.listAuditByOrg(orgId);
  }
}
