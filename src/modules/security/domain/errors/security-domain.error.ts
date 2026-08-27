export class SecurityDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SecurityDomainError';
  }
}

export class UnauthorizedError extends SecurityDomainError {
  constructor(message = 'User is not authenticated') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends SecurityDomainError {
  public readonly reasonCode: string;

  constructor(reasonCode: string, message = 'Access denied by security policy') {
    super(`${message} [${reasonCode}]`);
    this.name = 'ForbiddenError';
    this.reasonCode = reasonCode;
  }
}

export class RoleEscalationError extends SecurityDomainError {
  constructor(message = 'Illegal role escalation attempt detected') {
    super(message);
    this.name = 'RoleEscalationError';
  }
}
