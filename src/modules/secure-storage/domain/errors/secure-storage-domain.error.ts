export class SecureStorageDomainError extends Error {
  constructor(message: string, public readonly code: string = 'SECURE_STORAGE_ERROR') {
    super(`[SecureStorageDomainError] ${code}: ${message}`);
    this.name = 'SecureStorageDomainError';
  }
}

export class UploadPolicyViolationError extends SecureStorageDomainError {
  constructor(message: string) {
    super(message, 'UPLOAD_POLICY_VIOLATION');
  }
}

export class StorageUnauthorizedError extends SecureStorageDomainError {
  constructor(message: string, public readonly reasonCode: string) {
    super(message, 'STORAGE_UNAUTHORIZED');
  }
}

export class FileNotFoundDomainError extends SecureStorageDomainError {
  constructor(fileId: string) {
    super(`File with ID '${fileId}' not found.`, 'FILE_NOT_FOUND');
  }
}
