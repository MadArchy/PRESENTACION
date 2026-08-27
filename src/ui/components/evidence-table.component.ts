import { EvidenceEntity } from '../../modules/evidence/domain/entities/evidence.entity';

export function renderEvidenceTable(evidenceList: EvidenceEntity[]): string {
  const rowsHtml = evidenceList.map(ev => {
    const source = ev.getSource();
    return `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.15s ease;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 14px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold);">
          ${ev.getId()}
        </td>
        <td style="padding: 12px 14px; font-size: 0.85rem; color: #fff; max-width: 320px; line-height: 1.4;">
          <strong>${ev.getTitle()}</strong>
          ${ev.getDescription() ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">${ev.getDescription()}</div>` : ''}
        </td>
        <td style="padding: 12px 14px;">
          <span style="font-family: var(--font-mono); font-size: 0.7rem; background: rgba(255,255,255,0.06); color: var(--text-secondary); padding: 3px 7px; border-radius: 4px;">
            ${ev.getType()}
          </span>
        </td>
        <td style="padding: 12px 14px;">
          <span style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 600; color: #10b981; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); padding: 3px 7px; border-radius: 4px;">
            ${ev.getStatus()}
          </span>
        </td>
        <td style="padding: 12px 14px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">
          <div>${source.title || source.reference}</div>
          <div style="font-size: 0.68rem; color: var(--text-muted);">[${source.sourceType} · ${source.locator || 'UNKNOWN'}]</div>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="evidence-table-container" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.1); font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">
            <th style="padding: 12px 14px;">ID</th>
            <th style="padding: 12px 14px;">Evidencia / Título</th>
            <th style="padding: 12px 14px;">Tipo</th>
            <th style="padding: 12px 14px;">Estado</th>
            <th style="padding: 12px 14px;">Fuente / Provenance</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}
