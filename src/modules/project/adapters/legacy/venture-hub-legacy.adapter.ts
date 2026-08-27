import { LegacyPresentationPort, LegacyDeckSummary } from '../../domain/ports/legacy-presentation.port';

export class VentureHubLegacyAdapter implements LegacyPresentationPort {
  async listDecks(): Promise<LegacyDeckSummary[]> {
    if (typeof window !== 'undefined' && (window as any).DECK_CONFIG) {
      const config = (window as any).DECK_CONFIG;
      const counts = (window as any).DECK_SLIDE_COUNTS || {};
      return Object.keys(config)
        .filter(key => key !== 'hub')
        .map(key => ({
          key,
          title_es: config[key].title_es,
          title_en: config[key].title_en,
          kicker_es: config[key].kicker_es,
          kicker_en: config[key].kicker_en,
          slides: counts[key] || 15
        }));
    }

    return [
      { key: 'tutor', title_es: 'Tutor Multi-Agente', title_en: 'Multi-Agent Tutor', kicker_es: 'AI EdTech · Pitch inversor', kicker_en: 'AI EdTech · Investor pitch', slides: 15 },
      { key: 'fastfood', title_es: 'Franquicia Smart QSR', title_en: 'Smart Fast-Food', kicker_es: 'FoodTech QSR · Pitch piloto', kicker_en: 'FoodTech QSR · Pilot pitch', slides: 15 },
      { key: 'arcana', title_es: 'Arcana Trust Network', title_en: 'Arcana Trust Network', kicker_es: 'Web3 & IoT · Pitch inversor', kicker_en: 'Web3 & IoT · Investor pitch', slides: 15 },
      { key: 'restaurante', title_es: 'Arcana Restaurantes', title_en: 'Arcana Restaurant Ops', kicker_es: 'Arcana · Dueños de Restaurante', kicker_en: 'Arcana · Restaurant Owners', slides: 10 },
      { key: 'comparativo', title_es: 'Infraestructura IA', title_en: 'AI Infrastructure', kicker_es: 'Estrategia Ejecutiva · 3i BAIRD LAB', kicker_en: 'Executive Strategy · 3i BAIRD LAB', slides: 10 }
    ];
  }

  async launchDeck(deckKey: string): Promise<void> {
    if (typeof window !== 'undefined' && typeof (window as any).launchDeck === 'function') {
      (window as any).launchDeck(deckKey);
    } else {
      console.warn(`[LegacyAdapter] launchDeck('${deckKey}') called outside browser runtime or legacy bridge`);
    }
  }

  async openHub(): Promise<void> {
    if (typeof window !== 'undefined' && typeof (window as any).openExecutiveHub === 'function') {
      (window as any).openExecutiveHub();
    } else {
      console.warn('[LegacyAdapter] openExecutiveHub() called outside browser runtime');
    }
  }

  getCurrentDeck(): string {
    if (typeof window !== 'undefined' && (window as any).activeDeck) {
      return (window as any).activeDeck;
    }
    return 'hub';
  }
}
