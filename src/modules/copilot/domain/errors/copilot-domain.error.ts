export class CopilotDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CopilotDomainError';
  }
}

export class InvalidCopilotTaskTypeError extends CopilotDomainError {
  constructor(taskType: string) {
    super(`Invalid Copilot task type: '${taskType}'`);
    this.name = 'InvalidCopilotTaskTypeError';
  }
}

export class InvalidCopilotProposalTransitionError extends CopilotDomainError {
  constructor(from: string, to: string) {
    super(`Invalid Copilot proposal transition from '${from}' to '${to}'`);
    this.name = 'InvalidCopilotProposalTransitionError';
  }
}

export class AiProviderError extends CopilotDomainError {
  constructor(provider: string, message: string) {
    super(`AI Provider '${provider}' error: ${message}`);
    this.name = 'AiProviderError';
  }
}

export class CopilotContextError extends CopilotDomainError {
  constructor(message: string) {
    super(`Copilot context error: ${message}`);
    this.name = 'CopilotContextError';
  }
}
