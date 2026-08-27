import { DocumentArtifactRepository } from '../../domain/ports/document-artifact-repository.port';
import { DiligenceRequestRepository } from '../../domain/ports/diligence-request-repository.port';
import { DiligenceChecklistRepository } from '../../domain/ports/diligence-checklist-repository.port';
import { DiligenceCoverageEvaluatorService } from '../../domain/services/diligence-coverage-evaluator.service';
import { DiligenceCoverageReport } from '../../domain/data-room.types';

export class EvaluateDiligenceCoverageUseCase {
  constructor(
    private readonly documentRepository: DocumentArtifactRepository,
    private readonly requestRepository: DiligenceRequestRepository,
    private readonly checklistRepository: DiligenceChecklistRepository,
    private readonly coverageEvaluator = new DiligenceCoverageEvaluatorService()
  ) {}

  async execute(projectId: string, projectVersion = '1.0.0'): Promise<DiligenceCoverageReport> {
    const docs = await this.documentRepository.listByProject(projectId);
    const reqs = await this.requestRepository.listByProject(projectId);
    const checklist = await this.checklistRepository.getDefault();

    return this.coverageEvaluator.evaluate(projectId, projectVersion, docs, reqs, checklist);
  }
}
