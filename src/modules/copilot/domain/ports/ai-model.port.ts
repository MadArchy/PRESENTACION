import { AiModelCapabilities, AiCompletionRequest, AiCompletionResponse } from '../copilot.types';

export interface AiModelPort {
  getCapabilities(): Promise<AiModelCapabilities>;
  complete(request: AiCompletionRequest): Promise<AiCompletionResponse>;
}
