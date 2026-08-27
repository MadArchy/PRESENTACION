export class UploadPolicy {
  public static readonly STORAGE_UPLOAD_POLICY_VERSION = '1.0';

  public static readonly ALLOWED_MEDIA_TYPES = new Set<string>([
    'application/pdf',
    'text/plain',
    'text/markdown',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'image/png',
    'image/jpeg',
    'image/webp'
  ]);

  public static readonly MAX_SIZE_PDF_OFFICE = 50 * 1024 * 1024; // 50MB
  public static readonly MAX_SIZE_IMAGES = 20 * 1024 * 1024; // 20MB
  public static readonly MAX_SIZE_TEXT_CSV = 10 * 1024 * 1024; // 10MB

  static isMediaTypeAllowed(mediaType: string): boolean {
    return this.ALLOWED_MEDIA_TYPES.has(mediaType.toLowerCase().trim());
  }

  static getMaxSizeBytes(mediaType: string): number {
    const type = mediaType.toLowerCase().trim();
    if (type.startsWith('image/')) {
      return this.MAX_SIZE_IMAGES;
    }
    if (type.startsWith('text/') || type === 'text/csv') {
      return this.MAX_SIZE_TEXT_CSV;
    }
    return this.MAX_SIZE_PDF_OFFICE;
  }

  static validateUpload(mediaType: string, sizeBytes: number): { valid: boolean; reason?: string } {
    if (!this.isMediaTypeAllowed(mediaType)) {
      return {
        valid: false,
        reason: `Media type '${mediaType}' is not allowed by UploadPolicy v${this.STORAGE_UPLOAD_POLICY_VERSION}.`
      };
    }

    const maxSize = this.getMaxSizeBytes(mediaType);
    if (sizeBytes > maxSize) {
      return {
        valid: false,
        reason: `File size (${(sizeBytes / 1024 / 1024).toFixed(2)} MB) exceeds maximum allowed size of ${(maxSize / 1024 / 1024).toFixed(0)} MB for '${mediaType}'.`
      };
    }

    return { valid: true };
  }
}
