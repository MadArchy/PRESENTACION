import { PresenterNotesRepository } from '../../domain/ports/presenter-notes-repository.port';
import { PresenterNote } from '../../domain/presenter.types';

export class JsonPresenterNotesRepository implements PresenterNotesRepository {
  private notes: PresenterNote[] = [];
  private isLoaded = false;

  constructor(private readonly provider?: () => Promise<PresenterNote[]> | PresenterNote[]) {}

  private async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;

    if (this.provider) {
      const list = await this.provider();
      this.notes = [...list];
    } else {
      this.notes = [
        {
          id: 'note-arcana-01',
          presentationId: 'pres-arcana-investor-executive-executive-dark',
          sceneId: 'scene-01',
          type: 'TALKING_POINT',
          text: 'Abrir enfatizando que Arcana transforma la telemetría IoT no verificada en prueba criptográfica sellada en Polygon L2.',
          visibility: 'PRESENTER_ONLY',
          source: 'STATIC'
        },
        {
          id: 'note-arcana-02',
          presentationId: 'pres-arcana-investor-executive-executive-dark',
          sceneId: 'scene-03',
          type: 'CAUTION',
          text: 'Recordar que el costo de $12k/mes por planta en fugas no detectadas está documentado como un ESTIMATE cuantitativo.',
          visibility: 'PRESENTER_ONLY',
          source: 'STATIC'
        },
        {
          id: 'note-arcana-03',
          presentationId: 'pres-arcana-investor-executive-executive-dark',
          sceneId: 'scene-06',
          type: 'REMINDER',
          text: 'Mencionar el prototipo físico ESP32-S3 Sentinel v1.2 y el buffer flash local de 30 días para desconexiones.',
          visibility: 'PRESENTER_ONLY',
          source: 'STATIC'
        },
        {
          id: 'note-arcana-04',
          presentationId: 'pres-arcana-investor-executive-executive-dark',
          sceneId: 'scene-10',
          type: 'TRANSITION',
          text: 'Cerrar con la ronda de $350k SAFE para 18 meses de pista y 15 pilotos industriales.',
          visibility: 'PRESENTER_ONLY',
          source: 'STATIC'
        }
      ];
    }

    this.isLoaded = true;
  }

  async listByPresentation(presentationId: string): Promise<PresenterNote[]> {
    await this.ensureLoaded();
    return this.notes.filter(n => !n.presentationId || n.presentationId === presentationId || presentationId.includes('arcana'));
  }

  async listByScene(_presentationId: string, sceneId: string): Promise<PresenterNote[]> {
    await this.ensureLoaded();
    return this.notes.filter(n => n.sceneId === sceneId);
  }
}
