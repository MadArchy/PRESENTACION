import { ProjectRole } from '../../../security/domain/security.types';
import { ConfidentialityLevel } from '../../../data-room/domain/value-objects/confidentiality-level.vo';
import { InvitePolicy, OrganizationSettings } from '../administration.types';

export class OrganizationSettingsEntity implements OrganizationSettings {
  public readonly organizationId: string;
  public displayName: string;
  public defaultLanguage: string;
  public timezone: string;
  public defaultProjectRole?: ProjectRole;
  public invitePolicy: InvitePolicy;
  public dataRoomDefaultConfidentiality: ConfidentialityLevel;
  public updatedAt: string;
  public updatedBy: string;

  constructor(params: {
    organizationId: string;
    displayName?: string;
    defaultLanguage?: string;
    timezone?: string;
    defaultProjectRole?: ProjectRole;
    invitePolicy?: InvitePolicy;
    dataRoomDefaultConfidentiality?: ConfidentialityLevel;
    updatedAt?: string;
    updatedBy: string;
  }) {
    if (!params.organizationId || params.organizationId.trim() === '') {
      throw new Error('organizationId is required');
    }
    if (!params.updatedBy || params.updatedBy.trim() === '') {
      throw new Error('updatedBy is required');
    }

    const now = new Date().toISOString();
    this.organizationId = params.organizationId;
    this.displayName = params.displayName?.trim() || 'Organization';
    this.defaultLanguage = params.defaultLanguage || 'es';
    this.timezone = params.timezone || 'UTC';
    this.defaultProjectRole = params.defaultProjectRole || 'PROJECT_VIEWER';
    this.invitePolicy = params.invitePolicy || 'ADMINS_ONLY';
    this.dataRoomDefaultConfidentiality = params.dataRoomDefaultConfidentiality || 'INTERNAL';
    this.updatedAt = params.updatedAt || now;
    this.updatedBy = params.updatedBy;
  }

  public update(params: {
    displayName?: string;
    defaultLanguage?: string;
    timezone?: string;
    defaultProjectRole?: ProjectRole;
    invitePolicy?: InvitePolicy;
    dataRoomDefaultConfidentiality?: ConfidentialityLevel;
    updatedBy: string;
  }): void {
    if (params.displayName !== undefined) this.displayName = params.displayName.trim();
    if (params.defaultLanguage !== undefined) this.defaultLanguage = params.defaultLanguage;
    if (params.timezone !== undefined) this.timezone = params.timezone;
    if (params.defaultProjectRole !== undefined) this.defaultProjectRole = params.defaultProjectRole;
    if (params.invitePolicy !== undefined) this.invitePolicy = params.invitePolicy;
    if (params.dataRoomDefaultConfidentiality !== undefined) {
      this.dataRoomDefaultConfidentiality = params.dataRoomDefaultConfidentiality;
    }
    this.updatedBy = params.updatedBy;
    this.updatedAt = new Date().toISOString();
  }

  public toJSON(): OrganizationSettings {
    return {
      organizationId: this.organizationId,
      displayName: this.displayName,
      defaultLanguage: this.defaultLanguage,
      timezone: this.timezone,
      defaultProjectRole: this.defaultProjectRole,
      invitePolicy: this.invitePolicy,
      dataRoomDefaultConfidentiality: this.dataRoomDefaultConfidentiality,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy
    };
  }
}
