# Storage Authorization Policy: Phase 009

**Specification:** `SPEC-009 — Secure Storage & Controlled Data Room Sharing`  
**Policy Version:** `1.0` (`SECURE_STORAGE_POLICY_VERSION = "1.0"`)  
**Catalog Version:** `1.1` (`PERMISSION_CATALOG_VERSION = "1.1"`)  

---

## 1. Principle: `FILE EXISTENCE ≠ FILE ACCESS`

To access any stored binary blob, the requester must satisfy all of the following conditions simultaneously:
1. Authenticated Firebase Identity (`request.auth != null`).
2. Active User Profile (`UserProfile.status === 'ACTIVE'`).
3. Active Organization Membership (`OrganizationMembership.status === 'ACTIVE'`).
4. Matching Tenant Organization (`caller.orgId === file.orgId`).
5. Active Project Assignment (`ProjectAccessAssignment.status === 'ACTIVE'`).
6. Matching Project (`caller.projectId === file.projectId`).
7. Granted Capability (`data_room.read`, `data_room.read_confidential`, or `data_room.read_highly_confidential`).
8. Active ShareGrant (mandatory for `EXTERNAL_REVIEWER`, matching file and confidentiality ceiling).
9. Available Resource Status (`file.status === 'AVAILABLE'` and `version.status in ['AVAILABLE', 'SUPERSEDED']`).
10. Valid Tenant-Scoped Object Path.
