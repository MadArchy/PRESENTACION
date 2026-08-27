import { CopilotProposalEntity } from '../../../modules/copilot/domain/entities/copilot-proposal.entity';

export function renderCopilotProposals(proposals: CopilotProposalEntity[]): string {
  if (!proposals || proposals.length === 0) {
    return `
      <div style="color: #64748b; font-size: 0.85rem; font-style: italic; padding: 12px 0;">
        Esta consulta es puramente analítica. No contiene propuestas de modificación.
      </div>
    `;
  }

  return `
    <div class="copilot-proposals-list" style="display: flex; flex-direction: column; gap: 12px;">
      ${proposals.map(p => {
        const status = p.getStatus();
        let statusBg = '#f59e0b22';
        let statusColor = '#f59e0b';
        if (status === 'APPROVED') { statusBg = '#10b98122'; statusColor = '#10b981'; }
        if (status === 'REJECTED') { statusBg = '#ef444422'; statusColor = '#ef4444'; }
        if (status === 'UNDER_REVIEW') { statusBg = '#38bdf822'; statusColor = '#38bdf8'; }
        if (status === 'SUPERSEDED') { statusBg = '#64748b22'; statusColor = '#64748b'; }

        const propValue = typeof p.getProposedValue() === 'object'
          ? JSON.stringify(p.getProposedValue(), null, 2)
          : String(p.getProposedValue());

        const currValue = p.getCurrentValue()
          ? (typeof p.getCurrentValue() === 'object' ? JSON.stringify(p.getCurrentValue(), null, 2) : String(p.getCurrentValue()))
          : null;

        return `
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: var(--gold); background: rgba(201,164,106,0.12); padding: 2px 6px; border-radius: 4px;">
                ${p.getProposalType()}
              </span>
              <span style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: ${statusColor}; background: ${statusBg}; border: 1px solid ${statusColor}44; padding: 2px 6px; border-radius: 4px;">
                ${status}
              </span>
            </div>

            <div style="font-size: 0.84rem; color: #94a3b8; margin-bottom: 8px;">
              ${p.getRationale()}
            </div>

            <!-- Proposal Diff / View -->
            ${currValue ? `
              <div style="font-size: 0.75rem; color: #ef4444; background: rgba(239,68,68,0.06); padding: 6px 10px; border-radius: 4px; margin-bottom: 6px; font-family: var(--font-mono);">
                - Actual: ${currValue}
              </div>
            ` : ''}

            <div style="font-size: 0.8rem; color: #10b981; background: rgba(16,185,129,0.06); padding: 8px 10px; border-radius: 4px; font-family: var(--font-mono); line-height: 1.4; white-space: pre-wrap;">
              + Propuesto: ${propValue}
            </div>

            <!-- Human in the loop action buttons -->
            ${status === 'PROPOSED' || status === 'UNDER_REVIEW' ? `
              <div style="display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end;">
                <button onclick="window.VentureHubBridge.reviewCopilotProposal('${p.getId()}', 'REJECT')" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 0.75rem; font-weight: 600;">
                  ✕ Rechazar
                </button>
                <button onclick="window.VentureHubBridge.reviewCopilotProposal('${p.getId()}', 'APPROVE')" style="background: #10b981; border: none; color: #000; padding: 5px 16px; border-radius: 4px; cursor: pointer; font-size: 0.75rem; font-weight: 700;">
                  ✓ Aprobar Propuesta (No muta canónico)
                </button>
              </div>
            ` : `
              <div style="font-size: 0.72rem; color: #64748b; margin-top: 8px; text-align: right;">
                Revisado por: ${p.getReviewedBy() || 'HUMAN_REVIEWER'} (${p.getReviewedAt() ? new Date(p.getReviewedAt()!).toLocaleTimeString() : ''}) · <em>Aprobación de asesoría (0 mutaciones canónicas)</em>
              </div>
            `}
          </div>
        `;
      }).join('')}
    </div>
  `;
}
