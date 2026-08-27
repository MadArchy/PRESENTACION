# Venture Hub OS — Phase 009: Secure Storage & Controlled Data Room Sharing

**Document ID:** `VHOS-PHASE-009`  
**Specification:** `SPEC-009 — Secure Storage & Controlled Data Room Sharing`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-008 — Security, Authentication, RBAC & Audit`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Security Control Plane:** Firebase Auth + Firestore + Security Rules + Trusted Security Functions  
**Secure File Plane:** Firebase Storage + Storage Security Rules  
**AI Canonical Auto-Write:** FORBIDDEN  
**Anonymous Public Sharing:** NOT AUTHORIZED  
**Recommended Next Phase:** `VHOS-PHASE-010 — Organization & Project Administration / Production Operations`

---

# 1. Executive Purpose

Phase 009 closes the remaining security gap after Phase 008:

```text
Authentication / RBAC / Audit            ✅
Public bundle sensitive-file exclusion   ✅
Private binary storage                    ❌
Controlled file delivery                  ❌
```

The target architecture is:

```text
USER
  │
  ▼
FIREBASE AUTH
  │
  ▼
SECURITY CONTEXT
  │
  ▼
RBAC / PROJECT ACCESS
  │
  ├─────────────────────────────┐
  ▼                             ▼
FIRESTORE CONTROL PLANE      FIREBASE STORAGE
(metadata / access grants)   (private binary files)
  │                             │
  └──────────────┬──────────────┘
                 ▼
          STORAGE RULES
                 │
                 ▼
      CONTROLLED FILE ACCESS
                 │
                 ▼
         APPEND-ONLY AUDIT
```

Core invariant:

```text
FILE EXISTENCE ≠ FILE ACCESS
```

A file read/write must require authenticated identity, active user, active organization membership, active project assignment, correct permission, matching tenant path, valid file status, confidentiality authorization, and — when sharing applies — a valid non-expired non-revoked share grant.

Missing or mismatched security state always results in `DENY`.

---

# 2. Primary Outcomes

Phase 009 SHALL deliver:

1. private Firebase Storage;
2. secure tenant/project encoded paths;
3. governed FileRecord metadata;
4. controlled upload lifecycle;
5. controlled download;
6. immutable file versioning;
7. confidentiality enforcement;
8. authenticated external reviewer sharing;
9. revocable ShareGrants;
10. ShareGrant expiration;
11. upload type/size validation;
12. quarantine/delete governance;
13. storage/share audit events;
14. zero non-public binaries in public `dist/`;
15. Phase 007 Data Room integration;
16. Phase 008 RBAC integration;
17. Arcana secure-storage pilot;
18. full emulator-backed security verification.

---

# 3. Explicit Non-Goals

Phase 009 SHALL NOT implement:

```text
Anonymous public file links
Password-only public shares
Unrestricted signed download URLs
Public Storage bucket
Public object ACLs
General-purpose file hosting
Document editing
Collaborative authoring
Full-content indexing
Guaranteed malware-scanning service
External web crawling
Canonical Project Twin migration
Canonical Claims migration
Canonical Evidence migration
AI security decisions
AI auto-classification writes
AI canonical auto-write
```

Any request for these capabilities requires a formal Change Request.

---

# 4. Architectural Boundary

Firebase Storage becomes authoritative only for private binary content.

Firestore remains authoritative for:

```text
file metadata
file/version lifecycle
share grants
upload intents
security/access metadata
storage audit metadata
```

The canonical project truth remains under existing Project Twin / Claims / Evidence governance.

Required relationship:

```text
DocumentArtifact ≠ FileRecord ≠ Evidence
```

Uploading a file MUST NOT:

```text
create Evidence
mark a Claim SUPPORTED
change ClaimSupportStatus
change Project Twin truth
```

---

# 5. Module Structure

Create:

```text
src/modules/secure-storage/
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
│   ├── firebase-storage/
│   ├── firestore/
│   └── test/
└── tests/
```

UI:

```text
src/ui/secure-storage/
```

Dependency direction remains:

```text
UI → Application → Domain
```

The secure-storage domain MUST NOT import Firebase SDKs, Storage SDKs, Firestore SDKs, DOM/browser APIs, UI, Cloud Functions SDKs, or AI adapters.

---

# 6. FileRecord

Required:

```ts
interface FileRecord {
  id: string;
  organizationId: string;
  projectId: string;
  dataRoomDocumentId?: string;
  logicalName: string;
  originalFileName: string;
  mediaType: string;
  extension?: string;
  sizeBytes: number;
  confidentiality: ConfidentialityLevel;
  status: FileStatus;
  currentVersionId?: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
```

Required `FileStatus`:

```text
PENDING_UPLOAD
UPLOADING
AVAILABLE
QUARANTINED
REJECTED
SUPERSEDED
DELETED
```

`QUARANTINED` is an administrative state only. It does not imply automated malware detection.

---

# 7. FileVersion

Required:

```ts
interface FileVersion {
  id: string;
  fileId: string;
  organizationId: string;
  projectId: string;
  versionNumber: number;
  storagePath: string;
  originalFileName: string;
  mediaType: string;
  sizeBytes: number;
  sha256?: string;
  status: FileVersionStatus;
  uploadedAt: string;
  uploadedBy: string;
  supersedesVersionId?: string;
}
```

Required status:

```text
PENDING
AVAILABLE
QUARANTINED
REJECTED
SUPERSEDED
DELETED
```

Version objects are immutable. Replacing a file creates a new version; it MUST NOT overwrite the previous Storage object.

---

# 8. Secure Storage Path

Required path shape:

```text
organizations/{organizationId}/projects/{projectId}/data-room/{fileId}/versions/{versionId}/{safeFileName}
```

Equivalent deterministic tenant-scoped layout is acceptable.

Never use an unscoped private path such as:

```text
/data-room/{fileName}
```

Path IDs must be verified against authoritative Firestore metadata. Client-provided path metadata is not trusted.

---

# 9. Permission Catalog 1.1

Upgrade Phase 008 Permission Catalog from `1.0` to `1.1`.

Add:

```text
data_room.upload_file
data_room.replace_file
data_room.delete_file
data_room.share_file
data_room.manage_file_versions
data_room.review_quarantined_file
```

Do not remove or silently redefine existing permissions.

Recommended role mapping:

```text
PROJECT_ADMIN
→ all secure-storage permissions

PROJECT_EDITOR
→ upload / replace / manage versions

PROJECT_REVIEWER
→ read according to confidentiality capability

EXTERNAL_REVIEWER
→ read-only, constrained by project access + ShareGrant
```

No upload/delete/share permission for `EXTERNAL_REVIEWER` by default.

---

# 10. Upload Policy

Create versioned:

```text
storageUploadPolicyVersion = "1.0"
```

The deterministic UploadPolicy evaluates:

```text
permission
tenant/project
file size
media type
confidentiality
current file state
version intent
```

Initial allowlist:

```text
application/pdf
text/plain
text/markdown
text/csv
application/vnd.openxmlformats-officedocument.wordprocessingml.document
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
application/vnd.openxmlformats-officedocument.presentationml.presentation
image/png
image/jpeg
image/webp
```

Recommended limits:

```text
PDF / Office: 50 MB
Images:       20 MB
Text / CSV:   10 MB
```

Exact values may be tuned, but must remain versioned, documented, and tested.

Client MIME type is metadata, not proof that a file is safe.

---

# 11. UploadIntent

Required:

```ts
interface UploadIntent {
  id: string;
  organizationId: string;
  projectId: string;
  requestedBy: string;
  logicalName: string;
  originalFileName: string;
  mediaType: string;
  sizeBytes: number;
  confidentiality: ConfidentialityLevel;
  targetFileId?: string;
  status: UploadIntentStatus;
  expiresAt: string;
}
```

Statuses:

```text
CREATED
AUTHORIZED
UPLOADING
COMPLETED
FAILED
CANCELLED
EXPIRED
```

Preferred flow:

```text
CreateUploadIntent
→ authorization
→ PENDING_UPLOAD metadata
→ authenticated direct Firebase Storage upload
→ Storage Rules
→ FinalizeUpload trusted command
→ AVAILABLE
→ audit
```

---

# 12. Trusted Finalization

Required trusted command:

```text
FinalizeUpload
```

It must validate:

```text
upload intent
caller authorization
expected path
actual object metadata
expected size vs actual size
expected content type vs actual content type
file/version IDs
tenant/project match
```

Only trusted finalization may transition the file/version to `AVAILABLE`.

A failed/cancelled upload must never appear as `AVAILABLE`.

---

# 13. SecureBinaryStoragePort

Required provider-neutral port:

```ts
interface SecureBinaryStoragePort {
  upload(...): Promise<unknown>;
  download(...): Promise<unknown>;
  getMetadata(...): Promise<unknown>;
  deleteObject(...): Promise<void>;
}
```

Firebase Storage adapter:

```text
FirebaseSecureBinaryStorageAdapter
```

Domain MUST remain independent from Firebase SDK implementation.

---

# 14. Storage Security Rules

Create `storage.rules` with default deny.

Storage reads require:

```text
authenticated
AND active UserProfile
AND active OrganizationMembership
AND active ProjectAccessAssignment
AND tenant/path match
AND FileRecord AVAILABLE
AND FileVersion AVAILABLE
AND required confidentiality permission
AND valid ShareGrant when share-based access applies
```

Uploads additionally require:

```text
data_room.upload_file
allowed contentType
allowed size
correct organization/project/file/version path
```

Direct client object delete MUST be denied.

---

# 15. Controlled Download

Downloads SHALL use authenticated Firebase Storage access.

Phase 009 SHALL NOT introduce:

```text
anonymous public URLs
long-lived signed URL bypasses
public object ACLs
```

Downloaded data must remain authorization-scoped.

Cross-org and cross-project existence leakage must be avoided.

---

# 16. ShareGrant

Controlled sharing requires an authenticated grantee.

```ts
interface ShareGrant {
  id: string;
  organizationId: string;
  projectId: string;
  granteeUserId: string;
  scope: ShareScope;
  fileIds: string[];
  confidentialityCeiling: ConfidentialityLevel;
  status: ShareGrantStatus;
  startsAt: string;
  expiresAt?: string;
  createdBy: string;
  createdAt: string;
  revokedBy?: string;
  revokedAt?: string;
}
```

Scopes:

```text
PROJECT_DATA_ROOM
SELECTED_FILES
```

Statuses:

```text
ACTIVE
EXPIRED
REVOKED
```

ShareGrant creation requires:

```text
data_room.share_file
```

The grant does not elevate Project Twin/Claims/Evidence permissions.

---

# 17. External Reviewer Model

Controlled external sharing requires:

```text
Firebase authenticated identity
+
EXTERNAL_REVIEWER project access
+
active ShareGrant
+
confidentiality ceiling
```

Missing, expired, revoked, or out-of-scope grants result in `DENY`.

No email-only anonymous download token is permitted.

---

# 18. Confidentiality Ceiling

A ShareGrant may limit the maximum confidentiality level.

Example:

```text
ceiling = CONFIDENTIAL
```

The grantee MUST NOT receive `HIGHLY_CONFIDENTIAL` content through that grant.

Required direct permission mapping remains:

```text
PUBLIC              → data_room.read
INTERNAL            → data_room.read
CONFIDENTIAL        → data_room.read_confidential
HIGHLY_CONFIDENTIAL → data_room.read_highly_confidential
```

---

# 19. StorageAuthorizationService

Create deterministic:

```text
StorageAuthorizationService
```

Inputs:

```text
SecurityContext
FileRecord
FileVersion
ShareGrant if applicable
RequestedOperation
```

Output:

```ts
interface StorageAuthorizationDecision {
  allowed: boolean;
  reasonCode: StorageAuthorizationReasonCode;
  requiredPermission?: Permission;
  organizationId: string;
  projectId: string;
  fileId?: string;
  shareGrantId?: string;
  policyVersion: string;
}
```

Required reason codes:

```text
ALLOW
UNAUTHENTICATED
USER_INACTIVE
ORGANIZATION_MISMATCH
PROJECT_MISMATCH
MEMBERSHIP_INACTIVE
PROJECT_ACCESS_INACTIVE
FILE_NOT_FOUND
FILE_NOT_AVAILABLE
FILE_QUARANTINED
FILE_DELETED
PERMISSION_MISSING
CONFIDENTIALITY_PERMISSION_MISSING
SHARE_GRANT_MISSING
SHARE_GRANT_EXPIRED
SHARE_GRANT_REVOKED
SHARE_SCOPE_MISMATCH
SHARE_CONFIDENTIALITY_EXCEEDED
VERSION_NOT_FOUND
VERSION_NOT_AVAILABLE
UPLOAD_POLICY_REJECTED
```

Required policy version:

```text
secureStoragePolicyVersion = "1.0"
```

---

# 20. File Versioning

New version:

```text
File v1 AVAILABLE
      ↓
Upload v2
      ↓
v2 AVAILABLE
      ↓
v1 SUPERSEDED
currentVersionId = v2
```

Historical object must remain immutable unless explicit delete governance applies.

Version number must be monotonic per FileRecord.

---

# 21. Delete and Quarantine

Direct client delete is forbidden.

Required trusted commands:

```text
RequestFileDeletion
DeleteSecureFile
QuarantineFile
RestoreQuarantinedFile
```

Quarantined files are unreadable.

Deleted files are unreadable.

Deletion must be audited.

---

# 22. Audit Events

Extend security audit with:

```text
FILE_UPLOAD_INTENT_CREATED
FILE_UPLOAD_COMPLETED
FILE_UPLOAD_FAILED
FILE_VERSION_CREATED
FILE_VERSION_SUPERSEDED
FILE_QUARANTINED
FILE_RESTORED
FILE_DELETE_REQUESTED
FILE_DELETED
FILE_DOWNLOAD_AUTHORIZED
FILE_DOWNLOAD_DENIED
SHARE_GRANT_CREATED
SHARE_GRANT_REVOKED
```

At minimum, download authorization audit records:

```text
actor
organizationId
projectId
fileId
result
timestamp
requestId
```

Never log auth tokens, download bypass URLs, or file contents.

---

# 23. Data Room Integration

Phase 007 `DocumentArtifact` links to secure file metadata through an ID or adapter mapping.

Recommended:

```text
secureFileId
```

Do not store raw public URLs as canonical Data Room truth.

Phase 008 state:

```text
SECURE_STORAGE_PENDING
```

may transition to:

```text
SECURE_STORAGE_AVAILABLE
```

only after a valid `AVAILABLE` FileRecord/current version exists.

---

# 24. Browser Persistence Security

Sensitive binaries SHALL NOT be intentionally persisted in:

```text
localStorage
sessionStorage
IndexedDB
Cache Storage
```

Required gate:

```text
Sensitive binary in localStorage:   0
Sensitive binary in sessionStorage: 0
Sensitive binary in IndexedDB:      0
Sensitive binary in Cache Storage:  0
```

If a service worker exists, protected file responses must not be cached for offline/public reuse.

Ephemeral browser object URLs are permitted for authorized preview and must remain session-local.

---

# 25. Secure Storage UI

Required components:

```text
Secure Storage Overview
Secure File List
Upload Preflight
Upload Progress
Secure File Detail
Version History
Secure Download
Download Denied State
Share Grant Form
Share Grant List
Revoke Share
Confidentiality Ceiling Selector
HIGHLY_CONFIDENTIAL Warning
Mobile Secure Storage
```

Data Room document rows should expose, subject to permission:

```text
Secure File Status
Current Version
File Size
Media Type
Download
Version History
Sharing
```

---

# 26. Arcana Secure Storage Pilot

Use the eight Phase 007 Arcana document records.

Rules:

- migrate only real non-public source binaries;
- keep `doc-arcana-reg-01` as `MISSING`;
- do not fabricate a regulatory file;
- preserve Data Room metadata;
- remove old non-public assets from public production output;
- create FileRecords/FileVersions for migrated real files.

The pilot SHALL include an authenticated external reviewer and demonstrate:

```text
selected allowed file                         ALLOW
out-of-scope file                             DENY
HIGHLY_CONFIDENTIAL above share ceiling       DENY
revoked grant                                 DENY
expired grant                                 DENY
```

Required report:

```text
docs/evidence/ARCANA_SECURE_STORAGE_PILOT_REPORT.md
```

Report:

```text
Document records
FileRecords
FileVersions
Storage objects
Bytes stored
Confidentiality distribution
Upload results
Download results
Share grants
Revoked grants
Expired grants
Denied access cases
Public dist exposure
Canonical mutations
```

Required:

```text
Project Twin mutations = 0
Claim support mutations = 0
Evidence creation by upload = 0
```

---

# 27. Repositories and Ports

Required:

```text
SecureFileRepository
FileVersionRepository
UploadIntentRepository
ShareGrantRepository
SecureBinaryStoragePort
```

Firestore adapters implement metadata repositories.

Firebase Storage adapter implements the binary port.

---

# 28. Required Application Use Cases

```text
CreateUploadIntent
StartUpload
CancelUpload
FinalizeUpload
AuthorizeFileDownload
DownloadSecureFile
AddFileVersion
ListFileVersions
CreateShareGrant
RevokeShareGrant
ListShareGrants
RequestFileDeletion
DeleteSecureFile
QuarantineFile
RestoreQuarantinedFile
GetSecureFile
ListSecureFiles
```

---

# 29. Threat Model Extension

Extend Phase 008 threat model with:

```text
T-16 Anonymous Storage Object Read
T-17 Cross-Organization Storage Read
T-18 Cross-Project Storage Read
T-19 Unauthorized Upload
T-20 Oversized Upload
T-21 Disallowed Media Type Upload
T-22 Direct Client Object Delete
T-23 Revoked Share Grant Access
T-24 Expired Share Grant Access
T-25 Share Scope Escalation
T-26 Confidentiality Ceiling Bypass
T-27 Stale Download Access
T-28 Sensitive Browser Cache Persistence
T-29 Object Metadata Forgery
T-30 Version Overwrite / History Destruction
```

Each threat must include:

```text
attack path
control
verification evidence
residual risk
```

---

# 30. Workstreams

```text
WS-009-01 Secure Storage Domain
WS-009-02 Permission Catalog 1.1
WS-009-03 Firebase Storage Adapter
WS-009-04 Storage Security Rules
WS-009-05 Upload Lifecycle
WS-009-06 Download Authorization
WS-009-07 File Versioning
WS-009-08 Controlled Sharing
WS-009-09 Storage Audit
WS-009-10 Data Room Integration
WS-009-11 Arcana Pilot
WS-009-12 Security Testing
WS-009-13 Documentation & Evidence
```

---

# 31. Mandatory Task Set

## Domain

```text
T-009-001 FileRecord
T-009-002 FileStatus
T-009-003 FileVersion
T-009-004 FileVersionStatus
T-009-005 UploadIntent
T-009-006 UploadIntentStatus
T-009-007 ShareGrant
T-009-008 ShareScope
T-009-009 ShareGrantStatus
T-009-010 StorageSecurityEnvelope
T-009-011 StorageAuthorizationDecision
T-009-012 StorageAuthorizationReasonCode
T-009-013 UploadPolicy
T-009-014 SecureStoragePolicy 1.0
T-009-015 Domain invariants
```

## Permission Catalog

```text
T-009-101 Permission Catalog 1.1
T-009-102 upload permission
T-009-103 replace permission
T-009-104 delete permission
T-009-105 share permission
T-009-106 version permission
T-009-107 quarantine-review permission
T-009-108 role mappings
T-009-109 migration documentation
```

## Storage Rules

```text
T-009-301 create storage.rules
T-009-302 default deny
T-009-303 authenticated user check
T-009-304 active user check
T-009-305 active membership check
T-009-306 project assignment check
T-009-307 upload permission
T-009-308 read permission
T-009-309 confidentiality permission
T-009-310 tenant/path match
T-009-311 FileRecord status
T-009-312 FileVersion status
T-009-313 ShareGrant access
T-009-314 expiration/revocation
T-009-315 content type
T-009-316 file size
T-009-317 direct delete denial
```

## Upload / Download / Versioning / Sharing

```text
T-009-401 CreateUploadIntent
T-009-402 StartUpload
T-009-403 CancelUpload
T-009-404 FinalizeUpload
T-009-405 metadata validation
T-009-406 size validation
T-009-407 media validation
T-009-408 AVAILABLE transition
T-009-409 upload audit

T-009-501 AuthorizeFileDownload
T-009-502 DownloadSecureFile
T-009-503 denied state
T-009-504 authorized audit
T-009-505 denied audit

T-009-601 AddFileVersion
T-009-602 next version number
T-009-603 immutable path
T-009-604 supersession
T-009-605 currentVersionId
T-009-606 version history

T-009-701 CreateShareGrant
T-009-702 RevokeShareGrant
T-009-703 authenticated grantee
T-009-704 project scope
T-009-705 selected-file scope
T-009-706 confidentiality ceiling
T-009-707 startsAt
T-009-708 expiresAt
T-009-709 revoked state
T-009-710 share audit
```

## Delete / Quarantine

```text
T-009-801 RequestFileDeletion
T-009-802 DeleteSecureFile
T-009-803 direct client delete DENY
T-009-804 logical deletion
T-009-805 physical deletion
T-009-806 deletion audit
T-009-807 QuarantineFile
T-009-808 RestoreQuarantinedFile
T-009-809 quarantined read DENY
```

## Data Room / UI / Pilot

```text
T-009-901 DocumentArtifact secure-file mapping
T-009-902 FileRecord linkage
T-009-903 SECURE_STORAGE_PENDING migration
T-009-904 secure file state UI
T-009-905 current version UI
T-009-906 upload permission UI
T-009-907 download permission UI
T-009-908 share permission UI
T-009-909 version history UI
T-009-910 DocumentArtifact != Evidence invariant

T-009-1001..1016 Secure Storage UI
T-009-1101..1115 Arcana secure-storage pilot
```

---

# 32. Mandatory Storage Rules Matrix — 27/27

Final report MUST verify each individually:

```text
1. Anonymous secure file read                         DENY
2. Anonymous secure upload                            DENY
3. Suspended user secure file read                    DENY
4. Cross-org secure file read                         DENY
5. Cross-org secure upload                            DENY
6. Cross-project secure file read                     DENY
7. Cross-project secure upload                        DENY
8. Project viewer upload                              DENY
9. Authorized project editor upload                   ALLOW
10. CONFIDENTIAL unauthorized read                    DENY
11. CONFIDENTIAL authorized read                      ALLOW
12. HIGHLY_CONFIDENTIAL unauthorized read             DENY
13. HIGHLY_CONFIDENTIAL authorized read               ALLOW
14. File not AVAILABLE read                           DENY
15. Quarantined file read                             DENY
16. Deleted file read                                 DENY
17. Oversized upload                                  DENY
18. Disallowed media type upload                      DENY
19. Client direct object delete                       DENY
20. Active valid share grant read                     ALLOW
21. Missing share grant read                          DENY
22. Expired share grant read                          DENY
23. Revoked share grant read                          DENY
24. Out-of-scope file via share                       DENY
25. Confidentiality ceiling exceeded                  DENY
26. Metadata tenant mismatch                          DENY
27. Storage path tenant mismatch                      DENY
```

Required:

```text
Storage Rules: 27/27 PASS
```

---

# 33. Mandatory Trusted Storage Commands

Required:

```text
FinalizeUpload
CreateShareGrant
RevokeShareGrant
RequestFileDeletion
DeleteSecureFile
QuarantineFile
RestoreQuarantinedFile
```

For each applicable command report:

```text
Authorized caller        PASS
Unauthorized caller      DENY
Cross-org caller         DENY
Invalid target           DENY
Forbidden privilege      DENY / N/A
Audit emitted            PASS
```

---

# 34. Mandatory E2E — 31/31

```text
1. Secure Storage Load
2. Upload Button Permission
3. Upload Preflight
4. Upload Allowed File
5. Upload Invalid Media Type
6. Upload Oversized File
7. Upload Progress
8. Upload Cancel
9. Upload Finalize
10. Secure File List
11. Secure File Detail
12. Download Authorized
13. Download Denied
14. CONFIDENTIAL Access
15. HIGHLY_CONFIDENTIAL Denied
16. Version History
17. Add New Version
18. Current Version Updates
19. Share Grant Form
20. Create Selected-File Share
21. External Reviewer Allowed File
22. External Reviewer Out-of-Scope File Denied
23. Confidentiality Ceiling Denied
24. Revoke Share
25. Revoked Share Download Denied
26. Expired Share Download Denied
27. Quarantined File Denied
28. Delete File Permission
29. Deleted File Denied
30. Arcana Data Room Secure File Integration
31. Mobile Secure Storage
```

Required:

```text
31/31 PASS
```

---

# 35. Required Visual Regression — 12/12

```text
Secure Storage Overview
Upload Preflight
Upload Progress
Secure File List
Secure File Detail
Version History
Share Grant Form
Share Grant List
Download Denied
Confidential File State
HIGHLY_CONFIDENTIAL Warning
Mobile Secure Storage
```

Required:

```text
12/12 PASS
Desktop 1440×900
Mobile 390×844
Unexpected changes: 0
```

---

# 36. Sensitive Persistence / Static Asset / Secret Gates

Browser persistence:

```text
localStorage sensitive binary:   0
sessionStorage sensitive binary: 0
IndexedDB sensitive binary:      0
Cache Storage sensitive binary:  0
```

Production static output:

```text
INTERNAL binaries in dist:          0
CONFIDENTIAL binaries in dist:      0
HIGHLY_CONFIDENTIAL binaries:       0
```

Secret scan:

```text
Repository private keys:         0
Service account JSON:            0
Firebase Admin private keys:     0
Storage access tokens:           0
Signed URL secrets:              0
AI provider keys:                0
Production bundle secrets:       0
```

---

# 37. Browser Runtime Gate

Required:

```text
Critical console errors: 0
Unhandled exceptions:    0
Critical asset 404s:     0
```

Handled authorization/storage denials are valid application states.

---

# 38. Regression Gate

Required:

```text
Phase 009 Secure Storage             PASS
Phase 008 Security/RBAC              PASS
Phase 007 Data Room                  PASS
Phase 006 AI Copilot                 PASS
Phase 005 Presenter                  PASS
Phase 004 Presentation               PASS
Phase 003 Claims/Evidence            PASS
Phase 002 Narrative                  PASS
Phase 001 Project Twin               PASS
Phase 000A Hexagonal                 PASS
Phase 0 Legacy                       45/45 PASS minimum
```

---

# 39. Acceptance Criteria

```text
AC-009-001 Private Storage
AC-009-002 Authenticated Storage
AC-009-003 Organization Isolation
AC-009-004 Project Isolation
AC-009-005 Explicit Operation Permissions
AC-009-006 Confidentiality Enforcement
AC-009-007 Fail Closed
AC-009-008 Controlled Upload
AC-009-009 Trusted Finalization
AC-009-010 Immutable Versions
AC-009-011 Controlled Download
AC-009-012 Authenticated Sharing
AC-009-013 Revocation
AC-009-014 Expiration
AC-009-015 Share Scope Enforcement
AC-009-016 Confidentiality Ceiling
AC-009-017 Storage/Share Audit
AC-009-018 No Auto-Evidence
AC-009-019 No Claim-Support Mutation
AC-009-020 No Sensitive Browser Persistence
AC-009-021 Arcana Pilot
AC-009-022 Prior-Phase Regression
```

Every acceptance criterion must map to implementation and verification evidence in `SPEC_009_TRACEABILITY_MATRIX.md`.

---

# 40. Forbidden Scope Audit

Final verification MUST explicitly state:

```text
Anonymous Public File Sharing:          NOT IMPLEMENTED
Password-Only Public Shares:            NOT IMPLEMENTED
Unrestricted Signed Download URLs:      NOT IMPLEMENTED
Public Storage Bucket:                  NOT IMPLEMENTED
Public Object ACLs:                     NOT IMPLEMENTED

General-Purpose Backend API:            NOT IMPLEMENTED
Document Editing:                       NOT IMPLEMENTED
Collaborative Authoring:                NOT IMPLEMENTED
Full-Content Search Indexing:            NOT IMPLEMENTED
Guaranteed Malware Scanning Service:    NOT IMPLEMENTED

Canonical Project Twin Migration:       NOT IMPLEMENTED
Canonical Claims Migration:             NOT IMPLEMENTED
Canonical Evidence Migration:           NOT IMPLEMENTED

AI File Classification Auto-Write:      NOT IMPLEMENTED
AI Evidence Creation:                   NOT IMPLEMENTED
AI Claim Verification:                  NOT IMPLEMENTED
AI Security Decisions:                  NOT IMPLEMENTED

External Web Research:                  NOT IMPLEMENTED
PPTX Export:                            NOT IMPLEMENTED
PDF Export:                             NOT IMPLEMENTED
```

Authorized and expected:

```text
Firebase Storage:                       IMPLEMENTED
Storage Security Rules:                 IMPLEMENTED
Secure Upload:                          IMPLEMENTED
Secure Download:                        IMPLEMENTED
Authenticated Controlled Sharing:       IMPLEMENTED
File Versioning:                        IMPLEMENTED
Storage Audit:                          IMPLEMENTED
```

---

# 41. Definition of Done

Phase 009 may become `CODE_COMPLETE` only when secure-storage domain, Firebase Storage adapter, Storage Rules, upload/finalization, download, versioning, ShareGrants, revocation/expiration, audit, Data Room integration, Arcana pilot, and browser/static security gates exist.

Phase 009 becomes `VERIFIED` only if all of the following pass:

```text
TYPECHECK                                PASS
ARCHITECTURE                             PASS
SECURE STORAGE DOMAIN                    PASS
PERMISSION CATALOG 1.1                   PASS
STORAGE AUTHORIZATION                    PASS
STORAGE RULES                            27/27 PASS
UPLOAD POLICY                            PASS
UPLOAD FINALIZATION                      PASS
DOWNLOAD AUTHORIZATION                   PASS
FILE VERSIONING                          PASS
SHARE GRANT GOVERNANCE                   PASS
SHARE REVOCATION                         PASS
SHARE EXPIRATION                         PASS
CONFIDENTIALITY CEILING                  PASS
TRUSTED STORAGE COMMANDS                 PASS
STORAGE AUDIT                            PASS
NO AUTO-EVIDENCE                         PASS
NO CLAIM SUPPORT MUTATION                PASS
PROJECT TWIN IMMUTABILITY                PASS
CLAIMS/EVIDENCE IMMUTABILITY             PASS
SENSITIVE BROWSER PERSISTENCE             PASS
PRODUCTION STATIC ASSET SCAN              PASS
SECRET SCAN                               PASS
ARCANA SECURE STORAGE PILOT               PASS
SECURE STORAGE E2E                        31/31 PASS
VISUAL REGRESSION                         12/12 PASS
THREAT MODEL T-16..T-30                  PASS
PHASE 008 REGRESSION                      PASS
PHASE 007 REGRESSION                      PASS
PHASE 006 REGRESSION                      PASS
PHASE 005 REGRESSION                      PASS
PHASE 004 REGRESSION                      PASS
PHASE 003 REGRESSION                      PASS
PHASE 002 REGRESSION                      PASS
PHASE 001 REGRESSION                      PASS
PHASE 000A REGRESSION                     PASS
PHASE 0 LEGACY                            45/45 PASS
STATIC/WEB DELIVERY                       PASS
BROWSER RUNTIME                           PASS
FORBIDDEN SCOPE                           PASS
```

Only the human owner may set `CLOSED`.

---

# 42. Required Documentation

Create:

```text
docs/storage/SECURE_STORAGE_DOMAIN_MODEL.md
docs/storage/STORAGE_PATH_REFERENCE.md
docs/storage/STORAGE_SECURITY_RULES_REFERENCE.md
docs/storage/UPLOAD_GOVERNANCE.md
docs/storage/FILE_VERSIONING_REFERENCE.md
docs/storage/CONTROLLED_SHARING_REFERENCE.md
docs/storage/STORAGE_AUTHORIZATION_POLICY.md
docs/storage/STORAGE_AUDIT_REFERENCE.md
docs/storage/SENSITIVE_BROWSER_PERSISTENCE_POLICY.md

docs/evidence/ARCANA_SECURE_STORAGE_PILOT_REPORT.md
docs/evidence/SPEC_009_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_009_VERIFICATION_REPORT.md
```

Extend:

```text
docs/security/SECURITY_THREAT_MODEL.md
```

with `T-16..T-30`.

---

# 43. Recommended ADRs

```text
ADR-0077 Firebase Storage as Private Binary Content Plane
ADR-0078 Tenant-Encoded Immutable Storage Paths
ADR-0079 Firestore Metadata as Storage Authorization Source
ADR-0080 Direct Authenticated Upload with Trusted Finalization
ADR-0081 Immutable File Version Objects
ADR-0082 Authenticated Revocable Share Grants
ADR-0083 No Anonymous Public Sharing
ADR-0084 Confidentiality Ceiling for External Reviewers
ADR-0085 No Auto-Evidence from File Upload
ADR-0086 Sensitive Browser Persistence Prohibited
ADR-0087 Secure Storage Does Not Migrate Canonical Project Truth
```

---

# 44. Required Verification Report

Generate:

```text
docs/evidence/PHASE_009_VERIFICATION_REPORT.md
```

It must include:

```text
Identification
secureStoragePolicyVersion
permissionCatalogVersion
storageUploadPolicyVersion
Firebase environment
Storage Rules version/hash
Functions version

Domain matrix
Storage Rules 27/27 individual breakdown
Trusted command matrix
Upload cases
Download cases
ShareGrant cases
Versioning cases
Audit cases
Arcana pilot
Sensitive browser persistence scan
Production static asset scan
Secret scan
E2E 31/31 individual breakdown
Visual 12/12 individual breakdown
Threat Model T-16..T-30
All prior phase regressions
Browser runtime
Forbidden scope
```

Final recommendation may only be:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

---

# 45. SDD State Machine

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

# 46. Change Control

Any proposal to introduce anonymous public sharing, password-only share pages, long-lived signed URLs, public buckets, general-purpose backend APIs, malware-scanning vendors, full-content indexing, or external sharing without authenticated identity requires:

```text
docs/specs/changes/CHANGE_REQUEST_009_XXX.md
```

---

# 47. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-009 — Secure Storage & Controlled Data Room Sharing`

under:

`SPEC-009 — Secure Storage & Controlled Data Room Sharing`

Previous phase:

`VHOS-PHASE-008 — Security, Authentication, RBAC & Audit`

is approved CLOSED.

## PRIMARY OBJECTIVE

Implement a secure private file plane using:

```text
Firebase Storage
Storage Security Rules
Firebase Auth
Firestore security metadata
Existing RBAC
Trusted storage commands
Authenticated revocable ShareGrants
```

while preserving canonical venture governance.

## NON-NEGOTIABLE RULES

```text
FILE EXISTENCE ≠ FILE ACCESS
AUTHENTICATED ≠ AUTHORIZED
DocumentArtifact ≠ FileRecord ≠ Evidence
NO ANONYMOUS PUBLIC SHARING
```

## BEFORE CODE

You MUST:

1. read Phase 007 and Phase 008;
2. run the complete baseline;
3. inventory current Data Room assets;
4. inventory public/static assets;
5. inventory current roles/permissions;
6. inventory Firebase Storage configuration;
7. extend threat model `T-16..T-30`;
8. map all work to `T-009-*`;
9. document migration plan.

Start with secure-storage domain and Storage Rules. Do NOT start with UI.

## IMPLEMENTATION ORDER

```text
Threat Model Extension
→ Secure Storage Domain
→ Permission Catalog 1.1
→ Storage Authorization
→ Firebase Storage Adapter
→ Storage Rules
→ Upload Lifecycle
→ Trusted Finalization
→ Secure Download
→ File Versioning
→ Controlled Share Grants
→ Audit
→ Data Room Integration
→ Arcana Pilot
→ UI
→ Verification
```

## REQUIRED STORAGE GATES

```text
Storage Rules:       27/27 PASS
Secure Storage E2E:  31/31 PASS
Visual Regression:   12/12 PASS
```

Report every case individually.

## REQUIRED SECURITY GATES

```text
No non-public binary in public dist
No sensitive binary in browser persistent storage/cache
No public bucket
No anonymous sharing
No long-lived signed URL bypass
No auto-Evidence
No ClaimSupportStatus mutation
No Project Twin mutation
```

## REQUIRED OUTPUT

Create:

```text
docs/evidence/PHASE_009_VERIFICATION_REPORT.md
docs/evidence/SPEC_009_TRACEABILITY_MATRIX.md
docs/evidence/ARCANA_SECURE_STORAGE_PILOT_REPORT.md
```

Extend:

```text
docs/security/SECURITY_THREAT_MODEL.md
```

Final recommendation only:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

Do NOT mark Phase 009 CLOSED.
Do NOT start Phase 010.

---

# 48. Expected End State

```text
                        VENTURE HUB OS
                              │
                      FIREBASE AUTH
                              │
                              ▼
                       SECURITY CONTEXT
                              │
                              ▼
                           RBAC 1.1
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
         FIRESTORE CONTROL           FIREBASE STORAGE
              PLANE                  PRIVATE FILE PLANE
                 │                         │
                 └────────────┬────────────┘
                              ▼
                    STORAGE AUTHORIZATION
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
          UPLOAD           DOWNLOAD          SHARE
             │                │                │
             ▼                ▼                ▼
        FILE VERSION      AUTH CHECK      SHARE GRANT
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                       APPEND-ONLY AUDIT
```

After Phase 009:

```text
Authentication                           ✅
Organization Isolation                   ✅
Project RBAC                             ✅
Security Audit                           ✅
Private Binary Storage                   ✅
Secure Upload                            ✅
Secure Download                          ✅
File Versioning                          ✅
Authenticated Controlled Sharing         ✅
Share Revocation                         ✅
Share Expiration                         ✅
Confidentiality Ceiling                  ✅
Public Sensitive Asset Exposure          ✅ 0
AI Canonical Auto-Write                  ✅ prohibited

Anonymous Public Sharing                 ❌
Password-Only Share Links                ❌
Public Bucket                            ❌
Canonical Project Migration              ❌
```

---

# 49. Exit Decision

If every mandatory gate passes:

> **Apruebo formalmente VHOS-PHASE-009 — Secure Storage & Controlled Data Room Sharing bajo SPEC-009 como VERIFIED/CLOSED y autorizo el inicio de VHOS-PHASE-010, manteniendo la arquitectura Feature-Oriented Hexagonal, el almacenamiento privado multi-tenant, la autorización fail-closed, el versionado inmutable, el sharing autenticado y revocable, la auditoría application-level append-only y la separación estricta entre archivos, Documents, Evidence, Claims y verdad canónica del Project Twin.**
