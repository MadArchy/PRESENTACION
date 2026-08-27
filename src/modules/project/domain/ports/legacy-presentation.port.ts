export interface LegacyDeckSummary {
  key: string;
  title_es: string;
  title_en: string;
  kicker_es: string;
  kicker_en: string;
  slides: number;
}

export interface LegacyPresentationPort {
  listDecks(): Promise<LegacyDeckSummary[]>;
  launchDeck(deckKey: string): Promise<void>;
  openHub(): Promise<void>;
  getCurrentDeck(): string;
}
