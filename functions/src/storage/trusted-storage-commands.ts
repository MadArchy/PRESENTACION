import {
  FileRecord,
  FileVersion,
  UploadIntent,
  ShareGrant,
  StorageAuditEvent,
  ShareScope
} from '../../src/modules/secure-storage/domain/secure-storage.types';
import { ConfidentialityLevel } from '../../src/modules/data-room/domain/value-objects/confidentiality-level.vo';
import { SecureStoragePolicy } from '../../src/modules/secure-storage/domain/policies/secure-storage.policy';

export interface CallerSecurityContext {
  userId: string;
  platformRole?: string;
  organizationId: string;
  orgRole: string;
  projectId?: string;
  projectRole?: string;
  status: string;
}

export class TrustedStorageCommandsEngine {
  constructor(
    private readonly secureStore: any,
    private readonly binaryStorage: any
  ) {}

  async finalizeUpload(
    caller: CallerSecurityContext,
    intentId: string,
    actualStoragePath: string,
    actualSizeBytes: number,
    sha256?: string
  ): Promise<{ file: FileRecord; version: FileVersion }> {
    this.verifyActiveCaller(caller);

    const intent: UploadIntent | null = await this.secureStore.findIntentById(intentId);
    if (!intent) throw new Error(`UploadIntent '${intentId}' not found.`);
    if (intent.organizationId !== caller.organizationId) throw new Error('Cross-organization upload finalization is prohibited.');

    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (!['PROJECT_ADMIN', 'PROJECT_EDITOR'].includes(caller.projectRole || '')) {
        throw new Error('Caller lacks permission to finalize upload.');
      }
    }

    const now = new Date().toISOString();
    const fileId = intent.targetFileId || `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const versionId = `ver-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    let file = intent.targetFileId ? await this.secureStore.findFileById(intent.organizationId, intent.projectId, fileId) : null;
    let versionNumber = 1;
    let supersedesVersionId: string | undefined;

    if (file) {
      const existingVersions = await this.secureStore.listVersions(intent.organizationId, intent.projectId, fileId);
      versionNumber = existingVersions.length + 1;
      supersedesVersionId = file.currentVersionId;

      file.sizeBytes = actualSizeBytes;
      file.status = 'AVAILABLE';
      file.currentVersionId = versionId;
      file.updatedAt = now;
      file.updatedBy = caller.userId;
    } else {
      file = {
        id: fileId,
        organizationId: intent.organizationId,
        projectId: intent.projectId,
        logicalName: intent.logicalName,
        originalFileName: intent.originalFileName,
        mediaType: intent.mediaType,
        sizeBytes: actualSizeBytes,
        confidentiality: intent.confidentiality,
        status: 'AVAILABLE',
        currentVersionId: versionId,
        createdAt: now,
        createdBy: caller.userId,
        updatedAt: now,
        updatedBy: caller.userId
      };
    }

    const version: FileVersion = {
      id: versionId,
      fileId,
      organizationId: intent.organizationId,
      projectId: intent.projectId,
      versionNumber,
      storagePath: actualStoragePath,
      originalFileName: intent.originalFileName,
      mediaType: intent.mediaType,
      sizeBytes: actualSizeBytes,
      sha256,
      status: 'AVAILABLE',
      uploadedAt: now,
      uploadedBy: caller.userId,
      supersedesVersionId
    };

    intent.status = 'COMPLETED';
    await this.secureStore.saveIntent(intent);
    await this.secureStore.saveFile(file);
    await this.secureStore.saveVersion(version);

    await this.emitAudit(caller, 'FILE_UPLOAD_COMPLETED', 'FILE_RECORD', fileId, { versionNumber, versionId, actualStoragePath });

    return { file, version };
  }

  async createShareGrant(
    caller: CallerSecurityContext,
    params: {
      projectId: string;
      granteeUserId: string;
      scope: ShareScope;
      fileIds: string[];
      confidentialityCeiling: ConfidentialityLevel;
      expiresAt?: string;
    }
  ): Promise<ShareGrant> {
    this.verifyActiveCaller(caller);

    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks permission to create ShareGrants.');
      }
    }

    const grantId = `grant-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const grant: ShareGrant = {
      id: grantId,
      organizationId: caller.organizationId,
      projectId: params.projectId,
      granteeUserId: params.granteeUserId,
      scope: params.scope,
      fileIds: params.fileIds,
      confidentialityCeiling: params.confidentialityCeiling,
      status: 'ACTIVE',
      startsAt: now,
      expiresAt: params.expiresAt,
      createdBy: caller.userId,
      createdAt: now
    };

    await this.secureStore.saveGrant(grant);
    await this.emitAudit(caller, 'SHARE_GRANT_CREATED', 'SHARE_GRANT', grantId, {
      granteeUserId: params.granteeUserId,
      scope: params.scope,
      ceiling: params.confidentialityCeiling
    });

    return grant;
  }

  async revokeShareGrant(caller: CallerSecurityContext, grantId: string): Promise<ShareGrant> {
    this.verifyActiveCaller(caller);

    const grant: ShareGrant | null = await this.secureStore.findGrantById(grantId);
    if (!grant) throw new Error(`ShareGrant '${grantId}' not found.`);
    if (grant.organizationId !== caller.organizationId) throw new Error('Cross-organization share revocation is prohibited.');

    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks permission to revoke ShareGrants.');
      }
    }

    const now = new Date().toISOString();
    grant.status = 'REVOKED';
    grant.revokedBy = caller.userId;
    grant.revokedAt = now;

    await this.secureStore.saveGrant(grant);
    await this.emitAudit(caller, 'SHARE_GRANT_REVOKED', 'SHARE_GRANT', grantId);

    return grant;
  }

  async quarantineFile(caller: CallerSecurityContext, projectId: string, fileId: string): Promise<FileRecord> {
    this.verifyActiveCaller(caller);

    const file: FileRecord | null = await this.secureStore.findFileById(caller.organizationId, projectId, fileId);
    if (!file) throw new Error(`File '${fileId}' not found.`);

    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks permission to quarantine files.');
      }
    }

    const now = new Date().toISOString();
    file.status = 'QUARANTINED';
    file.updatedAt = now;
    file.updatedBy = caller.userId;

    await this.secureStore.saveFile(file);
    await this.emitAudit(caller, 'FILE_QUARANTINED', 'FILE_RECORD', fileId);

    return file;
  }

  async restoreQuarantinedFile(caller: CallerSecurityContext, projectId: string, fileId: string): Promise<FileRecord> {
    this.verifyActiveCaller(caller);

    const file: FileRecord | null = await this.secureStore.findFileById(caller.organizationId, projectId, fileId);
    if (!file) throw new Error(`File '${fileId}' not found.`);
    if (file.status !== 'QUARANTINED') throw new Error('Only quarantined files can be restored.');

    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks permission to restore quarantined files.');
      }
    }

    const now = new Date().toISOString();
    file.status = 'AVAILABLE';
    file.updatedAt = now;
    file.updatedBy = caller.userId;

    await this.secureStore.saveFile(file);
    await this.emitAudit(caller, 'FILE_RESTORED', 'FILE_RECORD', fileId);

    return file;
  }

  async requestFileDeletion(caller: CallerSecurityContext, projectId: string, fileId: string): Promise<FileRecord> {
    this.verifyActiveCaller(caller);

    const file: FileRecord | null = await this.secureStore.findFileById(caller.organizationId, projectId, fileId);
    if (!file) throw new Error(`File '${fileId}' not found.`);

    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (!['PROJECT_ADMIN', 'PROJECT_EDITOR'].includes(caller.projectRole || '')) {
        throw new Error('Caller lacks permission to request file deletion.');
      }
    }

    await this.emitAudit(caller, 'FILE_DELETE_REQUESTED', 'FILE_RECORD', fileId);
    return file;
  }

  async deleteSecureFile(caller: CallerSecurityContext, projectId: string, fileId: string): Promise<FileRecord> {
    this.verifyActiveCaller(caller);

    const file: FileRecord | null = await this.secureStore.findFileById(caller.organizationId, projectId, fileId);
    if (!file) throw new Error(`File '${fileId}' not found.`);

    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks permission to delete secure files.');
      }
    }

    const now = new Date().toISOString();
    file.status = 'DELETED';
    file.updatedAt = now;
    file.updatedBy = caller.userId;

    await this.secureStore.saveFile(file);
    await this.emitAudit(caller, 'FILE_DELETED', 'FILE_RECORD', fileId);

    return file;
  }

  private verifyActiveCaller(caller: CallerSecurityContext): void {
    if (!caller || !caller.userId) {
      throw new Error('Unauthorized: Missing caller identity.');
    }
    if (caller.status !== 'ACTIVE') {
      throw new Error('Forbidden: Caller account is suspended or inactive.');
    }
  }

  private async emitAudit(
    caller: CallerSecurityContext,
    type: any,
    targetType: any,
    targetId: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const event: StorageAuditEvent = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: caller.organizationId,
      projectId: caller.projectId,
      actorUserId: caller.userId,
      type,
      targetType,
      targetId,
      occurredAt: new Date().toISOString(),
      requestId: `req-${Date.now()}`,
      source: 'TRUSTED_FUNCTION',
      metadata
    };
    await this.secureStore.appendStorageAuditEvent(event);
  }
}
