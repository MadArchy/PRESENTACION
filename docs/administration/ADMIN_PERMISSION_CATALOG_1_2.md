# Admin Permission Catalog Version 1.2

## 1. Overview

Permission Catalog Version 1.2 expands the Venture Hub OS RBAC matrix with 12 administrative permissions, bringing the system total to 48 permissions across Platform, Organization, and Project scopes.

## 2. Added Permissions

| Permission | Scope | Granted Roles |
|---|---|---|
| `organization.update_settings` | Organization | `PLATFORM_ADMIN`, `ORG_OWNER`, `ORG_ADMIN` |
| `organization.suspend` | Organization | `PLATFORM_ADMIN`, `ORG_OWNER` |
| `organization.archive` | Organization | `PLATFORM_ADMIN`, `ORG_OWNER` |
| `organization.transfer_ownership` | Organization | `PLATFORM_ADMIN`, `ORG_OWNER` |
| `projects.create` | Organization | `PLATFORM_ADMIN`, `ORG_OWNER`, `ORG_ADMIN` |
| `projects.update_settings` | Project | `PLATFORM_ADMIN`, `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN` |
| `projects.pause` | Project | `PLATFORM_ADMIN`, `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN` |
| `projects.archive` | Project | `PLATFORM_ADMIN`, `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN` |
| `projects.reactivate` | Project | `PLATFORM_ADMIN`, `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN` |
| `projects.transfer_ownership` | Project | `PLATFORM_ADMIN`, `ORG_OWNER`, `ORG_ADMIN`, `PROJECT_ADMIN` |
| `usage.read` | Organization | `PLATFORM_ADMIN`, `ORG_OWNER`, `ORG_ADMIN` |
| `platform_health.read` | Platform | `PLATFORM_ADMIN`, `ORG_OWNER`, `ORG_ADMIN` |
