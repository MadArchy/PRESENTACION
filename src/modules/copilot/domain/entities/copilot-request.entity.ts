import { CopilotRequest, CopilotTaskType, CopilotContextScope, CopilotProviderSelection } from '../copilot.types';
import { TaskTypeVo } from '../value-objects/task-type.vo';
import { ProviderTypeVo } from '../value-objects/provider-type.vo';

export class CopilotRequestEntity {
  private readonly id: string;
  private readonly taskType: TaskTypeVo;
  private readonly projectId: string;
  private readonly projectVersion: string;
  private readonly contextScope: CopilotContextScope[];
  private readonly userInstruction?: string;
  private readonly providerConfig: CopilotProviderSelection;
  private readonly language: 'ES' | 'EN';
  private readonly createdAt: string;

  constructor(data: CopilotRequest) {
    this.id = data.id;
    this.taskType = new TaskTypeVo(data.taskType);
    this.projectId = data.projectId;
    this.projectVersion = data.projectVersion || '0.1.0';
    this.contextScope = [...(data.contextScope || ['PROJECT'])];
    this.userInstruction = data.userInstruction;
    new ProviderTypeVo(data.providerConfig.provider);
    this.providerConfig = { ...data.providerConfig };
    this.language = data.language || 'ES';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  getId(): string { return this.id; }
  getTaskType(): CopilotTaskType { return this.taskType.getValue(); }
  getProjectId(): string { return this.projectId; }
  getProjectVersion(): string { return this.projectVersion; }
  getContextScope(): CopilotContextScope[] { return [...this.contextScope]; }
  getUserInstruction(): string | undefined { return this.userInstruction; }
  getProviderConfig(): CopilotProviderSelection { return { ...this.providerConfig }; }
  getLanguage(): 'ES' | 'EN' { return this.language; }
  getCreatedAt(): string { return this.createdAt; }

  toJSON(): CopilotRequest {
    return {
      id: this.id,
      taskType: this.getTaskType(),
      projectId: this.projectId,
      projectVersion: this.projectVersion,
      contextScope: this.getContextScope(),
      userInstruction: this.userInstruction,
      providerConfig: this.getProviderConfig(),
      language: this.language,
      createdAt: this.createdAt
    };
  }
}
