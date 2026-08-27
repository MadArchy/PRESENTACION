

---

# Venture Hub OS — Spec-Driven Development Pack

## Product definition
Venture Hub OS is an **Executive Project Intelligence & Presentation Platform**. It converts a project's source material into a controlled, evidence-aware, audience-adaptive executive experience.

It is not a slide viewer. It is a project operating layer with four responsibilities:
1. Maintain one structured source of truth per project.
2. Generate and present multiple narratives from that same truth.
3. Separate facts, evidence, assumptions, targets and hypotheses.
4. Help founders, executives, investors and technical reviewers understand the project from the perspective that matters to them.

## Core product promise
**One project. One source of truth. Multiple executive narratives. Zero unsupported claims promoted as facts.**

## Product modes
- Executive Brief
- Investor / VC
- Board / Steering Committee
- B2B / Commercial
- CTO / Technical Architecture
- Due Diligence
- Demo Day / Pitch
- Internal Strategy

## Existing capabilities to preserve and evolve
- Multi-deck hub
- Audience switching
- Pitch clock
- Speaker notes / objections drawer
- Slide overview grid
- ES/EN switching
- Dark/light themes
- Fullscreen presentation
- Multimedia / video theater
- Keyboard presentation controls

## New platform layers
1. Project Workspace
2. Project Knowledge Model
3. Evidence & Claim Registry
4. Narrative / Presentation Compiler
5. Executive Intelligence & Readiness Scoring
6. Presenter Cockpit
7. Due Diligence Data Room
8. AI Copilot & Red-Team Review
9. Sharing, permissions, audit and versioning
10. Import / export pipeline

## Suggested implementation stack
- Frontend/full-stack shell: Next.js + React + TypeScript
- UI: component-based design system; existing visual identity can be migrated rather than discarded
- Database: PostgreSQL
- Object storage: S3-compatible storage
- Auth: OIDC/Auth provider with RBAC
- Background jobs: queue abstraction for document ingestion, AI compilation and exports
- AI layer: provider adapter supporting cloud APIs and local Ollama-compatible endpoints
- Validation: schema-first contracts with runtime validation
- Testing: unit + integration + E2E + visual regression for presentation modes

The domain layer must remain provider-agnostic so the product can migrate between hosting/auth/AI vendors without rewriting core logic.

## Read order for an AI IDE
1. `00_PRODUCT_VISION.md`
2. `01_DOMAIN_MODEL.md`
3. `02_SYSTEM_ARCHITECTURE.md`
4. `03_SDD_EXECUTION_RULES.md`
5. `specs/SPEC-001...` through `SPEC-010...`
6. `04_IMPLEMENTATION_ROADMAP.md`
7. `05_DEFINITION_OF_DONE.md`
8. `AI_IDE_MASTER_PROMPT.md`

## Non-negotiable rule
No generated presentation may convert an unverified assumption, target, estimate or hypothesis into a factual claim.


---

# 00 — Product Vision

## Working name
**Venture Hub OS**

Alternative market-facing names can be tested later: Venture Intelligence Studio, Executive Venture OS, Project Narrative OS, VentureBoard, Project Twin Studio.

## Problem
Project information normally lives across PowerPoint files, PDFs, spreadsheets, notes, technical diagrams, assumptions and founder knowledge. Each audience then receives a separate deck, producing inconsistencies, stale claims, duplicated work and weak traceability.

Traditional presentation software optimizes slides. Venture Hub OS optimizes **decision understanding**.

## Vision
Create an executive platform in which a project becomes a structured digital object — a **Project Twin** — containing its thesis, problem, solution, business model, architecture, evidence, risks, financial assumptions, roadmap and source material. From that common model, the platform compiles different presentation experiences for different audiences without losing factual control.

## Primary outcomes
A user should be able to:
- ingest or create a project;
- structure its core thesis;
- attach source material and evidence;
- register claims and classify their epistemic status;
- choose an audience and objective;
- compile an executive narrative;
- present it interactively;
- inspect evidence behind important statements;
- compare projects consistently;
- run AI critique and Q&A simulation;
- publish or export an approved version.

## Product principles
### P1 — Source of truth before slides
Slides are rendered views, not the canonical project record.

### P2 — Evidence-aware generation
Every material claim has a status and, when applicable, supporting evidence.

### P3 — Audience-adaptive, not content-inventing
The engine may reorganize, summarize or emphasize approved material. It must not fabricate validation.

### P4 — Executive clarity
Every view should answer: What is it? Why does it matter? What evidence exists? What is uncertain? What decision is requested?

### P5 — Progressive disclosure
Board members should see a clear thesis first; technical users can drill into architecture, assumptions and evidence.

### P6 — Presentation is interactive software
Use transitions, drill-downs, evidence panels, comparison views, scenario toggles and live presenter tools where they improve decision quality. Do not reproduce PowerPoint inside a browser.

### P7 — Claims are governed assets
Metrics, market sizes, performance statements and projections must be versioned and attributable.

## Target users
- Founders and venture studios
- Innovation teams
- Strategy consultants
- Corporate venture / transformation offices
- Investment committees
- Product leaders and CTOs
- Advisors preparing projects for financing or approval

## North-star workflow
`Sources → Project Twin → Claims/Evidence → Narrative Compiler → Audience Experience → Feedback/Decision → Versioned Project Knowledge`

## Initial success criteria
The MVP is successful when one real project can be represented once and produce at least four coherent variants — Executive, Investor, Technical and Due Diligence — while keeping claims synchronized and traceable.


---

# 01 — Domain Model

## Core aggregate: Project
A Project is the canonical unit. A Deck is never the source of truth.

### Project
- id
- workspaceId
- name
- slug
- tagline
- status: draft | validating | active | paused | archived
- stage: idea | concept | prototype | mvp | pilot | traction | scale
- sector
- geography[]
- defaultLanguage
- ownerId
- createdAt
- updatedAt
- currentVersionId

### ProjectThesis
- problem
- targetCustomer
- solution
- whyNow
- differentiation
- businessModel
- strategicAsk
- keyRisks[]
- keyUnknowns[]

### ProjectSection
Normalized content blocks, independent from presentation slides.
Types include:
- overview
- problem
- customer
- solution
- market
- product
- workflow
- architecture
- business_model
- traction
- financials
- go_to_market
- competition
- risks
- roadmap
- team
- ask
- appendix

### SourceAsset
- id
- projectId
- type: pdf | pptx | docx | markdown | spreadsheet | image | video | url | note
- filename/title
- storageKey
- checksum
- ingestionStatus
- metadata
- createdBy
- createdAt

### EvidenceItem
- id
- projectId
- sourceAssetId optional
- title
- evidenceType: document | dataset | experiment | contract | screenshot | customer_interview | external_source | calculation | telemetry
- locator/page/range
- summary
- date
- owner
- confidence
- verificationStatus

### Claim
- id
- projectId
- statement
- category: traction | financial | market | technical | legal | operational | customer | competitive | other
- epistemicStatus: fact | estimate | assumption | target | hypothesis
- materiality: low | medium | high | critical
- confidence: 0..100
- validFrom / validUntil
- owner
- approvalStatus: draft | review | approved | rejected | expired
- evidenceLinks[]
- sourceVersion

### AudienceProfile
Built-ins:
- executive
- investor
- board
- commercial
- technical
- due_diligence
- demo_day
- internal_strategy

Fields:
- priorities[]
- preferredDepth
- riskTolerance
- financialDepth
- technicalDepth
- defaultNarrativeTemplate

### Narrative
A compiled, versioned view of the Project Twin for an audience.
- id
- projectId
- audienceProfileId
- objective
- language
- status
- narrativeNodes[]
- compilerVersion
- generatedAt
- approvedAt

### NarrativeNode
Not equivalent to a slide. It can render as a slide, card, diagram, metric wall, comparison, timeline, evidence panel, architecture view or interactive module.

### PresentationSession
- narrativeId
- presenterId
- startedAt
- duration
- questions[]
- objections[]
- notes[]
- viewedNodes[]
- audienceFeedback[]

### ProjectScore
Dimensions:
- strategicClarity
- evidenceStrength
- marketReadiness
- productReadiness
- economicReadiness
- technicalReadiness
- riskReadiness
- investorReadiness

Every score must include rationale and input references. Never expose a magic score without explainability.

## Invariants
1. Deleting a slide/view never deletes canonical project knowledge.
2. Claims with `fact` status require at least one approved evidence link unless explicitly waived by an authorized reviewer.
3. AI-generated text is draft until approved.
4. A published narrative is immutable; edits create a new version.
5. Every critical claim shown in a published narrative must resolve to its claim record.


---

# 02 — System Architecture

## Architectural style
Start as a **modular monolith** with strong domain boundaries. Do not begin with microservices. The product needs rapid iteration, but the domain interfaces should make future service extraction possible.

## Logical modules

### 1. Identity & Workspace
Users, organizations, memberships, RBAC, invitations, audit actor.

### 2. Project Core
Project Twin, thesis, structured sections, tags, versions.

### 3. Ingestion
Accepts files and notes, extracts normalized text/metadata, stores source lineage.

### 4. Claims & Evidence
Claim registry, evidence linking, review workflow, stale/unsupported detection.

### 5. Narrative Compiler
Turns project knowledge into audience-specific narrative graphs using deterministic rules plus optional AI assistance.

### 6. Presentation Runtime
Interactive executive presentation, presenter controls, audience switch, drill-down, Q&A, timers, fullscreen, multimedia.

### 7. Intelligence & Scoring
Readiness assessments, gaps, risk radar, comparison engine, decision briefs.

### 8. AI Orchestration
Provider-neutral adapter, prompt templates, structured outputs, policy gates, token/cost logs, local/cloud routing.

### 9. Data Room
Controlled source/evidence access, document organization, access logs, due-diligence views.

### 10. Publishing & Export
Share links, audience permissions, snapshot publishing, HTML/PDF/PPTX export pipeline.

## Recommended deployment shape
- Web application: TypeScript/React full-stack framework
- Relational data: PostgreSQL
- Object storage: S3-compatible
- Queue: Redis-backed or managed equivalent when async jobs become necessary
- AI: adapter interface with multiple providers
- Observability: structured logs + error reporting + audit events

## Layering
`UI → Application Services → Domain → Repositories/Adapters`

Domain logic must not import UI, database drivers, storage SDKs or AI vendor SDKs.

## AI boundary
AI is an assistant, not a database authority.
AI calls must receive explicitly selected context and return schema-validated output.

Required controls:
- structured response schema;
- max context policy;
- prompt/version tracking;
- provider/model tracking;
- cost/tokens where available;
- no direct publishing from AI output;
- claim classification pass;
- unsupported-claim gate;
- human approval for publish.

## Migration from current implementation
The existing HTML/CSS/JS app should be treated as a **reference presentation runtime** and visual prototype.

Migration order:
1. Freeze current version as `legacy-reference`.
2. Extract design tokens, navigation patterns and presenter shortcuts.
3. Rebuild shell and routing in component architecture.
4. Move hard-coded decks into JSON/content adapters temporarily.
5. Introduce Project Twin model.
6. Compile first deck from canonical project data.
7. Remove legacy content paths only after visual/functional parity.

Do not perform a big-bang rewrite that loses the working presentation experience.


---

# 03 — Spec-Driven Development Execution Rules

## Objective
Make the specification the controlling artifact for implementation by human developers and AI IDE agents.

## Required spec lifecycle
`DRAFT → REVIEWED → APPROVED → IMPLEMENTING → CODE_COMPLETE → VERIFIED → CLOSED`

## No-spec rule
No non-trivial product behavior may be implemented without a SPEC ID.

## Each SPEC must contain
1. Problem
2. Objective
3. Scope
4. Out of scope
5. Actors
6. Functional requirements
7. Non-functional requirements
8. Data model changes
9. API/contracts
10. UX states
11. Permissions/security
12. Edge cases
13. Acceptance criteria
14. Test requirements
15. Migration/backward compatibility
16. Telemetry/audit requirements
17. Definition of done

## Requirement IDs
Use stable identifiers such as `FR-001`, `NFR-003`, `AC-007` within each spec.

## AI IDE behavior
The AI agent must:
- read the controlling spec before editing code;
- state which SPEC and requirement IDs it is implementing;
- inspect existing code before generating replacements;
- preserve existing behavior not changed by the spec;
- avoid inventing product requirements;
- create migrations for schema changes;
- write tests for acceptance criteria;
- report deviations/blockers explicitly;
- not mark CODE_COMPLETE if tests fail;
- never fabricate seed/demo metrics as validated business facts.

## Change control
If implementation reveals a missing requirement, update the spec first. Do not silently change product behavior in code.

## Commit convention
`SPEC-###: concise implementation description`

## Completion report
Every implemented spec should end with:
- files changed;
- migrations;
- tests added/changed;
- acceptance criteria status;
- security considerations;
- known limitations;
- recommended next spec.


---

# SPEC-001 — Project Workspace & Project Twin
Status: DRAFT
Priority: P0

## Problem
The current platform is presentation-centric. Content is embedded in decks instead of represented as reusable project knowledge.

## Objective
Create the canonical Project Workspace and Project Twin from which all future narratives and presentations are compiled.

## Scope
- project create/edit/archive;
- thesis fields;
- structured project sections;
- project stage/status;
- project versioning baseline;
- project dashboard;
- import legacy deck metadata as initial project content.

## Functional requirements
- FR-001: User can create a project with name, tagline, sector, stage and default language.
- FR-002: User can edit ProjectThesis independently from presentations.
- FR-003: User can add/reorder ProjectSections.
- FR-004: System records author and timestamps for modifications.
- FR-005: User can snapshot a named project version.
- FR-006: Legacy deck records can be associated with a project without becoming canonical truth.
- FR-007: Dashboard shows completeness and unresolved gaps.

## UX
Project workspace tabs: Overview | Thesis | Knowledge | Claims | Evidence | Narratives | Data Room | Versions | Settings.

## Acceptance criteria
- AC-001: A project can exist with zero presentations.
- AC-002: Two presentations can reference the same Project Twin.
- AC-003: Editing canonical thesis content can be detected as making an approved narrative stale.
- AC-004: Legacy decks remain viewable during migration.


---

# SPEC-002 — Adaptive Narrative & Presentation Compiler
Status: DRAFT
Priority: P0

## Problem
Different audiences require different emphasis, depth and ordering, but manually maintained decks create contradictions.

## Objective
Compile multiple executive narratives from one Project Twin.

## Audience modes
Executive, Investor, Board, Commercial, Technical, Due Diligence, Demo Day, Internal Strategy.

## Functional requirements
- FR-001: User selects audience, objective, duration and language.
- FR-002: Compiler produces a Narrative graph from approved project knowledge.
- FR-003: Narrative nodes may render as slide, metric wall, architecture diagram, comparison, timeline, evidence view, risk matrix, roadmap or CTA.
- FR-004: Switching audience must change emphasis and ordering without changing canonical facts.
- FR-005: User can pin/lock nodes so recompilation preserves them.
- FR-006: User can manually edit draft narrative copy without modifying canonical Project Twin unless explicitly promoted.
- FR-007: System reports which canonical fields and claims each node uses.
- FR-008: Duration presets produce compact/standard/deep variants.

## Guardrail
The compiler cannot convert `estimate`, `assumption`, `target` or `hypothesis` claims into `fact` wording.

## Acceptance criteria
- AC-001: One project produces at least four materially different audience narratives.
- AC-002: All material numbers in compiled narratives link back to claims.
- AC-003: Recompilation is deterministic when AI assistance is disabled.
- AC-004: Presenter can switch from Investor to Technical view without opening another project.


---

# SPEC-003 — Evidence & Claim Governance
Status: DRAFT
Priority: P0

## Problem
Presentation generation can unintentionally transform aspirational or generated metrics into apparent facts.

## Objective
Make claim governance a first-class product capability.

## Functional requirements
- FR-001: Every material claim can be registered and categorized.
- FR-002: Epistemic statuses: FACT, ESTIMATE, ASSUMPTION, TARGET, HYPOTHESIS.
- FR-003: FACT claims require linked evidence for approval unless authorized waiver exists.
- FR-004: Evidence can originate from uploaded files, datasets, calculations, experiments or approved external sources.
- FR-005: System flags unsupported, expired, contradictory and stale claims.
- FR-006: Narrative renderer can display a subtle evidence indicator for traceable claims.
- FR-007: Clicking evidence indicator opens an evidence drawer without leaving presentation mode.
- FR-008: AI-generated claims start as DRAFT and cannot auto-publish.
- FR-009: Critical claims require explicit reviewer approval.

## Presentation language policy
Claims must preserve epistemic meaning. Example:
- FACT: “Pilot conversion reached 18%.”
- TARGET: “Target conversion: 18%.”
- ASSUMPTION: “Base model assumes 18% conversion.”

## Acceptance criteria
- AC-001: Publishing fails if a critical FACT lacks evidence.
- AC-002: A target can be displayed, but is visibly represented as a target.
- AC-003: Evidence drawer resolves to exact source metadata.
- AC-004: Claim edits appear in audit history.


---

# SPEC-004 — Executive Intelligence & Venture Readiness
Status: DRAFT
Priority: P1

## Objective
Turn Venture Hub from a presentation environment into a decision-support environment.

## Dimensions
- Strategic clarity
- Evidence strength
- Market readiness
- Product readiness
- Economic readiness
- Technical readiness
- Risk readiness
- Investor readiness

## Functional requirements
- FR-001: Each dimension has transparent criteria and score inputs.
- FR-002: Score must include rationale, missing evidence and recommended action.
- FR-003: Users can compare multiple projects on the same framework.
- FR-004: System generates a Decision Brief: strengths, unresolved questions, critical risks, next validation action.
- FR-005: User can select stage-aware scoring so an idea is not penalized for lacking scale-stage evidence.
- FR-006: Historical score evolution is visible by project version.

## Anti-pattern
Never present an opaque “AI score” as authoritative. Scores are explainable assessments, not truth.

## Acceptance criteria
- AC-001: Every score can be expanded into criteria and source inputs.
- AC-002: Comparison view identifies the top three decision gaps per project.
- AC-003: Changing project stage can change applicable criteria but not historical results.


---

# SPEC-005 — Executive Presenter Cockpit
Status: DRAFT
Priority: P1

## Objective
Evolve the current boardroom controls into a professional live presentation operating console.

## Preserve
Keyboard navigation, audience cycling, pitch clock, laser/focus mode, Q&A/notes drawer, overview grid, hub return, language, theme, fullscreen, media theater.

## Add
- live presenter-only screen;
- next-node preview;
- private speaker notes;
- objection library by audience;
- evidence peek;
- session question capture;
- decision/commitment capture;
- presentation progress by narrative section;
- scenario switcher for financial/roadmap cases;
- “deep dive” jump links without breaking main sequence;
- restore-to-main-story action.

## Acceptance criteria
- AC-001: Presenter controls do not appear on public screen in dual-screen mode.
- AC-002: A technical deep dive can be opened and closed while preserving narrative position.
- AC-003: Questions and objections can be stored against the presentation session.
- AC-004: Existing keyboard shortcuts remain supported or have documented equivalents.


---

# SPEC-006 — AI Project & Presentation Copilot
Status: DRAFT
Priority: P1

## Objective
Use AI to accelerate analysis and narrative construction without allowing it to become an uncontrolled source of facts.

## Capabilities
- summarize source material;
- propose Project Twin fields;
- classify claims;
- detect unsupported claims;
- identify contradictions;
- generate audience narrative drafts;
- rewrite for executive clarity;
- generate likely investor/CTO/customer objections;
- simulate Q&A;
- suggest missing evidence;
- generate decision questions;
- critique slide density and narrative flow.

## Modes
1. Builder — assists authoring.
2. Analyst — finds gaps and contradictions.
3. Red Team — attacks assumptions and risks.
4. Presenter Coach — simulates audience questions.

## Provider abstraction
Support cloud and local providers behind a common adapter. API credentials must never be committed to source control. Workspace policy decides which providers are permitted.

## Guardrails
- AI output is draft.
- Structured schema validation mandatory.
- Any new numerical assertion becomes a draft claim, never an approved fact.
- Source attribution required when AI summarizes imported materials.

## Acceptance criteria
- AC-001: Copilot can create draft content without direct database write to approved state.
- AC-002: Newly generated metric is automatically classified for review.
- AC-003: Red Team returns risks with project-context references rather than generic advice.


---

# SPEC-007 — Due Diligence Data Room
Status: DRAFT
Priority: P2

## Objective
Allow a presentation claim to drill into controlled supporting material and provide a professional diligence workspace.

## Functional requirements
- document folders/categories;
- permissions by workspace/project/audience;
- evidence-to-document links;
- document version metadata;
- access audit;
- due-diligence checklist;
- request/missing-item tracking;
- claim coverage view;
- optional watermarking/download policy in later phase.

## Due diligence modes
Corporate, investor, technical, legal, financial, product.

## Acceptance criteria
- AC-001: External reviewer only sees explicitly shared material.
- AC-002: Opening evidence from a narrative respects data-room permissions.
- AC-003: Project owner can see which critical claims lack supporting data-room items.


---

# SPEC-008 — Executive Visual & Interaction System
Status: DRAFT
Priority: P1

## Objective
Preserve the innovative character of the current futuristic hub while raising it to enterprise-grade executive design.

## Design direction
Avoid a permanent “cyber HUD” aesthetic across every context. Use a restrained executive shell with project-specific visual atmospheres.

## Layers
1. Executive shell: calm, high-contrast, low-noise navigation.
2. Project identity: configurable typography, imagery and accent treatment.
3. Narrative components: metric walls, architecture maps, timelines, scenario cards, evidence markers, matrices, diagrams, media.
4. Presentation motion: purposeful, fast, reduced-motion compatible.

## Requirements
- responsive 16:9 presentation stage;
- desktop authoring workspace;
- projector-safe contrast;
- accessible keyboard navigation;
- reduced-motion support;
- no text embedded in background images;
- reusable visual components rather than bespoke slide CSS;
- theme tokens and project theme inheritance;
- visual regression tests for core node types.

## Acceptance criteria
- AC-001: Same narrative can render in authoring and fullscreen presentation modes.
- AC-002: Theme changes do not alter information hierarchy.
- AC-003: All critical actions are keyboard accessible.


---

# SPEC-009 — Security, RBAC & Audit
Status: DRAFT
Priority: P1

## Roles
- Workspace Owner
- Admin
- Project Lead
- Editor
- Reviewer
- Presenter
- External Viewer

## Requirements
- least-privilege authorization;
- project-level membership overrides where needed;
- immutable audit events for publish, claim approval, evidence changes and permission changes;
- secure signed access for private assets;
- secrets outside source code;
- server-side authorization for all protected operations;
- rate limits for public/share endpoints;
- versioned publication snapshots;
- revokeable share links.

## Acceptance criteria
- AC-001: External viewer cannot access workspace administration APIs.
- AC-002: Reviewer can approve claims but cannot alter workspace ownership.
- AC-003: Published snapshot remains reproducible after later edits.
- AC-004: Audit identifies actor, action, target and timestamp for critical events.


---

# SPEC-010 — Import, Export & Publishing
Status: DRAFT
Priority: P2

## Objective
Make Venture Hub compatible with existing project materials and executive workflows.

## Import targets
- Markdown
- JSON
- PPTX
- PDF
- DOCX
- XLSX/CSV
- Images
- Video metadata

Imported content is never assumed true; it becomes source material or draft structured content.

## Publishing targets
- private web narrative
- public/restricted share link
- static executive snapshot
- PDF export
- PPTX export (later if fidelity requirements are met)
- JSON project package for portability

## Requirements
- every import stores lineage;
- duplicate detection by checksum where practical;
- export uses an immutable project/narrative version;
- share permissions are explicit;
- export warning appears when unresolved critical claims exist.

## Acceptance criteria
- AC-001: Existing JSON deck can be imported as a legacy narrative.
- AC-002: Markdown project material can be attached and parsed into draft sections.
- AC-003: Export identifies project version and export timestamp.


---

# 04 — Implementation Roadmap

## Phase 0 — Baseline & Freeze
Goal: protect what already works.
- snapshot current app;
- inventory shortcuts, themes, decks, media and generators;
- create visual baseline screenshots;
- identify hard-coded content paths;
- establish repository conventions and test harness.
Exit: current presentation app can be reproduced reliably.

## Phase 1 — Core Platform / Project Twin
Implement SPEC-001 and base of SPEC-009.
Exit: project exists independently from deck and has canonical structured content.

## Phase 2 — Narrative Compiler
Implement SPEC-002 and initial SPEC-008 component system.
Exit: one project compiles into Executive, Investor, Technical and Due Diligence narratives.

## Phase 3 — Claim/Evidence Governance
Implement SPEC-003.
Exit: published narrative blocks unsupported critical facts and provides evidence drill-down.

## Phase 4 — Presenter Cockpit
Implement SPEC-005 while preserving legacy boardroom controls.
Exit: professional presentation mode reaches feature parity and adds deep dives/session capture.

## Phase 5 — Executive Intelligence
Implement SPEC-004.
Exit: project readiness and cross-project comparison are explainable and stage-aware.

## Phase 6 — AI Copilot
Implement SPEC-006.
Exit: AI can assist authoring, critique and Q&A under claim/evidence controls.

## Phase 7 — Data Room + Publication
Implement SPEC-007, SPEC-009 completion, SPEC-010.
Exit: controlled external review, share links and immutable publication snapshots.

## Phase 8 — Pilot Hardening
Use at least 3 materially different real projects.
Measure:
- time to ingest/build project;
- time to create new audience narrative;
- unsupported-claim detection rate;
- presenter usability;
- reviewer comprehension;
- project update propagation;
- export/share reliability.

## Recommended first verticals for validation
Use the projects already represented in the hub because they stress different narrative types:
- AI/EdTech product;
- FoodTech operating model;
- IoT/trust infrastructure;
- AI infrastructure comparison.


---

# 05 — Definition of Done

A SPEC is DONE only when all applicable conditions are true:

## Product
- approved requirements implemented;
- out-of-scope items not silently added;
- acceptance criteria demonstrably pass.

## Code
- typed contracts;
- lint/build pass;
- no committed secrets;
- no debug/dead code introduced;
- migrations are reversible or have documented recovery.

## Tests
- unit tests for domain rules;
- integration tests for persistence/API boundaries;
- E2E tests for critical user workflows;
- presentation visual regression for affected node types;
- authorization tests for protected behavior.

## Claims/evidence
- demo fixtures clearly marked as synthetic;
- no synthetic metric presented as project traction;
- source lineage preserved after import/compile.

## UX
- loading, empty, success and error states handled;
- keyboard navigation tested where applicable;
- responsive behavior reviewed;
- projector/fullscreen presentation reviewed for presenter-facing specs.

## Documentation
- SPEC status updated;
- implementation report added;
- architectural decision documented if material;
- known limitations recorded.


---

# AI IDE Master Prompt — Venture Hub OS

You are the implementation agent for **Venture Hub OS**, an Executive Project Intelligence & Presentation Platform built using Spec-Driven Development.

## Mission
Evolve the existing 3i BAIRD LAB Executive Venture Selection Hub from a hard-coded multideck presentation application into a professional platform based on a canonical Project Twin, evidence-governed claims, adaptive narratives and an executive presentation runtime.

## Required reading order
Before modifying code, read:
1. `README.md`
2. `00_PRODUCT_VISION.md`
3. `01_DOMAIN_MODEL.md`
4. `02_SYSTEM_ARCHITECTURE.md`
5. `03_SDD_EXECUTION_RULES.md`
6. the single SPEC assigned for the current task
7. `05_DEFINITION_OF_DONE.md`

Also inspect the existing application before proposing a rewrite. Preserve useful behavior and visual assets.

## Hard rules
1. Implement one approved SPEC at a time.
2. Do not invent business requirements absent from the controlling SPEC.
3. Do not delete current presenter features merely to simplify implementation.
4. Treat the existing HTML/CSS/JS application as a functional/visual reference until parity is proven.
5. Canonical knowledge belongs to the Project Twin, not slides.
6. Presentations/narratives are compiled views of canonical knowledge.
7. A generated numerical assertion is never automatically a fact.
8. `FACT` claims require evidence before approval unless the product's authorized waiver workflow explicitly applies.
9. Never seed production/demo decks with fabricated traction that could be mistaken for real evidence. Synthetic data must be labeled `DEMO/SYNTHETIC`.
10. AI output is draft and must pass schema and claim policy gates.
11. Authorization is enforced server-side.
12. Never commit API keys or secrets.
13. Add tests mapped to acceptance criteria.
14. If the spec is ambiguous, document the ambiguity and choose the least destructive implementation; do not create a hidden new product rule.

## Required task-start response
Before coding, return:
- Controlling SPEC ID
- Requirements to implement
- Existing files/modules inspected
- Proposed change surface
- Risks/migrations
- Test plan

Then implement.

## Required completion response
Return:
- SPEC ID and resulting status
- Files changed
- Database migrations
- Requirements completed
- Acceptance criteria results
- Tests executed and results
- Security/permission checks
- Backward-compatibility notes
- Known limitations
- Recommended next SPEC

Do not claim CODE_COMPLETE if the build or required tests fail.
