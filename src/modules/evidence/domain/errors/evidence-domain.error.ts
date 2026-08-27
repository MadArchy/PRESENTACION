export class EvidenceDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EvidenceDomainError';
  }
}

export class EvidenceNotFoundError extends EvidenceDomainError {
  constructor(evidenceId: string) {
    super(`Evidence with id '${evidenceId}' was not found`);
    this.name = 'EvidenceNotFoundError';
  }
}

export class EvidenceLinkNotFoundError extends EvidenceDomainError {
  constructor(linkId: string) {
    super(`EvidenceLink with id '${linkId}' was not found`);
    this.name = 'EvidenceLinkNotFoundError';
  }
}

export class InvalidEvidenceDataError extends EvidenceDomainError {
  constructor(field: string, reason: string) {
    super(`Invalid evidence data for '${field}': ${reason}`);
    this.name = 'InvalidEvidenceDataError';
  }
}
