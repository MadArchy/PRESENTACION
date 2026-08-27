# Architecture Decision Records: SPEC-010 Administration Suite

## ADR-0088: Administration Boundary Decoupled from Canonical Venture Truth
- **Status**: Accepted
- **Context**: Administration operations must not alter or mutate Project Twin business entities, Claims, Evidence, or Presentation narratives.
- **Decision**: Administration records and settings reside in separate Firestore paths (`/admin/{orgId}`) and domain entities.

## ADR-0089: Project Lifecycle State Machine & Write Protection
- **Status**: Accepted
- **Context**: Projects need explicit administrative states (`DRAFT`, `ACTIVE`, `PAUSED`, `ARCHIVED`) to manage operational availability.
- **Decision**: Transitions are governed by `LifecyclePolicy`. `PAUSED` and `ARCHIVED` states fail-close all write mutations and generation tasks with explicit reason codes.

## ADR-0090: Single Canonical Owner Invariant & Last Owner Protection
- **Status**: Accepted
- **Context**: Multi-tenant organizations and projects must always have exactly one accountable owner.
- **Decision**: Domain entities enforce `ownerUserId`. Deletion, suspension, or downgrade of the sole active owner is rejected until ownership is transferred.

## ADR-0091: Organization Membership Boundary for Ownership Transfers
- **Status**: Accepted
- **Context**: Preventing cross-tenant or unassigned ownership hijacking (T-34, T-35).
- **Decision**: Ownership transfers require the recipient user to be an active member of the target organization.

## ADR-0092: Expansion to RBAC Permission Catalog Version 1.2
- **Status**: Accepted
- **Context**: SPEC-010 introduces fine-grained organizational and project lifecycle controls.
- **Decision**: 12 new administrative permissions added to `PERMISSION_CATALOG_VERSION = '1.2'`, totaling 48 permissions.

## ADR-0093: Trusted Server-Side Administration Commands Engine
- **Status**: Accepted
- **Context**: Administrative mutations require privileged verification and tamper-evident audit logging.
- **Decision**: 14 trusted administrative operations run through `TrustedAdministrationCommandsEngine` with automatic audit emission.

## ADR-0094: Near-Real-Time Usage Telemetry Read Model
- **Status**: Accepted
- **Context**: Administrators require immediate visibility into storage consumption, file counts, and membership numbers.
- **Decision**: `UsageReadRepository` calculates tenant and project metrics without expensive recursive table scans.

## ADR-0095: 7-Dimension Platform Operational Health Diagnostic
- **Status**: Accepted
- **Context**: Multi-tenant OS needs clear diagnostic signals for subsystem health.
- **Decision**: `PlatformHealthPort` evaluates `AUTH`, `FIRESTORE`, `STORAGE`, `FUNCTIONS`, `PROJECT_DATA`, `DATA_ROOM`, and `AUDIT`.

## ADR-0096: Module Enablement Gating for Optional Subsystems
- **Status**: Accepted
- **Context**: Projects may selectively disable Copilot, Data Room, or Presenter.
- **Decision**: `ModuleEnablementPolicy` blocks workspace loading with `MODULE_DISABLED` when disabled in `ProjectSettings`.

## ADR-0097: Tenant-Scoped Firestore Rules for Administration Paths
- **Status**: Accepted
- **Context**: Securing `/admin/{docId}` and `/projects/{projectId}/admin/{docId}` subcollections against unauthorized direct client access.
- **Decision**: Firestore Security Rules require active membership and admin role tokens to read or write administrative paths.

## ADR-0098: Strict Prohibition of Commercial & Autonomous Scopes (Forbidden Scope)
- **Status**: Accepted
- **Context**: Maintaining clean architecture boundaries and security posture.
- **Decision**: Billing, seat licensing, public marketplaces, anonymous tenants, and autonomous AI administrative updates are forbidden.
