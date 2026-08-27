import { ClaimEntity } from '../../modules/claim/domain/entities/claim.entity';
import { EvidenceEntity } from '../../modules/evidence/domain/entities/evidence.entity';
import { ProjectTrustSummary, ProjectClaimCoverageReport } from '../../modules/claim/domain/claim.types';
import { renderClaimsTable } from '../components/claims-table.component';
import { renderEvidenceTable } from '../components/evidence-table.component';
import { renderTrustSummary } from '../components/trust-summary.component';

export function renderGovernancePage(
  projectId: string,
  claims: ClaimEntity[],
  evidenceList: EvidenceEntity[],
  summary: ProjectTrustSummary,
  coverage: ProjectClaimCoverageReport,
  activeTab: 'CLAIMS' | 'EVIDENCE' | 'COVERAGE' | 'TRUST' = 'CLAIMS'
): string {
  return `
    <div class="governance-page" style="padding: 24px; max-width: 1200px; margin: 0 auto; color: var(--text-primary);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold); text-transform: uppercase; margin-bottom: 4px;">
            GOBERNANZA DE TRAZABILIDAD Y VERIFICACIÓN · PROYECTO: ${projectId.toUpperCase()}
          </div>
          <h1 style="font-size: 1.6rem; font-weight: 700; margin: 0; color: #fff;">
            Claims & Evidence Governance
          </h1>
        </div>
        <div style="display: flex; gap: 10px;">
          <button onclick="window.VentureHubBridge.openProjectWorkspace('${projectId}')" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.82rem;">
            ← Volver a Project Twin
          </button>
        </div>
      </div>

      ${renderTrustSummary(summary)}

      <div class="governance-tabs" style="display: flex; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
        <button onclick="window.VentureHubBridge.setGovernanceTab('CLAIMS')" style="background: ${activeTab === 'CLAIMS' ? 'rgba(201,164,106,0.15)' : 'transparent'}; border: 1px solid ${activeTab === 'CLAIMS' ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}; color: ${activeTab === 'CLAIMS' ? 'var(--gold)' : 'var(--text-secondary)'}; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 600;">
          📋 CLAIMS (${claims.length})
        </button>
        <button onclick="window.VentureHubBridge.setGovernanceTab('EVIDENCE')" style="background: ${activeTab === 'EVIDENCE' ? 'rgba(201,164,106,0.15)' : 'transparent'}; border: 1px solid ${activeTab === 'EVIDENCE' ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}; color: ${activeTab === 'EVIDENCE' ? 'var(--gold)' : 'var(--text-secondary)'}; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 600;">
          🔍 EVIDENCIAS (${evidenceList.length})
        </button>
        <button onclick="window.VentureHubBridge.setGovernanceTab('COVERAGE')" style="background: ${activeTab === 'COVERAGE' ? 'rgba(201,164,106,0.15)' : 'transparent'}; border: 1px solid ${activeTab === 'COVERAGE' ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}; color: ${activeTab === 'COVERAGE' ? 'var(--gold)' : 'var(--text-secondary)'}; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 600;">
          📊 COBERTURA POR SECCIÓN
        </button>
      </div>

      <div class="governance-tab-content">
        ${activeTab === 'CLAIMS' ? renderClaimsTable(claims) : ''}
        ${activeTab === 'EVIDENCE' ? renderEvidenceTable(evidenceList) : ''}
        ${activeTab === 'COVERAGE' ? `
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
            <h3 style="font-size: 1rem; color: #fff; margin-top: 0; margin-bottom: 16px;">Distribución de Aserciones por Sección</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
              ${coverage.bySection.map(sec => `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px;">
                  <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--gold); margin-bottom: 6px;">
                    ${sec.sectionType}
                  </div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;">
                    Total Claims: <strong>${sec.totalClaims}</strong><br/>
                    Hechos: <strong>${sec.factsCount}</strong> (Soportados: <span style="color:#10b981;">${sec.supportedFactsCount}</span>, Sin soporte: <span style="color:#ef4444;">${sec.unsupportedFactsCount}</span>)<br/>
                    Estimados: ${sec.estimatesCount} · Metas: ${sec.targetsCount} · Supuestos: ${sec.assumptionsCount}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
