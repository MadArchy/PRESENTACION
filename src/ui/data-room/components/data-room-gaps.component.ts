import { DiligenceGap } from '../../../modules/data-room/domain/data-room.types';

export function renderDataRoomGaps(gaps: DiligenceGap[]): string {
  if (!gaps || gaps.length === 0) {
    return `
      <div style="background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.2); border-radius: 6px; padding: 20px; text-align: center; color: #10b981; font-size: 0.88rem;">
        ✓ No se detectaron brechas activas de diligencia. El proyecto cuenta con cobertura documental completa.
      </div>
    `;
  }

  return `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <span style="font-size: 0.82rem; font-weight: 700; color: var(--gold); text-transform: uppercase;">
        Brechas Detectadas & Hallazgos (${gaps.length})
      </span>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${gaps.map(gap => {
          let sevColor = '#f59e0b';
          let sevBg = 'rgba(245,158,11,0.08)';
          let sevBorder = 'rgba(245,158,11,0.25)';

          if (gap.severity === 'BLOCKING' || gap.severity === 'HIGH') {
            sevColor = '#ef4444';
            sevBg = 'rgba(239,68,68,0.08)';
            sevBorder = 'rgba(239,68,68,0.25)';
          }

          return `
            <div style="background: ${sevBg}; border: 1px solid ${sevBorder}; border-radius: 6px; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: ${sevColor}; text-transform: uppercase;">
                  ${gap.type} · ${gap.severity}
                </span>
                <span style="font-family: var(--font-mono); font-size: 0.65rem; color: #94a3b8;">
                  ${gap.category}
                </span>
              </div>

              <div style="font-size: 0.9rem; font-weight: 700; color: #ffffff; margin-bottom: 4px;">
                ${gap.title}
              </div>

              <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 6px;">
                ${gap.explanation}
              </div>

              ${gap.remediationHint ? `
                <div style="font-size: 0.75rem; color: var(--gold); background: rgba(201,164,106,0.08); padding: 6px 10px; border-radius: 4px;">
                  💡 <strong>Remediación:</strong> ${gap.remediationHint}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
