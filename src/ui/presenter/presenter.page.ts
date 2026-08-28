import { PresentationDefinitionEntity } from '../../modules/presentation/domain/entities/presentation-definition.entity';
import { PresenterContext } from '../../modules/presenter/application/use-cases/get-presenter-context.use-case';
import { PresentationRenderer } from '../presentation/presentation-renderer';
import { renderPresenterTimer } from './components/presenter-timer.component';
import { renderSpeakerNotes } from './components/speaker-notes.component';
import { renderPresenterTrustPanel } from './components/presenter-trust-panel.component';
import { renderPresenterQaPanel } from './components/presenter-qa-panel.component';
import { renderPresenterOverview } from './components/presenter-overview.component';
import { renderSessionSummary } from './components/session-summary.component';

export function renderPresenterPage(
  presentation: PresentationDefinitionEntity,
  context: PresenterContext,
  renderer: PresentationRenderer,
  activeTab: 'NOTES' | 'TRUST' | 'QA' | 'SPEECH' = 'NOTES',
  isOverviewOpen = false
): string {
  const session = context.session;
  const status = session.getStatus();

  if (status === 'ENDED') {
    const summary = session.buildSummary(presentation);
    return `
      <div class="presenter-cockpit-wrapper" style="position: fixed; inset: 0; background: #030712; color: #f8fafc; z-index: 10000; overflow-y: auto; padding: 40px 20px; font-family: 'Inter', -apple-system, sans-serif;">
        ${renderSessionSummary(summary)}
      </div>
    `;
  }

  const currentScene = context.currentScene;
  const nextScene = context.nextScene;
  const total = presentation.getScenes().length;
  const currentIndex = session.getCurrentSceneIndex();

  return `
    <div class="presenter-cockpit-wrapper" style="position: fixed; inset: 0; background: #030712; color: #f8fafc; display: flex; flex-direction: column; overflow: hidden; z-index: 10000; font-family: 'Inter', -apple-system, sans-serif;">
      
      <!-- Top Cockpit Control Bar -->
      <header style="height: 64px; padding: 0 20px; background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; gap: 14px;">
        
        <!-- Left: Project Identity & Status -->
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onclick="window.VentureHubBridge.closePresenterCockpit()" style="background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;">
            ✕ Salir
          </button>
          <div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #ffffff;">
              COCKPIT: ${presentation.getProjectId().toUpperCase()}
            </div>
            <div style="font-size: 0.72rem; color: #94a3b8;">
              ${presentation.getAudience()} · ${presentation.getObjective()}
            </div>
          </div>
        </div>

        <!-- Center: Pitch & Scene Timers -->
        <div>
          ${renderPresenterTimer(context.timing, status === 'RUNNING')}
        </div>

        <!-- Right: Session Actions & Navigation -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <!-- Mic / Speech Toggle -->
          <button onclick="window.VentureHubBridge.toggleLiveSpeech()" style="background: rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.4); color: #38bdf8; font-weight: 600; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.78rem; display: flex; align-items: center; gap: 6px;" title="Activar/Desactivar Escucha en Vivo (Shift+L)">
            <span>🎙️</span>
            <span>Escucha ES/EN</span>
          </button>

          <!-- Play / Pause Toggle -->
          <button onclick="window.VentureHubBridge.togglePresenterPlayPause()" style="background: ${status === 'RUNNING' ? '#f59e0b' : 'var(--gold)'}; border: none; color: #000; font-weight: 700; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
            ${status === 'RUNNING' ? '⏸ Pausar' : (status === 'PAUSED' ? '▶ Reanudar' : '▶ Iniciar')}
          </button>

          <!-- Overview Toggle -->
          <button onclick="window.VentureHubBridge.togglePresenterOverview()" style="background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;">
            ▦ Grid
          </button>

          <!-- Fullscreen Toggle -->
          <button onclick="window.VentureHubBridge.togglePresenterFullscreen()" style="background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;">
            ⛶ Full
          </button>

          <!-- End Session -->
          <button onclick="window.VentureHubBridge.endPresenterSession()" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;">
            ■ Finalizar
          </button>
        </div>
      </header>

      <!-- Cockpit Main Workspace (Dual Split Panel) -->
      <div style="flex: 1; display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; padding: 14px; overflow: hidden;">
        
        <!-- Left Column: Current Scene Embedded Preview + Speaker Notes -->
        <div style="display: flex; flex-direction: column; gap: 12px; overflow: hidden;">
          
          <!-- Current Scene Embedded Container -->
          <div style="flex: 1; background: #080d1a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow-y: auto; padding: 16px; display: flex; flex-direction: column;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold); margin-bottom: 8px; display: flex; justify-content: space-between;">
              <span>ESCENA ACTUAL (${currentIndex + 1} / ${total})</span>
              <span>${currentScene.getRole()}</span>
            </div>
            <div style="flex: 1; transform: scale(0.92); transform-origin: top center;">
              ${renderer.renderScene(currentScene, 'DARK')}
            </div>
          </div>

          <!-- Quick Navigation Ribbon -->
          <div style="height: 48px; background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px;">
            <div style="display: flex; gap: 8px;">
              <button onclick="window.VentureHubBridge.prevPresenterScene()" ${currentIndex === 0 ? 'disabled' : ''} style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
                ◀ Anterior
              </button>
              <button onclick="window.VentureHubBridge.nextPresenterScene()" ${currentIndex >= total - 1 ? 'disabled' : ''} style="background: var(--gold); border: none; color: #000; font-weight: 700; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
                Siguiente ▶
              </button>
            </div>

            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">
              Escena ${currentIndex + 1} de ${total}
            </div>
          </div>

        </div>

        <!-- Right Column: Next Scene Peek + Context Drawers (Notes / Trust / Q&A) -->
        <div style="display: flex; flex-direction: column; gap: 12px; overflow: hidden;">
          
          <!-- Next Scene Peek Card -->
          <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="font-family: var(--font-mono); font-size: 0.68rem; color: #64748b; margin-bottom: 4px; text-transform: uppercase;">
              Próxima Escena (Preview)
            </div>
            ${nextScene ? `
              <div style="font-size: 0.95rem; font-weight: 700; color: #f8fafc;">
                ${nextScene.getTitle().es || nextScene.getTitle().en}
              </div>
              <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 4px; display: flex; gap: 10px;">
                <span>${nextScene.getType()}</span>
                <span>≈${nextScene.getEstimatedSeconds()}s</span>
                ${nextScene.getTrustBindings().some(t => t.warningCode) ? `<span style="color:#ef4444;font-weight:700;">⚠️ Alertas</span>` : ''}
              </div>
            ` : `
              <div style="font-size: 0.85rem; color: #64748b; font-style: italic;">
                Fin de la presentación.
              </div>
            `}
          </div>

          <!-- Context Tabs Container (Notes / Trust / Q&A) -->
          <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; display: flex; flex-direction: column; overflow: hidden;">
            
            <!-- Tab Headers -->
            <div style="display: flex; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <button onclick="window.VentureHubBridge.setPresenterTab('NOTES')" style="flex: 1; padding: 10px; background: ${activeTab === 'NOTES' ? 'rgba(255,255,255,0.05)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'NOTES' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'NOTES' ? '#ffffff' : '#94a3b8'}; font-weight: 600; font-size: 0.8rem; cursor: pointer;">
                📝 Notas (${context.notes.length})
              </button>
              <button onclick="window.VentureHubBridge.setPresenterTab('SPEECH')" style="flex: 1; padding: 10px; background: ${activeTab === 'SPEECH' ? 'rgba(255,255,255,0.05)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'SPEECH' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'SPEECH' ? '#ffffff' : '#94a3b8'}; font-weight: 600; font-size: 0.8rem; cursor: pointer;">
                🎙️ Escucha
              </button>
              <button onclick="window.VentureHubBridge.setPresenterTab('TRUST')" style="flex: 1; padding: 10px; background: ${activeTab === 'TRUST' ? 'rgba(255,255,255,0.05)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'TRUST' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'TRUST' ? '#ffffff' : '#94a3b8'}; font-weight: 600; font-size: 0.8rem; cursor: pointer;">
                🛡️ Trust (${context.trustAlerts.length})
              </button>
              <button onclick="window.VentureHubBridge.setPresenterTab('QA')" style="flex: 1; padding: 10px; background: ${activeTab === 'QA' ? 'rgba(255,255,255,0.05)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'QA' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'QA' ? '#ffffff' : '#94a3b8'}; font-weight: 600; font-size: 0.8rem; cursor: pointer;">
                💡 Q&A (${context.qaCards.length})
              </button>
            </div>

            <!-- Tab Content -->
            <div style="flex: 1; overflow-y: auto; padding: 14px;">
              ${activeTab === 'NOTES' ? renderSpeakerNotes(context.notes) : ''}
              ${activeTab === 'SPEECH' ? `
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.07);">
                    <div style="font-size: 0.78rem; font-weight: 600;">Monitor de Voz Bilingüe</div>
                    <button onclick="window.VentureHubBridge.openTranscriptDrawer()" style="background: rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.3); color: #38bdf8; padding: 3px 8px; border-radius: 4px; font-size: 0.72rem; cursor: pointer;">
                      Abrir Minutas ↗
                    </button>
                  </div>
                  <div id="cockpitLiveSpeechFeed" style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.4; background: #080d1a; padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05); min-height: 120px;">
                    <div style="color: #64748b; font-style: italic; font-size: 0.78rem;">El texto hablado en español o inglés aparecerá transcrito y traducido en tiempo real en la barra de subtítulos y minutas.</div>
                  </div>
                </div>
              ` : ''}
              ${activeTab === 'TRUST' ? renderPresenterTrustPanel(context.trustAlerts, presentation.getTrustSummary()) : ''}
              ${activeTab === 'QA' ? renderPresenterQaPanel(context.qaCards) : ''}
            </div>

          </div>

        </div>

      </div>

      <!-- Overview Drawer Modal -->
      <div id="presenterOverviewDrawer" style="position: fixed; inset: 64px 0 0 0; background: rgba(3,7,18,0.95); backdrop-filter: blur(14px); display: ${isOverviewOpen ? 'block' : 'none'}; z-index: 10001; overflow-y: auto; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto 20px auto;">
          <h2 style="font-size: 1.25rem; font-weight: 700; margin: 0;">Navegador de Escenas en Vivo</h2>
          <button onclick="window.VentureHubBridge.togglePresenterOverview()" style="background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; padding: 6px 14px; border-radius: 6px; cursor: pointer;">
            Cerrar ✕
          </button>
        </div>
        <div style="max-width: 1200px; margin: 0 auto;">
          ${renderPresenterOverview(presentation, session)}
        </div>
      </div>

    </div>
  `;
}
