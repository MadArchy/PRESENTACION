# Production Configuration Policy

**Document ID:** `PRODUCTION_CONFIGURATION_POLICY`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Policy Version:** `1.0`  

---

## 1. Client Configuration Contract

Client bundles receive strictly public Firebase configuration tokens and build metadata:

```typescript
interface RuntimeEnvironmentConfig {
  environment: 'LOCAL' | 'TEST' | 'STAGING' | 'PRODUCTION';
  firebaseProjectId: string;
  firebaseAuthDomain: string;
  firebaseStorageBucket: string;
  appCheckEnabled: boolean;
  observabilityEnabled: boolean;
  buildVersion: string;
  commitSha: string;
  buildTimestamp: string;
}
```

---

## 2. Forbidden Production Configurations

The following configurations cause the production build and startup gate to fail-closed immediately:
1. `localhost` or `127.0.0.1` endpoints in `firebaseAuthDomain` or `firebaseStorageBucket`.
2. Project IDs prefixed with `demo-` or containing `emulator`.
3. Disabled `appCheckEnabled` or `observabilityEnabled`.
4. Missing build metadata (`buildVersion`, `commitSha`, `buildTimestamp`).
5. Embedded server secrets, private keys, or API tokens in client bundles.
