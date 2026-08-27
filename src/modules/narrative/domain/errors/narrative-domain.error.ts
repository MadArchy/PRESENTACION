export class NarrativeDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NarrativeDomainError';
  }
}

export class InvalidNarrativeRequestError extends NarrativeDomainError {
  constructor(field: string, reason: string) {
    super(`Invalid narrative request for '${field}': ${reason}`);
    this.name = 'InvalidNarrativeRequestError';
  }
}

export class NarrativeProfileNotFoundError extends NarrativeDomainError {
  constructor(profileId: string) {
    super(`Narrative profile with id '${profileId}' was not found`);
    this.name = 'NarrativeProfileNotFoundError';
  }
}

export class NarrativeCompilationError extends NarrativeDomainError {
  constructor(reason: string) {
    super(`Narrative compilation failed: ${reason}`);
    this.name = 'NarrativeCompilationError';
  }
}
