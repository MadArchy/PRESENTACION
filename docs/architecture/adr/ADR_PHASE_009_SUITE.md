# Architecture Decision Records: Phase 009 Suite (ADR-0077 .. ADR-0087)

**Specification:** `SPEC-009 — Secure Storage & Controlled Data Room Sharing`  
**Status:** `ACCEPTED / VERIFIED`  
**Date:** `2026-08-26`  

---

### ADR-0077: Tenant-Scoped Private Binary Storage Topology
- **Context:** Due diligence documents contain sensitive commercial and technical information that must be isolated across organizations and projects.
- **Decision:** Enforce a rigid path layout: `organizations/{organizationId}/projects/{projectId}/data-room/{fileId}/versions/{versionId}/{fileName}`. Disallow root-level and cross-tenant paths in `storage.rules`.
- **Consequences:** Hard isolation per tenant, predictable path matching, seamless integration with IAM and Firestore security rules.

### ADR-0078: Two-Phase Upload Protocol
- **Context:** Direct client writes to production databases can cause orphaned records or bypass policy validations.
- **Decision:** Implement a two-phase protocol: (1) `CreateUploadIntent` validates media type and size constraints and records an intent; (2) `FinalizeUpload` trusted backend function verifies upload and commits `FileRecord` and `FileVersion`.
- **Consequences:** Client never writes directly to metadata collections; upload anomalies fail safely.

### ADR-0079: Immutable Version History and Lineage
- **Context:** Due diligence audits require proving exact historical document versions without accidental in-place overwrites.
- **Decision:** Storage rules forbid object updates (`allow update: if false;`). Every file update generates a new `FileVersionEntity` with incrementing version number, marking previous versions `SUPERSEDED`.
- **Consequences:** Full auditability, non-repudiation of past versions, zero risk of overwrite tampering.

### ADR-0080: Declarative Storage Security Rules Matrix
- **Context:** Binary downloads must be protected at the storage engine level against direct URL access.
- **Decision:** Deploy declarative Firebase Storage security rules verifying active Firebase Auth, active UserProfile, active OrganizationMembership, and valid project assignment via live Firestore lookups.
- **Consequences:** Zero unauthorized binary exfiltration even if client UI is bypassed.

### ADR-0081: Fail-Closed Storage Authorization Service
- **Context:** Complex access checks (confidentiality, share grants, user status) require deterministic evaluation.
- **Decision:** Implement `StorageAuthorizationService` returning one of 21 explicit reason codes, failing closed on any ambiguity or missing permission.
- **Consequences:** High observability and granular denial reasons for audit and debugging.

### ADR-0082: Identity-Bound Controlled Sharing via ShareGrants
- **Context:** Sharing Data Room files with external investors/auditors must not rely on insecure anonymous links or public bucket permissions.
- **Decision:** All sharing requires authenticated identity, `EXTERNAL_REVIEWER` project role, and an active `ShareGrantEntity` record with explicit file scope and expiry.
- **Consequences:** Full attribution, immediate revocability, zero anonymous leaks.

### ADR-0083: Confidentiality Ceilings on Share Grants
- **Context:** External reviewers should not be exposed to highly confidential material unless specifically authorized.
- **Decision:** Every `ShareGrantEntity` defines a `confidentialityCeiling`. Documents exceeding this ceiling are denied regardless of scope.
- **Consequences:** Granular risk management for multi-party diligence.

### ADR-0084: Ephemeral In-Memory Client Delivery
- **Context:** Storing sensitive files in browser caches or web storage risks exposure on shared or compromised devices.
- **Decision:** Deliver document streams strictly in-memory (ephemeral Blob/ArrayBuffer). Prohibit saving binaries to `localStorage`, `sessionStorage`, or `IndexedDB`.
- **Consequences:** Zero persistent disk artifact footprint on client machines.

### ADR-0085: Server-Side File Governance (Quarantine & Deletion)
- **Context:** Malicious or compromised files must be instantly quarantined without losing audit evidence.
- **Decision:** Quarantine and delete operations are restricted to trusted backend functions (`QuarantineFile`, `RestoreQuarantinedFile`, `DeleteSecureFile`). Quarantined files return `FILE_QUARANTINED` on read.
- **Consequences:** Immediate containment with preserved version records.

### ADR-0086: Unified Storage and Access Audit Logging
- **Context:** Compliance frameworks require tracking both administrative mutations and binary download events.
- **Decision:** Emit append-only structured audit records to `organizations/{orgId}/auditEvents` for every storage lifecycle event and download request.
- **Consequences:** Comprehensive compliance trail and non-repudiation.

### ADR-0087: Domain Boundary Preservation
- **Context:** Avoid coupling the binary storage subsystem directly to the core Project Twin or governance layers.
- **Decision:** Maintain absolute separation: `DocumentArtifact ≠ FileRecord ≠ Evidence`. Uploading a file never mutates Project Twin state, creates Evidence, or changes Claim status.
- **Consequences:** Architectural clean boundaries and independent evolvability.
