import { SourceReference } from '../../project/domain/project.types';

export type DataRoomStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export type DocumentKind =
  | 'CORPORATE'
  | 'LEGAL'
  | 'FINANCIAL'
  | 'TAX'
  | 'COMMERCIAL'
  | 'CUSTOMER'
  | 'MARKET'
  | 'PRODUCT'
  | 'TECHNICAL'
  | 'SECURITY'
  | 'IP'
  | 'REGULATORY'
  | 'TEAM'
  | 'HR'
  | 'OPERATIONS'
  | 'RISK'
  | 'INSURANCE'
  | 'CONTRACT'
  | 'POLICY'
  | 'REPORT'
  | 'MODEL'
  | 'DATASET'
  | 'OTHER';

export type DiligenceCategoryType =
  | 'CORPORATE'
  | 'LEGAL'
  | 'FINANCIAL'
  | 'TAX'
  | 'COMMERCIAL'
  | 'CUSTOMER'
  | 'MARKET'
  | 'PRODUCT'
  | 'TECHNOLOGY'
  | 'SECURITY'
  | 'INTELLECTUAL_PROPERTY'
  | 'REGULATORY'
  | 'TEAM_HR'
  | 'OPERATIONS'
  | 'RISK_INSURANCE'
  | 'ESG';

export type DocumentStatus =
  | 'AVAILABLE'
  | 'MISSING'
  | 'DRAFT'
  | 'UNDER_REVIEW'
  | 'CURRENT'
  | 'SUPERSEDED'
  | 'EXPIRED'
  | 'DISPUTED'
  | 'INVALID';

export type ConfidentialityLevel =
  | 'PUBLIC'
  | 'INTERNAL'
  | 'CONFIDENTIAL'
  | 'HIGHLY_CONFIDENTIAL';

export type DocumentSourceType =
  | 'REPOSITORY_ASSET'
  | 'PROJECT_SOURCE'
  | 'EVIDENCE_SOURCE'
  | 'EXTERNAL_REFERENCE'
  | 'MANUAL_METADATA';

export interface DocumentSource {
  type: DocumentSourceType;
  reference: string;
  locator?: string;
}

export type DiligenceRequestStatus =
  | 'OPEN'
  | 'PARTIALLY_SATISFIED'
  | 'SATISFIED'
  | 'BLOCKED'
  | 'NOT_APPLICABLE';

export type DiligencePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type DiligenceGapType =
  | 'MISSING_DOCUMENT'
  | 'STALE_DOCUMENT'
  | 'INVALID_DOCUMENT'
  | 'DISPUTED_DOCUMENT'
  | 'MISSING_EVIDENCE'
  | 'UNSUPPORTED_MATERIAL_CLAIM'
  | 'OPEN_REQUEST'
  | 'INCOMPLETE_CATEGORY'
  | 'MISSING_SOURCE_REFERENCE'
  | 'VERSION_MISMATCH';

export type DiligenceGapSeverity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKING';

export type DiligenceReadiness =
  | 'DILIGENCE_READY'
  | 'DILIGENCE_READY_WITH_WARNINGS'
  | 'DILIGENCE_NOT_READY';

export interface FreshnessRule {
  maxAgeDays?: number;
  mustBeCurrent?: boolean;
  expiresAtRequired?: boolean;
}

export interface DocumentArtifactData {
  id: string;
  projectId: string;
  projectVersion: string;
  title: string;
  description?: string;
  kind: DocumentKind;
  category: DiligenceCategoryType;
  status: DocumentStatus;
  confidentiality: ConfidentialityLevel;
  source: DocumentSource;
  assetRef?: string;
  issuedAt?: string;
  effectiveAt?: string;
  expiresAt?: string;
  reviewedAt?: string;
  owner?: string;
  projectSectionRefs?: string[];
  claimRefs?: string[];
  evidenceRefs?: string[];
  requestRefs?: string[];
  tags?: string[];
  sourceRefs?: SourceReference[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DiligenceRequestData {
  id: string;
  projectId: string;
  projectVersion: string;
  category: DiligenceCategoryType;
  title: string;
  description?: string;
  priority: DiligencePriority;
  status: DiligenceRequestStatus;
  requiredDocumentKinds: DocumentKind[];
  linkedDocumentIds?: string[];
  linkedClaimIds?: string[];
  linkedEvidenceIds?: string[];
  freshnessRule?: FreshnessRule;
  createdAt?: string;
  updatedAt?: string;
}

export interface DiligenceChecklistItemData {
  id: string;
  category: DiligenceCategoryType;
  title: string;
  description?: string;
  priority: DiligencePriority;
  expectedDocumentKinds: DocumentKind[];
  evidenceRequired?: boolean;
  claimCoverageRequired?: boolean;
  freshnessRule?: FreshnessRule;
}

export interface DiligenceChecklistData {
  id: string;
  version: string;
  name: string;
  projectType?: string;
  items: DiligenceChecklistItemData[];
}

export interface DataRoomData {
  id: string;
  projectId: string;
  projectVersion: string;
  schemaVersion: string;
  name: string;
  status: DataRoomStatus;
  categories: DiligenceCategoryType[];
  documentIds: string[];
  requestIds: string[];
  checklistId: string;
  policyVersion: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryCoverage {
  category: DiligenceCategoryType;
  requiredItems: number;
  satisfiedItems: number;
  partialItems: number;
  openItems: number;
  blockedItems: number;
  currentDocuments: number;
  staleDocuments: number;
  missingDocuments: number;
  coveragePercent: number;
}

export interface DiligenceCoverageReport {
  projectId: string;
  projectVersion: string;
  totalDocuments: number;
  currentDocuments: number;
  missingDocuments: number;
  staleDocuments: number;
  totalRequests: number;
  satisfiedRequests: number;
  openRequests: number;
  blockedRequests: number;
  categoryCoverage: Record<DiligenceCategoryType, CategoryCoverage>;
  evaluatedAt: string;
}

export interface DiligenceGap {
  id: string;
  category: DiligenceCategoryType;
  type: DiligenceGapType;
  severity: DiligenceGapSeverity;
  title: string;
  explanation: string;
  relatedRequestIds: string[];
  relatedClaimIds: string[];
  relatedEvidenceIds: string[];
  relatedDocumentIds: string[];
  remediationHint?: string;
}

export interface DiligenceReadinessExplanation {
  readiness: DiligenceReadiness;
  policyVersion: string;
  reasonCodes: string[];
  blockingGapIds: string[];
  warningGapIds: string[];
  message: string;
  evaluatedAt: string;
}
