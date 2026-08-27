import { FileVersion, FileVersionStatus } from '../secure-storage.types';
import { SecureStorageDomainError } from '../errors/secure-storage-domain.error';

export class FileVersionEntity implements FileVersion {
  constructor(
    public readonly id: string,
    public readonly fileId: string,
    public readonly organizationId: string,
    public readonly projectId: string,
    public readonly versionNumber: number,
    public readonly storagePath: string,
    public readonly originalFileName: string,
    public readonly mediaType: string,
    public readonly sizeBytes: number,
    public status: FileVersionStatus,
    public readonly uploadedAt: string,
    public readonly uploadedBy: string,
    public readonly sha256?: string,
    public readonly supersedesVersionId?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id || !this.fileId || !this.organizationId || !this.projectId) {
      throw new SecureStorageDomainError('FileVersion requires valid id, fileId, organizationId, and projectId.');
    }
    if (this.versionNumber < 1) {
      throw new SecureStorageDomainError('Version number must be at least 1.');
    }
    if (!this.storagePath) {
      throw new SecureStorageDomainError('Storage path cannot be empty.');
    }
  }

  markAvailable(): void {
    this.status = 'AVAILABLE';
  }

  supersede(): void {
    this.status = 'SUPERSEDED';
  }

  quarantine(): void {
    this.status = 'QUARANTINED';
  }

  markDeleted(): void {
    this.status = 'DELETED';
  }
}
