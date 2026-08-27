import { DiligenceReadinessExplanation } from '../../../modules/data-room/domain/data-room.types';

export function renderDataRoomReadiness(explanation: DiligenceReadinessExplanation): string {
  let statusColor = '#10b981';
  let statusBg = 'rgba(16,185,129,0.08)';
  let statusBorder = 'rgba(16,185,129,0.25)';

  if (explanation.readiness === 'DILIGENCE_READY_WITH_WARNINGS') {
    statusColor = '#f59e0b';
    statusBg = 'rgba(245,158,11,0.08)';
    statusBorder = 'rgba(245,158,11,0.25)';
  } else if (explanation.readiness === 'DILIGENCE_NOT_READY') {
    statusColor = '#ef4444';
    statusBg = 'rgba(239,68,68,0.08)';
    statusBorder = 'rgba(239,68,68,0.25)';
  }

  return `
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      
      <!-- Readiness Banner -->
      <div style="background: ${statusBg}; border: 1px solid ${statusBorder}; border-radius: 6px; padding: 18px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; color: ${statusColor}; text-transform: uppercase; margin-bottom: 4px;">
            Evaluación de Política Diligence v${explanation.policyVersion}
          </div>
          <div style="font-size: 1.25rem; font-weight: 700; color: #ffffff;">
            ${explanation.readiness.replace(/_/g, ' ')}
          </div>
        </div>

        <span style="font-family: var(--font-mono); font-size: 0.68rem; color: #94a3b8;">
          Evaluado: ${new Date(explanation.evaluatedAt).toLocaleTimeString()}
        </span>
      </div>

      <!-- Explanation Message -->
      <div>
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--gold); text-transform: uppercase; margin: 0 0 6px 0;">
          Dictamen Ejecutivo
        </h4>
        <div style="font-size: 0.9rem; color: #e2e8f0; line-height: 1.5;">
          ${explanation.message}
        </div>
      </div>

      <!-- Reason Codes -->
      ${explanation.reasonCodes.length > 0 ? `
        <div>
          <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--gold); text-transform: uppercase; margin: 0 0 8px 0;">
            Códigos de Causa Activos (${explanation.reasonCodes.length})
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${explanation.reasonCodes.map(code => `
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #cbd5e1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 4px 8px; border-radius: 4px;">
                ${code}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}

    </div>
  `;
}
