import { InvalidProjectDataError } from '../errors/project-domain.error';

export class ProjectSlug {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new InvalidProjectDataError('slug', 'ProjectSlug cannot be empty');
    }
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    const normalized = value.trim().toLowerCase();
    if (!slugRegex.test(normalized)) {
      throw new InvalidProjectDataError(
        'slug',
        `ProjectSlug must be alphanumeric lowercase with hyphens: '${value}'`
      );
    }
    this.value = normalized;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProjectSlug): boolean {
    return this.value === other.getValue();
  }
}
