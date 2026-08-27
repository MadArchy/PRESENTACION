# Operations Handoff Manual

**Document ID:** `OPERATIONS_HANDOFF`  
**Specification:** `SPEC-012 — Release Candidate & Final Acceptance`  
**Release Baseline:** `v0.1.0-RC1`  
**Recommended Production Target:** `v1.0.0`  
**Target Environment:** `vhos-production` (`https://vhos-production.web.app`)  
**Status:** `READY_FOR_APPROVAL`  

---

## 1. System Overview & Architecture

Venture Hub OS is an executive venture intelligence, presentation, and governance platform built on a Feature-Oriented Hexagonal Web Architecture. The frontend application is compiled to static ES modules and delivered via Firebase Hosting with strict Content Security Policy, while privileged operations are executed through isolated Google Cloud Functions and Firestore/Storage security rules.

---

## 2. Production Environment Topology

- **Hosting CDN**: `vhos-production.web.app` / `vhos-production.firebaseapp.com`
- **Database**: Google Cloud Firestore (Multi-Region / Default-Deny Ruleset)
- **Object Storage**: Google Cloud Storage (`gs://vhos-production.appspot.com`)
- **Backend Runtime**: Node.js 20 Cloud Functions with 60s execution timeouts and App Check token verification
- **Observability**: Cloud Logging (Structured JSON with mandatory correlation IDs and deep sanitization)

---

## 3. Deployment & Release Protocol

1. **Continuous Integration**: GitHub Actions workflow (`.github/workflows/vhos-ci-cd.yml`) executes 17 verified build gates including typecheck, unit, security, storage, administration, performance, secret scan, and staging smoke.
2. **Immutable Build Artifact**: Production deployment uses the verified `dist/` build output without recompilation.
3. **Human Approval Gate**: Production release requires explicit human operator authorization via the GitHub Actions environment gate or authorized CLI invocation.
4. **Post-Deployment Verification**: Run the 12-flow smoke suite non-destructively:
   ```bash
   npm run test:prod
   ```

---

## 4. Disaster Recovery & Rollback

- **Hosting Rollback**:
  ```bash
  firebase hosting:rollback
  ```
- **Functions & Rules Rollback**: Re-deploy previous release tag `git checkout <previous-tag> && firebase deploy --only functions,firestore:rules,storage`.
- **Database Backup & Restore**: Automated daily Firestore export to `gs://vhos-production-backups/firestore/`. Recovery Point Objective (RPO) = 24 hours; Recovery Time Objective (RTO) = 2 hours. Refer to `docs/operations/BACKUP_RESTORE_RUNBOOK.md`.

---

## 5. Secret Rotation & Incident Escalation

- **Rotation Schedules**: AI Provider keys (90 days), Service accounts (180 days), CI credentials (90 days). Refer to `docs/operations/SECRET_ROTATION_RUNBOOK.md`.
- **Incident Response**: Severity triage (CRITICAL 15 min SLA, HIGH 1 hr SLA, MEDIUM 4 hr SLA). Refer to `docs/operations/INCIDENT_RESPONSE_RUNBOOK.md`.
