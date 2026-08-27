import { ClaimRepository } from '../../domain/ports/claim-repository.port';
import { EvidenceRepository } from '../../../evidence/domain/ports/evidence-repository.port';
import { ClaimSupportEvaluator } from '../../domain/services/claim-support-evaluator.service';
import { ProjectTrustSummary, TrustReadiness } from '../../domain/claim.types';

export class BuildProjectTrustSummaryUseCase {
  constructor(
    private readonly claimRepository: ClaimRepository,
    private readonly evidenceRepository: EvidenceRepository
  ) {}

  async execute(projectId: string, projectVersion?: string): Promise<ProjectTrustSummary> {
    const claims = await this.claimRepository.listByProject(projectId, projectVersion);
    const evidence = await this.evidenceRepository.listByProject(projectId, projectVersion);

    let criticalFactsSupported = 0;
    let criticalFactsUnsupported = 0;
    let highMaterialitySupported = 0;
    let highMaterialityUnsupported = 0;
    let contradictedClaimsCount = 0;
    let unreviewedClaimsCount = 0;

    for (const claim of claims) {
      if (claim.getStatus() !== 'ACTIVE') continue;

      const isCritical = claim.getMateriality() === 'CRITICAL';
      const isHigh = claim.getMateriality() === 'HIGH';
      const isFact = claim.getType() === 'FACT';
      const isSupported = claim.getSupportStatus() === 'SUPPORTED';
      const isUnsupported = claim.getSupportStatus() === 'UNSUPPORTED';
      const isContradicted = claim.getSupportStatus() === 'CONTRADICTED';
      const isUnreviewed = claim.getReviewStatus() === 'UNREVIEWED';

      if (isContradicted) contradictedClaimsCount++;
      if (isUnreviewed) unreviewedClaimsCount++;

      if (isCritical && isFact) {
        if (isSupported) criticalFactsSupported++;
        if (isUnsupported) criticalFactsUnsupported++;
      }

      if (isHigh) {
        if (isSupported) highMaterialitySupported++;
        if (isUnsupported) highMaterialityUnsupported++;
      }
    }

    let readiness: TrustReadiness = 'TRUST_READY';

    if (criticalFactsUnsupported > 0 || contradictedClaimsCount > 0) {
      readiness = 'TRUST_NOT_READY';
    } else if (highMaterialityUnsupported > 0 || unreviewedClaimsCount > 0) {
      readiness = 'TRUST_READY_WITH_WARNINGS';
    }

    return {
      projectId,
      projectVersion: projectVersion || '0.1.0',
      readiness,
      criticalFactsSupported,
      criticalFactsUnsupported,
      highMaterialitySupported,
      highMaterialityUnsupported,
      contradictedClaimsCount,
      unreviewedClaimsCount,
      totalClaimsCount: claims.length,
      totalEvidenceCount: evidence.length,
      governanceEngineVersion: ClaimSupportEvaluator.GOVERNANCE_ENGINE_VERSION,
      policyVersion: ClaimSupportEvaluator.POLICY_VERSION,
      generatedAt: new Date().toISOString()
    };
  }
}
