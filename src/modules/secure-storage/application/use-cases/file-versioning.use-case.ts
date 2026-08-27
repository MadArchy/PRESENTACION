import { FileVersion } from '../../domain/secure-storage.types';
import { FileVersionRepository, SecureFileRepository } from '../../domain/ports/secure-storage.ports';
import { FileNotFoundDomainError } from '../../domain/errors/secure-storage-domain.error';

export class ListFileVersionsUseCase {
  constructor(
    private readonly fileRepo: SecureFileRepository,
    private readonly versionRepo: FileVersionRepository
  ) {}

  async execute(orgId: string, projectId: string, fileId: string): Promise<FileVersion[]> {
    const file = await this.fileRepo.findFileById(orgId, projectId, fileId);
    if (!file) {
      throw new FileNotFoundDomainError(fileId);
    }
    return this.versionRepo.listVersions(orgId, projectId, fileId);
  }
}
