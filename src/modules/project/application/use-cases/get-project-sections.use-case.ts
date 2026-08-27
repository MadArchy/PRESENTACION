import { ProjectRepository } from '../../domain/ports/project-repository.port';
import { ProjectSectionEntity } from '../../domain/entities/project-section.entity';
import { ProjectNotFoundError } from '../../domain/errors/project-domain.error';
import { GetProjectSectionsQuery } from '../queries/get-project-sections.query';

export class GetProjectSectionsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(query: GetProjectSectionsQuery): Promise<ProjectSectionEntity[]> {
    const project = await this.projectRepository.findById(query.projectId);
    if (!project) {
      throw new ProjectNotFoundError(query.projectId);
    }

    const versionStr = query.version || project.getCurrentVersion();
    const version = project.getVersion(versionStr);
    if (!version) {
      throw new ProjectNotFoundError(`${query.projectId}@${versionStr}`);
    }

    return version.getSections();
  }
}
