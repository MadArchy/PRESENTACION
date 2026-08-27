import { DocumentStatus } from '../data-room.types';
import { InvalidDocumentDataError } from '../errors/data-room-domain.error';

export const VALID_DOCUMENT_STATUSES: DocumentStatus[] = [
  'AVAILABLE',
  'MISSING',
  'DRAFT',
  'UNDER_REVIEW',
  'CURRENT',
  'SUPERSEDED',
  'EXPIRED',
  'DISPUTED',
  'INVALID'
];

export class DocumentStatusVo {
  private readonly value: DocumentStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'AVAILABLE';
    if (!VALID_DOCUMENT_STATUSES.includes(normalized as DocumentStatus)) {
      throw new InvalidDocumentDataError('status', `Must be one of [${VALID_DOCUMENT_STATUSES.join(', ')}], got '${value}'`);
    }
    this.value = normalized as DocumentStatus;
  }

  getValue(): DocumentStatus {
    return this.value;
  }

  isCurrent(): boolean {
    return this.value === 'CURRENT' || this.value === 'AVAILABLE';
  }

  isMissing(): boolean {
    return this.value === 'MISSING';
  }

  isStaleOrInvalid(): boolean {
    return this.value === 'SUPERSEDED' || this.value === 'EXPIRED' || this.value === 'INVALID' || this.value === 'DISPUTED';
  }
}
