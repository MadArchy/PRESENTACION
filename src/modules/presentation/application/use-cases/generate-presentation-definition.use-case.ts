import { ProjectRepository } from '../../../project/domain/ports/project-repository.port';
import { PresentationProfileRepository } from '../../domain/ports/presentation-profile-repository.port';
import { PresentationThemeRepository } from '../../domain/ports/presentation-theme-repository.port';
import { ClaimRepository } from '../../../claim/domain/ports/claim-repository.port';
import { NarrativePlanEntity } from '../../../narrative/domain/entities/narrative-plan.entity';
import { AnnotateNarrativeTrustUseCase } from '../../../narrative/application/use-cases/annotate-narrative-trust.use-case';
import { PresentationCompiler } from '../../domain/services/presentation-compiler.service';
import { PresentationDefinitionEntity } from '../../domain/entities/presentation-definition.entity';
import { PresentationNotFoundError } from '../../domain/errors/presentation-domain.error';

export interface GeneratePresentationRequest {
  projectId: string;
  narrativePlan: NarrativePlanEntity;
  presentationProfileId?: string;
  themeId?: string;
}

export class GeneratePresentationDefinitionUseCase {
  private readonly compiler = new PresentationCompiler();

  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly profileRepository: PresentationProfileRepository,
    private readonly themeRepository: PresentationThemeRepository,
    private readonly claimRepository: ClaimRepository,
    private readonly annotateTrustUseCase: AnnotateNarrativeTrustUseCase
  ) {}

  async execute(req: GeneratePresentationRequest): Promise<PresentationDefinitionEntity> {
    const project = await this.projectRepository.findBySlug(req.projectId);
    if (!project) {
      throw new PresentationNotFoundError(`Project '${req.projectId}' not found`);
    }

    const profileId = req.presentationProfileId || `${req.narrativePlan.getRequest().audience.toLowerCase()}-executive`;
    let profile = await this.profileRepository.findById(profileId);
    if (!profile) {
      profile = (await this.profileRepository.list())[0];
    }

    const themeId = req.themeId || 'executive-dark';
    let theme = await this.themeRepository.findById(themeId);
    if (!theme) {
      theme = (await this.themeRepository.list())[0];
    }

    const trustContext = await this.annotateTrustUseCase.execute(req.narrativePlan);
    const claims = await this.claimRepository.listByProject(project.getId(), project.getCurrentVersion());

    return this.compiler.compile(
      project,
      req.narrativePlan,
      trustContext,
      claims,
      profile,
      theme
    );
  }
}
