import { ProjectTrustSummary } from '../../modules/claim/domain/claim.types';

export function renderTrustSummary(summary: ProjectTrustSummary): string {
  const readinessColors: Record<string, string> = {
    TRUST_READY: '#10b981',
    TRUST_READY_WITH_WARNINGS: '#f59e0b',
    TRUST_NOT_READY: '#ef4444'
  };

  const statusColor = readinessColors[summary.readiness] || '#94a3b8';

  return `
    <div class="trust-summary-panel" style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${statusColor};"></span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: ${statusColor};">
            ESTADO DE CONFIANZA: ${summary.readiness}
          </span>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">
          Governance Engine v${summary.governanceEngineVersion} · Policy v${summary.policyVersion}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Hechos Críticos Verificados</div>
          <div style="font-size: 1.4rem; font-weight: 700; color: #10b981; margin-top: 4px;">
            ${summary.criticalFactsSupported}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 2px;">
            Sin soporte: <strong style="color: ${summary.criticalFactsUnsupported > 0 ? '#ef4444' : 'var(--text-muted)'}">${summary.criticalFactsUnsupported}</strong>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Aserciones Alta Materialidad</div>
          <div style="font-size: 1.4rem; font-weight: 700; color: var(--gold); margin-top: 4px;">
            ${summary.highMaterialitySupported}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 2px;">
            Sin soporte: <strong style="color: ${summary.highMaterialityUnsupported > 0 ? '#f59e0b' : 'var(--text-muted)'}">${summary.highMaterialityUnsupported}</strong>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Contradicciones Activas</div>
          <div style="font-size: 1.4rem; font-weight: 700; color: ${summary.contradictedClaimsCount > 0 ? '#ef4444' : '#10b981'}; margin-top: 4px;">
            ${summary.contradictedClaimsCount}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 2px;">
            Sin revisar: <strong>${summary.unreviewedClaimsCount}</strong>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total Inventario</div>
          <div style="font-size: 1.4rem; font-weight: 700; color: #fff; margin-top: 4px;">
            ${summary.totalClaimsCount} <span style="font-size: 0.85rem; font-weight: 400; color: var(--text-muted);">claims</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 2px;">
            Evidencias registradas: <strong>${summary.totalEvidenceCount}</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}
