export class ClaimDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClaimDomainError';
  }
}

export class ClaimNotFoundError extends ClaimDomainError {
  constructor(claimId: string) {
    super(`Claim with id '${claimId}' was not found`);
    this.name = 'ClaimNotFoundError';
  }
}

export class InvalidClaimDataError extends ClaimDomainError {
  constructor(field: string, reason: string) {
    super(`Invalid claim data for '${field}': ${reason}`);
    this.name = 'InvalidClaimDataError';
  }
}

export class CrossProjectEvidenceLinkError extends ClaimDomainError {
  constructor(claimProject: string, evidenceProject: string) {
    super(`Cannot link evidence from project '${evidenceProject}' to claim in project '${claimProject}'`);
    this.name = 'CrossProjectEvidenceLinkError';
  }
}
