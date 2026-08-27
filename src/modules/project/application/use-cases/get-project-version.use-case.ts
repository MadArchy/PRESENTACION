import { ProjectRepository } from '../../domain/ports/project-repository.port';
import { ProjectVersionEntity } from '../../domain/entities/project-version.entity';
import { ProjectNotFoundError } from '../../domain/errors/project-domain.error';
import { GetProjectVersionQuery } from '../queries/get-project-version.query';

export class GetProjectVersionUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(query: GetProjectVersionQuery): Promise<ProjectVersionEntity> {
    const version = await this.projectRepository.findVersion(query.projectId, query.version);
    if (!version) {
      throw new ProjectNotFoundError(`${query.projectId}@${query.version}`);
    }
    return version;
  }
}
