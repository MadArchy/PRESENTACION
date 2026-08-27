# Firestore Security Model & Control Plane Reference

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Status:** `ACTIVE`  

---

## 1. Collection Layout

- `users/{userId}`: User profile security metadata.
- `organizations/{orgId}`: Organization record.
- `organizations/{orgId}/members/{userId}`: Organization membership.
- `organizations/{orgId}/projectAccess/{assignmentId}`: Project access assignment.
- `organizations/{orgId}/auditEvents/{eventId}`: Append-only security audit records.
- `securityPolicies/{policyId}`: Read-only role-permission mapping documents.

---

## 2. Authority Boundaries

Firestore in Phase 008 is authoritative **only** for identity metadata, memberships, project assignments, and audit logs. Canonical venture content remains preserved under existing governed JSON files.
