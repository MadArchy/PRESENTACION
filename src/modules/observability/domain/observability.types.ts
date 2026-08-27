/**
 * Venture Hub OS — Observability Domain Types
 * SPEC-011: Production Hardening, Observability & Deployment
 */

export type LogSeverity = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';

export interface StructuredLogEntry {
  timestamp: string;
  severity: LogSeverity;
  component: string;
  requestId: string;
  organizationId?: string;
  projectId?: string;
  actorId?: string;
  eventCode: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export type AlertClass = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

export interface OperationalAlert {
  alertId: string;
  alertClass: AlertClass;
  title: string;
  condition: string;
  triggerTimestamp: string;
  resolved: boolean;
  component: string;
  details?: Record<string, unknown>;
}

export interface MetricDataPoint {
  metricName: string;
  timestamp: string;
  value: number;
  tags: Record<string, string>;
}
