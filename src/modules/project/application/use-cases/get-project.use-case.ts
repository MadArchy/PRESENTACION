import { ProjectRepository } from '../../domain/ports/project-repository.port';
import { ProjectAggregate } from '../../domain/entities/project.aggregate';
import { EventBus } from '../../../shared/events/event-bus';
import { ProjectNotFoundError } from '../../domain/errors/project-domain.error';
import { GetProjectQuery } from '../queries/get-project.query';

export class GetProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly eventBus?: EventBus
  ) {}

  async execute(query: GetProjectQuery): Promise<ProjectAggregate> {
    let project = await this.projectRepository.findById(query.idOrSlug);
    if (!project) {
      project = await this.projectRepository.findBySlug(query.idOrSlug);
    }

    if (!project) {
      throw new ProjectNotFoundError(query.idOrSlug);
    }

    if (this.eventBus) {
      this.eventBus.publish('project.selected', {
        projectId: project.getId(),
        slug: project.getSlug(),
        selectedAt: new Date().toISOString()
      });
    }

    return project;
  }
}
