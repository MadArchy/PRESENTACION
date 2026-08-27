import { Organization, OrganizationStatus } from '../security.types';
import { SecurityDomainError } from '../errors/security-domain.error';

export class OrganizationEntity {
  private readonly id: string;
  private name: string;
  private readonly slug: string;
  private status: OrganizationStatus;
  private readonly createdAt: string;
  private updatedAt: string;

  constructor(data: Organization) {
    if (!data.id || data.id.trim().length === 0) {
      throw new SecurityDomainError('Organization ID cannot be empty');
    }
    if (!data.name || data.name.trim().length === 0) {
      throw new SecurityDomainError('Organization name cannot be empty');
    }
    this.id = data.id.trim();
    this.name = data.name.trim();
    this.slug = data.slug ? data.slug.trim().toLowerCase() : this.id;
    this.status = data.status || 'ACTIVE';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getSlug(): string { return this.slug; }
  getStatus(): OrganizationStatus { return this.status; }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }
  isActive(): boolean { return this.status === 'ACTIVE'; }

  suspend(): void {
    this.status = 'SUSPENDED';
    this.updatedAt = new Date().toISOString();
  }

  activate(): void {
    this.status = 'ACTIVE';
    this.updatedAt = new Date().toISOString();
  }

  toJSON(): Organization {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
