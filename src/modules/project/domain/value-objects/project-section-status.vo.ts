import { ProjectSectionStatus } from '../project.types';
import { InvalidProjectDataError } from '../errors/project-domain.error';

const VALID_SECTION_STATUSES: ProjectSectionStatus[] = [
  'EMPTY',
  'DRAFT',
  'IN_REVIEW',
  'VALIDATED',
  'NOT_APPLICABLE'
];

export class ProjectSectionStatusVo {
  private readonly value: ProjectSectionStatus;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!VALID_SECTION_STATUSES.includes(normalized as ProjectSectionStatus)) {
      throw new InvalidProjectDataError(
        'sectionStatus',
        `ProjectSectionStatus must be one of [${VALID_SECTION_STATUSES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as ProjectSectionStatus;
  }

  getValue(): ProjectSectionStatus {
    return this.value;
  }
}
