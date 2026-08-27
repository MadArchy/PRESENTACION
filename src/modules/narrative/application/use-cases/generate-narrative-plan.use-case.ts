import { ProjectRepository } from '../../../project/domain/ports/project-repository.port';
import { NarrativeProfileRepository } from '../../domain/ports/narrative-profile-repository.port';
import { NarrativeCompiler } from '../../domain/services/narrative-compiler.service';
import { NarrativePlanEntity } from '../../domain/entities/narrative-plan.entity';
import { NarrativeRequest } from '../../domain/narrative.types';
import { ProjectNotFoundError } from '../../../project/domain/errors/project-domain.error';
import { EventBus } from '../../../shared/events/event-bus';

export class GenerateNarrativePlanUseCase {
  private readonly compiler = new NarrativeCompiler();

  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly profileRepository: NarrativeProfileRepository,
    private readonly eventBus?: EventBus
  ) {}

  async execute(request: NarrativeRequest): Promise<NarrativePlanEntity> {
    let project = await this.projectRepository.findById(request.projectId);
    if (!project) {
      project = await this.projectRepository.findBySlug(request.projectId);
    }
    if (!project) {
      throw new ProjectNotFoundError(request.projectId);
    }

    let profile = null;
    if (request.profileId) {
      profile = await this.profileRepository.findById(request.profileId);
    }
    if (!profile) {
      profile = await this.profileRepository.findByAudience(request.audience);
    }

    const plan = this.compiler.compile(project, request, profile || undefined);

    if (this.eventBus) {
      this.eventBus.publish('narrative.generated', {
        planId: plan.getId(),
        projectId: plan.getProjectId(),
        audience: request.audience,
        readiness: plan.getReadiness(),
        stepsCount: plan.getSteps().length,
        generatedAt: plan.getGeneratedAt()
      });
    }

    return plan;
  }
}
