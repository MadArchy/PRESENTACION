import { ProjectLifecycleStatus, ProjectAdministrationRecord } from '../administration.types';

export class ProjectAdministrationRecordEntity implements ProjectAdministrationRecord {
  public readonly projectId: string;
  public readonly organizationId: string;
  public name: string;
  public readonly slug: string;
  public status: ProjectLifecycleStatus;
  public ownerUserId: string;
  public projectTwinId?: string;
  public readonly createdAt: string;
  public readonly createdBy: string;
  public updatedAt: string;
  public updatedBy: string;
  public archivedAt?: string;
  public archivedBy?: string;

  constructor(params: {
    projectId: string;
    organizationId: string;
    name: string;
    slug: string;
    status?: ProjectLifecycleStatus;
    ownerUserId: string;
    projectTwinId?: string;
    createdAt?: string;
    createdBy: string;
    updatedAt?: string;
    updatedBy: string;
    archivedAt?: string;
    archivedBy?: string;
  }) {
    if (!params.projectId || params.projectId.trim() === '') {
      throw new Error('projectId is required');
    }
    if (!params.organizationId || params.organizationId.trim() === '') {
      throw new Error('organizationId is required');
    }
    if (!params.name || params.name.trim() === '') {
      throw new Error('Project name is required');
    }
    if (!params.slug || params.slug.trim() === '') {
      throw new Error('Project slug is required');
    }
    if (!params.ownerUserId || params.ownerUserId.trim() === '') {
      throw new Error('ownerUserId is required (Single canonical owner invariant)');
    }
    if (!params.createdBy || params.createdBy.trim() === '') {
      throw new Error('createdBy is required');
    }

    const now = new Date().toISOString();
    this.projectId = params.projectId;
    this.organizationId = params.organizationId;
    this.name = params.name.trim();
    this.slug = params.slug.trim().toLowerCase();
    this.status = params.status || 'ACTIVE';
    this.ownerUserId = params.ownerUserId;
    this.projectTwinId = params.projectTwinId;
    this.createdAt = params.createdAt || now;
    this.createdBy = params.createdBy;
    this.updatedAt = params.updatedAt || now;
    this.updatedBy = params.updatedBy || params.createdBy;
    this.archivedAt = params.archivedAt;
    this.archivedBy = params.archivedBy;
  }

  public rename(newName: string, updatedByUserId: string): void {
    if (!newName || newName.trim() === '') {
      throw new Error('Project name cannot be empty');
    }
    this.name = newName.trim();
    this.updatedBy = updatedByUserId;
    this.updatedAt = new Date().toISOString();
  }

  public updateStatus(newStatus: ProjectLifecycleStatus, updatedByUserId: string): void {
    this.status = newStatus;
    this.updatedBy = updatedByUserId;
    this.updatedAt = new Date().toISOString();
    if (newStatus === 'ARCHIVED') {
      this.archivedAt = new Date().toISOString();
      this.archivedBy = updatedByUserId;
    }
  }

  public transferOwnership(newOwnerUserId: string, updatedByUserId: string): void {
    if (!newOwnerUserId || newOwnerUserId.trim() === '') {
      throw new Error('New owner user ID cannot be empty');
    }
    this.ownerUserId = newOwnerUserId;
    this.updatedBy = updatedByUserId;
    this.updatedAt = new Date().toISOString();
  }

  public toJSON(): ProjectAdministrationRecord {
    return {
      projectId: this.projectId,
      organizationId: this.organizationId,
      name: this.name,
      slug: this.slug,
      status: this.status,
      ownerUserId: this.ownerUserId,
      projectTwinId: this.projectTwinId,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
      archivedAt: this.archivedAt,
      archivedBy: this.archivedBy
    };
  }
}
