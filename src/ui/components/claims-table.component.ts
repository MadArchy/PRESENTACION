import { ClaimEntity } from '../../modules/claim/domain/entities/claim.entity';

export function renderClaimsTable(claims: ClaimEntity[], selectedType = 'ALL', selectedSupport = 'ALL'): string {
  const filtered = claims.filter(c => {
    if (selectedType !== 'ALL' && c.getType() !== selectedType) return false;
    if (selectedSupport !== 'ALL' && c.getSupportStatus() !== selectedSupport) return false;
    return true;
  });

  const typePillColors: Record<string, string> = {
    FACT: '#3b82f6',
    ESTIMATE: '#8b5cf6',
    ASSUMPTION: '#ec4899',
    TARGET: '#06b6d4',
    HYPOTHESIS: '#eab308'
  };

  const supportPillColors: Record<string, string> = {
    SUPPORTED: '#10b981',
    PARTIALLY_SUPPORTED: '#f59e0b',
    UNSUPPORTED: '#ef4444',
    NOT_REQUIRED: '#6b7280',
    CONTRADICTED: '#dc2626'
  };

  const rowsHtml = filtered.map(claim => {
    const text = claim.getText().es || claim.getText().en;
    const typeColor = typePillColors[claim.getType()] || '#94a3b8';
    const supportColor = supportPillColors[claim.getSupportStatus()] || '#94a3b8';

    return `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.15s ease;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 14px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold);">
          ${claim.getId()}
        </td>
        <td style="padding: 12px 14px; font-size: 0.85rem; color: #fff; max-width: 420px; line-height: 1.4;">
          ${text}
        </td>
        <td style="padding: 12px 14px;">
          <span style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; background: ${typeColor}22; color: ${typeColor}; border: 1px solid ${typeColor}55; padding: 3px 7px; border-radius: 4px;">
            ${claim.getType()}
          </span>
        </td>
        <td style="padding: 12px 14px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">
          ${claim.getSectionType()}
        </td>
        <td style="padding: 12px 14px;">
          <span style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 600; background: ${supportColor}22; color: ${supportColor}; border: 1px solid ${supportColor}55; padding: 3px 7px; border-radius: 4px;">
            ${claim.getSupportStatus()}
          </span>
        </td>
        <td style="padding: 12px 14px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary);">
          ${claim.getMateriality()}
        </td>
        <td style="padding: 12px 14px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-align: center;">
          ${claim.getEvidenceLinkIds().length}
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="claims-table-container" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.1); font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">
            <th style="padding: 12px 14px;">ID</th>
            <th style="padding: 12px 14px;">Aserción / Claim</th>
            <th style="padding: 12px 14px;">Tipo</th>
            <th style="padding: 12px 14px;">Sección</th>
            <th style="padding: 12px 14px;">Estado Soporte</th>
            <th style="padding: 12px 14px;">Materialidad</th>
            <th style="padding: 12px 14px; text-align: center;">Evidencias</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}
