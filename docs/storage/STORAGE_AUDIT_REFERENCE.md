# Storage Audit Reference: Phase 009

**Specification:** `SPEC-009 — Secure Storage & Controlled Data Room Sharing`  
**Version:** `1.0`  

---

## 1. Storage Audit Events

All mutations and binary downloads in Secure Storage emit structured audit events to `organizations/{orgId}/auditEvents`:

1. `FILE_UPLOAD_INTENT_CREATED`
2. `FILE_UPLOAD_COMPLETED`
3. `FILE_UPLOAD_FAILED`
4. `FILE_VERSION_CREATED`
5. `FILE_VERSION_SUPERSEDED`
6. `FILE_QUARANTINED`
7. `FILE_RESTORED`
8. `FILE_DELETE_REQUESTED`
9. `FILE_DELETED`
10. `FILE_DOWNLOAD_AUTHORIZED`
11. `FILE_DOWNLOAD_DENIED`
12. `SHARE_GRANT_CREATED`
13. `SHARE_GRANT_REVOKED`

Direct client writes to audit collections are blocked by Firestore security rules (`allow write: if false;`). Only trusted backend commands emit audit events.
