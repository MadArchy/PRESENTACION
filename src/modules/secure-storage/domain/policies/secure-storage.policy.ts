export class SecureStoragePolicy {
  public static readonly SECURE_STORAGE_POLICY_VERSION = '1.0';

  public static buildStoragePath(params: {
    organizationId: string;
    projectId: string;
    fileId: string;
    versionId: string;
    fileName: string;
  }): string {
    const safeName = params.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    return `organizations/${params.organizationId}/projects/${params.projectId}/data-room/${params.fileId}/versions/${params.versionId}/${safeName}`;
  }
}
