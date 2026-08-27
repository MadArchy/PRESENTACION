import { ClaimRepository } from '../../domain/ports/claim-repository.port';
import { ProjectSectionType } from '../../../project/domain/project.types';
import {
  ClaimType,
  ClaimSupportStatus,
  ClaimMateriality,
  ProjectClaimCoverageReport,
  SectionClaimCoverage
} from '../../domain/claim.types';

export class EvaluateProjectClaimCoverageUseCase {
  constructor(private readonly claimRepository: ClaimRepository) {}

  async execute(projectId: string, projectVersion?: string): Promise<ProjectClaimCoverageReport> {
    const claims = await this.claimRepository.listByProject(projectId, projectVersion);

    const byType: Record<ClaimType, number> = {
      FACT: 0,
      ESTIMATE: 0,
      ASSUMPTION: 0,
      TARGET: 0,
      HYPOTHESIS: 0
    };

    const bySupportStatus: Record<ClaimSupportStatus, number> = {
      NOT_REQUIRED: 0,
      UNSUPPORTED: 0,
      PARTIALLY_SUPPORTED: 0,
      SUPPORTED: 0,
      CONTRADICTED: 0
    };

    const byMateriality: Record<ClaimMateriality, number> = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      CRITICAL: 0
    };

    const sectionMap = new Map<ProjectSectionType, SectionClaimCoverage>();

    for (const claim of claims) {
      byType[claim.getType()]++;
      bySupportStatus[claim.getSupportStatus()]++;
      byMateriality[claim.getMateriality()]++;

      const secType = claim.getSectionType();
      if (!sectionMap.has(secType)) {
        sectionMap.set(secType, {
          sectionType: secType,
          totalClaims: 0,
          factsCount: 0,
          estimatesCount: 0,
          assumptionsCount: 0,
          targetsCount: 0,
          hypothesesCount: 0,
          supportedFactsCount: 0,
          unsupportedFactsCount: 0
        });
      }

      const secCov = sectionMap.get(secType)!;
      secCov.totalClaims++;
      if (claim.getType() === 'FACT') {
        secCov.factsCount++;
        if (claim.getSupportStatus() === 'SUPPORTED') secCov.supportedFactsCount++;
        if (claim.getSupportStatus() === 'UNSUPPORTED') secCov.unsupportedFactsCount++;
      } else if (claim.getType() === 'ESTIMATE') {
        secCov.estimatesCount++;
      } else if (claim.getType() === 'ASSUMPTION') {
        secCov.assumptionsCount++;
      } else if (claim.getType() === 'TARGET') {
        secCov.targetsCount++;
      } else if (claim.getType() === 'HYPOTHESIS') {
        secCov.hypothesesCount++;
      }
    }

    return {
      projectId,
      projectVersion: projectVersion || '0.1.0',
      totalClaims: claims.length,
      byType,
      bySupportStatus,
      byMateriality,
      bySection: Array.from(sectionMap.values()),
      generatedAt: new Date().toISOString()
    };
  }
}
