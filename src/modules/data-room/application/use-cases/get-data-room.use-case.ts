import { DataRoomRepository } from '../../domain/ports/data-room-repository.port';
import { DataRoomEntity } from '../../domain/entities/data-room.entity';
import { DataRoomDomainError } from '../../domain/errors/data-room-domain.error';

export class GetDataRoomUseCase {
  constructor(private readonly dataRoomRepository: DataRoomRepository) {}

  async execute(projectId: string): Promise<DataRoomEntity> {
    const dataRoom = await this.dataRoomRepository.findByProject(projectId);
    if (!dataRoom) {
      throw new DataRoomDomainError(`Data Room for project '${projectId}' not found`);
    }
    return dataRoom;
  }
}
