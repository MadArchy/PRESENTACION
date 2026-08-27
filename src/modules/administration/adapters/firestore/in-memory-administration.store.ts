import {
  OrganizationAdministrationRecord,
  OrganizationSettings,
  ProjectAdministrationRecord,
  ProjectSettings,
  OrganizationUsage,
  ProjectUsage,
  PlatformAdministrationSummary
} from '../../domain/administration.types';
import {
  OrganizationAdministrationRepository,
  OrganizationSettingsRepository,
  ProjectAdministrationRepository,
  ProjectSettingsRepository,
  UsageReadRepository
} from '../../domain/ports/administration.ports';

export class InMemoryAdministrationStore
  implements
    OrganizationAdministrationRepository,
    OrganizationSettingsRepository,
    ProjectAdministrationRepository,
    ProjectSettingsRepository,
    UsageReadRepository {
  private orgRecords = new Map<string, OrganizationAdministrationRecord>();
  private orgSettings = new Map<string, OrganizationSettings>();
  private projectRecords = new Map<string, ProjectAdministrationRecord>();
  private projectSettings = new Map<string, ProjectSettings>();

  constructor() {
    this.seedDefaults();
  }

  private seedDefaults(): void {
    const now = '2026-08-26T10:00:00.000Z';

    // Seed Arcana Organization Admin Record
    this.orgRecords.set('org-arcana', {
      organizationId: 'org-arcana',
      name: 'Arcana Trust Network',
      slug: 'arcana',
      status: 'ACTIVE',
      ownerUserId: 'usr-founder-arcana',
      memberCount: 3,
      activeProjectCount: 1,
      archivedProjectCount: 0,
      storageUsageBytes: 22445000,
      createdAt: now,
      updatedAt: now
    });

    // Seed Arcana Org Settings
    this.orgSettings.set('org-arcana', {
      organizationId: 'org-arcana',
      displayName: 'Arcana Trust Network',
      defaultLanguage: 'es',
      timezone: 'America/Bogota',
      defaultProjectRole: 'PROJECT_VIEWER',
      invitePolicy: 'ADMINS_ONLY',
      dataRoomDefaultConfidentiality: 'INTERNAL',
      updatedAt: now,
      updatedBy: 'usr-founder-arcana'
    });

    // Seed Arcana Project Admin Record
    this.projectRecords.set('org-arcana:arcana', {
      projectId: 'arcana',
      organizationId: 'org-arcana',
      name: 'Arcana Trust Network Venture',
      slug: 'arcana',
      status: 'ACTIVE',
      ownerUserId: 'usr-founder-arcana',
      projectTwinId: 'twin-arcana-pilot',
      createdAt: now,
      createdBy: 'usr-founder-arcana',
      updatedAt: now,
      updatedBy: 'usr-founder-arcana'
    });

    // Seed Arcana Project Settings
    this.projectSettings.set('org-arcana:arcana', {
      organizationId: 'org-arcana',
      projectId: 'arcana',
      displayName: 'Arcana Venture',
      defaultLanguage: 'es',
      defaultNarrativeAudience: 'INVESTOR',
      defaultNarrativeDuration: 'FIVE_MINUTES',
      dataRoomEnabled: true,
      copilotEnabled: true,
      presenterEnabled: true,
      updatedAt: now,
      updatedBy: 'usr-founder-arcana'
    });
  }

  // --- OrganizationAdministrationRepository ---
  async findOrgRecordById(organizationId: string): Promise<OrganizationAdministrationRecord | null> {
    const r = this.orgRecords.get(organizationId);
    return r ? { ...r } : null;
  }

  async saveOrgRecord(record: OrganizationAdministrationRecord): Promise<void> {
    this.orgRecords.set(record.organizationId, { ...record });
  }

  async listAllOrgRecords(): Promise<OrganizationAdministrationRecord[]> {
    return Array.from(this.orgRecords.values()).map(r => ({ ...r }));
  }

  // --- OrganizationSettingsRepository ---
  async findOrgSettingsById(organizationId: string): Promise<OrganizationSettings | null> {
    const s = this.orgSettings.get(organizationId);
    return s ? { ...s } : null;
  }

  async saveOrgSettings(settings: OrganizationSettings): Promise<void> {
    this.orgSettings.set(settings.organizationId, { ...settings });
  }

  // --- ProjectAdministrationRepository ---
  async findProjectRecordById(organizationId: string, projectId: string): Promise<ProjectAdministrationRecord | null> {
    const key = `${organizationId}:${projectId}`;
    const p = this.projectRecords.get(key);
    return p ? { ...p } : null;
  }

  async findProjectBySlug(organizationId: string, slug: string): Promise<ProjectAdministrationRecord | null> {
    const targetSlug = slug.toLowerCase();
    for (const p of this.projectRecords.values()) {
      if (p.organizationId === organizationId && p.slug.toLowerCase() === targetSlug) {
        return { ...p };
      }
    }
    return null;
  }

  async saveProjectRecord(record: ProjectAdministrationRecord): Promise<void> {
    const key = `${record.organizationId}:${record.projectId}`;
    this.projectRecords.set(key, { ...record });
  }

  async listProjectRecordsByOrganization(organizationId: string): Promise<ProjectAdministrationRecord[]> {
    return Array.from(this.projectRecords.values())
      .filter(p => p.organizationId === organizationId)
      .map(p => ({ ...p }));
  }

  async listAllProjectRecords(): Promise<ProjectAdministrationRecord[]> {
    return Array.from(this.projectRecords.values()).map(p => ({ ...p }));
  }

  // --- ProjectSettingsRepository ---
  async findProjectSettingsById(organizationId: string, projectId: string): Promise<ProjectSettings | null> {
    const key = `${organizationId}:${projectId}`;
    const s = this.projectSettings.get(key);
    return s ? { ...s } : null;
  }

  async saveProjectSettings(settings: ProjectSettings): Promise<void> {
    const key = `${settings.organizationId}:${settings.projectId}`;
    this.projectSettings.set(key, { ...settings });
  }

  // --- UsageReadRepository ---
  async getOrganizationUsage(organizationId: string): Promise<OrganizationUsage> {
    const org = this.orgRecords.get(organizationId);
    const projects = Array.from(this.projectRecords.values()).filter(p => p.organizationId === organizationId);
    const activeProjects = projects.filter(p => p.status === 'ACTIVE').length;
    const archivedProjects = projects.filter(p => p.status === 'ARCHIVED').length;

    return {
      organizationId,
      activeMembers: org ? org.memberCount : 3,
      suspendedMembers: 0,
      activeProjects,
      archivedProjects,
      storageBytes: org ? org.storageUsageBytes : 22445000,
      fileCount: 7,
      fileVersionCount: 7,
      activeShareGrants: 1
    };
  }

  async getProjectUsage(organizationId: string, projectId: string): Promise<ProjectUsage> {
    return {
      organizationId,
      projectId,
      memberCount: 3,
      storageBytes: 22445000,
      fileCount: 7,
      fileVersionCount: 7,
      activeShareGrants: 1,
      claimsCount: 16,
      evidenceCount: 11,
      presentationsCount: 1
    };
  }

  async getPlatformSummary(): Promise<PlatformAdministrationSummary> {
    const orgs = Array.from(this.orgRecords.values());
    const projects = Array.from(this.projectRecords.values());
    let totalStorage = 0;
    orgs.forEach(o => totalStorage += o.storageUsageBytes);

    return {
      organizations: orgs.length,
      activeOrganizations: orgs.filter(o => o.status === 'ACTIVE').length,
      projects: projects.length,
      activeProjects: projects.filter(p => p.status === 'ACTIVE').length,
      users: 4,
      storageBytes: totalStorage
    };
  }
}
