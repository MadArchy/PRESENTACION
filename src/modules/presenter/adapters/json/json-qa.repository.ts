import { QaRepository } from '../../domain/ports/qa-repository.port';
import { QaPreparationCard, QaCategory } from '../../domain/presenter.types';

export class JsonQaRepository implements QaRepository {
  private cards: QaPreparationCard[] = [];
  private isLoaded = false;

  constructor(private readonly provider?: () => Promise<QaPreparationCard[]> | QaPreparationCard[]) {}

  private async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;

    if (this.provider) {
      const list = await this.provider();
      this.cards = [...list];
    } else {
      this.cards = [
        {
          id: 'qa-arcana-01',
          sceneId: 'scene-08',
          category: 'TECHNOLOGY',
          question: '¿Cómo se garantiza la inmutabilidad de los datos si la planta pierde conexión a internet por varios días?',
          answerNotes: 'Cada dispositivo Sentinel ESP32-S3 almacena hashes locales en memoria flash encriptada (buffer de 30 días) y sincroniza el árbol de Merkle al recuperar conectividad.',
          source: 'STATIC'
        },
        {
          id: 'qa-arcana-02',
          sceneId: 'scene-07',
          category: 'BUSINESS_MODEL',
          question: '¿Por qué cobrar $1,200 por dispositivo hardware además del fee mensual SaaS?',
          answerNotes: 'El cobro de hardware cubre los costos de manufactura y certificación CE/FCC dejando un margen bruto del 38%, mientras que el SaaS de $450/mes genera ingresos recurrentes predecibles.',
          source: 'STATIC'
        },
        {
          id: 'qa-arcana-03',
          sceneId: 'scene-10',
          category: 'ASK',
          question: '¿Cuáles son los principales hitos a alcanzar con la ronda de $350k?',
          answerNotes: 'Desplegar 15 pilotos industriales pagados, certificar Sentinel hardware v2 y alcanzar $25k MRR en 12 meses.',
          source: 'STATIC'
        },
        {
          id: 'qa-arcana-04',
          sceneId: 'scene-03',
          category: 'MARKET',
          question: '¿Cuál es el perfil de cliente inicial en la fase de validación?',
          answerNotes: 'Plantas de procesamiento de alimentos y bodegas frigoríficas de cadena de frío con auditorías sanitarias regulatorias estrictas.',
          source: 'STATIC'
        }
      ];
    }

    this.isLoaded = true;
  }

  async listByProject(_projectId: string): Promise<QaPreparationCard[]> {
    await this.ensureLoaded();
    return [...this.cards];
  }

  async listByCategory(_projectId: string, category: QaCategory): Promise<QaPreparationCard[]> {
    await this.ensureLoaded();
    return this.cards.filter(c => c.category === category);
  }
}
