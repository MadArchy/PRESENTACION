import { ProjectRepository } from '../../../project/domain/ports/project-repository.port';
import { ClaimRepository } from '../../../claim/domain/ports/claim-repository.port';
import { EvidenceRepository } from '../../../evidence/domain/ports/evidence-repository.port';
import { AiModelPort } from '../../domain/ports/ai-model.port';
import { CopilotContextBuilderService } from '../../domain/services/copilot-context-builder.service';
import { PromptAssemblerService } from '../../domain/services/prompt-assembler.service';
import { ContextMinimizationPolicy } from '../../domain/policies/context-minimization.policy';
import { CopilotRequestEntity } from '../../domain/entities/copilot-request.entity';
import { CopilotResultEntity } from '../../domain/entities/copilot-result.entity';
import { CopilotRequest, CopilotResult } from '../../domain/copilot.types';
import { CopilotDomainError } from '../../domain/errors/copilot-domain.error';

export class ExecuteCopilotTaskUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly claimRepository: ClaimRepository,
    private readonly evidenceRepository: EvidenceRepository,
    private readonly aiModel: AiModelPort,
    private readonly contextBuilder = new CopilotContextBuilderService(),
    private readonly promptAssembler = new PromptAssemblerService()
  ) {}

  async execute(requestData: CopilotRequest): Promise<CopilotResultEntity> {
    const requestEntity = new CopilotRequestEntity(requestData);
    const projectId = requestEntity.getProjectId();

    const project = await this.projectRepository.findBySlug(projectId);
    if (!project) {
      throw new CopilotDomainError(`Project '${projectId}' not found`);
    }

    const scopes = ContextMinimizationPolicy.getRequiredScopes(requestEntity.getTaskType());
    const claims = scopes.includes('CLAIMS') ? await this.claimRepository.listByProject(projectId) : undefined;
    const evidence = scopes.includes('EVIDENCE') ? await this.evidenceRepository.listByProject(projectId) : undefined;

    const contextBundle = this.contextBuilder.build(project, scopes, claims, evidence);
    const completionReq = this.promptAssembler.assemble(requestEntity, contextBundle);

    const startTime = Date.now();
    const response = await this.aiModel.complete(completionReq);
    const durationMs = Date.now() - startTime;

    const structured = response.structuredJson || {};
    const resultData: CopilotResult = {
      id: `res-${Date.now()}`,
      requestId: requestEntity.getId(),
      status: 'COMPLETED',
      summary: (structured.summary as string) || response.rawText,
      findings: (structured.findings as any[]) || [],
      proposals: (structured.proposals as any[]) || [],
      citations: (structured.citations as any[]) || [],
      grounding: (structured.grounding as any) || {
        sourcesAnalyzedCount: contextBundle.sourceRefs.length,
        claimsReferencedCount: claims ? claims.length : 0,
        evidenceItemsReferencedCount: evidence ? evidence.length : 0,
        limitationsAcknowledged: true
      },
      warnings: [],
      providerMetadata: {
        provider: requestEntity.getProviderConfig().provider,
        modelId: requestEntity.getProviderConfig().modelId,
        durationMs
      },
      generatedAt: new Date().toISOString()
    };

    return new CopilotResultEntity(resultData);
  }
}
