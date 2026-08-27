# Venture Hub OS — Phase 001: Core Platform / Project Twin

**Document ID:** `VHOS-PHASE-001`  
**Specification:** `SPEC-001 — Project Workspace & Project Twin`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-000A — Web & Hexagonal Foundation`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Deployment Model:** Web-first / Static Hosting  
**Persistence Model:** Static JSON repositories for current phase  
**Backend Services:** NOT AUTHORIZED  
**Firebase Runtime Services:** NOT AUTHORIZED  
**Next Phase:** `VHOS-PHASE-002 — Adaptive Narrative Engine`

---

# 1. Executive Purpose

Phase 001 creates the central domain model of Venture Hub OS:

> **Project Twin**

The Project Twin is the canonical, structured, versioned representation of a venture or project.

The strategic change is:

```text
BEFORE

Presentation
    ↓
contains the project


AFTER

Project Twin
    ↓
contains the project truth
    ↓
presentations become views
```

A presentation SHALL no longer be the primary source of truth.

The project must exist independently from:

- slides;
- deck order;
- CSS;
- audience;
- language;
- visual theme;
- presenter mode.

The Project Twin becomes the foundation for future:

- Narrative Engine;
- Claims & Evidence;
- Executive Intelligence;
- comparison engine;
- due diligence;
- AI Copilot;
- financial scenarios;
- publishing.

---

# 2. Primary Outcome

At the end of Phase 001, Venture Hub OS SHALL be able to represent a project through structured domain data.

Example:

```text
ARCANA
│
├── Identity
├── Executive Summary
├── Problem
├── Customer
├── Solution
├── Why Now
├── Market
├── Product
├── Business Model
├── Competition
├── Traction
├── Financials
├── Technology
├── Risks
├── Roadmap
├── Team
├── Ask
└── Metadata
```

The application SHALL load this project through the hexagonal architecture created in Phase 000A.

---

# 3. Architectural Mandate

The dependency direction remains:

```text
UI
 ↓
Application
 ↓
Domain
 ↓
Ports
 ↑
Adapters
```

Project Twin MUST live in the Domain.

Project Twin MUST NOT depend on:

- DOM;
- Vite;
- CSS;
- browser APIs;
- JSON file paths;
- Firebase;
- legacy decks;
- presentation components;
- UI state.

---

# 4. Phase Scope

## 4.1 In Scope

Phase 001 SHALL implement:

- Project aggregate;
- ProjectVersion;
- ProjectSection;
- ProjectMetadata;
- ProjectStatus;
- ProjectType;
- project lifecycle;
- Project Twin schema;
- project invariants;
- project versioning;
- project repository expansion;
- JSON persistence adapter;
- project workspace read experience;
- project section navigation;
- project validation;
- migration/import of one pilot project;
- legacy compatibility mapping;
- Project Twin verification;
- architecture and unit tests.

## 4.2 Pilot Project

The mandatory pilot project is:

```text
ARCANA
```

Arcana SHALL be the first venture represented as a full Project Twin.

Reason:

- business model;
- technology;
- architecture;
- financial assumptions;
- risks;
- operational model;
- claims;
- future evidence;
- investor narrative.

This makes Arcana an appropriate stress test for the domain.

## 4.3 Explicitly Out of Scope

Do NOT implement:

- Adaptive Narrative Engine;
- AI-generated presentation;
- Claims & Evidence Engine;
- Evidence linking;
- Data Room;
- AI Copilot;
- Firestore;
- Firebase Auth;
- Firebase Storage;
- Cloud Functions;
- backend API;
- collaborative editing;
- RBAC;
- billing;
- multi-tenant SaaS logic;
- financial calculation engine;
- automated due diligence;
- investor scoring;
- project comparison engine.

---

# 5. Project Twin Definition

A Project Twin is:

> A structured, versioned, validated domain representation of a venture independent from its presentation format.

A valid Project Twin SHALL contain:

```text
Identity
Strategy
Business
Product
Technology
Economics
Execution
Risk
Governance Metadata
```

Not all sections require complete content.

The system SHALL distinguish between:

```text
section exists
section incomplete
section validated
section not applicable
```

---

# 6. Project Aggregate

`Project` SHALL be the aggregate root.

Conceptually:

```ts
Project
{
  id
  slug
  name
  shortName
  type
  status
  schemaVersion
  currentVersion
  languages
  defaultLanguage
  createdAt
  updatedAt
  metadata
  sections
}
```

Only domain-safe representations may enter the aggregate.

---

# 7. Core Entities

## 7.1 Project

Required.

Responsibilities:

- project identity;
- lifecycle;
- current version;
- section ownership;
- validation;
- invariants.

---

## 7.2 ProjectVersion

Required.

Concept:

```text
Project
  ↓
Version 0.1
  ↓
Version 0.2
  ↓
Version 1.0
```

Fields SHOULD include:

```text
id
projectId
version
status
createdAt
createdBy
changeSummary
sections
```

Because no authentication exists yet:

```text
createdBy
```

may be:

```text
"system"
"local-user"
"migration"
```

No user management is required.

---

## 7.3 ProjectSection

Required.

Each section SHALL have:

```text
id
type
status
content
schemaVersion
updatedAt
```

Possible statuses:

```text
EMPTY
DRAFT
IN_REVIEW
VALIDATED
NOT_APPLICABLE
```

---

# 8. Canonical Section Types

Phase 001 SHALL support at minimum:

```text
IDENTITY
EXECUTIVE_SUMMARY
PROBLEM
CUSTOMER
SOLUTION
WHY_NOW
MARKET
PRODUCT
BUSINESS_MODEL
COMPETITION
TRACTION
FINANCIALS
TECHNOLOGY
RISKS
ROADMAP
TEAM
ASK
```

These are canonical domain sections.

They are NOT slides.

---

# 9. Section Content Strategy

ProjectSection SHALL use:

> Typed core + extensible content.

Recommended:

```ts
interface ProjectSection<TContent> {
  id: string;
  type: ProjectSectionType;
  status: ProjectSectionStatus;
  schemaVersion: string;
  content: TContent;
  updatedAt: string;
}
```

Each major section SHOULD receive its own schema.

Example:

```ts
interface ProblemSectionContent {
  statement: string;
  affectedUsers?: string[];
  currentAlternatives?: string[];
  painPoints?: string[];
  consequences?: string[];
}
```

Avoid one unvalidated `Record<string, unknown>` for the entire Project Twin.

---

# 10. Project Types

The platform SHALL support generic project classification.

Initial values:

```text
SOFTWARE
AI_PLATFORM
DEEPTECH
FOODTECH
EDTECH
INFRASTRUCTURE
SERVICE
PHYSICAL_BUSINESS
HYBRID
OTHER
```

Arcana MAY be:

```text
DEEPTECH
```

or:

```text
HYBRID
```

The exact pilot classification shall be documented.

---

# 11. Project Status

Required lifecycle:

```text
CONCEPT
VALIDATION
PILOT
ACTIVE
PAUSED
ARCHIVED
```

Phase 001 does NOT introduce automatic state transitions.

Transitions SHALL be explicit.

---

# 12. Project Twin Invariants

At minimum:

1. Project ID is immutable.
2. Project slug is immutable after creation unless migration explicitly authorizes change.
3. Project name is required.
4. `schemaVersion` is required.
5. `currentVersion` is required.
6. At least one language is required.
7. default language must be present in available languages.
8. every section type may appear at most once per ProjectVersion unless explicitly modeled as collection content.
9. every ProjectVersion belongs to exactly one Project.
10. ProjectVersion identifier must be unique.
11. ProjectSection status must use allowed values.
12. section content must pass its schema.
13. unsupported section types must be rejected.
14. project type must be valid.
15. project status must be valid.

---

# 13. Schema Versioning

Project Twin MUST preserve the distinction:

```text
schemaVersion
```

vs:

```text
projectVersion
```

Example:

```json
{
  "schemaVersion": "1.0",
  "projectVersion": "0.3.0"
}
```

`schemaVersion` describes the Venture Hub data structure.

`projectVersion` describes the individual project.

---

# 14. Project Versioning Model

Phase 001 SHALL support immutable historical versions conceptually.

Recommended structure:

```text
data/projects/arcana/
│
├── project.manifest.json
├── current.json
└── versions/
    ├── 0.1.0.json
    └── 0.2.0.json
```

A simpler structure is acceptable if:

- current version is explicit;
- prior versions are not overwritten;
- migration path is documented.

---

# 15. Repository Port

Expand:

```ts
ProjectRepository
```

to support Project Twin.

Required conceptual contract:

```ts
export interface ProjectRepository {
  list(): Promise<ProjectSummary[]>;
  findById(id: ProjectId): Promise<Project | null>;
  findBySlug(slug: ProjectSlug): Promise<Project | null>;
}
```

Optional current-phase methods:

```ts
save(project: Project): Promise<void>;
listVersions(projectId: ProjectId): Promise<ProjectVersionSummary[]>;
findVersion(projectId: ProjectId, version: string): Promise<ProjectVersion | null>;
```

Because deployment remains static, write operations MAY be excluded from the production adapter.

If write behavior is needed for local tooling, it must be isolated from the web runtime.

---

# 16. JSON Project Repository

The current persistence adapter SHALL be:

```text
JsonProjectRepository
```

Flow:

```text
Static JSON
   ↓
JsonProjectRepository
   ↓
ProjectRepository
   ↓
Application Use Case
   ↓
Project Domain
```

UI MUST NOT import JSON files directly.

---

# 17. Application Use Cases

Required:

```text
ListProjects
GetProject
GetProjectVersion
ValidateProjectTwin
GetProjectSections
GetProjectSection
```

Recommended:

```text
CompareProjectVersionMetadata
ResolveCurrentProjectVersion
```

Do not implement future intelligence use cases.

---

# 18. Queries

Required query layer:

```text
ListProjectsQuery
GetProjectQuery
GetProjectVersionQuery
GetProjectSectionsQuery
GetProjectSectionQuery
```

---

# 19. Commands

Phase 001 may implement limited commands if required by local Builder workflows.

Potential commands:

```text
CreateProjectDraft
UpdateProjectSection
CreateProjectVersion
SetProjectStatus
```

However, production static hosting cannot persist these writes remotely.

Therefore commands must either:

- operate in memory;
- use browser-local draft storage;
- export a new JSON artifact;
- remain deferred.

The IDE MUST NOT introduce backend persistence to satisfy command behavior.

---

# 20. Project Workspace UI

Phase 001 SHALL introduce the first Project Workspace.

Concept:

```text
ARCANA

Overview
Strategy
Business
Product
Technology
Financials
Risks
Roadmap
Team
Ask
```

This is not the final executive visual system.

It is the first structured project view.

Required behavior:

- load Project Twin;
- display metadata;
- navigate sections;
- show section status;
- expose project version;
- expose schema version;
- display validation state;
- open legacy presentation through adapter.

---

# 21. Project Workspace Header

Minimum information:

```text
Project Name
Project Type
Project Status
Project Version
Schema Version
Default Language
Validation Status
```

---

# 22. Section Navigator

The workspace SHALL provide a section navigator.

Example:

```text
Overview
Problem
Customer
Solution
Market
Business Model
Technology
Financials
Risks
Roadmap
Team
Ask
```

Each item SHOULD show status:

```text
● Validated
● Draft
○ Empty
– N/A
```

No scoring engine is needed.

---

# 23. Validation Engine

Phase 001 SHALL introduce domain validation.

Validation result SHOULD distinguish:

```text
ERROR
WARNING
INFO
```

Example:

```text
ERROR
Project name missing

WARNING
Market section exists but is EMPTY

INFO
Traction section marked NOT_APPLICABLE
```

Validation MUST be deterministic.

No AI validation is allowed.

---

# 24. Validation Result Contract

Recommended:

```ts
interface ValidationIssue {
  code: string;
  severity: "ERROR" | "WARNING" | "INFO";
  path: string;
  message: string;
}
```

And:

```ts
interface ProjectValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}
```

---

# 25. Legacy Compatibility

Phase 001 SHALL maintain:

```text
Project Twin
    ↕
Legacy Deck Adapter
```

The first pilot shall link Arcana Project Twin to the existing Arcana deck.

Required behavior:

```text
Arcana Project Workspace
       ↓
Open Legacy Presentation
       ↓
Existing Arcana Deck
```

No requirement exists yet to generate the deck from Project Twin.

That belongs to later phases.

---

# 26. Arcana Migration

Arcana SHALL be migrated from available project/deck material into:

```text
data/projects/arcana/
```

The migration SHALL preserve source distinction.

The IDE MUST NOT invent missing project facts.

If source material does not support a field:

```text
section status = EMPTY
```

or:

```text
DRAFT
```

as appropriate.

Do not fabricate:

- traction;
- market size;
- financial outcomes;
- customers;
- contracts;
- pilots;
- regulatory approvals.

---

# 27. Arcana Minimum Twin Coverage

Arcana pilot SHOULD contain, when supported:

```text
IDENTITY
EXECUTIVE_SUMMARY
PROBLEM
CUSTOMER
SOLUTION
WHY_NOW
PRODUCT
BUSINESS_MODEL
TECHNOLOGY
RISKS
ROADMAP
ASK
```

Other sections may remain:

```text
EMPTY
```

if evidence/source material is insufficient.

---

# 28. Source Trace Metadata

Phase 001 SHOULD prepare source traceability without implementing Evidence Engine.

ProjectSection MAY include:

```text
sourceRefs
```

Example:

```json
{
  "sourceRefs": [
    {
      "type": "legacy-deck",
      "reference": "arcana-slide-4"
    }
  ]
}
```

This is only provenance metadata.

Claims/evidence governance belongs to Phase 003.

---

# 29. Domain Events

Add:

```text
ProjectTwinLoaded
ProjectVersionResolved
ProjectValidated
ProjectSectionOpened
```

Events remain local/in-memory.

---

# 30. Error Model

Required domain/application errors:

```text
ProjectNotFoundError
ProjectVersionNotFoundError
InvalidProjectTwinError
InvalidProjectSectionError
UnsupportedProjectSchemaError
DuplicateProjectSectionError
```

Errors SHALL be explicit.

Avoid silent fallbacks.

---

# 31. Migration Compatibility

Phase 001 MUST NOT break Phase 000A project summaries.

Existing:

```text
ProjectSummary
```

must remain derivable from:

```text
Project
```

Prefer:

```text
Project
   ↓
toSummary()
   ↓
ProjectSummary
```

rather than duplicate data sources.

---

# 32. Static Hosting Constraint

The full Phase 001 production app must continue to build to:

```text
dist/
```

and run from static hosting.

No server dependency.

---

# 33. Firebase Constraint

Allowed:

```text
Firebase Hosting config
```

Not allowed:

```text
Firestore
Auth
Storage
Functions
Realtime Database
App Hosting
```

Do NOT implement Firebase adapters yet.

You may define a future port compatibility ADR, but no runtime code.

---

# 34. Security Constraints

Because project JSON may be publicly deployed:

- no secrets;
- no API keys;
- no private contracts;
- no confidential investor data;
- no personally sensitive information;
- no credentials.

Project Twin Phase 001 is public-safe project data only.

Sensitive Data Room content belongs to a future authenticated architecture.

---

# 35. Workstreams

## WS-001-01 — Domain Model

Implement Project aggregate and supporting types.

---

## WS-001-02 — Section Model

Implement canonical ProjectSection types and schemas.

---

## WS-001-03 — Project Versioning

Implement ProjectVersion and current version resolution.

---

## WS-001-04 — Repository Evolution

Expand repository port and JSON adapter.

---

## WS-001-05 — Validation

Implement deterministic Project Twin validation.

---

## WS-001-06 — Application Use Cases

Implement read use cases.

---

## WS-001-07 — Project Workspace

Implement structured project view.

---

## WS-001-08 — Legacy Compatibility

Connect Project Workspace to existing decks through legacy adapter.

---

## WS-001-09 — Arcana Pilot Migration

Create Arcana Project Twin.

---

## WS-001-10 — Tests

Unit, architecture, E2E, legacy preservation.

---

## WS-001-11 — Documentation & Evidence

ADRs, migration report, verification report.

---

# 36. Task Breakdown

## Domain

### T-001-001
Define Project aggregate.

### T-001-002
Define ProjectVersion.

### T-001-003
Define ProjectSection.

### T-001-004
Define ProjectSectionStatus.

### T-001-005
Define ProjectType.

### T-001-006
Expand ProjectStatus if needed.

### T-001-007
Define canonical ProjectSectionType.

### T-001-008
Implement Project invariants.

### T-001-009
Implement ProjectVersion invariants.

### T-001-010
Implement ProjectSection invariants.

---

## Schemas

### T-001-101
Create Project schema.

### T-001-102
Create ProjectVersion schema.

### T-001-103
Create ProjectSection base schema.

### T-001-104
Create Identity schema.

### T-001-105
Create Executive Summary schema.

### T-001-106
Create Problem schema.

### T-001-107
Create Customer schema.

### T-001-108
Create Solution schema.

### T-001-109
Create Why Now schema.

### T-001-110
Create Market schema.

### T-001-111
Create Product schema.

### T-001-112
Create Business Model schema.

### T-001-113
Create Competition schema.

### T-001-114
Create Traction schema.

### T-001-115
Create Financials schema.

### T-001-116
Create Technology schema.

### T-001-117
Create Risks schema.

### T-001-118
Create Roadmap schema.

### T-001-119
Create Team schema.

### T-001-120
Create Ask schema.

---

## Repository

### T-001-201
Expand ProjectRepository.

### T-001-202
Implement findBySlug.

### T-001-203
Implement current-version resolution.

### T-001-204
Implement version lookup.

### T-001-205
Update JsonProjectRepository.

### T-001-206
Preserve ProjectSummary compatibility.

---

## Application

### T-001-301
Implement GetProjectUseCase.

### T-001-302
Implement GetProjectVersionUseCase.

### T-001-303
Implement GetProjectSectionsUseCase.

### T-001-304
Implement GetProjectSectionUseCase.

### T-001-305
Implement ValidateProjectTwinUseCase.

---

## Validation

### T-001-401
Define ValidationIssue.

### T-001-402
Define severity levels.

### T-001-403
Implement structural validation.

### T-001-404
Implement invariant validation.

### T-001-405
Implement completeness warnings.

### T-001-406
Create validation summary.

---

## Workspace

### T-001-501
Create Project Workspace route.

### T-001-502
Create Workspace header.

### T-001-503
Create section navigator.

### T-001-504
Create section status indicators.

### T-001-505
Create section renderer.

### T-001-506
Create project metadata panel.

### T-001-507
Create validation panel.

### T-001-508
Create Open Legacy Presentation action.

---

## Arcana Pilot

### T-001-601
Inventory Arcana source material already in repository.

### T-001-602
Create Arcana manifest.

### T-001-603
Create Arcana current Project Twin.

### T-001-604
Populate only source-supported sections.

### T-001-605
Mark unsupported content EMPTY/DRAFT.

### T-001-606
Add sourceRefs metadata where practical.

### T-001-607
Validate Arcana Project Twin.

### T-001-608
Link Arcana Twin to legacy deck.

---

## Tests

### T-001-701
Unit test Project aggregate.

### T-001-702
Unit test ProjectVersion.

### T-001-703
Unit test ProjectSection.

### T-001-704
Test all schemas.

### T-001-705
Test invalid data rejection.

### T-001-706
Test duplicate section rejection.

### T-001-707
Test repository contract.

### T-001-708
Test Arcana load.

### T-001-709
Test Arcana validation.

### T-001-710
Test Workspace route.

### T-001-711
Test section navigation.

### T-001-712
Test legacy deck launch.

### T-001-713
Run architecture dependency tests.

### T-001-714
Run Phase 000A test suite.

### T-001-715
Run Phase 0 legacy preservation suite.

---

## Documentation

### T-001-801
Create Project Twin domain diagram.

### T-001-802
Create section taxonomy document.

### T-001-803
Create Project Twin JSON reference.

### T-001-804
Create Arcana migration report.

### T-001-805
Create SPEC-001 implementation traceability matrix.

### T-001-806
Create Phase 001 verification report.

---

# 37. Acceptance Criteria

## AC-001-001 — Project Independence

A Project Twin SHALL load without opening or parsing a presentation deck.

---

## AC-001-002 — Presentation Independence

Removing a legacy deck from runtime SHALL NOT invalidate the Project Twin domain object.

Legacy presentation availability may fail independently.

---

## AC-001-003 — Typed Domain

Project, ProjectVersion, and ProjectSection SHALL be TypeScript typed and runtime validated.

---

## AC-001-004 — No Direct JSON UI Access

UI MUST access project data only through application use cases and repository ports.

---

## AC-001-005 — Version Resolution

The application SHALL resolve the current project version deterministically.

---

## AC-001-006 — Section Uniqueness

Duplicate canonical section types in one project version SHALL be rejected unless the schema explicitly defines a collection.

---

## AC-001-007 — Validation

Malformed Project Twin data SHALL produce controlled validation errors.

---

## AC-001-008 — Workspace

Arcana SHALL open in Project Workspace with:

- metadata;
- version;
- status;
- section list;
- section content;
- validation state.

---

## AC-001-009 — Arcana Source Discipline

No unsupported Arcana facts may be invented during migration.

---

## AC-001-010 — Legacy Compatibility

Arcana Workspace SHALL be able to open the protected legacy Arcana presentation.

---

## AC-001-011 — Static Build

Production build SHALL remain static-hostable.

---

## AC-001-012 — Architecture

Domain SHALL remain isolated from UI/adapters/legacy/browser implementation.

---

## AC-001-013 — Existing Tests

Phase 000A and Phase 0 protected tests SHALL continue to pass.

---

## AC-001-014 — Forbidden Scope

No Firebase runtime services, backend, database, or AI integrations shall be introduced.

---

# 38. Definition of Done

Phase 001 may become `CODE_COMPLETE` only when:

- Project aggregate exists;
- ProjectVersion exists;
- ProjectSection exists;
- canonical section taxonomy exists;
- runtime schemas exist;
- repository supports Project Twin;
- current version resolution works;
- validation works;
- Project Workspace works;
- Arcana has a real Project Twin;
- Arcana legacy deck link works;
- required tests exist;
- architecture rules still pass;
- static build passes;
- forbidden scope remains absent.

Phase 001 becomes `VERIFIED` only if:

```text
TYPECHECK                  PASS
ARCHITECTURE TESTS         PASS
DOMAIN TESTS               PASS
SCHEMA TESTS               PASS
REPOSITORY TESTS           PASS
ARCANA MIGRATION TESTS     PASS
WORKSPACE E2E              PASS
LEGACY COMPATIBILITY       PASS
PHASE 000A REGRESSION      PASS
PHASE 0 PRESERVATION       PASS
STATIC BUILD               PASS
CONSOLE CHECK              PASS
FORBIDDEN SCOPE AUDIT      PASS
```

Only human approval may set:

```text
CLOSED
```

---

# 39. Required Verification Report

Generate:

```text
docs/evidence/PHASE_001_VERIFICATION_REPORT.md
```

Required sections:

## Identification

- Phase;
- SPEC;
- branch;
- starting commit;
- ending commit;
- date.

## Implementation Matrix

Every `T-001-*`.

Status:

```text
DONE
PARTIAL
BLOCKED
NOT_STARTED
```

## Domain Deliverables

- Project;
- ProjectVersion;
- ProjectSection;
- schemas;
- ports;
- repository;
- use cases.

## Arcana Migration

Report:

- populated sections;
- EMPTY sections;
- DRAFT sections;
- source references;
- validation issues.

## Tests

| Verification | Result |
|---|---|
| Typecheck | |
| Architecture | |
| Domain | |
| Schemas | |
| Repository | |
| Arcana | |
| Workspace E2E | |
| Legacy | |
| Build | |
| Console | |

## Scope Audit

Explicitly report:

```text
Firestore: NOT IMPLEMENTED
Firebase Auth: NOT IMPLEMENTED
Firebase Storage: NOT IMPLEMENTED
Cloud Functions: NOT IMPLEMENTED
Backend: NOT IMPLEMENTED
Database: NOT IMPLEMENTED
AI: NOT IMPLEMENTED
Narrative Engine: NOT IMPLEMENTED
Claims Engine: NOT IMPLEMENTED
Evidence Engine: NOT IMPLEMENTED
```

## Final Recommendation

Allowed:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

---

# 40. Required Documentation

Create:

```text
docs/architecture/PROJECT_TWIN_DOMAIN_MODEL.md
docs/architecture/PROJECT_SECTION_TAXONOMY.md
docs/architecture/PROJECT_VERSIONING_MODEL.md
docs/architecture/PROJECT_TWIN_JSON_REFERENCE.md
docs/evidence/ARCANA_PROJECT_TWIN_MIGRATION_REPORT.md
docs/evidence/SPEC_001_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_001_VERIFICATION_REPORT.md
```

---

# 41. Architecture Decision Records

Create or update ADRs as necessary.

Recommended:

```text
ADR-0008 Project as Aggregate Root
ADR-0009 Canonical Project Section Taxonomy
ADR-0010 Project Versioning Strategy
ADR-0011 Typed Core + Extensible Section Content
ADR-0012 Static Project Repository Strategy
ADR-0013 Project Twin / Presentation Separation
```

---

# 42. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-001 — Core Platform / Project Twin`

under:

`SPEC-001 — Project Workspace & Project Twin`

Previous phase:

`VHOS-PHASE-000A — Web & Hexagonal Foundation`

is approved CLOSED.

---

## PRIMARY OBJECTIVE

Implement the canonical Project Twin domain and Project Workspace while preserving:

- Feature-Oriented Hexagonal Architecture;
- web-first deployment;
- static hosting;
- JSON persistence;
- legacy compatibility.

---

## BEFORE WRITING CODE

You MUST:

1. read Phase 0 baseline documentation;
2. read Phase 000A architecture and ADRs;
3. inspect current source structure;
4. run the complete existing verification suite;
5. confirm zero baseline regressions;
6. inspect Arcana source materials already present in the repository;
7. map work to `T-001-*`;
8. document implementation plan.

Do not start with UI.

Start with Domain.

---

## IMPLEMENTATION ORDER

Required order:

```text
Domain
 ↓
Schemas
 ↓
Ports
 ↓
Repository Adapter
 ↓
Application Use Cases
 ↓
Validation
 ↓
Project Workspace
 ↓
Arcana Migration
 ↓
Legacy Compatibility
 ↓
Tests
```

Do not invert this order without an ADR.

---

## ARCHITECTURE RULE

Dependency direction remains:

```text
UI
 ↓
Application
 ↓
Domain
```

Domain cannot depend on UI, adapters, JSON implementation, Firebase, browser APIs, or legacy.

---

## PROJECT TWIN RULE

Presentation slides are NOT the domain model.

Do not create fields such as:

```text
slide1
slide2
slide3
```

inside Project Twin.

Project sections represent business meaning, not presentation order.

---

## DATA DISCIPLINE

When migrating Arcana:

- use only repository/source-supported information;
- do not invent metrics;
- do not invent traction;
- do not invent market data;
- do not invent customers;
- do not convert targets into facts;
- use EMPTY or DRAFT for unsupported sections.

---

## AUTHORIZED TECHNOLOGY

Use only existing approved stack plus narrowly necessary schema/testing libraries already compatible with Phase 000A.

No new infrastructure.

---

## FORBIDDEN

Do not add:

- Firestore;
- Auth;
- Storage;
- Cloud Functions;
- backend;
- database;
- AI integrations;
- Narrative Engine;
- Claims Engine;
- Evidence Engine;
- Data Room.

---

## TESTING RULE

Before CODE_COMPLETE, run:

1. typecheck;
2. architecture tests;
3. domain tests;
4. schema tests;
5. repository tests;
6. Arcana migration tests;
7. Project Workspace Playwright tests;
8. legacy tests;
9. Phase 000A tests;
10. static build;
11. console validation.

All mandatory checks must pass.

---

## REQUIRED OUTPUT

Generate:

`docs/evidence/PHASE_001_VERIFICATION_REPORT.md`

Final recommendation:

```text
READY_FOR_APPROVAL
```

only if all acceptance criteria pass.

Do NOT start Phase 002 automatically.

Do NOT mark Phase 001 CLOSED.

---

# 43. Expected End State

```text
                       VENTURE HUB OS
                             │
                             ▼
                        PROJECT TWIN
                             │
              ┌──────────────┼──────────────┐
              │              │              │
           Strategy       Business       Technology
              │              │              │
              └──────────────┼──────────────┘
                             │
                         ProjectVersion
                             │
                         Validation
                             │
                             ▼
                     Project Workspace
                             │
                     ┌───────┴────────┐
                     ▼                ▼
                 Structured       Legacy Deck
                    View             Adapter
```

Project data now exists independently of presentation.

---

# 44. Exit Decision

If all criteria pass:

> **Apruebo formalmente VHOS-PHASE-001 — Core Platform / Project Twin bajo SPEC-001 como VERIFIED/CLOSED y autorizo el inicio de VHOS-PHASE-002 — Adaptive Narrative Engine, manteniendo la arquitectura Feature-Oriented Hexagonal, el enfoque web-first y la persistencia estática autorizada.**
