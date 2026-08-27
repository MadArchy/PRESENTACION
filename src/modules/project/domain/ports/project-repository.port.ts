import { ProjectAggregate } from '../entities/project.aggregate';
import { ProjectVersionEntity } from '../entities/project-version.entity';
import { ProjectSummary } from '../project.types';

export interface ProjectRepository {
  list(): Promise<ProjectSummary[]>;
  findById(id: string): Promise<ProjectAggregate | null>;
  findBySlug(slug: string): Promise<ProjectAggregate | null>;
  findVersion(projectId: string, version: string): Promise<ProjectVersionEntity | null>;
  listVersions(projectId: string): Promise<ProjectVersionEntity[]>;
}
