import { IWebSpeechAdapter } from '../adapters/web-speech.adapter';
import { SpeechSessionEntity } from '../domain/speech-session.entity';
import { SpeechUtteranceEntity, SupportedSpeechLanguage } from '../domain/speech-utterance.entity';
import { BilingualTranslationUseCase } from './bilingual-translation.use-case';

export interface LiveSpeechListenerCallbacks {
  onUtteranceChange?: (utterance: SpeechUtteranceEntity, session: SpeechSessionEntity) => void;
  onStatusChange?: (status: string, isListening: boolean) => void;
  onAudioLevel?: (level: number) => void;
  onError?: (error: string) => void;
}

export class ListenLiveSpeechUseCase {
  private currentSession: SpeechSessionEntity | null = null;
  private currentUtteranceId: string | null = null;
  private callbacks: LiveSpeechListenerCallbacks = {};
  private translationSeq = 0;
  private networkUpgradeSeq = 0;
  private interimUpgradeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly webSpeechAdapter: IWebSpeechAdapter,
    private readonly translationUseCase: BilingualTranslationUseCase
  ) {
    this.setupAdapterListeners();
  }

  private setupAdapterListeners(): void {
    this.webSpeechAdapter.onResult((event) => {
      if (!this.currentSession || this.currentSession.getStatus() !== 'LISTENING') return;

      const slideIndex = this.currentSession.getCurrentSlideIndex();
      const deckId = this.currentSession.getDeckId();
      const seq = ++this.translationSeq;
      const sessionLang = this.currentSession.getPrimaryListeningLanguage();
      const detectedLang = this.translationUseCase.detectLanguage(event.text);
      // Prefer detected language if text has strong language signals, otherwise fallback to session mic language
      const sourceLang = detectedLang || sessionLang;

      // 1) Paint instantly with local dictionary — never wait for network
      const instant = this.translationUseCase.executeInstant(event.text, sourceLang);
      const utterance = this.upsertUtterance(
        instant.originalText,
        instant.spanishText,
        instant.englishText,
        instant.sourceLanguage,
        event.isFinal,
        event.confidence,
        slideIndex,
        deckId
      );
      utterance.setTranslationPending(true);
      utterance.setTranslationQuality('instant');

      if (this.callbacks.onUtteranceChange) {
        this.callbacks.onUtteranceChange(utterance, this.currentSession);
      }

      // Network upgrade: finals immediately; interim debounced to avoid request storms
      const utteranceId = utterance.getId();
      const upgradeSeq = ++this.networkUpgradeSeq;
      if (event.isFinal) {
        if (this.interimUpgradeTimer) {
          clearTimeout(this.interimUpgradeTimer);
          this.interimUpgradeTimer = null;
        }
        void this.upgradeTranslation(utteranceId, event.text, sourceLang, seq, upgradeSeq, true);
        this.currentUtteranceId = null;
      } else {
        if (this.interimUpgradeTimer) clearTimeout(this.interimUpgradeTimer);
        this.interimUpgradeTimer = setTimeout(() => {
          this.interimUpgradeTimer = null;
          void this.upgradeTranslation(utteranceId, event.text, sourceLang, seq, upgradeSeq, false);
        }, 220);
      }
    });

    this.webSpeechAdapter.onError((error) => {
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
    });

    this.webSpeechAdapter.onAudioLevel((level) => {
      if (this.callbacks.onAudioLevel) {
        this.callbacks.onAudioLevel(level);
      }
    });

    this.webSpeechAdapter.onStatusChange((isActive) => {
      if (this.currentSession) {
        this.currentSession.setStatus(isActive ? 'LISTENING' : 'PAUSED');
      }
      if (this.callbacks.onStatusChange) {
        this.callbacks.onStatusChange(isActive ? 'LISTENING' : 'PAUSED', isActive);
      }
    });
  }

  private upsertUtterance(
    originalText: string,
    spanishText: string,
    englishText: string,
    sourceLanguage: SupportedSpeechLanguage,
    isFinal: boolean,
    confidence: number,
    slideIndex: number,
    deckId: string
  ): SpeechUtteranceEntity {
    if (!this.currentSession) {
      throw new Error('No active speech session');
    }

    if (this.currentUtteranceId) {
      const existing = this.currentSession.getUtterances().find(u => u.getId() === this.currentUtteranceId);
      if (existing) {
        existing.updateContent(originalText, spanishText, englishText, isFinal, confidence);
        return existing;
      }
    }

    const newId = 'utt_' + Math.random().toString(36).substring(2, 9);
    this.currentUtteranceId = newId;
    const utterance = new SpeechUtteranceEntity({
      id: newId,
      timestamp: Date.now(),
      slideIndex,
      deckId,
      sourceLanguage,
      originalText,
      spanishText,
      englishText,
      isFinal,
      confidence
    });
    this.currentSession.addOrUpdateUtterance(utterance);
    return utterance;
  }

  private async upgradeTranslation(
    utteranceId: string,
    text: string,
    sourceLang: SupportedSpeechLanguage,
    speechSeq: number,
    upgradeSeq: number,
    isFinal: boolean
  ): Promise<void> {
    try {
      const quality = await this.translationUseCase.execute(text, sourceLang);
      // Drop if a newer speech chunk or newer upgrade started
      if (!isFinal && speechSeq !== this.translationSeq) return;
      if (upgradeSeq !== this.networkUpgradeSeq && !isFinal) return;
      if (!this.currentSession) return;

      const target = this.currentSession.getUtterances().find(u => u.getId() === utteranceId);
      if (!target) return;

      const beforeEn = target.getEnglishText();
      const beforeEs = target.getSpanishText();
      const improved =
        (quality.englishText && quality.englishText !== beforeEn)
        || (quality.spanishText && quality.spanishText !== beforeEs);

      if (improved) {
        target.updateContent(
          quality.originalText,
          quality.spanishText,
          quality.englishText,
          isFinal || target.getIsFinal(),
          target.getConfidence()
        );
        target.setTranslationQuality(quality.quality);
      }

      // Clear pending once network attempt finished (success or dictionary-only)
      target.setTranslationPending(false);

      if (this.callbacks.onUtteranceChange) {
        this.callbacks.onUtteranceChange(target, this.currentSession);
      }
    } catch {
      if (!this.currentSession) return;
      const target = this.currentSession.getUtterances().find(u => u.getId() === utteranceId);
      if (target) {
        target.setTranslationPending(false);
        if (this.callbacks.onUtteranceChange) {
          this.callbacks.onUtteranceChange(target, this.currentSession);
        }
      }
    }
  }

  /** Pause STT while TTS briefing plays (anti-echo). */
  pauseForTts(): boolean {
    if (!this.isCurrentlyListening()) return false;
    this.webSpeechAdapter.stop();
    if (this.currentSession) {
      this.currentSession.setStatus('PAUSED');
    }
    if (this.callbacks.onStatusChange) {
      this.callbacks.onStatusChange('PAUSED', false);
    }
    return true;
  }

  /** Resume STT after TTS ends, if session still exists. */
  async resumeAfterTts(): Promise<boolean> {
    if (!this.currentSession) return false;
    if (this.currentSession.getStatus() === 'LISTENING') return true;
    if (this.currentSession.getStatus() === 'STOPPED') return false;
    const lang = this.currentSession.getPrimaryListeningLanguage();
    this.currentSession.setStatus('LISTENING');
    await this.webSpeechAdapter.start(lang);
    if (this.callbacks.onStatusChange) {
      this.callbacks.onStatusChange('LISTENING', true);
    }
    return true;
  }

  setCallbacks(callbacks: LiveSpeechListenerCallbacks): void {
    this.callbacks = callbacks;
  }

  getSession(): SpeechSessionEntity | null {
    return this.currentSession;
  }

  async startListening(
    projectId: string,
    deckId: string,
    initialLang: SupportedSpeechLanguage = 'es',
    initialSlideIndex: number = 0
  ): Promise<SpeechSessionEntity> {
    if (!this.currentSession) {
      this.currentSession = new SpeechSessionEntity({
        id: 'speech_session_' + Date.now(),
        projectId,
        deckId,
        targetLanguage: initialLang,
        startedAt: Date.now(),
        status: 'LISTENING'
      });
    } else {
      this.currentSession.setStatus('LISTENING');
    }
    this.currentSession.setCurrentSlideIndex(Math.max(1, initialSlideIndex || 1));

    this.currentUtteranceId = null;
    this.translationSeq = 0;
    this.networkUpgradeSeq = 0;
    await this.webSpeechAdapter.start(initialLang);
    return this.currentSession;
  }

  stopListening(): void {
    this.webSpeechAdapter.stop();
    if (this.currentSession) {
      this.currentSession.setStatus('STOPPED');
    }
  }

  toggleListening(
    projectId: string,
    deckId: string,
    currentSlideIndex: number
  ): Promise<boolean> {
    if (this.isCurrentlyListening()) {
      this.stopListening();
      return Promise.resolve(false);
    }
    const lang = this.currentSession ? this.currentSession.getPrimaryListeningLanguage() : 'es';
    return this.startListening(projectId, deckId, lang, currentSlideIndex).then(() => true);
  }

  isCurrentlyListening(): boolean {
    return this.currentSession !== null && this.currentSession.getStatus() === 'LISTENING';
  }

  setListeningLanguage(lang: SupportedSpeechLanguage): void {
    if (this.currentSession) {
      this.currentSession.setPrimaryListeningLanguage(lang);
    }
    this.webSpeechAdapter.setLanguage(lang);
  }

  setSlideIndex(slideIndex: number): void {
    if (this.currentSession) {
      this.currentSession.setCurrentSlideIndex(Math.max(1, slideIndex || 1));
    }
    this.currentUtteranceId = null;
  }
}
