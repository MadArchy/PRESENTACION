import { SupportedSpeechLanguage } from '../domain/speech-utterance.entity';

export interface SpeechRecognitionResultEvent {
  text: string;
  isFinal: boolean;
  confidence: number;
}

export interface IWebSpeechAdapter {
  isSupported(): boolean;
  start(lang: SupportedSpeechLanguage): Promise<void>;
  stop(): void;
  setLanguage(lang: SupportedSpeechLanguage): void;
  onResult(callback: (event: SpeechRecognitionResultEvent) => void): void;
  onError(callback: (error: string) => void): void;
  onAudioLevel(callback: (level: number) => void): void;
  onStatusChange(callback: (isActive: boolean) => void): void;
}

/**
 * Web Speech adapter tuned for live pitch capture.
 * IMPORTANT: does NOT open a parallel getUserMedia stream — that steals the mic
 * from SpeechRecognition in Chrome and makes listening appear broken.
 */
export class WebSpeechAdapter implements IWebSpeechAdapter {
  private recognition: any = null;
  private isListening = false;
  private currentLanguage: SupportedSpeechLanguage = 'es';
  private resultCallback: ((event: SpeechRecognitionResultEvent) => void) | null = null;
  private errorCallback: ((error: string) => void) | null = null;
  private audioLevelCallback: ((level: number) => void) | null = null;
  private statusChangeCallback: ((isActive: boolean) => void) | null = null;
  private restartTimeout: ReturnType<typeof setTimeout> | null = null;
  private activityTimeout: ReturnType<typeof setTimeout> | null = null;
  private vuInterval: ReturnType<typeof setInterval> | null = null;
  private lastActivityAt = 0;
  private SpeechRecognitionCtor: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.SpeechRecognitionCtor =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
    }
  }

  isSupported(): boolean {
    return !!this.SpeechRecognitionCtor;
  }

  private getLocaleCode(lang: SupportedSpeechLanguage): string {
    return lang === 'es' ? 'es-419' : 'en-US';
  }

  private createRecognition(): any {
    if (!this.SpeechRecognitionCtor) return null;
    const recognition = new this.SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = this.getLocaleCode(this.currentLanguage);

    recognition.onstart = () => {
      if (this.statusChangeCallback) this.statusChangeCallback(true);
    };

    recognition.onresult = (event: any) => {
      this.pulseActivity();

      let interim = '';
      let finalChunk = '';
      let confidence = 0.9;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        const transcript = String(res[0]?.transcript || '').trim();
        if (!transcript) continue;
        confidence = typeof res[0]?.confidence === 'number' ? res[0].confidence : confidence;
        if (res.isFinal) finalChunk += (finalChunk ? ' ' : '') + transcript;
        else interim += (interim ? ' ' : '') + transcript;
      }

      if (finalChunk && this.resultCallback) {
        this.resultCallback({ text: finalChunk, isFinal: true, confidence });
      }
      if (interim && this.resultCallback) {
        this.resultCallback({
          text: interim,
          isFinal: false,
          confidence: Math.min(confidence, 0.65)
        });
      }
    };

    recognition.onerror = (event: any) => {
      const err = String(event?.error || '');
      if (err === 'no-speech' || err === 'aborted') return;

      if (err === 'not-allowed' || err === 'service-not-allowed') {
        this.isListening = false;
        this.clearTimers();
        this.stopSyntheticVu();
        if (this.statusChangeCallback) this.statusChangeCallback(false);
        if (this.errorCallback) this.errorCallback(`Speech recognition error: ${err}`);
        return;
      }

      // network / audio-capture: keep session alive and restart
      if (err === 'network' || err === 'audio-capture') {
        if (this.errorCallback) this.errorCallback(`Speech recognition error: ${err}`);
        this.scheduleRestart(250);
        return;
      }

      if (this.errorCallback) this.errorCallback(`Speech recognition error: ${err}`);
    };

    recognition.onend = () => {
      if (this.isListening) {
        this.scheduleRestart(80);
      } else if (this.statusChangeCallback) {
        this.statusChangeCallback(false);
      }
    };

    return recognition;
  }

  private clearTimers(): void {
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }
    if (this.activityTimeout) {
      clearTimeout(this.activityTimeout);
      this.activityTimeout = null;
    }
  }

  private scheduleRestart(delayMs: number): void {
    if (!this.isListening) return;
    if (this.restartTimeout) clearTimeout(this.restartTimeout);
    this.restartTimeout = setTimeout(() => {
      this.restartTimeout = null;
      if (!this.isListening) return;
      try {
        if (!this.recognition) this.recognition = this.createRecognition();
        this.recognition.start();
      } catch {
        // InvalidStateError = already started
        this.scheduleRestart(400);
      }
    }, delayMs);
  }

  private pulseActivity(): void {
    this.lastActivityAt = Date.now();
    if (this.audioLevelCallback) this.audioLevelCallback(70 + Math.floor(Math.random() * 25));
  }

  private startSyntheticVu(): void {
    this.stopSyntheticVu();
    this.vuInterval = setInterval(() => {
      if (!this.isListening || !this.audioLevelCallback) return;
      const active = Date.now() - this.lastActivityAt < 900;
      const level = active
        ? 45 + Math.floor(Math.random() * 50)
        : 4 + Math.floor(Math.random() * 10);
      this.audioLevelCallback(level);
    }, 120);
  }

  private stopSyntheticVu(): void {
    if (this.vuInterval) {
      clearInterval(this.vuInterval);
      this.vuInterval = null;
    }
  }

  setLanguage(lang: SupportedSpeechLanguage): void {
    this.currentLanguage = lang;
    if (this.isListening) {
      this.clearTimers();
      try {
        if (this.recognition) {
          this.recognition.onend = null;
          this.recognition.onerror = null;
          this.recognition.onresult = null;
          this.recognition.stop();
        }
      } catch {}
      this.recognition = this.createRecognition();
      try {
        this.recognition.start();
        if (this.statusChangeCallback) this.statusChangeCallback(true);
      } catch {
        this.scheduleRestart(150);
      }
    }
  }

  async start(lang?: SupportedSpeechLanguage): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('Web Speech API is not supported in this browser. Please use Chrome or Edge.');
    }

    if (lang) this.currentLanguage = lang;
    this.isListening = true;
    this.lastActivityAt = Date.now();

    // Recreate engine each start for a clean Chrome session
    try {
      if (this.recognition) {
        try {
          this.recognition.onend = null;
          this.recognition.stop();
        } catch {}
      }
    } catch {}

    this.recognition = this.createRecognition();
    this.startSyntheticVu();

    try {
      this.recognition.start();
      if (this.statusChangeCallback) this.statusChangeCallback(true);
    } catch (err: any) {
      if (err?.name === 'InvalidStateError') {
        if (this.statusChangeCallback) this.statusChangeCallback(true);
        return;
      }
      this.isListening = false;
      this.stopSyntheticVu();
      throw err;
    }
  }

  stop(): void {
    this.isListening = false;
    this.clearTimers();
    this.stopSyntheticVu();
    if (this.recognition) {
      try {
        this.recognition.onend = null;
        this.recognition.stop();
      } catch {}
      this.recognition = null;
    }
    if (this.statusChangeCallback) this.statusChangeCallback(false);
  }

  onResult(callback: (event: SpeechRecognitionResultEvent) => void): void {
    this.resultCallback = callback;
  }

  onError(callback: (error: string) => void): void {
    this.errorCallback = callback;
  }

  onAudioLevel(callback: (level: number) => void): void {
    this.audioLevelCallback = callback;
  }

  onStatusChange(callback: (isActive: boolean) => void): void {
    this.statusChangeCallback = callback;
  }
}
