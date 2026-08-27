import { ProjectSectionType } from '../project.types';
import { InvalidProjectDataError } from '../errors/project-domain.error';

export const CANONICAL_SECTION_TYPES: ProjectSectionType[] = [
  'IDENTITY',
  'EXECUTIVE_SUMMARY',
  'PROBLEM',
  'CUSTOMER',
  'SOLUTION',
  'WHY_NOW',
  'MARKET',
  'PRODUCT',
  'BUSINESS_MODEL',
  'COMPETITION',
  'TRACTION',
  'FINANCIALS',
  'TECHNOLOGY',
  'RISKS',
  'ROADMAP',
  'TEAM',
  'ASK'
];

export class ProjectSectionTypeVo {
  private readonly value: ProjectSectionType;

  constructor(value: string) {
    const normalized = value ? value.toUpperCase().trim() : '';
    if (!CANONICAL_SECTION_TYPES.includes(normalized as ProjectSectionType)) {
      throw new InvalidProjectDataError(
        'sectionType',
        `ProjectSectionType must be one of canonical types [${CANONICAL_SECTION_TYPES.join(', ')}], got '${value}'`
      );
    }
    this.value = normalized as ProjectSectionType;
  }

  getValue(): ProjectSectionType {
    return this.value;
  }
}
