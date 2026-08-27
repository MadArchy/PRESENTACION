# SPEC-010: Administration Domain Model

## 1. Domain Overview & Invariants

The Administration Domain establishes multi-tenant governance, lifecycle state machines, configuration isolation, usage telemetry, and operational observability across Venture Hub OS without mutating canonical venture truth.

### Core Invariants

1. **Administration ≠ Canonical Venture Truth**:
   Administration coordinates operational state, organizational boundaries, module toggles, and metadata without rewriting Project Twin business facts, Claims, or Evidence records.
2. **Project Lifecycle ≠ Venture Maturity Status**:
   `DRAFT | ACTIVE | PAUSED | ARCHIVED` governs platform availability, computational execution, and write authorization, completely decoupled from venture validation stage.
3. **Write Protection on PAUSED / ARCHIVED**:
   When a project is `PAUSED` or `ARCHIVED`, write operations across Project Twin, Claims, Evidence, Narratives, Presentations, File Uploads, and Share Grants are blocked fail-closed with explicit reason codes (`PROJECT_PAUSED` or `PROJECT_ARCHIVED`).
4. **Single Canonical Owner Invariant**:
   Every organization and every project has exactly one active canonical owner (`ownerUserId`).
5. **Last Owner Protection**:
   The last owner of an organization or project cannot be removed, suspended, or downgraded until ownership is explicitly transferred to another active member.
6. **Forbidden Scope Boundaries**:
   Billing, subscriptions, credit card payments, seat licensing, public project marketplaces, anonymous organizations/projects, cross-tenant transfers, and autonomous AI administrative updates are strictly prohibited.

---

## 2. Entities & Interfaces

### OrganizationAdministrationRecord
- `organizationId`: string
- `name`: string
- `slug`: string
- `status`: `'ACTIVE' | 'SUSPENDED' | 'ARCHIVED'`
- `ownerUserId`: string
- `memberCount`: number
- `activeProjectCount`: number
- `archivedProjectCount`: number
- `storageUsageBytes`: number
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string

### OrganizationSettings
- `organizationId`: string
- `displayName`: string
- `defaultLanguage`: string
- `timezone`: string
- `defaultProjectRole`: `ProjectRole`
- `invitePolicy`: `'ADMINS_ONLY' | 'OWNERS_ONLY'`
- `dataRoomDefaultConfidentiality`: `ConfidentialityLevel`
- `updatedAt`: ISO 8601 string
- `updatedBy`: string

### ProjectAdministrationRecord
- `projectId`: string
- `organizationId`: string
- `name`: string
- `slug`: string
- `status`: `'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ARCHIVED'`
- `ownerUserId`: string
- `projectTwinId`?: string
- `createdAt`: ISO 8601 string
- `createdBy`: string
- `updatedAt`: ISO 8601 string
- `updatedBy`: string
- `archivedAt`?: string
- `archivedBy`?: string

### ProjectSettings
- `organizationId`: string
- `projectId`: string
- `displayName`: string
- `defaultLanguage`: string
- `defaultNarrativeAudience`?: string
- `defaultNarrativeDuration`?: string
- `dataRoomEnabled`: boolean
- `copilotEnabled`: boolean
- `presenterEnabled`: boolean
- `updatedAt`: ISO 8601 string
- `updatedBy`: string
