import { DiligenceGap } from '../data-room.types';
import { DocumentArtifactEntity } from '../entities/document-artifact.entity';
import { DiligenceRequestEntity } from '../entities/diligence-request.entity';
import { ClaimEntity } from '../../../claim/domain/entities/claim.entity';

export class DiligenceGapDetectorService {
  detectGaps(
    documents: DocumentArtifactEntity[],
    requests: DiligenceRequestEntity[],
    claims?: ClaimEntity[]
  ): DiligenceGap[] {
    const gaps: DiligenceGap[] = [];
    let counter = 1;

    // 1. Missing documents detection
    for (const doc of documents) {
      if (doc.isMissing()) {
        gaps.push({
          id: `gap-${counter++}`,
          category: doc.getCategory(),
          type: 'MISSING_DOCUMENT',
          severity: 'HIGH',
          title: `Documento faltante: ${doc.getTitle()}`,
          explanation: `El documento '${doc.getTitle()}' está catalogado como requerido pero no ha sido provisto en el repositorio.`,
          relatedRequestIds: doc.getRequestRefs(),
          relatedClaimIds: doc.getClaimRefs(),
          relatedEvidenceIds: doc.getEvidenceRefs(),
          relatedDocumentIds: [doc.getId()],
          remediationHint: 'Adjuntar o cargar la versión firmada/final del documento.'
        });
      } else if (doc.isStaleOrInvalid()) {
        gaps.push({
          id: `gap-${counter++}`,
          category: doc.getCategory(),
          type: 'STALE_DOCUMENT',
          severity: 'MEDIUM',
          title: `Documento expirado o superado: ${doc.getTitle()}`,
          explanation: `El documento '${doc.getTitle()}' se encuentra en estado '${doc.getStatus()}'.`,
          relatedRequestIds: doc.getRequestRefs(),
          relatedClaimIds: doc.getClaimRefs(),
          relatedEvidenceIds: doc.getEvidenceRefs(),
          relatedDocumentIds: [doc.getId()],
          remediationHint: 'Reemplazar con la versión actualizada y vigente.'
        });
      }
    }

    // 2. Blocked or Open high-priority requests
    for (const req of requests) {
      if (req.isBlocked()) {
        gaps.push({
          id: `gap-${counter++}`,
          category: req.getCategory(),
          type: 'OPEN_REQUEST',
          severity: req.isCriticalOrHigh() ? 'BLOCKING' : 'HIGH',
          title: `Solicitud bloqueada: ${req.getTitle()}`,
          explanation: `La solicitud de diligencia '${req.getTitle()}' no puede satisfacerse debido a impedimentos activos.`,
          relatedRequestIds: [req.getId()],
          relatedClaimIds: req.getLinkedClaimIds(),
          relatedEvidenceIds: req.getLinkedEvidenceIds(),
          relatedDocumentIds: req.getLinkedDocumentIds(),
          remediationHint: 'Revisar dependencias bloqueantes y proveer documentación sustituta.'
        });
      } else if (req.getStatus() === 'OPEN' && req.isCriticalOrHigh()) {
        gaps.push({
          id: `gap-${counter++}`,
          category: req.getCategory(),
          type: 'OPEN_REQUEST',
          severity: 'MEDIUM',
          title: `Solicitud prioritaria abierta: ${req.getTitle()}`,
          explanation: `La solicitud '${req.getTitle()}' de prioridad '${req.getPriority()}' continúa sin respuesta documental.`,
          relatedRequestIds: [req.getId()],
          relatedClaimIds: req.getLinkedClaimIds(),
          relatedEvidenceIds: req.getLinkedEvidenceIds(),
          relatedDocumentIds: req.getLinkedDocumentIds(),
          remediationHint: 'Cargar el artefacto correspondiente para satisfacer la solicitud.'
        });
      }
    }

    // 3. Unsupported material claims
    if (claims) {
      for (const claim of claims) {
        if ((claim.getMateriality() === 'CRITICAL' || claim.getMateriality() === 'HIGH') && claim.getSupportStatus() !== 'SUPPORTED') {
          gaps.push({
            id: `gap-${counter++}`,
            category: 'LEGAL',
            type: 'UNSUPPORTED_MATERIAL_CLAIM',
            severity: claim.getMateriality() === 'CRITICAL' ? 'BLOCKING' : 'HIGH',
            title: `Afirmación material no soportada: ${claim.getId()}`,
            explanation: `El claim material '${claim.getText().es || claim.getText().en}' se encuentra en estado '${claim.getSupportStatus()}'.`,
            relatedRequestIds: [],
            relatedClaimIds: [claim.getId()],
            relatedEvidenceIds: claim.getEvidenceLinkIds(),
            relatedDocumentIds: [],
            remediationHint: 'Vincular evidencia documental primaria que sustente formalmente la afirmación.'
          });
        }
      }
    }

    return gaps;
  }
}
