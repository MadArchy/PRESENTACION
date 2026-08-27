import {
  ProjectAccessAssignment,
  ProjectRole,
  AccessAssignmentStatus
} from '../security.types';
import { ProjectRoleVo } from '../value-objects/organization-role.vo';
import { SecurityDomainError } from '../errors/security-domain.error';

export class ProjectAccessAssignmentEntity {
  private readonly organizationId: string;
  private readonly projectId: string;
  private readonly userId: string;
  private role: ProjectRoleVo;
  private status: AccessAssignmentStatus;
  private readonly createdAt: string;
  private updatedAt: string;
  private readonly createdBy: string;
  private updatedBy: string;

  constructor(data: ProjectAccessAssignment) {
    if (!data.organizationId || !data.projectId || !data.userId) {
      throw new SecurityDomainError('organizationId, projectId, and userId are required in ProjectAccessAssignment');
    }
    this.organizationId = data.organizationId.trim();
    this.projectId = data.projectId.trim();
    this.userId = data.userId.trim();
    this.role = new ProjectRoleVo(data.role);
    this.status = data.status || 'ACTIVE';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.createdBy = data.createdBy || 'SYSTEM';
    this.updatedBy = data.updatedBy || 'SYSTEM';
  }

  getOrganizationId(): string { return this.organizationId; }
  getProjectId(): string { return this.projectId; }
  getUserId(): string { return this.userId; }
  getRole(): ProjectRole { return this.role.getValue(); }
  getStatus(): AccessAssignmentStatus { return this.status; }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }
  getCreatedBy(): string { return this.createdBy; }
  getUpdatedBy(): string { return this.updatedBy; }
  isActive(): boolean { return this.status === 'ACTIVE'; }

  changeRole(newRole: ProjectRole, actorId: string): void {
    this.role = new ProjectRoleVo(newRole);
    this.updatedBy = actorId;
    this.updatedAt = new Date().toISOString();
  }

  suspend(actorId: string): void {
    this.status = 'SUSPENDED';
    this.updatedBy = actorId;
    this.updatedAt = new Date().toISOString();
  }

  revoke(actorId: string): void {
    this.status = 'REVOKED';
    this.updatedBy = actorId;
    this.updatedAt = new Date().toISOString();
  }

  toJSON(): ProjectAccessAssignment {
    return {
      organizationId: this.organizationId,
      projectId: this.projectId,
      userId: this.userId,
      role: this.getRole(),
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy
    };
  }
}
