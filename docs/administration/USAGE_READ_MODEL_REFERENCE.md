# Usage Read Model Reference

## 1. Scope and Aggregations

The Usage Read Model provides near-real-time aggregates of platform utilization at Platform, Organization, and Project levels.

### Organization Usage Metrics
- `activeMembers`: Count of active organization memberships.
- `suspendedMembers`: Count of suspended memberships.
- `activeProjects`: Count of active projects.
- `archivedProjects`: Count of archived projects.
- `storageBytes`: Total bytes consumed by authoritative file versions.
- `fileCount`: Total count of active secure file records.
- `fileVersionCount`: Total count of immutable file versions.
- `activeShareGrants`: Count of non-revoked, non-expired share grants.

### Project Usage Metrics
- `memberCount`: Distinct users assigned to project.
- `storageBytes`: Total storage bytes under project path.
- `fileCount` & `fileVersionCount`: Files in project data room.
- `claimsCount`, `evidenceCount`, `presentationsCount`: Core domain entities in project twin.
