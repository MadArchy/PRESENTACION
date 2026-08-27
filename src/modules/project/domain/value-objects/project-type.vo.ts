import { ProjectType } from '../project.types';
import { InvalidProjectDataError } from '../errors/project-domain.error';

const VALID_TYPES: ProjectType[] = [
  'SOFTWARE',
  'AI_PLATFORM',
  'DEEPTECH',
  'FOODTECH',
  'EDTECH',
  'INFRASTRUCTURE',
  'SERVICE',
  'PHYSICAL_BUSINESS',
  'HYBRID',
  'OTHER'
];

export class ProjectTypeVo {
  private readonly value: ProjectType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_TYPES.includes(normalized as ProjectType)) {
      throw new InvalidProjectDataError(
        'type',
        `ProjectType must be one of [${VALID_TYPES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as ProjectType;
  }

  getValue(): ProjectType {
    return this.value;
  }
}
