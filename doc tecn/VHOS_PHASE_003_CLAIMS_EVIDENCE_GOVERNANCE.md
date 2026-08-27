# Venture Hub OS — Phase 003: Claims & Evidence Governance

**Document ID:** `VHOS-PHASE-003`  
**Specification:** `SPEC-003 — Claims & Evidence Governance`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-002 — Adaptive Narrative Engine`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Deployment Model:** Web-first / Static Hosting  
**Persistence Model:** Static JSON  
**AI Runtime:** NOT AUTHORIZED  
**Backend Services:** NOT AUTHORIZED  
**Firebase Runtime Services:** NOT AUTHORIZED  
**Next Phase:** `VHOS-PHASE-004 — Executive Presentation Engine`

---

# 1. Executive Purpose

Phase 003 introduces the trust and traceability layer of Venture Hub OS:

> **Claims & Evidence Governance**

The system already contains:

```text
Project Twin
      ↓
Adaptive Narrative Engine
      ↓
NarrativePlan
```

Phase 003 adds a governed chain of support:

```text
Project Twin
      ↓
Claims
      ↓
Evidence
      ↓
Support State
      ↓
Narrative Trust Context
      ↓
NarrativePlan
```

The central goal is to prevent the platform from presenting unsupported assertions as established facts.

Every material assertion SHALL be classifiable, traceable, reviewable, and connected to supporting evidence when applicable.

---

# 2. Product Thesis

Traditional project presentations mix together:

- facts;
- estimates;
- assumptions;
- targets;
- hypotheses.

They often appear visually identical.

Venture Hub OS SHALL distinguish them explicitly.

Example:

```text
Claim:
"Target EBITDA margin is 34%."

Claim Type:
TARGET

Evidence:
Financial model v0.4

Support Status:
SUPPORTED

Source:
financial-model.md / scenario-target

Last Review:
2026-08-26
```

This enables Venture Hub OS to become:

> **an auditable executive presentation platform rather than only a presentation builder.**

---

# 3. Primary Outcome

At the end of Phase 003, Venture Hub OS SHALL support:

1. structured claims linked to Project Twin;
2. deterministic claim classification;
3. evidence records;
4. claim-to-evidence relationships;
5. support state;
6. source provenance;
7. review status;
8. trust summaries;
9. claim coverage by project section;
10. narrative trust warnings;
11. Arcana pilot governance;
12. static JSON persistence;
13. browser inspection UI;
14. full regression and architecture verification.

---

# 4. Core Governance Chain

The required conceptual chain is:

```text
PROJECT
   ↓
PROJECT VERSION
   ↓
PROJECT SECTION
   ↓
CLAIM
   ↓
EVIDENCE LINK
   ↓
EVIDENCE
   ↓
SOURCE / PROVENANCE
   ↓
SUPPORT STATE
```

A claim MAY belong to a section.

A claim MAY be referenced by one or more NarrativeSteps.

An evidence item MAY support more than one claim.

The relationship between Claim and Evidence SHALL therefore be modeled explicitly.

---

# 5. Architectural Mandate

Create new feature modules:

```text
src/modules/claim/
src/modules/evidence/
```

Recommended structure:

```text
src/modules/claim/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── ports/
│   ├── services/
│   ├── rules/
│   ├── events/
│   └── errors/
├── application/
│   ├── queries/
│   ├── commands/
│   └── use-cases/
├── adapters/
│   └── json/
└── tests/
```

```text
src/modules/evidence/
├── domain/
├── application/
├── adapters/
└── tests/
```

Dependency direction remains:

```text
UI
 ↓
Application
 ↓
Domain
```

Claim and Evidence domains MUST NOT depend on:

- UI;
- DOM;
- browser storage implementation;
- Firebase;
- legacy decks;
- AI providers;
- Narrative UI;
- concrete JSON paths.

---

# 6. Scope

## 6.1 In Scope

Phase 003 SHALL implement:

- Claim entity;
- ClaimId;
- ClaimType;
- ClaimStatus;
- ClaimSupportStatus;
- ClaimReviewStatus;
- ClaimSeverity / Materiality;
- Evidence entity;
- EvidenceId;
- EvidenceType;
- EvidenceStatus;
- EvidenceSource;
- EvidenceLink;
- SourceReference;
- provenance metadata;
- claim repository port;
- evidence repository port;
- JSON adapters;
- claim validation;
- evidence validation;
- deterministic support evaluation;
- claim coverage;
- trust summaries;
- narrative trust annotations;
- claims/evidence inspection UI;
- Arcana pilot claims;
- Arcana pilot evidence;
- architecture tests;
- unit tests;
- E2E tests;
- documentation;
- SDD verification report.

## 6.2 Explicitly Out of Scope

Do NOT implement:

- AI extraction of claims;
- AI classification;
- AI verification;
- web research;
- automated external fact checking;
- OpenAI;
- Claude;
- Gemini;
- Ollama;
- semantic search;
- vector databases;
- Firestore;
- Firebase Auth;
- Firebase Storage;
- Cloud Functions;
- backend APIs;
- SQL/NoSQL databases;
- authenticated Data Room;
- legal opinions;
- automated due diligence;
- investor scoring;
- external APIs;
- PDF/PPTX export;
- blockchain;
- digital signatures;
- cryptographic evidence notarization.

---

# 7. No-AI Governance Principle

All classification and support decisions in Phase 003 SHALL be:

- deterministic;
- rule-based;
- inspectable;
- reproducible;
- testable.

No claim may be declared supported because an AI model "believes" it is true.

---

# 8. Claim Definition

A Claim is:

> A discrete assertion made by a project that can be classified, reviewed, supported, challenged, or retired.

Examples:

```text
"The platform operates as a static web application."
```

```text
"Target EBITDA margin is 34%."
```

```text
"Arcana can reduce unauthorized operational leakage."
```

```text
"The MVP is expected to be ready in Q4."
```

Each is materially different and must be governed differently.

---

# 9. Claim Entity

Conceptual contract:

```ts
interface Claim {
  id: string;
  projectId: string;
  projectVersion: string;
  sectionId?: string;

  text: LocalizedText;

  type: ClaimType;
  status: ClaimStatus;
  supportStatus: ClaimSupportStatus;
  reviewStatus: ClaimReviewStatus;
  materiality: ClaimMateriality;

  evidenceLinks: EvidenceLinkId[];

  sourceRefs?: SourceReference[];

  createdAt: string;
  updatedAt: string;
}
```

Exact implementation may differ if domain invariants are preserved.

---

# 10. Claim Types

Required:

```text
FACT
ESTIMATE
ASSUMPTION
TARGET
HYPOTHESIS
```

Optional future types are not authorized without an ADR.

---

# 11. Claim Type Semantics

## 11.1 FACT

An assertion presented as currently true.

Expected governance:

```text
Evidence required for material FACT claims.
```

Example:

```text
"Venture Hub OS uses TypeScript strict mode."
```

---

## 11.2 ESTIMATE

A calculated or approximated value based on known inputs.

Evidence SHOULD include:

- method;
- calculation;
- source inputs.

Example:

```text
"Estimated market size is $X."
```

---

## 11.3 ASSUMPTION

A condition assumed for planning or modeling.

It MUST NOT be presented as verified fact.

Example:

```text
"We assume 300 daily transactions."
```

Evidence is optional but rationale is recommended.

---

## 11.4 TARGET

A desired future state.

It MUST NOT be treated as achieved performance.

Example:

```text
"Target EBITDA margin: 34%."
```

Evidence may include:

- financial model;
- management plan;
- operating assumptions.

---

## 11.5 HYPOTHESIS

An assertion explicitly awaiting validation.

Example:

```text
"Customers will adopt pre-ordering at a higher rate if price incentives are offered."
```

Evidence may be absent.

Its absence MUST NOT automatically create an evidence governance error.

---

# 12. ClaimStatus

Required lifecycle:

```text
DRAFT
ACTIVE
RETIRED
```

`ACTIVE` means the claim is currently used by the Project Twin.

It does NOT mean the claim is supported.

Support is represented separately.

---

# 13. ClaimSupportStatus

Required:

```text
NOT_REQUIRED
UNSUPPORTED
PARTIALLY_SUPPORTED
SUPPORTED
CONTRADICTED
```

No opaque numerical confidence score is required.

The status SHALL be explainable from rule outcomes.

---

# 14. ClaimReviewStatus

Required:

```text
UNREVIEWED
REVIEW_REQUIRED
REVIEWED
CHANGES_REQUESTED
```

No user authentication exists yet.

Reviewer metadata may be:

```text
"local-owner"
"migration"
"system-rule"
```

Do not build account management.

---

# 15. Claim Materiality

Required:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Materiality represents importance to decision-making.

Example:

```text
Typographic detail
→ LOW
```

```text
Market size / revenue / traction / regulatory status
→ HIGH or CRITICAL
```

Materiality does NOT indicate truth.

---

# 16. Claim Invariants

At minimum:

1. Claim ID is required.
2. Project ID is required.
3. Project version is required.
4. Claim text is required.
5. Claim type must be valid.
6. Claim status must be valid.
7. Support status must be valid.
8. Review status must be valid.
9. Materiality must be valid.
10. Claim section, if provided, must exist in the same ProjectVersion.
11. EvidenceLink references must resolve.
12. RETIRED claims must not become newly active in narratives.
13. FACT claims marked SUPPORTED must have qualifying evidence.
14. HYPOTHESIS may legitimately be UNSUPPORTED.
15. TARGET must never be auto-converted to FACT.
16. ASSUMPTION must never be auto-converted to FACT.
17. ESTIMATE must preserve calculation/source semantics if supported.

---

# 17. Evidence Definition

Evidence is:

> A traceable artifact, observation, calculation, dataset, source, or record used to support or challenge a claim.

Evidence is NOT the claim itself.

---

# 18. Evidence Entity

Conceptual contract:

```ts
interface Evidence {
  id: string;
  projectId: string;
  projectVersion: string;

  type: EvidenceType;
  status: EvidenceStatus;

  title: string;
  description?: string;

  source: EvidenceSource;
  sourceRefs?: SourceReference[];

  capturedAt?: string;
  reviewedAt?: string;

  metadata?: Record<string, unknown>;
}
```

---

# 19. Evidence Types

Required:

```text
DOCUMENT
DATASET
CALCULATION
OBSERVATION
EXPERIMENT
SYSTEM_RECORD
EXTERNAL_REFERENCE
MEDIA
OTHER
```

---

# 20. Evidence Status

Required:

```text
AVAILABLE
MISSING
SUPERSEDED
DISPUTED
INVALID
```

Only `AVAILABLE` evidence normally contributes positive support.

`DISPUTED` and `INVALID` SHALL not be treated as positive support.

---

# 21. Evidence Source

Required metadata should support:

```text
sourceType
title
reference
date
authorOrOwner
location
```

Example:

```json
{
  "sourceType": "legacy-deck",
  "title": "Arcana Investor Presentation",
  "reference": "slide-6"
}
```

Or:

```json
{
  "sourceType": "calculation",
  "title": "Target Scenario Model",
  "reference": "financials.target.ebitda"
}
```

---

# 22. SourceReference

Required reusable type.

Conceptual contract:

```ts
interface SourceReference {
  sourceType: string;
  reference: string;
  title?: string;
  locator?: string;
  date?: string;
}
```

`locator` MAY be:

- page;
- slide;
- section;
- row;
- cell;
- JSON path.

---

# 23. EvidenceLink

The relationship between Claim and Evidence SHALL be explicit.

Conceptual contract:

```ts
interface EvidenceLink {
  id: string;
  claimId: string;
  evidenceId: string;

  relation: EvidenceRelation;
  status: EvidenceLinkStatus;

  rationale?: string;
}
```

---

# 24. EvidenceRelation

Required:

```text
SUPPORTS
PARTIALLY_SUPPORTS
CONTRADICTS
CONTEXT_ONLY
```

---

# 25. EvidenceLinkStatus

Required:

```text
ACTIVE
RETIRED
```

---

# 26. Many-to-Many Requirement

The architecture SHALL allow:

```text
One Claim
→ many Evidence items
```

and:

```text
One Evidence item
→ many Claims
```

Do NOT duplicate evidence data for each claim.

---

# 27. Support Evaluation

Create deterministic domain service:

```text
ClaimSupportEvaluator
```

Conceptual flow:

```text
Claim
  ↓
EvidenceLinks
  ↓
Evidence Status
  ↓
Evidence Relation
  ↓
Claim Type Rules
  ↓
Support Status
```

---

# 28. Support Rules — FACT

Default:

```text
No active qualifying evidence
→ UNSUPPORTED
```

```text
Only partial support
→ PARTIALLY_SUPPORTED
```

```text
At least one qualifying support item
and no active contradiction
→ SUPPORTED
```

```text
Active valid contradiction
→ CONTRADICTED
```

Exact combination rules must be documented.

---

# 29. Support Rules — ESTIMATE

A supported ESTIMATE SHOULD have at minimum one of:

```text
CALCULATION
DATASET
DOCUMENT
SYSTEM_RECORD
```

and SHOULD include method/source metadata.

Missing calculation provenance may result in:

```text
PARTIALLY_SUPPORTED
```

---

# 30. Support Rules — ASSUMPTION

Evidence is not mandatory.

Default:

```text
NOT_REQUIRED
```

unless profile/policy explicitly requires rationale.

ASSUMPTION must remain visually and semantically labeled.

---

# 31. Support Rules — TARGET

Evidence is not evidence that the target has been achieved.

Evidence supports that:

```text
the target exists
```

or:

```text
the target is modeled
```

Default support may be:

```text
SUPPORTED
```

if a planning artifact documents the target.

But downstream UI MUST still label it `TARGET`.

---

# 32. Support Rules — HYPOTHESIS

Default:

```text
NOT_REQUIRED
```

until validation evidence exists.

If contradictory experiment evidence exists:

```text
CONTRADICTED
```

may be applied.

---

# 33. Support Explanation

Every evaluated ClaimSupportStatus SHALL be explainable.

Recommended:

```ts
interface ClaimSupportExplanation {
  status: ClaimSupportStatus;
  reasonCodes: string[];
  supportingEvidenceIds: string[];
  contradictingEvidenceIds: string[];
  message: string;
}
```

No black-box score.

---

# 34. Governance Rule Codes

Create explicit rule codes.

Recommended examples:

```text
FACT_REQUIRES_EVIDENCE
FACT_SUPPORTED
FACT_CONTRADICTED

ESTIMATE_MISSING_CALCULATION
ESTIMATE_SUPPORTED

ASSUMPTION_EVIDENCE_NOT_REQUIRED

TARGET_DOCUMENTED
TARGET_UNDOCUMENTED

HYPOTHESIS_PENDING_VALIDATION

EVIDENCE_MISSING
EVIDENCE_INVALID
EVIDENCE_DISPUTED
```

These codes SHALL be testable and visible in governance reports.

---

# 35. Claim Repository Port

Required:

```ts
export interface ClaimRepository {
  listByProject(projectId: string, projectVersion: string): Promise<Claim[]>;
  findById(id: string): Promise<Claim | null>;
  listBySection(sectionId: string): Promise<Claim[]>;
}
```

Optional:

```ts
listByType(type: ClaimType): Promise<Claim[]>;
```

---

# 36. Evidence Repository Port

Required:

```ts
export interface EvidenceRepository {
  listByProject(projectId: string, projectVersion: string): Promise<Evidence[]>;
  findById(id: string): Promise<Evidence | null>;
}
```

---

# 37. EvidenceLink Repository Port

Required:

```ts
export interface EvidenceLinkRepository {
  listByClaim(claimId: string): Promise<EvidenceLink[]>;
  listByEvidence(evidenceId: string): Promise<EvidenceLink[]>;
}
```

---

# 38. JSON Adapters

Required:

```text
JsonClaimRepository
JsonEvidenceRepository
JsonEvidenceLinkRepository
```

UI MUST NOT read governance JSON directly.

---

# 39. Static Data Structure

Recommended:

```text
data/projects/arcana/
├── project.manifest.json
├── current.json
├── versions/
├── claims/
│   └── claims.json
├── evidence/
│   ├── evidence.json
│   └── links.json
└── narratives/
```

Exact physical organization may vary if documented.

---

# 40. Schema Versioning

Claims/evidence data SHALL include schema version.

Example:

```json
{
  "schemaVersion": "1.0",
  "projectVersion": "0.1.0"
}
```

Do not confuse governance schema with Project Twin project version.

---

# 41. Application Use Cases — Claims

Required:

```text
ListProjectClaims
GetClaim
ListSectionClaims
EvaluateClaimSupport
ValidateClaim
```

Recommended:

```text
GetClaimGovernanceDetail
```

---

# 42. Application Use Cases — Evidence

Required:

```text
ListProjectEvidence
GetEvidence
GetEvidenceForClaim
ValidateEvidence
```

---

# 43. Application Use Cases — Governance

Required:

```text
EvaluateProjectClaimCoverage
BuildProjectTrustSummary
AnnotateNarrativeTrust
```

---

# 44. Claim Coverage

Create deterministic coverage reporting.

Example:

```text
Project:
ARCANA

Active Claims:
24

FACT:
8
  Supported: 5
  Partial: 1
  Unsupported: 2

TARGET:
4

ASSUMPTION:
5

HYPOTHESIS:
4

ESTIMATE:
3
```

---

# 45. Claim Coverage by Section

Required.

Example:

```text
BUSINESS_MODEL

Claims: 6
Supported Facts: 2
Unsupported Facts: 1
Targets: 2
Assumptions: 1
```

This allows the user to see weak sections.

---

# 46. Project Trust Summary

Create a deterministic summary.

DO NOT create a single opaque "Trust Score".

Required output SHOULD include counts and explicit statuses.

Example:

```text
CRITICAL FACT CLAIMS
Supported: 3
Unsupported: 1

HIGH MATERIALITY CLAIMS
Supported: 6
Partial: 2
Unsupported: 2

Contradicted Claims: 1
Unreviewed Claims: 4
```

Optional derived readiness may be:

```text
TRUST_READY
TRUST_READY_WITH_WARNINGS
TRUST_NOT_READY
```

if rules are explicit.

---

# 47. Trust Readiness

Recommended values:

```text
TRUST_READY
TRUST_READY_WITH_WARNINGS
TRUST_NOT_READY
```

Default rules:

```text
Any CRITICAL active FACT claim CONTRADICTED
→ TRUST_NOT_READY
```

```text
Any CRITICAL active FACT claim UNSUPPORTED
→ TRUST_NOT_READY
```

```text
HIGH materiality unsupported FACT claims
→ TRUST_READY_WITH_WARNINGS
```

```text
No blocking governance issues
→ TRUST_READY
```

Exact thresholds SHALL be documented.

---

# 48. Narrative Integration

Phase 002 NarrativePlan remains deterministic.

Phase 003 SHALL add trust annotations without rewriting the entire compiler.

Recommended:

```text
NarrativePlan
      ↓
AnnotateNarrativeTrust
      ↓
NarrativeTrustContext
```

---

# 49. NarrativeTrustContext

Conceptual contract:

```ts
interface NarrativeTrustContext {
  narrativePlanId: string;
  claimIds: string[];
  unsupportedMaterialClaims: string[];
  contradictedClaims: string[];
  warnings: NarrativeTrustWarning[];
  readiness: NarrativeTrustReadiness;
}
```

---

# 50. Narrative Step Claim References

NarrativeStep MAY be extended to support:

```text
claimRefs
```

or a separate derived mapping may be created.

Avoid tightly coupling Narrative domain to Claim implementation.

Preferred:

```text
NarrativeClaimMapper
```

in application/integration layer.

---

# 51. Narrative Trust Warning

Examples:

```text
UNSUPPORTED_FACT_IN_NARRATIVE
```

```text
CONTRADICTED_CLAIM_IN_NARRATIVE
```

```text
HIGH_MATERIALITY_UNREVIEWED_CLAIM
```

```text
TARGET_PRESENTED_WITHOUT_LABEL
```

The last rule is especially important.

Narrative/presentation consumers MUST preserve ClaimType labeling.

---

# 52. No Semantic Reclassification by Narrative

Narrative Engine MUST NOT convert:

```text
TARGET
→ FACT
```

or:

```text
ASSUMPTION
→ FACT
```

or:

```text
HYPOTHESIS
→ FACT
```

A test SHALL enforce this.

---

# 53. Presentation-Safe Claim Labeling

Phase 003 SHALL define presentation-safe labels.

Recommended:

```text
FACT
ESTIMATE
ASSUMPTION
TARGET
HYPOTHESIS
```

These labels SHALL be available to future presentation components.

Visual design belongs to Phase 004.

---

# 54. Governance UI

Create:

```text
Claims & Evidence
```

workspace inside Project Workspace.

Minimum views:

```text
Claims
Evidence
Coverage
Trust Summary
```

---

# 55. Claims Table / List

Minimum columns:

```text
Claim
Type
Materiality
Support Status
Review Status
Section
Evidence Count
```

Filtering SHOULD support:

```text
Type
Support Status
Materiality
Section
```

No advanced data grid library is required.

---

# 56. Claim Detail

Required display:

```text
Claim text
Claim Type
Section
Materiality
Support Status
Review Status
Evidence Links
Source References
Support Explanation
```

---

# 57. Evidence Detail

Required display:

```text
Title
Type
Status
Source
Reference
Date
Linked Claims
Metadata
```

---

# 58. Coverage View

Display deterministic counts.

No decorative score without explanation.

---

# 59. Trust Summary View

Display:

```text
Supported FACT claims
Partially supported FACT claims
Unsupported FACT claims
Contradicted claims
Critical claims
High materiality claims
Unreviewed claims
```

---

# 60. Arcana Pilot

Arcana SHALL be the first governed Project Twin.

The IDE SHALL inspect only source materials already in the repository.

It MUST NOT invent claims or evidence.

---

# 61. Arcana Pilot Claim Set

Create a meaningful pilot set from supported source material.

Minimum target:

```text
15 claims
```

Recommended:

```text
20–30 claims
```

Do not create artificial claims merely to reach a number.

The final number SHALL depend on actual source material.

---

# 62. Arcana Claim Type Diversity

Pilot SHOULD contain where source material allows:

```text
FACT
ESTIMATE
ASSUMPTION
TARGET
HYPOTHESIS
```

If a type is not genuinely present, do not fabricate one just for test diversity.

Synthetic test fixtures may cover missing types separately.

---

# 63. Arcana Evidence

Evidence SHALL reference existing repository artifacts where possible.

Examples:

```text
Arcana deck
Project Twin sourceRefs
Markdown source documents
Architecture documentation
Existing calculation/model artifacts
```

Do not claim external verification unless actually present.

---

# 64. Arcana Unsupported Claims

It is acceptable and desirable for pilot governance to expose:

```text
UNSUPPORTED
```

claims.

The goal is not to make every claim green.

The goal is to model truthfully what is supported.

---

# 65. Arcana Contradiction

Do NOT invent contradictory evidence.

If no contradiction exists:

```text
Contradicted claims: 0
```

Synthetic fixtures may test contradiction logic.

---

# 66. Evidence Provenance

Arcana evidence MUST include enough locator information for a human reviewer to trace its origin.

Examples:

```text
deck_arcana_15.json → slide 4
```

```text
Arcana_Investor_Presentation_EN_VISUAL.pptx → slide 7
```

If exact page/slide cannot be established from available data:

```text
locator: UNKNOWN
```

and document the limitation.

Do not invent locators.

---

# 67. Claims Extraction Policy

Phase 003 claim extraction is manual/deterministic implementation work.

No AI extraction.

The IDE may map existing explicit assertions into Claim objects.

It MUST document source provenance.

---

# 68. Claim Text Integrity

Claims SHOULD remain semantically faithful to source material.

The IDE may normalize wording for atomicity, but MUST NOT strengthen the meaning.

Bad:

```text
Source:
"Arcana is designed to reduce leakage."

Claim:
"Arcana eliminates leakage."
```

Forbidden.

---

# 69. Atomic Claim Principle

Prefer one assertion per Claim.

Bad:

```text
"Arcana reduces leakage, improves margins, prevents fraud and guarantees auditability."
```

Preferred:

```text
Claim A
Arcana is designed to reduce operational leakage.

Claim B
Arcana is designed to improve auditability.

Claim C
Arcana targets margin protection through operational verification.
```

Only if supported by sources.

---

# 70. Material Claim Definition

Material claims include assertions that could affect:

- investment decision;
- purchase decision;
- regulatory assessment;
- technical feasibility;
- financial model;
- competitive differentiation;
- traction;
- customer validation;
- market opportunity.

Such claims SHOULD be MEDIUM/HIGH/CRITICAL.

---

# 71. Financial Claim Governance

Claims involving:

```text
Revenue
EBITDA
Market Size
CAC
LTV
CAPEX
OPEX
Growth
Margins
Valuation
ROI
```

MUST NOT default to FACT.

Their ClaimType must reflect source semantics.

Examples:

```text
forecast
→ ESTIMATE
```

```text
management goal
→ TARGET
```

```text
planning input
→ ASSUMPTION
```

---

# 72. Technology Claim Governance

Claims such as:

```text
"cannot be hacked"
"100% secure"
"zero hallucination"
"impossible to spoof"
```

SHALL require strong evidence if classified FACT.

Otherwise they SHOULD remain:

```text
TARGET
HYPOTHESIS
```

or be rejected from governed active claims if unsupported wording is unsafe.

The IDE MUST NOT silently rewrite source material to make it defensible without documenting the normalization.

---

# 73. Claim Review Workflow

Without user accounts, provide local status transitions only.

Allowed conceptual transitions:

```text
UNREVIEWED
   ↓
REVIEW_REQUIRED
   ↓
REVIEWED
```

or:

```text
REVIEW_REQUIRED
   ↓
CHANGES_REQUESTED
```

Do not build a collaborative workflow engine.

---

# 74. Evidence Review Workflow

Evidence status changes are data updates, not authenticated workflows.

No approval signatures.

---

# 75. Domain Events

Recommended events:

```text
ClaimLoaded
ClaimSupportEvaluated
EvidenceLoaded
EvidenceLinked
ProjectTrustEvaluated
NarrativeTrustAnnotated
```

Use current in-memory event infrastructure.

---

# 76. Error Model

Required errors:

```text
ClaimNotFoundError
EvidenceNotFoundError
EvidenceLinkNotFoundError
InvalidClaimError
InvalidEvidenceError
InvalidEvidenceLinkError
CrossProjectEvidenceLinkError
CrossVersionEvidenceLinkError
UnsupportedClaimTypeError
UnsupportedEvidenceTypeError
```

---

# 77. Cross-Project Rule

By default, evidence from Project A SHALL NOT support a Claim from Project B.

Cross-project evidence is out of scope.

---

# 78. Cross-Version Rule

Evidence/claims belong to a ProjectVersion.

Cross-version references MAY exist as provenance, but active support evaluation SHALL use explicit versioned links.

Avoid accidental support from stale project versions.

---

# 79. Superseded Evidence

Evidence marked:

```text
SUPERSEDED
```

SHALL NOT count as active positive support unless explicitly allowed by a versioned rule.

---

# 80. Invalid Evidence

Evidence marked:

```text
INVALID
```

SHALL not support claims.

---

# 81. Disputed Evidence

Evidence marked:

```text
DISPUTED
```

SHALL generate governance warnings.

It SHALL NOT be silently treated as clean support.

---

# 82. Evidence Availability

Evidence with:

```text
MISSING
```

may preserve provenance metadata but contributes no positive support.

---

# 83. Governance Determinism

Given the same:

```text
Claim
Evidence
EvidenceLinks
Governance Rules Version
```

the evaluator MUST return the same result.

---

# 84. Governance Engine Version

Create:

```text
governanceEngineVersion
```

Recommended:

```text
1.0.0
```

Trust outputs SHALL record this version.

---

# 85. Policy Versioning

Governance policy SHOULD expose:

```text
policyVersion
```

Recommended:

```text
1.0
```

This supports future evolution.

---

# 86. Testability

Inject deterministic dependencies where needed.

Avoid direct use of current time in pure domain evaluations.

---

# 87. Workstreams

## WS-003-01 — Claim Domain

Implement Claim aggregate/entity and value objects.

## WS-003-02 — Evidence Domain

Implement Evidence and SourceReference.

## WS-003-03 — Evidence Linking

Implement many-to-many linking.

## WS-003-04 — Governance Policies

Implement deterministic support rules.

## WS-003-05 — Repositories

Implement ports and JSON adapters.

## WS-003-06 — Application Use Cases

Implement claim/evidence/trust workflows.

## WS-003-07 — Narrative Trust Integration

Annotate NarrativePlan safely.

## WS-003-08 — Governance UI

Claims, Evidence, Coverage, Trust Summary.

## WS-003-09 — Arcana Pilot

Build real governed claim/evidence set.

## WS-003-10 — Tests

Unit, architecture, integration, E2E, regression.

## WS-003-11 — Documentation & Evidence

ADRs, architecture docs, traceability, verification.

---

# 88. Task Breakdown — Claim Domain

### T-003-001
Create Claim entity.

### T-003-002
Create ClaimId.

### T-003-003
Create ClaimType.

### T-003-004
Create ClaimStatus.

### T-003-005
Create ClaimSupportStatus.

### T-003-006
Create ClaimReviewStatus.

### T-003-007
Create ClaimMateriality.

### T-003-008
Create claim invariants.

### T-003-009
Create ClaimSupportExplanation.

### T-003-010
Create governance rule codes.

---

# 89. Task Breakdown — Evidence Domain

### T-003-101
Create Evidence entity.

### T-003-102
Create EvidenceId.

### T-003-103
Create EvidenceType.

### T-003-104
Create EvidenceStatus.

### T-003-105
Create EvidenceSource.

### T-003-106
Create SourceReference.

### T-003-107
Create evidence invariants.

---

# 90. Task Breakdown — Linking

### T-003-201
Create EvidenceLink.

### T-003-202
Create EvidenceRelation.

### T-003-203
Create EvidenceLinkStatus.

### T-003-204
Implement claim/evidence same-project validation.

### T-003-205
Implement version compatibility validation.

### T-003-206
Implement many-to-many relationship tests.

---

# 91. Task Breakdown — Governance Policies

### T-003-301
Create ClaimSupportEvaluator.

### T-003-302
Implement FACT rules.

### T-003-303
Implement ESTIMATE rules.

### T-003-304
Implement ASSUMPTION rules.

### T-003-305
Implement TARGET rules.

### T-003-306
Implement HYPOTHESIS rules.

### T-003-307
Implement contradiction handling.

### T-003-308
Implement invalid/disputed evidence handling.

### T-003-309
Add governance engine version.

### T-003-310
Add policy version.

---

# 92. Task Breakdown — Repositories

### T-003-401
Create ClaimRepository port.

### T-003-402
Create EvidenceRepository port.

### T-003-403
Create EvidenceLinkRepository port.

### T-003-404
Create JsonClaimRepository.

### T-003-405
Create JsonEvidenceRepository.

### T-003-406
Create JsonEvidenceLinkRepository.

### T-003-407
Create runtime schema validation.

---

# 93. Task Breakdown — Application

### T-003-501
Create ListProjectClaimsUseCase.

### T-003-502
Create GetClaimUseCase.

### T-003-503
Create ListSectionClaimsUseCase.

### T-003-504
Create EvaluateClaimSupportUseCase.

### T-003-505
Create ListProjectEvidenceUseCase.

### T-003-506
Create GetEvidenceUseCase.

### T-003-507
Create GetEvidenceForClaimUseCase.

### T-003-508
Create EvaluateProjectClaimCoverageUseCase.

### T-003-509
Create BuildProjectTrustSummaryUseCase.

### T-003-510
Create AnnotateNarrativeTrustUseCase.

---

# 94. Task Breakdown — Narrative Integration

### T-003-601
Define NarrativeClaimMapping boundary.

### T-003-602
Map NarrativeSteps to relevant claims.

### T-003-603
Create NarrativeTrustContext.

### T-003-604
Create NarrativeTrustWarning.

### T-003-605
Implement unsupported material claim warning.

### T-003-606
Implement contradicted claim warning.

### T-003-607
Implement type-preservation validation.

### T-003-608
Verify NarrativePlan remains deterministic.

### T-003-609
Verify Project Twin remains immutable.

---

# 95. Task Breakdown — UI

### T-003-701
Create Claims & Evidence route.

### T-003-702
Create Claims view.

### T-003-703
Create claim filters.

### T-003-704
Create Claim Detail.

### T-003-705
Create Evidence view.

### T-003-706
Create Evidence Detail.

### T-003-707
Create Coverage view.

### T-003-708
Create Trust Summary view.

### T-003-709
Create support status badges.

### T-003-710
Create claim type labels.

### T-003-711
Create review status labels.

### T-003-712
Add Narrative trust warnings to preview.

---

# 96. Task Breakdown — Arcana Pilot

### T-003-801
Inventory Arcana material assertions.

### T-003-802
Create atomic Arcana Claim set.

### T-003-803
Classify Arcana ClaimTypes.

### T-003-804
Assign materiality.

### T-003-805
Create Arcana Evidence set.

### T-003-806
Create SourceReferences.

### T-003-807
Create EvidenceLinks.

### T-003-808
Evaluate support statuses.

### T-003-809
Create Arcana claim coverage report.

### T-003-810
Create Arcana trust summary.

### T-003-811
Annotate three Phase 002 Arcana narratives with trust context.

### T-003-812
Verify no unsupported fact is silently promoted.

---

# 97. Task Breakdown — Tests

### T-003-901
Test Claim invariants.

### T-003-902
Test Evidence invariants.

### T-003-903
Test EvidenceLink invariants.

### T-003-904
Test FACT support rules.

### T-003-905
Test ESTIMATE support rules.

### T-003-906
Test ASSUMPTION rules.

### T-003-907
Test TARGET rules.

### T-003-908
Test HYPOTHESIS rules.

### T-003-909
Test contradictory evidence.

### T-003-910
Test disputed evidence.

### T-003-911
Test invalid evidence.

### T-003-912
Test superseded evidence.

### T-003-913
Test cross-project rejection.

### T-003-914
Test cross-version rules.

### T-003-915
Test claim coverage.

### T-003-916
Test trust readiness.

### T-003-917
Test narrative trust warnings.

### T-003-918
Test no semantic reclassification.

### T-003-919
Test governance determinism.

### T-003-920
Test Project Twin immutability.

### T-003-921
Test NarrativePlan determinism after annotation.

### T-003-922
Test JSON repositories.

### T-003-923
Test Claims UI E2E.

### T-003-924
Test Evidence UI E2E.

### T-003-925
Test Coverage UI E2E.

### T-003-926
Test Trust Summary UI E2E.

### T-003-927
Test Arcana governance pilot.

### T-003-928
Run architecture tests.

### T-003-929
Run Phase 002 regression.

### T-003-930
Run Phase 001 regression.

### T-003-931
Run Phase 000A regression.

### T-003-932
Run Phase 0 legacy preservation.

---

# 98. Task Breakdown — Documentation

### T-003-1001
Create Claims Domain Model.

### T-003-1002
Create Evidence Domain Model.

### T-003-1003
Create Claim Type Governance Reference.

### T-003-1004
Create Evidence Type Reference.

### T-003-1005
Create Support Evaluation Rules.

### T-003-1006
Create Trust Readiness Rules.

### T-003-1007
Create Narrative Trust Integration document.

### T-003-1008
Create Arcana Claims & Evidence Pilot Report.

### T-003-1009
Create SPEC-003 Traceability Matrix.

### T-003-1010
Create Phase 003 Verification Report.

---

# 99. Acceptance Criteria

## AC-003-001 — Claim Classification

Every active claim SHALL have exactly one valid ClaimType.

---

## AC-003-002 — Type Preservation

TARGET, ASSUMPTION, ESTIMATE, and HYPOTHESIS SHALL NOT be silently promoted to FACT.

---

## AC-003-003 — Material FACT Governance

Material FACT claims SHALL expose their support state.

---

## AC-003-004 — Evidence Traceability

Every EvidenceLink SHALL resolve to a valid Claim and Evidence item.

---

## AC-003-005 — Many-to-Many

Evidence reuse across multiple claims SHALL work without duplicating Evidence entities.

---

## AC-003-006 — Provenance

Evidence SHALL contain source/provenance information.

---

## AC-003-007 — Determinism

Same governance inputs SHALL produce same support outcomes.

---

## AC-003-008 — No Black Box Score

Trust output SHALL expose explicit counts/statuses rather than only an opaque score.

---

## AC-003-009 — Project Twin Immutability

Governance evaluation SHALL NOT mutate Project Twin.

---

## AC-003-010 — Narrative Integrity

Trust annotation SHALL NOT mutate the canonical NarrativePlan meaning or reclassify claim types.

---

## AC-003-011 — Unsupported Claim Warning

An unsupported material FACT used by a narrative SHALL produce a visible trust warning.

---

## AC-003-012 — Contradiction Warning

A contradicted active claim used by a narrative SHALL produce a critical trust warning.

---

## AC-003-013 — Arcana Pilot

Arcana SHALL contain a real governed claim/evidence set based on repository sources.

---

## AC-003-014 — No Fabrication

Arcana governance data SHALL not invent source facts, evidence, dates, metrics, or external validation.

---

## AC-003-015 — Static Build

Application SHALL remain static-hostable.

---

## AC-003-016 — Architecture

Claim/Evidence modules SHALL preserve hexagonal dependency rules.

---

## AC-003-017 — Regression

All prior phase tests SHALL remain passing.

---

## AC-003-018 — Forbidden Scope

No AI, backend, database, or Firebase runtime service may be introduced.

---

# 100. Required Arcana Governance Report

Create:

```text
docs/evidence/ARCANA_CLAIMS_EVIDENCE_PILOT_REPORT.md
```

Required sections:

## Claim Inventory

| Claim ID | Claim | Type | Materiality | Section | Support |
|---|---|---|---|---|---|

## Evidence Inventory

| Evidence ID | Type | Status | Source | Locator |
|---|---|---|---|---|

## Links

| Claim | Evidence | Relation | Status |
|---|---|---|---|

## Governance Summary

```text
Total Claims
FACT
ESTIMATE
ASSUMPTION
TARGET
HYPOTHESIS

Supported
Partially Supported
Unsupported
Contradicted
Not Required

Critical
High
Medium
Low
```

## Limitations

Explicitly list unsupported or unavailable source areas.

---

# 101. Required Narrative Trust Pilot

Re-evaluate the Phase 002 pilot narratives:

```text
ARCANA_INVESTOR_10_EN
ARCANA_EXECUTIVE_5_ES
ARCANA_TECHNICAL_20_EN
```

For each report:

```text
Referenced claims
Unsupported material claims
Contradicted claims
Targets
Assumptions
Hypotheses
Trust warnings
Trust readiness
```

Narrative timing/readiness from Phase 002 SHALL remain unchanged unless trust is represented as a separate overlay.

Preferred:

```text
NarrativeReadiness
+
TrustReadiness
```

Do NOT conflate them into one opaque state.

---

# 102. Required UI E2E Flows

Playwright SHALL validate:

```text
Open Project Workspace
Open Claims & Evidence
View Claims
Filter by Claim Type
Filter by Support Status
Open Claim Detail
Inspect Evidence Links
Open Evidence Detail
Open Coverage
Open Trust Summary
Open Narrative Preview
View Narrative Trust Warning
```

Desktop and mobile SHALL be covered.

---

# 103. Browser Runtime Gate

Required:

```text
Critical console errors: 0
Unhandled exceptions: 0
Critical asset 404s: 0
```

---

# 104. Regression Gate

Required:

```text
Phase 003 tests             PASS
Phase 002 regression        PASS
Phase 001 regression        PASS
Phase 000A regression       PASS
Phase 0 legacy              45/45 PASS minimum
```

No existing test may be deleted to force a pass.

---

# 105. Architecture Gate

Required:

```text
0 dependency violations
```

Specifically verify:

```text
claim/domain
MUST NOT import
ui/adapters/firebase/legacy
```

```text
evidence/domain
MUST NOT import
ui/adapters/firebase/legacy
```

---

# 106. Forbidden Scope Audit

Final report MUST explicitly state:

```text
OpenAI: NOT IMPLEMENTED
Claude: NOT IMPLEMENTED
Gemini: NOT IMPLEMENTED
Ollama: NOT IMPLEMENTED
AI SDK: NOT IMPLEMENTED
AI Claim Extraction: NOT IMPLEMENTED
Automated Fact Checking: NOT IMPLEMENTED

Firestore: NOT IMPLEMENTED
Firebase Auth: NOT IMPLEMENTED
Firebase Storage: NOT IMPLEMENTED
Cloud Functions: NOT IMPLEMENTED

Backend: NOT IMPLEMENTED
Database: NOT IMPLEMENTED

Data Room: NOT IMPLEMENTED
External Research: NOT IMPLEMENTED
PPTX Export: NOT IMPLEMENTED
PDF Export: NOT IMPLEMENTED

Static Web Architecture: PRESERVED
```

---

# 107. Definition of Done

Phase 003 may become `CODE_COMPLETE` only when:

- Claim domain exists;
- Evidence domain exists;
- EvidenceLink exists;
- claim types exist;
- support evaluator exists;
- repositories exist;
- JSON adapters exist;
- governance use cases exist;
- coverage works;
- trust summary works;
- narrative trust annotations work;
- Claims & Evidence UI works;
- Arcana pilot exists;
- tests exist;
- architecture passes;
- build passes;
- forbidden scope remains absent.

Phase 003 becomes `VERIFIED` only if:

```text
TYPECHECK                        PASS
ARCHITECTURE                     PASS
CLAIM DOMAIN TESTS               PASS
EVIDENCE DOMAIN TESTS            PASS
LINK TESTS                       PASS
SUPPORT POLICY TESTS             PASS
GOVERNANCE DETERMINISM           PASS
PROJECT TWIN IMMUTABILITY        PASS
NARRATIVE TYPE PRESERVATION      PASS
NARRATIVE TRUST TESTS            PASS
ARCANA PILOT                     PASS
CLAIMS UI E2E                    PASS
EVIDENCE UI E2E                  PASS
COVERAGE UI E2E                  PASS
TRUST SUMMARY UI E2E             PASS
PHASE 002 REGRESSION             PASS
PHASE 001 REGRESSION             PASS
PHASE 000A REGRESSION            PASS
PHASE 0 LEGACY                   PASS
STATIC BUILD                     PASS
CONSOLE                          PASS
FORBIDDEN SCOPE                  PASS
```

Only human approval may set:

```text
CLOSED
```

---

# 108. Required Documentation

Create:

```text
docs/architecture/CLAIMS_DOMAIN_MODEL.md
docs/architecture/EVIDENCE_DOMAIN_MODEL.md
docs/architecture/CLAIM_TYPE_GOVERNANCE_REFERENCE.md
docs/architecture/EVIDENCE_TYPE_REFERENCE.md
docs/architecture/CLAIM_SUPPORT_EVALUATION_RULES.md
docs/architecture/TRUST_READINESS_RULES.md
docs/architecture/NARRATIVE_TRUST_INTEGRATION.md
docs/evidence/ARCANA_CLAIMS_EVIDENCE_PILOT_REPORT.md
docs/evidence/SPEC_003_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_003_VERIFICATION_REPORT.md
```

---

# 109. Recommended ADRs

Create:

```text
ADR-0020 Claims as First-Class Domain Entities
ADR-0021 Evidence as Reusable Provenance Objects
ADR-0022 Explicit Claim Type Semantics
ADR-0023 Deterministic Support Evaluation
ADR-0024 Many-to-Many Claim Evidence Links
ADR-0025 Trust Summary Without Opaque Scoring
ADR-0026 Narrative Trust as Derived Overlay
ADR-0027 Static Governance Persistence
```

---

# 110. Required Verification Report

The IDE MUST generate:

```text
docs/evidence/PHASE_003_VERIFICATION_REPORT.md
```

Required sections:

## Identification

- phase;
- SPEC;
- branch;
- starting commit;
- ending commit;
- date;
- governance engine version;
- policy version.

## Task Matrix

Every `T-003-*`.

Statuses:

```text
DONE
PARTIAL
BLOCKED
NOT_STARTED
```

## Claim Domain

Report:

- claim types;
- status values;
- materiality;
- support statuses;
- review states.

## Evidence Domain

Report:

- evidence types;
- evidence statuses;
- evidence link relationships.

## Arcana Pilot

Report:

```text
Total claims
Claim type counts
Support counts
Evidence count
Evidence link count
Trust readiness
Unsupported material facts
Contradicted claims
```

## Narrative Trust

For:

```text
Investor
Executive
Technical
```

report:

```text
Referenced claims
Unsupported material claims
Contradictions
Trust warnings
Trust readiness
```

## Test Matrix

| Verification | Result |
|---|---|
| Typecheck | |
| Architecture | |
| Claims | |
| Evidence | |
| Links | |
| Policies | |
| Determinism | |
| Project Twin immutability | |
| Narrative type preservation | |
| Narrative trust | |
| Arcana pilot | |
| Claims E2E | |
| Evidence E2E | |
| Coverage E2E | |
| Trust Summary E2E | |
| Regression | |
| Legacy | |
| Build | |
| Console | |

## Scope Audit

Include all forbidden scope confirmations.

## Final Recommendation

Allowed:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

---

# 111. SDD State Machine

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

The IDE MUST NOT self-close the phase.

---

# 112. Change Control

If additional scope is required:

1. stop the affected task;
2. create:

```text
docs/specs/changes/CHANGE_REQUEST_003_XXX.md
```

3. document:
   - problem;
   - proposed change;
   - impact;
   - alternatives;
   - risks;
4. wait for owner approval.

---

# 113. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-003 — Claims & Evidence Governance`

under:

`SPEC-003 — Claims & Evidence Governance`

Previous phase:

`VHOS-PHASE-002 — Adaptive Narrative Engine`

is approved CLOSED.

---

## PRIMARY OBJECTIVE

Implement the Claims & Evidence Governance layer of Venture Hub OS.

The system must distinguish:

```text
FACT
ESTIMATE
ASSUMPTION
TARGET
HYPOTHESIS
```

and connect governed claims to traceable evidence.

---

## BEFORE WRITING CODE

You MUST:

1. read Phase 0 baseline docs;
2. read Phase 000A architecture docs;
3. read Phase 001 Project Twin docs;
4. read Phase 002 Narrative Engine docs;
5. run the complete existing verification suite;
6. confirm all baseline gates pass;
7. inspect Arcana Project Twin and repository source artifacts;
8. map implementation to `T-003-*`;
9. document an implementation plan.

Do not start with UI.

Start with Claim/Evidence Domain.

---

## IMPLEMENTATION ORDER

Required:

```text
Claim Domain
      ↓
Evidence Domain
      ↓
Evidence Linking
      ↓
Governance Rules
      ↓
Repositories
      ↓
Application Use Cases
      ↓
Narrative Trust Integration
      ↓
Arcana Pilot
      ↓
Governance UI
      ↓
Tests
```

---

## ARCHITECTURE RULE

Preserve:

```text
UI
 ↓
Application
 ↓
Domain
```

Claim and Evidence domains MUST NOT depend on:

- UI;
- DOM;
- JSON implementation;
- Firebase;
- browser storage implementation;
- legacy;
- AI.

---

## DATA DISCIPLINE

Do NOT invent:

- claims unsupported by repository source material;
- evidence;
- source locations;
- dates;
- metrics;
- customers;
- contracts;
- validation;
- market facts.

When support is unavailable:

```text
UNSUPPORTED
```

is a valid and expected result.

---

## CLAIM TYPE RULE

Do NOT convert:

```text
TARGET
ASSUMPTION
ESTIMATE
HYPOTHESIS
```

into:

```text
FACT
```

unless the underlying source semantics actually support that classification and the change is documented.

---

## NO GREENWASHING RULE

Do not attempt to make Arcana appear more validated than it is.

A governance system is successful when it exposes unsupported or uncertain claims accurately.

---

## EVIDENCE RULE

Evidence must be traceable.

Prefer:

```text
source
reference
locator
```

If locator is unknown:

```text
UNKNOWN
```

Do not invent it.

---

## GOVERNANCE RULE

Support evaluation must be deterministic and explainable.

No opaque trust score.

No AI confidence.

---

## NARRATIVE INTEGRATION RULE

Narrative Engine remains canonical from Phase 002.

Trust is an overlay.

Do not destabilize:

- duration;
- ordering;
- determinism;
- NarrativeReadiness.

Use separate:

```text
TrustReadiness
```

when possible.

---

## ARCANA PILOT

Build a real governed claim/evidence set using repository sources.

Do not hard-code rules specifically for Arcana.

Arcana is a pilot dataset, not a special-case domain.

---

## AUTHORIZED TECHNOLOGY

Use only the existing approved stack and narrowly necessary static/schema/testing tools.

No infrastructure expansion.

---

## FORBIDDEN

Do NOT implement:

- OpenAI;
- Claude;
- Gemini;
- Ollama;
- AI SDKs;
- AI claim extraction;
- automated web fact checking;
- Firestore;
- Firebase Auth;
- Firebase Storage;
- Cloud Functions;
- backend;
- database;
- authenticated Data Room;
- external research APIs;
- PPTX/PDF export.

---

## REQUIRED TESTING

Before CODE_COMPLETE run:

1. typecheck;
2. architecture tests;
3. Claim domain tests;
4. Evidence domain tests;
5. EvidenceLink tests;
6. governance policy tests;
7. determinism tests;
8. Project Twin immutability;
9. narrative type-preservation tests;
10. narrative trust tests;
11. Arcana pilot tests;
12. Claims/Evidence Playwright tests;
13. Phase 002 regression;
14. Phase 001 regression;
15. Phase 000A regression;
16. Phase 0 legacy preservation;
17. static build;
18. browser console validation;
19. forbidden-scope audit.

All mandatory checks must pass.

---

## REQUIRED OUTPUT

Generate:

```text
docs/evidence/PHASE_003_VERIFICATION_REPORT.md
```

Final recommendation may only be:

```text
READY_FOR_APPROVAL
```

if all mandatory gates pass.

Otherwise:

```text
NOT_READY
```

or:

```text
BLOCKED
```

Do NOT start Phase 004.

Do NOT mark Phase 003 CLOSED.

---

# 114. Expected End State

```text
                       PROJECT TWIN
                            │
                            ▼
                          CLAIMS
                            │
                    ┌───────┴───────┐
                    ▼               ▼
                 FACTS           TARGETS
                 ESTIMATES       ASSUMPTIONS
                 HYPOTHESES
                    │
                    ▼
                 EVIDENCE
                    │
                    ▼
             SUPPORT EVALUATION
                    │
             ┌──────┴──────┐
             ▼             ▼
      PROJECT TRUST   NARRATIVE TRUST
             │             │
             └──────┬──────┘
                    ▼
             EXECUTIVE EXPERIENCE
```

The platform remains:

```text
WEB-FIRST
STATIC
DETERMINISTIC
NO AI
NO BACKEND
NO DATABASE
NO FIREBASE RUNTIME
```

but now project assertions become traceable and governable.

---

# 115. Exit Decision

If all criteria pass:

> **Apruebo formalmente VHOS-PHASE-003 — Claims & Evidence Governance bajo SPEC-003 como VERIFIED/CLOSED y autorizo el inicio de VHOS-PHASE-004 — Executive Presentation Engine, manteniendo la arquitectura Feature-Oriented Hexagonal, el enfoque web-first, la persistencia estática, el Narrative Engine determinístico y la gobernanza explícita de Claims & Evidence sin IA generativa.**
