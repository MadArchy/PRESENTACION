# Production Deployment Runbook

**Document ID:** `PRODUCTION_DEPLOYMENT_RUNBOOK`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Owner Role:** Release Engineer / Platform Administrator  

---

## 1. Pre-Deployment Verification Checklist

1. [ ] Automated CI/CD pipeline passed all 10 gates on `main` branch.
2. [ ] Staging deployment verified with 12/12 automated smoke tests.
3. [ ] No architecture violations, secret scan failures, or unhandled exceptions.
4. [ ] Firestore security rules and composite indexes validated.
5. [ ] Release Candidate tag assigned (`v0.1.0-RC1`).
6. [ ] Human production approval recorded in deployment gate.

---

## 2. Deployment Execution Steps

1. **Tag Release**: Create immutable Git tag corresponding to verified commit.
2. **Deploy Hosting**: `firebase deploy --only hosting --project vhos-production`.
3. **Deploy Rules**: `firebase deploy --only firestore:rules,storage:rules --project vhos-production`.
4. **Deploy Functions**: `firebase deploy --only functions --project vhos-production`.
5. **Post-Deployment Smoke**: Run the 12-point production smoke suite.
6. **Confirm Health**: Check Operational Health Dashboard (7/7 HEALTHY).
