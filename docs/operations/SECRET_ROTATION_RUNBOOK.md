# Secret Rotation Runbook

**Document ID:** `SECRET_ROTATION_RUNBOOK`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Owner Role:** Security Administrator  

---

## 1. Secret Inventory & Rotation Schedules

| Secret Class | Rotation Schedule | Provider Mechanism | Zero-Downtime Strategy |
|---|---|---|---|
| **AI Provider API Keys** | Every 90 days | Google Secret Manager | Dual-active keys with rollover period |
| **Firebase Service Account Keys** | Every 180 days | Google Cloud IAM | Generate new key, deploy to Functions, delete old key |
| **App Check Debug Secrets** | On-demand / per release | Firebase App Check Console | Revoke old debug token, register new token |
| **CI/CD Deployment Credentials** | Every 90 days | GitHub Actions Secrets | Rotate deployment service account token |

---

## 2. Emergency Rotation Protocol

In the event of suspected credential exposure:
1. Immediately generate new secret version in Secret Manager.
2. Update Cloud Functions configuration.
3. Invalidate/revoke compromised credential in provider console.
4. Run audit log search for rogue requests using the compromised token.
