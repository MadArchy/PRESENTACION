import { SessionKeyStorePort } from '../../domain/ports/session-key-store.port';
import { AiProviderType } from '../../domain/copilot.types';

export class MemorySessionKeyAdapter implements SessionKeyStorePort {
  private readonly keys = new Map<AiProviderType, string>();

  getKey(provider: AiProviderType): string | undefined {
    return this.keys.get(provider);
  }

  setKey(provider: AiProviderType, key: string): void {
    if (key && key.trim().length > 0) {
      this.keys.set(provider, key.trim());
    } else {
      this.keys.delete(provider);
    }
  }

  clearKey(provider: AiProviderType): void {
    this.keys.delete(provider);
  }

  hasKey(provider: AiProviderType): boolean {
    const k = this.keys.get(provider);
    return !!k && k.length > 0;
  }
}
