/**
 * Venture Hub OS — Environment Guard Policy
 * SPEC-011: Production Hardening, Observability & Deployment
 */

import { RuntimeEnvironmentConfig } from '../production.types';

export const ENVIRONMENT_GUARD_POLICY_VERSION = '1.0';

export class EnvironmentGuardPolicy {
  /**
   * Validates runtime environment configuration to prevent unsafe development/emulator settings in production.
   */
  public static validateEnvironment(config: RuntimeEnvironmentConfig): { isValid: boolean; violations: string[] } {
    const violations: string[] = [];

    if (config.environment === 'PRODUCTION') {
      // Rule 1: No localhost or emulator host in production
      if (
        config.firebaseAuthDomain.includes('localhost') ||
        config.firebaseAuthDomain.includes('127.0.0.1') ||
        config.firebaseProjectId.includes('demo-') ||
        config.firebaseProjectId.includes('emulator') ||
        config.firebaseStorageBucket.includes('localhost')
      ) {
        violations.push('Production environment must not reference localhost, demo projects, or emulator endpoints');
      }

      // Rule 2: App Check must be enabled in production
      if (!config.appCheckEnabled) {
        violations.push('App Check must be enabled in production environment');
      }

      // Rule 3: Observability must be active in production
      if (!config.observabilityEnabled) {
        violations.push('Observability and structured logging must be enabled in production environment');
      }

      // Rule 4: Build metadata must be present
      if (!config.buildVersion || !config.commitSha || !config.buildTimestamp) {
        violations.push('Production configuration must specify buildVersion, commitSha, and buildTimestamp');
      }
    }

    return {
      isValid: violations.length === 0,
      violations
    };
  }

  /**
   * Enforces that Staging and Production configurations do not share resources.
   */
  public static assertEnvironmentSeparation(
    stagingConfig: RuntimeEnvironmentConfig,
    prodConfig: RuntimeEnvironmentConfig
  ): { isSeparated: boolean; overlaps: string[] } {
    const overlaps: string[] = [];

    if (stagingConfig.firebaseProjectId === prodConfig.firebaseProjectId) {
      overlaps.push('Staging and Production share the same Firebase Project ID');
    }
    if (stagingConfig.firebaseStorageBucket === prodConfig.firebaseStorageBucket) {
      overlaps.push('Staging and Production share the same Storage Bucket');
    }
    if (stagingConfig.firebaseAuthDomain === prodConfig.firebaseAuthDomain) {
      overlaps.push('Staging and Production share the same Auth Domain');
    }

    return {
      isSeparated: overlaps.length === 0,
      overlaps
    };
  }
}
