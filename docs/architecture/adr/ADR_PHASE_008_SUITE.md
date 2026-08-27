# Venture Hub OS — Architecture Decision Records Suite: Phase 008

**Document ID:** `ADR-SUITE-008`  
**Phase:** `VHOS-PHASE-008: Security, Authentication, RBAC & Audit`  
**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Status:** `APPROVED`  
**Date:** `2026-08-26`  

---

## ADR-0066: Firebase Security Control Plane Boundary
- **Context:** Venture Hub OS requires production-grade identity, access control, and audit.
- **Decision:** Use Firebase Auth and Cloud Firestore strictly for security metadata and control plane, keeping canonical venture facts preserved.

---

## ADR-0067: Organization-Scoped Multi-Tenant RBAC
- **Context:** Access must be isolated between independent venture organizations.
- **Decision:** Implement `OrganizationMembership` and role taxonomy (`ORG_OWNER`, `ORG_ADMIN`, `ORG_MEMBER`, `ORG_VIEWER`).

---

## ADR-0068: Project-Scoped Access Assignments
- **Context:** Members within an organization require granular, project-specific roles.
- **Decision:** Implement `ProjectAccessAssignment` with 7 project-scoped roles.

---

## ADR-0069: Versioned Permission Catalog v1.0
- **Context:** Avoid hardcoded role checks across UI and domain.
- **Decision:** Codify 30 granular permissions in `RolePermissionPolicy` v1.0.

---

## ADR-0070: Deterministic Fail-Closed Authorization
- **Context:** Security evaluations must default to deny.
- **Decision:** Enforce 14 explicit fail-closed reason codes in `AuthorizationService`.

---

## ADR-0071: Trusted Server Boundary for Privileged Security Operations
- **Context:** Clients must not perform direct privileged security writes.
- **Decision:** Route role and membership assignments through trusted server functions.

---

## ADR-0072: Application-Level Append-Only Security Audit Log
- **Context:** Security-relevant actions require reliable tracking without client tampering.
- **Decision:** Implement application-level append-only security audit by enforcing client write denial on `auditEvents` collection and appending exclusively from trusted server functions.

---

## ADR-0073: Coarse Platform Claims vs. Firestore Resource Roles
- **Context:** Custom claims have size limits and shouldn't store complex project lists.
- **Decision:** Restrict custom claims to `platformAdmin: true`, storing fine-grained roles in Firestore.

---

## ADR-0074: Confidentiality Metadata to Permission Mapping
- **Context:** Diligence document confidentiality tags must integrate with RBAC.
- **Decision:** Map `CONFIDENTIAL` and `HIGHLY_CONFIDENTIAL` to explicit permissions `data_room.read_confidential` and `data_room.read_highly_confidential`.

---

## ADR-0075: Sensitive Static Assets Must Not Ship Publicly
- **Context:** Client-side auth does not protect bundled public static files.
- **Decision:** Exclude non-public binaries from `dist/` and assign `SECURE_STORAGE_PENDING` until Phase 009.

---

## ADR-0076: Non-Migration of Canonical Venture Content Plane
- **Context:** Preserving architectural stability of Project Twin, Claims, Evidence, and Presentations.
- **Decision:** Do not migrate canonical venture content into Firestore in Phase 008.
