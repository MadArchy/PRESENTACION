import {
  FileRecord,
  FileVersion,
  ShareGrant,
  StorageAuthorizationDecision
} from '../../domain/secure-storage.types';
import { SecurityContext } from '../../../security/domain/security.types';
import { StorageAuthorizationService } from '../../domain/services/storage-authorization.service';
import {
  SecureFileRepository,
  FileVersionRepository,
  ShareGrantRepository,
  SecureBinaryStoragePort,
  StorageAuditPort
} from '../../domain/ports/secure-storage.ports';
import { StorageUnauthorizedError } from '../../domain/errors/secure-storage-domain.error';

export class AuthorizeFileDownloadUseCase {
  constructor(
    private readonly fileRepo: SecureFileRepository,
    private readonly versionRepo: FileVersionRepository,
    private readonly shareRepo: ShareGrantRepository,
    private readonly authService = new StorageAuthorizationService()
  ) {}

  async execute(params: {
    context: SecurityContext;
    organizationId: string;
    projectId: string;
    fileId: string;
    versionId?: string;
    shareGrantId?: string;
  }): Promise<{ decision: StorageAuthorizationDecision; file?: FileRecord; version?: FileVersion }> {
    const file = (await this.fileRepo.findFileById(params.organizationId, params.projectId, params.fileId)) || undefined;
    let version: FileVersion | undefined;

    if (file) {
      const targetVersionId = params.versionId || file.currentVersionId;
      if (targetVersionId) {
        version = (await this.versionRepo.findVersionById(params.organizationId, params.projectId, params.fileId, targetVersionId)) || undefined;
      }
    }

    let shareGrant: ShareGrant | undefined;
    if (params.shareGrantId) {
      shareGrant = (await this.shareRepo.findGrantById(params.shareGrantId)) || undefined;
    } else if (params.context.projectAccess && params.context.projectAccess.role === 'EXTERNAL_REVIEWER') {
      const grants = await this.shareRepo.listGrantsByGrantee(params.context.identity.userId);
      shareGrant = grants.find(g => g.projectId === params.projectId && g.organizationId === params.organizationId && g.status === 'ACTIVE');
    }

    const decision = this.authService.authorize({
      context: params.context,
      file,
      version,
      shareGrant,
      operation: 'READ',
      organizationId: params.organizationId,
      projectId: params.projectId
    });

    return { decision, file, version };
  }
}

export class DownloadSecureFileUseCase {
  constructor(
    private readonly authorizeDownloadUseCase: AuthorizeFileDownloadUseCase,
    private readonly binaryStoragePort: SecureBinaryStoragePort,
    private readonly auditPort: StorageAuditPort
  ) {}

  async execute(params: {
    context: SecurityContext;
    organizationId: string;
    projectId: string;
    fileId: string;
    versionId?: string;
    shareGrantId?: string;
  }): Promise<{ data: Uint8Array | Blob | string; fileName: string; mediaType: string }> {
    const { decision, file, version } = await this.authorizeDownloadUseCase.execute(params);

    const now = new Date().toISOString();

    if (!decision.allowed || !file || !version) {
      await this.auditPort.appendStorageAuditEvent({
        id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        organizationId: params.organizationId,
        projectId: params.projectId,
        actorUserId: params.context?.identity?.userId || 'anonymous',
        type: 'FILE_DOWNLOAD_DENIED',
        targetType: 'FILE_RECORD',
        targetId: params.fileId,
        occurredAt: now,
        requestId: `req-${Date.now()}`,
        source: 'TRUSTED_FUNCTION',
        metadata: { reasonCode: decision.reasonCode }
      });

      throw new StorageUnauthorizedError(
        decision.message || 'Descarga denegada por política de seguridad.',
        decision.reasonCode
      );
    }

    await this.auditPort.appendStorageAuditEvent({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: params.organizationId,
      projectId: params.projectId,
      actorUserId: params.context.identity.userId,
      type: 'FILE_DOWNLOAD_AUTHORIZED',
      targetType: 'FILE_RECORD',
      targetId: params.fileId,
      occurredAt: now,
      requestId: `req-${Date.now()}`,
      source: 'TRUSTED_FUNCTION',
      metadata: { versionId: version.id, storagePath: version.storagePath }
    });

    const data = await this.binaryStoragePort.downloadObject(version.storagePath);
    return {
      data,
      fileName: version.originalFileName,
      mediaType: version.mediaType
    };
  }
}
