import {
  UploadIntent,
  FileRecord,
  FileVersion
} from '../../domain/secure-storage.types';
import { UploadPolicy } from '../../domain/policies/upload.policy';
import {
  UploadIntentRepository,
  SecureFileRepository,
  FileVersionRepository,
  StorageAuditPort
} from '../../domain/ports/secure-storage.ports';
import { ConfidentialityLevel } from '../../../data-room/domain/value-objects/confidentiality-level.vo';
import { UploadPolicyViolationError, SecureStorageDomainError } from '../../domain/errors/secure-storage-domain.error';

export class CreateUploadIntentUseCase {
  constructor(
    private readonly intentRepo: UploadIntentRepository,
    private readonly auditPort: StorageAuditPort
  ) {}

  async execute(params: {
    organizationId: string;
    projectId: string;
    requestedBy: string;
    logicalName: string;
    originalFileName: string;
    mediaType: string;
    sizeBytes: number;
    confidentiality: ConfidentialityLevel;
    targetFileId?: string;
  }): Promise<UploadIntent> {
    const validation = UploadPolicy.validateUpload(params.mediaType, params.sizeBytes);
    if (!validation.valid) {
      throw new UploadPolicyViolationError(validation.reason || 'Invalid upload parameters.');
    }

    const intentId = `intent-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins
    const createdAt = new Date().toISOString();

    const intent: UploadIntent = {
      id: intentId,
      organizationId: params.organizationId,
      projectId: params.projectId,
      requestedBy: params.requestedBy,
      logicalName: params.logicalName,
      originalFileName: params.originalFileName,
      mediaType: params.mediaType,
      sizeBytes: params.sizeBytes,
      confidentiality: params.confidentiality,
      targetFileId: params.targetFileId,
      status: 'AUTHORIZED',
      expiresAt,
      createdAt
    };

    await this.intentRepo.saveIntent(intent);

    await this.auditPort.appendStorageAuditEvent({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: params.organizationId,
      projectId: params.projectId,
      actorUserId: params.requestedBy,
      type: 'FILE_UPLOAD_INTENT_CREATED',
      targetType: 'UPLOAD_INTENT',
      targetId: intentId,
      occurredAt: createdAt,
      requestId: `req-${Date.now()}`,
      source: 'TRUSTED_FUNCTION',
      metadata: { originalFileName: params.originalFileName, sizeBytes: params.sizeBytes }
    });

    return intent;
  }
}

export class FinalizeUploadUseCase {
  constructor(
    private readonly intentRepo: UploadIntentRepository,
    private readonly fileRepo: SecureFileRepository,
    private readonly versionRepo: FileVersionRepository,
    private readonly auditPort: StorageAuditPort
  ) {}

  async execute(params: {
    intentId: string;
    actorUserId: string;
    actualStoragePath: string;
    actualSizeBytes: number;
    sha256?: string;
  }): Promise<{ file: FileRecord; version: FileVersion }> {
    const intent = await this.intentRepo.findIntentById(params.intentId);
    if (!intent) {
      throw new SecureStorageDomainError(`Upload intent '${params.intentId}' not found.`);
    }

    if (intent.status === 'EXPIRED' || new Date(intent.expiresAt) <= new Date()) {
      intent.status = 'EXPIRED';
      await this.intentRepo.saveIntent(intent);
      throw new SecureStorageDomainError('Upload intent has expired.');
    }

    const now = new Date().toISOString();
    const fileId = intent.targetFileId || `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const versionId = `ver-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    let file = intent.targetFileId ? await this.fileRepo.findFileById(intent.organizationId, intent.projectId, fileId) : null;
    let versionNumber = 1;
    let supersedesVersionId: string | undefined;

    if (file) {
      const existingVersions = await this.versionRepo.listVersions(intent.organizationId, intent.projectId, fileId);
      versionNumber = existingVersions.length + 1;
      supersedesVersionId = file.currentVersionId;

      if (file.currentVersionId) {
        const prevVer = await this.versionRepo.findVersionById(intent.organizationId, intent.projectId, fileId, file.currentVersionId);
        if (prevVer) {
          prevVer.status = 'SUPERSEDED';
          await this.versionRepo.saveVersion(prevVer);
        }
      }

      file.sizeBytes = params.actualSizeBytes;
      file.status = 'AVAILABLE';
      file.currentVersionId = versionId;
      file.updatedAt = now;
      file.updatedBy = params.actorUserId;
    } else {
      file = {
        id: fileId,
        organizationId: intent.organizationId,
        projectId: intent.projectId,
        logicalName: intent.logicalName,
        originalFileName: intent.originalFileName,
        mediaType: intent.mediaType,
        sizeBytes: params.actualSizeBytes,
        confidentiality: intent.confidentiality,
        status: 'AVAILABLE',
        currentVersionId: versionId,
        createdAt: now,
        createdBy: params.actorUserId,
        updatedAt: now,
        updatedBy: params.actorUserId
      };
    }

    const version: FileVersion = {
      id: versionId,
      fileId,
      organizationId: intent.organizationId,
      projectId: intent.projectId,
      versionNumber,
      storagePath: params.actualStoragePath,
      originalFileName: intent.originalFileName,
      mediaType: intent.mediaType,
      sizeBytes: params.actualSizeBytes,
      sha256: params.sha256,
      status: 'AVAILABLE',
      uploadedAt: now,
      uploadedBy: params.actorUserId,
      supersedesVersionId
    };

    intent.status = 'COMPLETED';

    await this.intentRepo.saveIntent(intent);
    await this.fileRepo.saveFile(file);
    await this.versionRepo.saveVersion(version);

    await this.auditPort.appendStorageAuditEvent({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: intent.organizationId,
      projectId: intent.projectId,
      actorUserId: params.actorUserId,
      type: 'FILE_UPLOAD_COMPLETED',
      targetType: 'FILE_RECORD',
      targetId: fileId,
      occurredAt: now,
      requestId: `req-${Date.now()}`,
      source: 'TRUSTED_FUNCTION',
      metadata: { versionNumber, versionId, storagePath: params.actualStoragePath }
    });

    return { file, version };
  }
}
