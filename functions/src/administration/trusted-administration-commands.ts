import {
  PlatformRole,
  OrganizationRole,
  ProjectRole,
  AuditEvent,
  AuditEventType,
  MembershipStatus,
  AccessAssignmentStatus
} from '../../src/modules/security/domain/security.types';
import {
  OrganizationAdministrationRecord,
  OrganizationSettings,
  ProjectAdministrationRecord,
  ProjectSettings,
  InvitePolicy
} from '../../src/modules/administration/domain/administration.types';
import { LifecyclePolicy } from '../../src/modules/administration/domain/policies/lifecycle.policy';
import { InMemoryAdministrationStore } from '../../src/modules/administration/adapters/firestore/in-memory-administration.store';
import { ConfidentialityLevel } from '../../src/modules/data-room/domain/value-objects/confidentiality-level.vo';

export interface CallerSecurityContext {
  userId: string;
  organizationId: string;
  platformRole?: PlatformRole;
  orgRole: OrganizationRole;
  orgMembershipStatus: MembershipStatus;
  projectRole?: ProjectRole;
  projectAccessStatus?: AccessAssignmentStatus;
}

export class TrustedAdministrationCommandsEngine {
  private auditLedger: AuditEvent[] = [];

  constructor(private adminStore: InMemoryAdministrationStore) {}

  private verifyActiveCaller(caller: CallerSecurityContext): void {
    if (!caller.userId) {
      throw new Error('Caller authentication missing: Unauthenticated call rejected.');
    }
    if (caller.platformRole === 'PLATFORM_ADMIN') return;
    if (caller.orgMembershipStatus !== 'ACTIVE') {
      throw new Error('Caller organization membership is not ACTIVE. Operation rejected.');
    }
  }

  private async emitAudit(
    caller: CallerSecurityContext,
    type: AuditEventType,
    targetType: string,
    targetId: string,
    projectId?: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const auditEvent: AuditEvent = {
      id: `audit-admin-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: caller.organizationId,
      projectId,
      actorUserId: caller.userId,
      type,
      targetType,
      targetId,
      occurredAt: new Date().toISOString(),
      source: 'TRUSTED_FUNCTION',
      metadata
    };
    this.auditLedger.push(auditEvent);
  }

  // 1. RenameOrganization
  async renameOrganization(caller: CallerSecurityContext, organizationId: string, newName: string): Promise<OrganizationAdministrationRecord> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization administration is strictly prohibited (T-31).');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      throw new Error('Caller lacks organization.update_settings permission.');
    }

    const org = await this.adminStore.findOrgRecordById(organizationId);
    if (!org) throw new Error(`Organization '${organizationId}' not found.`);

    org.name = newName.trim();
    org.updatedAt = new Date().toISOString();
    await this.adminStore.saveOrgRecord(org);

    await this.emitAudit(caller, 'ORGANIZATION_RENAMED', 'ORGANIZATION', organizationId, undefined, { newName });
    return org;
  }

  // 2. UpdateOrganizationSettings
  async updateOrganizationSettings(caller: CallerSecurityContext, params: {
    organizationId: string;
    displayName?: string;
    defaultLanguage?: string;
    timezone?: string;
    defaultProjectRole?: ProjectRole;
    invitePolicy?: InvitePolicy;
    dataRoomDefaultConfidentiality?: ConfidentialityLevel;
  }): Promise<OrganizationSettings> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== params.organizationId) {
      throw new Error('Cross-organization settings update is strictly prohibited (T-31).');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      throw new Error('Caller lacks organization.update_settings permission.');
    }

    let settings = await this.adminStore.findOrgSettingsById(params.organizationId);
    const now = new Date().toISOString();
    if (!settings) {
      settings = {
        organizationId: params.organizationId,
        displayName: params.displayName || 'Organization',
        defaultLanguage: params.defaultLanguage || 'es',
        timezone: params.timezone || 'UTC',
        defaultProjectRole: params.defaultProjectRole || 'PROJECT_VIEWER',
        invitePolicy: params.invitePolicy || 'ADMINS_ONLY',
        dataRoomDefaultConfidentiality: params.dataRoomDefaultConfidentiality || 'INTERNAL',
        updatedAt: now,
        updatedBy: caller.userId
      };
    } else {
      if (params.displayName !== undefined) settings.displayName = params.displayName;
      if (params.defaultLanguage !== undefined) settings.defaultLanguage = params.defaultLanguage;
      if (params.timezone !== undefined) settings.timezone = params.timezone;
      if (params.defaultProjectRole !== undefined) settings.defaultProjectRole = params.defaultProjectRole;
      if (params.invitePolicy !== undefined) settings.invitePolicy = params.invitePolicy;
      if (params.dataRoomDefaultConfidentiality !== undefined) settings.dataRoomDefaultConfidentiality = params.dataRoomDefaultConfidentiality;
      settings.updatedAt = now;
      settings.updatedBy = caller.userId;
    }

    await this.adminStore.saveOrgSettings(settings);
    await this.emitAudit(caller, 'ORGANIZATION_SETTINGS_UPDATED', 'ORGANIZATION_SETTINGS', params.organizationId);
    return settings;
  }

  // 3. SuspendOrganization
  async suspendOrganization(caller: CallerSecurityContext, organizationId: string): Promise<OrganizationAdministrationRecord> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization suspend is strictly prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.orgRole !== 'ORG_OWNER') {
      throw new Error('Caller lacks organization.suspend permission.');
    }

    const org = await this.adminStore.findOrgRecordById(organizationId);
    if (!org) throw new Error(`Organization '${organizationId}' not found.`);

    const decision = LifecyclePolicy.validateOrganizationTransition(org.status, 'SUSPENDED');
    if (!decision.allowed) throw new Error(decision.message);

    org.status = 'SUSPENDED';
    org.updatedAt = new Date().toISOString();
    await this.adminStore.saveOrgRecord(org);

    await this.emitAudit(caller, 'ORGANIZATION_SUSPENDED', 'ORGANIZATION', organizationId);
    return org;
  }

  // 4. ReactivateOrganization
  async reactivateOrganization(caller: CallerSecurityContext, organizationId: string): Promise<OrganizationAdministrationRecord> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization reactivate is strictly prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.orgRole !== 'ORG_OWNER') {
      throw new Error('Caller lacks permission to reactivate organization.');
    }

    const org = await this.adminStore.findOrgRecordById(organizationId);
    if (!org) throw new Error(`Organization '${organizationId}' not found.`);

    const decision = LifecyclePolicy.validateOrganizationTransition(org.status, 'ACTIVE');
    if (!decision.allowed) throw new Error(decision.message);

    org.status = 'ACTIVE';
    org.updatedAt = new Date().toISOString();
    await this.adminStore.saveOrgRecord(org);

    await this.emitAudit(caller, 'ORGANIZATION_REACTIVATED', 'ORGANIZATION', organizationId);
    return org;
  }

  // 5. ArchiveOrganization
  async archiveOrganization(caller: CallerSecurityContext, organizationId: string): Promise<OrganizationAdministrationRecord> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization archive is strictly prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.orgRole !== 'ORG_OWNER') {
      throw new Error('Caller lacks organization.archive permission.');
    }

    const org = await this.adminStore.findOrgRecordById(organizationId);
    if (!org) throw new Error(`Organization '${organizationId}' not found.`);

    const decision = LifecyclePolicy.validateOrganizationTransition(org.status, 'ARCHIVED');
    if (!decision.allowed) throw new Error(decision.message);

    org.status = 'ARCHIVED';
    org.updatedAt = new Date().toISOString();
    await this.adminStore.saveOrgRecord(org);

    await this.emitAudit(caller, 'ORGANIZATION_ARCHIVED', 'ORGANIZATION', organizationId);
    return org;
  }

  // 6. TransferOrganizationOwnership
  async transferOrganizationOwnership(caller: CallerSecurityContext, organizationId: string, newOwnerUserId: string, targetUserIsOrgMember: boolean): Promise<OrganizationAdministrationRecord> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization transfer is strictly prohibited (T-34).');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.orgRole !== 'ORG_OWNER') {
      throw new Error('Caller lacks organization.transfer_ownership permission.');
    }
    if (!targetUserIsOrgMember) {
      throw new Error('Target owner must be an active member of the target organization (T-34).');
    }

    const org = await this.adminStore.findOrgRecordById(organizationId);
    if (!org) throw new Error(`Organization '${organizationId}' not found.`);

    const previousOwner = org.ownerUserId;
    org.ownerUserId = newOwnerUserId;
    org.updatedAt = new Date().toISOString();
    await this.adminStore.saveOrgRecord(org);

    await this.emitAudit(caller, 'ORGANIZATION_OWNERSHIP_TRANSFERRED', 'ORGANIZATION', organizationId, undefined, {
      previousOwner,
      newOwner: newOwnerUserId
    });
    return org;
  }

  // 7. CreateProject
  async createProject(caller: CallerSecurityContext, params: {
    projectId: string;
    organizationId: string;
    name: string;
    slug: string;
  }): Promise<{ project: ProjectAdministrationRecord; settings: ProjectSettings }> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== params.organizationId) {
      throw new Error('Cross-organization project creation is prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      throw new Error('Caller lacks projects.create permission (T-32).');
    }

    const existingSlug = await this.adminStore.findProjectBySlug(params.organizationId, params.slug);
    if (existingSlug) {
      throw new Error(`Project slug '${params.slug}' already exists in this organization (T-45 Collision Protection).`);
    }

    const now = new Date().toISOString();
    const projectRecord: ProjectAdministrationRecord = {
      projectId: params.projectId,
      organizationId: params.organizationId,
      name: params.name.trim(),
      slug: params.slug.trim().toLowerCase(),
      status: 'ACTIVE',
      ownerUserId: caller.userId,
      createdAt: now,
      createdBy: caller.userId,
      updatedAt: now,
      updatedBy: caller.userId
    };

    const projectSettings: ProjectSettings = {
      organizationId: params.organizationId,
      projectId: params.projectId,
      displayName: params.name.trim(),
      defaultLanguage: 'es',
      defaultNarrativeAudience: 'INVESTOR',
      defaultNarrativeDuration: 'FIVE_MINUTES',
      dataRoomEnabled: true,
      copilotEnabled: true,
      presenterEnabled: true,
      updatedAt: now,
      updatedBy: caller.userId
    };

    await this.adminStore.saveProjectRecord(projectRecord);
    await this.adminStore.saveProjectSettings(projectSettings);

    await this.emitAudit(caller, 'PROJECT_CREATED', 'PROJECT', params.projectId, params.projectId, { slug: params.slug });
    return { project: projectRecord, settings: projectSettings };
  }

  // 8. UpdateProjectSettings
  async updateProjectSettings(caller: CallerSecurityContext, params: {
    organizationId: string;
    projectId: string;
    displayName?: string;
    defaultLanguage?: string;
    defaultNarrativeAudience?: string;
    defaultNarrativeDuration?: string;
    dataRoomEnabled?: boolean;
    copilotEnabled?: boolean;
    presenterEnabled?: boolean;
  }): Promise<ProjectSettings> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== params.organizationId) {
      throw new Error('Cross-organization project settings update is prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks projects.update_settings permission.');
      }
    }

    let settings = await this.adminStore.findProjectSettingsById(params.organizationId, params.projectId);
    const now = new Date().toISOString();
    if (!settings) {
      settings = {
        organizationId: params.organizationId,
        projectId: params.projectId,
        displayName: params.displayName || 'Project',
        defaultLanguage: params.defaultLanguage || 'es',
        dataRoomEnabled: params.dataRoomEnabled !== undefined ? params.dataRoomEnabled : true,
        copilotEnabled: params.copilotEnabled !== undefined ? params.copilotEnabled : true,
        presenterEnabled: params.presenterEnabled !== undefined ? params.presenterEnabled : true,
        updatedAt: now,
        updatedBy: caller.userId
      };
    } else {
      if (params.displayName !== undefined) settings.displayName = params.displayName;
      if (params.defaultLanguage !== undefined) settings.defaultLanguage = params.defaultLanguage;
      if (params.defaultNarrativeAudience !== undefined) settings.defaultNarrativeAudience = params.defaultNarrativeAudience;
      if (params.defaultNarrativeDuration !== undefined) settings.defaultNarrativeDuration = params.defaultNarrativeDuration;
      if (params.dataRoomEnabled !== undefined) settings.dataRoomEnabled = params.dataRoomEnabled;
      if (params.copilotEnabled !== undefined) settings.copilotEnabled = params.copilotEnabled;
      if (params.presenterEnabled !== undefined) settings.presenterEnabled = params.presenterEnabled;
      settings.updatedAt = now;
      settings.updatedBy = caller.userId;
    }

    await this.adminStore.saveProjectSettings(settings);
    await this.emitAudit(caller, 'PROJECT_SETTINGS_UPDATED', 'PROJECT_SETTINGS', params.projectId, params.projectId);
    return settings;
  }

  // 9. PauseProject
  async pauseProject(caller: CallerSecurityContext, organizationId: string, projectId: string): Promise<ProjectAdministrationRecord> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization pause is prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks projects.pause permission.');
      }
    }

    const project = await this.adminStore.findProjectRecordById(organizationId, projectId);
    if (!project) throw new Error(`Project '${projectId}' not found in organization '${organizationId}'.`);

    const decision = LifecyclePolicy.validateProjectTransition(project.status, 'PAUSED');
    if (!decision.allowed) throw new Error(decision.message);

    project.status = 'PAUSED';
    project.updatedAt = new Date().toISOString();
    project.updatedBy = caller.userId;
    await this.adminStore.saveProjectRecord(project);

    await this.emitAudit(caller, 'PROJECT_PAUSED', 'PROJECT', projectId, projectId);
    return project;
  }

  // 10. ReactivateProject
  async reactivateProject(caller: CallerSecurityContext, organizationId: string, projectId: string): Promise<ProjectAdministrationRecord> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization reactivate is prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks projects.reactivate permission.');
      }
    }

    const project = await this.adminStore.findProjectRecordById(organizationId, projectId);
    if (!project) throw new Error(`Project '${projectId}' not found in organization '${organizationId}'.`);

    const decision = LifecyclePolicy.validateProjectTransition(project.status, 'ACTIVE');
    if (!decision.allowed) throw new Error(decision.message);

    project.status = 'ACTIVE';
    project.updatedAt = new Date().toISOString();
    project.updatedBy = caller.userId;
    await this.adminStore.saveProjectRecord(project);

    await this.emitAudit(caller, 'PROJECT_REACTIVATED', 'PROJECT', projectId, projectId);
    return project;
  }

  // 11. ArchiveProject
  async archiveProject(caller: CallerSecurityContext, organizationId: string, projectId: string): Promise<ProjectAdministrationRecord> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization archive is prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks projects.archive permission.');
      }
    }

    const project = await this.adminStore.findProjectRecordById(organizationId, projectId);
    if (!project) throw new Error(`Project '${projectId}' not found in organization '${organizationId}'.`);

    const decision = LifecyclePolicy.validateProjectTransition(project.status, 'ARCHIVED');
    if (!decision.allowed) throw new Error(decision.message);

    const now = new Date().toISOString();
    project.status = 'ARCHIVED';
    project.updatedAt = now;
    project.updatedBy = caller.userId;
    project.archivedAt = now;
    project.archivedBy = caller.userId;
    await this.adminStore.saveProjectRecord(project);

    await this.emitAudit(caller, 'PROJECT_ARCHIVED', 'PROJECT', projectId, projectId);
    return project;
  }

  // 12. TransferProjectOwnership
  async transferProjectOwnership(
    caller: CallerSecurityContext,
    organizationId: string,
    projectId: string,
    newOwnerUserId: string,
    targetUserIsOrgMember: boolean
  ): Promise<ProjectAdministrationRecord> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization project ownership transfer is prohibited (T-35).');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks projects.transfer_ownership permission (T-35).');
      }
    }
    if (!targetUserIsOrgMember) {
      throw new Error('Target owner must be an active organization member (T-35).');
    }

    const project = await this.adminStore.findProjectRecordById(organizationId, projectId);
    if (!project) throw new Error(`Project '${projectId}' not found in organization '${organizationId}'.`);

    const previousOwner = project.ownerUserId;
    project.ownerUserId = newOwnerUserId;
    project.updatedAt = new Date().toISOString();
    project.updatedBy = caller.userId;
    await this.adminStore.saveProjectRecord(project);

    await this.emitAudit(caller, 'PROJECT_OWNERSHIP_TRANSFERRED', 'PROJECT', projectId, projectId, {
      previousOwner,
      newOwner: newOwnerUserId
    });
    return project;
  }

  // 13. ReactivateOrganizationMember
  async reactivateOrganizationMember(caller: CallerSecurityContext, organizationId: string, targetUserId: string): Promise<void> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization member reactivation is prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      throw new Error('Caller lacks permission to reactivate members.');
    }

    await this.emitAudit(caller, 'MEMBER_REACTIVATED', 'ORGANIZATION_MEMBER', targetUserId);
  }

  // 14. ReactivateProjectAccess
  async reactivateProjectAccess(caller: CallerSecurityContext, organizationId: string, projectId: string, targetUserId: string): Promise<void> {
    this.verifyActiveCaller(caller);
    if (caller.platformRole !== 'PLATFORM_ADMIN' && caller.organizationId !== organizationId) {
      throw new Error('Cross-organization project access reactivation is prohibited.');
    }
    if (caller.platformRole !== 'PLATFORM_ADMIN' && !['ORG_OWNER', 'ORG_ADMIN'].includes(caller.orgRole)) {
      if (caller.projectRole !== 'PROJECT_ADMIN') {
        throw new Error('Caller lacks permission to reactivate project access.');
      }
    }

    await this.emitAudit(caller, 'PROJECT_ACCESS_REACTIVATED', 'PROJECT_ACCESS_ASSIGNMENT', targetUserId, projectId);
  }

  public getAuditLedger(): AuditEvent[] {
    return [...this.auditLedger];
  }
}
