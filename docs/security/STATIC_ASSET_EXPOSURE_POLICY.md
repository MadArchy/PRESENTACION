# Static Asset Security & Sensitive File Exposure Policy

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Status:** `ACTIVE`  

---

## 1. Static Asset Gate Rules

1. **PUBLIC Binaries:** Allowed in static bundle if marked `PUBLIC`.
2. **INTERNAL / CONFIDENTIAL / HIGHLY_CONFIDENTIAL Binaries:** **STRICTLY FORBIDDEN** in public production bundle (`dist/`).
3. **Pending Storage Delivery:** Unmigrated non-public binary assets must reference `SECURE_STORAGE_PENDING` until Phase 009.
