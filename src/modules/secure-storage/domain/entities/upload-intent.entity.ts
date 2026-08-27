import { UploadIntent, UploadIntentStatus } from '../secure-storage.types';
import { ConfidentialityLevel } from '../../../data-room/domain/value-objects/confidentiality-level.vo';
import { SecureStorageDomainError } from '../errors/secure-storage-domain.error';

export class UploadIntentEntity implements UploadIntent {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly projectId: string,
    public readonly requestedBy: string,
    public readonly logicalName: string,
    public readonly originalFileName: string,
    public readonly mediaType: string,
    public readonly sizeBytes: number,
    public readonly confidentiality: ConfidentialityLevel,
    public status: UploadIntentStatus,
    public readonly expiresAt: string,
    public readonly createdAt: string,
    public readonly targetFileId?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id || !this.organizationId || !this.projectId || !this.requestedBy) {
      throw new SecureStorageDomainError('UploadIntent requires valid identifiers and requester.');
    }
  }

  isExpired(now: Date = new Date()): boolean {
    return new Date(this.expiresAt) <= now;
  }

  markCompleted(): void {
    this.status = 'COMPLETED';
  }

  markFailed(): void {
    this.status = 'FAILED';
  }

  markCancelled(): void {
    this.status = 'CANCELLED';
  }
}
