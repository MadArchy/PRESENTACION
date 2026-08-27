import { ShareGrant, ShareGrantStatus, ShareScope } from '../secure-storage.types';
import { ConfidentialityLevel } from '../../../data-room/domain/value-objects/confidentiality-level.vo';
import { SecureStorageDomainError } from '../errors/secure-storage-domain.error';

export class ShareGrantEntity implements ShareGrant {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly projectId: string,
    public readonly granteeUserId: string,
    public readonly scope: ShareScope,
    public readonly fileIds: string[],
    public readonly confidentialityCeiling: ConfidentialityLevel,
    public status: ShareGrantStatus,
    public readonly startsAt: string,
    public readonly createdBy: string,
    public readonly createdAt: string,
    public readonly expiresAt?: string,
    public revokedBy?: string,
    public revokedAt?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id || !this.organizationId || !this.projectId || !this.granteeUserId) {
      throw new SecureStorageDomainError('ShareGrant requires valid IDs.');
    }
  }

  isExpired(now: Date = new Date()): boolean {
    if (!this.expiresAt) return false;
    return new Date(this.expiresAt) <= now;
  }

  isActive(now: Date = new Date()): boolean {
    if (this.status !== 'ACTIVE') return false;
    if (new Date(this.startsAt) > now) return false;
    if (this.isExpired(now)) return false;
    return true;
  }

  revoke(actorId: string, now: string = new Date().toISOString()): void {
    this.status = 'REVOKED';
    this.revokedBy = actorId;
    this.revokedAt = now;
  }
}
