# Venture Hub OS — Phase 010: Organization & Project Administration

**Document ID:** `VHOS-PHASE-010`  
**Specification:** `SPEC-010 — Organization & Project Administration`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-009 — Secure Storage & Controlled Data Room Sharing`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Security Control Plane:** Firebase Auth + Firestore + Security Rules + Trusted Functions  
**Private Binary Plane:** Firebase Storage + Storage Security Rules  
**Canonical Venture Truth:** Project Twin remains canonical  
**AI Canonical Auto-Write:** FORBIDDEN  
**Primary Objective:** Convert Venture Hub OS from a secure functional platform into a fully administrable multi-tenant operating system for organizations and projects  
**Recommended Next Phase:** `VHOS-PHASE-011 — Production Hardening, Observability & Deployment`

---

# 1. Executive Purpose

Phases 001–009 established the functional and security backbone of Venture Hub OS:

```text
Project Twin
Narrative Engine
Claims & Evidence
Presentation Engine
Presenter Cockpit
AI Copilot
Due Diligence Data Room
Authentication / RBAC / Audit
Secure Storage / Controlled Sharing
```

Phase 010 SHALL add the administrative operating layer required to manage the platform as a real product.

The central operating model becomes:

```text
PLATFORM
   │
   ▼
ORGANIZATION
   │
   ├── MEMBERS
   ├── SETTINGS
   ├── PROJECTS
   ├── USAGE
   ├── AUDIT
   └── HEALTH
            │
            ▼
          PROJECT
            │
            ├── OWNER
            ├── TEAM
            ├── STATUS
            ├── SETTINGS
            ├── ACCESS
            ├── STORAGE
            ├── SECURITY
            └── MODULES
```

The goal is to answer:

```text
Who owns this organization?
Who administers it?
Which projects exist?
Who owns each project?
Which project is active?
What is each project's lifecycle state?
Who may access each project?
How much storage is used?
Which modules are enabled?
What is the operational health?
What changed administratively?
```

---

# 2. Governing Principle

Administration SHALL orchestrate existing domains.

Administration SHALL NOT become a second source of truth.

Required invariant:

```text
ADMINISTRATION
      ↓
coordinates
      ↓
Security / Project / Storage / Audit

but does NOT replace:
Project Twin
Claims
Evidence
NarrativePlan
PresentationDefinition
```

---

# 3. Core Administrative Domains

Phase 010 introduces or formalizes:

```text
PlatformAdministration
OrganizationAdministration
ProjectAdministration
MembershipAdministration
ProjectLifecycle
ProjectSettings
OrganizationSettings
UsageReadModels
OperationalHealth
AdministrativeAudit
```

---

# 4. Non-Goals

Phase 010 SHALL NOT implement:

```text
Billing
Subscriptions
Invoices
Payments
Seat-based licensing
Public project marketplace
Anonymous organizations
Anonymous projects
Cross-tenant project transfer without explicit trusted operation
Canonical Project Twin migration
Canonical Claims/Evidence migration
Document editing
Realtime collaborative editing
Advanced analytics warehouse
Production alerting system
External monitoring provider integration
General-purpose backend API
```

These require separate authorization/change requests.

---

# 5. Administration Architecture

Create:

```text
src/modules/administration/
```

Recommended:

```text
src/modules/administration/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── policies/
│   ├── services/
│   ├── ports/
│   ├── events/
│   └── errors/
│
├── application/
│   ├── commands/
│   ├── queries/
│   └── use-cases/
│
├── adapters/
│   ├── firestore/
│   ├── security/
│   ├── storage/
│   ├── audit/
│   └── test/
│
└── tests/
```

UI:

```text
src/ui/administration/
```

---

# 6. Dependency Direction

Preserve:

```text
UI
 ↓
Application
 ↓
Domain
```

Administration domain MUST NOT import:

```text
Firebase SDK
Firestore SDK
Storage SDK
DOM
browser APIs
UI
AI adapters
Cloud Functions SDK
```

---

# 7. Organization Administrative Record

Phase 008 already introduced `Organization`.

Phase 010 SHALL extend administration around it without replacing it.

Recommended admin read model:

```ts
interface OrganizationAdministrationRecord {
  organizationId: string;

  name: string;
  slug: string;

  status: OrganizationStatus;

  ownerUserId: string;

  memberCount: number;
  activeProjectCount: number;
  archivedProjectCount: number;

  storageUsageBytes: number;

  createdAt: string;
  updatedAt: string;
}
```

---

# 8. Organization Status

Reuse:

```text
ACTIVE
SUSPENDED
ARCHIVED
```

Administrative transitions SHALL be trusted operations.

---

# 9. Organization Administrative Actions

Required:

```text
CreateOrganization
RenameOrganization
UpdateOrganizationSettings
SuspendOrganization
ReactivateOrganization
ArchiveOrganization
TransferOrganizationOwnership
```

If `TransferOrganizationOwnership` was not implemented in Phase 008, it becomes mandatory here.

---

# 10. Organization Ownership Invariant

Every non-archived organization SHALL have exactly one effective owner.

Required:

```text
one ORG_OWNER
```

If multiple owners are technically allowed by prior model, Phase 010 SHALL define one canonical `ownerUserId` administrative owner while retaining role assignments as security capabilities.

---

# 11. Last Owner Protection

Required:

```text
last owner cannot be removed
last owner cannot be suspended
last owner cannot be downgraded
```

until ownership transfer succeeds.

---

# 12. OrganizationSettings

Create:

```ts
interface OrganizationSettings {
  organizationId: string;

  displayName: string;
  defaultLanguage: string;
  timezone: string;

  defaultProjectRole?: ProjectRole;

  invitePolicy: InvitePolicy;

  dataRoomDefaultConfidentiality: ConfidentialityLevel;

  updatedAt: string;
  updatedBy: string;
}
```

---

# 13. InvitePolicy

Required:

```text
ADMINS_ONLY
OWNERS_ONLY
```

Optional future:

```text
MEMBERS_ALLOWED
```

Not required by default.

---

# 14. Project Administrative Record

Required:

```ts
interface ProjectAdministrationRecord {
  projectId: string;
  organizationId: string;

  name: string;
  slug: string;

  status: ProjectLifecycleStatus;

  ownerUserId: string;

  projectTwinId?: string;

  createdAt: string;
  createdBy: string;

  updatedAt: string;
  updatedBy: string;

  archivedAt?: string;
  archivedBy?: string;
}
```

---

# 15. ProjectLifecycleStatus

Required:

```text
DRAFT
ACTIVE
PAUSED
ARCHIVED
```

Do NOT reuse the full Project Twin business status blindly if semantics differ.

Administrative lifecycle and venture maturity remain separate concepts.

---

# 16. Project Lifecycle Rule

Administrative lifecycle controls platform availability.

Project Twin business status controls venture state.

Required distinction:

```text
ProjectAdministration.status = ARCHIVED
```

does NOT mutate:

```text
ProjectTwin.status
```

---

# 17. Project Creation

Required trusted flow:

```text
CreateProject
      ↓
validate organization
      ↓
validate permission
      ↓
create project security record
      ↓
create project admin record
      ↓
assign owner/admin access
      ↓
initialize governed project structure
      ↓
audit
```

---

# 18. CreateProject Invariant

Project creation SHALL NOT fabricate venture content.

Initial Project Twin may be:

```text
empty governed structure
```

with sections `EMPTY`.

---

# 19. Project Ownership

Every active/draft project SHALL have one administrative owner.

Required:

```text
ownerUserId
```

Owner must be an active organization member.

---

# 20. TransferProjectOwnership

Required trusted command.

Must verify:

```text
caller authorized
target user active
target user belongs to organization
target has or receives project access
same organization
```

Emit audit.

---

# 21. Project Archive

Archive SHALL:

```text
ProjectAdministration.status → ARCHIVED
```

and deny normal editing.

Read-only historical access MAY remain for authorized admins/reviewers.

Archive SHALL NOT delete Project Twin or evidence.

---

# 22. Project Reactivation

Required:

```text
ARCHIVED → ACTIVE
```

only by authorized admin/owner.

Audit required.

---

# 23. Project Pause

Required:

```text
ACTIVE → PAUSED
```

Policy:

- read access may continue;
- editing/generation/write operations denied;
- administration remains available.

---

# 24. Project Status Transition Policy

Allowed transitions:

```text
DRAFT → ACTIVE
DRAFT → ARCHIVED

ACTIVE → PAUSED
ACTIVE → ARCHIVED

PAUSED → ACTIVE
PAUSED → ARCHIVED

ARCHIVED → ACTIVE
```

Any unsupported transition:

```text
DENY
```

---

# 25. ProjectSettings

Create:

```ts
interface ProjectSettings {
  organizationId: string;
  projectId: string;

  displayName: string;
  defaultLanguage: string;

  defaultNarrativeAudience?: string;
  defaultNarrativeDuration?: string;

  dataRoomEnabled: boolean;
  copilotEnabled: boolean;
  presenterEnabled: boolean;

  updatedAt: string;
  updatedBy: string;
}
```

---

# 26. Module Enablement

Phase 010 MAY expose module enable/disable administrative flags.

Required modules:

```text
DATA_ROOM
COPILOT
PRESENTER
```

Optional:

```text
PRESENTATION
```

Disabling a module affects UI/application availability.

It SHALL NOT delete module data.

---

# 27. ModuleEnablement Policy

Required:

```text
disabled module
→ deny feature use
→ preserve data
```

---

# 28. Project Switcher

Required UI capability:

```text
Organization
  ↓
Accessible Projects
  ↓
Current Project
```

Switching project SHALL rebuild:

```text
SecurityContext
AdministrativeContext
Project context
```

---

# 29. Current Project State

Do NOT persist current project as an authoritative security field.

It is session/navigation state.

---

# 30. Organization Switcher

Reuse Phase 008 organization switching.

Phase 010 SHALL integrate:

```text
Organization → Projects
```

and prevent stale project context after org switch.

---

# 31. Membership Administration

Required admin view:

```text
Member
Email
Organization Role
Membership Status
Project Access Count
Joined / Created
Last Administrative Change
```

---

# 32. Member Actions

Required:

```text
Add member
Change org role
Suspend member
Reactivate member
Revoke member
Inspect project access
```

---

# 33. ReactivateOrganizationMember

If Phase 008 does not provide explicit reactivation, add it.

Required transition:

```text
SUSPENDED → ACTIVE
```

---

# 34. Membership Transition Policy

Allowed:

```text
INVITED → ACTIVE
ACTIVE → SUSPENDED
ACTIVE → REVOKED
SUSPENDED → ACTIVE
SUSPENDED → REVOKED
```

REVOKED is terminal in Phase 010.

---

# 35. Project Access Administration

Required view:

```text
Project
User
Role
Status
Granted By
Granted At
```

Actions:

```text
Grant
Change Role
Suspend
Reactivate
Revoke
```

---

# 36. ReactivateProjectAccess

Required if not already present.

Allowed:

```text
SUSPENDED → ACTIVE
```

REVOKED remains terminal.

---

# 37. Administrative Permission Catalog Extension

Upgrade from:

```text
1.1
```

to:

```text
1.2
```

Add:

```text
organization.update_settings
organization.suspend
organization.archive
organization.transfer_ownership

projects.create
projects.update_settings
projects.pause
projects.archive
projects.reactivate
projects.transfer_ownership

usage.read
platform_health.read
```

Avoid renaming prior permissions unless migration is documented.

---

# 38. Role Mapping

Recommended:

## ORG_OWNER

All organization administration permissions.

## ORG_ADMIN

All except:

```text
organization.transfer_ownership
```

unless explicitly allowed.

## ORG_MEMBER

No organization lifecycle administration.

## PROJECT_ADMIN

Project settings/lifecycle/access as allowed.

---

# 39. Platform Administration

Create a limited platform-level read model.

Required:

```ts
interface PlatformAdministrationSummary {
  organizations: number;
  activeOrganizations: number;
  projects: number;
  activeProjects: number;
  users: number;
  storageBytes: number;
}
```

Only `PLATFORM_ADMIN` may access.

---

# 40. Platform Admin Scope

Phase 010 SHALL NOT create broad support impersonation.

Platform admin access remains explicit and auditable.

---

# 41. Usage Read Models

Required:

```text
OrganizationUsage
ProjectUsage
```

---

# 42. OrganizationUsage

Recommended:

```ts
interface OrganizationUsage {
  organizationId: string;

  activeMembers: number;
  suspendedMembers: number;

  activeProjects: number;
  archivedProjects: number;

  storageBytes: number;
  fileCount: number;
  fileVersionCount: number;

  activeShareGrants: number;
}
```

---

# 43. ProjectUsage

Recommended:

```ts
interface ProjectUsage {
  organizationId: string;
  projectId: string;

  memberCount: number;

  storageBytes: number;
  fileCount: number;
  fileVersionCount: number;

  activeShareGrants: number;

  claimsCount?: number;
  evidenceCount?: number;
  presentationsCount?: number;
}
```

Counts MUST be derived/read-model data, not duplicate canonical content.

---

# 44. Usage Accuracy

Usage metrics SHALL be explainable counts/sums.

No opaque score.

---

# 45. Storage Usage

Integrate Phase 009 FileRecords/FileVersions.

Required:

```text
total current bytes
total version bytes
file count
version count
```

Exact policy must be documented.

---

# 46. Operational Health

Create read-only:

```text
OperationalHealthSummary
```

---

# 47. Health Dimensions

Required:

```text
AUTH
FIRESTORE
STORAGE
FUNCTIONS
PROJECT_DATA
DATA_ROOM
AUDIT
```

---

# 48. HealthStatus

Required:

```text
HEALTHY
DEGRADED
UNAVAILABLE
UNKNOWN
```

---

# 49. Health Semantics

Health is operational/read-only.

Do NOT use health status to mutate canonical business data.

---

# 50. Health Evidence

In Phase 010, health MAY come from:

```text
adapter connectivity checks
known repository access
configuration presence
last successful operation metadata
```

Full production monitoring belongs to Phase 011.

---

# 51. Administrative Dashboard

Required dashboard:

```text
Organization Summary
Projects
Members
Storage Usage
Security
Audit
Health
```

---

# 52. Project Administration Dashboard

Required:

```text
Project identity
Lifecycle
Owner
Members/access
Settings
Enabled modules
Storage usage
Audit
Health
```

---

# 53. Organization Administration Dashboard

Required:

```text
Organization identity
Status
Owner
Members
Projects
Usage
Settings
Audit
Health
```

---

# 54. Audit Integration

Administrative changes SHALL emit authoritative security/admin audit events.

Required new events:

```text
ORGANIZATION_RENAMED
ORGANIZATION_SETTINGS_UPDATED
ORGANIZATION_SUSPENDED
ORGANIZATION_REACTIVATED
ORGANIZATION_ARCHIVED
ORGANIZATION_OWNERSHIP_TRANSFERRED

PROJECT_CREATED
PROJECT_SETTINGS_UPDATED
PROJECT_PAUSED
PROJECT_REACTIVATED
PROJECT_ARCHIVED
PROJECT_OWNERSHIP_TRANSFERRED

MEMBER_REACTIVATED
PROJECT_ACCESS_REACTIVATED
```

---

# 55. Audit Mutation Policy

Preserve:

```text
client CREATE audit = DENY
client UPDATE audit = DENY
client DELETE audit = DENY
trusted append = ALLOW
```

---

# 56. Administrative Command Boundary

Privileged lifecycle commands SHALL use trusted functions.

Required trusted commands:

```text
RenameOrganization
UpdateOrganizationSettings
SuspendOrganization
ReactivateOrganization
ArchiveOrganization
TransferOrganizationOwnership

CreateProject
UpdateProjectSettings
PauseProject
ReactivateProject
ArchiveProject
TransferProjectOwnership

ReactivateOrganizationMember
ReactivateProjectAccess
```

---

# 57. Organization Suspension

If organization is suspended:

```text
normal project access → DENY
admin recovery operations → limited ALLOW
```

Exact recovery policy must be documented.

---

# 58. Organization Archive

If organization is archived:

```text
normal user operations → DENY
platform admin / authorized owner read-only admin → ALLOW as policy defines
```

No destructive deletion.

---

# 59. Organization Reactivation

Required:

```text
SUSPENDED → ACTIVE
```

Archive reactivation may require explicit policy.

Recommended:

```text
ARCHIVED → ACTIVE
```

allowed only to ORG_OWNER / PLATFORM_ADMIN.

---

# 60. Project Creation Security

Required:

```text
projects.create
```

Organization must be:

```text
ACTIVE
```

Creator must have valid active membership.

---

# 61. Project Slug Uniqueness

Required within organization.

```text
organizationId + projectSlug
```

must be unique.

---

# 62. Organization Slug Uniqueness

Required platform-wide unless existing architecture scopes otherwise.

---

# 63. Naming Validation

Names/slugs SHALL have deterministic validation.

No HTML injection.

---

# 64. Project Initialization

CreateProject SHALL initialize:

```text
ProjectAdministrationRecord
SecuredProjectRecord
owner ProjectAccessAssignment
ProjectSettings
Project Twin shell/reference
```

No fake venture facts.

---

# 65. Initial Project Owner Access

Owner receives:

```text
PROJECT_ADMIN
```

at minimum.

---

# 66. Administrative Context

Create:

```ts
interface AdministrativeContext {
  organizationId: string;
  projectId?: string;

  organizationStatus: OrganizationStatus;
  projectStatus?: ProjectLifecycleStatus;

  currentUserId: string;
}
```

---

# 67. Administrative Authorization

Administration SHALL reuse Phase 008 AuthorizationService where possible.

Do NOT create independent security logic.

---

# 68. Lifecycle Authorization Layer

Create deterministic:

```text
LifecyclePolicy
```

Inputs:

```text
organization status
project status
requested action
permissions
```

Output:

```text
ALLOW / DENY + reason
```

---

# 69. LifecycleReasonCode

Required:

```text
ALLOW

ORGANIZATION_SUSPENDED
ORGANIZATION_ARCHIVED

PROJECT_DRAFT
PROJECT_PAUSED
PROJECT_ARCHIVED

INVALID_TRANSITION
PERMISSION_MISSING
OWNER_PROTECTION
TARGET_USER_INACTIVE
TARGET_USER_OUTSIDE_ORGANIZATION
```

---

# 70. Write Protection for Paused Projects

When:

```text
project status = PAUSED
```

deny:

```text
Project Twin edit
Claim edit
Evidence manage
Narrative generate
Presentation generate
File upload
Share grant create
```

Read may remain allowed.

---

# 71. Write Protection for Archived Projects

When:

```text
ARCHIVED
```

deny normal writes.

Read-only historical access may remain.

---

# 72. AI Copilot Lifecycle Integration

Copilot on PAUSED/ARCHIVED projects:

```text
read-only analysis may be allowed
canonical mutation already forbidden
```

If generation is considered a project operation, policy SHALL explicitly decide.

Recommended:

```text
PAUSED: copilot.use READ-ONLY allowed
ARCHIVED: copilot.use denied by default
```

---

# 73. Presenter Lifecycle Integration

Archived project presentation playback MAY remain allowed to authorized users.

Editing/generating new presentation remains denied.

---

# 74. Data Room Lifecycle Integration

Paused:

```text
read allowed
upload/share mutation denied
```

Archived:

```text
read-only allowed to authorized admin/reviewer
upload/share mutation denied
```

---

# 75. Administrative Read Models

Required ports:

```text
OrganizationAdministrationRepository
ProjectAdministrationRepository
OrganizationSettingsRepository
ProjectSettingsRepository
UsageReadRepository
OperationalHealthPort
```

---

# 76. Firestore Paths

Recommended:

```text
organizations/{organizationId}/admin/profile
organizations/{organizationId}/admin/settings
organizations/{organizationId}/admin/usage

organizations/{organizationId}/projects/{projectId}/admin/profile
organizations/{organizationId}/projects/{projectId}/admin/settings
organizations/{organizationId}/projects/{projectId}/admin/usage
```

Equivalent structure acceptable if tenant isolation remains clear.

---

# 77. Firestore Rules

Administrative metadata SHALL remain protected.

Required:

```text
read by authorized org/project users
writes denied directly when privileged
trusted functions for lifecycle mutations
default deny
```

---

# 78. Direct Client Write Policy

Clients SHALL NOT directly:

```text
change organization status
change organization owner
archive organization
change project lifecycle
change project owner
```

---

# 79. Settings Direct Write

Low-risk settings MAY be direct client writes only if Firestore Rules can enforce every invariant.

Preferred:

```text
trusted command for administration settings
```

for simplicity/audit consistency.

---

# 80. Platform Health Port

Create:

```ts
interface PlatformHealthPort {
  checkAuth(): Promise<HealthCheck>;
  checkFirestore(): Promise<HealthCheck>;
  checkStorage(): Promise<HealthCheck>;
  checkFunctions(): Promise<HealthCheck>;
}
```

---

# 81. HealthCheck

Required:

```ts
interface HealthCheck {
  component: string;
  status: HealthStatus;
  checkedAt: string;
  detailCode?: string;
}
```

No secrets or stack traces in normal UI.

---

# 82. Platform Health UI

Only authorized admin sees:

```text
Auth
Firestore
Storage
Functions
Audit
Project Data
```

---

# 83. Error Detail Policy

User-facing health errors SHALL not expose:

```text
tokens
service credentials
internal stack traces
private paths
```

---

# 84. Admin Search

Required:

```text
search organizations (platform admin)
search projects within organization
search members within organization
```

No cross-tenant leakage.

---

# 85. Project List Filters

Required:

```text
Status
Owner
Created date
```

Recommended:

```text
Storage usage
```

---

# 86. Member List Filters

Required:

```text
Organization role
Membership status
```

---

# 87. Administrative Pagination

For potentially growing lists:

```text
projects
members
audit
```

support deterministic pagination.

---

# 88. Sort Stability

Sorts SHALL be deterministic.

Example:

```text
updatedAt DESC
id ASC tie-breaker
```

---

# 89. Audit Filters

Required:

```text
actor
event type
project
date
```

---

# 90. Usage Refresh

Usage may be recomputed/read on demand.

No need for real-time analytics pipeline.

---

# 91. No Hidden Admin Privilege

UI SHALL not unlock capabilities solely based on route.

Authorization remains explicit.

---

# 92. Administrative UI

Create:

```text
src/ui/administration/
```

Minimum:

```text
platform-admin.page.ts
organization-admin.page.ts
organization-settings.component.ts
organization-members.component.ts
organization-projects.component.ts

project-admin.page.ts
project-settings.component.ts
project-lifecycle.component.ts
project-owner.component.ts
project-access-admin.component.ts

usage-summary.component.ts
operational-health.component.ts
admin-audit.component.ts
```

---

# 93. Platform Admin UI

Required:

```text
Organization List
Organization Detail
Platform Summary
Health
```

No arbitrary impersonation.

---

# 94. Organization Admin UI

Required actions:

```text
Rename
Settings
Suspend/Reactivate
Archive
Transfer Ownership
Member Management
Project Management
```

subject to permission.

---

# 95. Project Admin UI

Required actions:

```text
Rename
Settings
Pause/Reactivate
Archive
Transfer Ownership
Access
Usage
```

---

# 96. Dangerous Action UX

Operations:

```text
Archive Organization
Suspend Organization
Archive Project
Transfer Ownership
Revoke Member
```

require explicit confirmation.

---

# 97. Confirmation Requirement

UI confirmation does not replace trusted command validation.

---

# 98. Ownership Transfer UX

Must display:

```text
Current owner
New owner
Organization/project
Impact summary
```

Then explicit confirm.

---

# 99. Archive UX

Archive SHALL explain:

```text
data preserved
normal writes disabled
historical read access policy
```

---

# 100. Usage Dashboard

Required:

```text
Members
Projects
Files
Storage bytes
File versions
Active shares
```

---

# 101. No Billing Labels

Usage values SHALL NOT be presented as billing unless billing phase exists.

---

# 102. Administrative Health Banner

If component DEGRADED/UNAVAILABLE:

```text
show admin warning
```

Do not mutate project data.

---

# 103. Arcana Administration Pilot

Arcana remains pilot project.

Required scenarios:

```text
Organization = org-arcana
Project = arcana
```

Demonstrate:

```text
organization administration
project administration
ownership
project pause
project reactivate
project archive/read-only behavior
settings
usage
health
audit
```

---

# 104. Arcana Pilot Owner

Use an existing seeded admin/owner test identity.

Do not fabricate production identities.

---

# 105. Arcana Usage

Report:

```text
members
project access assignments
FileRecords = 7
FileVersions >= 7
storage bytes = exact secure storage total
active share grants
claims/evidence counts if available
```

---

# 106. Arcana Pause Test

Required:

```text
Project ACTIVE
→ PAUSE

read Project Twin          ALLOW
edit Project Twin          DENY
upload file                DENY
create share grant         DENY

→ REACTIVATE

edit allowed again according to permission
```

---

# 107. Arcana Archive Test

Required:

```text
Project ACTIVE/PAUSED
→ ARCHIVE

historical read            ALLOW (authorized)
normal write               DENY
secure file read           ALLOW if policy permits
upload                      DENY
share mutation             DENY
```

---

# 108. Arcana Owner Transfer Test

Required:

```text
owner A
→ transfer to active member B

ownerUserId = B
B has required admin access
A no longer canonical owner
audit emitted
```

---

# 109. Workstreams

## WS-010-01 — Administration Domain
Organization/project admin models and policies.

## WS-010-02 — Permission Catalog 1.2
Admin permissions.

## WS-010-03 — Organization Administration
Lifecycle, settings, ownership.

## WS-010-04 — Project Administration
Creation, lifecycle, settings, ownership.

## WS-010-05 — Membership / Access Administration
Reactivation and centralized views.

## WS-010-06 — Usage
Organization/project usage read models.

## WS-010-07 — Operational Health
Read-only health aggregation.

## WS-010-08 — Audit
Administrative events and filters.

## WS-010-09 — UI
Platform/org/project admin consoles.

## WS-010-10 — Existing Module Lifecycle Integration
Pause/archive enforcement across modules.

## WS-010-11 — Arcana Pilot
End-to-end administrative flows.

## WS-010-12 — Verification
Domain/rules/functions/E2E/visual/regressions.

---

# 110. Task Breakdown — Domain

### T-010-001
Create OrganizationAdministrationRecord.

### T-010-002
Create OrganizationSettings.

### T-010-003
Create InvitePolicy.

### T-010-004
Create ProjectAdministrationRecord.

### T-010-005
Create ProjectLifecycleStatus.

### T-010-006
Create ProjectSettings.

### T-010-007
Create ModuleEnablement policy.

### T-010-008
Create AdministrativeContext.

### T-010-009
Create LifecyclePolicy.

### T-010-010
Create LifecycleReasonCode.

### T-010-011
Create OrganizationUsage.

### T-010-012
Create ProjectUsage.

### T-010-013
Create OperationalHealthSummary.

### T-010-014
Create HealthStatus.

### T-010-015
Create HealthCheck.

---

# 111. Task Breakdown — Permission Catalog

### T-010-101
Upgrade catalog 1.1 → 1.2.

### T-010-102
Add organization update settings permission.

### T-010-103
Add organization suspend permission.

### T-010-104
Add organization archive permission.

### T-010-105
Add organization transfer ownership permission.

### T-010-106
Add project create permission.

### T-010-107
Add project update settings permission.

### T-010-108
Add project pause permission.

### T-010-109
Add project archive permission.

### T-010-110
Add project reactivate permission.

### T-010-111
Add project transfer ownership permission.

### T-010-112
Add usage.read.

### T-010-113
Add platform_health.read.

### T-010-114
Update role mappings.

### T-010-115
Document permission migration.

---

# 112. Task Breakdown — Organization Administration

### T-010-201
Create RenameOrganization command.

### T-010-202
Create UpdateOrganizationSettings command.

### T-010-203
Create SuspendOrganization command.

### T-010-204
Create ReactivateOrganization command.

### T-010-205
Create ArchiveOrganization command.

### T-010-206
Create TransferOrganizationOwnership command.

### T-010-207
Implement last-owner protection.

### T-010-208
Implement organization lifecycle policy.

### T-010-209
Emit organization audit events.

---

# 113. Task Breakdown — Project Administration

### T-010-301
Create CreateProject command.

### T-010-302
Initialize project admin record.

### T-010-303
Initialize security record/access.

### T-010-304
Initialize Project Twin shell/reference.

### T-010-305
Create UpdateProjectSettings command.

### T-010-306
Create PauseProject command.

### T-010-307
Create ReactivateProject command.

### T-010-308
Create ArchiveProject command.

### T-010-309
Create TransferProjectOwnership command.

### T-010-310
Implement slug uniqueness.

### T-010-311
Implement project lifecycle transitions.

### T-010-312
Emit project audit events.

---

# 114. Task Breakdown — Membership / Access

### T-010-401
Create ReactivateOrganizationMember command.

### T-010-402
Create ReactivateProjectAccess command.

### T-010-403
Create centralized member listing.

### T-010-404
Create member project-access inspection.

### T-010-405
Create centralized project access listing.

### T-010-406
Implement membership transition policy.

### T-010-407
Implement project-access transition policy.

---

# 115. Task Breakdown — Usage

### T-010-501
Create GetOrganizationUsage.

### T-010-502
Create GetProjectUsage.

### T-010-503
Aggregate secure storage bytes.

### T-010-504
Aggregate FileRecords.

### T-010-505
Aggregate FileVersions.

### T-010-506
Aggregate active share grants.

### T-010-507
Aggregate project/member counts.

### T-010-508
Validate no canonical duplication.

---

# 116. Task Breakdown — Health

### T-010-601
Create PlatformHealthPort.

### T-010-602
Create FirebasePlatformHealthAdapter.

### T-010-603
Check Auth.

### T-010-604
Check Firestore.

### T-010-605
Check Storage.

### T-010-606
Check Functions.

### T-010-607
Create administration health read model.

### T-010-608
Sanitize health errors.

---

# 117. Task Breakdown — UI

### T-010-701
Create platform admin page.

### T-010-702
Create organization admin page.

### T-010-703
Create project admin page.

### T-010-704
Create organization settings UI.

### T-010-705
Create project settings UI.

### T-010-706
Create organization member admin UI.

### T-010-707
Create organization project list.

### T-010-708
Create project access admin UI.

### T-010-709
Create organization lifecycle UI.

### T-010-710
Create project lifecycle UI.

### T-010-711
Create ownership transfer UI.

### T-010-712
Create usage summary UI.

### T-010-713
Create health UI.

### T-010-714
Create admin audit UI.

### T-010-715
Create mobile admin UI.

---

# 118. Task Breakdown — Lifecycle Integration

### T-010-801
Integrate Project Twin write policy.

### T-010-802
Integrate Claims write policy.

### T-010-803
Integrate Evidence write policy.

### T-010-804
Integrate Narrative generation policy.

### T-010-805
Integrate Presentation generation policy.

### T-010-806
Integrate Presenter policy.

### T-010-807
Integrate Copilot policy.

### T-010-808
Integrate Data Room mutation policy.

### T-010-809
Integrate Secure Storage upload policy.

### T-010-810
Integrate ShareGrant mutation policy.

---

# 119. Task Breakdown — Audit

### T-010-901
Add organization admin audit events.

### T-010-902
Add project admin audit events.

### T-010-903
Add reactivation audit events.

### T-010-904
Add ownership transfer audit.

### T-010-905
Create audit filters.

### T-010-906
Verify append-only invariants.

---

# 120. Task Breakdown — Arcana Pilot

### T-010-1001
Configure org-arcana administration fixture.

### T-010-1002
Configure Arcana project administration fixture.

### T-010-1003
Verify organization summary.

### T-010-1004
Verify member administration.

### T-010-1005
Verify project settings.

### T-010-1006
Verify project pause.

### T-010-1007
Verify paused write denial.

### T-010-1008
Verify project reactivation.

### T-010-1009
Verify project archive.

### T-010-1010
Verify archived read-only behavior.

### T-010-1011
Verify owner transfer.

### T-010-1012
Verify usage metrics.

### T-010-1013
Verify health summary.

### T-010-1014
Verify audit events.

### T-010-1015
Create Arcana Administration Pilot Report.

---

# 121. Task Breakdown — Tests

### T-010-1101
Test OrganizationAdministrationRecord invariants.

### T-010-1102
Test OrganizationSettings invariants.

### T-010-1103
Test ProjectAdministrationRecord invariants.

### T-010-1104
Test ProjectSettings invariants.

### T-010-1105
Test LifecyclePolicy.

### T-010-1106
Test valid project transitions.

### T-010-1107
Test invalid project transitions DENY.

### T-010-1108
Test last owner protection.

### T-010-1109
Test ownership transfer.

### T-010-1110
Test target owner inactive DENY.

### T-010-1111
Test target owner cross-org DENY.

### T-010-1112
Test project slug uniqueness.

### T-010-1113
Test organization status enforcement.

### T-010-1114
Test project PAUSED read/write policy.

### T-010-1115
Test project ARCHIVED read/write policy.

### T-010-1116
Test module disable behavior.

### T-010-1117
Test organization usage calculations.

### T-010-1118
Test project usage calculations.

### T-010-1119
Test storage usage exactness.

### T-010-1120
Test health summary.

### T-010-1121
Test health error sanitization.

### T-010-1122
Test trusted organization commands.

### T-010-1123
Test trusted project commands.

### T-010-1124
Test membership reactivation.

### T-010-1125
Test project access reactivation.

### T-010-1126
Test organization archive access.

### T-010-1127
Test organization suspend access.

### T-010-1128
Test Project Twin write integration.

### T-010-1129
Test Claims write integration.

### T-010-1130
Test Evidence write integration.

### T-010-1131
Test Narrative generation integration.

### T-010-1132
Test Presentation generation integration.

### T-010-1133
Test Copilot lifecycle integration.

### T-010-1134
Test Data Room lifecycle integration.

### T-010-1135
Test Storage lifecycle integration.

### T-010-1136
Test ShareGrant lifecycle integration.

### T-010-1137
Test admin audit events.

### T-010-1138
Test audit append-only.

### T-010-1139
Test Arcana pause.

### T-010-1140
Test Arcana reactivate.

### T-010-1141
Test Arcana archive.

### T-010-1142
Test Arcana ownership transfer.

### T-010-1143
Test Arcana usage.

### T-010-1144
Test Arcana health.

### T-010-1145
Run Firestore rules tests.

### T-010-1146
Run Functions emulator tests.

### T-010-1147
Run architecture tests.

### T-010-1148
Run secret scan.

### T-010-1149
Run browser runtime gate.

### T-010-1150
Run Phase 009 regression.

### T-010-1151
Run Phase 008 regression.

### T-010-1152
Run Phase 007 regression.

### T-010-1153
Run Phase 006 regression.

### T-010-1154
Run Phase 005 regression.

### T-010-1155
Run Phase 004 regression.

### T-010-1156
Run Phase 003 regression.

### T-010-1157
Run Phase 002 regression.

### T-010-1158
Run Phase 001 regression.

### T-010-1159
Run Phase 000A regression.

### T-010-1160
Run Phase 0 legacy preservation.

---

# 122. Threat Model Extension

Extend security threat model with:

```text
T-31 Unauthorized Organization Administration
T-32 Unauthorized Project Creation
T-33 Last Owner Removal / Organization Orphaning
T-34 Cross-Organization Ownership Transfer
T-35 Unauthorized Project Ownership Transfer
T-36 Invalid Project Lifecycle Transition
T-37 Paused Project Write Bypass
T-38 Archived Project Write Bypass
T-39 Module Disable Bypass
T-40 Usage Cross-Tenant Leakage
T-41 Health Diagnostic Secret Leakage
T-42 Platform Admin Cross-Tenant Abuse
T-43 Administrative Audit Mutation
T-44 Stale Project Context After Organization Switch
T-45 Project Slug Collision / Tenant Confusion
```

Each requires:

```text
attack path
control
verification
residual risk
```

---

# 123. Acceptance Criteria

## AC-010-001 — Organization Administration
Authorized owners/admins can manage organization settings and lifecycle.

## AC-010-002 — Organization Isolation
No organization admin action crosses tenant boundaries.

## AC-010-003 — Last Owner Protection
Organization cannot become ownerless.

## AC-010-004 — Project Creation
Authorized users can create governed projects without fake canonical content.

## AC-010-005 — Project Ownership
Each project has a valid active owner.

## AC-010-006 — Project Lifecycle
Project status transitions are deterministic and enforced.

## AC-010-007 — Paused Write Protection
Paused project denies normal writes.

## AC-010-008 — Archived Write Protection
Archived project denies normal writes.

## AC-010-009 — Historical Read
Authorized users retain governed read access according to policy.

## AC-010-010 — Membership Reactivation
Suspended membership can be safely reactivated.

## AC-010-011 — Project Access Reactivation
Suspended project access can be safely reactivated.

## AC-010-012 — Usage
Usage counts/sums are accurate and tenant-scoped.

## AC-010-013 — Health
Operational health is read-only, safe, and sanitized.

## AC-010-014 — Audit
Administrative changes produce append-only audit events.

## AC-010-015 — Existing Modules
Existing modules honor organization/project lifecycle.

## AC-010-016 — Canonical Safety
Administrative actions do not rewrite Project Twin facts.

## AC-010-017 — Arcana Pilot
Arcana demonstrates full organization/project administration.

## AC-010-018 — Regression
All prior phases remain passing.

---

# 124. Mandatory Domain / Policy Matrix

Required explicit tests:

```text
Organization invariant                         PASS
Organization settings invariant                PASS
Project administration invariant               PASS
Project settings invariant                     PASS

DRAFT → ACTIVE                                 ALLOW PASS
ACTIVE → PAUSED                                ALLOW PASS
PAUSED → ACTIVE                                ALLOW PASS
ACTIVE → ARCHIVED                              ALLOW PASS
PAUSED → ARCHIVED                              ALLOW PASS
ARCHIVED → ACTIVE                              ALLOW PASS

Invalid transition                             DENY PASS

Last owner remove                              DENY PASS
Last owner suspend                             DENY PASS
Last owner downgrade                           DENY PASS

Valid org ownership transfer                   PASS
Cross-org ownership transfer                   DENY PASS

Valid project ownership transfer               PASS
Inactive target owner                          DENY PASS
Cross-org target owner                         DENY PASS

Paused project read                            ALLOW PASS
Paused Project Twin edit                       DENY PASS
Paused upload                                  DENY PASS
Paused share create                            DENY PASS

Archived project historical read               ALLOW PASS
Archived normal write                          DENY PASS
Archived upload                                DENY PASS
Archived share mutation                        DENY PASS

Disabled module access                         DENY PASS
```

---

# 125. Mandatory Trusted Command Matrix

Required commands:

```text
RenameOrganization
UpdateOrganizationSettings
SuspendOrganization
ReactivateOrganization
ArchiveOrganization
TransferOrganizationOwnership

CreateProject
UpdateProjectSettings
PauseProject
ReactivateProject
ArchiveProject
TransferProjectOwnership

ReactivateOrganizationMember
ReactivateProjectAccess
```

For each applicable command:

```text
Authorized caller       ALLOW PASS
Unauthorized caller     DENY PASS
Cross-org caller        DENY PASS
Invalid target          DENY PASS
Invalid transition      DENY PASS / N/A
Audit emitted           PASS
```

---

# 126. Mandatory E2E Matrix

Required:

```text
1. Platform Admin Load
2. Organization List
3. Organization Detail
4. Organization Settings
5. Rename Organization
6. Suspend Organization
7. Reactivate Organization
8. Archive Organization
9. Transfer Organization Ownership
10. Organization Member List
11. Reactivate Member
12. Organization Project List
13. Create Project
14. Project Detail
15. Project Settings
16. Project Switcher
17. Organization Switch Clears Project Context
18. Project Pause
19. Paused Project Read
20. Paused Project Edit Denied
21. Paused Secure Upload Denied
22. Paused Share Grant Denied
23. Project Reactivate
24. Project Archive
25. Archived Historical Read
26. Archived Write Denied
27. Transfer Project Ownership
28. Project Access List
29. Reactivate Project Access
30. Module Disable
31. Disabled Module Access Denied
32. Organization Usage
33. Project Usage
34. Storage Usage
35. Operational Health
36. Administrative Audit
37. Arcana Administration Pilot
38. Mobile Organization Admin
39. Mobile Project Admin
```

Required:

```text
39/39 PASS
```

---

# 127. Visual Regression Baselines

Minimum:

```text
Platform Admin
Organization List
Organization Detail
Organization Settings
Organization Members
Organization Projects
Project Admin
Project Settings
Project Lifecycle
Ownership Transfer
Usage Summary
Operational Health
Administrative Audit
Paused Project State
Archived Project State
Mobile Organization Admin
Mobile Project Admin
```

Required:

```text
17/17 PASS
Desktop 1440×900
Mobile 390×844
Unexpected changes: 0
```

---

# 128. Browser Runtime Gate

Required:

```text
Critical console errors: 0
Unhandled exceptions:    0
Critical asset 404s:     0
```

---

# 129. Secret Gate

Required:

```text
Repository private keys:      0
Service account JSON:         0
Firebase Admin keys:          0
Storage secrets/tokens:       0
AI provider keys:             0
Production bundle secrets:    0
```

---

# 130. Canonical Mutation Gate

Required:

```text
Administrative Project Twin fact mutations: 0
Administrative Claim mutations:             0
Administrative Evidence mutations:          0
```

Allowed:

```text
Project admin metadata
Organization admin metadata
Lifecycle metadata
Settings
Access state
Usage read models
Audit
```

---

# 131. Regression Gate

Required:

```text
Phase 010 Administration              PASS
Phase 009 Secure Storage              PASS
Phase 008 Security/RBAC               PASS
Phase 007 Data Room                   PASS
Phase 006 AI Copilot                  PASS
Phase 005 Presenter                   PASS
Phase 004 Presentation                PASS
Phase 003 Claims/Evidence             PASS
Phase 002 Narrative                   PASS
Phase 001 Project Twin                PASS
Phase 000A Hexagonal                  PASS
Phase 0 Legacy                        45/45 PASS minimum
```

---

# 132. Forbidden Scope Audit

Final report MUST explicitly state:

```text
Billing:                              NOT IMPLEMENTED
Subscriptions:                        NOT IMPLEMENTED
Payments:                             NOT IMPLEMENTED
Seat Licensing:                       NOT IMPLEMENTED

Public Project Marketplace:           NOT IMPLEMENTED
Anonymous Organizations:              NOT IMPLEMENTED
Anonymous Projects:                   NOT IMPLEMENTED

General-Purpose Backend API:          NOT IMPLEMENTED
Advanced Analytics Warehouse:         NOT IMPLEMENTED
Production Alerting Provider:         NOT IMPLEMENTED
External Monitoring Integration:      NOT IMPLEMENTED

Canonical Project Twin Migration:     NOT IMPLEMENTED
Canonical Claims Migration:           NOT IMPLEMENTED
Canonical Evidence Migration:         NOT IMPLEMENTED

AI Administrative Auto-Write:         NOT IMPLEMENTED
AI Role Assignment:                   NOT IMPLEMENTED
AI Ownership Transfer:                NOT IMPLEMENTED

Document Editing:                     NOT IMPLEMENTED
Collaborative Authoring:              NOT IMPLEMENTED
```

Authorized:

```text
Organization Administration:          IMPLEMENTED
Project Administration:               IMPLEMENTED
Ownership Transfer:                   IMPLEMENTED
Project Lifecycle:                    IMPLEMENTED
Organization Lifecycle:               IMPLEMENTED
Usage Read Models:                    IMPLEMENTED
Operational Health:                   IMPLEMENTED
Administrative Audit:                 IMPLEMENTED
```

---

# 133. Required Documentation

Create:

```text
docs/administration/ADMINISTRATION_DOMAIN_MODEL.md
docs/administration/ORGANIZATION_ADMINISTRATION_REFERENCE.md
docs/administration/PROJECT_ADMINISTRATION_REFERENCE.md
docs/administration/PROJECT_LIFECYCLE_POLICY.md
docs/administration/OWNERSHIP_TRANSFER_POLICY.md
docs/administration/ADMIN_PERMISSION_CATALOG_1_2.md
docs/administration/USAGE_READ_MODEL_REFERENCE.md
docs/administration/OPERATIONAL_HEALTH_REFERENCE.md
docs/administration/ADMINISTRATIVE_AUDIT_REFERENCE.md

docs/evidence/ARCANA_ADMINISTRATION_PILOT_REPORT.md
docs/evidence/SPEC_010_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_010_VERIFICATION_REPORT.md
```

Extend:

```text
docs/security/SECURITY_THREAT_MODEL.md
```

with T-31..T-45.

---

# 134. Recommended ADRs

Create:

```text
ADR-0088 Administration Orchestrates Existing Domains
ADR-0089 Administrative Lifecycle Separate from Venture Maturity
ADR-0090 Exactly One Administrative Organization Owner
ADR-0091 Exactly One Administrative Project Owner
ADR-0092 Trusted Ownership Transfer
ADR-0093 Deterministic Project Lifecycle
ADR-0094 Paused and Archived Projects Are Write-Protected
ADR-0095 Usage Metrics Are Derived Read Models
ADR-0096 Operational Health Is Read-Only
ADR-0097 Administrative Audit Uses Existing Append-Only Boundary
ADR-0098 Permission Catalog v1.2 for Administration
```

---

# 135. Required Verification Report

Generate:

```text
docs/evidence/PHASE_010_VERIFICATION_REPORT.md
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
permissionCatalogVersion
administrationPolicyVersion
Firebase environment
```

## Domain

Report:

```text
organization invariants
project invariants
settings
lifecycle
ownership
```

## Permission Catalog

Report:

```text
1.2
new permissions
role mappings
```

## Trusted Commands

Report all commands individually.

## Lifecycle

Report all valid/invalid transitions.

## Paused / Archived Integration

Report module-level read/write enforcement.

## Usage

Report organization/project counts and storage exactness.

## Health

Report component health checks and sanitization.

## Audit

Report all new event classes.

## Arcana Pilot

Report organization/project administrative scenarios.

## Threat Model

Report T-31..T-45 individually.

## E2E

Report 39 individually.

## Visual Regression

Report 17 individually.

## Browser Runtime

Report 0/0/0.

## Secret Scan

Report all categories.

## Canonical Safety

Report zero canonical business mutations.

## Regression

Report all prior phases.

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

# 136. SDD State Machine

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

# 137. Change Control

Any proposal to add:

```text
billing
subscription plans
payments
production monitoring vendor
support impersonation
public marketplace
cross-tenant project transfer
general-purpose backend
```

requires:

```text
docs/specs/changes/CHANGE_REQUEST_010_XXX.md
```

---

# 138. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-010 — Organization & Project Administration`

under:

`SPEC-010 — Organization & Project Administration`

Previous phase:

`VHOS-PHASE-009 — Secure Storage & Controlled Data Room Sharing`

is approved CLOSED.

---

## PRIMARY OBJECTIVE

Transform Venture Hub OS into a fully administrable multi-tenant operating platform by implementing:

```text
organization administration
project administration
ownership
settings
lifecycle
member/access administration
usage
operational health
administrative audit
```

without replacing any canonical venture domain.

---

## CRITICAL RULE 1

```text
ADMINISTRATION ≠ CANONICAL VENTURE TRUTH
```

Do not move Project Twin business facts into administration.

---

## CRITICAL RULE 2

```text
PROJECT LIFECYCLE ≠ VENTURE MATURITY STATUS
```

Administrative `ARCHIVED` does not mean Project Twin `ARCHIVED` unless a separately governed business action changes it.

---

## CRITICAL RULE 3

```text
PAUSED / ARCHIVED
→ WRITE PROTECTION
```

Enforce at application/security boundaries.

---

## CRITICAL RULE 4

```text
OWNERSHIP TRANSFER
→ TRUSTED OPERATION
→ AUDIT
```

No direct client owner mutation.

---

## BEFORE WRITING CODE

You MUST:

1. read Phase 008 and 009 security/storage implementation;
2. read current organization/project security records;
3. run full baseline;
4. inspect permission catalog 1.1;
5. inspect organization/project lifecycle concepts already present;
6. inspect audit event model;
7. inspect Arcana fixtures;
8. extend threat model T-31..T-45;
9. map work to `T-010-*`;
10. document implementation plan.

Start with domain/lifecycle/ownership.

Do NOT start with UI.

---

## IMPLEMENTATION ORDER

Required:

```text
Threat Model
      ↓
Administration Domain
      ↓
Permission Catalog 1.2
      ↓
Organization Lifecycle
      ↓
Project Lifecycle
      ↓
Ownership Transfer
      ↓
Trusted Commands
      ↓
Membership / Access Reactivation
      ↓
Usage Read Models
      ↓
Operational Health
      ↓
Existing Module Lifecycle Integration
      ↓
Audit
      ↓
Arcana Pilot
      ↓
UI
      ↓
Verification
```

---

## ORGANIZATION RULE

Every organization must preserve valid ownership and tenant isolation.

---

## PROJECT RULE

Every project must:

```text
belong to one organization
have valid owner
have deterministic lifecycle
preserve canonical project truth
```

---

## PROJECT CREATION RULE

Do not fabricate content.

Initialize empty/governed Project Twin structure only.

---

## LIFECYCLE RULE

Use deterministic transitions.

Unsupported transition:

```text
DENY
```

---

## PAUSE RULE

Paused project:

```text
read allowed
writes/generation/upload/share mutation denied
```

---

## ARCHIVE RULE

Archived project:

```text
historical read allowed according to policy
normal writes denied
```

---

## OWNERSHIP RULE

Transfer only to:

```text
active member
same organization
authorized target
```

---

## USAGE RULE

Usage data is derived.

No canonical duplication.

---

## HEALTH RULE

Health is:

```text
read-only
sanitized
non-canonical
```

Production monitoring belongs to Phase 011.

---

## AI RULE

AI SHALL NOT:

```text
transfer ownership
change organization status
change project lifecycle
assign roles
mutate administrative settings automatically
```

---

## REQUIRED TESTS

Run all mandatory domain/lifecycle tests.

Run all trusted-command matrices.

Run 39/39 E2E.

Run 17/17 visual.

Run full regression.

---

## REQUIRED OUTPUT

Create:

```text
docs/evidence/PHASE_010_VERIFICATION_REPORT.md
docs/evidence/SPEC_010_TRACEABILITY_MATRIX.md
docs/evidence/ARCANA_ADMINISTRATION_PILOT_REPORT.md
```

Extend:

```text
docs/security/SECURITY_THREAT_MODEL.md
```

Final status only:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

Do NOT mark Phase 010 CLOSED.

Do NOT start Phase 011.

---

# 139. Expected End State

```text
                        VENTURE HUB OS
                              │
                           PLATFORM
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
          ORGANIZATION ADMIN          PLATFORM ADMIN
                 │
        ┌────────┼─────────┐
        ▼        ▼         ▼
     MEMBERS   PROJECTS   SETTINGS
                 │
        ┌────────┼─────────┐
        ▼        ▼         ▼
      OWNER   LIFECYCLE   ACCESS
                 │
        ┌────────┼─────────┐
        ▼        ▼         ▼
      USAGE     HEALTH    AUDIT
                 │
                 ▼
         EXISTING VENTURE MODULES
```

After Phase 010:

```text
Functional Core                        ✅
AI / Narrative / Presentations         ✅
Due Diligence                          ✅
Security / RBAC / Audit                ✅
Secure Storage                         ✅
Controlled Sharing                     ✅
Organization Administration            ✅
Project Administration                 ✅
Ownership                              ✅
Lifecycle                              ✅
Usage                                  ✅
Operational Health                     ✅

Billing                                ❌
Subscriptions                          ❌
Production Hardening                   ❌ Phase 011
Final Release Acceptance               ❌ Phase 012
```

---

# 140. Exit Decision

If every mandatory gate passes:

> **Apruebo formalmente VHOS-PHASE-010 — Organization & Project Administration bajo SPEC-010 como VERIFIED/CLOSED y autorizo el inicio de VHOS-PHASE-011 — Production Hardening, Observability & Deployment, manteniendo la arquitectura Feature-Oriented Hexagonal, la separación entre administración y verdad canónica, el aislamiento multi-tenant, la autorización fail-closed, los ciclos de vida determinísticos, la transferencia de ownership mediante operaciones confiables y la auditoría application-level append-only.**
