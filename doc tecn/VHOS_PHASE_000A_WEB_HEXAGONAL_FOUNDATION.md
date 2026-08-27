# Venture Hub OS — Phase 000A: Web & Hexagonal Foundation

**Document ID:** `VHOS-PHASE-000A`  
**Version:** `2.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-000 — Baseline & Freeze`  
**Baseline Commit:** `c03372b0de439ef591acc1a50efb545e2affaba2`  
**Next Phase:** `VHOS-PHASE-001 — Core Platform / Project Twin`  
**Execution Model:** Spec-Driven Development (SDD)  
**Architecture Style:** Feature-Oriented Hexagonal Web Architecture

---

# 1. Executive Decision

Venture Hub OS SHALL evolve from the current static presentation prototype into a professional web platform while remaining:

- web-first;
- static-hostable;
- GitHub-friendly;
- Firebase Hosting compatible;
- backend-free for the current stage;
- modular;
- testable;
- migration-safe.

The architecture adopted for this phase is:

> **Feature-Oriented Hexagonal Web Architecture**

This architecture combines:

- Vite;
- TypeScript;
- ES Modules;
- modular feature boundaries;
- Ports & Adapters;
- explicit application use cases;
- domain rules isolated from UI and infrastructure;
- static JSON adapters today;
- Firebase adapters possible in the future.

The key architectural promise is:

> Project Twin and future Venture Hub business logic MUST NOT depend directly on JSON, Firebase, the DOM, CSS, browser storage, or the legacy application.

---

# 2. Why This Phase Exists

Phase 0 successfully froze and verified the current Venture Hub.

Before implementing Project Twin, the project needs a stronger engineering base.

Without this phase, new functionality would continue accumulating around:

```text
index.html
style.css
app.js
static JSON
legacy DOM state
```

That would make future migration expensive.

Phase 000A creates the architectural boundaries before core business functionality is introduced.

---

# 3. Phase Objective

Create a modern web foundation in which Venture Hub OS can:

1. run as a static web application;
2. deploy from GitHub;
3. publish through Firebase Hosting;
4. use TypeScript strict mode;
5. separate UI from application logic;
6. separate application logic from data adapters;
7. load project metadata through repository ports;
8. preserve the legacy Venture Hub;
9. validate architectural dependency rules;
10. prepare the codebase for `SPEC-001 — Project Twin`.

---

# 4. Non-Goals

This phase MUST NOT implement:

- full Project Twin;
- Firestore;
- Firebase Authentication;
- Firebase Storage;
- Cloud Functions;
- backend APIs;
- PostgreSQL;
- MySQL;
- Prisma;
- Redis;
- Docker;
- Kubernetes;
- microservices;
- AI integrations;
- OpenAI;
- Claude;
- Gemini;
- Ollama;
- vector database;
- Narrative Engine;
- Claims Engine;
- Evidence Engine;
- Data Room;
- RBAC;
- collaboration;
- billing;
- commercial multi-tenancy.

If implementation requires one of these, create a formal Change Request.

---

# 5. Architecture Principle

The platform SHALL use a simplified hexagonal architecture.

```text
                 ┌──────────────────────────────┐
                 │            UI                │
                 │ Dashboard / Presenter / Hub  │
                 └──────────────┬───────────────┘
                                │
                         INBOUND ADAPTERS
                                │
                                ▼
                 ┌──────────────────────────────┐
                 │       APPLICATION LAYER      │
                 │                              │
                 │ Use Cases / Commands /       │
                 │ Queries / Orchestration      │
                 └──────────────┬───────────────┘
                                │
                                ▼
                 ┌──────────────────────────────┐
                 │            DOMAIN            │
                 │                              │
                 │ Entities / Value Objects /   │
                 │ Rules / Invariants / Ports   │
                 └──────────────┬───────────────┘
                                │
                         OUTBOUND PORTS
                                │
               ┌────────────────┼────────────────┐
               ▼                ▼                ▼
          JSON Adapter      Legacy Adapter   Browser Storage
                                                Adapter
                                                   │
                                                   ▼
                                               FUTURE
                                              Firebase
```

---

# 6. Dependency Rule

The most important rule in the architecture is dependency direction.

```text
UI
 ↓
Application
 ↓
Domain
```

Adapters may depend inward.

The Domain MUST NOT depend outward.

Allowed:

```text
ui → application
application → domain
adapters → application/domain
```

Forbidden:

```text
domain → ui
domain → adapters
domain → browser APIs
domain → Firebase
domain → legacy
application → concrete JSON files
```

---

# 7. Architecture Scope

Hexagonal architecture SHALL apply to business-relevant modules.

It SHALL NOT be applied mechanically to simple UI elements.

Use hexagonal boundaries for:

- Project;
- Presentation;
- Narrative;
- Claim;
- Evidence;
- Risk;
- Financials;
- Intelligence.

Do NOT create unnecessary abstractions such as:

```text
ButtonRepository
ModalPort
CSSAdapter
ToolbarDomainService
```

UI primitives remain UI concerns.

---

# 8. Target Technology Stack

| Layer | Technology | Requirement |
|---|---|---|
| Build | Vite | REQUIRED |
| Language | TypeScript | REQUIRED |
| Type mode | strict | REQUIRED |
| Web | HTML/CSS/TS | REQUIRED |
| Architecture | Hexagonal | REQUIRED |
| Module strategy | Feature-oriented | REQUIRED |
| Unit testing | Vitest | REQUIRED |
| E2E/browser | Playwright | REQUIRED |
| Architecture tests | dependency rules | REQUIRED |
| Data current | Static JSON | REQUIRED |
| Repository | GitHub | REQUIRED |
| Hosting | Firebase Hosting | REQUIRED |
| Backend | None | REQUIRED |
| Database | None | REQUIRED |
| Auth | None | REQUIRED |

React is not required in this phase.

A future ADR may introduce React if UI complexity justifies it.

---

# 9. Target Source Structure

```text
venture-hub-os/
│
├── src/
│   │
│   ├── modules/
│   │   │
│   │   ├── project/
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   ├── value-objects/
│   │   │   │   ├── ports/
│   │   │   │   ├── events/
│   │   │   │   ├── errors/
│   │   │   │   └── project.types.ts
│   │   │   │
│   │   │   ├── application/
│   │   │   │   ├── commands/
│   │   │   │   ├── queries/
│   │   │   │   └── use-cases/
│   │   │   │
│   │   │   ├── adapters/
│   │   │   │   ├── json/
│   │   │   │   ├── browser/
│   │   │   │   └── legacy/
│   │   │   │
│   │   │   └── tests/
│   │   │
│   │   ├── presentation/
│   │   │   ├── domain/
│   │   │   ├── application/
│   │   │   ├── adapters/
│   │   │   └── tests/
│   │   │
│   │   └── shared/
│   │
│   ├── platform/
│   │   ├── config/
│   │   ├── events/
│   │   ├── logging/
│   │   ├── storage/
│   │   └── validation/
│   │
│   ├── ui/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── themes/
│   │   └── styles/
│   │
│   └── main.ts
│
├── data/
│   └── projects/
│
├── public/
│   ├── backgrounds/
│   ├── images/
│   └── media/
│
├── legacy/
│   └── venture-hub-v1/
│
├── docs/
│   ├── baseline/
│   ├── architecture/
│   ├── adr/
│   ├── specs/
│   └── evidence/
│
├── tests/
│   ├── architecture/
│   ├── e2e/
│   └── visual/
│
├── .github/
│   └── workflows/
│
├── firebase.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 10. Domain Foundation

Phase 000A SHALL create only the minimum domain contract necessary to prove the architecture.

The full Project Twin domain belongs to Phase 1.

Minimum entities/value objects:

```text
ProjectId
ProjectSlug
ProjectStatus
ProjectVersion
Language
ProjectSummary
```

Example:

```ts
export type ProjectStatus =
  | "concept"
  | "validation"
  | "pilot"
  | "active"
  | "paused"
  | "archived";

export interface ProjectSummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: ProjectStatus;
  projectVersion: string;
  schemaVersion: string;
  defaultLanguage: "es" | "en";
  availableLanguages: Array<"es" | "en">;
  theme?: string;
}
```

This is intentionally minimal.

Do NOT implement the entire Project Twin in this phase.

---

# 11. Ports

The Domain SHALL define explicit ports.

## 11.1 Project Repository Port

```ts
export interface ProjectRepository {
  list(): Promise<ProjectSummary[]>;
  findById(id: string): Promise<ProjectSummary | null>;
}
```

The domain/application MUST depend on this interface, not a concrete JSON loader.

---

## 11.2 Legacy Presentation Port

```ts
export interface LegacyPresentationPort {
  listDecks(): Promise<LegacyDeckSummary[]>;
  openDeck(projectId: string): Promise<void>;
}
```

The exact interface may evolve after repository inspection.

The principle is mandatory:

> V2 code MUST NOT import legacy `app.js` functionality across unrelated modules.

---

## 11.3 Browser Storage Port

A lightweight interface MAY be created for future local preferences.

Example:

```ts
export interface PreferenceStoragePort {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
}
```

Use is optional in Phase 000A.

---

# 12. Adapters

## 12.1 JSON Project Repository

Required.

```text
ProjectRepository
        ↑
JsonProjectRepository
```

It loads static project metadata.

---

## 12.2 Legacy Adapter

Required foundation.

```text
Legacy V1
    ↓
VentureHubLegacyAdapter
    ↓
LegacyPresentationPort
```

Its purpose is to isolate compatibility behavior.

---

## 12.3 Firebase Adapter

NOT implemented.

The architecture may reserve documentation for:

```text
FirestoreProjectRepository
```

but no Firebase runtime code may be created.

---

# 13. Application Layer

The Application layer SHALL expose explicit use cases.

Minimum required:

```text
ListProjects
GetProject
ValidateProjectDefinition
OpenLegacyPresentation
```

Recommended future pattern:

```text
Command
Query
Use Case
```

Do not introduce a complex CQRS framework.

The separation is conceptual and code-level only.

---

# 14. Initial Queries

Required:

```text
ListProjectsQuery
GetProjectQuery
```

---

# 15. Initial Commands

Only if required:

```text
OpenProjectCommand
OpenLegacyPresentationCommand
```

Commands SHALL represent state-changing or action-triggering operations.

Queries SHALL represent read operations.

---

# 16. Domain Invariants

Phase 000A SHALL establish initial invariants.

At minimum:

1. `ProjectId` cannot be empty.
2. `ProjectSlug` cannot be empty.
3. `ProjectSummary.name` cannot be empty.
4. `schemaVersion` is required.
5. `projectVersion` is required.
6. default language must exist in available languages.
7. project status must belong to the allowed status set.
8. duplicate project IDs are invalid.
9. duplicate slugs are invalid.

Invalid data MUST fail explicitly.

---

# 17. Schema Versioning

Every project package SHALL distinguish:

```text
schemaVersion
```

from:

```text
projectVersion
```

Example:

```json
{
  "schemaVersion": "1.0",
  "projectVersion": "0.1.0"
}
```

Meaning:

- `schemaVersion` = structure/version of the Venture Hub data model.
- `projectVersion` = version of that specific venture/project.

This distinction becomes mandatory from Phase 000A forward.

---

# 18. Project Manifest

Each project SHOULD start evolving toward:

```text
data/projects/{project-slug}/
├── project.manifest.json
└── project.json
```

For Phase 000A, a single summary file is acceptable if implementation remains simpler.

Target manifest:

```json
{
  "id": "arcana",
  "slug": "arcana",
  "schemaVersion": "1.0",
  "projectVersion": "0.1.0",
  "languages": ["es", "en"],
  "theme": "arcana-deeptech",
  "capabilities": ["presentation"],
  "entrypoints": {
    "project": "./project.json"
  }
}
```

---

# 19. Domain Events

A lightweight internal event mechanism SHOULD be introduced.

Initial events MAY include:

```text
ProjectLoaded
ProjectSelected
PresentationOpened
AudienceChanged
LanguageChanged
```

No external event infrastructure is allowed.

No Kafka.

No cloud event bus.

A TypeScript in-memory event bus is sufficient.

---

# 20. Architecture Tests

This is mandatory.

The repository SHALL include automated tests that enforce dependency direction.

At minimum verify:

```text
domain
MUST NOT import
ui

domain
MUST NOT import
adapters

domain
MUST NOT import
legacy

domain
MUST NOT import
firebase

application
MAY import
domain

adapters
MAY import
application/domain

ui
MAY import
application
```

If an architecture rule is broken, CI MUST fail.

Implementation may use:

- a lightweight custom dependency test;
- ESLint import restrictions;
- dependency-cruiser;
- madge;
- another justified static dependency tool.

The chosen mechanism MUST be recorded in an ADR.

---

# 21. Legacy Protection Contract

Phase 0 remains authoritative.

The legacy implementation is read-only reference code unless a compatibility patch is explicitly approved.

Protected capabilities include:

- multiple decks;
- slide navigation;
- keyboard controls;
- fullscreen;
- audience profiles;
- ES/EN;
- dark/light;
- timer;
- speaker notes;
- Q&A;
- overview grid;
- multimedia;
- touch/mobile;
- project-specific atmosphere.

Existing preservation tests MUST continue to pass.

Expected baseline:

```text
45 PASS
0 FAIL
```

No existing protected behavior may regress.

---

# 22. Static Web Constraint

Production output MUST remain:

```text
dist/
├── index.html
├── assets/
└── ...
```

The app MUST NOT require a Node server in production.

---

# 23. Firebase Hosting Scope

Firebase SHALL be used only as static hosting infrastructure.

Authorized:

```text
Firebase Hosting
```

Not authorized:

```text
Firestore
Authentication
Storage
Functions
App Hosting
Realtime Database
```

Expected flow:

```text
GitHub
   ↓
Vite Build
   ↓
dist/
   ↓
Firebase Hosting
```

---

# 24. GitHub Role

GitHub SHALL remain the source of truth for:

- source code;
- version history;
- pull requests;
- CI;
- release tags;
- specifications;
- architecture decisions.

Phase 000A SHOULD prepare automated CI.

Automatic production deployment MAY remain optional if repository credentials/config are not yet available.

---

# 25. Workstreams

## WS-000A-01 — Repository & Tooling Foundation

Implement:

- package manager;
- Vite;
- TypeScript strict;
- scripts;
- module structure.

---

## WS-000A-02 — Hexagonal Architecture Scaffold

Implement:

- module boundaries;
- domain;
- application;
- ports;
- adapters;
- UI boundary.

---

## WS-000A-03 — Legacy Isolation

Implement:

```text
legacy/venture-hub-v1
```

Preserve Phase 0 reproducibility.

---

## WS-000A-04 — Project Domain Seed

Implement only:

```text
ProjectSummary
ProjectId
ProjectSlug
ProjectStatus
Language
ProjectVersion
```

Do not implement Project Twin.

---

## WS-000A-05 — Repository Port & JSON Adapter

Implement:

```text
ProjectRepository
JsonProjectRepository
ListProjects
GetProject
```

---

## WS-000A-06 — Legacy Adapter Foundation

Create single compatibility boundary between V2 and V1.

---

## WS-000A-07 — Web Application Shell

Create minimal V2 shell proving:

- boot;
- project discovery;
- project selection;
- legacy presentation entry;
- responsive layout;
- error handling.

---

## WS-000A-08 — Design Foundation

Create:

- tokens;
- typography;
- spacing;
- breakpoints;
- basic reusable primitives.

No major redesign.

---

## WS-000A-09 — Test Foundation

Implement:

- Vitest;
- Playwright;
- architecture tests;
- Phase 0 preservation compatibility.

---

## WS-000A-10 — Hosting & CI

Implement:

- Firebase Hosting config;
- GitHub CI;
- build verification.

---

## WS-000A-11 — Architecture Documentation

Create required ADRs and diagrams.

---

# 26. Task Plan

## Foundation

### T-000A-001
Create implementation branch.

Recommended:

```text
phase/000a-web-hexagonal-foundation
```

### T-000A-002
Record starting baseline SHA.

### T-000A-003
Run Phase 0 tests before modifications.

### T-000A-004
Initialize Vite.

### T-000A-005
Configure TypeScript strict.

### T-000A-006
Create standard scripts.

---

## Architecture

### T-000A-101
Create feature-oriented module structure.

### T-000A-102
Create Domain boundary.

### T-000A-103
Create Application boundary.

### T-000A-104
Create Ports boundary.

### T-000A-105
Create Adapter boundary.

### T-000A-106
Create UI boundary.

### T-000A-107
Add dependency rules.

### T-000A-108
Create architecture tests.

---

## Legacy

### T-000A-201
Create legacy isolation directory.

### T-000A-202
Preserve original source.

### T-000A-203
Validate media paths.

### T-000A-204
Create LegacyPresentationPort.

### T-000A-205
Create legacy adapter foundation.

### T-000A-206
Re-run preservation suite.

---

## Project Foundation

### T-000A-301
Create ProjectId.

### T-000A-302
Create ProjectSlug.

### T-000A-303
Create ProjectStatus.

### T-000A-304
Create Language type.

### T-000A-305
Create ProjectSummary.

### T-000A-306
Add schemaVersion.

### T-000A-307
Add projectVersion.

### T-000A-308
Create project validation.

### T-000A-309
Create ProjectRepository port.

### T-000A-310
Create JsonProjectRepository.

### T-000A-311
Create ListProjects use case.

### T-000A-312
Create GetProject use case.

### T-000A-313
Create current venture summary data.

---

## Web Shell

### T-000A-401
Create app bootstrap.

### T-000A-402
Create project hub page.

### T-000A-403
Render data-driven project list.

### T-000A-404
Create project selection flow.

### T-000A-405
Create controlled error UI.

### T-000A-406
Create route abstraction.

---

## UI Foundation

### T-000A-501
Create design tokens.

### T-000A-502
Create responsive layout baseline.

### T-000A-503
Create Button primitive.

### T-000A-504
Create Panel primitive.

### T-000A-505
Create ProjectCard primitive.

### T-000A-506
Create Toolbar shell.

### T-000A-507
Create Modal/Drawer shells.

---

## Events

### T-000A-601
Create lightweight EventBus interface.

### T-000A-602
Implement in-memory event bus.

### T-000A-603
Add ProjectLoaded event.

### T-000A-604
Add ProjectSelected event.

Events MUST NOT introduce infrastructure dependencies.

---

## Testing

### T-000A-701
Configure Vitest.

### T-000A-702
Test domain invariants.

### T-000A-703
Test project repository port contract.

### T-000A-704
Test JsonProjectRepository.

### T-000A-705
Test use cases.

### T-000A-706
Configure architecture dependency tests.

### T-000A-707
Configure Playwright.

### T-000A-708
Create desktop smoke test.

### T-000A-709
Create mobile smoke test.

### T-000A-710
Assert no critical console errors.

### T-000A-711
Re-run Phase 0 preservation suite.

---

## Hosting

### T-000A-801
Create Firebase Hosting config.

### T-000A-802
Validate static Vite build.

### T-000A-803
Validate local preview.

### T-000A-804
Document Firebase deployment.

---

## GitHub / CI

### T-000A-901
Create CI workflow.

### T-000A-902
Add typecheck gate.

### T-000A-903
Add architecture test gate.

### T-000A-904
Add unit test gate.

### T-000A-905
Add build gate.

### T-000A-906
Add Playwright/smoke gate.

### T-000A-907
Add Phase 0 preservation gate.

---

## Documentation

### T-000A-1001
Create `ADR-0001 — Feature-Oriented Hexagonal Architecture`.

### T-000A-1002
Create `ADR-0002 — Vite + TypeScript Static Web Foundation`.

### T-000A-1003
Create `ADR-0003 — Ports and Adapters`.

### T-000A-1004
Create `ADR-0004 — JSON Today, Firebase Later`.

### T-000A-1005
Create `ADR-0005 — Legacy Isolation`.

### T-000A-1006
Create `ADR-0006 — Schema Versioning`.

### T-000A-1007
Create architecture dependency diagram.

### T-000A-1008
Create verification report.

---

# 27. Acceptance Criteria

## AC-000A-001 — Vite Build

```bash
npm run build
```

MUST succeed.

---

## AC-000A-002 — TypeScript

```bash
npm run typecheck
```

MUST report:

```text
0 errors
```

---

## AC-000A-003 — Static Runtime

The generated application MUST run from static hosting without a custom backend.

---

## AC-000A-004 — Domain Isolation

Domain code MUST NOT import:

- DOM APIs;
- UI;
- Firebase;
- JSON file paths;
- legacy runtime;
- browser storage implementation.

---

## AC-000A-005 — Repository Port

Project listing MUST pass through `ProjectRepository`.

The UI MUST NOT load project JSON directly.

---

## AC-000A-006 — JSON Adapter

Current static project metadata SHALL load through `JsonProjectRepository`.

---

## AC-000A-007 — Data-Driven Registry

Project cards/list SHALL be generated from project data.

No hard-coded UI list of project IDs is permitted.

---

## AC-000A-008 — Schema Versioning

Every V2 project definition SHALL contain:

```text
schemaVersion
projectVersion
```

---

## AC-000A-009 — Architecture Enforcement

Automated architecture tests MUST fail when an explicitly forbidden dependency is introduced.

---

## AC-000A-010 — Legacy Preservation

Existing Phase 0 tests MUST report zero failures.

Expected minimum:

```text
45 PASS
0 FAIL
```

---

## AC-000A-011 — Browser Tests

Playwright MUST validate:

- application boot;
- desktop;
- mobile;
- project listing;
- project selection;
- no critical console errors.

---

## AC-000A-012 — Firebase Hosting

`dist/` MUST be valid for Firebase Hosting.

No Firebase runtime service may be required.

---

## AC-000A-013 — Forbidden Scope

The repository MUST contain no implementation of:

- Firestore;
- Firebase Authentication;
- Cloud Functions;
- backend API;
- database;
- AI provider integration.

---

# 28. Required Package Scripts

Equivalent scripts MUST exist:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:architecture": "architecture-test-command",
    "test:e2e": "playwright test",
    "test:legacy": "legacy-preservation-command",
    "verify": "npm run typecheck && npm run test:architecture && npm run test && npm run build && npm run test:e2e && npm run test:legacy"
  }
}
```

Exact commands may differ according to repository constraints.

---

# 29. Required ADRs

The following Architecture Decision Records are mandatory:

```text
ADR-0001 Feature-Oriented Hexagonal Architecture
ADR-0002 Vite and TypeScript
ADR-0003 Ports and Adapters
ADR-0004 Static JSON to Future Firebase
ADR-0005 Legacy Isolation
ADR-0006 Schema Versioning
ADR-0007 Architecture Dependency Enforcement
```

---

# 30. Definition of Done

Phase 000A becomes `CODE_COMPLETE` only if:

- Vite works;
- TypeScript strict works;
- source structure exists;
- hexagonal boundaries exist;
- ProjectRepository exists;
- JSON adapter exists;
- use cases exist;
- legacy adapter boundary exists;
- initial project metadata is data-driven;
- architecture tests exist;
- Vitest works;
- Playwright works;
- Firebase Hosting config exists;
- GitHub CI exists;
- ADRs exist;
- no forbidden scope was added.

Phase 000A becomes `VERIFIED` only if:

```text
TYPECHECK            PASS
ARCHITECTURE TESTS   PASS
UNIT TESTS           PASS
BUILD                PASS
PLAYWRIGHT           PASS
LEGACY               PASS
STATIC PREVIEW       PASS
CONSOLE              PASS
SCOPE AUDIT          PASS
DOCUMENTATION        PASS
```

Only the human owner may mark the phase `CLOSED`.

---

# 31. Verification Report

The IDE MUST generate:

```text
docs/evidence/PHASE_000A_VERIFICATION_REPORT.md
```

Required sections:

## A. Identification

- phase;
- branch;
- starting commit;
- ending commit;
- date.

## B. Task Matrix

Every `T-000A-*` task:

```text
DONE
PARTIAL
BLOCKED
NOT_STARTED
```

## C. Files

- created;
- modified;
- moved;
- deleted.

Deletion of legacy source requires explicit explanation.

## D. Dependencies Added

For every dependency:

- name;
- version;
- reason.

## E. Architecture Verification

Show:

- dependency rules;
- test method;
- results.

## F. Test Matrix

| Test | Result |
|---|---|
| Typecheck | |
| Architecture | |
| Unit | |
| Build | |
| Playwright | |
| Legacy | |
| Preview | |
| Console | |

## G. Scope Audit

Explicitly state:

```text
Firestore: NOT IMPLEMENTED
Firebase Auth: NOT IMPLEMENTED
Firebase Storage: NOT IMPLEMENTED
Cloud Functions: NOT IMPLEMENTED
Backend: NOT IMPLEMENTED
Database: NOT IMPLEMENTED
AI: NOT IMPLEMENTED
```

## H. Risks

List newly discovered risks.

## I. Final Recommendation

Allowed values:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

The IDE MUST NOT mark the phase CLOSED.

---

# 32. SDD State Machine

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

---

# 33. Change Control

If implementation requires expansion:

1. stop the affected task;
2. create:

```text
docs/specs/changes/CHANGE_REQUEST_000A_XXX.md
```

3. describe:
   - reason;
   - proposed change;
   - impact;
   - alternatives;
   - risk;
4. wait for approval.

---

# 34. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-000A — Web & Hexagonal Foundation`

The previous phase:

`VHOS-PHASE-000 — Baseline & Freeze`

is CLOSED.

Protected baseline:

`c03372b0de439ef591acc1a50efb545e2affaba2`

---

## YOUR ROLE

Act as the implementation engineering agent.

You are NOT authorized to redesign the product arbitrarily.

You are NOT authorized to implement future phases.

You are responsible for building and verifying the architectural foundation defined in this document.

---

## BEFORE WRITING CODE

You MUST:

1. read this complete specification;
2. inspect `/docs/baseline/`;
3. inspect `legacy-capabilities.json`;
4. inspect the current repository;
5. identify the existing preservation suite;
6. run the preservation suite;
7. confirm baseline status;
8. map implementation to `T-000A-*`;
9. present the implementation plan in the work log.

Do not refactor first and investigate later.

---

## ARCHITECTURAL MANDATE

Use:

> Feature-Oriented Hexagonal Web Architecture.

The dependency direction is:

```text
UI
 ↓
Application
 ↓
Domain
```

Adapters implement outbound ports.

Domain MUST remain independent.

---

## AUTHORIZED TECHNOLOGY

You MAY add:

- Vite;
- TypeScript;
- Vitest;
- Playwright;
- architecture dependency tooling;
- Firebase Hosting configuration;
- GitHub Actions;
- static JSON project metadata;
- ES Modules;
- lightweight event bus.

---

## FORBIDDEN TECHNOLOGY

Do NOT add:

- Firestore;
- Firebase Authentication;
- Firebase Storage;
- Cloud Functions;
- Firebase App Hosting;
- backend API;
- PostgreSQL;
- MySQL;
- Prisma;
- Redis;
- Docker;
- Kubernetes;
- microservices;
- OpenAI;
- Claude;
- Gemini;
- Ollama;
- vector databases.

---

## LEGACY RULE

The Phase 0 legacy baseline is protected.

Do NOT destructively rewrite it.

Do NOT delete original sources.

Do NOT distribute imports from legacy code throughout V2.

Use a single legacy adapter boundary.

---

## DOMAIN RULE

The domain MUST NOT depend on:

- DOM;
- browser globals;
- UI;
- concrete JSON loader;
- legacy implementation;
- Firebase;
- localStorage implementation.

---

## PROJECT DATA RULE

UI code MUST NOT load project files directly.

Required path:

```text
UI
 ↓
Use Case
 ↓
ProjectRepository Port
 ↓
JsonProjectRepository
 ↓
Static project data
```

---

## ARCHITECTURE TEST RULE

Create automated enforcement for dependency rules.

A forbidden dependency MUST cause test/CI failure.

---

## IMPLEMENTATION STYLE

Prefer:

- small files;
- explicit interfaces;
- explicit use cases;
- pure domain logic;
- testable modules;
- clear dependency direction;
- deterministic validation.

Avoid:

- generic service classes;
- large god objects;
- global state;
- duplicated data;
- overengineering;
- speculative abstractions;
- unnecessary libraries.

---

## REQUIRED VERIFICATION

Before `CODE_COMPLETE`, run:

1. `typecheck`;
2. architecture dependency tests;
3. unit tests;
4. production build;
5. Playwright;
6. Phase 0 legacy preservation;
7. static preview;
8. console error review;
9. scope audit.

Every mandatory verification must pass.

---

## REQUIRED OUTPUT

Generate:

```text
docs/evidence/PHASE_000A_VERIFICATION_REPORT.md
```

Final recommendation may be:

```text
READY_FOR_APPROVAL
```

only if all mandatory criteria pass.

Otherwise:

```text
NOT_READY
```

or:

```text
BLOCKED
```

Never mark the phase CLOSED.

---

# 35. Expected End State

At the end of the phase:

```text
                    VENTURE HUB OS V2
                           │
                           ▼
                    WEB APPLICATION
                     Vite + TS
                           │
                           ▼
                   APPLICATION USE CASES
                           │
                           ▼
                         DOMAIN
                           │
                    Project Repository
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
         JSON Adapter              Legacy Adapter
              │                         │
              ▼                         ▼
       Static Project Data        Venture Hub V1

Future:
ProjectRepository
      ↑
Firestore Adapter
```

The application remains static and web-first.

---

# 36. Exit Decision

If all criteria pass, the approval text is:

> **Apruebo formalmente VHOS-PHASE-000A — Web & Hexagonal Foundation como VERIFIED/CLOSED y autorizo el inicio de VHOS-PHASE-001 — Core Platform / Project Twin bajo SPEC-001, manteniendo la arquitectura Feature-Oriented Hexagonal, el enfoque web-first y sin activar todavía servicios backend de Firebase.**
