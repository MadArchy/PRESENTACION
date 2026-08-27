import { SecureBinaryStoragePort } from '../../domain/ports/secure-storage.ports';

export class FirebaseSecureBinaryStorageAdapter implements SecureBinaryStoragePort {
  private binaryStore: Map<string, { data: Uint8Array | Blob | string; contentType: string; sizeBytes: number }> = new Map();

  async uploadObject(
    storagePath: string,
    data: Uint8Array | Blob | string,
    contentType: string
  ): Promise<{ storagePath: string; sizeBytes: number; sha256?: string }> {
    let sizeBytes = 0;
    if (typeof data === 'string') {
      sizeBytes = new TextEncoder().encode(data).length;
    } else if (data instanceof Uint8Array) {
      sizeBytes = data.byteLength;
    } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
      sizeBytes = data.size;
    }

    this.binaryStore.set(storagePath, { data, contentType, sizeBytes });
    return { storagePath, sizeBytes };
  }

  async downloadObject(storagePath: string): Promise<Uint8Array | Blob | string> {
    const obj = this.binaryStore.get(storagePath);
    if (!obj) {
      // Return simulated buffer for pilot files
      return `Simulated binary stream for: ${storagePath}`;
    }
    return obj.data;
  }

  async deleteObject(storagePath: string): Promise<void> {
    this.binaryStore.delete(storagePath);
  }

  async getObjectMetadata(storagePath: string): Promise<{ sizeBytes: number; contentType: string; customMetadata?: Record<string, string> } | null> {
    const obj = this.binaryStore.get(storagePath);
    if (!obj) return null;
    return { sizeBytes: obj.sizeBytes, contentType: obj.contentType };
  }
}
