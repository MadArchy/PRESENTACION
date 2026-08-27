import {
  DataRoomData,
  DataRoomStatus,
  DiligenceCategoryType
} from '../data-room.types';
import { DiligenceCategoryVo } from '../value-objects/diligence-category.vo';
import { DataRoomDomainError } from '../errors/data-room-domain.error';

export class DataRoomEntity {
  private readonly id: string;
  private readonly projectId: string;
  private readonly projectVersion: string;
  private readonly schemaVersion: string;
  private readonly name: string;
  private status: DataRoomStatus;
  private readonly categories: DiligenceCategoryVo[];
  private readonly documentIds: string[];
  private readonly requestIds: string[];
  private readonly checklistId: string;
  private readonly policyVersion: string;
  private readonly createdAt: string;
  private readonly updatedAt: string;

  constructor(data: DataRoomData) {
    if (!data.id || data.id.trim().length === 0) {
      throw new DataRoomDomainError('DataRoom ID cannot be empty');
    }
    if (!data.projectId || data.projectId.trim().length === 0) {
      throw new DataRoomDomainError('projectId cannot be empty');
    }

    this.id = data.id.trim();
    this.projectId = data.projectId.trim();
    this.projectVersion = data.projectVersion || '0.1.0';
    this.schemaVersion = data.schemaVersion || '1.0';
    this.name = data.name.trim();
    this.status = data.status || 'DRAFT';
    this.categories = (data.categories || []).map(c => new DiligenceCategoryVo(c));
    this.documentIds = [...(data.documentIds || [])];
    this.requestIds = [...(data.requestIds || [])];
    this.checklistId = data.checklistId || 'STANDARD_VENTURE_DILIGENCE';
    this.policyVersion = data.policyVersion || '1.0';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  getId(): string { return this.id; }
  getProjectId(): string { return this.projectId; }
  getProjectVersion(): string { return this.projectVersion; }
  getSchemaVersion(): string { return this.schemaVersion; }
  getName(): string { return this.name; }
  getStatus(): DataRoomStatus { return this.status; }
  getCategories(): DiligenceCategoryType[] { return this.categories.map(c => c.getValue()); }
  getDocumentIds(): string[] { return [...this.documentIds]; }
  getRequestIds(): string[] { return [...this.requestIds]; }
  getChecklistId(): string { return this.checklistId; }
  getPolicyVersion(): string { return this.policyVersion; }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }

  toJSON(): DataRoomData {
    return {
      id: this.id,
      projectId: this.projectId,
      projectVersion: this.projectVersion,
      schemaVersion: this.schemaVersion,
      name: this.name,
      status: this.status,
      categories: this.getCategories(),
      documentIds: this.getDocumentIds(),
      requestIds: this.getRequestIds(),
      checklistId: this.checklistId,
      policyVersion: this.policyVersion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
