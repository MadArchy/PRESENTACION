import { UserProfile, UserStatus } from '../security.types';
import { UserStatusVo } from '../value-objects/organization-role.vo';
import { SecurityDomainError } from '../errors/security-domain.error';

export class UserProfileEntity {
  private readonly userId: string;
  private displayName: string;
  private readonly primaryEmail?: string;
  private status: UserStatusVo;
  private readonly createdAt: string;
  private updatedAt: string;

  constructor(data: UserProfile) {
    if (!data.userId || data.userId.trim().length === 0) {
      throw new SecurityDomainError('userId cannot be empty in UserProfile');
    }
    this.userId = data.userId.trim();
    this.displayName = data.displayName?.trim() || 'User';
    this.primaryEmail = data.primaryEmail ? data.primaryEmail.trim().toLowerCase() : undefined;
    this.status = new UserStatusVo(data.status);
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  getUserId(): string { return this.userId; }
  getDisplayName(): string { return this.displayName; }
  getPrimaryEmail(): string | undefined { return this.primaryEmail; }
  getStatus(): UserStatus { return this.status.getValue(); }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }
  isActive(): boolean { return this.status.isActive(); }

  suspend(): void {
    this.status = new UserStatusVo('SUSPENDED');
    this.updatedAt = new Date().toISOString();
  }

  activate(): void {
    this.status = new UserStatusVo('ACTIVE');
    this.updatedAt = new Date().toISOString();
  }

  toJSON(): UserProfile {
    return {
      userId: this.userId,
      displayName: this.displayName,
      primaryEmail: this.primaryEmail,
      status: this.getStatus(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
