# Venture Hub OS — Phase 007: Due Diligence Data Room

**Document ID:** `VHOS-PHASE-007`  
**Specification:** `SPEC-007 — Due Diligence Data Room`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-006 — AI Copilot`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Deployment Model:** Web-first / Static Hosting  
**Canonical Persistence:** Static JSON + repository-managed document assets  
**AI Runtime:** AVAILABLE through Phase 006 ports/adapters, READ-ONLY by default  
**Canonical Auto-Write by AI:** FORBIDDEN  
**Backend Services:** NOT AUTHORIZED  
**Firebase Runtime Services:** NOT AUTHORIZED  
**Authentication / RBAC:** NOT AUTHORIZED in Phase 007  
**Cloud File Upload:** NOT AUTHORIZED  
**Secure External Sharing:** NOT AUTHORIZED  
**Recommended Next Phase:** `VHOS-PHASE-008 — Security, RBAC & Audit`

---

# 1. Executive Purpose

Phase 007 introduces the due diligence intelligence layer of Venture Hub OS:

> **Due Diligence Data Room**

The platform already contains:

```text
PROJECT TWIN
      ↓
NARRATIVE ENGINE
      ↓
CLAIMS & EVIDENCE
      ↓
PRESENTATION ENGINE
      ↓
PRESENTER COCKPIT
      ↓
AI COPILOT
```

Phase 007 adds a governed diligence workspace:

```text
PROJECT TWIN
      │
      ├── CLAIMS
      ├── EVIDENCE
      ├── RISKS
      ├── FINANCIALS
      ├── TECHNOLOGY
      └── CORPORATE / LEGAL MATERIAL
                │
                ▼
       DUE DILIGENCE DATA ROOM
                │
     ┌──────────┼───────────┐
     ▼          ▼           ▼
 DOCUMENTS   COVERAGE      GAPS
     │          │           │
     └──────────┼───────────┘
                ▼
      DILIGENCE READINESS
```

The purpose is not to create a generic file folder.

The purpose is to make diligence material:

- structured;
- classified;
- traceable;
- connected to Claims & Evidence;
- connected to Project Twin sections;
- reviewable;
- gap-aware;
- decision-ready.

---

# 2. Important Security Limitation

Phase 007 remains:

```text
STATIC WEB
NO AUTH
NO RBAC
NO BACKEND
NO CLOUD STORAGE
```

Therefore:

> **Phase 007 MUST NOT present itself as a production-grade secure confidential data room.**

The correct product description during this phase is:

```text
Due Diligence Workspace
Static Data Room Prototype
Governed Diligence Repository
```

not:

```text
Secure Investor Data Room
Confidential Sharing Platform
Enterprise VDR
```

Production confidentiality, user permissions, access logs, secure external sharing, watermarking by user, and organization-level isolation require a later security phase.

---

# 3. Governing Principle

A document being present in the Data Room does NOT mean:

```text
verified
approved
current
legally sufficient
evidence-supported
```

Each artifact SHALL carry explicit governance metadata.

The Data Room SHALL help answer:

```text
What documents exist?
What do they support?
Which claims rely on them?
Which diligence categories are covered?
Which requests remain open?
Which documents are stale or missing?
Which areas block diligence readiness?
```

---

# 4. Product Thesis

Traditional data rooms are often:

```text
folders
subfolders
PDFs
spreadsheets
contracts
```

with limited semantic connection.

Venture Hub OS SHALL model:

```text
Document
   ↓
Category
   ↓
Project Section
   ↓
Claim / Evidence
   ↓
Diligence Request
   ↓
Coverage / Gap
   ↓
Readiness
```

The system becomes a diligence intelligence layer rather than only file storage.

---

# 5. Primary Outcome

At the end of Phase 007, Venture Hub OS SHALL support:

1. a canonical DataRoom model;
2. document metadata;
3. document classification;
4. document lifecycle;
5. confidentiality labels;
6. document-to-Evidence links;
7. document-to-Claim links;
8. document-to-ProjectSection links;
9. diligence categories;
10. diligence checklist;
11. diligence requests;
12. gap tracking;
13. coverage matrix;
14. diligence readiness;
15. stale/missing/superseded document detection;
16. Arcana Data Room pilot;
17. Data Room UI;
18. read-only AI Copilot analysis over explicitly selected diligence context;
19. zero AI canonical writes;
20. complete regression and verification.

---

# 6. Architectural Mandate

Create:

```text
src/modules/data-room/
```

Recommended structure:

```text
src/modules/data-room/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── policies/
│   ├── services/
│   ├── ports/
│   ├── events/
│   └── errors/
│
├── application/
│   ├── commands/
│   ├── queries/
│   └── use-cases/
│
├── adapters/
│   ├── json/
│   └── static-assets/
│
└── tests/
```

UI:

```text
src/ui/data-room/
```

---

# 7. Dependency Direction

Preserve:

```text
UI
 ↓
Application
 ↓
Domain
```

Data Room domain MUST NOT depend directly on:

- DOM;
- CSS;
- browser globals;
- Firebase;
- provider SDKs;
- AI adapters;
- legacy runtime;
- concrete JSON paths;
- file-system-specific runtime APIs.

---

# 8. Integration Boundaries

Data Room MAY consume stable read-only contracts from:

```text
Project Twin
Claims
Evidence
Trust
AI Copilot
```

through explicit mappers/application boundaries.

Data Room SHALL NOT directly invoke:

```text
NarrativeCompiler internals
PresentationCompiler internals
Copilot provider adapters
Firebase
```

---

# 9. Canonical Data Room Boundary

The Data Room SHALL NOT replace:

```text
Project Twin
Claims
Evidence
```

It organizes due diligence artifacts around them.

Required relationship:

```text
DocumentArtifact
   ├── may link to Evidence
   ├── may link to Claims
   ├── may link to Project Sections
   └── may satisfy Diligence Requests
```

---

# 10. DataRoom Entity

Conceptual:

```ts
interface DataRoom {
  id: string;
  projectId: string;
  projectVersion: string;

  schemaVersion: string;

  name: string;
  status: DataRoomStatus;

  categories: DiligenceCategory[];
  documentIds: string[];
  requestIds: string[];

  policyVersion: string;
}
```

---

# 11. DataRoomStatus

Required:

```text
DRAFT
ACTIVE
ARCHIVED
```

`ACTIVE` does not imply secure sharing.

---

# 12. DocumentArtifact

A `DocumentArtifact` is a due diligence document record.

It is not necessarily canonical Evidence.

Conceptual:

```ts
interface DocumentArtifact {
  id: string;

  projectId: string;
  projectVersion: string;

  title: string;
  description?: string;

  kind: DocumentKind;
  category: DiligenceCategoryType;

  status: DocumentStatus;
  confidentiality: ConfidentialityLevel;

  source: DocumentSource;
  assetRef?: string;

  issuedAt?: string;
  effectiveAt?: string;
  expiresAt?: string;
  reviewedAt?: string;

  owner?: string;

  projectSectionRefs: string[];
  claimRefs: string[];
  evidenceRefs: string[];
  requestRefs: string[];

  tags: string[];

  sourceRefs: SourceReference[];

  createdAt: string;
  updatedAt: string;
}
```

---

# 13. DocumentArtifact Invariants

At minimum:

1. ID required.
2. Project ID required.
3. Project version required.
4. Title required.
5. Kind valid.
6. Category valid.
7. Status valid.
8. Confidentiality valid.
9. Referenced Claims must resolve within same project/version unless explicitly historical.
10. Evidence refs must resolve.
11. Section refs must resolve.
12. Request refs must resolve.
13. Missing asset SHALL not crash metadata registry.
14. SUPERSEDED document SHALL not count as current positive coverage.
15. INVALID document SHALL not count as current positive coverage.
16. EXPIRED document SHALL not satisfy freshness-sensitive requests.
17. Document presence SHALL not auto-create Evidence.
18. Document presence SHALL not auto-mark Claim SUPPORTED.

---

# 14. DocumentKind

Required:

```text
CORPORATE
LEGAL
FINANCIAL
TAX
COMMERCIAL
CUSTOMER
MARKET
PRODUCT
TECHNICAL
SECURITY
IP
REGULATORY
TEAM
HR
OPERATIONS
RISK
INSURANCE
CONTRACT
POLICY
REPORT
MODEL
DATASET
OTHER
```

---

# 15. DiligenceCategoryType

Required:

```text
CORPORATE
LEGAL
FINANCIAL
TAX
COMMERCIAL
CUSTOMER
MARKET
PRODUCT
TECHNOLOGY
SECURITY
INTELLECTUAL_PROPERTY
REGULATORY
TEAM_HR
OPERATIONS
RISK_INSURANCE
ESG
```

A document may have one primary category and optional tags.

Do not over-model secondary category relationships in Phase 007 unless necessary.

---

# 16. DocumentStatus

Required:

```text
AVAILABLE
MISSING
DRAFT
UNDER_REVIEW
CURRENT
SUPERSEDED
EXPIRED
DISPUTED
INVALID
```

Recommended interpretation:

```text
CURRENT
→ valid/current document available
```

```text
AVAILABLE
→ file exists but currentness/review state not fully established
```

```text
MISSING
→ expected but unavailable
```

---

# 17. ConfidentialityLevel

Required labels:

```text
PUBLIC
INTERNAL
CONFIDENTIAL
HIGHLY_CONFIDENTIAL
```

Important:

> These are metadata labels only in Phase 007.

They DO NOT enforce access control.

UI SHALL display a warning when opening Data Room:

```text
Confidentiality labels are informational.
Access control is not implemented in this phase.
```

---

# 18. DocumentSource

Required source modes:

```text
REPOSITORY_ASSET
PROJECT_SOURCE
EVIDENCE_SOURCE
EXTERNAL_REFERENCE
MANUAL_METADATA
```

`EXTERNAL_REFERENCE` may refer to a source identifier or location already known to the project.

Phase 007 SHALL NOT fetch arbitrary external documents from the web.

---

# 19. Static Asset Model

Preferred static organization:

```text
data/projects/{projectId}/data-room/
├── data-room.manifest.json
├── documents.json
├── requests.json
├── checklist.json
└── assets/
```

If binary assets are already in repository, `assetRef` may reference them.

Do NOT require adding sensitive real-world documents to the repository merely to satisfy the pilot.

---

# 20. No Sensitive Pilot Requirement

For Arcana pilot:

- use existing repository-safe artifacts;
- use metadata-only placeholders when a diligence document is expected but unavailable;
- mark unavailable artifacts as `MISSING`;
- do not fabricate confidential contracts or legal documents.

---

# 21. DiligenceRequest

A DiligenceRequest represents an information/document request.

Conceptual:

```ts
interface DiligenceRequest {
  id: string;

  projectId: string;
  projectVersion: string;

  category: DiligenceCategoryType;

  title: string;
  description?: string;

  priority: DiligencePriority;
  status: DiligenceRequestStatus;

  requiredDocumentKinds: DocumentKind[];

  linkedDocumentIds: string[];
  linkedClaimIds: string[];
  linkedEvidenceIds: string[];

  freshnessRule?: FreshnessRule;

  createdAt: string;
  updatedAt: string;
}
```

---

# 22. DiligenceRequestStatus

Required:

```text
OPEN
PARTIALLY_SATISFIED
SATISFIED
BLOCKED
NOT_APPLICABLE
```

---

# 23. DiligencePriority

Required:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Priority represents diligence importance.

---

# 24. Request Satisfaction Rule

Request status SHALL be deterministic.

Example:

```text
No valid linked document
→ OPEN
```

```text
Some required material present
→ PARTIALLY_SATISFIED
```

```text
All mandatory requirements satisfied
→ SATISFIED
```

```text
Required document known unavailable / blocking issue
→ BLOCKED
```

---

# 25. FreshnessRule

Conceptual:

```ts
interface FreshnessRule {
  maxAgeDays?: number;
  mustBeCurrent?: boolean;
  expiresAtRequired?: boolean;
}
```

No need to create complex legal calendar logic.

---

# 26. Document Freshness

Create deterministic:

```text
DocumentFreshnessEvaluator
```

Possible result:

```text
CURRENT
AGING
STALE
EXPIRED
UNKNOWN
```

---

# 27. Freshness is Not Validity

A recent document can still be:

```text
DISPUTED
INVALID
```

Freshness and validity remain separate.

---

# 28. DiligenceChecklist

A Checklist defines expected diligence material by project context.

Conceptual:

```ts
interface DiligenceChecklist {
  id: string;
  version: string;

  projectType?: string;

  items: DiligenceChecklistItem[];
}
```

---

# 29. DiligenceChecklistItem

Conceptual:

```ts
interface DiligenceChecklistItem {
  id: string;

  category: DiligenceCategoryType;

  title: string;
  description?: string;

  priority: DiligencePriority;

  expectedDocumentKinds: DocumentKind[];

  evidenceRequired?: boolean;
  claimCoverageRequired?: boolean;

  freshnessRule?: FreshnessRule;
}
```

---

# 30. Checklist Versioning

Required:

```text
checklistVersion
```

No checklist shall be silently updated without version change.

---

# 31. Required Default Checklist

Create:

```text
STANDARD_VENTURE_DILIGENCE
```

version:

```text
1.0
```

It SHALL cover:

```text
Corporate
Legal
Financial
Tax
Commercial
Customer
Market
Product
Technology
Security
IP
Regulatory
Team/HR
Operations
Risk/Insurance
```

ESG may be optional depending on project relevance.

---

# 32. Checklist Scope Warning

The checklist is a product workflow, not legal advice.

Documentation SHALL state:

> The standard checklist is a project diligence aid and does not replace jurisdiction-specific legal, tax, financial, regulatory, or investment advice.

---

# 33. Coverage Model

Create deterministic:

```text
DiligenceCoverage
```

Coverage SHALL include:

```text
by category
by checklist item
by request
by Claim
by Evidence
by Project Section
```

---

# 34. Category Coverage

Conceptual:

```ts
interface CategoryCoverage {
  category: DiligenceCategoryType;

  requiredItems: number;
  satisfiedItems: number;
  partialItems: number;
  openItems: number;
  blockedItems: number;

  currentDocuments: number;
  staleDocuments: number;
  missingDocuments: number;
}
```

---

# 35. No Opaque Diligence Score

Do NOT create:

```text
Diligence Score = 83
```

as the only result.

Coverage and readiness SHALL expose explicit reasons.

A percentage MAY be shown as a secondary metric if calculated transparently.

---

# 36. DiligenceGap

Required:

```ts
interface DiligenceGap {
  id: string;

  category: DiligenceCategoryType;
  type: DiligenceGapType;

  severity: DiligenceGapSeverity;

  title: string;
  explanation: string;

  relatedRequestIds: string[];
  relatedClaimIds: string[];
  relatedEvidenceIds: string[];
  relatedDocumentIds: string[];

  remediationHint?: string;
}
```

---

# 37. DiligenceGapType

Required:

```text
MISSING_DOCUMENT
STALE_DOCUMENT
INVALID_DOCUMENT
DISPUTED_DOCUMENT
MISSING_EVIDENCE
UNSUPPORTED_MATERIAL_CLAIM
OPEN_REQUEST
INCOMPLETE_CATEGORY
MISSING_SOURCE_REFERENCE
VERSION_MISMATCH
```

---

# 38. DiligenceGapSeverity

Required:

```text
INFO
LOW
MEDIUM
HIGH
BLOCKING
```

---

# 39. Diligence Readiness

Required:

```text
DILIGENCE_READY
DILIGENCE_READY_WITH_WARNINGS
DILIGENCE_NOT_READY
```

---

# 40. Default Readiness Rules

Recommended:

```text
Any BLOCKING gap
→ DILIGENCE_NOT_READY
```

```text
Any CRITICAL/HIGH priority request BLOCKED
→ DILIGENCE_NOT_READY
```

```text
Any CRITICAL material FACT unsupported
→ DILIGENCE_NOT_READY
```

```text
Open HIGH priority items
→ DILIGENCE_READY_WITH_WARNINGS
```

```text
No blocking issues
→ DILIGENCE_READY
```

Exact policy SHALL be versioned and documented.

---

# 41. Readiness Policy Version

Required:

```text
diligencePolicyVersion = "1.0"
```

---

# 42. Readiness Explanation

Required:

```ts
interface DiligenceReadinessExplanation {
  readiness: DiligenceReadiness;
  reasonCodes: string[];
  blockingGapIds: string[];
  warningGapIds: string[];
  message: string;
}
```

No black-box state.

---

# 43. Claim Coverage Integration

Data Room SHALL show:

```text
Material Claims
→ linked documents
→ linked evidence
→ support status
```

It SHALL NOT recalculate ClaimSupportStatus.

Phase 003 remains canonical for claim support.

---

# 44. Evidence Integration

A DataRoomDocument MAY link to one or more existing Evidence entities.

But:

```text
DocumentArtifact
≠ Evidence
```

unless an explicit existing evidence object references that source.

---

# 45. Document-to-Evidence Rule

The Data Room SHALL NEVER auto-create Evidence solely because a document exists.

Instead expose:

```text
Document present
Evidence link absent
```

as a potential governance gap.

---

# 46. Unsupported Material Claim Gap

If a material Claim is:

```text
UNSUPPORTED
```

and relevant to diligence, Data Room may create:

```text
DiligenceGapType = UNSUPPORTED_MATERIAL_CLAIM
```

This is derived from Phase 003 state.

---

# 47. Risk Integration

Project risks MAY be mapped into diligence categories.

Risk data remains owned by Project Twin/Claims or future risk module.

Data Room exposes coverage only.

---

# 48. Version Integrity

Every Data Room artifact SHALL include:

```text
projectVersion
```

Cross-version mixing MUST be explicit.

---

# 49. Version Mismatch Gap

If current ProjectVersion references a document tied only to older incompatible project version:

```text
VERSION_MISMATCH
```

warning/gap SHALL be created.

---

# 50. Supersession

DocumentArtifact SHOULD support:

```text
supersedesDocumentId
supersededByDocumentId
```

if useful.

Do not require full document version-control system.

---

# 51. Document Version Metadata

Recommended:

```text
documentVersion
```

string.

No semantic version requirement.

---

# 52. Repository Ports

Required:

```ts
export interface DataRoomRepository {
  getByProject(
    projectId: string,
    projectVersion: string
  ): Promise<DataRoom | null>;
}
```

```ts
export interface DataRoomDocumentRepository {
  listByProject(
    projectId: string,
    projectVersion: string
  ): Promise<DocumentArtifact[]>;

  findById(id: string): Promise<DocumentArtifact | null>;
}
```

```ts
export interface DiligenceRequestRepository {
  listByProject(
    projectId: string,
    projectVersion: string
  ): Promise<DiligenceRequest[]>;

  findById(id: string): Promise<DiligenceRequest | null>;
}
```

```ts
export interface DiligenceChecklistRepository {
  findById(id: string): Promise<DiligenceChecklist | null>;
}
```

---

# 53. Static Adapters

Required:

```text
JsonDataRoomRepository
JsonDataRoomDocumentRepository
JsonDiligenceRequestRepository
JsonDiligenceChecklistRepository
```

UI MUST NOT import JSON directly.

---

# 54. Asset Resolution Port

Recommended:

```ts
export interface DataRoomAssetResolver {
  resolve(assetRef: string): Promise<DataRoomAssetResolution>;
}
```

It SHALL expose:

```text
AVAILABLE
MISSING
UNSUPPORTED
```

without domain knowing static path mechanics.

---

# 55. No File Upload

Phase 007 SHALL NOT implement:

```text
cloud upload
server upload
signed upload URLs
object storage
```

A future security/storage phase may authorize this.

---

# 56. Optional Local File Inspection

Browser-local file selection is NOT required.

If implemented, it must remain session-local and SHALL NOT claim persistence.

Prefer avoiding it in Phase 007 unless necessary.

---

# 57. Application Use Cases

Required:

```text
GetDataRoom
ListDataRoomDocuments
GetDataRoomDocument
ListDiligenceRequests
GetDiligenceRequest
EvaluateDiligenceRequest
EvaluateDataRoomCoverage
EvaluateDiligenceGaps
BuildDiligenceReadiness
GetClaimDiligenceCoverage
GetEvidenceDiligenceCoverage
```

Recommended:

```text
InspectDiligenceCategory
```

---

# 58. Data Room Dashboard

Required UI route:

```text
/data-room/:projectId
```

or equivalent static-compatible route.

---

# 59. Data Room UI Sections

Minimum:

```text
Overview
Documents
Categories
Requests
Coverage
Gaps
Readiness
Claims & Evidence Links
```

---

# 60. Overview

Display:

```text
Data Room status
Project version
Checklist version
Policy version

Documents:
Current
Available
Missing
Stale
Expired
Invalid

Requests:
Satisfied
Partial
Open
Blocked

Readiness
Blocking gaps
Warnings
```

---

# 61. Document List

Minimum columns:

```text
Document
Category
Kind
Status
Confidentiality
Version
Date
Claim Links
Evidence Links
Request Links
```

---

# 62. Document Filters

Required:

```text
Category
Kind
Status
Confidentiality
Freshness
```

Recommended:

```text
Linked / Unlinked Evidence
```

---

# 63. Document Detail

Required:

```text
Title
Description
Kind
Category
Status
Confidentiality
Version
Owner
Dates
Source
Asset availability
Project sections
Claims
Evidence
Requests
Source refs
Supersession
```

---

# 64. Confidentiality Warning UI

When confidentiality != PUBLIC, display:

```text
Confidentiality label only.
Access control is not enforced in Phase 007.
```

Do not imply protection.

---

# 65. Category View

For each diligence category:

```text
Checklist items
Documents
Requests
Claims
Evidence
Gaps
Coverage state
```

---

# 66. Request View

Display:

```text
Request
Priority
Status
Required document types
Linked documents
Linked claims
Linked evidence
Freshness rule
Blocking reason
```

---

# 67. Coverage Matrix UI

Required matrix example:

| Category | Required | Satisfied | Partial | Open | Blocked |
|---|---:|---:|---:|---:|---:|

May also expose:

```text
Current documents
Stale documents
Missing documents
```

---

# 68. Gap View

Display:

```text
Gap
Category
Type
Severity
Related Claim
Related Evidence
Related Document
Related Request
Remediation hint
```

---

# 69. Readiness View

Display:

```text
DILIGENCE_READY
DILIGENCE_READY_WITH_WARNINGS
DILIGENCE_NOT_READY
```

with explicit reasons.

---

# 70. Checklist View

Display standard checklist with:

```text
Required
Optional
Status
Linked request
Linked documents
Evidence coverage
```

---

# 71. No Legal Approval Badge

Do NOT show:

```text
LEGALLY APPROVED
INVESTMENT APPROVED
AUDIT PASSED
```

unless a future external authoritative workflow provides it.

---

# 72. Read-Only AI Copilot Integration

Phase 006 AI Copilot MAY analyze explicitly selected diligence context.

Allowed task extensions:

```text
DILIGENCE_GAP_EXPLANATION
DILIGENCE_QUESTION_DRAFT
DOCUMENT_SUMMARY_DRAFT
DILIGENCE_RISK_REVIEW
```

Only if implemented through existing `AiModelPort`.

---

# 73. AI Data Room Boundary

AI SHALL remain:

```text
READ-ONLY ADVISORY
```

It SHALL NOT:

- mark request SATISFIED;
- mark document CURRENT;
- change confidentiality;
- create Evidence;
- change Claim support;
- change readiness;
- upload documents;
- create canonical legal conclusions.

---

# 74. Explicit Data Transmission

If Data Room context is sent to an external AI provider:

1. user explicitly selects the context;
2. confidentiality labels are shown;
3. external-provider warning is shown;
4. user explicitly runs request.

---

# 75. Highly Confidential External AI Warning

If selected context contains:

```text
HIGHLY_CONFIDENTIAL
```

the UI SHOULD show an enhanced warning.

Recommended:

```text
This selection includes HIGHLY_CONFIDENTIAL material.
External AI transmission is not recommended without organizational approval.
```

No automated policy enforcement beyond warning in Phase 007.

---

# 76. Local AI Preference

For sensitive diligence context, UI MAY recommend:

```text
LOCAL PROVIDER
```

such as Ollama.

This is UX guidance, not a security guarantee.

---

# 77. AI Document Summary

If AI summarizes a Data Room document:

```text
AI GENERATED SUMMARY
```

must be visible.

Summary SHALL not become canonical document content.

---

# 78. AI Diligence Questions

Copilot may draft questions such as:

```text
"Please provide the latest cap table."
```

These remain drafts/proposals.

No automatic request creation unless explicit deterministic human-approved workflow is authorized.

---

# 79. Data Room Events

Recommended in-memory domain events:

```text
DataRoomLoaded
DocumentLoaded
DocumentAvailabilityEvaluated
DiligenceRequestEvaluated
DiligenceCoverageEvaluated
DiligenceGapDetected
DiligenceReadinessEvaluated
```

No cloud audit log in Phase 007.

---

# 80. Error Model

Required:

```text
DataRoomNotFoundError
DataRoomDocumentNotFoundError
DiligenceRequestNotFoundError
DiligenceChecklistNotFoundError
InvalidDocumentArtifactError
InvalidDiligenceRequestError
InvalidDiligenceChecklistError
CrossProjectDocumentLinkError
CrossVersionDocumentLinkError
InvalidEvidenceReferenceError
InvalidClaimReferenceError
DataRoomAssetMissingError
```

---

# 81. Determinism

Given same:

```text
Data Room manifest
Documents
Requests
Checklist
Claims/Evidence state
ProjectVersion
PolicyVersion
Clock input
```

the system SHALL produce the same:

```text
Coverage
Gaps
Readiness
```

---

# 82. Clock Abstraction

Freshness evaluation SHALL use an injected clock.

Reuse an existing compatible `ClockPort` if architecture permits through shared abstraction.

Do NOT directly call `Date.now()` inside pure domain rules.

---

# 83. Arcana Pilot

Arcana SHALL be the Phase 007 pilot.

Use only repository-safe materials and existing governed metadata.

Do NOT fabricate confidential contracts.

---

# 84. Arcana Data Room Categories

Attempt coverage where source material exists:

```text
CORPORATE
LEGAL
FINANCIAL
COMMERCIAL
MARKET
PRODUCT
TECHNOLOGY
SECURITY
INTELLECTUAL_PROPERTY
REGULATORY
RISK_INSURANCE
```

If no material exists:

```text
MISSING
OPEN
NOT_APPLICABLE
```

must be used honestly.

---

# 85. Arcana Pilot Minimum Document Records

Target:

```text
15–30 DocumentArtifact records
```

using:

- existing repository documents;
- existing decks;
- models;
- architecture docs;
- evidence-linked sources;
- explicit MISSING metadata records for expected but absent diligence material.

Do not invent files to hit a count.

---

# 86. Arcana Expected Missing Items

It is acceptable for pilot to expose gaps such as:

```text
current cap table
executed customer contracts
tax returns
insurance certificates
formal security audit
regulatory certifications
IP assignment agreements
financial statements
```

ONLY if those items are genuinely absent.

Do not claim absence without checking repository data.

---

# 87. Arcana Claim/Evidence Mapping

At least some documents SHALL link to existing:

```text
Claims
Evidence
```

to validate traceability.

---

# 88. Arcana Data Room Readiness

Readiness may legitimately be:

```text
DILIGENCE_NOT_READY
```

This is not a failure of Phase 007.

The pilot is successful if the system truthfully exposes gaps.

---

# 89. No Greenwashing

Do not artificially classify documents as CURRENT or SATISFIED to improve readiness.

---

# 90. Data Room Pilot Report

Create:

```text
docs/evidence/ARCANA_DATA_ROOM_PILOT_REPORT.md
```

Required:

```text
Document count
Category count
Current docs
Available docs
Missing docs
Stale docs
Expired docs
Invalid docs

Requests
Satisfied
Partial
Open
Blocked

Claims linked
Evidence linked

Gaps
Blocking gaps
Warnings

DiligenceReadiness
```

---

# 91. Document Inventory Table

Pilot report SHALL include:

| Document ID | Title | Category | Kind | Status | Confidentiality | Asset |
|---|---|---|---|---|---|---|

---

# 92. Diligence Request Table

| Request | Category | Priority | Status | Linked Documents | Blocking Reason |
|---|---|---|---|---|---|

---

# 93. Coverage Table

| Category | Required | Satisfied | Partial | Open | Blocked |
|---|---:|---:|---:|---:|---:|

---

# 94. Gap Table

| Gap | Type | Severity | Category | Related Objects |
|---|---|---|---|---|

---

# 95. Traceability Table

| Document | Claim | Evidence | Request | Project Section |
|---|---|---|---|---|

---

# 96. Workstreams

## WS-007-01 — Data Room Domain

Implement DataRoom and document model.

## WS-007-02 — Diligence Classification

Categories, kinds, status, confidentiality.

## WS-007-03 — Checklist & Requests

Implement deterministic diligence checklist/request model.

## WS-007-04 — Coverage & Gaps

Build coverage and gap evaluators.

## WS-007-05 — Readiness

Implement diligence readiness policy.

## WS-007-06 — Repositories & Static Assets

Ports and JSON/static adapters.

## WS-007-07 — Claims/Evidence Integration

Traceability without re-evaluating governance.

## WS-007-08 — Data Room UI

Overview, documents, requests, coverage, gaps, readiness.

## WS-007-09 — Arcana Pilot

Populate repository-safe pilot.

## WS-007-10 — AI Read-Only Integration

Optional governed Copilot diligence analysis.

## WS-007-11 — Testing, Documentation & Evidence

Architecture, unit, E2E, visual, regression, reports.

---

# 97. Task Breakdown — Domain

### T-007-001
Create DataRoom entity.

### T-007-002
Create DataRoomStatus.

### T-007-003
Create DocumentArtifact.

### T-007-004
Create DocumentKind.

### T-007-005
Create DocumentStatus.

### T-007-006
Create ConfidentialityLevel.

### T-007-007
Create DocumentSource.

### T-007-008
Create DiligenceCategoryType.

### T-007-009
Implement document invariants.

### T-007-010
Implement cross-project link guards.

### T-007-011
Implement cross-version link guards.

### T-007-012
Implement supersession metadata.

---

# 98. Task Breakdown — Requests & Checklist

### T-007-101
Create DiligenceRequest.

### T-007-102
Create DiligenceRequestStatus.

### T-007-103
Create DiligencePriority.

### T-007-104
Create FreshnessRule.

### T-007-105
Create DiligenceChecklist.

### T-007-106
Create DiligenceChecklistItem.

### T-007-107
Create STANDARD_VENTURE_DILIGENCE v1.0.

### T-007-108
Implement request satisfaction evaluator.

### T-007-109
Implement checklist validation.

---

# 99. Task Breakdown — Freshness / Coverage / Gaps

### T-007-201
Create DocumentFreshnessEvaluator.

### T-007-202
Create DocumentFreshnessStatus.

### T-007-203
Create CategoryCoverage.

### T-007-204
Create DiligenceCoverage.

### T-007-205
Create DiligenceGap.

### T-007-206
Create DiligenceGapType.

### T-007-207
Create DiligenceGapSeverity.

### T-007-208
Implement category coverage evaluator.

### T-007-209
Implement request coverage evaluator.

### T-007-210
Implement Claim coverage evaluator.

### T-007-211
Implement Evidence coverage evaluator.

### T-007-212
Implement gap detector.

### T-007-213
Implement VERSION_MISMATCH detection.

---

# 100. Task Breakdown — Readiness

### T-007-301
Create DiligenceReadiness.

### T-007-302
Create DiligenceReadinessExplanation.

### T-007-303
Create DiligenceReadinessPolicy.

### T-007-304
Add policy version 1.0.

### T-007-305
Implement blocking gap rule.

### T-007-306
Implement critical request rule.

### T-007-307
Implement unsupported material claim rule.

### T-007-308
Implement warning rule.

---

# 101. Task Breakdown — Ports & Adapters

### T-007-401
Create DataRoomRepository.

### T-007-402
Create DataRoomDocumentRepository.

### T-007-403
Create DiligenceRequestRepository.

### T-007-404
Create DiligenceChecklistRepository.

### T-007-405
Create DataRoomAssetResolver.

### T-007-406
Create JsonDataRoomRepository.

### T-007-407
Create JsonDataRoomDocumentRepository.

### T-007-408
Create JsonDiligenceRequestRepository.

### T-007-409
Create JsonDiligenceChecklistRepository.

### T-007-410
Create StaticAssetResolver.

### T-007-411
Implement runtime schema validation.

---

# 102. Task Breakdown — Application

### T-007-501
Create GetDataRoomUseCase.

### T-007-502
Create ListDataRoomDocumentsUseCase.

### T-007-503
Create GetDataRoomDocumentUseCase.

### T-007-504
Create ListDiligenceRequestsUseCase.

### T-007-505
Create GetDiligenceRequestUseCase.

### T-007-506
Create EvaluateDiligenceRequestUseCase.

### T-007-507
Create EvaluateDataRoomCoverageUseCase.

### T-007-508
Create EvaluateDiligenceGapsUseCase.

### T-007-509
Create BuildDiligenceReadinessUseCase.

### T-007-510
Create GetClaimDiligenceCoverageUseCase.

### T-007-511
Create GetEvidenceDiligenceCoverageUseCase.

### T-007-512
Create InspectDiligenceCategoryUseCase.

---

# 103. Task Breakdown — UI

### T-007-601
Create Data Room route.

### T-007-602
Create DataRoomShell.

### T-007-603
Create Overview panel.

### T-007-604
Create Documents view.

### T-007-605
Create Document filters.

### T-007-606
Create Document Detail.

### T-007-607
Create Categories view.

### T-007-608
Create Requests view.

### T-007-609
Create Coverage matrix.

### T-007-610
Create Gaps view.

### T-007-611
Create Readiness view.

### T-007-612
Create Claims/Evidence traceability panel.

### T-007-613
Create confidentiality labels.

### T-007-614
Create Phase 007 security limitation banner.

### T-007-615
Create mobile Data Room layout.

---

# 104. Task Breakdown — Arcana Pilot

### T-007-701
Inventory Arcana diligence-safe source assets.

### T-007-702
Create Arcana Data Room manifest.

### T-007-703
Create Arcana document registry.

### T-007-704
Classify document categories and kinds.

### T-007-705
Assign document statuses honestly.

### T-007-706
Assign confidentiality metadata.

### T-007-707
Create Arcana diligence requests.

### T-007-708
Apply standard checklist.

### T-007-709
Link Claims.

### T-007-710
Link Evidence.

### T-007-711
Link Project Sections.

### T-007-712
Evaluate freshness.

### T-007-713
Evaluate coverage.

### T-007-714
Detect gaps.

### T-007-715
Evaluate diligence readiness.

### T-007-716
Create Arcana Data Room Pilot Report.

---

# 105. Task Breakdown — AI Integration

### T-007-801
Define Data Room Copilot context mapper.

### T-007-802
Preserve confidentiality labels in Copilot context.

### T-007-803
Add explicit external transmission warning for diligence context.

### T-007-804
Add enhanced HIGHLY_CONFIDENTIAL warning.

### T-007-805
Implement Diligence Gap Explanation task if authorized through existing Copilot task extension.

### T-007-806
Implement Diligence Question Draft task if authorized.

### T-007-807
Verify AI cannot mutate Data Room canonical state.

### T-007-808
Verify AI cannot mark request SATISFIED.

### T-007-809
Verify AI cannot create Evidence.

---

# 106. Task Breakdown — Tests

### T-007-901
Test DataRoom invariants.

### T-007-902
Test DocumentArtifact invariants.

### T-007-903
Test document statuses.

### T-007-904
Test confidentiality labels.

### T-007-905
Test DiligenceRequest invariants.

### T-007-906
Test checklist invariants.

### T-007-907
Test request OPEN.

### T-007-908
Test request PARTIALLY_SATISFIED.

### T-007-909
Test request SATISFIED.

### T-007-910
Test request BLOCKED.

### T-007-911
Test freshness CURRENT.

### T-007-912
Test freshness STALE.

### T-007-913
Test freshness EXPIRED.

### T-007-914
Test freshness UNKNOWN.

### T-007-915
Test category coverage.

### T-007-916
Test Claim coverage.

### T-007-917
Test Evidence coverage.

### T-007-918
Test gap detection.

### T-007-919
Test version mismatch.

### T-007-920
Test DILIGENCE_READY.

### T-007-921
Test DILIGENCE_READY_WITH_WARNINGS.

### T-007-922
Test DILIGENCE_NOT_READY.

### T-007-923
Test no opaque score dependency.

### T-007-924
Test document does not auto-create Evidence.

### T-007-925
Test document does not auto-support Claim.

### T-007-926
Test Project Twin immutability.

### T-007-927
Test Claims/Evidence immutability.

### T-007-928
Test Data Room determinism.

### T-007-929
Test Clock abstraction.

### T-007-930
Test static asset resolver.

### T-007-931
Test missing asset handling.

### T-007-932
Test Arcana pilot.

### T-007-933
Test Data Room UI E2E.

### T-007-934
Test document filters E2E.

### T-007-935
Test request view E2E.

### T-007-936
Test coverage E2E.

### T-007-937
Test gaps E2E.

### T-007-938
Test readiness E2E.

### T-007-939
Test traceability E2E.

### T-007-940
Test confidentiality warning E2E.

### T-007-941
Test mobile E2E.

### T-007-942
Create visual regression baselines.

### T-007-943
Run architecture tests.

### T-007-944
Run Phase 006 regression.

### T-007-945
Run Phase 005 regression.

### T-007-946
Run Phase 004 regression.

### T-007-947
Run Phase 003 regression.

### T-007-948
Run Phase 002 regression.

### T-007-949
Run Phase 001 regression.

### T-007-950
Run Phase 000A regression.

### T-007-951
Run Phase 0 legacy preservation.

---

# 107. Task Breakdown — Documentation

### T-007-1001
Create Data Room Domain Model.

### T-007-1002
Create Diligence Category Reference.

### T-007-1003
Create Document Governance Reference.

### T-007-1004
Create Diligence Checklist Reference.

### T-007-1005
Create Diligence Request State Reference.

### T-007-1006
Create Diligence Coverage Reference.

### T-007-1007
Create Diligence Gap Rules.

### T-007-1008
Create Diligence Readiness Rules.

### T-007-1009
Create Phase 007 Security Limitation Reference.

### T-007-1010
Create Data Room Copilot Boundary Reference.

### T-007-1011
Create Arcana Data Room Pilot Report.

### T-007-1012
Create SPEC-007 Traceability Matrix.

### T-007-1013
Create Phase 007 Verification Report.

---

# 108. Acceptance Criteria

## AC-007-001 — Structured Data Room

Data Room SHALL be represented as governed structured domain data, not only folders.

---

## AC-007-002 — Document Governance

Every document record SHALL expose category, kind, status, confidentiality, version, and provenance.

---

## AC-007-003 — No False Security Claim

UI SHALL clearly state that Auth/RBAC/access control are not implemented.

---

## AC-007-004 — No Auto-Evidence

Document presence SHALL NOT auto-create Evidence.

---

## AC-007-005 — No Auto-Support

Document presence SHALL NOT change ClaimSupportStatus.

---

## AC-007-006 — Request Determinism

Diligence request status SHALL be deterministically evaluable.

---

## AC-007-007 — Coverage

Category/request/Claim/Evidence coverage SHALL be available.

---

## AC-007-008 — Gaps

Missing, stale, invalid, disputed, unsupported, open, and version-mismatch gaps SHALL be detectable.

---

## AC-007-009 — Readiness

DiligenceReadiness SHALL be explicit and explainable.

---

## AC-007-010 — No Opaque Score

Readiness SHALL not rely on a black-box score.

---

## AC-007-011 — Version Integrity

ProjectVersion and document/version relationships SHALL be explicit.

---

## AC-007-012 — Asset Failure Safety

Missing static asset SHALL not crash Data Room.

---

## AC-007-013 — Confidentiality Metadata

Confidentiality labels SHALL be visible but explicitly non-enforcing.

---

## AC-007-014 — Arcana Pilot

Arcana SHALL expose a real repository-safe diligence workspace.

---

## AC-007-015 — Honest Missing Data

Missing diligence materials SHALL be represented as missing/open rather than fabricated.

---

## AC-007-016 — AI Read-Only

Copilot SHALL not mutate Data Room state.

---

## AC-007-017 — AI External Transmission Warning

Selected diligence context sent externally SHALL require explicit user initiation and warning.

---

## AC-007-018 — Static Build

Application SHALL remain static-hostable.

---

## AC-007-019 — Architecture

Data Room domain SHALL preserve hexagonal boundaries.

---

## AC-007-020 — Regression

All previous phase gates SHALL remain passing.

---

# 109. Required Data Room E2E Matrix

Playwright SHALL explicitly verify:

| Flow | Result |
|---|---|
| Data Room Load | |
| Overview | |
| Documents | |
| Filter Category | |
| Filter Status | |
| Filter Confidentiality | |
| Open Document Detail | |
| Missing Asset Fallback | |
| Categories | |
| Requests | |
| Request Detail | |
| Coverage | |
| Gaps | |
| Readiness | |
| Claims Links | |
| Evidence Links | |
| Confidentiality Warning | |
| Security Limitation Banner | |
| Mobile | |

---

# 110. Required Visual Regression Baselines

Minimum:

```text
Data Room Overview
Documents Table
Document Detail
Request Detail
Coverage Matrix
Gaps View
Readiness View
Confidentiality Warning
Mobile Data Room
```

Viewports:

```text
1440×900
390×844
```

---

# 111. Browser Runtime Gate

Required:

```text
Critical console errors: 0
Unhandled exceptions: 0
Critical asset 404s: 0
```

Expected missing Data Room assets represented by metadata SHALL not count as accidental application 404s if handled through resolver/fallback without raw failed browser requests.

---

# 112. Architecture Gate

Required:

```text
0 dependency violations
```

Data Room domain MUST NOT import:

```text
UI
DOM
Firebase
provider SDKs
AI adapters
legacy runtime
concrete browser storage
```

---

# 113. Regression Gate

Required:

```text
Phase 007 tests             PASS
Phase 006 regression        PASS
Phase 005 regression        PASS
Phase 004 regression        PASS
Phase 003 regression        PASS
Phase 002 regression        PASS
Phase 001 regression        PASS
Phase 000A regression       PASS
Phase 0 legacy              45/45 PASS minimum
```

---

# 114. Forbidden Scope Audit

Final report MUST explicitly state:

```text
Authentication: NOT IMPLEMENTED
RBAC: NOT IMPLEMENTED
Secure External Sharing: NOT IMPLEMENTED
User Access Logs: NOT IMPLEMENTED
Per-User Watermarking: NOT IMPLEMENTED
Cloud File Upload: NOT IMPLEMENTED
Cloud File Storage: NOT IMPLEMENTED

Firestore: NOT IMPLEMENTED
Firebase Auth: NOT IMPLEMENTED
Firebase Storage: NOT IMPLEMENTED
Cloud Functions: NOT IMPLEMENTED

Backend API: NOT IMPLEMENTED
Database: NOT IMPLEMENTED

AI Canonical Data Room Writes: NOT IMPLEMENTED
AI Evidence Creation: NOT IMPLEMENTED
AI Claim Verification: NOT IMPLEMENTED
AI Request Satisfaction Mutation: NOT IMPLEMENTED
External Web Research: NOT IMPLEMENTED

PPTX Export: NOT IMPLEMENTED
PDF Export: NOT IMPLEMENTED

Static Web Architecture: PRESERVED
```

---

# 115. Definition of Done

Phase 007 may become `CODE_COMPLETE` only when:

- DataRoom domain exists;
- DocumentArtifact exists;
- categories/kinds/status/confidentiality exist;
- checklist exists;
- requests exist;
- freshness evaluator exists;
- coverage exists;
- gaps exist;
- readiness exists;
- repositories/adapters exist;
- Claims/Evidence integration exists;
- Data Room UI exists;
- Arcana pilot exists;
- security limitation is visible;
- tests exist;
- architecture passes;
- static build passes.

Phase 007 becomes `VERIFIED` only if:

```text
TYPECHECK                          PASS
ARCHITECTURE                       PASS
DATA ROOM DOMAIN TESTS             PASS
DOCUMENT GOVERNANCE TESTS          PASS
CHECKLIST TESTS                    PASS
REQUEST STATE TESTS                PASS
FRESHNESS TESTS                    PASS
COVERAGE TESTS                     PASS
GAP TESTS                          PASS
READINESS TESTS                    PASS
NO AUTO-EVIDENCE                   PASS
NO AUTO-SUPPORT                    PASS
CANONICAL IMMUTABILITY             PASS
DATA ROOM DETERMINISM              PASS
STATIC ASSET RESOLUTION            PASS
ARCANA PILOT                       PASS
DATA ROOM E2E                      PASS
CONFIDENTIALITY WARNING E2E        PASS
SECURITY LIMITATION E2E            PASS
MOBILE E2E                         PASS
VISUAL REGRESSION                  PASS
PHASE 006 REGRESSION               PASS
PHASE 005 REGRESSION               PASS
PHASE 004 REGRESSION               PASS
PHASE 003 REGRESSION               PASS
PHASE 002 REGRESSION               PASS
PHASE 001 REGRESSION               PASS
PHASE 000A REGRESSION              PASS
PHASE 0 LEGACY                     PASS
STATIC BUILD                       PASS
CONSOLE                            PASS
FORBIDDEN SCOPE                    PASS
```

Only human approval may set:

```text
CLOSED
```

---

# 116. Required Documentation

Create:

```text
docs/architecture/DATA_ROOM_DOMAIN_MODEL.md
docs/architecture/DILIGENCE_CATEGORY_REFERENCE.md
docs/architecture/DATA_ROOM_DOCUMENT_GOVERNANCE.md
docs/architecture/DILIGENCE_CHECKLIST_REFERENCE.md
docs/architecture/DILIGENCE_REQUEST_STATE_REFERENCE.md
docs/architecture/DILIGENCE_COVERAGE_REFERENCE.md
docs/architecture/DILIGENCE_GAP_RULES.md
docs/architecture/DILIGENCE_READINESS_RULES.md
docs/architecture/DATA_ROOM_SECURITY_LIMITATIONS.md
docs/architecture/DATA_ROOM_COPILOT_BOUNDARY.md

docs/evidence/ARCANA_DATA_ROOM_PILOT_REPORT.md
docs/evidence/SPEC_007_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_007_VERIFICATION_REPORT.md
```

---

# 117. Recommended ADRs

Create:

```text
ADR-0056 Data Room as Governed Diligence Domain
ADR-0057 DocumentArtifact Is Not Evidence
ADR-0058 Versioned Standard Diligence Checklist
ADR-0059 Deterministic Diligence Coverage and Gaps
ADR-0060 Explainable Diligence Readiness
ADR-0061 Static Repository-Managed Data Room Assets
ADR-0062 Confidentiality Labels Without Access Enforcement
ADR-0063 Read-Only AI Copilot for Diligence
ADR-0064 No Secure Sharing Claims Before RBAC
ADR-0065 Data Room Version Integrity
```

---

# 118. Required Verification Report

Generate:

```text
docs/evidence/PHASE_007_VERIFICATION_REPORT.md
```

Required sections:

## Identification

- Phase;
- SPEC;
- branch;
- starting commit;
- ending commit;
- date;
- schema version;
- checklist version;
- diligence policy version.

## Domain Matrix

Report:

```text
Document kinds
Categories
Document statuses
Confidentiality levels
Request statuses
Gap types
Readiness states
```

## Arcana Pilot

Report:

```text
Documents
Categories
Current
Available
Missing
Stale
Expired
Invalid

Requests
Satisfied
Partial
Open
Blocked

Claims linked
Evidence linked

Gaps
Blocking gaps
Warnings

Readiness
```

## E2E Matrix

Report every required flow individually.

## Visual Regression

Report:

```text
Baseline count
Desktop viewport
Mobile viewport
Unexpected changes
Result
```

## Security Limitation Verification

Report explicit visible UI warning that:

```text
Authentication / RBAC / secure external sharing are not implemented.
```

## AI Boundary

Report:

```text
Copilot canonical mutations: 0
Request-status mutations by AI: 0
Evidence created by AI: 0
Claim support mutations by AI: 0
```

## Regression

Report all previous phases.

## Browser Diagnostics

```text
Critical console errors
Unhandled exceptions
Critical asset 404s
```

## Forbidden Scope Audit

Include all required NOT IMPLEMENTED statements.

## Final Recommendation

Allowed:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

---

# 119. SDD State Machine

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

# 120. Change Control

If implementation requires:

```text
authentication
RBAC
cloud upload
Firebase Storage
backend
secure links
signed URLs
document encryption services
external sharing
```

stop and create:

```text
docs/specs/changes/CHANGE_REQUEST_007_XXX.md
```

Do not smuggle security infrastructure into Phase 007.

---

# 121. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-007 — Due Diligence Data Room`

under:

`SPEC-007 — Due Diligence Data Room`

Previous phase:

`VHOS-PHASE-006 — AI Copilot`

is approved CLOSED.

---

## PRIMARY OBJECTIVE

Implement a governed static Due Diligence Data Room that organizes:

```text
documents
requests
checklists
Claims
Evidence
coverage
gaps
readiness
```

without pretending to be a production secure virtual data room.

---

## NON-NEGOTIABLE SECURITY RULE

Phase 007 has:

```text
NO AUTH
NO RBAC
NO SECURE EXTERNAL SHARING
NO CLOUD FILE STORAGE
```

Therefore the UI MUST explicitly state that confidentiality labels are informational and access control is not implemented.

Do NOT market or label this implementation as a secure production VDR.

---

## BEFORE WRITING CODE

You MUST:

1. read Phase 0;
2. read Phase 000A;
3. read Phase 001;
4. read Phase 002;
5. read Phase 003;
6. read Phase 004;
7. read Phase 005;
8. read Phase 006;
9. run the full verification baseline;
10. inspect Arcana Project Twin;
11. inspect Arcana Claims/Evidence;
12. inspect existing repository-safe Arcana source documents;
13. map work to `T-007-*`;
14. document implementation plan.

Start with Data Room domain.

Do NOT start with UI.

---

## IMPLEMENTATION ORDER

Required:

```text
Data Room Domain
      ↓
Document Governance
      ↓
Checklist / Requests
      ↓
Freshness
      ↓
Coverage
      ↓
Gaps
      ↓
Readiness
      ↓
Repositories / Static Assets
      ↓
Claims / Evidence Integration
      ↓
Data Room UI
      ↓
Arcana Pilot
      ↓
Optional Read-Only Copilot Integration
      ↓
Tests / Verification
```

---

## DOCUMENT RULE

```text
DocumentArtifact ≠ Evidence
```

A document may link to Evidence.

Do NOT auto-create Evidence.

---

## CLAIM RULE

Document presence MUST NOT change:

```text
ClaimSupportStatus
```

Phase 003 governance remains canonical.

---

## MISSING DATA RULE

If expected diligence material does not exist:

```text
MISSING
OPEN
BLOCKED
```

are valid outcomes.

Do NOT fabricate:

- contracts;
- certificates;
- customer documents;
- financial statements;
- cap tables;
- regulatory approvals;
- insurance;
- IP assignments.

---

## CONFIDENTIALITY RULE

Confidentiality labels:

```text
PUBLIC
INTERNAL
CONFIDENTIAL
HIGHLY_CONFIDENTIAL
```

are metadata only in Phase 007.

The UI must clearly say access is not enforced.

---

## DILIGENCE READINESS RULE

Readiness must be deterministic and explainable.

No black-box diligence score.

---

## VERSION RULE

All documents, requests, and Data Room state must preserve:

```text
projectVersion
```

Cross-version mismatch must be visible.

---

## AI COPILOT RULE

Copilot may analyze explicitly selected Data Room context.

It remains:

```text
READ-ONLY
ADVISORY
```

AI MUST NOT:

- satisfy requests;
- mark documents CURRENT;
- change confidentiality;
- create Evidence;
- change Claim support;
- change Data Room readiness.

---

## EXTERNAL AI WARNING

When selected Data Room context is sent to an external provider:

- provider must be visible;
- context scope must be visible;
- confidentiality labels must be visible;
- user must explicitly execute.

HIGHLY_CONFIDENTIAL context requires enhanced warning.

---

## ARCANA PILOT

Build a truthful Arcana Data Room using repository-safe artifacts.

Expose missing items honestly.

Do not attempt to make readiness green.

---

## REQUIRED TESTING

Before CODE_COMPLETE:

1. typecheck;
2. architecture;
3. Data Room domain;
4. document governance;
5. requests;
6. checklist;
7. freshness;
8. coverage;
9. gaps;
10. readiness;
11. no auto-Evidence;
12. no auto-support;
13. Project Twin immutability;
14. Claims/Evidence immutability;
15. determinism;
16. static asset resolution;
17. Arcana pilot;
18. Data Room E2E;
19. confidentiality warning E2E;
20. security limitation E2E;
21. mobile E2E;
22. visual regression;
23. Phase 006 regression;
24. Phase 005 regression;
25. Phase 004 regression;
26. Phase 003 regression;
27. Phase 002 regression;
28. Phase 001 regression;
29. Phase 000A regression;
30. Phase 0 legacy;
31. static build;
32. browser diagnostics;
33. forbidden-scope audit.

---

## FORBIDDEN

Do NOT implement:

- authentication;
- RBAC;
- secure external sharing;
- user access logs;
- per-user watermarking;
- cloud upload;
- cloud storage;
- Firestore;
- Firebase Auth;
- Firebase Storage;
- Cloud Functions;
- backend;
- database;
- AI Data Room canonical writes;
- AI Evidence creation;
- AI Claim verification;
- AI request-status mutation;
- external web research;
- PPTX export;
- PDF export.

---

## REQUIRED OUTPUT

Generate:

```text
docs/evidence/PHASE_007_VERIFICATION_REPORT.md
docs/evidence/ARCANA_DATA_ROOM_PILOT_REPORT.md
```

Final recommendation may only be:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

Do NOT start Phase 008.

Do NOT mark Phase 007 CLOSED.

---

# 122. Expected End State

```text
                         PROJECT TWIN
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
           CLAIMS          EVIDENCE          RISKS
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                      DUE DILIGENCE
                         DATA ROOM
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
         DOCUMENTS         REQUESTS        CHECKLIST
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                           COVERAGE
                              │
                              ▼
                             GAPS
                              │
                              ▼
                     DILIGENCE READINESS
```

The platform remains:

```text
WEB-FIRST
STATIC
DETERMINISTIC
TRUST-AWARE
AI-ASSISTED
HUMAN-GOVERNED

NO AUTH
NO RBAC
NO BACKEND
NO DATABASE
NO CLOUD FILE STORAGE
NO FALSE SECURITY CLAIMS
```

---

# 123. Exit Decision

If all criteria pass:

> **Apruebo formalmente VHOS-PHASE-007 — Due Diligence Data Room bajo SPEC-007 como VERIFIED/CLOSED y autorizo el inicio de la siguiente fase, manteniendo la arquitectura Feature-Oriented Hexagonal, la gobernanza explícita de Documents/Claims/Evidence, la diligencia determinística y explicable, la separación entre metadata de confidencialidad y controles reales de acceso, y la prohibición de escrituras canónicas automáticas por IA.**
