import {
  OrganizationMembership,
  OrganizationRole,
  MembershipStatus
} from '../security.types';
import { OrganizationRoleVo } from '../value-objects/organization-role.vo';
import { SecurityDomainError } from '../errors/security-domain.error';

export class OrganizationMembershipEntity {
  private readonly organizationId: string;
  private readonly userId: string;
  private role: OrganizationRoleVo;
  private status: MembershipStatus;
  private readonly createdAt: string;
  private updatedAt: string;
  private readonly createdBy: string;
  private updatedBy: string;

  constructor(data: OrganizationMembership) {
    if (!data.organizationId || !data.userId) {
      throw new SecurityDomainError('organizationId and userId are required in OrganizationMembership');
    }
    this.organizationId = data.organizationId.trim();
    this.userId = data.userId.trim();
    this.role = new OrganizationRoleVo(data.role);
    this.status = data.status || 'ACTIVE';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.createdBy = data.createdBy || 'SYSTEM';
    this.updatedBy = data.updatedBy || 'SYSTEM';
  }

  getOrganizationId(): string { return this.organizationId; }
  getUserId(): string { return this.userId; }
  getRole(): OrganizationRole { return this.role.getValue(); }
  getStatus(): MembershipStatus { return this.status; }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }
  getCreatedBy(): string { return this.createdBy; }
  getUpdatedBy(): string { return this.updatedBy; }
  isActive(): boolean { return this.status === 'ACTIVE'; }

  changeRole(newRole: OrganizationRole, actorId: string): void {
    this.role = new OrganizationRoleVo(newRole);
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

  toJSON(): OrganizationMembership {
    return {
      organizationId: this.organizationId,
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
