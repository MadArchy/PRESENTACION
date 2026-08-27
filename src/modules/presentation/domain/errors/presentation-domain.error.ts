export class PresentationDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PresentationDomainError';
  }
}

export class PresentationNotFoundError extends PresentationDomainError {
  constructor(id: string) {
    super(`Presentation with id '${id}' was not found`);
    this.name = 'PresentationNotFoundError';
  }
}

export class InvalidPresentationDataError extends PresentationDomainError {
  constructor(field: string, reason: string) {
    super(`Invalid presentation data for '${field}': ${reason}`);
    this.name = 'InvalidPresentationDataError';
  }
}
