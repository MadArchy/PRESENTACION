import { CopilotCitation, CopilotGroundingSummary } from '../../../modules/copilot/domain/copilot.types';

export function renderCopilotGrounding(
  citations: CopilotCitation[],
  grounding: CopilotGroundingSummary
): string {
  return `
    <div class="copilot-grounding-container" style="background: #080d1a; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 14px;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px; margin-bottom: 10px;">
        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">
          🛡️ Transparencia de Grounding & Citaciones
        </span>
        <span style="font-family: var(--font-mono); font-size: 0.68rem; color: #10b981; background: rgba(16,185,129,0.1); padding: 2px 6px; border-radius: 3px;">
          ${grounding.sourcesAnalyzedCount} Fuentes Analizadas
        </span>
      </div>

      ${citations.length > 0 ? `
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
          ${citations.map(c => `
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #cbd5e1; background: rgba(255,255,255,0.02); padding: 5px 8px; border-radius: 4px;">
              <span style="color: var(--gold); font-weight: 700;">[${c.sourceType}]</span> ${c.sourceRef} ${c.snippet ? `— <em style="color:#94a3b8;">"${c.snippet}"</em>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div style="font-size: 0.72rem; color: #64748b; line-height: 1.4; border-top: 1px dashed rgba(255,255,255,0.06); padding-top: 8px;">
        ⚠️ <strong>Aviso de Gobernanza:</strong> Las respuestas de Copilot son recomendaciones y borradores generados para asistencia ejecutiva. No constituyen verdad verificada hasta su aprobación explícita.
      </div>

    </div>
  `;
}
