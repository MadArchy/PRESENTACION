import { InvalidProjectDataError } from '../errors/project-domain.error';

export class ProjectVersionVo {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new InvalidProjectDataError(
        'projectVersion',
        'Project version string cannot be empty'
      );
    }
    this.value = value.trim();
  }

  getValue(): string {
    return this.value;
  }
}
