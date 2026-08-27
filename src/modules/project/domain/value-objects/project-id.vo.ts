import { InvalidProjectDataError } from '../errors/project-domain.error';

export class ProjectId {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new InvalidProjectDataError('id', 'ProjectId cannot be empty');
    }
    this.value = value.trim();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProjectId): boolean {
    return this.value === other.getValue();
  }
}
