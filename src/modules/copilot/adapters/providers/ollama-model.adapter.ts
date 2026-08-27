import { AiModelPort } from '../../domain/ports/ai-model.port';
import {
  AiModelCapabilities,
  AiCompletionRequest,
  AiCompletionResponse
} from '../../domain/copilot.types';
import { AiProviderError } from '../../domain/errors/copilot-domain.error';

export class OllamaModelAdapter implements AiModelPort {
  private readonly baseUrl: string;
  private readonly modelId: string;

  constructor(baseUrl = 'http://localhost:11434', modelId = 'llama3.2') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.modelId = modelId;
  }

  async getCapabilities(): Promise<AiModelCapabilities> {
    return {
      provider: 'OLLAMA',
      modelId: this.modelId,
      supportsText: true,
      supportsStructuredOutput: true,
      supportsStreaming: false,
      supportsLargeContext: true
    };
  }

  async checkConnection(): Promise<boolean> {
    try {
      if (typeof fetch === 'undefined') return false;
      const res = await fetch(`${this.baseUrl}/api/tags`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  }

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    try {
      const isConnected = await this.checkConnection();
      if (!isConnected) {
        throw new AiProviderError(
          'OLLAMA',
          `Local Ollama daemon is unreachable at '${this.baseUrl}'. Start Ollama ('ollama serve') to use local model '${this.modelId}'.`
        );
      }

      const promptPayload = `${request.systemPrompt}\n\n${request.userPrompt}`;
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.modelId,
          prompt: promptPayload,
          stream: false,
          format: 'json',
          options: {
            temperature: request.temperature ?? 0.2,
            num_predict: request.maxTokens ?? 1200
          }
        })
      });

      if (!response.ok) {
        throw new AiProviderError('OLLAMA', `HTTP ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      const rawText = json.response || '';
      let structuredJson: Record<string, unknown> | undefined;

      try {
        structuredJson = JSON.parse(rawText);
      } catch {
        // Raw text response
      }

      return {
        rawText,
        structuredJson,
        tokensUsed: {
          prompt: json.prompt_eval_count || 0,
          completion: json.eval_count || 0,
          total: (json.prompt_eval_count || 0) + (json.eval_count || 0)
        },
        providerMetadata: {
          provider: 'OLLAMA',
          modelId: this.modelId,
          totalDuration: json.total_duration
        }
      };
    } catch (err: any) {
      if (err instanceof AiProviderError) throw err;
      throw new AiProviderError('OLLAMA', err.message || 'Unknown network error');
    }
  }
}
