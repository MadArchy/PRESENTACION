import {
  FileRecord,
  FileVersion,
  UploadIntent,
  ShareGrant,
  StorageAuditEvent
} from '../../domain/secure-storage.types';
import {
  SecureFileRepository,
  FileVersionRepository,
  UploadIntentRepository,
  ShareGrantRepository,
  StorageAuditPort
} from '../../domain/ports/secure-storage.ports';

export class InMemorySecureStorageStore
  implements
    SecureFileRepository,
    FileVersionRepository,
    UploadIntentRepository,
    ShareGrantRepository,
    StorageAuditPort
{
  private files: Map<string, FileRecord> = new Map();
  private versions: Map<string, FileVersion> = new Map();
  private intents: Map<string, UploadIntent> = new Map();
  private grants: Map<string, ShareGrant> = new Map();
  private auditEvents: StorageAuditEvent[] = [];

  constructor() {
    this.seedArcanaPilotData();
  }

  private seedArcanaPilotData(): void {
    const orgId = 'org-arcana';
    const projectId = 'arcana';
    const creator = 'usr-admin-01';
    const now = '2026-08-26T18:00:00.000Z';

    const arcanaFiles: Array<{
      id: string;
      docId: string;
      logicalName: string;
      fileName: string;
      mediaType: string;
      sizeBytes: number;
      confidentiality: any;
    }> = [
      {
        id: 'sfile-arcana-corp-01',
        docId: 'doc-arcana-corp-01',
        logicalName: 'Articles of Incorporation',
        fileName: 'arcana_incorporation.pdf',
        mediaType: 'application/pdf',
        sizeBytes: 245000,
        confidentiality: 'PUBLIC'
      },
      {
        id: 'sfile-arcana-corp-02',
        docId: 'doc-arcana-corp-02',
        logicalName: 'Bylaws & Operating Agreement',
        fileName: 'arcana_bylaws.pdf',
        mediaType: 'application/pdf',
        sizeBytes: 1200000,
        confidentiality: 'INTERNAL'
      },
      {
        id: 'sfile-arcana-fin-01',
        docId: 'doc-arcana-fin-01',
        logicalName: 'Historical Financial Statements',
        fileName: 'arcana_financials_2025.pdf',
        mediaType: 'application/pdf',
        sizeBytes: 3400000,
        confidentiality: 'INTERNAL'
      },
      {
        id: 'sfile-arcana-fin-02',
        docId: 'doc-arcana-fin-02',
        logicalName: 'Pro-Forma Unit Economics Model',
        fileName: 'arcana_model_v1.xlsx',
        mediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        sizeBytes: 4800000,
        confidentiality: 'CONFIDENTIAL'
      },
      {
        id: 'sfile-arcana-tech-01',
        docId: 'doc-arcana-tech-01',
        logicalName: 'System Architecture & Cryptographic Engine',
        fileName: 'arcana_architecture_whitepaper.pdf',
        mediaType: 'application/pdf',
        sizeBytes: 8100000,
        confidentiality: 'CONFIDENTIAL'
      },
      {
        id: 'sfile-arcana-tech-02',
        docId: 'doc-arcana-tech-02',
        logicalName: 'Third-Party Security & Penetration Audit',
        fileName: 'arcana_sec_audit.pdf',
        mediaType: 'application/pdf',
        sizeBytes: 2900000,
        confidentiality: 'CONFIDENTIAL'
      },
      {
        id: 'sfile-arcana-cap-01',
        docId: 'doc-arcana-cap-01',
        logicalName: 'Detailed Cap Table & Option Pool',
        fileName: 'arcana_captable_q3.xlsx',
        mediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        sizeBytes: 1800000,
        confidentiality: 'HIGHLY_CONFIDENTIAL'
      }
      // Note: doc-arcana-reg-01 is deliberately MISSING and has no FileRecord.
    ];

    arcanaFiles.forEach((f, idx) => {
      const verId = `sver-arcana-${idx + 1}-v1`;
      const storagePath = `organizations/${orgId}/projects/${projectId}/data-room/${f.id}/versions/${verId}/${f.fileName}`;

      const file: FileRecord = {
        id: f.id,
        organizationId: orgId,
        projectId,
        dataRoomDocumentId: f.docId,
        logicalName: f.logicalName,
        originalFileName: f.fileName,
        mediaType: f.mediaType,
        sizeBytes: f.sizeBytes,
        confidentiality: f.confidentiality,
        status: 'AVAILABLE',
        currentVersionId: verId,
        createdAt: now,
        createdBy: creator,
        updatedAt: now,
        updatedBy: creator
      };

      const version: FileVersion = {
        id: verId,
        fileId: f.id,
        organizationId: orgId,
        projectId,
        versionNumber: 1,
        storagePath,
        originalFileName: f.fileName,
        mediaType: f.mediaType,
        sizeBytes: f.sizeBytes,
        status: 'AVAILABLE',
        uploadedAt: now,
        uploadedBy: creator
      };

      this.files.set(`${orgId}_${projectId}_${f.id}`, file);
      this.versions.set(`${orgId}_${projectId}_${f.id}_${verId}`, version);
    });

    // Seed Active ShareGrant for External Reviewer (usr-external-01) with CONFIDENTIAL ceiling
    const sampleGrant: ShareGrant = {
      id: 'grant-pilot-arcana-01',
      organizationId: orgId,
      projectId,
      granteeUserId: 'usr-external-01',
      scope: 'SELECTED_FILES',
      fileIds: ['sfile-arcana-corp-01', 'sfile-arcana-fin-02', 'sfile-arcana-tech-01'],
      confidentialityCeiling: 'CONFIDENTIAL',
      status: 'ACTIVE',
      startsAt: now,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: creator,
      createdAt: now
    };

    this.grants.set(sampleGrant.id, sampleGrant);
  }

  // --- SecureFileRepository ---
  async findFileById(orgId: string, projectId: string, fileId: string): Promise<FileRecord | null> {
    return this.files.get(`${orgId}_${projectId}_${fileId}`) || null;
  }

  async findFileByDataRoomDocId(orgId: string, projectId: string, docId: string): Promise<FileRecord | null> {
    for (const file of this.files.values()) {
      if (file.organizationId === orgId && file.projectId === projectId && file.dataRoomDocumentId === docId) {
        return file;
      }
    }
    return null;
  }

  async listFiles(orgId: string, projectId: string): Promise<FileRecord[]> {
    return Array.from(this.files.values()).filter(
      f => f.organizationId === orgId && f.projectId === projectId
    );
  }

  async saveFile(file: FileRecord): Promise<void> {
    this.files.set(`${file.organizationId}_${file.projectId}_${file.id}`, file);
  }

  async deleteFile(orgId: string, projectId: string, fileId: string): Promise<void> {
    this.files.delete(`${orgId}_${projectId}_${fileId}`);
  }

  // --- FileVersionRepository ---
  async findVersionById(orgId: string, projectId: string, fileId: string, versionId: string): Promise<FileVersion | null> {
    return this.versions.get(`${orgId}_${projectId}_${fileId}_${versionId}`) || null;
  }

  async listVersions(orgId: string, projectId: string, fileId: string): Promise<FileVersion[]> {
    return Array.from(this.versions.values()).filter(
      v => v.organizationId === orgId && v.projectId === projectId && v.fileId === fileId
    );
  }

  async saveVersion(version: FileVersion): Promise<void> {
    this.versions.set(`${version.organizationId}_${version.projectId}_${version.fileId}_${version.id}`, version);
  }

  // --- UploadIntentRepository ---
  async findIntentById(intentId: string): Promise<UploadIntent | null> {
    return this.intents.get(intentId) || null;
  }

  async saveIntent(intent: UploadIntent): Promise<void> {
    this.intents.set(intent.id, intent);
  }

  // --- ShareGrantRepository ---
  async findGrantById(grantId: string): Promise<ShareGrant | null> {
    return this.grants.get(grantId) || null;
  }

  async listGrantsByProject(orgId: string, projectId: string): Promise<ShareGrant[]> {
    return Array.from(this.grants.values()).filter(
      g => g.organizationId === orgId && g.projectId === projectId
    );
  }

  async listGrantsByGrantee(granteeUserId: string): Promise<ShareGrant[]> {
    return Array.from(this.grants.values()).filter(
      g => g.granteeUserId === granteeUserId
    );
  }

  async saveGrant(grant: ShareGrant): Promise<void> {
    this.grants.set(grant.id, grant);
  }

  // --- StorageAuditPort ---
  async appendStorageAuditEvent(event: StorageAuditEvent): Promise<void> {
    this.auditEvents.unshift(event);
  }

  async listStorageAuditEvents(orgId: string, projectId?: string): Promise<StorageAuditEvent[]> {
    return this.auditEvents.filter(
      e => e.organizationId === orgId && (!projectId || e.projectId === projectId)
    );
  }
}
