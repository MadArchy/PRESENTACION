import {
  DiligenceReadiness,
  DiligenceReadinessExplanation,
  DiligenceGap
} from '../data-room.types';
import { DiligenceRequestEntity } from '../entities/diligence-request.entity';
import { ClaimEntity } from '../../../claim/domain/entities/claim.entity';

export class DiligenceReadinessPolicy {
  public static readonly POLICY_VERSION = '1.0';

  static evaluate(
    gaps: DiligenceGap[],
    requests: DiligenceRequestEntity[],
    claims?: ClaimEntity[]
  ): DiligenceReadinessExplanation {
    const reasonCodes: string[] = [];
    const blockingGapIds: string[] = [];
    const warningGapIds: string[] = [];

    // 1. Check for blocking gaps
    for (const gap of gaps) {
      if (gap.severity === 'BLOCKING') {
        blockingGapIds.push(gap.id);
        reasonCodes.push(`BLOCKING_GAP_${gap.type}`);
      } else if (gap.severity === 'HIGH' || gap.severity === 'MEDIUM') {
        warningGapIds.push(gap.id);
      }
    }

    // 2. Check for blocked critical/high requests
    for (const req of requests) {
      if (req.isBlocked() && req.isCriticalOrHigh()) {
        reasonCodes.push(`BLOCKED_CRITICAL_REQUEST_${req.getId()}`);
      }
    }

    // 3. Check for unsupported material FACT claims
    if (claims) {
      for (const c of claims) {
        if (c.getType() === 'FACT' && (c.getMateriality() === 'CRITICAL' || c.getMateriality() === 'HIGH')) {
          if (c.getSupportStatus() === 'UNSUPPORTED' || c.getSupportStatus() === 'CONTRADICTED') {
            reasonCodes.push(`UNSUPPORTED_MATERIAL_FACT_${c.getId()}`);
          }
        }
      }
    }

    let readiness: DiligenceReadiness = 'DILIGENCE_READY';
    let message = 'El proyecto cumple con los criterios de diligencia establecidos por la política v1.0.';

    if (blockingGapIds.length > 0 || reasonCodes.some(r => r.startsWith('BLOCKED_') || r.startsWith('UNSUPPORTED_MATERIAL_FACT_'))) {
      readiness = 'DILIGENCE_NOT_READY';
      message = 'Existen brechas bloqueantes, solicitudes críticas bloqueadas o afirmaciones materiales no sustentadas.';
    } else if (warningGapIds.length > 0 || requests.some(r => r.getStatus() === 'OPEN' && r.isCriticalOrHigh())) {
      readiness = 'DILIGENCE_READY_WITH_WARNINGS';
      message = 'El proyecto tiene material base suficiente pero presenta solicitudes abiertas o brechas de nivel medio/alto.';
    }

    return {
      readiness,
      policyVersion: this.POLICY_VERSION,
      reasonCodes,
      blockingGapIds,
      warningGapIds,
      message,
      evaluatedAt: new Date().toISOString()
    };
  }
}
