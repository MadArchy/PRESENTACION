import { DocumentArtifactEntity } from '../../../modules/data-room/domain/entities/document-artifact.entity';

export function renderDataRoomDocuments(documents: DocumentArtifactEntity[]): string {
  if (!documents || documents.length === 0) {
    return `
      <div style="color: #64748b; font-size: 0.85rem; font-style: italic; padding: 24px; text-align: center;">
        No hay documentos registrados en esta sala de diligencia.
      </div>
    `;
  }

  return `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--gold); text-transform: uppercase;">
          Documentos de Diligencia (${documents.length})
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${documents.map(doc => {
          let statusColor = '#10b981';
          let statusBg = 'rgba(16,185,129,0.1)';
          if (doc.getStatus() === 'MISSING') { statusColor = '#ef4444'; statusBg = 'rgba(239,68,68,0.1)'; }
          if (doc.getStatus() === 'DRAFT' || doc.getStatus() === 'UNDER_REVIEW') { statusColor = '#f59e0b'; statusBg = 'rgba(245,158,11,0.1)'; }

          let confColor = '#94a3b8';
          if (doc.getConfidentiality() === 'CONFIDENTIAL') confColor = '#38bdf8';
          if (doc.getConfidentiality() === 'HIGHLY_CONFIDENTIAL') confColor = '#e879f9';

          return `
            <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 12px 16px; display: flex; flex-direction: column; gap: 8px;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span style="font-size: 0.92rem; font-weight: 700; color: #ffffff;">
                      ${doc.getTitle()}
                    </span>
                    <span style="font-family: var(--font-mono); font-size: 0.65rem; color: #94a3b8; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 3px;">
                      ${doc.getKind()}
                    </span>
                  </div>
                  ${doc.getDescription() ? `
                    <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.4;">
                      ${doc.getDescription()}
                    </div>
                  ` : ''}
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                  <span style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: ${confColor}; border: 1px solid ${confColor}44; padding: 2px 6px; border-radius: 4px;">
                    ${doc.getConfidentiality()}
                  </span>
                  <span style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: ${statusColor}; background: ${statusBg}; border: 1px solid ${statusColor}44; padding: 2px 6px; border-radius: 4px;">
                    ${doc.getStatus()}
                  </span>
                </div>
              </div>

              <!-- Metadata & Traceability Tags -->
              <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.72rem; color: #64748b; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 6px; font-family: var(--font-mono);">
                <span>Categoría: <strong style="color: #cbd5e1;">${doc.getCategory()}</strong></span>
                ${doc.getClaimRefs().length > 0 ? `
                  <span>Claims: <strong style="color: var(--gold);">${doc.getClaimRefs().join(', ')}</strong></span>
                ` : ''}
                ${doc.getEvidenceRefs().length > 0 ? `
                  <span>Evidencia: <strong style="color: #10b981;">${doc.getEvidenceRefs().join(', ')}</strong></span>
                ` : ''}
                ${doc.getAssetRef() ? `
                  <span>Asset: <span style="color: #94a3b8;">${doc.getAssetRef()}</span></span>
                ` : ''}
              </div>

            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
