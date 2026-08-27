import { DocumentArtifactEntity } from '../entities/document-artifact.entity';
import { DiligenceCategoryType } from '../data-room.types';

export interface DocumentArtifactRepository {
  listByProject(projectId: string, projectVersion?: string): Promise<DocumentArtifactEntity[]>;
  findById(id: string): Promise<DocumentArtifactEntity | null>;
  listByCategory(projectId: string, category: DiligenceCategoryType): Promise<DocumentArtifactEntity[]>;
}
