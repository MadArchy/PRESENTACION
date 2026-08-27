import { ProjectRepository } from '../../domain/ports/project-repository.port';
import { ProjectTwinValidator } from '../../domain/validation/project-twin.validator';
import { ProjectValidationResult } from '../../domain/project.types';
import { ProjectNotFoundError } from '../../domain/errors/project-domain.error';

export class ValidateProjectTwinUseCase {
  private readonly validator: ProjectTwinValidator;

  constructor(private readonly projectRepository: ProjectRepository) {
    this.validator = new ProjectTwinValidator();
  }

  async execute(projectIdOrSlug: string): Promise<ProjectValidationResult> {
    let project = await this.projectRepository.findById(projectIdOrSlug);
    if (!project) {
      project = await this.projectRepository.findBySlug(projectIdOrSlug);
    }

    if (!project) {
      throw new ProjectNotFoundError(projectIdOrSlug);
    }

    return this.validator.validate(project);
  }
}
