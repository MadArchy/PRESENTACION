import { PresenterTimingState } from '../../../modules/presenter/domain/presenter.types';

function formatSeconds(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function renderPresenterTimer(timing: PresenterTimingState, _isRunning?: boolean): string {
  const deviation = timing.deviation;
  let statusBadgeBg = '#10b98122';
  let statusBadgeColor = '#10b981';
  let statusBadgeBorder = '#10b98155';

  if (deviation.state === 'BEHIND') {
    statusBadgeBg = '#f59e0b22';
    statusBadgeColor = '#f59e0b';
    statusBadgeBorder = '#f59e0b55';
  } else if (deviation.state === 'OVERTIME') {
    statusBadgeBg = '#ef444422';
    statusBadgeColor = '#ef4444';
    statusBadgeBorder = '#ef444455';
  } else if (deviation.state === 'AHEAD') {
    statusBadgeBg = '#38bdf822';
    statusBadgeColor = '#38bdf8';
    statusBadgeBorder = '#38bdf855';
  }

  return `
    <div class="presenter-timer-card" style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px;">
      
      <!-- Primary Pitch Timer -->
      <div style="display: flex; align-items: baseline; gap: 10px;">
        <span style="font-family: var(--font-mono); font-size: 1.6rem; font-weight: 700; color: #ffffff;">
          ${formatSeconds(timing.elapsedSeconds)}
        </span>
        <span style="font-size: 0.78rem; color: #64748b; font-family: var(--font-mono);">
          / ${formatSeconds(timing.targetSeconds)}
        </span>
      </div>

      <!-- Timing State Badge -->
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; background: ${statusBadgeBg}; color: ${statusBadgeColor}; border: 1px solid ${statusBadgeBorder}; padding: 3px 8px; border-radius: 4px;">
          ${deviation.state} (${deviation.deltaSeconds >= 0 ? '+' : ''}${Math.round(deviation.deltaSeconds)}s)
        </span>

        <!-- Scene Timer -->
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 3px 8px; border-radius: 4px;">
          Escena: ${formatSeconds(timing.sceneElapsedSeconds)} / ≈${formatSeconds(timing.sceneTargetSeconds)}
        </span>
      </div>

    </div>
  `;
}
