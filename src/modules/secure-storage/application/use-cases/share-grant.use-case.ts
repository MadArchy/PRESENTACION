import {
  ShareGrant,
  ShareScope
} from '../../domain/secure-storage.types';
import { ConfidentialityLevel } from '../../../data-room/domain/value-objects/confidentiality-level.vo';
import { ShareGrantRepository, StorageAuditPort } from '../../domain/ports/secure-storage.ports';
import { SecureStorageDomainError } from '../../domain/errors/secure-storage-domain.error';

export class CreateShareGrantUseCase {
  constructor(
    private readonly shareRepo: ShareGrantRepository,
    private readonly auditPort: StorageAuditPort
  ) {}

  async execute(params: {
    organizationId: string;
    projectId: string;
    granteeUserId: string;
    scope: ShareScope;
    fileIds: string[];
    confidentialityCeiling: ConfidentialityLevel;
    createdBy: string;
    expiresAt?: string;
  }): Promise<ShareGrant> {
    const grantId = `grant-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const grant: ShareGrant = {
      id: grantId,
      organizationId: params.organizationId,
      projectId: params.projectId,
      granteeUserId: params.granteeUserId,
      scope: params.scope,
      fileIds: params.fileIds,
      confidentialityCeiling: params.confidentialityCeiling,
      status: 'ACTIVE',
      startsAt: now,
      expiresAt: params.expiresAt,
      createdBy: params.createdBy,
      createdAt: now
    };

    await this.shareRepo.saveGrant(grant);

    await this.auditPort.appendStorageAuditEvent({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: params.organizationId,
      projectId: params.projectId,
      actorUserId: params.createdBy,
      type: 'SHARE_GRANT_CREATED',
      targetType: 'SHARE_GRANT',
      targetId: grantId,
      occurredAt: now,
      requestId: `req-${Date.now()}`,
      source: 'TRUSTED_FUNCTION',
      metadata: { granteeUserId: params.granteeUserId, scope: params.scope, ceiling: params.confidentialityCeiling }
    });

    return grant;
  }
}

export class RevokeShareGrantUseCase {
  constructor(
    private readonly shareRepo: ShareGrantRepository,
    private readonly auditPort: StorageAuditPort
  ) {}

  async execute(grantId: string, actorUserId: string): Promise<ShareGrant> {
    const grant = await this.shareRepo.findGrantById(grantId);
    if (!grant) {
      throw new SecureStorageDomainError(`Share grant '${grantId}' not found.`);
    }

    const now = new Date().toISOString();
    grant.status = 'REVOKED';
    grant.revokedBy = actorUserId;
    grant.revokedAt = now;

    await this.shareRepo.saveGrant(grant);

    await this.auditPort.appendStorageAuditEvent({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: grant.organizationId,
      projectId: grant.projectId,
      actorUserId,
      type: 'SHARE_GRANT_REVOKED',
      targetType: 'SHARE_GRANT',
      targetId: grantId,
      occurredAt: now,
      requestId: `req-${Date.now()}`,
      source: 'TRUSTED_FUNCTION'
    });

    return grant;
  }
}

export class ListShareGrantsUseCase {
  constructor(private readonly shareRepo: ShareGrantRepository) {}

  async execute(orgId: string, projectId: string): Promise<ShareGrant[]> {
    return this.shareRepo.listGrantsByProject(orgId, projectId);
  }
}
