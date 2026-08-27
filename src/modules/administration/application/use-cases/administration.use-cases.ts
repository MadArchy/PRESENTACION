import {
  OrganizationAdministrationRecord,
  OrganizationSettings,
  ProjectAdministrationRecord,
  ProjectSettings,
  OrganizationUsage,
  ProjectUsage,
  PlatformAdministrationSummary,
  OperationalHealthSummary,
  InvitePolicy
} from '../../domain/administration.types';
import { ProjectRole } from '../../../security/domain/security.types';
import { ConfidentialityLevel } from '../../../data-room/domain/value-objects/confidentiality-level.vo';
import {
  OrganizationAdministrationRepository,
  OrganizationSettingsRepository,
  ProjectAdministrationRepository,
  ProjectSettingsRepository,
  UsageReadRepository,
  PlatformHealthPort
} from '../../domain/ports/administration.ports';
import { LifecyclePolicy } from '../../domain/policies/lifecycle.policy';
import { OrganizationAdministrationRecordEntity } from '../../domain/entities/organization-administration-record.entity';
import { OrganizationSettingsEntity } from '../../domain/entities/organization-settings.entity';
import { ProjectAdministrationRecordEntity } from '../../domain/entities/project-administration-record.entity';
import { ProjectSettingsEntity } from '../../domain/entities/project-settings.entity';

export class AdministrationUseCases {
  constructor(
    private orgRepo: OrganizationAdministrationRepository,
    private orgSettingsRepo: OrganizationSettingsRepository,
    private projectRepo: ProjectAdministrationRepository,
    private projectSettingsRepo: ProjectSettingsRepository,
    private usageRepo: UsageReadRepository,
    private healthPort: PlatformHealthPort
  ) {}

  // 1. RenameOrganization
  async renameOrganization(organizationId: string, newName: string, updatedByUserId: string): Promise<OrganizationAdministrationRecord> {
    const record = await this.orgRepo.findOrgRecordById(organizationId);
    if (!record) throw new Error(`Organization '${organizationId}' not found.`);
    const entity = new OrganizationAdministrationRecordEntity(record);
    entity.rename(newName, updatedByUserId);
    await this.orgRepo.saveOrgRecord(entity.toJSON());
    return entity.toJSON();
  }

  // 2. UpdateOrganizationSettings
  async updateOrganizationSettings(params: {
    organizationId: string;
    displayName?: string;
    defaultLanguage?: string;
    timezone?: string;
    defaultProjectRole?: ProjectRole;
    invitePolicy?: InvitePolicy;
    dataRoomDefaultConfidentiality?: ConfidentialityLevel;
    updatedBy: string;
  }): Promise<OrganizationSettings> {
    let settings = await this.orgSettingsRepo.findOrgSettingsById(params.organizationId);
    if (!settings) {
      settings = {
        organizationId: params.organizationId,
        displayName: params.displayName || 'Organization',
        defaultLanguage: params.defaultLanguage || 'es',
        timezone: params.timezone || 'UTC',
        defaultProjectRole: params.defaultProjectRole || 'PROJECT_VIEWER',
        invitePolicy: params.invitePolicy || 'ADMINS_ONLY',
        dataRoomDefaultConfidentiality: params.dataRoomDefaultConfidentiality || 'INTERNAL',
        updatedAt: new Date().toISOString(),
        updatedBy: params.updatedBy
      };
    }
    const entity = new OrganizationSettingsEntity(settings);
    entity.update(params);
    await this.orgSettingsRepo.saveOrgSettings(entity.toJSON());
    return entity.toJSON();
  }

  // 3. SuspendOrganization
  async suspendOrganization(organizationId: string, updatedByUserId: string): Promise<OrganizationAdministrationRecord> {
    const record = await this.orgRepo.findOrgRecordById(organizationId);
    if (!record) throw new Error(`Organization '${organizationId}' not found.`);
    const decision = LifecyclePolicy.validateOrganizationTransition(record.status, 'SUSPENDED');
    if (!decision.allowed) throw new Error(decision.message);

    const entity = new OrganizationAdministrationRecordEntity(record);
    entity.updateStatus('SUSPENDED', updatedByUserId);
    await this.orgRepo.saveOrgRecord(entity.toJSON());
    return entity.toJSON();
  }

  // 4. ReactivateOrganization
  async reactivateOrganization(organizationId: string, updatedByUserId: string): Promise<OrganizationAdministrationRecord> {
    const record = await this.orgRepo.findOrgRecordById(organizationId);
    if (!record) throw new Error(`Organization '${organizationId}' not found.`);
    const decision = LifecyclePolicy.validateOrganizationTransition(record.status, 'ACTIVE');
    if (!decision.allowed) throw new Error(decision.message);

    const entity = new OrganizationAdministrationRecordEntity(record);
    entity.updateStatus('ACTIVE', updatedByUserId);
    await this.orgRepo.saveOrgRecord(entity.toJSON());
    return entity.toJSON();
  }

  // 5. ArchiveOrganization
  async archiveOrganization(organizationId: string, updatedByUserId: string): Promise<OrganizationAdministrationRecord> {
    const record = await this.orgRepo.findOrgRecordById(organizationId);
    if (!record) throw new Error(`Organization '${organizationId}' not found.`);
    const decision = LifecyclePolicy.validateOrganizationTransition(record.status, 'ARCHIVED');
    if (!decision.allowed) throw new Error(decision.message);

    const entity = new OrganizationAdministrationRecordEntity(record);
    entity.updateStatus('ARCHIVED', updatedByUserId);
    await this.orgRepo.saveOrgRecord(entity.toJSON());
    return entity.toJSON();
  }

  // 6. TransferOrganizationOwnership
  async transferOrganizationOwnership(organizationId: string, newOwnerUserId: string): Promise<OrganizationAdministrationRecord> {
    const record = await this.orgRepo.findOrgRecordById(organizationId);
    if (!record) throw new Error(`Organization '${organizationId}' not found.`);
    const entity = new OrganizationAdministrationRecordEntity(record);
    entity.transferOwnership(newOwnerUserId);
    await this.orgRepo.saveOrgRecord(entity.toJSON());
    return entity.toJSON();
  }

  // 7. CreateProject
  async createProject(params: {
    projectId: string;
    organizationId: string;
    name: string;
    slug: string;
    ownerUserId: string;
    createdBy: string;
  }): Promise<{ project: ProjectAdministrationRecord; settings: ProjectSettings }> {
    const existing = await this.projectRepo.findProjectBySlug(params.organizationId, params.slug);
    if (existing) {
      throw new Error(`Project with slug '${params.slug}' already exists in this organization (T-45 Collision Protection).`);
    }

    const projectEntity = new ProjectAdministrationRecordEntity({
      projectId: params.projectId,
      organizationId: params.organizationId,
      name: params.name,
      slug: params.slug,
      status: 'ACTIVE',
      ownerUserId: params.ownerUserId,
      createdBy: params.createdBy,
      updatedBy: params.createdBy
    });

    const settingsEntity = new ProjectSettingsEntity({
      organizationId: params.organizationId,
      projectId: params.projectId,
      displayName: params.name,
      updatedBy: params.createdBy
    });

    await this.projectRepo.saveProjectRecord(projectEntity.toJSON());
    await this.projectSettingsRepo.saveProjectSettings(settingsEntity.toJSON());

    return {
      project: projectEntity.toJSON(),
      settings: settingsEntity.toJSON()
    };
  }

  // 8. UpdateProjectSettings
  async updateProjectSettings(params: {
    organizationId: string;
    projectId: string;
    displayName?: string;
    defaultLanguage?: string;
    defaultNarrativeAudience?: string;
    defaultNarrativeDuration?: string;
    dataRoomEnabled?: boolean;
    copilotEnabled?: boolean;
    presenterEnabled?: boolean;
    updatedBy: string;
  }): Promise<ProjectSettings> {
    let settings = await this.projectSettingsRepo.findProjectSettingsById(params.organizationId, params.projectId);
    if (!settings) {
      settings = {
        organizationId: params.organizationId,
        projectId: params.projectId,
        displayName: params.displayName || 'Project',
        defaultLanguage: params.defaultLanguage || 'es',
        dataRoomEnabled: true,
        copilotEnabled: true,
        presenterEnabled: true,
        updatedAt: new Date().toISOString(),
        updatedBy: params.updatedBy
      };
    }
    const entity = new ProjectSettingsEntity(settings);
    entity.update(params);
    await this.projectSettingsRepo.saveProjectSettings(entity.toJSON());
    return entity.toJSON();
  }

  // 9. PauseProject
  async pauseProject(organizationId: string, projectId: string, updatedByUserId: string): Promise<ProjectAdministrationRecord> {
    const record = await this.projectRepo.findProjectRecordById(organizationId, projectId);
    if (!record) throw new Error(`Project '${projectId}' not found in organization '${organizationId}'.`);
    const decision = LifecyclePolicy.validateProjectTransition(record.status, 'PAUSED');
    if (!decision.allowed) throw new Error(decision.message);

    const entity = new ProjectAdministrationRecordEntity(record);
    entity.updateStatus('PAUSED', updatedByUserId);
    await this.projectRepo.saveProjectRecord(entity.toJSON());
    return entity.toJSON();
  }

  // 10. ReactivateProject
  async reactivateProject(organizationId: string, projectId: string, updatedByUserId: string): Promise<ProjectAdministrationRecord> {
    const record = await this.projectRepo.findProjectRecordById(organizationId, projectId);
    if (!record) throw new Error(`Project '${projectId}' not found in organization '${organizationId}'.`);
    const decision = LifecyclePolicy.validateProjectTransition(record.status, 'ACTIVE');
    if (!decision.allowed) throw new Error(decision.message);

    const entity = new ProjectAdministrationRecordEntity(record);
    entity.updateStatus('ACTIVE', updatedByUserId);
    await this.projectRepo.saveProjectRecord(entity.toJSON());
    return entity.toJSON();
  }

  // 11. ArchiveProject
  async archiveProject(organizationId: string, projectId: string, updatedByUserId: string): Promise<ProjectAdministrationRecord> {
    const record = await this.projectRepo.findProjectRecordById(organizationId, projectId);
    if (!record) throw new Error(`Project '${projectId}' not found in organization '${organizationId}'.`);
    const decision = LifecyclePolicy.validateProjectTransition(record.status, 'ARCHIVED');
    if (!decision.allowed) throw new Error(decision.message);

    const entity = new ProjectAdministrationRecordEntity(record);
    entity.updateStatus('ARCHIVED', updatedByUserId);
    await this.projectRepo.saveProjectRecord(entity.toJSON());
    return entity.toJSON();
  }

  // 12. TransferProjectOwnership
  async transferProjectOwnership(organizationId: string, projectId: string, newOwnerUserId: string, updatedByUserId: string): Promise<ProjectAdministrationRecord> {
    const record = await this.projectRepo.findProjectRecordById(organizationId, projectId);
    if (!record) throw new Error(`Project '${projectId}' not found in organization '${organizationId}'.`);
    const entity = new ProjectAdministrationRecordEntity(record);
    entity.transferOwnership(newOwnerUserId, updatedByUserId);
    await this.projectRepo.saveProjectRecord(entity.toJSON());
    return entity.toJSON();
  }

  // 13. Usage & Health queries
  async getOrganizationUsage(organizationId: string): Promise<OrganizationUsage> {
    return this.usageRepo.getOrganizationUsage(organizationId);
  }

  async getProjectUsage(organizationId: string, projectId: string): Promise<ProjectUsage> {
    return this.usageRepo.getProjectUsage(organizationId, projectId);
  }

  async getOperationalHealth(): Promise<OperationalHealthSummary> {
    return this.healthPort.getOperationalHealth();
  }

  async getPlatformSummary(): Promise<PlatformAdministrationSummary> {
    return this.usageRepo.getPlatformSummary();
  }
}
