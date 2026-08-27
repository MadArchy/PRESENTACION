import { PresentationDefinitionEntity } from '../../modules/presentation/domain/entities/presentation-definition.entity';
import { PresentationSceneEntity } from '../../modules/presentation/domain/entities/presentation-scene.entity';
import { SceneRendererRegistry } from './scene-renderer.registry';

export class PresentationRenderer {
  renderScene(scene: PresentationSceneEntity, themeMode: 'DARK' | 'LIGHT' = 'DARK'): string {
    const renderFn = SceneRendererRegistry.get(scene.getType());
    return renderFn(scene, themeMode);
  }

  renderPresentationShell(
    presentation: PresentationDefinitionEntity,
    activeSceneIndex = 0,
    themeMode: 'DARK' | 'LIGHT' = 'DARK'
  ): string {
    const total = presentation.getScenes().length;
    const currentScene = presentation.getScene(activeSceneIndex) || presentation.getScene(0)!;
    const progressPercent = Math.round(((activeSceneIndex + 1) / total) * 100);

    const isDark = themeMode === 'DARK';
    const bg = isDark ? '#030712' : '#f8fafc';
    const surface = isDark ? '#0f172a' : '#ffffff';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#475569';
    const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

    const readiness = presentation.getReadiness();
    const readinessColor =
      readiness === 'PRESENTATION_READY'
        ? '#10b981'
        : readiness === 'PRESENTATION_READY_WITH_WARNINGS'
        ? '#f59e0b'
        : '#ef4444';

    return `
      <div class="v2-presentation-wrapper theme-${themeMode.toLowerCase()}" style="position: fixed; inset: 0; background: ${bg}; color: ${textPrimary}; display: flex; flex-direction: column; overflow: hidden; font-family: 'Inter', -apple-system, sans-serif; z-index: 10000;">
        
        <!-- Top Executive Bar -->
        <header class="presentation-header" style="height: 56px; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid ${border}; background: ${surface};">
          <div style="display: flex; align-items: center; gap: 14px;">
            <button onclick="window.VentureHubBridge.closePresentation()" style="background: transparent; border: 1px solid ${border}; color: ${textSecondary}; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.78rem; font-family: var(--font-mono);">
              ✕ Salir
            </button>
            <div style="font-size: 0.85rem; font-weight: 600; color: ${textPrimary};">
              ${presentation.getProjectId().toUpperCase()} · <span style="font-weight: 400; color: ${textSecondary};">${presentation.getAudience()}</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: ${readinessColor}; background: ${readinessColor}22; border: 1px solid ${readinessColor}55; padding: 2px 8px; border-radius: 4px;">
              ${readiness}
            </span>
          </div>

          <div style="display: flex; align-items: center; gap: 14px;">
            <!-- Progress Pill -->
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--gold);">
              <span id="v2SceneCounter">${activeSceneIndex + 1}</span> / ${total}
            </div>

            <!-- Overview Drawer Button -->
            <button onclick="window.VentureHubBridge.togglePresentationOverview()" style="background: transparent; border: 1px solid ${border}; color: ${textSecondary}; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;">
              ▦ Grid
            </button>

            <!-- Theme Toggle -->
            <button onclick="window.VentureHubBridge.togglePresentationTheme()" style="background: transparent; border: 1px solid ${border}; color: ${textSecondary}; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;">
              ${isDark ? '☀️ Light' : '🌙 Dark'}
            </button>

            <!-- Fullscreen Toggle -->
            <button onclick="window.VentureHubBridge.togglePresentationFullscreen()" style="background: transparent; border: 1px solid ${border}; color: ${textSecondary}; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;">
              ⛶ Full
            </button>
          </div>
        </header>

        <!-- Progress Bar -->
        <div style="height: 3px; background: ${border}; width: 100%;">
          <div style="height: 100%; background: var(--gold); width: ${progressPercent}%; transition: width 0.3s ease;"></div>
        </div>

        <!-- Main Scene Container -->
        <main class="presentation-stage" style="flex: 1; overflow-y: auto; display: flex; align-items: center; justify-content: center; padding: 20px;">
          ${this.renderScene(currentScene, themeMode)}
        </main>

        <!-- Navigation Controls (Bottom Bar) -->
        <footer class="presentation-footer" style="height: 52px; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid ${border}; background: ${surface};">
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: ${textSecondary}; display: flex; gap: 14px;">
            <span>Rol: <strong>${currentScene.getRole()}</strong></span>
            <span>Tipo: <strong>${currentScene.getType()}</strong></span>
            <span>Est: <strong>≈${currentScene.getEstimatedSeconds()}s</strong></span>
          </div>

          <div style="display: flex; gap: 10px;">
            <button onclick="window.VentureHubBridge.prevPresentationScene()" ${activeSceneIndex === 0 ? 'disabled' : ''} style="background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}; border: 1px solid ${border}; color: ${textPrimary}; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; opacity: ${activeSceneIndex === 0 ? '0.4' : '1'};">
              ← Anterior
            </button>
            <button onclick="window.VentureHubBridge.nextPresentationScene()" ${activeSceneIndex === total - 1 ? 'disabled' : ''} style="background: var(--gold); border: none; color: #000; font-weight: 600; padding: 6px 20px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; opacity: ${activeSceneIndex === total - 1 ? '0.4' : '1'};">
              Siguiente →
            </button>
          </div>
        </footer>

        <!-- Overview Drawer Modal -->
        <div id="v2OverviewDrawer" style="position: fixed; inset: 56px 0 0 0; background: ${bg}f0; backdrop-filter: blur(12px); display: none; z-index: 10001; overflow-y: auto; padding: 32px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; max-width: 1200px; margin-left: auto; margin-right: auto;">
            <h2 style="font-size: 1.3rem; margin: 0; color: ${textPrimary};">Esquema Ejecutivo de la Presentación (${total} Escenas)</h2>
            <button onclick="window.VentureHubBridge.togglePresentationOverview()" style="background: transparent; border: 1px solid ${border}; color: ${textPrimary}; padding: 6px 14px; border-radius: 6px; cursor: pointer;">Cerrar ✕</button>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; max-width: 1200px; margin: 0 auto;">
            ${presentation.getScenes().map((sc, idx) => `
              <div onclick="window.VentureHubBridge.goToPresentationScene(${idx})" style="background: ${surface}; border: 1px solid ${idx === activeSceneIndex ? 'var(--gold)' : border}; border-radius: 8px; padding: 16px; cursor: pointer; transition: transform 0.15s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--gold);">${String(sc.getOrder()).padStart(2, '0')}</span>
                  <span style="font-family: var(--font-mono); font-size: 0.68rem; color: ${textSecondary};">${sc.getRole()}</span>
                </div>
                <div style="font-size: 0.88rem; font-weight: 600; color: ${textPrimary}; line-height: 1.3;">
                  ${sc.getTitle().es || sc.getTitle().en}
                </div>
                <div style="font-size: 0.72rem; color: ${textSecondary}; margin-top: 6px;">
                  ${sc.getType()} · ≈${sc.getEstimatedSeconds()}s
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }
}
