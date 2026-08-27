import { DataRoomRepository } from '../../domain/ports/data-room-repository.port';
import { DataRoomEntity } from '../../domain/entities/data-room.entity';
import { DataRoomData } from '../../domain/data-room.types';

export class JsonDataRoomRepository implements DataRoomRepository {
  private readonly dataRooms = new Map<string, DataRoomEntity>();

  constructor() {
    this.seedArcanaDataRoom();
  }

  private seedArcanaDataRoom(): void {
    const data: DataRoomData = {
      id: 'dataroom-arcana',
      projectId: 'arcana',
      projectVersion: '1.0.0',
      schemaVersion: '1.0',
      name: 'Arcana Trust Network Due Diligence Room',
      status: 'ACTIVE',
      categories: [
        'CORPORATE',
        'LEGAL',
        'FINANCIAL',
        'TAX',
        'COMMERCIAL',
        'CUSTOMER',
        'MARKET',
        'PRODUCT',
        'TECHNOLOGY',
        'SECURITY',
        'INTELLECTUAL_PROPERTY',
        'REGULATORY',
        'TEAM_HR',
        'OPERATIONS',
        'RISK_INSURANCE',
        'ESG'
      ],
      documentIds: [
        'doc-arcana-corp-01',
        'doc-arcana-tech-01',
        'doc-arcana-tech-02',
        'doc-arcana-fin-01',
        'doc-arcana-legal-01',
        'doc-arcana-ip-01',
        'doc-arcana-sec-01',
        'doc-arcana-reg-01'
      ],
      requestIds: [
        'req-arcana-01',
        'req-arcana-02',
        'req-arcana-03',
        'req-arcana-04'
      ],
      checklistId: 'STANDARD_VENTURE_DILIGENCE',
      policyVersion: '1.0',
      createdAt: '2026-08-26T18:00:00Z',
      updatedAt: '2026-08-26T18:00:00Z'
    };

    this.dataRooms.set('arcana', new DataRoomEntity(data));
  }

  async findByProject(projectId: string, _projectVersion?: string): Promise<DataRoomEntity | null> {
    return this.dataRooms.get(projectId) || null;
  }

  async save(dataRoom: DataRoomEntity): Promise<void> {
    this.dataRooms.set(dataRoom.getProjectId(), dataRoom);
  }
}
