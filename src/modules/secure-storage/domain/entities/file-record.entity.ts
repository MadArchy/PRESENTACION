import { FileRecord, FileStatus } from '../secure-storage.types';
import { ConfidentialityLevel } from '../../../data-room/domain/value-objects/confidentiality-level.vo';
import { SecureStorageDomainError } from '../errors/secure-storage-domain.error';

export class FileRecordEntity implements FileRecord {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly projectId: string,
    public logicalName: string,
    public originalFileName: string,
    public mediaType: string,
    public sizeBytes: number,
    public confidentiality: ConfidentialityLevel,
    public status: FileStatus,
    public readonly createdAt: string,
    public readonly createdBy: string,
    public updatedAt: string,
    public updatedBy: string,
    public dataRoomDocumentId?: string,
    public extension?: string,
    public currentVersionId?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id || !this.organizationId || !this.projectId) {
      throw new SecureStorageDomainError('FileRecord requires valid id, organizationId, and projectId.');
    }
    if (!this.logicalName || !this.originalFileName) {
      throw new SecureStorageDomainError('FileRecord requires logicalName and originalFileName.');
    }
    if (this.sizeBytes < 0) {
      throw new SecureStorageDomainError('File size cannot be negative.');
    }
  }

  markAvailable(versionId: string, updatedBy: string, now: string = new Date().toISOString()): void {
    this.status = 'AVAILABLE';
    this.currentVersionId = versionId;
    this.updatedBy = updatedBy;
    this.updatedAt = now;
  }

  quarantine(actorId: string, now: string = new Date().toISOString()): void {
    this.status = 'QUARANTINED';
    this.updatedBy = actorId;
    this.updatedAt = now;
  }

  restore(actorId: string, now: string = new Date().toISOString()): void {
    if (this.status !== 'QUARANTINED') {
      throw new SecureStorageDomainError('Only quarantined files can be restored.');
    }
    this.status = 'AVAILABLE';
    this.updatedBy = actorId;
    this.updatedAt = now;
  }

  markDeleted(actorId: string, now: string = new Date().toISOString()): void {
    this.status = 'DELETED';
    this.updatedBy = actorId;
    this.updatedAt = now;
  }
}
