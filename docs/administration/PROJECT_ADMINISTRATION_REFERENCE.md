# Project Administration Reference

## 1. Scope and Features

Project administration governs venture project lifecycle states, configuration flags, module toggles, access assignments, and ownership transitions.

### Project Lifecycle States
- `DRAFT`: Initial creation state.
- `ACTIVE`: Normal operational state allowing reads, writes, and analysis generation.
- `PAUSED`: Write operations and generation tasks blocked; read operations permitted.
- `ARCHIVED`: Read-only historical state; all mutations rejected fail-closed.

## 2. Project Trusted Commands

| Command | Allowed Roles | Description | Audit Type |
|---|---|---|---|
| `CreateProject` | `ORG_OWNER`, `ORG_ADMIN`, `PLATFORM_ADMIN` | Creates new project with unique slug | `PROJECT_CREATED` |
| `UpdateProjectSettings` | `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN`, `PLATFORM_ADMIN` | Configures defaults and module toggles | `PROJECT_SETTINGS_UPDATED` |
| `PauseProject` | `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN`, `PLATFORM_ADMIN` | Transitions status to `PAUSED` | `PROJECT_PAUSED` |
| `ReactivateProject` | `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN`, `PLATFORM_ADMIN` | Transitions status to `ACTIVE` | `PROJECT_REACTIVATED` |
| `ArchiveProject` | `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN`, `PLATFORM_ADMIN` | Transitions status to `ARCHIVED` | `PROJECT_ARCHIVED` |
| `TransferProjectOwnership` | `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN`, `PLATFORM_ADMIN` | Reassigns project owner to active member | `PROJECT_OWNERSHIP_TRANSFERRED` |

## 3. Module Enablement Matrix
When a module toggle (`dataRoomEnabled`, `copilotEnabled`, `presenterEnabled`) is set to `false`, access to that module's workspace is rejected with `MODULE_DISABLED`.
