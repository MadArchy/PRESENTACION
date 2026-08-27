import { OrganizationStatus } from '../../../security/domain/security.types';
import { OrganizationAdministrationRecord } from '../administration.types';

export class OrganizationAdministrationRecordEntity implements OrganizationAdministrationRecord {
  public readonly organizationId: string;
  public name: string;
  public readonly slug: string;
  public status: OrganizationStatus;
  public ownerUserId: string;
  public memberCount: number;
  public activeProjectCount: number;
  public archivedProjectCount: number;
  public storageUsageBytes: number;
  public readonly createdAt: string;
  public updatedAt: string;

  constructor(params: {
    organizationId: string;
    name: string;
    slug: string;
    status?: OrganizationStatus;
    ownerUserId: string;
    memberCount?: number;
    activeProjectCount?: number;
    archivedProjectCount?: number;
    storageUsageBytes?: number;
    createdAt?: string;
    updatedAt?: string;
  }) {
    if (!params.organizationId || params.organizationId.trim() === '') {
      throw new Error('organizationId is required');
    }
    if (!params.name || params.name.trim() === '') {
      throw new Error('Organization name is required');
    }
    if (!params.slug || params.slug.trim() === '') {
      throw new Error('Organization slug is required');
    }
    if (!params.ownerUserId || params.ownerUserId.trim() === '') {
      throw new Error('ownerUserId is required (Single canonical owner invariant)');
    }

    const now = new Date().toISOString();
    this.organizationId = params.organizationId;
    this.name = params.name.trim();
    this.slug = params.slug.trim().toLowerCase();
    this.status = params.status || 'ACTIVE';
    this.ownerUserId = params.ownerUserId;
    this.memberCount = Math.max(0, params.memberCount || 1);
    this.activeProjectCount = Math.max(0, params.activeProjectCount || 0);
    this.archivedProjectCount = Math.max(0, params.archivedProjectCount || 0);
    this.storageUsageBytes = Math.max(0, params.storageUsageBytes || 0);
    this.createdAt = params.createdAt || now;
    this.updatedAt = params.updatedAt || now;
  }

  public rename(newName: string, _updatedByUserId?: string): void {
    if (!newName || newName.trim() === '') {
      throw new Error('Organization name cannot be empty');
    }
    this.name = newName.trim();
    this.updatedAt = new Date().toISOString();
  }

  public updateStatus(newStatus: OrganizationStatus, _updatedByUserId?: string): void {
    this.status = newStatus;
    this.updatedAt = new Date().toISOString();
  }

  public transferOwnership(newOwnerUserId: string): void {
    if (!newOwnerUserId || newOwnerUserId.trim() === '') {
      throw new Error('New owner user ID cannot be empty');
    }
    this.ownerUserId = newOwnerUserId;
    this.updatedAt = new Date().toISOString();
  }

  public updateMetrics(metrics: {
    memberCount?: number;
    activeProjectCount?: number;
    archivedProjectCount?: number;
    storageUsageBytes?: number;
  }): void {
    if (metrics.memberCount !== undefined) this.memberCount = Math.max(0, metrics.memberCount);
    if (metrics.activeProjectCount !== undefined) this.activeProjectCount = Math.max(0, metrics.activeProjectCount);
    if (metrics.archivedProjectCount !== undefined) this.archivedProjectCount = Math.max(0, metrics.archivedProjectCount);
    if (metrics.storageUsageBytes !== undefined) this.storageUsageBytes = Math.max(0, metrics.storageUsageBytes);
    this.updatedAt = new Date().toISOString();
  }

  public toJSON(): OrganizationAdministrationRecord {
    return {
      organizationId: this.organizationId,
      name: this.name,
      slug: this.slug,
      status: this.status,
      ownerUserId: this.ownerUserId,
      memberCount: this.memberCount,
      activeProjectCount: this.activeProjectCount,
      archivedProjectCount: this.archivedProjectCount,
      storageUsageBytes: this.storageUsageBytes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
