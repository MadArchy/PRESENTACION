import { AuditEvent, AuditEventType } from '../security.types';
import { SecurityDomainError } from '../errors/security-domain.error';

export class AuditEventEntity {
  private readonly id: string;
  private readonly organizationId?: string;
  private readonly projectId?: string;
  private readonly actorUserId: string;
  private readonly type: AuditEventType;
  private readonly targetType: string;
  private readonly targetId?: string;
  private readonly occurredAt: string;
  private readonly requestId?: string;
  private readonly before?: Record<string, unknown>;
  private readonly after?: Record<string, unknown>;
  private readonly metadata: Record<string, unknown>;
  private readonly source: 'TRUSTED_FUNCTION';

  constructor(data: AuditEvent) {
    if (!data.id || !data.actorUserId || !data.type) {
      throw new SecurityDomainError('id, actorUserId, and type are required in AuditEvent');
    }
    this.id = data.id.trim();
    this.organizationId = data.organizationId;
    this.projectId = data.projectId;
    this.actorUserId = data.actorUserId.trim();
    this.type = data.type;
    this.targetType = data.targetType || 'UNKNOWN';
    this.targetId = data.targetId;
    this.occurredAt = data.occurredAt || new Date().toISOString();
    this.requestId = data.requestId;
    this.before = data.before ? { ...data.before } : undefined;
    this.after = data.after ? { ...data.after } : undefined;
    this.metadata = data.metadata ? { ...data.metadata } : {};
    this.source = 'TRUSTED_FUNCTION';
  }

  getId(): string { return this.id; }
  getOrganizationId(): string | undefined { return this.organizationId; }
  getProjectId(): string | undefined { return this.projectId; }
  getActorUserId(): string { return this.actorUserId; }
  getType(): AuditEventType { return this.type; }
  getTargetType(): string { return this.targetType; }
  getTargetId(): string | undefined { return this.targetId; }
  getOccurredAt(): string { return this.occurredAt; }
  getRequestId(): string | undefined { return this.requestId; }
  getBefore(): Record<string, unknown> | undefined { return this.before ? { ...this.before } : undefined; }
  getAfter(): Record<string, unknown> | undefined { return this.after ? { ...this.after } : undefined; }
  getMetadata(): Record<string, unknown> { return { ...this.metadata }; }
  getSource(): 'TRUSTED_FUNCTION' { return this.source; }

  toJSON(): AuditEvent {
    return {
      id: this.id,
      organizationId: this.organizationId,
      projectId: this.projectId,
      actorUserId: this.actorUserId,
      type: this.type,
      targetType: this.targetType,
      targetId: this.targetId,
      occurredAt: this.occurredAt,
      requestId: this.requestId,
      before: this.before,
      after: this.after,
      metadata: this.metadata,
      source: this.source
    };
  }
}
