import { PresenterTrustAlert } from '../../../modules/presenter/domain/presenter.types';
import { PresentationTrustSummary } from '../../../modules/presentation/domain/presentation.types';

export function renderPresenterTrustPanel(
  alerts: PresenterTrustAlert[],
  summary: PresentationTrustSummary
): string {
  const readinessColor =
    summary.readiness === 'TRUST_READY'
      ? '#10b981'
      : summary.readiness === 'TRUST_READY_WITH_WARNINGS'
      ? '#f59e0b'
      : '#ef4444';

  return `
    <div class="presenter-trust-panel" style="display: flex; flex-direction: column; gap: 12px;">
      
      <!-- Global Summary Pill -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 6px;">
        <span style="font-size: 0.78rem; color: #94a3b8;">Estado Global de Gobernanza:</span>
        <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; color: ${readinessColor}; background: ${readinessColor}22; border: 1px solid ${readinessColor}55; padding: 2px 8px; border-radius: 4px;">
          ${summary.readiness}
        </span>
      </div>

      <!-- Current Scene Alerts -->
      ${alerts.length === 0 ? `
        <div style="color: #64748b; font-size: 0.82rem; font-style: italic;">
          No hay alertas de gobernanza para la escena activa.
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${alerts.map(a => {
            const isDanger = a.severity === 'CRITICAL';
            const isWarning = a.severity === 'WARNING';
            const color = isDanger ? '#ef4444' : (isWarning ? '#f59e0b' : '#38bdf8');
            const bg = isDanger ? 'rgba(239,68,68,0.1)' : (isWarning ? 'rgba(245,158,11,0.1)' : 'rgba(56,189,248,0.1)');

            return `
              <div style="background: ${bg}; border: 1px solid ${color}44; padding: 8px 12px; border-radius: 4px; display: flex; align-items: flex-start; gap: 8px;">
                <span style="font-size: 0.85rem;">${isDanger ? '🛑' : (isWarning ? '⚠️' : 'ℹ️')}</span>
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: ${color};">
                    ${a.code}
                  </div>
                  <div style="font-size: 0.8rem; color: #f8fafc; margin-top: 2px;">
                    ${a.message}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}

    </div>
  `;
}
