import { QaPreparationCard, QaCategory } from '../presenter.types';

export interface QaRepository {
  listByProject(projectId: string): Promise<QaPreparationCard[]>;
  listByCategory(projectId: string, category: QaCategory): Promise<QaPreparationCard[]>;
}
