import { PresenterSessionSummary } from '../../../modules/presenter/domain/presenter.types';

function formatSeconds(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function renderSessionSummary(summary: PresenterSessionSummary): string {
  return `
    <div class="session-summary-card" style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 28px; max-width: 680px; margin: 30px auto; color: #f8fafc;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="font-size: 1.3rem; font-weight: 700; margin: 0;">Resumen Ejecutivo de la Sesión</h2>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; background: rgba(201,164,106,0.15); color: var(--gold); border: 1px solid rgba(201,164,106,0.3); padding: 3px 8px; border-radius: 4px;">
          ${summary.finalTimingState}
        </span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px;">
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 12px;">
          <div style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">Tiempo Objetivo</div>
          <div style="font-size: 1.3rem; font-weight: 700; font-family: var(--font-mono); margin-top: 4px;">${formatSeconds(summary.targetSeconds)}</div>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 12px;">
          <div style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">Tiempo Real</div>
          <div style="font-size: 1.3rem; font-weight: 700; font-family: var(--font-mono); margin-top: 4px; color: ${summary.deltaSeconds > 0 ? '#f59e0b' : '#10b981'};">
            ${formatSeconds(summary.actualSeconds)}
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 12px;">
          <div style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">Desviación</div>
          <div style="font-size: 1.3rem; font-weight: 700; font-family: var(--font-mono); margin-top: 4px;">
            ${summary.deltaSeconds >= 0 ? '+' : ''}${Math.round(summary.deltaSeconds)}s
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 14px;">
        <span>Escenas Visitadas: <strong>${summary.scenesVisited} / ${summary.totalScenes}</strong></span>
        <span>Escenas Omitidas: <strong>${summary.scenesSkipped}</strong></span>
        <span>Alertas Vistas: <strong>${summary.warningsSeen}</strong></span>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <button onclick="window.VentureHubBridge.closePresenterCockpit()" style="background: var(--gold); border: none; color: #000; font-weight: 600; padding: 8px 24px; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
          Cerrar Cockpit
        </button>
      </div>

    </div>
  `;
}
