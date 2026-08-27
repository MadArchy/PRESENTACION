import { AiProviderType } from '../copilot.types';

export interface SessionKeyStorePort {
  getKey(provider: AiProviderType): string | undefined;
  setKey(provider: AiProviderType, key: string): void;
  clearKey(provider: AiProviderType): void;
  hasKey(provider: AiProviderType): boolean;
}
