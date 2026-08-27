# Production Secret Policy

**Document ID:** `PRODUCTION_SECRET_POLICY`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  

---

## 1. Secret Classification & Management

- **Server-Side Secrets**: Service account private keys, AI provider API keys, and administrative credentials are stored exclusively in Google Cloud Secret Manager / Firebase environment secrets.
- **Prohibited Locations**:
  - Never in Git repository source control.
  - Never in client JavaScript bundles (`dist/`).
  - Never in localStorage, sessionStorage, or client cookies.
  - Never in structured application logs.

---

## 2. Automated Secret Scan Verification

Automated pre-commit and CI gates scan all code and artifacts for:
- RSA / EC private keys
- Service account JSON key files
- Firebase Admin SDK private tokens
- Cloud Storage access secrets
- AI provider API keys

**Result**: 0 secrets committed across all categories.
