import { ListenLiveSpeechUseCase } from '../../modules/speech-intelligence/application/listen-live-speech.use-case';
import { ExportTranscriptUseCase } from '../../modules/speech-intelligence/application/export-transcript.use-case';
import { SpeechUtteranceEntity, SupportedSpeechLanguage } from '../../modules/speech-intelligence/domain/speech-utterance.entity';
import { renderLiveSubtitlesBar } from './components/live-subtitles-bar.component';
import { renderTranscriptDrawer } from './components/transcript-drawer.component';

export class SpeechUIController {
  private isSubtitlesVisible: boolean = true;
  private isDrawerOpen: boolean = false;
  private currentSearchQuery: string = '';
  private activeFilterSlide: number | null = null;
  private latestUtterance: SpeechUtteranceEntity | null = null;
  private pausedForTts: boolean = false;

  constructor(
    private readonly listenUseCase: ListenLiveSpeechUseCase,
    private readonly exportUseCase: ExportTranscriptUseCase
  ) {
    this.bindUseCaseEvents();
    this.bindKeyboardShortcuts();
  }

  private bindUseCaseEvents(): void {
    this.listenUseCase.setCallbacks({
      onUtteranceChange: (utterance) => {
        this.latestUtterance = utterance;
        this.updateSubtitlesDOM();
        if (this.isDrawerOpen) {
          this.renderDrawerDOM();
        }
      },
      onStatusChange: (_status, isListening) => {
        this.updateHUDStatusDOM(isListening);
      },
      onAudioLevel: (level) => {
        this.updateVuMeter(level);
      },
      onError: (error) => {
        console.warn('[SpeechUIController]', error);
        const raw = String(error || '');
        if (/not-allowed|NotAllowed|permission|denied/i.test(raw)) {
          this.notifyUser(
            'Permiso de micrófono denegado. Actívalo en el navegador.',
            'Microphone permission denied. Enable it in the browser.'
          );
          this.updateHUDButtonState(false);
        } else if (/network/i.test(raw)) {
          this.notifyUser(
            'Sin red para reconocimiento de voz. Revisa la conexión.',
            'No network for speech recognition. Check your connection.'
          );
        } else if (/audio-capture|NotFound/i.test(raw)) {
          this.notifyUser(
            'No se detectó micrófono.',
            'No microphone detected.'
          );
        }
      }
    });
  }

  private bindKeyboardShortcuts(): void {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Shift + L: Toggle live speech listening
      if (e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        this.toggleLiveSpeech();
      }
      // Alt + L: Toggle transcript drawer
      if (e.altKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        this.toggleDrawer();
      }
    });
  }

  async toggleLiveSpeech(): Promise<boolean> {
    const projectId = (window as any).activeDeck || 'hub';
    const deckId = (window as any).activeDeck || 'presentation';
    const currentSlide = typeof (window as any).currentSlide === 'number'
      ? (window as any).currentSlide
      : 1;

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        this.notifyUser(
          'Escucha solo funciona en Chrome o Edge con micrófono.',
          'Live listen works in Chrome or Edge with a microphone.'
        );
        return false;
      }

      const isActive = await this.listenUseCase.toggleListening(projectId, deckId, currentSlide);
      this.ensureMountsExist();
      this.renderSubtitlesDOM();
      this.updateHUDButtonState(isActive);
      return isActive;
    } catch (err: any) {
      const raw = String(err?.message || err || '');
      console.warn('[SpeechUIController] toggle failed:', err);
      this.updateHUDButtonState(false);
      if (/NotAllowed|permission|denied/i.test(raw)) {
        this.notifyUser(
          'Permiso de micrófono denegado. Actívalo en el navegador.',
          'Microphone permission denied. Enable it in the browser.'
        );
      } else if (/not supported/i.test(raw)) {
        this.notifyUser(
          'Escucha solo funciona en Chrome o Edge con micrófono.',
          'Live listen works in Chrome or Edge with a microphone.'
        );
      } else {
        this.notifyUser(
          'No se pudo iniciar el motor de escucha.',
          'Could not start the speech engine.'
        );
      }
      return false;
    }
  }

  private notifyUser(messageEs: string, messageEn: string): void {
    const lang = (window as any).currentLang === 'en' ? 'en' : 'es';
    const msg = lang === 'en' ? messageEn : messageEs;
    const toast = (window as any).showToast;
    if (typeof toast === 'function') toast(msg);
  }

  setSlide(slideIndex: number): void {
    this.listenUseCase.setSlideIndex(slideIndex);
    this.latestUtterance = null;
    this.updateSubtitlesDOM();
  }

  setSpeechLanguage(lang: SupportedSpeechLanguage): void {
    this.listenUseCase.setListeningLanguage(lang);
    this.renderSubtitlesDOM();
    if (this.isDrawerOpen) this.renderDrawerDOM();
    this.notifyUser(
      lang === 'es' ? 'Micrófono configurado en Español 🇪🇸' : 'Microphone set to English 🇬🇧',
      lang === 'es' ? 'Microphone set to Spanish 🇪🇸' : 'Microphone set to English 🇬🇧'
    );
  }

  toggleSpeechLanguage(): void {
    const session = this.listenUseCase.getSession();
    const currentLang = session ? session.getPrimaryListeningLanguage() : 'es';
    const nextLang: SupportedSpeechLanguage = currentLang === 'es' ? 'en' : 'es';
    this.setSpeechLanguage(nextLang);
  }

  toggleSubtitlesVisibility(show?: boolean): void {
    this.isSubtitlesVisible = show !== undefined ? show : !this.isSubtitlesVisible;
    const hud = document.getElementById('liveSubtitlesHUD');
    if (hud) {
      hud.style.display = this.isSubtitlesVisible ? 'flex' : 'none';
    }
  }

  openDrawer(): void {
    this.isDrawerOpen = true;
    this.ensureMountsExist();
    this.renderDrawerDOM();
    const drawer = document.getElementById('transcriptDrawerMount');
    if (drawer) drawer.style.display = 'block';
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    const drawer = document.getElementById('transcriptDrawerMount');
    if (drawer) drawer.style.display = 'none';
  }

  toggleDrawer(): void {
    if (this.isDrawerOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  filterTranscript(query: string): void {
    this.currentSearchQuery = query;
    this.renderDrawerDOM();
  }

  copyToClipboard(): boolean {
    const session = this.listenUseCase.getSession();
    if (!session) return false;
    const md = this.exportUseCase.execute(session, {
      format: 'MARKDOWN',
      mode: 'BILINGUAL_DUAL',
      includeTimestamps: true
    });
    navigator.clipboard.writeText(md);
    return true;
  }

  copySingleUtterance(utteranceId: string): boolean {
    const session = this.listenUseCase.getSession();
    if (!session) return false;
    const u = session.getUtterances().find(item => item.getId() === utteranceId);
    if (!u) return false;
    const text = `[ES]: ${u.getSpanishText()}\n[EN]: ${u.getEnglishText()}`;
    navigator.clipboard.writeText(text);
    return true;
  }

  downloadMarkdown(): void {
    const session = this.listenUseCase.getSession();
    if (!session) return;
    const md = this.exportUseCase.execute(session, {
      format: 'MARKDOWN',
      mode: 'BILINGUAL_DUAL',
      includeTimestamps: true
    });
    this.triggerDownload(`minuta_${session.getProjectId()}_${new Date().toISOString().slice(0, 10)}.md`, md);
  }

  downloadTxt(): void {
    const session = this.listenUseCase.getSession();
    if (!session) return;
    const txt = this.exportUseCase.execute(session, {
      format: 'TXT',
      mode: 'BILINGUAL_DUAL',
      includeTimestamps: true
    });
    this.triggerDownload(`minuta_${session.getProjectId()}_${new Date().toISOString().slice(0, 10)}.txt`, txt);
  }

  clearSession(): void {
    const session = this.listenUseCase.getSession();
    if (session) {
      session.clearUtterances();
      this.latestUtterance = null;
      this.renderSubtitlesDOM();
      this.renderDrawerDOM();
    }
  }

  private triggerDownload(filename: string, content: string): void {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private ensureMountsExist(): void {
    if (typeof document === 'undefined') return;

    if (!document.getElementById('liveSubtitlesContainer')) {
      const subContainer = document.createElement('div');
      subContainer.id = 'liveSubtitlesContainer';
      document.body.appendChild(subContainer);
    }

    if (!document.getElementById('transcriptDrawerMount')) {
      const drawerMount = document.createElement('div');
      drawerMount.id = 'transcriptDrawerMount';
      drawerMount.style.display = 'none';
      document.body.appendChild(drawerMount);
    }
  }

  renderSubtitlesDOM(): void {
    this.ensureMountsExist();
    const container = document.getElementById('liveSubtitlesContainer');
    if (!container) return;

    const isListening = this.listenUseCase.isCurrentlyListening();
    const session = this.listenUseCase.getSession();
    const primaryLang = session ? session.getPrimaryListeningLanguage() : 'es';

    container.innerHTML = renderLiveSubtitlesBar(this.latestUtterance, isListening, primaryLang);
    container.style.display = this.isSubtitlesVisible ? 'block' : 'none';
  }

  private updateSubtitlesDOM(): void {
    const esEl = document.getElementById('subtitlesTextEs');
    const enEl = document.getElementById('subtitlesTextEn');
    if (esEl && enEl && this.latestUtterance) {
      const es = this.latestUtterance.getSpanishText() || '';
      const en = this.latestUtterance.getEnglishText() || '';
      const pending = this.latestUtterance.getTranslationPending();
      const session = this.listenUseCase.getSession();
      const primary = session ? session.getPrimaryListeningLanguage() : 'es';
      esEl.textContent = es || '...';
      enEl.textContent = en || '...';
      if (primary === 'es' && en && pending) {
        enEl.innerHTML = `${escapeHud(en)} <span class="subtitle-pending">· translating…</span>`;
      } else if (primary === 'en' && es && pending) {
        esEl.innerHTML = `${escapeHud(es)} <span class="subtitle-pending">· traduciendo…</span>`;
      }
    } else {
      this.renderSubtitlesDOM();
    }
  }

  /** Called by legacy TTS briefing to avoid mic picking up speakers. */
  pauseListeningForTts(): void {
    if (this.listenUseCase.pauseForTts()) {
      this.pausedForTts = true;
      this.updateHUDButtonState(false);
    }
  }

  async resumeListeningAfterTts(): Promise<void> {
    if (!this.pausedForTts) return;
    this.pausedForTts = false;
    const ok = await this.listenUseCase.resumeAfterTts();
    this.updateHUDButtonState(ok);
  }

  private updateHUDStatusDOM(isListening: boolean): void {
    const statusText = document.getElementById('speechStatusText');
    const statusPill = document.querySelector('.speech-status-pill');
    const hud = document.getElementById('liveSubtitlesHUD');
    if (statusText) {
      statusText.textContent = isListening ? 'EN VIVO / LIVE' : 'EN ESPERA / IDLE';
    }
    if (statusPill) {
      statusPill.classList.toggle('is-live', isListening);
    }
    if (hud) {
      hud.classList.toggle('is-active', isListening);
      hud.classList.toggle('is-idle', !isListening);
    }
    this.updateHUDButtonState(isListening);
  }

  private updateHUDButtonState(isListening: boolean): void {
    const hudBtn = document.getElementById('hudLiveSpeechBtn');
    if (hudBtn) {
      hudBtn.classList.toggle('is-recording', isListening);
      const textSpan = hudBtn.querySelector('.speech-btn-text');
      if (textSpan) {
        textSpan.textContent = isListening ? 'Escuchando' : 'Escucha';
      }
    }
  }

  private updateVuMeter(level: number): void {
    const bars = document.querySelectorAll('#speechVuMeter .vu-bar');
    bars.forEach((bar, index) => {
      const el = bar as HTMLElement;
      const height = Math.max(4, Math.min(22, (level / 100) * 22 * (1 + index * 0.2)));
      el.style.height = `${height}px`;
    });
  }

  renderDrawerDOM(): void {
    this.ensureMountsExist();
    const mount = document.getElementById('transcriptDrawerMount');
    if (!mount) return;

    const scrollEl = document.getElementById('transcriptStreamScroll');
    const prevScroll = scrollEl ? scrollEl.scrollTop : 0;
    const searchInput = document.getElementById('transcriptSearchInput') as HTMLInputElement | null;
    const hadSearchFocus = document.activeElement === searchInput;
    const caret = searchInput ? searchInput.selectionStart : null;

    const session = this.listenUseCase.getSession();
    mount.innerHTML = renderTranscriptDrawer(session, this.activeFilterSlide, this.currentSearchQuery);

    const nextScroll = document.getElementById('transcriptStreamScroll');
    if (nextScroll) {
      if (this.listenUseCase.isCurrentlyListening()) {
        nextScroll.scrollTop = nextScroll.scrollHeight;
      } else {
        nextScroll.scrollTop = prevScroll;
      }
    }

    const nextSearch = document.getElementById('transcriptSearchInput') as HTMLInputElement | null;
    if (nextSearch && hadSearchFocus) {
      nextSearch.focus();
      if (typeof caret === 'number') {
        try {
          nextSearch.setSelectionRange(caret, caret);
        } catch { /* ignore */ }
      }
    }
  }
}

function escapeHud(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
