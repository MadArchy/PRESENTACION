import { DiligenceRequestEntity } from '../../../modules/data-room/domain/entities/diligence-request.entity';

export function renderDataRoomRequests(requests: DiligenceRequestEntity[]): string {
  if (!requests || requests.length === 0) {
    return `
      <div style="color: #64748b; font-size: 0.85rem; font-style: italic; padding: 24px; text-align: center;">
        No hay solicitudes de diligencia registradas.
      </div>
    `;
  }

  return `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <span style="font-size: 0.82rem; font-weight: 700; color: var(--gold); text-transform: uppercase;">
        Solicitudes de Diligencia (${requests.length})
      </span>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${requests.map(req => {
          let statusColor = '#10b981';
          let statusBg = 'rgba(16,185,129,0.1)';
          if (req.getStatus() === 'OPEN') { statusColor = '#f59e0b'; statusBg = 'rgba(245,158,11,0.1)'; }
          if (req.getStatus() === 'BLOCKED') { statusColor = '#ef4444'; statusBg = 'rgba(239,68,68,0.1)'; }

          let prioColor = '#94a3b8';
          if (req.getPriority() === 'HIGH') prioColor = '#f59e0b';
          if (req.getPriority() === 'CRITICAL') prioColor = '#ef4444';

          return `
            <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 6px;">
                <div>
                  <div style="font-size: 0.9rem; font-weight: 700; color: #ffffff;">
                    ${req.getTitle()}
                  </div>
                  ${req.getDescription() ? `
                    <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.4; margin-top: 2px;">
                      ${req.getDescription()}
                    </div>
                  ` : ''}
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                  <span style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: ${prioColor}; border: 1px solid ${prioColor}44; padding: 2px 6px; border-radius: 4px;">
                    ${req.getPriority()}
                  </span>
                  <span style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: ${statusColor}; background: ${statusBg}; border: 1px solid ${statusColor}44; padding: 2px 6px; border-radius: 4px;">
                    ${req.getStatus()}
                  </span>
                </div>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.72rem; color: #64748b; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 6px; font-family: var(--font-mono);">
                <span>Categoría: <strong style="color: #cbd5e1;">${req.getCategory()}</strong></span>
                <span>Docs Requeridos: <strong style="color: #94a3b8;">${req.getRequiredDocumentKinds().join(', ')}</strong></span>
                ${req.getLinkedDocumentIds().length > 0 ? `
                  <span>Docs Vinculados: <strong style="color: #10b981;">${req.getLinkedDocumentIds().join(', ')}</strong></span>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
