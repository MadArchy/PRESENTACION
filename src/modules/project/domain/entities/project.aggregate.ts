import { ProjectTwinData, ProjectStatus, ProjectType, Language, ProjectSummary } from '../project.types';
import { ProjectId } from '../value-objects/project-id.vo';
import { ProjectSlug } from '../value-objects/project-slug.vo';
import { ProjectStatusVo } from '../value-objects/project-status.vo';
import { ProjectTypeVo } from '../value-objects/project-type.vo';
import { ProjectVersionVo } from '../value-objects/project-version.vo';
import { ProjectVersionEntity } from './project-version.entity';
import { InvalidProjectDataError } from '../errors/project-domain.error';

export class ProjectAggregate {
  private readonly id: ProjectId;
  private readonly slug: ProjectSlug;
  private readonly name: string;
  private readonly shortName?: string;
  private readonly type: ProjectTypeVo;
  private readonly status: ProjectStatusVo;
  private readonly schemaVersion: string;
  private readonly currentVersion: ProjectVersionVo;
  private readonly defaultLanguage: Language;
  private readonly languages: Language[];
  private readonly theme?: string;
  private readonly createdAt: string;
  private readonly updatedAt: string;
  private readonly metadata?: Record<string, any>;
  private readonly kicker?: { es: string; en: string };
  private readonly versions: Map<string, ProjectVersionEntity>;

  constructor(data: ProjectTwinData) {
    if (!data.name || data.name.trim().length === 0) {
      throw new InvalidProjectDataError('name', 'Project name cannot be empty');
    }
    if (!data.schemaVersion) {
      throw new InvalidProjectDataError('schemaVersion', 'schemaVersion is required');
    }
    if (!data.languages || data.languages.length === 0) {
      throw new InvalidProjectDataError('languages', 'languages must contain at least one language');
    }
    if (!data.languages.includes(data.defaultLanguage)) {
      throw new InvalidProjectDataError(
        'defaultLanguage',
        `defaultLanguage '${data.defaultLanguage}' must be in languages [${data.languages.join(', ')}]`
      );
    }

    this.id = new ProjectId(data.id);
    this.slug = new ProjectSlug(data.slug);
    this.name = data.name.trim();
    this.shortName = data.shortName?.trim();
    this.type = new ProjectTypeVo(data.type);
    this.status = new ProjectStatusVo(data.status);
    this.schemaVersion = data.schemaVersion.trim();
    this.currentVersion = new ProjectVersionVo(data.currentVersion);
    this.defaultLanguage = data.defaultLanguage;
    this.languages = [...data.languages];
    this.theme = data.theme;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.metadata = data.metadata;
    this.kicker = data.kicker;

    this.versions = new Map();
    if (data.versions && Array.isArray(data.versions)) {
      for (const vData of data.versions) {
        const v = new ProjectVersionEntity(vData);
        this.versions.set(v.getVersion(), v);
      }
    }

    // Ensure the declared currentVersion exists
    if (!this.versions.has(this.currentVersion.getValue())) {
      throw new InvalidProjectDataError(
        'currentVersion',
        `currentVersion '${this.currentVersion.getValue()}' is not present in versions list`
      );
    }
  }

  getId(): string {
    return this.id.getValue();
  }

  getSlug(): string {
    return this.slug.getValue();
  }

  getName(): string {
    return this.name;
  }

  getShortName(): string | undefined {
    return this.shortName;
  }

  getType(): ProjectType {
    return this.type.getValue();
  }

  getStatus(): ProjectStatus {
    return this.status.getValue();
  }

  getSchemaVersion(): string {
    return this.schemaVersion;
  }

  getCurrentVersion(): string {
    return this.currentVersion.getValue();
  }

  getDefaultLanguage(): Language {
    return this.defaultLanguage;
  }

  getLanguages(): Language[] {
    return [...this.languages];
  }

  getTheme(): string | undefined {
    return this.theme;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  getUpdatedAt(): string {
    return this.updatedAt;
  }

  getMetadata(): Record<string, any> | undefined {
    return this.metadata;
  }

  getKicker(): { es: string; en: string } | undefined {
    return this.kicker;
  }

  getCurrentVersionEntity(): ProjectVersionEntity {
    return this.versions.get(this.getCurrentVersion())!;
  }

  getVersion(version: string): ProjectVersionEntity | null {
    return this.versions.get(version) || null;
  }

  getVersions(): ProjectVersionEntity[] {
    return Array.from(this.versions.values());
  }

  toSummary(): ProjectSummary {
    const currentVer = this.getCurrentVersionEntity();
    const execSumSection = currentVer.getSection('EXECUTIVE_SUMMARY');
    const desc = execSumSection?.getContent()?.coreValueProposition?.es ||
      execSumSection?.getContent()?.elevatorPitch?.es ||
      this.name;

    return {
      id: this.getId(),
      slug: this.getSlug(),
      name: this.getName(),
      description: desc,
      status: this.getStatus(),
      type: this.getType(),
      projectVersion: this.getCurrentVersion(),
      schemaVersion: this.getSchemaVersion(),
      defaultLanguage: this.getDefaultLanguage(),
      availableLanguages: this.getLanguages(),
      theme: this.getTheme(),
      kicker: this.getKicker()
    };
  }

  toJSON(): ProjectTwinData {
    return {
      id: this.getId(),
      slug: this.getSlug(),
      name: this.getName(),
      shortName: this.getShortName(),
      type: this.getType(),
      status: this.getStatus(),
      schemaVersion: this.getSchemaVersion(),
      currentVersion: this.getCurrentVersion(),
      defaultLanguage: this.getDefaultLanguage(),
      languages: this.getLanguages(),
      theme: this.getTheme(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      metadata: this.metadata,
      kicker: this.getKicker(),
      versions: this.getVersions().map(v => v.toJSON())
    };
  }
}
