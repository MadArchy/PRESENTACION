import { ProjectVersionData, ProjectStatus, ProjectSectionType } from '../project.types';
import { ProjectVersionVo } from '../value-objects/project-version.vo';
import { ProjectStatusVo } from '../value-objects/project-status.vo';
import { ProjectSectionEntity } from './project-section.entity';
import { InvalidProjectDataError } from '../errors/project-domain.error';

export class ProjectVersionEntity {
  private readonly id: string;
  private readonly projectId: string;
  private readonly version: ProjectVersionVo;
  private readonly status: ProjectStatusVo;
  private readonly createdAt: string;
  private readonly createdBy: string;
  private readonly changeSummary?: string;
  private readonly sections: Map<ProjectSectionType, ProjectSectionEntity>;

  constructor(data: ProjectVersionData) {
    if (!data.id) {
      throw new InvalidProjectDataError('version.id', 'Version ID cannot be empty');
    }
    if (!data.projectId) {
      throw new InvalidProjectDataError('version.projectId', 'Version projectId cannot be empty');
    }

    this.id = data.id.trim();
    this.projectId = data.projectId.trim();
    this.version = new ProjectVersionVo(data.version);
    this.status = new ProjectStatusVo(data.status);
    this.createdAt = data.createdAt || new Date().toISOString();
    this.createdBy = data.createdBy || 'system';
    this.changeSummary = data.changeSummary;

    this.sections = new Map();
    if (data.sections && Array.isArray(data.sections)) {
      for (const secData of data.sections) {
        const sec = new ProjectSectionEntity(secData);
        if (this.sections.has(sec.getType())) {
          throw new InvalidProjectDataError(
            'sections',
            `Duplicate section type '${sec.getType()}' in version '${data.version}'`
          );
        }
        this.sections.set(sec.getType(), sec);
      }
    }
  }

  getId(): string {
    return this.id;
  }

  getProjectId(): string {
    return this.projectId;
  }

  getVersion(): string {
    return this.version.getValue();
  }

  getStatus(): ProjectStatus {
    return this.status.getValue();
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  getChangeSummary(): string | undefined {
    return this.changeSummary;
  }

  getSections(): ProjectSectionEntity[] {
    return Array.from(this.sections.values());
  }

  getSection(type: ProjectSectionType): ProjectSectionEntity | null {
    return this.sections.get(type) || null;
  }

  hasSection(type: ProjectSectionType): boolean {
    return this.sections.has(type);
  }

  toJSON(): ProjectVersionData {
    return {
      id: this.id,
      projectId: this.projectId,
      version: this.getVersion(),
      status: this.getStatus(),
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      changeSummary: this.changeSummary,
      sections: this.getSections().map(s => s.toJSON())
    };
  }
}
