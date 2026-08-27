import { ProjectSettings } from '../administration.types';

export class ProjectSettingsEntity implements ProjectSettings {
  public readonly organizationId: string;
  public readonly projectId: string;
  public displayName: string;
  public defaultLanguage: string;
  public defaultNarrativeAudience?: string;
  public defaultNarrativeDuration?: string;
  public dataRoomEnabled: boolean;
  public copilotEnabled: boolean;
  public presenterEnabled: boolean;
  public updatedAt: string;
  public updatedBy: string;

  constructor(params: {
    organizationId: string;
    projectId: string;
    displayName?: string;
    defaultLanguage?: string;
    defaultNarrativeAudience?: string;
    defaultNarrativeDuration?: string;
    dataRoomEnabled?: boolean;
    copilotEnabled?: boolean;
    presenterEnabled?: boolean;
    updatedAt?: string;
    updatedBy: string;
  }) {
    if (!params.organizationId || params.organizationId.trim() === '') {
      throw new Error('organizationId is required');
    }
    if (!params.projectId || params.projectId.trim() === '') {
      throw new Error('projectId is required');
    }
    if (!params.updatedBy || params.updatedBy.trim() === '') {
      throw new Error('updatedBy is required');
    }

    const now = new Date().toISOString();
    this.organizationId = params.organizationId;
    this.projectId = params.projectId;
    this.displayName = params.displayName?.trim() || 'Project';
    this.defaultLanguage = params.defaultLanguage || 'es';
    this.defaultNarrativeAudience = params.defaultNarrativeAudience || 'INVESTOR';
    this.defaultNarrativeDuration = params.defaultNarrativeDuration || 'FIVE_MINUTES';
    this.dataRoomEnabled = params.dataRoomEnabled !== undefined ? params.dataRoomEnabled : true;
    this.copilotEnabled = params.copilotEnabled !== undefined ? params.copilotEnabled : true;
    this.presenterEnabled = params.presenterEnabled !== undefined ? params.presenterEnabled : true;
    this.updatedAt = params.updatedAt || now;
    this.updatedBy = params.updatedBy;
  }

  public update(params: {
    displayName?: string;
    defaultLanguage?: string;
    defaultNarrativeAudience?: string;
    defaultNarrativeDuration?: string;
    dataRoomEnabled?: boolean;
    copilotEnabled?: boolean;
    presenterEnabled?: boolean;
    updatedBy: string;
  }): void {
    if (params.displayName !== undefined) this.displayName = params.displayName.trim();
    if (params.defaultLanguage !== undefined) this.defaultLanguage = params.defaultLanguage;
    if (params.defaultNarrativeAudience !== undefined) this.defaultNarrativeAudience = params.defaultNarrativeAudience;
    if (params.defaultNarrativeDuration !== undefined) this.defaultNarrativeDuration = params.defaultNarrativeDuration;
    if (params.dataRoomEnabled !== undefined) this.dataRoomEnabled = params.dataRoomEnabled;
    if (params.copilotEnabled !== undefined) this.copilotEnabled = params.copilotEnabled;
    if (params.presenterEnabled !== undefined) this.presenterEnabled = params.presenterEnabled;
    this.updatedBy = params.updatedBy;
    this.updatedAt = new Date().toISOString();
  }

  public toJSON(): ProjectSettings {
    return {
      organizationId: this.organizationId,
      projectId: this.projectId,
      displayName: this.displayName,
      defaultLanguage: this.defaultLanguage,
      defaultNarrativeAudience: this.defaultNarrativeAudience,
      defaultNarrativeDuration: this.defaultNarrativeDuration,
      dataRoomEnabled: this.dataRoomEnabled,
      copilotEnabled: this.copilotEnabled,
      presenterEnabled: this.presenterEnabled,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy
    };
  }
}
