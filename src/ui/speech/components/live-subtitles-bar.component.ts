import { SpeechUtteranceEntity } from '../../../modules/speech-intelligence/domain/speech-utterance.entity';

export function renderLiveSubtitlesBar(
  currentUtterance: SpeechUtteranceEntity | null,
  isListening: boolean,
  primaryLang: 'es' | 'en' = 'es'
): string {
  const detectedLang = currentUtterance ? currentUtterance.getSourceLanguage() : primaryLang;
  const esText = currentUtterance ? currentUtterance.getSpanishText() : '';
  const enText = currentUtterance ? currentUtterance.getEnglishText() : '';
  const isInterim = currentUtterance ? !currentUtterance.getIsFinal() : false;
  const pending = currentUtterance ? currentUtterance.getTranslationPending() : false;

  const esIsSource = detectedLang === 'es';
  const enIsSource = detectedLang === 'en';

  const esPending = !esIsSource && pending;
  const enPending = !enIsSource && pending;

  return `
    <div id="liveSubtitlesHUD" class="live-subtitles-hud ${isListening ? 'is-active' : 'is-idle'}" aria-live="polite">
      
      <!-- Subtitle Header & Status -->
      <div class="subtitles-hud-header">
        <div class="subtitles-hud-left">
          <div class="speech-vu-meter" id="speechVuMeter" title="Nivel de audio en vivo">
            <span class="vu-bar bar-1"></span>
            <span class="vu-bar bar-2"></span>
            <span class="vu-bar bar-3"></span>
            <span class="vu-bar bar-4"></span>
          </div>
          <span class="speech-status-pill ${isListening ? 'is-live' : ''}">
            <span class="speech-dot"></span>
            <span id="speechStatusText">${isListening ? 'ESCโมCHANDO / LISTENING' : 'EN ESPERA / IDLE'}</span>
          </span>
          <span class="speech-lang-indicator" style="font-size:0.7rem; color:#94a3b8; margin-left:4px;">
            ${primaryLang === 'es' ? '🎤 Mic: <strong>Español 🇪🇸</strong>' : '🎤 Mic: <strong>English 🇬🇧</strong>'}
          </span>
        </div>

        <div class="subtitles-hud-actions">
          <!-- Direct Language Switcher Pill -->
          <div class="speech-lang-pill-selector" style="display:inline-flex; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:8px; overflow:hidden;">
            <button type="button" onclick="window.VentureHubBridge.setSpeechLanguage('es')" style="background:${primaryLang === 'es' ? 'rgba(245,158,11,0.25)' : 'transparent'}; color:${primaryLang === 'es' ? '#fcd34d' : '#94a3b8'}; border:none; padding:4px 9px; font-size:0.72rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px;" title="Configurar micrófono para hablar en Español">
              <span>🇪🇸</span>
              <span>ES</span>
            </button>
            <button type="button" onclick="window.VentureHubBridge.setSpeechLanguage('en')" style="background:${primaryLang === 'en' ? 'rgba(56,189,248,0.25)' : 'transparent'}; color:${primaryLang === 'en' ? '#7dd3fc' : '#94a3b8'}; border:none; padding:4px 9px; font-size:0.72rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px;" title="Set microphone to listen in English">
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          <!-- Open Full Transcript Drawer -->
          <button type="button" class="subtitles-tool-btn" onclick="window.VentureHubBridge.openTranscriptDrawer()" title="Abrir registro completo de transcripción y minutas">
            <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>Minutas</span>
          </button>

          <!-- Minimize / Hide -->
          <button type="button" class="subtitles-tool-btn btn-close-subtitles" onclick="window.VentureHubBridge.toggleSubtitlesBar(false)" title="Ocultar barra de subtítulos">
            ✕
          </button>
        </div>
      </div>

      <!-- Bilingual Subtitle Stream Lines -->
      <div class="subtitles-stream-box ${isInterim ? 'is-typing' : ''}">
        
        <!-- Spanish Line -->
        <div class="subtitle-track track-es">
          <div class="subtitle-badge">
            <span class="badge-flag">🇪🇸</span>
            <span class="badge-code">ES</span>
            <span class="badge-role" style="font-size:0.6rem; opacity:0.8; margin-left:2px;">${esIsSource ? 'VOZ' : 'TRAD'}</span>
          </div>
          <div class="subtitle-content" id="subtitlesTextEs">
            ${esText
              ? `${escapeHtml(esText)}${esPending ? ' <span class="subtitle-pending" style="color:#f59e0b;font-size:0.75rem;">· traduciendo…</span>' : ''}`
              : '<span class="subtitle-placeholder">Escuchando audio en tiempo real...</span>'}
          </div>
        </div>

        <!-- English Line -->
        <div class="subtitle-track track-en">
          <div class="subtitle-badge">
            <span class="badge-flag">🇬🇧</span>
            <span class="badge-code">EN</span>
            <span class="badge-role" style="font-size:0.6rem; opacity:0.8; margin-left:2px;">${enIsSource ? 'VOICE' : 'TRANS'}</span>
          </div>
          <div class="subtitle-content" id="subtitlesTextEn">
            ${enText
              ? `${escapeHtml(enText)}${enPending ? ' <span class="subtitle-pending" style="color:#38bdf8;font-size:0.75rem;">· translating…</span>' : ''}`
              : '<span class="subtitle-placeholder">Listening live audio stream...</span>'}
          </div>
        </div>

      </div>

    </div>
  `;
}

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
