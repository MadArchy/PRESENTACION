import { DocumentArtifactRepository } from '../../domain/ports/document-artifact-repository.port';
import { DocumentArtifactEntity } from '../../domain/entities/document-artifact.entity';
import { DiligenceCategoryType } from '../../domain/data-room.types';

export interface ListDocumentsFilter {
  projectId: string;
  category?: DiligenceCategoryType;
  kind?: string;
  status?: string;
}

export class ListDataRoomDocumentsUseCase {
  constructor(private readonly documentRepository: DocumentArtifactRepository) {}

  async execute(filter: ListDocumentsFilter): Promise<DocumentArtifactEntity[]> {
    let docs = await this.documentRepository.listByProject(filter.projectId);
    if (filter.category) {
      docs = docs.filter((d: DocumentArtifactEntity) => d.getCategory() === filter.category);
    }
    if (filter.kind) {
      docs = docs.filter((d: DocumentArtifactEntity) => d.getKind() === filter.kind);
    }
    if (filter.status) {
      docs = docs.filter((d: DocumentArtifactEntity) => d.getStatus() === filter.status);
    }
    return docs;
  }
}
