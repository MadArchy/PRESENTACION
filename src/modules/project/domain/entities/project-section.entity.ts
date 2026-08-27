import { ProjectSectionData, ProjectSectionStatus, ProjectSectionType, SourceReference } from '../project.types';
import { ProjectSectionStatusVo } from '../value-objects/project-section-status.vo';
import { ProjectSectionTypeVo } from '../value-objects/project-section-type.vo';
import { InvalidProjectDataError } from '../errors/project-domain.error';

export class ProjectSectionEntity<T = any> {
  private readonly id: string;
  private readonly type: ProjectSectionTypeVo;
  private readonly title: { es: string; en: string };
  private readonly status: ProjectSectionStatusVo;
  private readonly schemaVersion: string;
  private readonly content: T;
  private readonly sourceRefs: SourceReference[];
  private readonly updatedAt: string;

  constructor(data: ProjectSectionData<T>) {
    if (!data.id || data.id.trim().length === 0) {
      throw new InvalidProjectDataError('section.id', 'Section id cannot be empty');
    }
    if (!data.title?.es || !data.title?.en) {
      throw new InvalidProjectDataError('section.title', 'Bilingual titles {es, en} are required for every section');
    }
    if (!data.schemaVersion) {
      throw new InvalidProjectDataError('section.schemaVersion', 'schemaVersion is required');
    }

    this.id = data.id.trim();
    this.type = new ProjectSectionTypeVo(data.type);
    this.title = { es: data.title.es.trim(), en: data.title.en.trim() };
    this.status = new ProjectSectionStatusVo(data.status);
    this.schemaVersion = data.schemaVersion.trim();
    this.content = data.content;
    this.sourceRefs = data.sourceRefs ? [...data.sourceRefs] : [];
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  getId(): string {
    return this.id;
  }

  getType(): ProjectSectionType {
    return this.type.getValue();
  }

  getTitle(): { es: string; en: string } {
    return { ...this.title };
  }

  getStatus(): ProjectSectionStatus {
    return this.status.getValue();
  }

  getSchemaVersion(): string {
    return this.schemaVersion;
  }

  getContent(): T {
    return this.content;
  }

  getSourceRefs(): SourceReference[] {
    return [...this.sourceRefs];
  }

  getUpdatedAt(): string {
    return this.updatedAt;
  }

  toJSON(): ProjectSectionData<T> {
    return {
      id: this.id,
      type: this.getType(),
      title: this.getTitle(),
      status: this.getStatus(),
      schemaVersion: this.schemaVersion,
      content: this.content,
      sourceRefs: this.getSourceRefs(),
      updatedAt: this.updatedAt
    };
  }
}
