import { ProjectSummaryEntity } from '../entities/project-summary.entity';

export interface ProjectLoadedEventPayload {
  projectsCount: number;
  projects: ProjectSummaryEntity[];
  loadedAt: string;
}

export class ProjectLoadedEvent {
  readonly eventName = 'project.loaded';
  readonly payload: ProjectLoadedEventPayload;

  constructor(projects: ProjectSummaryEntity[]) {
    this.payload = {
      projectsCount: projects.length,
      projects,
      loadedAt: new Date().toISOString()
    };
  }
}
