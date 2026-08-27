# Venture Hub OS — Phase 008: Security, Authentication, RBAC & Audit

**Document ID:** `VHOS-PHASE-008`  
**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-007 — Due Diligence Data Room`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Frontend:** Vite + TypeScript  
**Security Control Plane:** Firebase Auth + Cloud Firestore + Security Rules  
**Trusted Security Operations:** Minimal Firebase Cloud Functions  
**App Integrity:** Firebase App Check authorized/recommended  
**Canonical Project Content:** Preserved under existing governed architecture  
**Firebase Storage:** NOT AUTHORIZED in Phase 008  
**Secure Binary Data Room Delivery:** NOT AUTHORIZED in Phase 008  
**AI Canonical Auto-Write:** FORBIDDEN  
**Next Planned Phase:** `VHOS-PHASE-009 — Secure Storage & Controlled Data Room Sharing`

---

# 1. Executive Purpose

Phase 008 introduces the first production-oriented security control plane for Venture Hub OS.

The platform evolves from:

```text
WEB-FIRST
STATIC
NO AUTH
NO RBAC
NO BACKEND
NO DATABASE
```

into:

```text
IDENTITY
   ↓
ORGANIZATION
   ↓
MEMBERSHIP
   ↓
PROJECT ACCESS
   ↓
ROLE
   ↓
PERMISSION
   ↓
TRUSTED SECURITY OPERATIONS
   ↓
AUDIT
```

The platform SHALL be able to answer deterministically:

```text
WHO is this user?
WHICH organization do they belong to?
WHICH projects may they access?
WHAT may they do?
WHY was access allowed or denied?
WHO changed security state?
WHEN did it change?
WHAT changed?
```

---

# 2. Critical Security Boundary

Authentication does not protect a file already shipped in a public static bundle.

Therefore:

> **Phase 008 SHALL NOT claim that Data Room binary files are securely protected merely because Auth/RBAC exists.**

Phase 008 secures:

- identity;
- organization membership;
- project authorization metadata;
- application routes;
- Firestore security metadata;
- privileged security administration;
- security audit records;
- confidentiality authorization decisions.

Phase 008 does NOT yet provide:

- secure cloud file storage;
- signed file downloads;
- external investor share links;
- secure binary Data Room delivery.

Those belong to Phase 009.

---

# 3. Control Plane vs Content Plane

## 3.1 Security Control Plane

Authorized in Phase 008:

```text
Firebase Authentication
Cloud Firestore
Firestore Security Rules
Firebase Emulator Suite
Minimal Firebase Cloud Functions
Firebase App Check
Security Audit
RBAC
Organization Membership
Project Access Assignments
```

## 3.2 Canonical Content Plane

Phase 008 SHALL NOT migrate the canonical business truth of:

```text
Project Twin
Claims
Evidence
NarrativePlan
PresentationDefinition
```

into Firestore merely because Firestore is now authorized.

Firestore in this phase is authoritative only for the security control plane.

---

# 4. Non-Negotiable Security Invariants

1. `UI guard ≠ authorization`.
2. Missing authorization state SHALL fail closed.
3. Authentication alone SHALL NOT imply project access.
4. Organization isolation SHALL be enforced.
5. Project isolation SHALL be enforced.
6. Users SHALL NOT self-elevate roles.
7. Ordinary clients SHALL NOT directly perform privileged role/access mutations.
8. Authoritative audit events SHALL be append-only from trusted server operations.
9. Clients SHALL NOT create/update/delete authoritative audit events.
10. Security Rules SHALL default deny.
11. Unknown roles/permissions SHALL deny.
12. Cross-organization resource references SHALL deny.
13. AI Copilot SHALL inherit the same SecurityContext and cannot bypass access.
14. Presenter, Data Room, Claims, Evidence and Project Twin operations SHALL use explicit permissions.
15. No server credential/service account secret may reach browser code.
16. Firebase web configuration SHALL not be treated as an authorization secret.
17. Non-public Data Room binary assets SHALL not ship in public production `dist/`.
18. Security-relevant administrative changes SHALL emit audit events.
19. Authorization decisions SHALL be deterministic and explainable.
20. AI SHALL NOT make security decisions.

---

# 5. Authorized Firebase Services

Authorized:

```text
Firebase Authentication
Cloud Firestore
Firestore Security Rules
Firebase Cloud Functions — security/admin only
Firebase Emulator Suite
Firebase App Check
Firebase Hosting configuration updates
```

Not authorized:

```text
Firebase Storage
Cloud file upload
Signed download URLs
General-purpose backend API
Realtime Database
```

---

# 6. Why Trusted Cloud Functions Are Required

Security-sensitive writes such as:

```text
assign organization role
grant project access
change project role
suspend member
revoke member
revoke project access
write authoritative audit event
```

must not trust the browser.

Therefore a minimal trusted server-side security command boundary is authorized.

Cloud Functions SHALL NOT become a generic backend for Project Twin, Claims/Evidence, Narrative, Presentation or Copilot.

---

# 7. Module Structure

Create:

```text
src/modules/security/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── policies/
│   ├── services/
│   ├── ports/
│   ├── events/
│   └── errors/
├── application/
│   ├── commands/
│   ├── queries/
│   └── use-cases/
├── adapters/
│   ├── firebase/
│   ├── browser/
│   └── test/
└── tests/
```

Trusted functions:

```text
functions/src/security/
```

or equivalent existing workspace.

UI:

```text
src/ui/security/
```

Dependency direction remains:

```text
UI → Application → Domain
```

Security domain MUST NOT import Firebase SDK, DOM, browser storage, Cloud Functions SDK, provider SDKs or UI.

---

# 8. Identity Model

## 8.1 AuthenticatedIdentity

```ts
interface AuthenticatedIdentity {
  userId: string;
  email?: string;
  displayName?: string;
  emailVerified: boolean;
  authProviderIds: string[];
  platformRole?: PlatformRole;
}
```

## 8.2 Authentication States

```text
AUTH_INITIALIZING
UNAUTHENTICATED
AUTHENTICATED
AUTHENTICATED_UNVERIFIED
AUTH_ERROR
```

## 8.3 Authentication Methods

Required minimum:

```text
EMAIL_PASSWORD
```

Recommended if configured:

```text
GOOGLE
```

## 8.4 Email Verification

Recommended production policy:

```text
verified email required for organization/project access
```

Emulator/test identities may be explicitly exempted.

---

# 9. User Model

```ts
interface UserProfile {
  userId: string;
  displayName: string;
  primaryEmail?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
```

Required `UserStatus`:

```text
ACTIVE
SUSPENDED
DEACTIVATED
```

Suspended/deactivated users SHALL fail authorization.

---

# 10. Organization Model

```ts
interface Organization {
  id: string;
  name: string;
  slug: string;
  status: OrganizationStatus;
  createdAt: string;
  updatedAt: string;
}
```

`OrganizationStatus`:

```text
ACTIVE
SUSPENDED
ARCHIVED
```

---

# 11. Organization Membership

```ts
interface OrganizationMembership {
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  status: MembershipStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
```

`MembershipStatus`:

```text
INVITED
ACTIVE
SUSPENDED
REVOKED
```

`OrganizationRole`:

```text
ORG_OWNER
ORG_ADMIN
ORG_MEMBER
ORG_VIEWER
```

---

# 12. Platform Role

Required coarse platform role:

```text
PLATFORM_ADMIN
```

Optional:

```text
PLATFORM_SUPPORT
```

Platform role SHALL NOT be modeled as a normal organization membership.

Recommended implementation:

```text
Firebase custom claim: platformAdmin = true
```

Custom claims SHALL NOT contain complete project/member/permission lists.

---

# 13. Project Roles

Required:

```text
PROJECT_ADMIN
PROJECT_EDITOR
PROJECT_ANALYST
PROJECT_REVIEWER
PROJECT_PRESENTER
PROJECT_VIEWER
EXTERNAL_REVIEWER
```

A user may hold different roles on different projects.

Example:

```text
ORG_MEMBER
├── Project A → PROJECT_ADMIN
├── Project B → PROJECT_VIEWER
└── Project C → NO ACCESS
```

---

# 14. ProjectAccessAssignment

```ts
interface ProjectAccessAssignment {
  organizationId: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  status: AccessAssignmentStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
```

Required status:

```text
ACTIVE
SUSPENDED
REVOKED
```

One effective assignment per:

```text
organizationId + projectId + userId
```

---

# 15. Permission Catalog v1.0

Required permission families:

```text
organization.read
organization.manage

members.read
members.invite
members.manage_roles
members.suspend

projects.read
projects.create
projects.manage_access
projects.manage_settings

project_twin.read
project_twin.edit

claims.read
claims.edit
claims.review

evidence.read
evidence.manage

narrative.read
narrative.generate

presentation.read
presentation.generate

presenter.use

copilot.use
copilot.configure_provider

data_room.read
data_room.read_confidential
data_room.read_highly_confidential
data_room.manage_metadata
data_room.manage_requests

security.read
security.manage

audit.read
```

Required:

```text
permissionCatalogVersion = "1.0"
securityPolicyVersion = "1.0"
```

---

# 16. RolePermissionPolicy

Create one versioned role → permission policy.

No UI component may invent local role rules.

Recommended baseline:

## PROJECT_VIEWER

```text
projects.read
project_twin.read
claims.read
evidence.read
narrative.read
presentation.read
data_room.read
```

## PROJECT_PRESENTER

PROJECT_VIEWER +

```text
presenter.use
```

## PROJECT_ANALYST

PROJECT_VIEWER +

```text
copilot.use
```

## PROJECT_REVIEWER

PROJECT_VIEWER +

```text
claims.review
```

## PROJECT_EDITOR

PROJECT_VIEWER +

```text
project_twin.edit
claims.edit
evidence.manage
narrative.generate
presentation.generate
data_room.manage_metadata
data_room.manage_requests
copilot.use
```

## PROJECT_ADMIN

All project capabilities, including:

```text
projects.manage_access
projects.manage_settings
```

Exact mapping SHALL be versioned, documented and tested.

---

# 17. External Reviewer

`EXTERNAL_REVIEWER` SHALL be restrictive by default.

Recommended baseline:

```text
projects.read
project_twin.read
presentation.read
data_room.read
```

No default edit/manage permissions.

`CONFIDENTIAL` and `HIGHLY_CONFIDENTIAL` access require explicit capabilities.

---

# 18. Confidentiality Authorization

Map Phase 007 metadata to explicit permissions:

```text
PUBLIC
→ normal project read

INTERNAL
→ data_room.read

CONFIDENTIAL
→ data_room.read_confidential

HIGHLY_CONFIDENTIAL
→ data_room.read_highly_confidential
```

This protects metadata/application behavior.

Binary file security remains Phase 009.

---

# 19. AuthorizationDecision

```ts
interface AuthorizationDecision {
  allowed: boolean;
  reasonCode: AuthorizationReasonCode;
  requiredPermissions: Permission[];
  grantedPermissions: Permission[];
  organizationId?: string;
  projectId?: string;
  policyVersion: string;
}
```

Reason codes SHALL include:

```text
ALLOW
UNAUTHENTICATED
EMAIL_NOT_VERIFIED
USER_SUSPENDED
ORGANIZATION_NOT_FOUND
ORGANIZATION_SUSPENDED
MEMBERSHIP_MISSING
MEMBERSHIP_INACTIVE
PROJECT_ACCESS_MISSING
PROJECT_ACCESS_INACTIVE
PERMISSION_MISSING
CONFIDENTIALITY_PERMISSION_MISSING
CROSS_ORGANIZATION_ACCESS
INVALID_RESOURCE_CONTEXT
```

---

# 20. Fail-Closed Authorization

Examples:

```text
missing membership → DENY
missing project assignment → DENY
unknown role → DENY
malformed resource context → DENY
cross-organization mismatch → DENY
```

No probabilistic access score.

---

# 21. AuthorizationService

Create deterministic:

```text
AuthorizationService
```

Inputs:

```text
identity
user status
organization status
membership
project assignment
role policy
requested permission
resource context
confidentiality
```

Output:

```text
AuthorizationDecision
```

---

# 22. SecurityContext

```ts
interface SecurityContext {
  identity: AuthenticatedIdentity;
  organization?: Organization;
  membership?: OrganizationMembership;
  projectAccess?: ProjectAccessAssignment;
  effectivePermissions: Permission[];
}
```

Required application service:

```text
BuildSecurityContext
```

---

# 23. Firestore Control Plane

Recommended collections:

```text
users/{userId}
organizations/{organizationId}
organizations/{organizationId}/members/{userId}
organizations/{organizationId}/projects/{projectId}
organizations/{organizationId}/projectAccess/{assignmentId}
organizations/{organizationId}/auditEvents/{eventId}
securityPolicies/rolePermissionCatalog
```

Equivalent layouts are acceptable only if Rules remain efficient and traceable.

---

# 24. Firestore Authority Boundary

Firestore is authoritative in Phase 008 for:

```text
user security profile metadata
organizations
memberships
project security records
project access assignments
role/permission policy metadata
security audit events
```

Firestore is NOT authoritative for:

```text
Project Twin business truth
Claims/Evidence
NarrativePlan
PresentationDefinition
Data Room binary files
```

---

# 25. Firestore Security Rules

Rules SHALL enforce:

1. authenticated reads only where required;
2. organization isolation;
3. project isolation;
4. no direct role escalation;
5. no self-role escalation;
6. no direct authoritative audit writes;
7. revoked/suspended access denial;
8. safe list/query patterns;
9. default deny.

Forbidden broad rule:

```text
allow read, write: if request.auth != null;
```

---

# 26. Trusted Security Commands

Required trusted operations:

```text
CreateOrganization
AddOrganizationMember
ChangeOrganizationMemberRole
SuspendOrganizationMember
RevokeOrganizationMember

RegisterProjectSecurity
GrantProjectAccess
ChangeProjectRole
SuspendProjectAccess
RevokeProjectAccess
```

Every command SHALL independently verify caller authorization.

Never trust role claims supplied by UI payload.

---

# 27. Role Escalation Protection

Required:

```text
user cannot grant themselves higher role
ORG_MEMBER cannot manage organization roles
PROJECT_VIEWER cannot change project access
PROJECT_ADMIN cannot create PLATFORM_ADMIN
ORG_ADMIN cannot silently become ORG_OWNER
```

Recommended owner safeguard:

```text
last ORG_OWNER cannot be removed/suspended/downgraded without ownership transfer
```

---

# 28. Transactions and Idempotency

Security commands SHOULD use transactions where concurrency could produce inconsistent role/access state.

Repeated equivalent commands should not produce duplicate effective memberships/access assignments.

---

# 29. Audit Domain

Create:

```ts
interface AuditEvent {
  id: string;
  organizationId?: string;
  projectId?: string;
  actorUserId: string;
  type: AuditEventType;
  targetType: string;
  targetId?: string;
  occurredAt: string;
  requestId?: string;
  before?: AuditValueSummary;
  after?: AuditValueSummary;
  metadata: Record<string, unknown>;
  source: "TRUSTED_FUNCTION";
}
```

Required event types:

```text
ORGANIZATION_CREATED
MEMBER_ADDED
MEMBER_ROLE_CHANGED
MEMBER_SUSPENDED
MEMBER_REVOKED
PROJECT_SECURITY_REGISTERED
PROJECT_ACCESS_GRANTED
PROJECT_ROLE_CHANGED
PROJECT_ACCESS_SUSPENDED
PROJECT_ACCESS_REVOKED
SECURITY_POLICY_CHANGED
```

---

# 30. Audit Append-Only Rule

Authoritative audit records:

```text
client CREATE → DENY
client UPDATE → DENY
client DELETE → DENY
trusted server append → ALLOW
```

Audit access requires:

```text
audit.read
```

and organization isolation.

This is application-level append-only integrity, not an externally immutable cryptographic ledger.

---

# 31. Request Correlation

Trusted operations SHOULD generate:

```text
requestId
```

for correlation between:

```text
command result
audit event
server log
```

---

# 32. Security Logging

Allowed log fields:

```text
requestId
operation
actor userId
target IDs
result
duration
```

Forbidden:

```text
password
ID token
refresh token
service account private key
AI provider key
```

---

# 33. App Check

Firebase App Check is authorized and recommended for production.

It supplements but never replaces:

```text
Auth
RBAC
Security Rules
```

---

# 34. Authentication UI

Required:

```text
Login
Email
Password
Sign In
Sign Out
Loading
Invalid Credentials
Access Denied
Email Verification State
```

Recommended:

```text
Password Reset
```

Initial registration SHOULD be invite-controlled rather than unrestricted.

---

# 35. Security Administration UI

Create:

```text
Security Dashboard
Organization Switcher
Members
Project Access
Role Selector
Permission Inspector
Audit Log
Security Status
```

---

# 36. Access Denied UX

Denied access SHALL be clear without leaking unrelated tenant information.

Cross-org unauthorized resources should preferably return a generic:

```text
Resource unavailable
```

rather than confirming existence.

---

# 37. Organization Isolation

A user in Org A SHALL not infer:

```text
Org B project names
Org B members
Org B emails
Org B audit events
Org B access assignments
```

List-query isolation SHALL be explicitly tested.

---

# 38. Project Isolation

A user with Project A access but no Project B access SHALL not read Project B security metadata even within the same organization.

---

# 39. Existing Module Authorization

Required mapping examples:

```text
Project Workspace → projects.read
Project Twin read → project_twin.read
Project Twin edit → project_twin.edit
Claims read → claims.read
Claims edit → claims.edit
Claims review → claims.review
Evidence → evidence.manage
Narrative generation → narrative.generate
Presentation generation → presentation.generate
Presenter Cockpit → presenter.use
AI Copilot → copilot.use
Data Room → data_room.read
Security admin → security.manage
Audit → audit.read
```

No module may create ad hoc role checks.

---

# 40. AI Copilot Security Boundary

AI Copilot SHALL consume the current authorized `SecurityContext`.

AI SHALL NOT:

```text
assign roles
grant permissions
revoke users
make authorization decisions
load unauthorized projects
bypass confidentiality permissions
```

---

# 41. Presenter Security Boundary

Presenter Cockpit requires:

```text
presentation.read
presenter.use
```

Public presentation sharing is NOT authorized in Phase 008.

---

# 42. Data Room Security Boundary

Metadata access becomes permission-aware.

Binary delivery remains pending Phase 009.

The UI SHALL continue to state:

> Secure confidential file delivery is not implemented in Phase 008.

---

# 43. Sensitive Static Asset Exposure Gate

This is a mandatory security gate.

Production build SHALL report:

```text
PUBLIC Data Room binaries:              X
INTERNAL binaries exposed publicly:     0
CONFIDENTIAL binaries exposed publicly: 0
HIGHLY_CONFIDENTIAL exposed publicly:   0
```

Any non-public Data Room binary in public production output:

```text
→ NOT_READY
```

---

# 44. Secure Storage Pending State

If Data Room metadata references a non-public asset but Phase 009 storage is unavailable, use a safe state such as:

```text
SECURE_STORAGE_PENDING
```

rather than a public URL.

---

# 45. Local Development vs Production

Local development MAY use repository-safe fixtures/assets.

Production build must pass the sensitive-asset exposure gate.

---

# 46. Environment Separation

Required:

```text
development
emulator/test
production
```

Production data SHALL not be used as emulator test state.

---

# 47. Service Account Security

Service account credentials SHALL NOT be committed to repository or bundled into frontend.

Cloud Functions SHALL use managed runtime credentials.

---

# 48. Firebase Client Configuration

Firebase web config may be environment-configured.

Do not falsely classify the public Firebase web API key as the security boundary.

Security comes from:

```text
Auth
Rules
RBAC
trusted server operations
```

---

# 49. Required Ports

```text
AuthenticationPort
UserProfileRepository
OrganizationRepository
OrganizationMembershipRepository
ProjectSecurityRepository
ProjectAccessRepository
AuditLogRepository (read-only client side)
SecurityAdministrationPort
```

---

# 50. Required Application Use Cases

Authentication/security context:

```text
GetCurrentIdentity
BuildSecurityContext
AuthorizePermission
ListMyOrganizations
ListAccessibleProjects
GetEffectivePermissions
```

Administration:

```text
CreateOrganization
ListOrganizationMembers
AddOrganizationMember
ChangeOrganizationMemberRole
SuspendOrganizationMember
RevokeOrganizationMember
RegisterProjectSecurity
ListProjectAccess
GrantProjectAccess
ChangeProjectRole
SuspendProjectAccess
RevokeProjectAccess
```

Audit:

```text
ListAuditEvents
GetAuditEvent
```

---

# 51. Threat Model

Create:

```text
docs/security/SECURITY_THREAT_MODEL.md
```

Mandatory threats:

```text
T-01 Unauthenticated access
T-02 Cross-organization read
T-03 Cross-project read
T-04 Self role escalation
T-05 Privileged role escalation
T-06 Direct Firestore rule bypass attempt
T-07 Direct audit mutation
T-08 Stale/revoked membership access
T-09 Suspended user access
T-10 Confidentiality metadata bypass
T-11 Static confidential asset exposure
T-12 Service credential leakage
T-13 Client token leakage
T-14 Broad unsafe Firestore list query
T-15 AI context access outside authorization scope
```

For each document:

```text
asset
threat actor
attack path
control
test/evidence
residual risk
```

---

# 52. Workstreams

```text
WS-008-01 Security Domain
WS-008-02 Authorization Engine
WS-008-03 Firebase Authentication
WS-008-04 Firestore Security Control Plane
WS-008-05 Trusted Security Commands
WS-008-06 Audit
WS-008-07 Security UI
WS-008-08 Existing Module Integration
WS-008-09 Sensitive Static Asset Exclusion
WS-008-10 Security Testing
WS-008-11 Documentation & Evidence
```

---

# 53. Task Matrix — Security Domain

```text
T-008-001 AuthenticatedIdentity
T-008-002 UserProfile
T-008-003 UserStatus
T-008-004 Organization
T-008-005 OrganizationStatus
T-008-006 OrganizationMembership
T-008-007 MembershipStatus
T-008-008 OrganizationRole
T-008-009 PlatformRole
T-008-010 ProjectRole
T-008-011 ProjectAccessAssignment
T-008-012 AccessAssignmentStatus
T-008-013 Permission
T-008-014 Permission Catalog v1.0
T-008-015 RolePermissionPolicy
T-008-016 AuthorizationDecision
T-008-017 AuthorizationReasonCode
T-008-018 SecurityContext
T-008-019 ResourceSecurityEnvelope
T-008-020 Security invariants
```

---

# 54. Task Matrix — Authorization

```text
T-008-101 AuthorizationService
T-008-102 unauthenticated DENY
T-008-103 unverified-email policy
T-008-104 suspended-user DENY
T-008-105 membership check
T-008-106 organization status check
T-008-107 project assignment check
T-008-108 permission resolution
T-008-109 confidentiality permission check
T-008-110 cross-org DENY
T-008-111 unknown-role DENY
T-008-112 explainable decisions
T-008-113 policy version 1.0
```

---

# 55. Task Matrix — Authentication / Firestore

```text
T-008-201 AuthenticationPort
T-008-202 FirebaseAuthenticationAdapter
T-008-203 SignIn use case
T-008-204 SignOut use case
T-008-205 Auth state listener
T-008-206 Email verification state
T-008-207 Password reset if supported
T-008-208 Emulator Auth configuration

T-008-301 Firestore control-plane schema
T-008-302 UserProfileRepository
T-008-303 OrganizationRepository
T-008-304 OrganizationMembershipRepository
T-008-305 ProjectSecurityRepository
T-008-306 ProjectAccessRepository
T-008-307 AuditLogRepository read port
T-008-308 Firebase repository adapters
T-008-309 Required indexes
T-008-310 Firestore Security Rules
T-008-311 Default deny
```

---

# 56. Task Matrix — Trusted Security Commands

```text
T-008-401 Security functions module
T-008-402 CreateOrganization
T-008-403 AddOrganizationMember
T-008-404 ChangeOrganizationMemberRole
T-008-405 SuspendOrganizationMember
T-008-406 RevokeOrganizationMember
T-008-407 RegisterProjectSecurity
T-008-408 GrantProjectAccess
T-008-409 ChangeProjectRole
T-008-410 SuspendProjectAccess
T-008-411 RevokeProjectAccess
T-008-412 Server authorization
T-008-413 Role escalation guards
T-008-414 Ownership guard
T-008-415 Transactions/idempotency
```

---

# 57. Task Matrix — Audit

```text
T-008-501 AuditEvent
T-008-502 AuditEventType
T-008-503 Audit read port
T-008-504 Trusted audit writer
T-008-505 Organization creation audit
T-008-506 Membership audit
T-008-507 Project access audit
T-008-508 requestId correlation
T-008-509 append-only rules
T-008-510 Audit list use case
T-008-511 Audit detail use case
```

---

# 58. Task Matrix — UI / Integration

```text
T-008-701 Login page
T-008-702 Auth initialization
T-008-703 Access denied page
T-008-704 Organization switcher
T-008-705 Member management
T-008-706 Project access management
T-008-707 Role selector
T-008-708 Permission inspector
T-008-709 Audit log
T-008-710 Security status
T-008-711 Email verification state
T-008-712 Mobile security layout

T-008-801 Protect Project Workspace
T-008-802 Protect Project Twin edit
T-008-803 Protect Claims
T-008-804 Protect Evidence
T-008-805 Protect Narrative generation
T-008-806 Protect Presentation generation
T-008-807 Protect Presenter
T-008-808 Protect Copilot
T-008-809 Protect Data Room metadata
T-008-810 Protect Data Room confidentiality
T-008-811 Verify no local role-rule duplication
```

---

# 59. Task Matrix — Static Asset Security

```text
T-008-901 Inventory production static assets
T-008-902 Map confidentiality metadata to asset refs
T-008-903 Sensitive static asset scanner
T-008-904 Exclude CONFIDENTIAL assets
T-008-905 Exclude HIGHLY_CONFIDENTIAL assets
T-008-906 Exclude INTERNAL assets from public bundle
T-008-907 SECURE_STORAGE_PENDING state
T-008-908 Verify PUBLIC assets
T-008-909 Document Phase 009 migration
```

---

# 60. Required Security Test Gates

Domain/authz:

```text
UserProfile invariants
Organization invariants
Membership invariants
ProjectAccess invariants
Permission catalog
Role mappings
Unauthenticated DENY
Unverified-email policy
Suspended-user DENY
Missing membership DENY
Suspended membership DENY
Revoked membership DENY
Missing project assignment DENY
Revoked project assignment DENY
Cross-org DENY
Confidentiality permission
Unknown role DENY
Authorization determinism
Reason codes
```

Rules:

```text
Anonymous protected read DENY
Org A → Org B DENY
Project A → Project B DENY
Direct role mutation DENY
Self escalation DENY
Audit create DENY
Audit update DENY
Audit delete DENY
Revoked membership DENY
Suspended membership DENY
Revoked project access DENY
HIGHLY_CONFIDENTIAL without capability DENY
```

Trusted commands:

```text
Authorized caller PASS
Unauthenticated caller DENY
Insufficient role DENY
Cross-org DENY
Invalid target DENY
Forbidden escalation DENY
Successful mutation PASS
Audit emitted PASS
```

---

# 61. Mandatory Firestore Rules Matrix

| Attack / Rule | Expected |
|---|---|
| Anonymous reads protected org | DENY |
| Anonymous reads project security | DENY |
| Org A member reads Org B | DENY |
| Project A viewer reads Project B | DENY |
| Member self-promotes | DENY |
| Viewer changes project role | DENY |
| Client creates audit event | DENY |
| Client modifies audit event | DENY |
| Client deletes audit event | DENY |
| Suspended member reads project | DENY |
| Revoked member reads project | DENY |
| Revoked project assignment reads project | DENY |
| External reviewer reads HIGHLY_CONFIDENTIAL without permission | DENY |
| Authorized project admin operation | ALLOW |
| Authorized org admin member operation | ALLOW |

---

# 62. Mandatory Trusted Command Matrix

| Command | Authorized | Unauthorized | Audit |
|---|---:|---:|---:|
| CreateOrganization | PASS | DENY | PASS |
| AddOrganizationMember | PASS | DENY | PASS |
| ChangeOrganizationMemberRole | PASS | DENY | PASS |
| SuspendOrganizationMember | PASS | DENY | PASS |
| RevokeOrganizationMember | PASS | DENY | PASS |
| RegisterProjectSecurity | PASS | DENY | PASS |
| GrantProjectAccess | PASS | DENY | PASS |
| ChangeProjectRole | PASS | DENY | PASS |
| SuspendProjectAccess | PASS | DENY | PASS |
| RevokeProjectAccess | PASS | DENY | PASS |

---

# 63. Mandatory E2E Matrix

Playwright SHALL verify exactly:

```text
1. Login
2. Invalid Login
3. Sign Out
4. Protected Route Anonymous
5. Email Verification State
6. Organization Switcher
7. Organization Member List
8. Add Member
9. Change Member Role
10. Suspend Member
11. Project Access List
12. Grant Project Access
13. Change Project Role
14. Revoke Project Access
15. Access Denied
16. Cross-Org Resource Unavailable
17. Permission Inspector
18. Audit Log
19. Audit Detail
20. Project Viewer Read
21. Project Viewer Edit Denied
22. Project Editor Edit Allowed
23. Copilot Permission
24. Presenter Permission
25. Data Room Confidential Permission
26. Data Room Highly Confidential Denied
27. Mobile Security Admin
```

Required:

```text
27/27 PASS
```

---

# 64. Required Visual Regression

```text
Login
Security Dashboard
Organization Members
Project Access
Role Selector
Access Denied
Permission Inspector
Audit Log
Data Room Confidential Access State
Mobile Security Admin
```

Required:

```text
10/10 PASS
Desktop: 1440×900
Mobile: 390×844
Unexpected changes: 0
```

---

# 65. Secret Scan

Required:

```text
Repository private keys:       0
Service account JSON:          0
Firebase Admin private keys:   0
AI provider keys:              0
Authorization tokens:          0
Production bundle secrets:     0
```

---

# 66. Browser Runtime Gate

Required:

```text
Critical console errors: 0
Unhandled exceptions:    0
Critical asset 404s:     0
```

Handled authorization denial is not a runtime crash.

---

# 67. Regression Gate

Required:

```text
Phase 008 Security             PASS
Phase 007 Data Room            PASS
Phase 006 AI Copilot           PASS
Phase 005 Presenter            PASS
Phase 004 Presentation         PASS
Phase 003 Claims/Evidence      PASS
Phase 002 Narrative            PASS
Phase 001 Project Twin         PASS
Phase 000A Hexagonal           PASS
Phase 0 Legacy                 45/45 PASS minimum
```

---

# 68. Acceptance Criteria

```text
AC-008-001 Authentication enforced
AC-008-002 Organization isolation
AC-008-003 Project isolation
AC-008-004 Fail closed
AC-008-005 Versioned RBAC
AC-008-006 No self escalation
AC-008-007 Trusted privileged writes
AC-008-008 Firestore Rules enforcement
AC-008-009 Audit append-only
AC-008-010 Audit emitted for privileged changes
AC-008-011 Audit organization isolation
AC-008-012 Explainable authorization
AC-008-013 Confidentiality capabilities
AC-008-014 Copilot security context
AC-008-015 Presenter security context
AC-008-016 Non-public binaries absent from public dist
AC-008-017 No false secure-file claim
AC-008-018 No server secrets in client/repository
AC-008-019 Emulator security suite
AC-008-020 Existing domain preservation
AC-008-021 Full regression
```

---

# 69. Forbidden Scope Audit

Final report MUST explicitly state:

```text
Firebase Storage:                    NOT IMPLEMENTED
Cloud File Upload:                   NOT IMPLEMENTED
Secure Binary Data Room Delivery:    NOT IMPLEMENTED
Signed Download URLs:                NOT IMPLEMENTED
Public Presentation Sharing:         NOT IMPLEMENTED

General-Purpose Backend API:         NOT IMPLEMENTED
Canonical Project Twin Migration:    NOT IMPLEMENTED
Canonical Claims Migration:          NOT IMPLEMENTED
Canonical Evidence Migration:        NOT IMPLEMENTED

AI Security Decisions:               NOT IMPLEMENTED
AI Role Assignment:                  NOT IMPLEMENTED
AI Permission Mutation:              NOT IMPLEMENTED
AI Canonical Auto-Write:             NOT IMPLEMENTED

External Web Research:               NOT IMPLEMENTED
PPTX Export:                         NOT IMPLEMENTED
PDF Export:                          NOT IMPLEMENTED
```

Authorized/expected:

```text
Firebase Auth:                       IMPLEMENTED
Cloud Firestore Control Plane:       IMPLEMENTED
Firestore Security Rules:            IMPLEMENTED
Minimal Security Cloud Functions:    IMPLEMENTED
Security Audit Log:                  IMPLEMENTED
RBAC:                                IMPLEMENTED
```

---

# 70. Definition of Done

Phase 008 becomes `CODE_COMPLETE` only when:

- authentication works;
- organization and membership domain exists;
- project access exists;
- permission catalog exists;
- authorization is fail-closed;
- Firestore control plane exists;
- Security Rules exist;
- trusted security commands exist;
- append-only security audit exists;
- security UI exists;
- existing modules consume security context;
- non-public static assets are excluded from production;
- threat model exists;
- emulator tests exist.

Phase 008 becomes `VERIFIED` only if:

```text
TYPECHECK                              PASS
ARCHITECTURE                           PASS
AUTHENTICATION                         PASS
SECURITY DOMAIN                        PASS
RBAC POLICY                            PASS
AUTHORIZATION DETERMINISM              PASS
FAIL-CLOSED TESTS                      PASS
ORGANIZATION ISOLATION                 PASS
PROJECT ISOLATION                      PASS
SELF-ESCALATION DENIAL                 PASS
ROLE-ESCALATION DENIAL                 PASS
FIRESTORE RULES                        PASS
TRUSTED SECURITY COMMANDS              PASS
AUDIT APPEND-ONLY                      PASS
AUDIT EMISSION                         PASS
AUDIT ISOLATION                        PASS
SECURITY CONTEXT                       PASS
MODULE PERMISSION INTEGRATION          PASS
DATA ROOM CONFIDENTIALITY AUTHZ        PASS
COPILOT AUTHZ                          PASS
PRESENTER AUTHZ                        PASS
STATIC SENSITIVE ASSET SCAN            PASS
SECRET SCAN                            PASS
SECURITY E2E                           27/27 PASS
VISUAL REGRESSION                      10/10 PASS
THREAT MODEL                           PASS
PHASE 007 REGRESSION                   PASS
PHASE 006 REGRESSION                   PASS
PHASE 005 REGRESSION                   PASS
PHASE 004 REGRESSION                   PASS
PHASE 003 REGRESSION                   PASS
PHASE 002 REGRESSION                   PASS
PHASE 001 REGRESSION                   PASS
PHASE 000A REGRESSION                  PASS
PHASE 0 LEGACY                         PASS
STATIC/WEB DELIVERY                    PASS
BROWSER RUNTIME                        PASS
FORBIDDEN SCOPE                        PASS
```

Only the human owner may set:

```text
CLOSED
```

---

# 71. Required Documentation

Create:

```text
docs/security/SECURITY_DOMAIN_MODEL.md
docs/security/AUTHENTICATION_ARCHITECTURE.md
docs/security/ORGANIZATION_MEMBERSHIP_MODEL.md
docs/security/RBAC_PERMISSION_CATALOG.md
docs/security/AUTHORIZATION_POLICY.md
docs/security/FIRESTORE_SECURITY_MODEL.md
docs/security/FIRESTORE_RULES_REFERENCE.md
docs/security/TRUSTED_SECURITY_COMMANDS.md
docs/security/AUDIT_MODEL.md
docs/security/SECURITY_THREAT_MODEL.md
docs/security/STATIC_ASSET_EXPOSURE_POLICY.md

docs/evidence/SPEC_008_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_008_VERIFICATION_REPORT.md
```

---

# 72. Recommended ADRs

```text
ADR-0066 Firebase Security Control Plane
ADR-0067 Organization-Scoped Multi-Tenant RBAC
ADR-0068 Project-Scoped Access Assignments
ADR-0069 Versioned Permission Catalog
ADR-0070 Fail-Closed Authorization
ADR-0071 Trusted Server Boundary for Privileged Security Mutations
ADR-0072 Append-Only Security Audit
ADR-0073 Coarse Platform Claims, Firestore Resource Roles
ADR-0074 Confidentiality Metadata to Permission Mapping
ADR-0075 Sensitive Static Assets Must Not Ship Publicly
ADR-0076 Security Control Plane Does Not Migrate Canonical Project Truth
```

---

# 73. Required Verification Report

Generate:

```text
docs/evidence/PHASE_008_VERIFICATION_REPORT.md
```

Required sections:

## Identification

```text
Phase
SPEC
branch
starting commit
ending commit
date
securityPolicyVersion
permissionCatalogVersion
Firebase environment
Rules version/hash
Functions version
```

No secrets.

## Authentication

```text
providers
email verification policy
emulator status
production configuration status
```

## RBAC

```text
organization roles
project roles
permission count
policy version
fail-closed behavior
```

## Rules Matrix

Report every mandatory allow/deny case individually.

## Trusted Commands

Report every command individually.

## Audit

```text
client create denied
client update denied
client delete denied
trusted event creation
organization isolation
```

## Static Asset Security

```text
PUBLIC assets
INTERNAL exposed
CONFIDENTIAL exposed
HIGHLY_CONFIDENTIAL exposed
```

## Secret Scan

Report all required secret classes.

## E2E

Report all 27 flows individually.

## Visual Regression

```text
10 baselines
desktop viewport
mobile viewport
unexpected changes
result
```

## Threat Model

Report:

```text
T-01 .. T-15
```

## Regression

Report every previous phase.

## Browser Runtime

```text
Critical console errors
Unhandled exceptions
Critical asset 404s
```

## Forbidden Scope

Explicit matrix.

## Final Recommendation

Only:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

---

# 74. SDD State Machine

```text
DRAFT_FOR_APPROVAL
        ↓
APPROVED
        ↓
IMPLEMENTING
        ↓
CODE_COMPLETE
        ↓
VERIFIED
        ↓
CLOSED
```

IDE MUST NOT self-close.

---

# 75. Change Control

Any proposal to add:

```text
Firebase Storage
secure binary delivery
signed URLs
public share links
general-purpose backend
canonical Project Twin migration
canonical Claims/Evidence migration
```

requires:

```text
docs/specs/changes/CHANGE_REQUEST_008_XXX.md
```

unless intentionally deferred to Phase 009.

---

# 76. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-008 — Security, Authentication, RBAC & Audit`

under:

`SPEC-008 — Security, Authentication, RBAC & Audit`

Previous Phase 007 is approved CLOSED.

## PRIMARY OBJECTIVE

Implement a real security control plane using:

```text
Firebase Authentication
Cloud Firestore
Firestore Security Rules
Minimal trusted Cloud Functions
Organization/project RBAC
Append-only security audit
```

without migrating canonical project truth and without pretending public static binary files are securely protected.

## CRITICAL RULES

```text
UI GUARD ≠ AUTHORIZATION
AUTH + RBAC ≠ SECURE STATIC FILE DELIVERY
MISSING AUTHORIZATION DATA → DENY
```

## BEFORE CODE

1. Read all prior specs/reports.
2. Run the complete baseline suite.
3. Inventory project/Data Room routes.
4. Inventory current binary asset exposure.
5. Inspect current Firebase configuration.
6. Create threat model.
7. Map work to `T-008-*`.
8. Use Emulator Suite before production.

Start with threat model, Security Domain and Permission Catalog.

Do NOT start with UI.

## IMPLEMENTATION ORDER

```text
Threat Model
→ Security Domain
→ Permission Catalog
→ Authorization Engine
→ Firebase Auth
→ Firestore Control Plane
→ Security Rules
→ Trusted Functions
→ Audit
→ Security Context
→ Existing Module Integration
→ Security UI
→ Sensitive Asset Exclusion
→ E2E / Rules / Threat Verification
```

## PRIVILEGED WRITE RULE

Clients MUST NOT directly modify:

```text
organization roles
project roles
platform role
authoritative audit events
```

Use trusted operations.

## FIRESTORE RULE

Default deny.

No broad authenticated-user blanket allow.

## AUDIT RULE

Successful privileged security changes must append an authoritative audit event.

Client create/update/delete of authoritative audit events:

```text
DENY
```

## DATA ROOM RULE

Confidentiality metadata becomes authorization-aware.

But non-public binaries MUST NOT ship in public `dist/`.

Secure delivery is Phase 009.

## AI RULE

Copilot uses current SecurityContext.

AI cannot decide authorization, grant roles, mutate permissions or load unauthorized project context.

## REQUIRED SECURITY TESTS

Test positive and negative paths.

Mandatory negative cases:

```text
anonymous protected read → DENY
cross-org read → DENY
cross-project read → DENY
self escalation → DENY
viewer role mutation → DENY
client audit create/update/delete → DENY
suspended membership → DENY
revoked membership → DENY
revoked project access → DENY
HIGHLY_CONFIDENTIAL without capability → DENY
```

## REQUIRED STATIC ASSET GATE

```text
INTERNAL binaries exposed:        0
CONFIDENTIAL binaries exposed:    0
HIGHLY_CONFIDENTIAL exposed:      0
```

Any failure:

```text
NOT_READY
```

## REQUIRED E2E

Run and report all 27 mandatory security flows individually.

## FORBIDDEN

Do NOT implement:

```text
Firebase Storage
cloud file upload
signed downloads
secure binary Data Room delivery
public share links
general-purpose backend API
canonical Project Twin migration
canonical Claims/Evidence migration
AI security decisions
AI role assignment
AI canonical auto-write
```

## REQUIRED OUTPUT

Generate:

```text
docs/evidence/PHASE_008_VERIFICATION_REPORT.md
docs/evidence/SPEC_008_TRACEABILITY_MATRIX.md
docs/security/SECURITY_THREAT_MODEL.md
```

Final recommendation only:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

Do NOT mark Phase 008 CLOSED.
Do NOT start Phase 009.

---

# 77. Expected End State

```text
                           VENTURE HUB OS
                                │
                         FIREBASE AUTH
                                │
                                ▼
                         USER IDENTITY
                                │
                                ▼
                          ORGANIZATION
                                │
                                ▼
                           MEMBERSHIP
                                │
                                ▼
                      PROJECT ACCESS ROLE
                                │
                                ▼
                     EFFECTIVE PERMISSIONS
                                │
                   ┌────────────┼────────────┐
                   ▼            ▼            ▼
              PROJECT       DATA ROOM      COPILOT
                CORE         METADATA
                   │            │            │
                   └────────────┼────────────┘
                                ▼
                      TRUSTED SECURITY OPS
                                │
                                ▼
                          APPEND-ONLY AUDIT
```

After Phase 008:

```text
Authentication                      ✅
Organization Isolation              ✅
Project RBAC                        ✅
Firestore Security Rules            ✅
Trusted Security Operations         ✅
Security Audit                      ✅
Confidentiality Authorization       ✅
Sensitive Static Asset Exclusion    ✅

Secure Binary Storage               ❌ Phase 009
Signed Secure Downloads             ❌ Phase 009
External Data Room Sharing          ❌ Phase 009
```

---

# 78. Exit Decision

If every mandatory gate passes:

> **Apruebo formalmente VHOS-PHASE-008 — Security, Authentication, RBAC & Audit bajo SPEC-008 como VERIFIED/CLOSED y autorizo el inicio de VHOS-PHASE-009 — Secure Storage & Controlled Data Room Sharing, manteniendo la arquitectura Feature-Oriented Hexagonal, el aislamiento multi-tenant, la autorización fail-closed, la administración privilegiada mediante operaciones confiables, la auditoría append-only y la separación estricta entre el control de acceso y el almacenamiento seguro de archivos.**
