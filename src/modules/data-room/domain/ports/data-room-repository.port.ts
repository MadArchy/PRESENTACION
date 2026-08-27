import { DataRoomEntity } from '../entities/data-room.entity';
import { DocumentArtifactEntity } from '../entities/document-artifact.entity';
import { DiligenceRequestEntity } from '../entities/diligence-request.entity';
import { DiligenceChecklistEntity } from '../entities/diligence-checklist.entity';
import { DiligenceCategoryType } from '../data-room.types';

export interface DataRoomRepository {
  findByProject(projectId: string, projectVersion?: string): Promise<DataRoomEntity | null>;
  save(dataRoom: DataRoomEntity): Promise<void>;
}

export interface DocumentArtifactRepository {
  listByProject(projectId: string, projectVersion?: string): Promise<DocumentArtifactEntity[]>;
  findById(id: string): Promise<DocumentArtifactEntity | null>;
  listByCategory(projectId: string, category: DiligenceCategoryType): Promise<DocumentArtifactEntity[]>;
}

export interface DiligenceRequestRepository {
  listByProject(projectId: string, projectVersion?: string): Promise<DiligenceRequestEntity[]>;
  findById(id: string): Promise<DiligenceRequestEntity | null>;
}

export interface DiligenceChecklistRepository {
  findById(id: string, version?: string): Promise<DiligenceChecklistEntity | null>;
  getDefault(): Promise<DiligenceChecklistEntity>;
}
