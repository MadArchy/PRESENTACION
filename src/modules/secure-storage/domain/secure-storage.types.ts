import { ConfidentialityLevel } from '../../data-room/domain/value-objects/confidentiality-level.vo';
import { Permission } from '../../security/domain/security.types';

export type FileStatus =
  | 'PENDING_UPLOAD'
  | 'UPLOADING'
  | 'AVAILABLE'
  | 'QUARANTINED'
  | 'REJECTED'
  | 'SUPERSEDED'
  | 'DELETED';

export type FileVersionStatus =
  | 'PENDING'
  | 'AVAILABLE'
  | 'QUARANTINED'
  | 'REJECTED'
  | 'SUPERSEDED'
  | 'DELETED';

export type UploadIntentStatus =
  | 'CREATED'
  | 'AUTHORIZED'
  | 'UPLOADING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED';

export type ShareScope = 'PROJECT_DATA_ROOM' | 'SELECTED_FILES';

export type ShareGrantStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED';

export type StorageAuthorizationReasonCode =
  | 'ALLOW'
  | 'UNAUTHENTICATED'
  | 'USER_INACTIVE'
  | 'ORGANIZATION_MISMATCH'
  | 'PROJECT_MISMATCH'
  | 'MEMBERSHIP_INACTIVE'
  | 'PROJECT_ACCESS_INACTIVE'
  | 'FILE_NOT_FOUND'
  | 'FILE_NOT_AVAILABLE'
  | 'FILE_QUARANTINED'
  | 'FILE_DELETED'
  | 'PERMISSION_MISSING'
  | 'CONFIDENTIALITY_PERMISSION_MISSING'
  | 'SHARE_GRANT_MISSING'
  | 'SHARE_GRANT_EXPIRED'
  | 'SHARE_GRANT_REVOKED'
  | 'SHARE_SCOPE_MISMATCH'
  | 'SHARE_CONFIDENTIALITY_EXCEEDED'
  | 'VERSION_NOT_FOUND'
  | 'VERSION_NOT_AVAILABLE'
  | 'UPLOAD_POLICY_REJECTED';

export type StorageAuditEventType =
  | 'FILE_UPLOAD_INTENT_CREATED'
  | 'FILE_UPLOAD_COMPLETED'
  | 'FILE_UPLOAD_FAILED'
  | 'FILE_VERSION_CREATED'
  | 'FILE_VERSION_SUPERSEDED'
  | 'FILE_QUARANTINED'
  | 'FILE_RESTORED'
  | 'FILE_DELETE_REQUESTED'
  | 'FILE_DELETED'
  | 'FILE_DOWNLOAD_AUTHORIZED'
  | 'FILE_DOWNLOAD_DENIED'
  | 'SHARE_GRANT_CREATED'
  | 'SHARE_GRANT_REVOKED';

export interface FileRecord {
  id: string;
  organizationId: string;
  projectId: string;
  dataRoomDocumentId?: string;
  logicalName: string;
  originalFileName: string;
  mediaType: string;
  extension?: string;
  sizeBytes: number;
  confidentiality: ConfidentialityLevel;
  status: FileStatus;
  currentVersionId?: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface FileVersion {
  id: string;
  fileId: string;
  organizationId: string;
  projectId: string;
  versionNumber: number;
  storagePath: string;
  originalFileName: string;
  mediaType: string;
  sizeBytes: number;
  sha256?: string;
  status: FileVersionStatus;
  uploadedAt: string;
  uploadedBy: string;
  supersedesVersionId?: string;
}

export interface UploadIntent {
  id: string;
  organizationId: string;
  projectId: string;
  requestedBy: string;
  logicalName: string;
  originalFileName: string;
  mediaType: string;
  sizeBytes: number;
  confidentiality: ConfidentialityLevel;
  targetFileId?: string;
  status: UploadIntentStatus;
  expiresAt: string;
  createdAt: string;
}

export interface ShareGrant {
  id: string;
  organizationId: string;
  projectId: string;
  granteeUserId: string;
  scope: ShareScope;
  fileIds: string[];
  confidentialityCeiling: ConfidentialityLevel;
  status: ShareGrantStatus;
  startsAt: string;
  expiresAt?: string;
  createdBy: string;
  createdAt: string;
  revokedBy?: string;
  revokedAt?: string;
}

export interface StorageSecurityEnvelope {
  organizationId: string;
  projectId: string;
  fileId?: string;
  versionId?: string;
  confidentiality?: ConfidentialityLevel;
}

export interface StorageAuthorizationDecision {
  allowed: boolean;
  reasonCode: StorageAuthorizationReasonCode;
  requiredPermission?: Permission;
  organizationId: string;
  projectId: string;
  fileId?: string;
  shareGrantId?: string;
  policyVersion: string;
  message?: string;
}

export interface StorageAuditEvent {
  id: string;
  organizationId: string;
  projectId?: string;
  actorUserId: string;
  type: StorageAuditEventType;
  targetType: 'FILE_RECORD' | 'FILE_VERSION' | 'UPLOAD_INTENT' | 'SHARE_GRANT';
  targetId: string;
  occurredAt: string;
  requestId: string;
  metadata?: Record<string, unknown>;
  source: 'TRUSTED_FUNCTION' | 'CLIENT_ADAPTER';
}
