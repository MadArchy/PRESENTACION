# Organization Administration Reference

## 1. Scope and Operations

Organization administration manages top-level tenancy, organization naming, metadata configuration, members, and organizational lifecycle transitions.

### Organization Lifecycle Transitions
- `ACTIVE` → `SUSPENDED` (Blocks all member activity within tenant)
- `ACTIVE` → `ARCHIVED` (Tenancy historical archive)
- `SUSPENDED` → `ACTIVE`
- `ARCHIVED` → `ACTIVE`

## 2. Trusted Commands Matrix

| Command | Allowed Roles | Description | Audit Type |
|---|---|---|---|
| `RenameOrganization` | `ORG_OWNER`, `ORG_ADMIN`, `PLATFORM_ADMIN` | Updates tenant display name | `ORGANIZATION_RENAMED` |
| `UpdateOrganizationSettings` | `ORG_OWNER`, `ORG_ADMIN`, `PLATFORM_ADMIN` | Updates default language, tz, invite policy | `ORGANIZATION_SETTINGS_UPDATED` |
| `SuspendOrganization` | `ORG_OWNER`, `PLATFORM_ADMIN` | Suspends organization access | `ORGANIZATION_SUSPENDED` |
| `ReactivateOrganization` | `ORG_OWNER`, `PLATFORM_ADMIN` | Restores organization access | `ORGANIZATION_REACTIVATED` |
| `ArchiveOrganization` | `ORG_OWNER`, `PLATFORM_ADMIN` | Archives organization | `ORGANIZATION_ARCHIVED` |
| `TransferOrganizationOwnership` | `ORG_OWNER`, `PLATFORM_ADMIN` | Transfers sole ownership to another active member | `ORGANIZATION_OWNERSHIP_TRANSFERRED` |

## 3. Storage and Firestore Isolation
All organization administrative documents reside at `/admin/{orgId}` and `/admin/{orgId}/settings/current`. Firestore Security Rules strictly verify caller tenant boundary and membership state.
