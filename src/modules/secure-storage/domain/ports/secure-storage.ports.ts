import {
  FileRecord,
  FileVersion,
  UploadIntent,
  ShareGrant,
  StorageAuditEvent
} from '../secure-storage.types';

export interface SecureFileRepository {
  findFileById(orgId: string, projectId: string, fileId: string): Promise<FileRecord | null>;
  findFileByDataRoomDocId(orgId: string, projectId: string, docId: string): Promise<FileRecord | null>;
  listFiles(orgId: string, projectId: string): Promise<FileRecord[]>;
  saveFile(file: FileRecord): Promise<void>;
  deleteFile(orgId: string, projectId: string, fileId: string): Promise<void>;
}

export interface FileVersionRepository {
  findVersionById(orgId: string, projectId: string, fileId: string, versionId: string): Promise<FileVersion | null>;
  listVersions(orgId: string, projectId: string, fileId: string): Promise<FileVersion[]>;
  saveVersion(version: FileVersion): Promise<void>;
}

export interface UploadIntentRepository {
  findIntentById(intentId: string): Promise<UploadIntent | null>;
  saveIntent(intent: UploadIntent): Promise<void>;
}

export interface ShareGrantRepository {
  findGrantById(grantId: string): Promise<ShareGrant | null>;
  listGrantsByProject(orgId: string, projectId: string): Promise<ShareGrant[]>;
  listGrantsByGrantee(granteeUserId: string): Promise<ShareGrant[]>;
  saveGrant(grant: ShareGrant): Promise<void>;
}

export interface SecureBinaryStoragePort {
  uploadObject(storagePath: string, data: Uint8Array | Blob | string, contentType: string): Promise<{ storagePath: string; sizeBytes: number; sha256?: string }>;
  downloadObject(storagePath: string): Promise<Uint8Array | Blob | string>;
  deleteObject(storagePath: string): Promise<void>;
  getObjectMetadata(storagePath: string): Promise<{ sizeBytes: number; contentType: string; customMetadata?: Record<string, string> } | null>;
}

export interface StorageAuditPort {
  appendStorageAuditEvent(event: StorageAuditEvent): Promise<void>;
  listStorageAuditEvents(orgId: string, projectId?: string): Promise<StorageAuditEvent[]>;
}
