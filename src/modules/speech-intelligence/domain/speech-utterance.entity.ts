export type SupportedSpeechLanguage = 'es' | 'en';

export interface SpeechUtteranceProps {
  id: string;
  timestamp: number;
  slideIndex: number;
  deckId: string;
  sourceLanguage: SupportedSpeechLanguage;
  originalText: string;
  spanishText: string;
  englishText: string;
  isFinal: boolean;
  confidence: number;
  speakerRole?: 'PRESENTER' | 'AUDIENCE' | 'GUEST';
  translationPending?: boolean;
  translationQuality?: 'instant' | 'network';
}

export class SpeechUtteranceEntity {
  private readonly id: string;
  private readonly timestamp: number;
  private readonly slideIndex: number;
  private readonly deckId: string;
  private readonly sourceLanguage: SupportedSpeechLanguage;
  private originalText: string;
  private spanishText: string;
  private englishText: string;
  private isFinal: boolean;
  private confidence: number;
  private speakerRole: 'PRESENTER' | 'AUDIENCE' | 'GUEST';
  private translationPending: boolean;
  private translationQuality: 'instant' | 'network';

  constructor(props: SpeechUtteranceProps) {
    this.id = props.id;
    this.timestamp = props.timestamp;
    this.slideIndex = props.slideIndex;
    this.deckId = props.deckId;
    this.sourceLanguage = props.sourceLanguage;
    this.originalText = props.originalText.trim();
    this.spanishText = props.spanishText.trim();
    this.englishText = props.englishText.trim();
    this.isFinal = props.isFinal;
    this.confidence = props.confidence;
    this.speakerRole = props.speakerRole || 'PRESENTER';
    this.translationPending = !!props.translationPending;
    this.translationQuality = props.translationQuality || 'instant';
  }

  getId(): string {
    return this.id;
  }

  getTimestamp(): number {
    return this.timestamp;
  }

  getFormattedTime(sessionStartedAt?: number): string {
    if (typeof sessionStartedAt === 'number' && Number.isFinite(sessionStartedAt)) {
      const elapsedSec = Math.max(0, Math.floor((this.timestamp - sessionStartedAt) / 1000));
      const minutes = Math.floor(elapsedSec / 60).toString().padStart(2, '0');
      const seconds = (elapsedSec % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
    const date = new Date(this.timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  getSlideIndex(): number {
    return this.slideIndex;
  }

  getDeckId(): string {
    return this.deckId;
  }

  getSourceLanguage(): SupportedSpeechLanguage {
    return this.sourceLanguage;
  }

  getOriginalText(): string {
    return this.originalText;
  }

  getSpanishText(): string {
    return this.spanishText;
  }

  getEnglishText(): string {
    return this.englishText;
  }

  getIsFinal(): boolean {
    return this.isFinal;
  }

  getConfidence(): number {
    return this.confidence;
  }

  getSpeakerRole(): 'PRESENTER' | 'AUDIENCE' | 'GUEST' {
    return this.speakerRole;
  }

  getTranslationPending(): boolean {
    return this.translationPending;
  }

  getTranslationQuality(): 'instant' | 'network' {
    return this.translationQuality;
  }

  setTranslationPending(pending: boolean): void {
    this.translationPending = pending;
  }

  setTranslationQuality(quality: 'instant' | 'network'): void {
    this.translationQuality = quality;
  }

  updateContent(original: string, es: string, en: string, isFinal: boolean, confidence?: number): void {
    this.originalText = original.trim();
    this.spanishText = es.trim();
    this.englishText = en.trim();
    this.isFinal = isFinal;
    if (confidence !== undefined) {
      this.confidence = confidence;
    }
  }

  toJSON(): SpeechUtteranceProps {
    return {
      id: this.id,
      timestamp: this.timestamp,
      slideIndex: this.slideIndex,
      deckId: this.deckId,
      sourceLanguage: this.sourceLanguage,
      originalText: this.originalText,
      spanishText: this.spanishText,
      englishText: this.englishText,
      isFinal: this.isFinal,
      confidence: this.confidence,
      speakerRole: this.speakerRole,
      translationPending: this.translationPending,
      translationQuality: this.translationQuality
    };
  }
}
