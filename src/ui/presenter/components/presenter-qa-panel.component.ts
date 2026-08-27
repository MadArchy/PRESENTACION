import { QaPreparationCard } from '../../../modules/presenter/domain/presenter.types';

export function renderPresenterQaPanel(cards: QaPreparationCard[]): string {
  if (cards.length === 0) {
    return `
      <div style="color: #64748b; font-size: 0.85rem; font-style: italic; padding: 12px 0;">
        No hay tarjetas Q&A preparadas para este proyecto.
      </div>
    `;
  }

  return `
    <div class="presenter-qa-list" style="display: flex; flex-direction: column; gap: 10px;">
      ${cards.map(c => `
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 10px 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: var(--gold); background: rgba(201,164,106,0.12); padding: 2px 6px; border-radius: 3px;">
              ${c.category}
            </span>
            ${c.sceneId ? `<span style="font-family: var(--font-mono); font-size: 0.65rem; color: #64748b;">${c.sceneId}</span>` : ''}
          </div>
          <div style="font-size: 0.88rem; font-weight: 600; color: #f8fafc; margin-bottom: 4px;">
            Q: ${c.question}
          </div>
          ${c.answerNotes ? `
            <div style="font-size: 0.82rem; color: #94a3b8; line-height: 1.4; border-top: 1px dashed rgba(255,255,255,0.08); padding-top: 4px; margin-top: 4px;">
              A: ${c.answerNotes}
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}
