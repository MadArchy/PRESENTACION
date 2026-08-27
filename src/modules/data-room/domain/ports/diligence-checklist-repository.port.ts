import { DiligenceChecklistEntity } from '../entities/diligence-checklist.entity';

export interface DiligenceChecklistRepository {
  findById(id: string, version?: string): Promise<DiligenceChecklistEntity | null>;
  getDefault(): Promise<DiligenceChecklistEntity>;
}
