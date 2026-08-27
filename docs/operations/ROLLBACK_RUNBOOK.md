# Rollback Runbook

**Document ID:** `ROLLBACK_RUNBOOK`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Owner Role:** Incident Commander / Platform Administrator  

---

## 1. Rollback Triggers

- Production deployment failure or critical smoke test failure.
- Severity 1 operational outage (Auth outage, Firestore read/write failure spike).
- Security anomaly or unexpected cross-tenant authorization denial spike.

---

## 2. Rollback Procedure to Version N-1

1. **Hosting Rollback**:
   - In Firebase Console / CLI, revert Hosting to previous release deployment channel:
     `firebase hosting:rollback --project vhos-production`
2. **Cloud Functions Rollback**:
   - Re-deploy functions from previous release tag:
     `git checkout tags/v-previous && firebase deploy --only functions --project vhos-production`
3. **Firestore & Storage Rules Rollback**:
   - Re-deploy verified rules from previous tag:
     `firebase deploy --only firestore:rules,storage:rules --project vhos-production`
4. **Post-Rollback Verification**:
   - Run production smoke tests to confirm healthy operational state.
   - Emit `DEPLOYMENT_ROLLED_BACK` event in platform audit log.
