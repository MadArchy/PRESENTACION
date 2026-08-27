import { NarrativePlanEntity } from '../../domain/entities/narrative-plan.entity';
import { ClaimRepository } from '../../../claim/domain/ports/claim-repository.port';
import { TrustReadiness } from '../../../claim/domain/claim.types';
import { ProjectSectionType } from '../../../project/domain/project.types';

export interface NarrativeTrustWarning {
  code: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  claimId: string;
  sectionType: ProjectSectionType;
  message: string;
}

export interface NarrativeTrustContext {
  narrativePlanId: string;
  projectId: string;
  claimIds: string[];
  unsupportedMaterialClaims: string[];
  contradictedClaims: string[];
  warnings: NarrativeTrustWarning[];
  trustReadiness: TrustReadiness;
  totalReferencedClaims: number;
}

export class AnnotateNarrativeTrustUseCase {
  constructor(private readonly claimRepository: ClaimRepository) {}

  async execute(plan: NarrativePlanEntity): Promise<NarrativeTrustContext> {
    const projectId = plan.getProjectId();
    const projectVersion = plan.getProjectVersion();
    const steps = plan.getSteps();

    const sectionTypes = new Set<ProjectSectionType>(steps.map(s => s.getSectionType()));
    const allProjectClaims = await this.claimRepository.listByProject(projectId, projectVersion);

    const relevantClaims = allProjectClaims.filter(c => sectionTypes.has(c.getSectionType()) && c.getStatus() === 'ACTIVE');

    const claimIds: string[] = [];
    const unsupportedMaterialClaims: string[] = [];
    const contradictedClaims: string[] = [];
    const warnings: NarrativeTrustWarning[] = [];

    let criticalUnsupportedCount = 0;
    let highUnsupportedCount = 0;

    for (const claim of relevantClaims) {
      claimIds.push(claim.getId());
      const isContradicted = claim.getSupportStatus() === 'CONTRADICTED';
      const isFact = claim.getType() === 'FACT';
      const isUnsupported = claim.getSupportStatus() === 'UNSUPPORTED';
      const isMaterial = claim.getMateriality() === 'CRITICAL' || claim.getMateriality() === 'HIGH';

      if (isContradicted) {
        contradictedClaims.push(claim.getId());
        warnings.push({
          code: 'CONTRADICTED_CLAIM_IN_NARRATIVE',
          severity: 'CRITICAL',
          claimId: claim.getId(),
          sectionType: claim.getSectionType(),
          message: `Claim '${claim.getId()}' in section '${claim.getSectionType()}' is contradicted by active repository evidence.`
        });
      }

      if (isFact && isUnsupported && isMaterial) {
        unsupportedMaterialClaims.push(claim.getId());
        if (claim.getMateriality() === 'CRITICAL') criticalUnsupportedCount++;
        if (claim.getMateriality() === 'HIGH') highUnsupportedCount++;

        warnings.push({
          code: 'UNSUPPORTED_FACT_IN_NARRATIVE',
          severity: claim.getMateriality() === 'CRITICAL' ? 'CRITICAL' : 'WARNING',
          claimId: claim.getId(),
          sectionType: claim.getSectionType(),
          message: `Material FACT '${claim.getId()}' in section '${claim.getSectionType()}' lacks verified evidence.`
        });
      }
    }

    let trustReadiness: TrustReadiness = 'TRUST_READY';
    if (contradictedClaims.length > 0 || criticalUnsupportedCount > 0) {
      trustReadiness = 'TRUST_NOT_READY';
    } else if (highUnsupportedCount > 0 || unsupportedMaterialClaims.length > 0) {
      trustReadiness = 'TRUST_READY_WITH_WARNINGS';
    }

    return {
      narrativePlanId: plan.getId(),
      projectId,
      claimIds,
      unsupportedMaterialClaims,
      contradictedClaims,
      warnings,
      trustReadiness,
      totalReferencedClaims: relevantClaims.length
    };
  }
}
