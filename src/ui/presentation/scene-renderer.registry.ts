import { PresentationSceneEntity } from '../../modules/presentation/domain/entities/presentation-scene.entity';
import { SceneType } from '../../modules/presentation/domain/presentation.types';

type SceneRenderFn = (scene: PresentationSceneEntity, themeMode: 'DARK' | 'LIGHT') => string;

export class SceneRendererRegistry {
  private static readonly renderers: Map<SceneType, SceneRenderFn> = new Map();

  static register(type: SceneType, fn: SceneRenderFn): void {
    this.renderers.set(type, fn);
  }

  static get(type: SceneType): SceneRenderFn {
    return this.renderers.get(type) || this.defaultRender;
  }

  private static defaultRender(scene: PresentationSceneEntity, themeMode: 'DARK' | 'LIGHT'): string {
    const isDark = themeMode === 'DARK';
    const surface = isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff';
    const border = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const textPrimary = isDark ? '#ffffff' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#475569';

    const title = scene.getTitle().es || scene.getTitle().en;
    const eyebrow = scene.getEyebrow()?.es || scene.getEyebrow()?.en;
    const subtitle = scene.getSubtitle()?.es || scene.getSubtitle()?.en;

    const bindings = scene.getBindings();
    const trustBindings = scene.getTrustBindings();

    // Render Trust Badges
    const trustHtml = trustBindings.length > 0 ? `
      <div class="scene-trust-badges" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
        ${trustBindings.map(tb => {
          const isWarning = tb.warningCode !== undefined;
          const bg = isWarning ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)';
          const color = isWarning ? '#ef4444' : '#38bdf8';
          const borderCol = isWarning ? 'rgba(239, 68, 68, 0.3)' : 'rgba(56, 189, 248, 0.3)';
          return `
            <span style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; background: ${bg}; color: ${color}; border: 1px solid ${borderCol}; padding: 3px 8px; border-radius: 4px;">
              [${tb.claimType}${isWarning ? ` ⚠️ ${tb.warningCode}` : ''}]
            </span>
          `;
        }).join('')}
      </div>
    ` : '';

    // Render Bindings
    const bindingsHtml = bindings.map(b => {
      if (b.type === 'BULLET_LIST' && Array.isArray(b.value)) {
        return `
          <ul style="margin: 0 0 16px 0; padding-left: 20px; color: ${textPrimary}; font-size: 1rem; line-height: 1.6;">
            ${b.value.map((item: any) => `<li>${typeof item === 'string' ? item : item.text || JSON.stringify(item)}</li>`).join('')}
          </ul>
        `;
      }
      if (b.type === 'METRIC_SET' && Array.isArray(b.value)) {
        return `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin: 16px 0;">
            ${b.value.map((m: any) => `
              <div style="background: ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}; border: 1px solid ${border}; border-radius: 8px; padding: 14px;">
                <div style="font-size: 0.72rem; color: ${textSecondary}; text-transform: uppercase;">${m.label || m.name || 'Métrica'}</div>
                <div style="font-size: 1.4rem; font-weight: 700; color: var(--gold); margin-top: 4px;">${m.value || m.amount || ''}</div>
              </div>
            `).join('')}
          </div>
        `;
      }
      if (b.type === 'KEY_VALUE' && typeof b.value === 'object' && b.value !== null) {
        return `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 16px 0;">
            ${Object.entries(b.value).map(([k, v]) => `
              <div style="background: ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}; border: 1px solid ${border}; border-radius: 6px; padding: 10px 14px;">
                <div style="font-size: 0.7rem; color: ${textSecondary}; text-transform: uppercase;">${k}</div>
                <div style="font-size: 0.95rem; font-weight: 600; color: ${textPrimary}; margin-top: 2px;">${String(v)}</div>
              </div>
            `).join('')}
          </div>
        `;
      }
      return '';
    }).join('');

    return `
      <div class="executive-scene-card" style="width: 100%; max-width: 960px; background: ${surface}; border: 1px solid ${border}; border-radius: 12px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
        ${eyebrow ? `<div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--gold); text-transform: uppercase; margin-bottom: 8px;">${eyebrow}</div>` : ''}
        <h1 style="font-size: 2rem; font-weight: 700; color: ${textPrimary}; margin: 0 0 12px 0; line-height: 1.25;">
          ${title}
        </h1>
        ${subtitle ? `<p style="font-size: 1.05rem; color: ${textSecondary}; margin: 0 0 24px 0; line-height: 1.5;">${subtitle}</p>` : ''}
        ${trustHtml}
        <div class="scene-bindings-content">
          ${bindingsHtml}
        </div>
      </div>
    `;
  }
}
