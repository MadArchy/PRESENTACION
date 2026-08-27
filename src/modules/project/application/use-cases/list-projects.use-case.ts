import { ProjectRepository } from '../../domain/ports/project-repository.port';
import { ProjectSummary } from '../../domain/project.types';
import { EventBus } from '../../../shared/events/event-bus';
import { ListProjectsQuery } from '../queries/list-projects.query';

export class ListProjectsUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly eventBus?: EventBus
  ) {}

  async execute(query?: ListProjectsQuery): Promise<ProjectSummary[]> {
    let projects = await this.projectRepository.list();

    if (query?.status) {
      projects = projects.filter(p => p.status === query.status);
    }
    if (query?.language) {
      projects = projects.filter(p => p.availableLanguages.includes(query.language!));
    }

    if (this.eventBus) {
      this.eventBus.publish('project.loaded', {
        projectsCount: projects.length,
        projects,
        loadedAt: new Date().toISOString()
      });
    }

    return projects;
  }
}
