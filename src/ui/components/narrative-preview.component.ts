import { NarrativePlanEntity } from '../../modules/narrative/domain/entities/narrative-plan.entity';

export function renderNarrativePreview(plan: NarrativePlanEntity): string {
  const readiness = plan.getReadiness();
  const readinessColor =
    readiness === 'READY'
      ? '#10b981'
      : readiness === 'READY_WITH_WARNINGS'
      ? '#f59e0b'
      : '#ef4444';

  const timing = plan.getTiming();
  const timingStatusColors: Record<string, string> = {
    WITHIN_TARGET: '#10b981',
    NORMAL_TOLERANCE: '#06b6d4',
    MODERATE_OVERFLOW: '#f59e0b',
    CRITICAL_OVERFLOW: '#ef4444'
  };
  const timingColor = timingStatusColors[timing.status] || '#94a3b8';

  const steps = plan.getSteps();
  const warnings = plan.getWarnings();
  const gaps = plan.getGaps();
  const omitted = plan.getOmittedSectionTypes();

  const warningsHtml = warnings.length > 0 ? `
    <div class="narrative-warnings-block" style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
      <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #f59e0b; font-weight: 700; margin-bottom: 6px;">
        ⚠️ ADVERTENCIAS NARRATIVAS (${warnings.length})
      </div>
      <ul style="margin: 0; padding-left: 20px; font-size: 0.82rem; color: var(--text-secondary);">
        ${warnings.map(w => `<li><strong>[${w.code}]</strong> ${w.message}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const gapsHtml = gaps.length > 0 ? `
    <div class="narrative-gaps-block" style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
      <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #ef4444; font-weight: 700; margin-bottom: 6px;">
        🛑 BRECHAS DETECTADAS (GAPS: ${gaps.length})
      </div>
      <ul style="margin: 0; padding-left: 20px; font-size: 0.82rem; color: #fca5a5;">
        ${gaps.map(g => `<li><strong>[${g.sectionType} / ${g.severity}]</strong> ${g.message}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const stepsHtml = steps.map(step => {
    const isFallback = step.getIsLanguageFallback();
    return `
      <div class="narrative-step-item" style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 700; color: var(--gold); min-width: 28px;">
            ${String(step.getOrder()).padStart(2, '0')}
          </span>
          <div>
            <div style="font-size: 0.95rem; font-weight: 600; color: #fff; margin-bottom: 2px;">
              ${step.getTitle()}
              ${isFallback ? '<span style="font-size: 0.68rem; background: rgba(245,158,11,0.2); color: #f59e0b; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">Fallback ES</span>' : ''}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">
              ${step.getRationale()}
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; font-family: var(--font-mono); font-size: 0.72rem;">
          <span style="background: rgba(255,255,255,0.06); padding: 4px 8px; border-radius: 4px; color: var(--text-secondary);">
            ${step.getRole()}
          </span>
          <span style="background: rgba(201,164,106,0.1); color: var(--gold); padding: 4px 8px; border-radius: 4px;">
            ≈ ${step.getEstimatedSeconds()}s
          </span>
        </div>
      </div>
    `;
  }).join('');

  const omittedHtml = omitted.length > 0 ? `
    <div class="narrative-omitted-block" style="margin-top: 18px; padding-top: 12px; border-top: 1px dashed rgba(255,255,255,0.1); font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">
      <span>SECCIONES OMITIDAS POR POLÍTICA/DURACIÓN (${omitted.length}):</span> ${omitted.map(o => `[${o}]`).join(' ')}
    </div>
  ` : '';

  return `
    <div class="narrative-preview-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${readinessColor};"></span>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: ${readinessColor};">
            ESTADO: ${readiness}
          </span>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary); display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span>Pasos: <strong>${steps.length}</strong></span> · 
          <span>Duración: <strong style="color: var(--gold);">${timing.estimatedSeconds}s / ${timing.targetSeconds}s (${Math.round(timing.estimatedSeconds / 60)} min)</strong></span> · 
          <span style="color: ${timingColor}; font-weight: 600;">[${timing.status} · +${timing.overflowPercent}%]</span> · 
          <span>Engine v: <strong>${plan.getEngineVersion()}</strong></span>
        </div>
      </div>

      ${gapsHtml}
      ${warningsHtml}

      <div class="narrative-steps-list">
        ${stepsHtml}
      </div>

      ${omittedHtml}
    </div>
  `;
}
