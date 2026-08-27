import { DocumentArtifactRepository } from '../../domain/ports/document-artifact-repository.port';
import { DiligenceRequestRepository } from '../../domain/ports/diligence-request-repository.port';
import { ClaimRepository } from '../../../claim/domain/ports/claim-repository.port';
import { DiligenceGapDetectorService } from '../../domain/services/diligence-gap-detector.service';
import { DiligenceReadinessPolicy } from '../../domain/policies/diligence-readiness.policy';
import { DiligenceReadinessExplanation, DiligenceGap } from '../../domain/data-room.types';

export class EvaluateDiligenceReadinessUseCase {
  constructor(
    private readonly documentRepository: DocumentArtifactRepository,
    private readonly requestRepository: DiligenceRequestRepository,
    private readonly claimRepository?: ClaimRepository,
    private readonly gapDetector = new DiligenceGapDetectorService()
  ) {}

  async execute(projectId: string): Promise<{
    explanation: DiligenceReadinessExplanation;
    gaps: DiligenceGap[];
  }> {
    const docs = await this.documentRepository.listByProject(projectId);
    const reqs = await this.requestRepository.listByProject(projectId);
    const claims = this.claimRepository ? await this.claimRepository.listByProject(projectId) : undefined;

    const gaps = this.gapDetector.detectGaps(docs, reqs, claims);
    const explanation = DiligenceReadinessPolicy.evaluate(gaps, reqs, claims);

    return { explanation, gaps };
  }
}
