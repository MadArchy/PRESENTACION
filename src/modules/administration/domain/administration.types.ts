import {
  ProjectRole,
  OrganizationStatus
} from '../../security/domain/security.types';
import { ConfidentialityLevel } from '../../data-room/domain/value-objects/confidentiality-level.vo';

export type { OrganizationStatus };

export type ProjectLifecycleStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ARCHIVED';

export type InvitePolicy = 'ADMINS_ONLY' | 'OWNERS_ONLY';

export type HealthStatus = 'HEALTHY' | 'DEGRADED' | 'UNAVAILABLE' | 'UNKNOWN';

export type HealthDimension =
  | 'AUTH'
  | 'FIRESTORE'
  | 'STORAGE'
  | 'FUNCTIONS'
  | 'PROJECT_DATA'
  | 'DATA_ROOM'
  | 'AUDIT';

export type LifecycleReasonCode =
  | 'ALLOW'
  | 'ORGANIZATION_SUSPENDED'
  | 'ORGANIZATION_ARCHIVED'
  | 'PROJECT_DRAFT'
  | 'PROJECT_PAUSED'
  | 'PROJECT_ARCHIVED'
  | 'INVALID_TRANSITION'
  | 'PERMISSION_MISSING'
  | 'OWNER_PROTECTION'
  | 'TARGET_USER_INACTIVE'
  | 'TARGET_USER_OUTSIDE_ORGANIZATION'
  | 'DUPLICATE_SLUG'
  | 'MODULE_DISABLED';

export interface OrganizationAdministrationRecord {
  organizationId: string;
  name: string;
  slug: string;
  status: OrganizationStatus;
  ownerUserId: string;
  memberCount: number;
  activeProjectCount: number;
  archivedProjectCount: number;
  storageUsageBytes: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationSettings {
  organizationId: string;
  displayName: string;
  defaultLanguage: string;
  timezone: string;
  defaultProjectRole?: ProjectRole;
  invitePolicy: InvitePolicy;
  dataRoomDefaultConfidentiality: ConfidentialityLevel;
  updatedAt: string;
  updatedBy: string;
}

export interface ProjectAdministrationRecord {
  projectId: string;
  organizationId: string;
  name: string;
  slug: string;
  status: ProjectLifecycleStatus;
  ownerUserId: string;
  projectTwinId?: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  archivedAt?: string;
  archivedBy?: string;
}

export interface ProjectSettings {
  organizationId: string;
  projectId: string;
  displayName: string;
  defaultLanguage: string;
  defaultNarrativeAudience?: string;
  defaultNarrativeDuration?: string;
  dataRoomEnabled: boolean;
  copilotEnabled: boolean;
  presenterEnabled: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface AdministrativeContext {
  organizationId: string;
  projectId?: string;
  organizationStatus: OrganizationStatus;
  projectStatus?: ProjectLifecycleStatus;
  currentUserId: string;
}

export interface OrganizationUsage {
  organizationId: string;
  activeMembers: number;
  suspendedMembers: number;
  activeProjects: number;
  archivedProjects: number;
  storageBytes: number;
  fileCount: number;
  fileVersionCount: number;
  activeShareGrants: number;
}

export interface ProjectUsage {
  organizationId: string;
  projectId: string;
  memberCount: number;
  storageBytes: number;
  fileCount: number;
  fileVersionCount: number;
  activeShareGrants: number;
  claimsCount?: number;
  evidenceCount?: number;
  presentationsCount?: number;
}

export interface PlatformAdministrationSummary {
  organizations: number;
  activeOrganizations: number;
  projects: number;
  activeProjects: number;
  users: number;
  storageBytes: number;
}

export interface HealthCheck {
  component: string;
  dimension: HealthDimension;
  status: HealthStatus;
  checkedAt: string;
  detailCode?: string;
  message?: string;
}

export interface OperationalHealthSummary {
  overallStatus: HealthStatus;
  checks: HealthCheck[];
  checkedAt: string;
}

export interface LifecycleDecision {
  allowed: boolean;
  reasonCode: LifecycleReasonCode;
  message?: string;
}
