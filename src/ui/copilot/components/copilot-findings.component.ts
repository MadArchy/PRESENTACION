import { CopilotFinding } from '../../../modules/copilot/domain/copilot.types';

export function renderCopilotFindings(findings: CopilotFinding[]): string {
  if (!findings || findings.length === 0) {
    return `
      <div style="color: #64748b; font-size: 0.85rem; font-style: italic; padding: 12px 0;">
        No se generaron observaciones analíticas para esta consulta.
      </div>
    `;
  }

  return `
    <div class="copilot-findings-list" style="display: flex; flex-direction: column; gap: 10px;">
      ${findings.map(f => {
        let badgeColor = '#38bdf8';
        let bg = 'rgba(56,189,248,0.08)';
        let border = 'rgba(56,189,248,0.25)';

        if (f.severity === 'HIGH' || f.type === 'RISK' || f.type === 'TRUST_CONCERN') {
          badgeColor = '#ef4444';
          bg = 'rgba(239,68,68,0.08)';
          border = 'rgba(239,68,68,0.25)';
        } else if (f.severity === 'MEDIUM' || f.type === 'GAP') {
          badgeColor = '#f59e0b';
          bg = 'rgba(245,158,11,0.08)';
          border = 'rgba(245,158,11,0.25)';
        }

        return `
          <div style="background: ${bg}; border: 1px solid ${border}; border-radius: 6px; padding: 12px 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: ${badgeColor}; text-transform: uppercase;">
                ${f.type} ${f.severity ? `· ${f.severity}` : ''}
              </span>
              ${f.sourceRefs && f.sourceRefs.length > 0 ? `
                <span style="font-family: var(--font-mono); font-size: 0.65rem; color: #64748b;">
                  Refs: ${f.sourceRefs.join(', ')}
                </span>
              ` : ''}
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: #ffffff; margin-bottom: 4px;">
              ${f.title}
            </div>
            <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.45;">
              ${f.explanation}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
