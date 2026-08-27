import { FileRecord } from '../../domain/secure-storage.types';
import {
  SecureFileRepository,
  FileVersionRepository,
  StorageAuditPort,
  SecureBinaryStoragePort
} from '../../domain/ports/secure-storage.ports';
import { FileNotFoundDomainError, SecureStorageDomainError } from '../../domain/errors/secure-storage-domain.error';

export class QuarantineFileUseCase {
  constructor(
    private readonly fileRepo: SecureFileRepository,
    private readonly auditPort: StorageAuditPort
  ) {}

  async execute(orgId: string, projectId: string, fileId: string, actorUserId: string): Promise<FileRecord> {
    const file = await this.fileRepo.findFileById(orgId, projectId, fileId);
    if (!file) throw new FileNotFoundDomainError(fileId);

    const now = new Date().toISOString();
    file.status = 'QUARANTINED';
    file.updatedAt = now;
    file.updatedBy = actorUserId;

    await this.fileRepo.saveFile(file);

    await this.auditPort.appendStorageAuditEvent({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: orgId,
      projectId,
      actorUserId,
      type: 'FILE_QUARANTINED',
      targetType: 'FILE_RECORD',
      targetId: fileId,
      occurredAt: now,
      requestId: `req-${Date.now()}`,
      source: 'TRUSTED_FUNCTION'
    });

    return file;
  }
}

export class RestoreQuarantinedFileUseCase {
  constructor(
    private readonly fileRepo: SecureFileRepository,
    private readonly auditPort: StorageAuditPort
  ) {}

  async execute(orgId: string, projectId: string, fileId: string, actorUserId: string): Promise<FileRecord> {
    const file = await this.fileRepo.findFileById(orgId, projectId, fileId);
    if (!file) throw new FileNotFoundDomainError(fileId);
    if (file.status !== 'QUARANTINED') {
      throw new SecureStorageDomainError('Only quarantined files can be restored.');
    }

    const now = new Date().toISOString();
    file.status = 'AVAILABLE';
    file.updatedAt = now;
    file.updatedBy = actorUserId;

    await this.fileRepo.saveFile(file);

    await this.auditPort.appendStorageAuditEvent({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: orgId,
      projectId,
      actorUserId,
      type: 'FILE_RESTORED',
      targetType: 'FILE_RECORD',
      targetId: fileId,
      occurredAt: now,
      requestId: `req-${Date.now()}`,
      source: 'TRUSTED_FUNCTION'
    });

    return file;
  }
}

export class DeleteSecureFileUseCase {
  constructor(
    private readonly fileRepo: SecureFileRepository,
    private readonly versionRepo: FileVersionRepository,
    private readonly binaryStoragePort: SecureBinaryStoragePort,
    private readonly auditPort: StorageAuditPort
  ) {}

  async execute(orgId: string, projectId: string, fileId: string, actorUserId: string): Promise<FileRecord> {
    const file = await this.fileRepo.findFileById(orgId, projectId, fileId);
    if (!file) throw new FileNotFoundDomainError(fileId);

    const now = new Date().toISOString();
    file.status = 'DELETED';
    file.updatedAt = now;
    file.updatedBy = actorUserId;

    await this.fileRepo.saveFile(file);

    const versions = await this.versionRepo.listVersions(orgId, projectId, fileId);
    for (const v of versions) {
      v.status = 'DELETED';
      await this.versionRepo.saveVersion(v);
      try {
        await this.binaryStoragePort.deleteObject(v.storagePath);
      } catch {
        // ignore object deletion error if already deleted
      }
    }

    await this.auditPort.appendStorageAuditEvent({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: orgId,
      projectId,
      actorUserId,
      type: 'FILE_DELETED',
      targetType: 'FILE_RECORD',
      targetId: fileId,
      occurredAt: now,
      requestId: `req-${Date.now()}`,
      source: 'TRUSTED_FUNCTION'
    });

    return file;
  }
}

export class ListSecureFilesUseCase {
  constructor(private readonly fileRepo: SecureFileRepository) {}

  async execute(orgId: string, projectId: string): Promise<FileRecord[]> {
    return this.fileRepo.listFiles(orgId, projectId);
  }
}

export class GetSecureFileUseCase {
  constructor(private readonly fileRepo: SecureFileRepository) {}

  async execute(orgId: string, projectId: string, fileId: string): Promise<FileRecord | null> {
    return this.fileRepo.findFileById(orgId, projectId, fileId);
  }
}
