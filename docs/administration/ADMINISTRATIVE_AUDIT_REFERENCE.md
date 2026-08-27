# Administrative Audit Reference

## 1. Audit Event Catalog Version 1.2

All administrative actions trigger immediate emission of append-only, tamper-evident audit records into the organization audit subcollection.

### 14 Administrative Audit Event Types

1. `ORGANIZATION_RENAMED`: Emitted on organization display name change.
2. `ORGANIZATION_SETTINGS_UPDATED`: Emitted on organization configuration change.
3. `ORGANIZATION_SUSPENDED`: Emitted when organization status transitions to `SUSPENDED`.
4. `ORGANIZATION_REACTIVATED`: Emitted when organization status returns to `ACTIVE`.
5. `ORGANIZATION_ARCHIVED`: Emitted when organization status transitions to `ARCHIVED`.
6. `ORGANIZATION_OWNERSHIP_TRANSFERRED`: Emitted on sole owner transfer.
7. `PROJECT_CREATED`: Emitted when a new venture project is registered.
8. `PROJECT_SETTINGS_UPDATED`: Emitted when project settings or module toggles change.
9. `PROJECT_PAUSED`: Emitted when project enters `PAUSED` state.
10. `PROJECT_REACTIVATED`: Emitted when project returns to `ACTIVE`.
11. `PROJECT_ARCHIVED`: Emitted when project transitions to `ARCHIVED`.
12. `PROJECT_OWNERSHIP_TRANSFERRED`: Emitted on project owner transfer.
13. `MEMBER_REACTIVATED`: Emitted on organization member reactivation.
14. `PROJECT_ACCESS_REACTIVATED`: Emitted on project access assignment reactivation.
