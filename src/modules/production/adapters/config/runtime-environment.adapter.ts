/**
 * Venture Hub OS — Runtime Environment Configuration Adapter
 * SPEC-011: Production Hardening, Observability & Deployment
 */

import { RuntimeEnvironmentConfig } from '../../domain/production.types';
import { EnvironmentGuardPolicy } from '../../domain/policies/environment-guard.policy';

export class RuntimeEnvironmentAdapter {
  private static currentConfig: RuntimeEnvironmentConfig = {
    environment: 'LOCAL',
    firebaseProjectId: 'vhos-demo-local',
    firebaseAuthDomain: 'localhost',
    firebaseStorageBucket: 'vhos-demo-local.appspot.com',
    appCheckEnabled: false,
    observabilityEnabled: true,
    buildVersion: '0.1.0',
    commitSha: 'local-dev',
    buildTimestamp: new Date().toISOString()
  };

  public static getConfig(): RuntimeEnvironmentConfig {
    return { ...this.currentConfig };
  }

  public static configureEnvironment(config: RuntimeEnvironmentConfig): void {
    const validation = EnvironmentGuardPolicy.validateEnvironment(config);
    if (!validation.isValid) {
      throw new Error(`Invalid environment configuration: ${validation.violations.join('; ')}`);
    }
    this.currentConfig = { ...config };
  }

  public static isProduction(): boolean {
    return this.currentConfig.environment === 'PRODUCTION';
  }

  public static isStaging(): boolean {
    return this.currentConfig.environment === 'STAGING';
  }
}
