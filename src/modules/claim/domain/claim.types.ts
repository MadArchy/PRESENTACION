import { ProjectSectionType, BilingualText, SourceReference } from '../../project/domain/project.types';

export type ClaimType =
  | 'FACT'
  | 'ESTIMATE'
  | 'ASSUMPTION'
  | 'TARGET'
  | 'HYPOTHESIS';

export type ClaimStatus = 'DRAFT' | 'ACTIVE' | 'RETIRED';

export type ClaimSupportStatus =
  | 'NOT_REQUIRED'
  | 'UNSUPPORTED'
  | 'PARTIALLY_SUPPORTED'
  | 'SUPPORTED'
  | 'CONTRADICTED';

export type ClaimReviewStatus =
  | 'UNREVIEWED'
  | 'REVIEW_REQUIRED'
  | 'REVIEWED'
  | 'CHANGES_REQUESTED';

export type ClaimMateriality = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ClaimData {
  id: string;
  projectId: string;
  projectVersion: string;
  sectionType: ProjectSectionType;
  text: BilingualText;
  type: ClaimType;
  status: ClaimStatus;
  supportStatus: ClaimSupportStatus;
  reviewStatus: ClaimReviewStatus;
  materiality: ClaimMateriality;
  evidenceLinkIds: string[];
  sourceRefs?: SourceReference[];
  createdAt: string;
  updatedAt: string;
}

export interface ClaimSupportExplanation {
  claimId: string;
  status: ClaimSupportStatus;
  reasonCodes: string[];
  supportingEvidenceIds: string[];
  contradictingEvidenceIds: string[];
  message: string;
}

export interface SectionClaimCoverage {
  sectionType: ProjectSectionType;
  totalClaims: number;
  factsCount: number;
  estimatesCount: number;
  assumptionsCount: number;
  targetsCount: number;
  hypothesesCount: number;
  supportedFactsCount: number;
  unsupportedFactsCount: number;
}

export interface ProjectClaimCoverageReport {
  projectId: string;
  projectVersion: string;
  totalClaims: number;
  byType: Record<ClaimType, number>;
  bySupportStatus: Record<ClaimSupportStatus, number>;
  byMateriality: Record<ClaimMateriality, number>;
  bySection: SectionClaimCoverage[];
  generatedAt: string;
}

export type TrustReadiness =
  | 'TRUST_READY'
  | 'TRUST_READY_WITH_WARNINGS'
  | 'TRUST_NOT_READY';

export interface ProjectTrustSummary {
  projectId: string;
  projectVersion: string;
  readiness: TrustReadiness;
  criticalFactsSupported: number;
  criticalFactsUnsupported: number;
  highMaterialitySupported: number;
  highMaterialityUnsupported: number;
  contradictedClaimsCount: number;
  unreviewedClaimsCount: number;
  totalClaimsCount: number;
  totalEvidenceCount: number;
  governanceEngineVersion: string;
  policyVersion: string;
  generatedAt: string;
}
