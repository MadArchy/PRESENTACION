# Security Handoff Manual

**Document ID:** `SECURITY_HANDOFF`  
**Specification:** `SPEC-012 — Release Candidate & Final Acceptance`  
**Release Baseline:** `v0.1.0-RC1`  
**Status:** `READY_FOR_APPROVAL`  

---

## 1. Authentication & Session Security

- **Authentication Provider**: Firebase Authentication (Email/Password, Google OAuth).
- **Session Verification**: Live active-user and active-tenant status checks on every request via `AuthorizationService` and Firestore Security Rules.
- **Fail-Closed Default**: Anonymous or unauthenticated requests to protected endpoints are rejected with `UNAUTHENTICATED`.

---

## 2. Role-Based Access Control (RBAC)

The system implements strict hierarchical role capabilities across two tenant levels:
- **Organization Level**: `ORG_OWNER` (full administration), `ORG_ADMIN` (project creation, member management), `ORG_MEMBER` (collaborator).
- **Project Level**: `PROJECT_ADMIN` (settings, module flags, sharing), `PROJECT_EDITOR` (draft twin edit, file upload), `PROJECT_VIEWER` (read-only), `EXTERNAL_REVIEWER` (bounded ShareGrant access).
- **Platform Level**: `PLATFORM_ADMIN` (global health & summary inspection).
- **Invariant**: Last active `ORG_OWNER` cannot be removed, suspended, or demoted.

---

## 3. Storage & Controlled Sharing Boundary

- **Private Delivery**: All storage objects are private (`allow read, write: if false;` at root; path-scoped access via `organizations/{orgId}/projects/{projectId}/`).
- **Controlled Sharing**: External reviewer downloads require active `ShareGrant` with matching file IDs and confidentiality ceiling (`PUBLIC`, `INTERNAL`, `CONFIDENTIAL`, `HIGHLY_CONFIDENTIAL`).
- **Direct Delete Protection**: Client direct object delete is prohibited fail-closed (`allow delete: if false;`); deletions require trusted cloud functions.

---

## 4. Threat Model & Threat Mitigations

All 68 identified threats (`T-01` through `T-68`) are mitigated across identity, storage, administration, production hardening, and release governance. Residual risk across all categories is evaluated as **LOW**.
