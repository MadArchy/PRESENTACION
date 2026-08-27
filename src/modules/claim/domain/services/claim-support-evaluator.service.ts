import { ClaimEntity } from '../entities/claim.entity';
import { EvidenceEntity } from '../../../evidence/domain/entities/evidence.entity';
import { EvidenceLinkEntity } from '../../../evidence/domain/entities/evidence-link.entity';
import { ClaimSupportStatus, ClaimSupportExplanation } from '../claim.types';

export class ClaimSupportEvaluator {
  public static readonly GOVERNANCE_ENGINE_VERSION = '1.0.0';
  public static readonly POLICY_VERSION = '1.0';

  evaluate(
    claim: ClaimEntity,
    links: EvidenceLinkEntity[],
    evidenceMap: Map<string, EvidenceEntity>
  ): ClaimSupportExplanation {
    const reasonCodes: string[] = [];
    const supportingEvidenceIds: string[] = [];
    const contradictingEvidenceIds: string[] = [];

    // Filter to active links for this claim
    const activeLinks = links.filter(l => l.getClaimId() === claim.getId() && l.isActive());

    let hasActiveSupport = false;
    let hasPartialSupport = false;
    let hasContradiction = false;

    for (const link of activeLinks) {
      const evidence = evidenceMap.get(link.getEvidenceId());
      if (!evidence) {
        reasonCodes.push('EVIDENCE_NOT_FOUND');
        continue;
      }

      const evStatus = evidence.getStatus();

      if (evStatus === 'INVALID') {
        reasonCodes.push('EVIDENCE_INVALID');
        continue;
      }
      if (evStatus === 'MISSING') {
        reasonCodes.push('EVIDENCE_MISSING');
        continue;
      }
      if (evStatus === 'SUPERSEDED') {
        reasonCodes.push('EVIDENCE_SUPERSEDED');
        continue;
      }
      if (evStatus === 'DISPUTED') {
        reasonCodes.push('EVIDENCE_DISPUTED');
      }

      if (link.getRelation() === 'CONTRADICTS') {
        hasContradiction = true;
        contradictingEvidenceIds.push(evidence.getId());
      } else if (link.getRelation() === 'SUPPORTS' && evStatus === 'AVAILABLE') {
        hasActiveSupport = true;
        supportingEvidenceIds.push(evidence.getId());
      } else if (link.getRelation() === 'PARTIALLY_SUPPORTS' && evStatus === 'AVAILABLE') {
        hasPartialSupport = true;
        supportingEvidenceIds.push(evidence.getId());
      }
    }

    let status: ClaimSupportStatus = 'NOT_REQUIRED';
    let message = '';

    const type = claim.getType();

    if (hasContradiction) {
      status = 'CONTRADICTED';
      if (type === 'FACT') reasonCodes.push('FACT_CONTRADICTED');
      else reasonCodes.push(`${type}_CONTRADICTED`);
      message = `Claim is contradicted by active evidence: ${contradictingEvidenceIds.join(', ')}`;
    } else {
      switch (type) {
        case 'FACT':
          if (hasActiveSupport) {
            status = 'SUPPORTED';
            reasonCodes.push('FACT_SUPPORTED');
            message = `Fact is supported by ${supportingEvidenceIds.length} verified evidence artifact(s).`;
          } else if (hasPartialSupport) {
            status = 'PARTIALLY_SUPPORTED';
            reasonCodes.push('FACT_PARTIALLY_SUPPORTED');
            message = 'Fact has partial evidence support but requires complete verification.';
          } else {
            status = 'UNSUPPORTED';
            reasonCodes.push('FACT_REQUIRES_EVIDENCE');
            message = 'Material fact lacks verified evidence in the project repository.';
          }
          break;

        case 'ESTIMATE':
          if (hasActiveSupport) {
            status = 'SUPPORTED';
            reasonCodes.push('ESTIMATE_SUPPORTED');
            message = 'Estimate is supported by documented calculations or dataset inputs.';
          } else if (hasPartialSupport) {
            status = 'PARTIALLY_SUPPORTED';
            reasonCodes.push('ESTIMATE_MISSING_CALCULATION');
            message = 'Estimate has partial references but lacks full calculation provenance.';
          } else {
            status = 'UNSUPPORTED';
            reasonCodes.push('ESTIMATE_UNSUPPORTED');
            message = 'Estimate lacks source inputs or calculation artifacts.';
          }
          break;

        case 'TARGET':
          if (hasActiveSupport || hasPartialSupport) {
            status = 'SUPPORTED';
            reasonCodes.push('TARGET_DOCUMENTED');
            message = 'Target is documented in business/financial model planning artifacts.';
          } else {
            status = 'NOT_REQUIRED';
            reasonCodes.push('TARGET_UNDOCUMENTED');
            message = 'Target is undeclared or lacks formal model documentation.';
          }
          break;

        case 'ASSUMPTION':
          status = 'NOT_REQUIRED';
          reasonCodes.push('ASSUMPTION_EVIDENCE_NOT_REQUIRED');
          message = 'Assumptions represent planning hypotheses; external evidence is not strictly required.';
          break;

        case 'HYPOTHESIS':
          status = 'NOT_REQUIRED';
          reasonCodes.push('HYPOTHESIS_PENDING_VALIDATION');
          message = 'Hypothesis is pending market/operational validation.';
          break;
      }
    }

    return {
      claimId: claim.getId(),
      status,
      reasonCodes,
      supportingEvidenceIds,
      contradictingEvidenceIds,
      message
    };
  }
}
