import { DiligenceRequestEntity } from '../entities/diligence-request.entity';

export interface DiligenceRequestRepository {
  listByProject(projectId: string, projectVersion?: string): Promise<DiligenceRequestEntity[]>;
  findById(id: string): Promise<DiligenceRequestEntity | null>;
}
