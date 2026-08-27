import { EvidenceEntity } from '../entities/evidence.entity';

export interface EvidenceRepository {
  listByProject(projectId: string, projectVersion?: string): Promise<EvidenceEntity[]>;
  findById(id: string): Promise<EvidenceEntity | null>;
}
