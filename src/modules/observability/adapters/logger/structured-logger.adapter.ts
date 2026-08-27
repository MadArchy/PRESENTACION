/**
 * Venture Hub OS — Structured Logger Adapter
 * SPEC-011: Production Hardening, Observability & Deployment
 */

import { StructuredLogEntry, LogSeverity } from '../../domain/observability.types';
import { LogRedactionPolicy } from '../../domain/policies/log-redaction.policy';

export class StructuredLoggerAdapter {
  private static logs: StructuredLogEntry[] = [];

  public static log(
    severity: LogSeverity,
    component: string,
    eventCode: string,
    message: string,
    context?: {
      requestId?: string;
      organizationId?: string;
      projectId?: string;
      actorId?: string;
      metadata?: Record<string, unknown>;
    }
  ): StructuredLogEntry {
    const sanitizedMessage = LogRedactionPolicy.redactString(message);
    const sanitizedMetadata = context?.metadata
      ? LogRedactionPolicy.redactMetadata(context.metadata)
      : undefined;

    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      severity,
      component,
      requestId: context?.requestId || `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      organizationId: context?.organizationId,
      projectId: context?.projectId,
      actorId: context?.actorId,
      eventCode,
      message: sanitizedMessage,
      metadata: sanitizedMetadata
    };

    this.logs.push(entry);

    if ((globalThis as any).process?.env?.NODE_ENV !== 'test') {
      const output = JSON.stringify(entry);
      if (severity === 'ERROR' || severity === 'CRITICAL') {
        console.error(output);
      } else if (severity === 'WARN') {
        console.warn(output);
      } else {
        console.log(output);
      }
    }

    return entry;
  }

  public static info(component: string, eventCode: string, message: string, context?: any): StructuredLogEntry {
    return this.log('INFO', component, eventCode, message, context);
  }

  public static warn(component: string, eventCode: string, message: string, context?: any): StructuredLogEntry {
    return this.log('WARN', component, eventCode, message, context);
  }

  public static error(component: string, eventCode: string, message: string, context?: any): StructuredLogEntry {
    return this.log('ERROR', component, eventCode, message, context);
  }

  public static getLogs(): StructuredLogEntry[] {
    return [...this.logs];
  }

  public static clearLogs(): void {
    this.logs = [];
  }
}
