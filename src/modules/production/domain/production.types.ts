/**
 * Venture Hub OS — Production Hardening & Observability Domain Types
 * SPEC-011: Production Hardening, Observability & Deployment
 */

export type RuntimeEnvironment = 'LOCAL' | 'TEST' | 'STAGING' | 'PRODUCTION';

export interface RuntimeEnvironmentConfig {
  environment: RuntimeEnvironment;
  firebaseProjectId: string;
  firebaseAuthDomain: string;
  firebaseStorageBucket: string;
  appCheckEnabled: boolean;
  observabilityEnabled: boolean;
  buildVersion: string;
  commitSha: string;
  buildTimestamp: string;
}

export type ReadinessCheckStatus = 'PASS' | 'WARN' | 'FAIL' | 'UNKNOWN';

export type ReadinessCategory =
  | 'SECURITY'
  | 'AUTHENTICATION'
  | 'FIRESTORE'
  | 'STORAGE'
  | 'FUNCTIONS'
  | 'HOSTING'
  | 'CI_CD'
  | 'OBSERVABILITY'
  | 'BACKUPS'
  | 'ROLLBACK'
  | 'PERFORMANCE'
  | 'BROWSER_COMPATIBILITY'
  | 'ACCESSIBILITY'
  | 'DEPENDENCIES'
  | 'COSTS';

export interface ProductionReadinessCheck {
  id: string;
  category: ReadinessCategory;
  title: string;
  status: ReadinessCheckStatus;
  evidence: string[];
  lastEvaluatedAt: string;
}

export type OverallReadinessStatus = 'READY' | 'READY_WITH_WARNINGS' | 'NOT_READY' | 'UNKNOWN';

export interface ProductionReadinessSummary {
  overallStatus: OverallReadinessStatus;
  evaluatedAt: string;
  environment: RuntimeEnvironment;
  checks: ProductionReadinessCheck[];
  summary: {
    total: number;
    passed: number;
    warnings: number;
    failed: number;
  };
}

export interface IdempotencyRecord {
  requestId: string;
  commandName: string;
  actorUserId: string;
  organizationId: string;
  executedAt: string;
  responseHash: string;
}

export interface PerformanceBudgetMetric {
  metricName: string;
  targetThreshold: number;
  measuredValue: number;
  unit: 'ms' | 'KB' | 'MB' | 'score';
  status: 'PASS' | 'WARN' | 'FAIL';
}
