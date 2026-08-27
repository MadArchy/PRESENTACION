import { SourceReference } from '../../project/domain/project.types';

export type EvidenceType =
  | 'DOCUMENT'
  | 'DATASET'
  | 'CALCULATION'
  | 'OBSERVATION'
  | 'EXPERIMENT'
  | 'SYSTEM_RECORD'
  | 'EXTERNAL_REFERENCE'
  | 'MEDIA'
  | 'OTHER';

export type EvidenceStatus =
  | 'AVAILABLE'
  | 'MISSING'
  | 'SUPERSEDED'
  | 'DISPUTED'
  | 'INVALID';

export type EvidenceRelation =
  | 'SUPPORTS'
  | 'PARTIALLY_SUPPORTS'
  | 'CONTRADICTS'
  | 'CONTEXT_ONLY';

export type EvidenceLinkStatus = 'ACTIVE' | 'RETIRED';

export interface EvidenceSource {
  sourceType: string;
  title: string;
  reference: string;
  locator?: string;
  date?: string;
  authorOrOwner?: string;
}

export interface EvidenceData {
  id: string;
  projectId: string;
  projectVersion: string;
  type: EvidenceType;
  status: EvidenceStatus;
  title: string;
  description?: string;
  source: EvidenceSource;
  sourceRefs?: SourceReference[];
  capturedAt: string;
  reviewedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface EvidenceLinkData {
  id: string;
  claimId: string;
  evidenceId: string;
  projectId: string;
  relation: EvidenceRelation;
  status: EvidenceLinkStatus;
  rationale?: string;
  createdAt: string;
}
