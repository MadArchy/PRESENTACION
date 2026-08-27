import { ProjectStatus } from '../project.types';
import { InvalidProjectDataError } from '../errors/project-domain.error';

const VALID_STATUSES: ProjectStatus[] = [
  'concept',
  'validation',
  'pilot',
  'active',
  'paused',
  'archived'
];

export class ProjectStatusVo {
  private readonly value: ProjectStatus;

  constructor(value: string) {
    if (!VALID_STATUSES.includes(value as ProjectStatus)) {
      throw new InvalidProjectDataError(
        'status',
        `Status must be one of [${VALID_STATUSES.join(', ')}], got '${value}'`
      );
    }
    this.value = value as ProjectStatus;
  }

  getValue(): ProjectStatus {
    return this.value;
  }
}
