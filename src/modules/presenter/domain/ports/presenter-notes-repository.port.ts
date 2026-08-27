import { PresenterNote } from '../presenter.types';

export interface PresenterNotesRepository {
  listByPresentation(presentationId: string): Promise<PresenterNote[]>;
  listByScene(presentationId: string, sceneId: string): Promise<PresenterNote[]>;
}
