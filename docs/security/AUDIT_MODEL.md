# Security Audit Model & Append-Only Log

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Status:** `ACTIVE`  

---

## 1. Audit Event Schema

```json
{
  "id": "evt-1787779000",
  "organizationId": "org-arcana",
  "projectId": "arcana",
  "actorUserId": "usr-owner-01",
  "type": "PROJECT_ACCESS_GRANTED",
  "targetType": "PROJECT_ACCESS",
  "targetId": "usr-editor-01",
  "occurredAt": "2026-08-26T18:00:00Z",
  "requestId": "req-99120",
  "metadata": { "role": "PROJECT_EDITOR" },
  "source": "TRUSTED_FUNCTION"
}
```

## 2. Integrity Guarantees

- **Client Create Denied:** Clients cannot forge audit events.
- **Client Update/Delete Denied:** Once appended, audit records cannot be mutated.
- **Tenant Scoping:** Audit log queries enforce strict organization isolation.
