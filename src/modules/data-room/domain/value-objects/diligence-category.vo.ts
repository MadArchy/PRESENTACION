import {
  DiligenceCategoryType,
  DocumentStatus,
  ConfidentialityLevel,
  DiligenceRequestStatus,
  DiligencePriority,
  DiligenceReadiness
} from '../data-room.types';
import { InvalidDocumentDataError, InvalidDiligenceRequestError } from '../errors/data-room-domain.error';

export const VALID_DILIGENCE_CATEGORIES: DiligenceCategoryType[] = [
  'CORPORATE',
  'LEGAL',
  'FINANCIAL',
  'TAX',
  'COMMERCIAL',
  'CUSTOMER',
  'MARKET',
  'PRODUCT',
  'TECHNOLOGY',
  'SECURITY',
  'INTELLECTUAL_PROPERTY',
  'REGULATORY',
  'TEAM_HR',
  'OPERATIONS',
  'RISK_INSURANCE',
  'ESG'
];

export class DiligenceCategoryVo {
  private readonly value: DiligenceCategoryType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'CORPORATE';
    if (!VALID_DILIGENCE_CATEGORIES.includes(normalized as DiligenceCategoryType)) {
      throw new InvalidDocumentDataError('category', `Must be one of [${VALID_DILIGENCE_CATEGORIES.join(', ')}], got '${value}'`);
    }
    this.value = normalized as DiligenceCategoryType;
  }

  getValue(): DiligenceCategoryType {
    return this.value;
  }
}

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

export const VALID_CONFIDENTIALITY_LEVELS: ConfidentialityLevel[] = [
  'PUBLIC',
  'INTERNAL',
  'CONFIDENTIAL',
  'HIGHLY_CONFIDENTIAL'
];

export class ConfidentialityLevelVo {
  private readonly value: ConfidentialityLevel;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'INTERNAL';
    if (!VALID_CONFIDENTIALITY_LEVELS.includes(normalized as ConfidentialityLevel)) {
      throw new InvalidDocumentDataError('confidentiality', `Must be one of [${VALID_CONFIDENTIALITY_LEVELS.join(', ')}], got '${value}'`);
    }
    this.value = normalized as ConfidentialityLevel;
  }

  getValue(): ConfidentialityLevel {
    return this.value;
  }
}

export const VALID_REQUEST_STATUSES: DiligenceRequestStatus[] = [
  'OPEN',
  'PARTIALLY_SATISFIED',
  'SATISFIED',
  'BLOCKED',
  'NOT_APPLICABLE'
];

export class RequestStatusVo {
  private readonly value: DiligenceRequestStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'OPEN';
    if (!VALID_REQUEST_STATUSES.includes(normalized as DiligenceRequestStatus)) {
      throw new InvalidDiligenceRequestError('status', `Must be one of [${VALID_REQUEST_STATUSES.join(', ')}], got '${value}'`);
    }
    this.value = normalized as DiligenceRequestStatus;
  }

  getValue(): DiligenceRequestStatus {
    return this.value;
  }

  isSatisfied(): boolean {
    return this.value === 'SATISFIED';
  }

  isBlocked(): boolean {
    return this.value === 'BLOCKED';
  }
}

export const VALID_PRIORITIES: DiligencePriority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export class DiligencePriorityVo {
  private readonly value: DiligencePriority;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'MEDIUM';
    if (!VALID_PRIORITIES.includes(normalized as DiligencePriority)) {
      throw new InvalidDiligenceRequestError('priority', `Must be one of [${VALID_PRIORITIES.join(', ')}], got '${value}'`);
    }
    this.value = normalized as DiligencePriority;
  }

  getValue(): DiligencePriority {
    return this.value;
  }

  isCriticalOrHigh(): boolean {
    return this.value === 'CRITICAL' || this.value === 'HIGH';
  }
}

export const VALID_READINESS_STATES: DiligenceReadiness[] = [
  'DILIGENCE_READY',
  'DILIGENCE_READY_WITH_WARNINGS',
  'DILIGENCE_NOT_READY'
];

export class DiligenceReadinessVo {
  private readonly value: DiligenceReadiness;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : 'DILIGENCE_NOT_READY';
    if (!VALID_READINESS_STATES.includes(normalized as DiligenceReadiness)) {
      throw new InvalidDiligenceRequestError('readiness', `Must be one of [${VALID_READINESS_STATES.join(', ')}], got '${value}'`);
    }
    this.value = normalized as DiligenceReadiness;
  }

  getValue(): DiligenceReadiness {
    return this.value;
  }
}
