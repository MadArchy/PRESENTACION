import { PresentationDefinitionEntity } from '../../../modules/presentation/domain/entities/presentation-definition.entity';
import { PresenterSessionEntity } from '../../../modules/presenter/domain/entities/presenter-session.entity';

export function renderPresenterOverview(
  presentation: PresentationDefinitionEntity,
  session: PresenterSessionEntity
): string {
  const scenes = presentation.getScenes();
  const currentIndex = session.getCurrentSceneIndex();

  return `
    <div class="presenter-overview-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; padding: 16px;">
      ${scenes.map((sc: any, idx: number) => {
        const state = session.getSceneRuntimeState(idx);
        const isCurrent = idx === currentIndex;

        let borderCol = 'rgba(255,255,255,0.08)';
        let bg = '#0f172a';
        let badgeColor = '#64748b';

        if (isCurrent) {
          borderCol = 'var(--gold)';
          bg = 'rgba(201,164,106,0.1)';
          badgeColor = 'var(--gold)';
        } else if (state === 'VISITED') {
          badgeColor = '#10b981';
        } else if (state === 'SKIPPED') {
          badgeColor = '#ef4444';
        }

        return `
          <div onclick="window.VentureHubBridge.goToPresenterScene(${idx})" style="background: ${bg}; border: 1px solid ${borderCol}; border-radius: 6px; padding: 12px; cursor: pointer; transition: transform 0.1s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: ${isCurrent ? 'var(--gold)' : '#ffffff'};">
                ${String(idx + 1).padStart(2, '0')}
              </span>
              <span style="font-family: var(--font-mono); font-size: 0.65rem; color: ${badgeColor}; text-transform: uppercase;">
                ${state}
              </span>
            </div>
            <div style="font-size: 0.82rem; font-weight: 600; color: #f8fafc; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${sc.getTitle().es || sc.getTitle().en}
            </div>
            <div style="font-size: 0.68rem; color: #64748b; margin-top: 4px;">
              ${sc.getType()} · ≈${sc.getEstimatedSeconds()}s
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
