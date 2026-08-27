import { DiligenceRequestRepository } from '../../domain/ports/diligence-request-repository.port';
import { DiligenceRequestEntity } from '../../domain/entities/diligence-request.entity';

export class ListDiligenceRequestsUseCase {
  constructor(private readonly requestRepository: DiligenceRequestRepository) {}

  async execute(projectId: string): Promise<DiligenceRequestEntity[]> {
    return this.requestRepository.listByProject(projectId);
  }
}
