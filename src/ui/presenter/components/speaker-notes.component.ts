import { PresenterNote } from '../../../modules/presenter/domain/presenter.types';

export function renderSpeakerNotes(notes: PresenterNote[]): string {
  if (notes.length === 0) {
    return `
      <div style="color: #64748b; font-size: 0.85rem; font-style: italic; padding: 12px 0;">
        No hay notas de orador registradas para esta escena.
      </div>
    `;
  }

  return `
    <div class="speaker-notes-list" style="display: flex; flex-direction: column; gap: 8px;">
      ${notes.map(n => {
        let typeColor = '#38bdf8';
        if (n.type === 'CAUTION') typeColor = '#ef4444';
        if (n.type === 'REMINDER') typeColor = '#f59e0b';
        if (n.type === 'TRANSITION') typeColor = '#c9a46a';

        return `
          <div style="background: rgba(255,255,255,0.03); border-left: 3px solid ${typeColor}; padding: 8px 12px; border-radius: 4px;">
            <div style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: ${typeColor}; text-transform: uppercase; margin-bottom: 4px;">
              ${n.type}
            </div>
            <div style="font-size: 0.88rem; color: #f8fafc; line-height: 1.45;">
              ${n.text}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
