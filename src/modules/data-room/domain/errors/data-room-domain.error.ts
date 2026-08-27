export class DataRoomDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataRoomDomainError';
  }
}

export class InvalidDocumentDataError extends DataRoomDomainError {
  constructor(field: string, message: string) {
    super(`Invalid Document Artifact data on '${field}': ${message}`);
    this.name = 'InvalidDocumentDataError';
  }
}

export class InvalidDiligenceRequestError extends DataRoomDomainError {
  constructor(field: string, message: string) {
    super(`Invalid Diligence Request data on '${field}': ${message}`);
    this.name = 'InvalidDiligenceRequestError';
  }
}
