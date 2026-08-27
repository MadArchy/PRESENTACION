# Controlled Sharing Reference: Phase 009

**Specification:** `SPEC-009 — Secure Storage & Controlled Data Room Sharing`  
**Version:** `1.0`  

---

## 1. Controlled Sharing Model

- **No Anonymous Access:** Anonymous download links, password-only shares, and public bucket URLs are **NOT IMPLEMENTED** and strictly forbidden.
- **Grantee Identity:** Access is granted strictly to authenticated user IDs with the `EXTERNAL_REVIEWER` project role.
- **Share Grants:**
  - `PROJECT_DATA_ROOM`: Grants access to all project data room files up to `confidentialityCeiling`.
  - `SELECTED_FILES`: Grants access only to files explicitly listed in `fileIds` and up to `confidentialityCeiling`.
- **Temporal Bound:** ShareGrants support optional `expiresAt` timestamps. Expired grants fail closed.
- **Immediate Revocation:** Any `PROJECT_ADMIN`, `ORG_ADMIN`, or `ORG_OWNER` can revoke a grant instantly via `RevokeShareGrant`.
