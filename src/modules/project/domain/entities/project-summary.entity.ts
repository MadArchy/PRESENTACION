import { ProjectSummary, ProjectStatus, Language } from '../project.types';
import { ProjectId } from '../value-objects/project-id.vo';
import { ProjectSlug } from '../value-objects/project-slug.vo';
import { ProjectStatusVo } from '../value-objects/project-status.vo';
import { ProjectVersionVo } from '../value-objects/project-version.vo';
import { InvalidProjectDataError } from '../errors/project-domain.error';

export class ProjectSummaryEntity {
  private readonly id: ProjectId;
  private readonly slug: ProjectSlug;
  private readonly name: string;
  private readonly description: string;
  private readonly status: ProjectStatusVo;
  private readonly projectVersion: ProjectVersionVo;
  private readonly schemaVersion: string;
  private readonly defaultLanguage: Language;
  private readonly availableLanguages: Language[];
  private readonly theme?: string;
  private readonly totalSlides?: number;
  private readonly kicker?: { es: string; en: string };

  constructor(data: ProjectSummary) {
    if (!data.name || data.name.trim().length === 0) {
      throw new InvalidProjectDataError('name', 'Project name cannot be empty');
    }
    if (!data.schemaVersion || data.schemaVersion.trim().length === 0) {
      throw new InvalidProjectDataError('schemaVersion', 'schemaVersion is required');
    }
    if (!data.availableLanguages || data.availableLanguages.length === 0) {
      throw new InvalidProjectDataError('availableLanguages', 'availableLanguages must contain at least one language');
    }
    if (!data.availableLanguages.includes(data.defaultLanguage)) {
      throw new InvalidProjectDataError(
        'defaultLanguage',
        `defaultLanguage '${data.defaultLanguage}' must be in availableLanguages [${data.availableLanguages.join(', ')}]`
      );
    }

    this.id = new ProjectId(data.id);
    this.slug = new ProjectSlug(data.slug);
    this.name = data.name.trim();
    this.description = data.description?.trim() || '';
    this.status = new ProjectStatusVo(data.status);
    this.projectVersion = new ProjectVersionVo(data.projectVersion);
    this.schemaVersion = data.schemaVersion.trim();
    this.defaultLanguage = data.defaultLanguage;
    this.availableLanguages = [...data.availableLanguages];
    this.theme = data.theme;
    this.totalSlides = data.totalSlides;
    this.kicker = data.kicker;
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

  getDescription(): string {
    return this.description;
  }

  getStatus(): ProjectStatus {
    return this.status.getValue();
  }

  getProjectVersion(): string {
    return this.projectVersion.getValue();
  }

  getSchemaVersion(): string {
    return this.schemaVersion;
  }

  getDefaultLanguage(): Language {
    return this.defaultLanguage;
  }

  getAvailableLanguages(): Language[] {
    return [...this.availableLanguages];
  }

  getTheme(): string | undefined {
    return this.theme;
  }

  getTotalSlides(): number | undefined {
    return this.totalSlides;
  }

  getKicker(): { es: string; en: string } | undefined {
    return this.kicker;
  }

  toJSON(): ProjectSummary {
    return {
      id: this.getId(),
      slug: this.getSlug(),
      name: this.getName(),
      description: this.getDescription(),
      status: this.getStatus(),
      projectVersion: this.getProjectVersion(),
      schemaVersion: this.getSchemaVersion(),
      defaultLanguage: this.getDefaultLanguage(),
      availableLanguages: this.getAvailableLanguages(),
      theme: this.getTheme(),
      totalSlides: this.getTotalSlides(),
      kicker: this.getKicker()
    };
  }
}
