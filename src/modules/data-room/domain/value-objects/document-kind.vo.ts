import { DocumentKind } from '../data-room.types';
import { InvalidDocumentDataError } from '../errors/data-room-domain.error';

export const VALID_DOCUMENT_KINDS: DocumentKind[] = [
  'CORPORATE',
  'LEGAL',
  'FINANCIAL',
  'TAX',
  'COMMERCIAL',
  'CUSTOMER',
  'MARKET',
  'PRODUCT',
  'TECHNICAL',
  'SECURITY',
  'IP',
  'REGULATORY',
  'TEAM',
  'HR',
  'OPERATIONS',
  'RISK',
  'INSURANCE',
  'CONTRACT',
  'POLICY',
  'REPORT',
  'MODEL',
  'DATASET',
  'OTHER'
];

export class DocumentKindVo {
  private readonly value: DocumentKind;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'OTHER';
    if (!VALID_DOCUMENT_KINDS.includes(normalized as DocumentKind)) {
      throw new InvalidDocumentDataError('kind', `Must be one of [${VALID_DOCUMENT_KINDS.join(', ')}], got '${value}'`);
    }
    this.value = normalized as DocumentKind;
  }

  getValue(): DocumentKind {
    return this.value;
  }
}
