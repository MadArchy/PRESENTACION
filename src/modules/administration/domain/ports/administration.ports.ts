import {
  OrganizationAdministrationRecord,
  OrganizationSettings,
  ProjectAdministrationRecord,
  ProjectSettings,
  OrganizationUsage,
  ProjectUsage,
  PlatformAdministrationSummary,
  OperationalHealthSummary,
  HealthCheck
} from '../administration.types';

export interface OrganizationAdministrationRepository {
  findOrgRecordById(organizationId: string): Promise<OrganizationAdministrationRecord | null>;
  saveOrgRecord(record: OrganizationAdministrationRecord): Promise<void>;
  listAllOrgRecords(): Promise<OrganizationAdministrationRecord[]>;
}

export interface OrganizationSettingsRepository {
  findOrgSettingsById(organizationId: string): Promise<OrganizationSettings | null>;
  saveOrgSettings(settings: OrganizationSettings): Promise<void>;
}

export interface ProjectAdministrationRepository {
  findProjectRecordById(organizationId: string, projectId: string): Promise<ProjectAdministrationRecord | null>;
  findProjectBySlug(organizationId: string, slug: string): Promise<ProjectAdministrationRecord | null>;
  saveProjectRecord(record: ProjectAdministrationRecord): Promise<void>;
  listProjectRecordsByOrganization(organizationId: string): Promise<ProjectAdministrationRecord[]>;
  listAllProjectRecords(): Promise<ProjectAdministrationRecord[]>;
}

export interface ProjectSettingsRepository {
  findProjectSettingsById(organizationId: string, projectId: string): Promise<ProjectSettings | null>;
  saveProjectSettings(settings: ProjectSettings): Promise<void>;
}

export interface UsageReadRepository {
  getOrganizationUsage(organizationId: string): Promise<OrganizationUsage>;
  getProjectUsage(organizationId: string, projectId: string): Promise<ProjectUsage>;
  getPlatformSummary(): Promise<PlatformAdministrationSummary>;
}

export interface PlatformHealthPort {
  checkAuth(): Promise<HealthCheck>;
  checkFirestore(): Promise<HealthCheck>;
  checkStorage(): Promise<HealthCheck>;
  checkFunctions(): Promise<HealthCheck>;
  checkProjectData(): Promise<HealthCheck>;
  checkDataRoom(): Promise<HealthCheck>;
  checkAudit(): Promise<HealthCheck>;
  getOperationalHealth(): Promise<OperationalHealthSummary>;
}
