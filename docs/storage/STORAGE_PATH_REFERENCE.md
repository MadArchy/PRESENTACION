# Storage Path Reference: Phase 009

**Specification:** `SPEC-009 — Secure Storage & Controlled Data Room Sharing`  
**Version:** `1.0`  

---

## 1. Canonical Storage Path Layout

All binary blobs in Venture Hub OS Secure Storage are strictly scoped by Organization and Project tenants:

```text
organizations/{organizationId}/projects/{projectId}/data-room/{fileId}/versions/{versionId}/{safeFileName}
```

### Path Segments
1. `organizations/{organizationId}`: Multi-tenant organization isolation root.
2. `projects/{projectId}`: Venture project boundary.
3. `data-room`: Subsystem classification namespace.
4. `{fileId}`: Stable logical file record identifier (e.g. `sfile-arcana-corp-01`).
5. `versions/{versionId}`: Immutable version identifier (e.g. `sver-arcana-1-v1`).
6. `{safeFileName}`: Sanitized original file name (regex: `/[^a-zA-Z0-9._-]/g -> '_'`).

---

## 2. Invariants

- Direct storage access outside this path pattern is strictly denied by default in `storage.rules`.
- Bucket roots, cross-tenant prefixes, and public directories are forbidden.
