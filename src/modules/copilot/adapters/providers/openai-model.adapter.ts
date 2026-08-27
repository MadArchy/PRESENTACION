import { AiModelPort } from '../../domain/ports/ai-model.port';
import { SessionKeyStorePort } from '../../domain/ports/session-key-store.port';
import {
  AiModelCapabilities,
  AiCompletionRequest,
  AiCompletionResponse
} from '../../domain/copilot.types';
import { AiProviderError } from '../../domain/errors/copilot-domain.error';

export class OpenAiModelAdapter implements AiModelPort {
  private readonly modelId: string;

  constructor(
    private readonly keyStore: SessionKeyStorePort,
    modelId = 'gpt-4o'
  ) {
    this.modelId = modelId;
  }

  async getCapabilities(): Promise<AiModelCapabilities> {
    return {
      provider: 'OPENAI',
      modelId: this.modelId,
      supportsText: true,
      supportsStructuredOutput: true,
      supportsStreaming: true,
      supportsLargeContext: true
    };
  }

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    const apiKey = this.keyStore.getKey('OPENAI');
    if (!apiKey) {
      throw new AiProviderError(
        'OPENAI',
        'No session API key found. Enter an OpenAI API key in the session key modal (memory-only, not persisted).'
      );
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: this.modelId,
          messages: [
            { role: 'system', content: request.systemPrompt },
            { role: 'user', content: request.userPrompt }
          ],
          response_format: { type: 'json_object' },
          temperature: request.temperature ?? 0.2,
          max_tokens: request.maxTokens ?? 1500
        })
      });

      if (!response.ok) {
        throw new AiProviderError('OPENAI', `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const choice = data.choices && data.choices[0];
      const rawText = choice?.message?.content || '';

      let structuredJson: Record<string, unknown> | undefined;
      try {
        structuredJson = JSON.parse(rawText);
      } catch {
        // Raw text
      }

      return {
        rawText,
        structuredJson,
        tokensUsed: data.usage ? {
          prompt: data.usage.prompt_tokens,
          completion: data.usage.completion_tokens,
          total: data.usage.total_tokens
        } : undefined,
        providerMetadata: {
          provider: 'OPENAI',
          modelId: this.modelId,
          systemFingerprint: data.system_fingerprint
        }
      };
    } catch (err: any) {
      if (err instanceof AiProviderError) throw err;
      throw new AiProviderError('OPENAI', err.message || 'OpenAI network error');
    }
  }
}
