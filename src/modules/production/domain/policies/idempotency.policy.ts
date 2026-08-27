/**
 * Venture Hub OS — Idempotency Policy
 * SPEC-011: Production Hardening, Observability & Deployment
 */

import { IdempotencyRecord } from '../production.types';

export const IDEMPOTENCY_POLICY_VERSION = '1.0';

export class IdempotencyPolicy {
  private static readonly IDEMPOTENCY_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Evaluates whether an incoming request is a duplicate invocation within the idempotency window.
   */
  public static isDuplicateRequest(
    incomingRequestId: string,
    existingRecords: IdempotencyRecord[],
    now: Date = new Date()
  ): { isDuplicate: boolean; previousRecord?: IdempotencyRecord } {
    const existing = existingRecords.find(r => r.requestId === incomingRequestId);
    if (!existing) {
      return { isDuplicate: false };
    }

    const recordTime = new Date(existing.executedAt).getTime();
    const isWithinWindow = now.getTime() - recordTime < this.IDEMPOTENCY_WINDOW_MS;

    return {
      isDuplicate: isWithinWindow,
      previousRecord: isWithinWindow ? existing : undefined
    };
  }

  /**
   * Critical privileged commands that require idempotency protection.
   */
  public static isIdempotentCommand(commandName: string): boolean {
    const criticalCommands = [
      'CreateProject',
      'TransferOrganizationOwnership',
      'TransferProjectOwnership',
      'FinalizeUpload',
      'CreateShareGrant',
      'DeleteSecureFile'
    ];
    return criticalCommands.includes(commandName);
  }
}
