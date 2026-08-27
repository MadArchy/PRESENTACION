import { ClaimEntity } from '../entities/claim.entity';
import { ProjectSectionType } from '../../../project/domain/project.types';

export interface ClaimRepository {
  listByProject(projectId: string, projectVersion?: string): Promise<ClaimEntity[]>;
  findById(id: string): Promise<ClaimEntity | null>;
  listBySection(projectId: string, sectionType: ProjectSectionType, projectVersion?: string): Promise<ClaimEntity[]>;
}
