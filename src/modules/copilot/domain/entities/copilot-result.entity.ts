import {
  CopilotResult,
  CopilotResultStatus,
  CopilotFinding,
  CopilotCitation,
  CopilotGroundingSummary,
  CopilotWarning,
  AiProviderType
} from '../copilot.types';
import { CopilotProposalEntity } from './copilot-proposal.entity';

export class CopilotResultEntity {
  private readonly id: string;
  private readonly requestId: string;
  private readonly status: CopilotResultStatus;
  private readonly summary: string;
  private readonly findings: CopilotFinding[];
  private readonly proposals: CopilotProposalEntity[];
  private readonly citations: CopilotCitation[];
  private readonly grounding: CopilotGroundingSummary;
  private readonly warnings: CopilotWarning[];
  private readonly providerMetadata: {
    provider: AiProviderType;
    modelId: string;
    durationMs: number;
  };
  private readonly generatedAt: string;

  constructor(data: CopilotResult) {
    this.id = data.id;
    this.requestId = data.requestId;
    this.status = data.status || 'COMPLETED';
    this.summary = data.summary;
    this.findings = [...(data.findings || [])];
    this.proposals = (data.proposals || []).map(p => new CopilotProposalEntity(p));
    this.citations = [...(data.citations || [])];
    this.grounding = { ...data.grounding };
    this.warnings = [...(data.warnings || [])];
    this.providerMetadata = { ...data.providerMetadata };
    this.generatedAt = data.generatedAt || new Date().toISOString();
  }

  getId(): string { return this.id; }
  getRequestId(): string { return this.requestId; }
  getStatus(): CopilotResultStatus { return this.status; }
  getSummary(): string { return this.summary; }
  getFindings(): CopilotFinding[] { return [...this.findings]; }
  getProposals(): CopilotProposalEntity[] { return [...this.proposals]; }
  getCitations(): CopilotCitation[] { return [...this.citations]; }
  getGrounding(): CopilotGroundingSummary { return { ...this.grounding }; }
  getWarnings(): CopilotWarning[] { return [...this.warnings]; }
  getProviderMetadata() { return { ...this.providerMetadata }; }
  getGeneratedAt(): string { return this.generatedAt; }

  toJSON(): CopilotResult {
    return {
      id: this.id,
      requestId: this.requestId,
      status: this.status,
      summary: this.summary,
      findings: this.getFindings(),
      proposals: this.proposals.map(p => p.toJSON()),
      citations: this.getCitations(),
      grounding: this.getGrounding(),
      warnings: this.getWarnings(),
      providerMetadata: this.getProviderMetadata(),
      generatedAt: this.generatedAt
    };
  }
}
