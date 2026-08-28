import { SpeechUtteranceEntity, SupportedSpeechLanguage } from './speech-utterance.entity';

export type SpeechSessionStatus = 'IDLE' | 'LISTENING' | 'PAUSED' | 'STOPPED';

export interface SpeechSessionProps {
  id: string;
  projectId: string;
  deckId: string;
  targetLanguage: SupportedSpeechLanguage;
  startedAt: number;
  endedAt?: number;
  status: SpeechSessionStatus;
  utterances?: SpeechUtteranceEntity[];
}

export class SpeechSessionEntity {
  private readonly id: string;
  private readonly projectId: string;
  private readonly deckId: string;
  private primaryListeningLanguage: SupportedSpeechLanguage;
  private readonly startedAt: number;
  private endedAt?: number;
  private status: SpeechSessionStatus;
  private utterances: SpeechUtteranceEntity[];
  private currentSlideIndex: number = 0;

  constructor(props: SpeechSessionProps) {
    this.id = props.id;
    this.projectId = props.projectId;
    this.deckId = props.deckId;
    this.primaryListeningLanguage = props.targetLanguage;
    this.startedAt = props.startedAt;
    this.endedAt = props.endedAt;
    this.status = props.status;
    this.utterances = props.utterances ? [...props.utterances] : [];
  }

  getId(): string {
    return this.id;
  }

  getProjectId(): string {
    return this.projectId;
  }

  getDeckId(): string {
    return this.deckId;
  }

  getPrimaryListeningLanguage(): SupportedSpeechLanguage {
    return this.primaryListeningLanguage;
  }

  setPrimaryListeningLanguage(lang: SupportedSpeechLanguage): void {
    this.primaryListeningLanguage = lang;
  }

  getStartedAt(): number {
    return this.startedAt;
  }

  getEndedAt(): number | undefined {
    return this.endedAt;
  }

  getStatus(): SpeechSessionStatus {
    return this.status;
  }

  getCurrentSlideIndex(): number {
    return this.currentSlideIndex;
  }

  setCurrentSlideIndex(slideIndex: number): void {
    this.currentSlideIndex = slideIndex;
  }

  setStatus(status: SpeechSessionStatus): void {
    this.status = status;
    if (status === 'STOPPED' && !this.endedAt) {
      this.endedAt = Date.now();
    }
  }

  addOrUpdateUtterance(utterance: SpeechUtteranceEntity): void {
    const existingIndex = this.utterances.findIndex(u => u.getId() === utterance.getId());
    if (existingIndex >= 0) {
      this.utterances[existingIndex] = utterance;
    } else {
      this.utterances.push(utterance);
    }
  }

  getUtterances(): SpeechUtteranceEntity[] {
    return [...this.utterances];
  }

  getUtterancesForSlide(slideIndex: number): SpeechUtteranceEntity[] {
    return this.utterances.filter(u => u.getSlideIndex() === slideIndex);
  }

  clearUtterances(): void {
    this.utterances = [];
  }

  getTotalWordCount(): { spanish: number; english: number } {
    let spanishWords = 0;
    let englishWords = 0;
    for (const u of this.utterances) {
      if (u.getIsFinal()) {
        spanishWords += u.getSpanishText().split(/\s+/).filter(Boolean).length;
        englishWords += u.getEnglishText().split(/\s+/).filter(Boolean).length;
      }
    }
    return { spanish: spanishWords, english: englishWords };
  }

  toJSON() {
    return {
      id: this.id,
      projectId: this.projectId,
      deckId: this.deckId,
      primaryListeningLanguage: this.primaryListeningLanguage,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
      status: this.status,
      currentSlideIndex: this.currentSlideIndex,
      utterances: this.utterances.map(u => u.toJSON()),
      wordCount: this.getTotalWordCount()
    };
  }
}
