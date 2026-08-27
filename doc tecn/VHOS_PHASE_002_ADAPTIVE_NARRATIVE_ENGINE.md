# Venture Hub OS — Phase 002: Adaptive Narrative Engine

**Document ID:** `VHOS-PHASE-002`  
**Specification:** `SPEC-002 — Adaptive Narrative Engine`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-001 — Core Platform / Project Twin`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Deployment Model:** Web-first / Static Hosting  
**Persistence Model:** Static JSON  
**AI Runtime:** NOT AUTHORIZED  
**Backend Services:** NOT AUTHORIZED  
**Firebase Runtime Services:** NOT AUTHORIZED  
**Next Phase:** `VHOS-PHASE-003 — Claims & Evidence Governance`

---

# 1. Executive Purpose

Phase 002 introduces the second core engine of Venture Hub OS:

> **Adaptive Narrative Engine**

The Project Twin created in Phase 001 is the canonical source of truth.

Phase 002 adds the capability to transform that canonical project model into different structured narratives depending on context.

The strategic model becomes:

```text
SOURCE MATERIAL
      ↓
PROJECT TWIN
      ↓
ADAPTIVE NARRATIVE ENGINE
      ↓
NARRATIVE PLAN
      ↓
PRESENTATION EXPERIENCE
```

The Narrative Engine does NOT generate unsupported facts.

The Narrative Engine does NOT modify Project Twin.

The Narrative Engine does NOT create evidence.

The Narrative Engine determines:

- what project sections are relevant;
- what order they should appear in;
- what depth they should receive;
- what narrative role each section plays;
- what can be omitted;
- where gaps exist;
- whether a requested narrative can be produced safely.

---

# 2. Core Product Thesis

One project should not require multiple manually maintained presentations.

Instead:

```text
ONE PROJECT TWIN
      │
      ├── Investor Narrative
      ├── Executive Narrative
      ├── Board Narrative
      ├── Commercial Narrative
      ├── Technical Narrative
      └── Due Diligence Narrative
```

Each narrative is a contextual projection of the same underlying project.

The project remains unchanged.

Only the narrative changes.

---

# 3. Primary Outcome

At the end of Phase 002, Venture Hub OS SHALL allow a user to choose:

```text
Project
Audience
Objective
Duration
Language
Depth
Narrative Profile
```

and produce a deterministic:

```text
NarrativePlan
```

Example:

```text
ARCANA

Audience:
INVESTOR

Objective:
RAISE_CAPITAL

Duration:
10_MINUTES

Language:
EN

Depth:
STANDARD
```

Result:

```text
NarrativePlan

01. Opening / Executive Summary
02. Problem
03. Why Now
04. Solution
05. Market
06. Product
07. Business Model
08. Technology Advantage
09. Risks
10. Roadmap
11. Ask
```

A different request:

```text
Audience:
TECHNICAL

Objective:
ARCHITECTURE_REVIEW

Duration:
20_MINUTES
```

may produce:

```text
01. System Context
02. Problem Constraints
03. Solution Architecture
04. Product Components
05. Technology
06. Data Flow
07. Security Considerations
08. Operational Risks
09. Roadmap
10. Open Questions
```

Same Project Twin.

Different narrative.

---

# 4. Architectural Mandate

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

The Narrative Engine SHALL be implemented as a new feature module.

Recommended structure:

```text
src/modules/narrative/
│
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── policies/
│   ├── ports/
│   ├── events/
│   ├── errors/
│   └── rules/
│
├── application/
│   ├── commands/
│   ├── queries/
│   └── use-cases/
│
├── adapters/
│   └── json/
│
└── tests/
```

The Narrative domain MUST NOT depend on:

- DOM;
- CSS;
- Vite;
- legacy decks;
- Firebase;
- browser storage implementation;
- AI providers;
- OpenAI;
- Claude;
- Gemini;
- Ollama;
- UI components.

---

# 5. Scope

## 5.1 In Scope

Phase 002 SHALL implement:

- NarrativeRequest;
- NarrativeProfile;
- AudienceProfile;
- NarrativeObjective;
- NarrativeDuration;
- NarrativeDepth;
- NarrativeLanguage;
- NarrativePlan;
- NarrativeStep;
- NarrativeRole;
- narrative ranking rules;
- section relevance rules;
- section ordering rules;
- duration budget logic;
- depth allocation logic;
- missing-section handling;
- fallback behavior;
- deterministic narrative compilation;
- narrative validation;
- JSON narrative profiles;
- narrative preview UI;
- Arcana pilot narratives;
- architecture tests;
- unit tests;
- E2E tests;
- documentation and verification evidence.

## 5.2 Explicitly Out of Scope

Do NOT implement:

- AI-generated copy;
- AI-generated slides;
- LLM orchestration;
- OpenAI;
- Claude;
- Gemini;
- Ollama;
- Claims & Evidence Engine;
- evidence scoring;
- due diligence document linking;
- Data Room;
- automated investor scoring;
- generated financial projections;
- automatic market research;
- live web research;
- collaboration;
- Firestore;
- Firebase Auth;
- Firebase Storage;
- Cloud Functions;
- backend API;
- database;
- presentation animation engine;
- PPTX export;
- PDF export.

---

# 6. Design Principle

The Narrative Engine SHALL be deterministic.

Given:

```text
same Project Twin
same NarrativeRequest
same NarrativeProfile version
```

the engine MUST produce:

```text
same NarrativePlan
```

This is critical for:

- auditability;
- testing;
- reproducibility;
- SDD;
- future AI comparison;
- investor trust;
- controlled presentation behavior.

---

# 7. Narrative Domain Model

The core model is:

```text
NarrativeRequest
      ↓
NarrativeCompiler
      ↓
NarrativePlan
      ↓
NarrativeSteps
```

Supporting domain objects:

```text
AudienceProfile
NarrativeObjective
NarrativeDuration
NarrativeDepth
NarrativeLanguage
NarrativeProfile
SectionPriority
NarrativeRole
NarrativeWarning
NarrativeGap
```

---

# 8. NarrativeRequest

Required.

Conceptual contract:

```ts
interface NarrativeRequest {
  projectId: string;
  projectVersion?: string;
  audience: AudienceType;
  objective: NarrativeObjective;
  duration: NarrativeDuration;
  language: NarrativeLanguage;
  depth: NarrativeDepth;
  profileId?: string;
}
```

The request MUST be runtime validated.

---

# 9. Audience Types

Phase 002 SHALL support at minimum:

```text
EXECUTIVE
INVESTOR
BOARD
COMMERCIAL
TECHNICAL
DUE_DILIGENCE
INTERNAL_STRATEGY
DEMO_DAY
```

Not every profile must be equally complete in Phase 002.

Minimum production-ready profiles:

```text
INVESTOR
EXECUTIVE
TECHNICAL
```

Recommended:

```text
BOARD
COMMERCIAL
```

Due Diligence may remain limited because Claims & Evidence belongs to Phase 003.

---

# 10. Narrative Objectives

Required values:

```text
INFORM
ALIGN
PERSUADE
RAISE_CAPITAL
SELL
ARCHITECTURE_REVIEW
STRATEGIC_REVIEW
DECISION_SUPPORT
VALIDATE
DUE_DILIGENCE
```

An audience does not imply a single objective.

Example:

```text
Audience = INVESTOR
Objective = RAISE_CAPITAL
```

differs from:

```text
Audience = INVESTOR
Objective = INFORM
```

---

# 11. Narrative Duration

The engine SHALL use semantic duration buckets.

Required:

```text
THREE_MINUTES
FIVE_MINUTES
TEN_MINUTES
TWENTY_MINUTES
DEEP_DIVE
```

Each duration SHALL define a target narrative budget.

Recommended:

```text
THREE_MINUTES  → 4–6 narrative steps
FIVE_MINUTES   → 6–8 steps
TEN_MINUTES    → 8–12 steps
TWENTY_MINUTES → 12–18 steps
DEEP_DIVE      → no strict step cap, but bounded by available sections
```

Exact thresholds may be adjusted through ADR.

---

# 12. Narrative Depth

Required:

```text
BRIEF
STANDARD
DEEP
```

Depth affects:

- number of included sections;
- amount of section detail;
- whether secondary sections appear;
- number of supporting points per step;
- tolerance for technical detail.

Depth MUST NOT change project facts.

---

# 13. Narrative Language

Required:

```text
ES
EN
```

Phase 002 SHALL NOT automatically translate unsupported content using AI.

If a project lacks requested-language content:

- the plan may still be created;
- missing-language warnings must be emitted;
- UI must indicate that content is unavailable or fallback was used.

Fallback behavior must be explicit and configured.

---

# 14. NarrativeProfile

A NarrativeProfile is a versioned policy configuration.

Example:

```json
{
  "id": "investor-standard",
  "version": "1.0",
  "audience": "INVESTOR",
  "supportedObjectives": [
    "RAISE_CAPITAL",
    "INFORM",
    "PERSUADE"
  ],
  "sectionPriorities": {
    "EXECUTIVE_SUMMARY": 100,
    "PROBLEM": 95,
    "WHY_NOW": 90,
    "SOLUTION": 95,
    "MARKET": 90,
    "BUSINESS_MODEL": 85,
    "TRACTION": 95,
    "FINANCIALS": 80,
    "TECHNOLOGY": 65,
    "RISKS": 70,
    "ROADMAP": 75,
    "TEAM": 80,
    "ASK": 100
  }
}
```

Narrative Profiles SHALL be stored outside UI code.

Recommended:

```text
data/narratives/profiles/
```

---

# 15. Narrative Profile Versioning

Every profile MUST contain:

```text
profileVersion
```

Example:

```json
{
  "id": "investor-standard",
  "profileVersion": "1.0"
}
```

A generated NarrativePlan SHALL record the exact profile version used.

This enables reproducibility.

---

# 16. Narrative Roles

NarrativeStep SHALL assign a semantic role.

Required roles:

```text
OPENING
CONTEXT
PROBLEM
TENSION
OPPORTUNITY
SOLUTION
PROOF
ECONOMICS
DIFFERENTIATION
RISK
EXECUTION
DECISION
ASK
CLOSING
```

A ProjectSection may play different narrative roles in different contexts.

Example:

```text
TECHNOLOGY
```

for Investor:

```text
DIFFERENTIATION
```

for Technical:

```text
SOLUTION
```

---

# 17. NarrativeStep

Required conceptual contract:

```ts
interface NarrativeStep {
  id: string;
  order: number;
  role: NarrativeRole;
  sectionType: ProjectSectionType;
  title: string;
  priority: number;
  depth: NarrativeDepth;
  estimatedSeconds?: number;
  rationale: string;
  status: NarrativeStepStatus;
  sourceSectionId: string;
}
```

NarrativeStep MUST reference a ProjectSection.

No orphan narrative step is allowed.

---

# 18. NarrativeStep Status

Required:

```text
READY
PARTIAL
MISSING_CONTENT
LANGUAGE_GAP
OMITTED_BY_POLICY
```

---

# 19. NarrativePlan

Required.

Conceptual contract:

```ts
interface NarrativePlan {
  id: string;
  projectId: string;
  projectVersion: string;
  profileId: string;
  profileVersion: string;
  request: NarrativeRequest;
  steps: NarrativeStep[];
  warnings: NarrativeWarning[];
  gaps: NarrativeGap[];
  generatedAt: string;
  engineVersion: string;
}
```

---

# 20. NarrativePlan Invariants

At minimum:

1. NarrativePlan belongs to exactly one ProjectVersion.
2. Every step references a valid ProjectSection.
3. Step order is unique.
4. Step order is contiguous after compilation.
5. Profile version is required.
6. Engine version is required.
7. Narrative request is preserved.
8. Missing mandatory sections generate a warning or gap.
9. The engine MUST NOT silently invent substitute sections.
10. Omitted sections must be omitted by policy or duration budget.
11. NarrativePlan must be reproducible.
12. NarrativePlan MUST NOT mutate Project Twin.

---

# 21. Narrative Compiler

Core domain service:

```text
NarrativeCompiler
```

Conceptual flow:

```text
NarrativeRequest
      ↓
Load Project Twin
      ↓
Load Narrative Profile
      ↓
Evaluate Section Availability
      ↓
Score Relevance
      ↓
Apply Objective Rules
      ↓
Apply Duration Budget
      ↓
Apply Depth Rules
      ↓
Resolve Order
      ↓
Detect Gaps
      ↓
Produce NarrativePlan
```

---

# 22. Relevance Scoring

Each section SHALL receive a deterministic relevance score.

Concept:

```text
base profile priority
+
objective modifier
+
availability modifier
+
depth modifier
+
duration constraint
```

The exact formula must be documented.

The engine MUST NOT use machine learning.

---

# 23. Objective Modifiers

Example policy:

```text
RAISE_CAPITAL
```

may increase:

```text
MARKET
TRACTION
BUSINESS_MODEL
TEAM
ASK
```

while:

```text
ARCHITECTURE_REVIEW
```

may increase:

```text
PRODUCT
TECHNOLOGY
RISKS
ROADMAP
```

These modifiers SHALL be explicit and versioned.

---

# 24. Mandatory Sections by Profile

Profiles MAY define mandatory sections.

Example investor profile:

```text
EXECUTIVE_SUMMARY
PROBLEM
SOLUTION
MARKET
BUSINESS_MODEL
ASK
```

Technical profile:

```text
PROBLEM
SOLUTION
PRODUCT
TECHNOLOGY
RISKS
ROADMAP
```

If a mandatory section is EMPTY:

```text
NarrativeGap
```

must be generated.

---

# 25. Duration Budget

The engine SHALL allocate a narrative budget.

Example:

```text
TEN_MINUTES
≈ 600 seconds
```

The engine MAY assign estimated seconds per step.

Example:

```text
Opening              40s
Problem              60s
Solution             70s
Market               60s
Business Model       60s
Technology           70s
Roadmap              50s
Risks                 50s
Ask                   60s
Closing               40s
```

Timing is guidance, not a real-time timer engine.

---

# 26. Duration Overflow

If selected mandatory content exceeds the duration budget:

The engine SHALL:

1. preserve mandatory sections;
2. reduce optional depth;
3. remove low-priority optional steps;
4. emit warning if still over budget.

Never silently remove a mandatory section.

---

# 27. Missing Content Policy

If a section status is:

```text
EMPTY
```

the Narrative Engine SHALL NOT fabricate content.

Instead:

```text
NarrativeGap
{
  section: "TRACTION",
  reason: "SECTION_EMPTY",
  severity: "HIGH"
}
```

---

# 28. Draft Content Policy

If section status is:

```text
DRAFT
```

the engine MAY include it if profile policy allows.

NarrativeStep SHALL be marked:

```text
PARTIAL
```

and warning emitted.

---

# 29. Validated Content Policy

If section status is:

```text
VALIDATED
```

the section receives full availability weighting.

Phase 002 uses section-level validation state only.

It does NOT evaluate claim-level evidence.

---

# 30. NOT_APPLICABLE Policy

Sections marked:

```text
NOT_APPLICABLE
```

SHALL NOT generate missing-content warnings.

---

# 31. Language Policy

Each content block SHOULD identify available language.

Phase 002 SHALL define:

```text
requested language
available language
fallback language
```

Fallback must be visible in the plan.

Example warning:

```text
MARKET section has no EN content.
Fallback ES used.
```

No silent language fallback.

---

# 32. Narrative Gap Model

Required:

```ts
interface NarrativeGap {
  id: string;
  sectionType: ProjectSectionType;
  severity: "LOW" | "MEDIUM" | "HIGH" | "BLOCKING";
  reason:
    | "SECTION_EMPTY"
    | "SECTION_MISSING"
    | "LANGUAGE_MISSING"
    | "MANDATORY_SECTION_UNAVAILABLE"
    | "INSUFFICIENT_DURATION";
  message: string;
}
```

---

# 33. Narrative Warning Model

Required:

```ts
interface NarrativeWarning {
  code: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  message: string;
  sectionType?: ProjectSectionType;
}
```

---

# 34. Engine Versioning

Every generated plan SHALL include:

```text
engineVersion
```

Example:

```text
1.0.0
```

If rules change, engine version must change.

This is distinct from:

```text
schemaVersion
projectVersion
profileVersion
```

---

# 35. Narrative Repository Port

Narrative plans and profiles SHALL use ports.

Required:

```ts
export interface NarrativeProfileRepository {
  findById(id: string): Promise<NarrativeProfile | null>;
  list(): Promise<NarrativeProfile[]>;
}
```

Recommended:

```ts
export interface NarrativePlanRepository {
  findById(id: string): Promise<NarrativePlan | null>;
}
```

Because static web runtime cannot persist server-side, plan persistence may remain in-memory or exported.

---

# 36. JSON Narrative Profile Adapter

Required.

```text
NarrativeProfileRepository
          ↑
JsonNarrativeProfileRepository
```

UI MUST NOT import narrative profile JSON directly.

---

# 37. Narrative Application Use Cases

Required:

```text
GenerateNarrativePlan
GetNarrativeProfile
ListNarrativeProfiles
ValidateNarrativeRequest
PreviewNarrativePlan
```

Recommended:

```text
CompareNarrativePlans
```

Comparison may be implemented only as structural comparison, not scoring intelligence.

---

# 38. Narrative UI

Phase 002 SHALL add a Narrative Builder / Preview interface.

Minimum user flow:

```text
Select Project
      ↓
Select Audience
      ↓
Select Objective
      ↓
Select Duration
      ↓
Select Language
      ↓
Select Depth
      ↓
Generate Narrative Plan
      ↓
Review Steps / Warnings / Gaps
```

---

# 39. Narrative Builder UI

Required controls:

```text
Audience
Objective
Duration
Language
Depth
Profile
```

Profile MAY auto-resolve based on audience.

---

# 40. Narrative Preview

The UI SHALL display:

- narrative step order;
- narrative role;
- source project section;
- status;
- estimated time;
- rationale;
- gaps;
- warnings.

It SHALL NOT yet render final slide design.

---

# 41. Narrative Preview Example

```text
ARCANA — Investor / 10 min

01 Opening
   Source: Executive Summary
   Status: READY
   Time: 40s

02 Problem
   Source: Problem
   Status: VALIDATED
   Time: 60s

03 Why Now
   Source: Why Now
   Status: DRAFT
   Warning: Draft section

04 Solution
   Source: Solution
   Status: READY

05 Market
   Status: MISSING_CONTENT
   Gap: Market section is empty

...
```

---

# 42. Narrative Comparison View

Recommended but not mandatory.

Example:

```text
Investor
vs
Technical
```

show differences in:

- included sections;
- order;
- depth;
- estimated duration;
- omitted sections.

This helps demonstrate Venture Hub differentiation.

---

# 43. Arcana Pilot

Arcana SHALL be used to generate at minimum three narrative plans:

```text
ARCANA_INVESTOR_10_EN
ARCANA_EXECUTIVE_5_ES
ARCANA_TECHNICAL_20_EN
```

If language content is unavailable, warnings must appear.

---

# 44. Arcana Investor Narrative

Required request:

```text
Audience: INVESTOR
Objective: RAISE_CAPITAL
Duration: TEN_MINUTES
Depth: STANDARD
Language: EN
```

---

# 45. Arcana Executive Narrative

Required request:

```text
Audience: EXECUTIVE
Objective: DECISION_SUPPORT
Duration: FIVE_MINUTES
Depth: BRIEF
Language: ES
```

---

# 46. Arcana Technical Narrative

Required request:

```text
Audience: TECHNICAL
Objective: ARCHITECTURE_REVIEW
Duration: TWENTY_MINUTES
Depth: DEEP
Language: EN
```

---

# 47. No Fabrication Rule

The engine MUST NOT:

- create project facts;
- calculate market size from missing data;
- create traction;
- invent financial outcomes;
- invent customers;
- invent evidence;
- convert hypotheses into facts;
- convert empty sections into narrative claims.

A missing section remains a gap.

---

# 48. Project Twin Integrity

Narrative generation MUST be read-only against Project Twin.

A test SHALL verify:

```text
Project Twin before compilation
==
Project Twin after compilation
```

---

# 49. Determinism Test

A test SHALL execute the same narrative request multiple times.

Expected:

```text
NarrativePlan A
==
NarrativePlan B
```

excluding non-deterministic metadata such as timestamp if necessary.

Recommended: inject clock or normalize timestamps for deterministic tests.

---

# 50. Profile Independence

Profiles SHALL be external policy data.

Changing:

```text
investor-standard.json
```

must not require changes to domain source code unless schema changes.

---

# 51. Narrative Rule Separation

Rules SHOULD be separated into:

```text
Audience Rules
Objective Rules
Duration Rules
Depth Rules
Availability Rules
Ordering Rules
```

Avoid a single giant:

```text
generateNarrative()
```

with hundreds of conditions.

---

# 52. Policy Composition

Recommended conceptual model:

```text
NarrativePolicy
├── AudiencePolicy
├── ObjectivePolicy
├── DurationPolicy
├── DepthPolicy
├── AvailabilityPolicy
└── OrderingPolicy
```

---

# 53. Ordering Strategy

Ordering SHALL be explicit.

Example investor flow:

```text
Context
Problem
Opportunity
Solution
Market
Business
Proof
Differentiation
Risk
Execution
Ask
```

Technical flow:

```text
Context
Constraints
Solution
Product
Architecture
Technology
Risk
Execution
Open Questions
```

The actual rules must map to available ProjectSections.

---

# 54. Section-to-Role Mapping

Profiles SHALL define how sections map to narrative roles.

Example:

```text
EXECUTIVE_SUMMARY → OPENING
PROBLEM → PROBLEM
WHY_NOW → OPPORTUNITY
SOLUTION → SOLUTION
TRACTION → PROOF
BUSINESS_MODEL → ECONOMICS
TECHNOLOGY → DIFFERENTIATION
RISKS → RISK
ROADMAP → EXECUTION
ASK → ASK
```

---

# 55. Narrative Safety

If a requested narrative cannot satisfy mandatory profile requirements:

The engine SHALL still return a plan if structurally possible, but:

```text
plan readiness = NOT_READY
```

Recommended readiness values:

```text
READY
READY_WITH_WARNINGS
NOT_READY
```

---

# 56. Narrative Readiness

Required.

```ts
type NarrativeReadiness =
  | "READY"
  | "READY_WITH_WARNINGS"
  | "NOT_READY";
```

Rules must be deterministic.

Example:

```text
mandatory section missing
→ NOT_READY
```

or profile may allow:

```text
mandatory section DRAFT
→ READY_WITH_WARNINGS
```

Document profile behavior.

---

# 57. Static Persistence

Narrative profiles SHALL be static JSON.

Generated NarrativePlans MAY:

- exist in memory;
- be serializable;
- be downloadable as JSON;
- be stored in browser local storage if an approved adapter already exists.

Do not introduce server persistence.

---

# 58. Optional Narrative Export

Phase 002 MAY allow:

```text
Export NarrativePlan JSON
```

This is allowed because it is a static artifact.

Do NOT implement PPTX/PDF export.

---

# 59. Workstreams

## WS-002-01 — Narrative Domain

Implement core narrative entities/value objects.

## WS-002-02 — Profiles

Implement audience and narrative profiles.

## WS-002-03 — Policies

Implement deterministic rule composition.

## WS-002-04 — Compiler

Implement NarrativeCompiler.

## WS-002-05 — Validation & Gaps

Implement readiness, warnings, gaps.

## WS-002-06 — Repository Adapters

Implement JSON profile repository.

## WS-002-07 — Application Use Cases

Implement plan generation workflows.

## WS-002-08 — Narrative Builder UI

Implement controls and preview.

## WS-002-09 — Arcana Pilot

Generate three required Arcana narratives.

## WS-002-10 — Testing

Unit, architecture, determinism, E2E, regression.

## WS-002-11 — Documentation

ADRs, reference docs, verification report.

---

# 60. Task Breakdown

## Domain

### T-002-001
Create NarrativeRequest.

### T-002-002
Create NarrativePlan.

### T-002-003
Create NarrativeStep.

### T-002-004
Create NarrativeRole.

### T-002-005
Create NarrativeReadiness.

### T-002-006
Create NarrativeWarning.

### T-002-007
Create NarrativeGap.

### T-002-008
Create NarrativeObjective.

### T-002-009
Create NarrativeDuration.

### T-002-010
Create NarrativeDepth.

### T-002-011
Create NarrativeLanguage.

### T-002-012
Create AudienceType.

---

## Profiles

### T-002-101
Create NarrativeProfile schema.

### T-002-102
Create AudienceProfile schema.

### T-002-103
Create investor profile.

### T-002-104
Create executive profile.

### T-002-105
Create technical profile.

### T-002-106
Create board profile if supported.

### T-002-107
Create commercial profile if supported.

### T-002-108
Add profile versioning.

---

## Policies

### T-002-201
Implement AudiencePolicy.

### T-002-202
Implement ObjectivePolicy.

### T-002-203
Implement DurationPolicy.

### T-002-204
Implement DepthPolicy.

### T-002-205
Implement AvailabilityPolicy.

### T-002-206
Implement OrderingPolicy.

### T-002-207
Implement mandatory section rules.

### T-002-208
Implement language fallback policy.

---

## Compiler

### T-002-301
Create NarrativeCompiler.

### T-002-302
Implement section relevance scoring.

### T-002-303
Implement profile priority resolution.

### T-002-304
Implement objective modifiers.

### T-002-305
Implement duration budget.

### T-002-306
Implement depth allocation.

### T-002-307
Implement ordering.

### T-002-308
Implement gap generation.

### T-002-309
Implement warning generation.

### T-002-310
Implement readiness evaluation.

### T-002-311
Add engineVersion.

---

## Ports & Adapters

### T-002-401
Create NarrativeProfileRepository port.

### T-002-402
Create JsonNarrativeProfileRepository.

### T-002-403
Create optional NarrativePlan serializer.

### T-002-404
Ensure UI does not import profile JSON directly.

---

## Application

### T-002-501
Create GenerateNarrativePlanUseCase.

### T-002-502
Create ListNarrativeProfilesUseCase.

### T-002-503
Create GetNarrativeProfileUseCase.

### T-002-504
Create ValidateNarrativeRequestUseCase.

### T-002-505
Create PreviewNarrativePlanUseCase.

---

## UI

### T-002-601
Create Narrative Builder route.

### T-002-602
Create audience selector.

### T-002-603
Create objective selector.

### T-002-604
Create duration selector.

### T-002-605
Create language selector.

### T-002-606
Create depth selector.

### T-002-607
Create profile selector.

### T-002-608
Create Generate action.

### T-002-609
Create Narrative Preview.

### T-002-610
Create Gap panel.

### T-002-611
Create Warning panel.

### T-002-612
Create readiness indicator.

### T-002-613
Create estimated timing display.

---

## Arcana Pilot

### T-002-701
Generate Arcana Investor 10 EN.

### T-002-702
Generate Arcana Executive 5 ES.

### T-002-703
Generate Arcana Technical 20 EN.

### T-002-704
Record gaps for each narrative.

### T-002-705
Record warnings for each narrative.

### T-002-706
Verify Project Twin remains unchanged.

### T-002-707
Create pilot comparison report.

---

## Tests

### T-002-801
Test NarrativeRequest validation.

### T-002-802
Test profile validation.

### T-002-803
Test investor priorities.

### T-002-804
Test executive priorities.

### T-002-805
Test technical priorities.

### T-002-806
Test objective modifiers.

### T-002-807
Test duration budget.

### T-002-808
Test depth allocation.

### T-002-809
Test missing mandatory section.

### T-002-810
Test EMPTY section handling.

### T-002-811
Test DRAFT section handling.

### T-002-812
Test NOT_APPLICABLE handling.

### T-002-813
Test language fallback warning.

### T-002-814
Test deterministic compilation.

### T-002-815
Test Project Twin immutability.

### T-002-816
Test JSON profile adapter.

### T-002-817
Test Narrative Builder E2E.

### T-002-818
Test Arcana Investor narrative.

### T-002-819
Test Arcana Executive narrative.

### T-002-820
Test Arcana Technical narrative.

### T-002-821
Run architecture tests.

### T-002-822
Run Phase 001 regression suite.

### T-002-823
Run Phase 000A regression suite.

### T-002-824
Run Phase 0 legacy preservation suite.

---

## Documentation

### T-002-901
Create Narrative Domain Model.

### T-002-902
Create Narrative Profile Reference.

### T-002-903
Create Narrative Policy Reference.

### T-002-904
Create Duration Budget Reference.

### T-002-905
Create Narrative Readiness Rules.

### T-002-906
Create Arcana Narrative Pilot Report.

### T-002-907
Create SPEC-002 traceability matrix.

### T-002-908
Create Phase 002 Verification Report.

---

# 61. Acceptance Criteria

## AC-002-001 — Determinism

Same inputs SHALL generate the same plan.

---

## AC-002-002 — Project Twin Integrity

Narrative compilation SHALL NOT mutate Project Twin.

---

## AC-002-003 — Context Adaptation

Different audiences SHALL be able to produce different section ordering/selection from the same Project Twin.

---

## AC-002-004 — Objective Adaptation

Different objectives SHALL change priorities according to explicit policies.

---

## AC-002-005 — Duration Adaptation

THREE_MINUTES and TWENTY_MINUTES SHALL produce materially different narrative depth/step budgets.

---

## AC-002-006 — Missing Content

EMPTY mandatory sections SHALL generate explicit NarrativeGaps.

---

## AC-002-007 — No Fabrication

No content absent from Project Twin may appear as project fact in NarrativePlan.

---

## AC-002-008 — Profile Isolation

Narrative profiles SHALL load through NarrativeProfileRepository.

---

## AC-002-009 — UI Isolation

UI SHALL access engine behavior through application use cases.

---

## AC-002-010 — Arcana Investor

Arcana Investor 10 EN SHALL compile.

---

## AC-002-011 — Arcana Executive

Arcana Executive 5 ES SHALL compile.

---

## AC-002-012 — Arcana Technical

Arcana Technical 20 EN SHALL compile.

---

## AC-002-013 — Readiness

Each plan SHALL return READY, READY_WITH_WARNINGS, or NOT_READY.

---

## AC-002-014 — Static Build

Application SHALL remain static-hostable.

---

## AC-002-015 — Architecture

Narrative domain SHALL preserve hexagonal dependency rules.

---

## AC-002-016 — Regression

All prior protected tests SHALL remain passing.

---

## AC-002-017 — Forbidden Scope

No AI, backend, database, or Firebase runtime service may be introduced.

---

# 62. Definition of Done

Phase 002 may become `CODE_COMPLETE` only when:

- Narrative domain model exists;
- profiles exist;
- policies exist;
- compiler exists;
- duration budget works;
- gap/warning model works;
- readiness works;
- JSON profile repository works;
- application use cases work;
- Narrative Builder works;
- three Arcana narratives compile;
- tests exist;
- architecture tests pass;
- prior regressions pass;
- static build passes;
- forbidden scope remains absent.

Phase 002 becomes `VERIFIED` only if:

```text
TYPECHECK                     PASS
ARCHITECTURE TESTS            PASS
NARRATIVE DOMAIN TESTS        PASS
PROFILE TESTS                 PASS
POLICY TESTS                  PASS
DETERMINISM TEST              PASS
IMMUTABILITY TEST             PASS
ARCANA INVESTOR               PASS
ARCANA EXECUTIVE              PASS
ARCANA TECHNICAL              PASS
NARRATIVE BUILDER E2E         PASS
PHASE 001 REGRESSION          PASS
PHASE 000A REGRESSION         PASS
PHASE 0 LEGACY PRESERVATION   PASS
STATIC BUILD                  PASS
CONSOLE CHECK                 PASS
FORBIDDEN SCOPE AUDIT         PASS
```

Only the human owner may set:

```text
CLOSED
```

---

# 63. Required Verification Report

The IDE MUST generate:

```text
docs/evidence/PHASE_002_VERIFICATION_REPORT.md
```

Required sections:

## Identification

- phase;
- SPEC;
- branch;
- starting commit;
- ending commit;
- date;
- engine version.

## Task Matrix

Every `T-002-*` task.

Statuses:

```text
DONE
PARTIAL
BLOCKED
NOT_STARTED
```

## Narrative Profiles

List:

- profile ID;
- profile version;
- audience;
- supported objectives.

## Engine Verification

Report:

- deterministic behavior;
- duration behavior;
- objective modifiers;
- readiness logic;
- gap logic;
- language fallback.

## Arcana Pilot

Report three narratives:

```text
Investor / 10 / EN
Executive / 5 / ES
Technical / 20 / EN
```

For each:

- readiness;
- number of steps;
- warnings;
- gaps;
- estimated duration;
- omitted sections.

## Test Matrix

| Verification | Result |
|---|---|
| Typecheck | |
| Architecture | |
| Domain | |
| Profiles | |
| Policies | |
| Determinism | |
| Immutability | |
| Arcana Investor | |
| Arcana Executive | |
| Arcana Technical | |
| Builder E2E | |
| Regression | |
| Legacy | |
| Build | |
| Console | |

## Scope Audit

Explicitly state:

```text
OpenAI: NOT IMPLEMENTED
Claude: NOT IMPLEMENTED
Gemini: NOT IMPLEMENTED
Ollama: NOT IMPLEMENTED
AI runtime: NOT IMPLEMENTED
Firestore: NOT IMPLEMENTED
Firebase Auth: NOT IMPLEMENTED
Firebase Storage: NOT IMPLEMENTED
Cloud Functions: NOT IMPLEMENTED
Backend: NOT IMPLEMENTED
Database: NOT IMPLEMENTED
Claims Engine: NOT IMPLEMENTED
Evidence Engine: NOT IMPLEMENTED
Data Room: NOT IMPLEMENTED
```

## Final Recommendation

Allowed:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

---

# 64. Required Documentation

Create:

```text
docs/architecture/NARRATIVE_DOMAIN_MODEL.md
docs/architecture/NARRATIVE_PROFILE_REFERENCE.md
docs/architecture/NARRATIVE_POLICY_REFERENCE.md
docs/architecture/NARRATIVE_DURATION_BUDGET.md
docs/architecture/NARRATIVE_READINESS_RULES.md
docs/evidence/ARCANA_NARRATIVE_PILOT_REPORT.md
docs/evidence/SPEC_002_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_002_VERIFICATION_REPORT.md
```

---

# 65. Recommended ADRs

Create:

```text
ADR-0014 Narrative Plan as Derived Projection
ADR-0015 Deterministic Narrative Compilation
ADR-0016 Versioned Narrative Profiles
ADR-0017 Duration Budget Strategy
ADR-0018 Narrative Gap and Readiness Model
ADR-0019 No-AI Narrative Engine in Phase 002
```

---

# 66. SDD State Machine

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

# 67. Change Control

If additional scope is required:

1. stop affected task;
2. create:

```text
docs/specs/changes/CHANGE_REQUEST_002_XXX.md
```

3. document:
   - problem;
   - proposed change;
   - alternatives;
   - impact;
   - architectural risk;
4. wait for approval.

---

# 68. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-002 — Adaptive Narrative Engine`

under:

`SPEC-002 — Adaptive Narrative Engine`

Previous phase:

`VHOS-PHASE-001 — Core Platform / Project Twin`

is approved CLOSED.

---

## PRIMARY OBJECTIVE

Implement a deterministic Adaptive Narrative Engine that transforms a Project Twin into a contextual NarrativePlan based on:

- audience;
- objective;
- duration;
- language;
- depth;
- narrative profile.

Do NOT implement AI generation.

---

## BEFORE WRITING CODE

You MUST:

1. read Phase 0 baseline docs;
2. read Phase 000A architecture and ADRs;
3. read Phase 001 Project Twin docs and verification report;
4. run the full existing verification suite;
5. confirm baseline passes;
6. inspect Arcana Project Twin;
7. map implementation to `T-002-*`;
8. document execution plan.

Do not begin with UI.

Start with Narrative Domain.

---

## IMPLEMENTATION ORDER

Required order:

```text
Narrative Domain
      ↓
Profiles
      ↓
Policies
      ↓
Compiler
      ↓
Validation / Gaps / Readiness
      ↓
Repository Adapter
      ↓
Application Use Cases
      ↓
Narrative Builder UI
      ↓
Arcana Pilot
      ↓
Tests
```

---

## ARCHITECTURAL RULE

Preserve:

```text
UI
 ↓
Application
 ↓
Domain
```

Narrative domain MUST NOT depend on:

- UI;
- DOM;
- JSON implementation;
- Firebase;
- browser storage implementation;
- legacy decks;
- AI providers.

---

## PROJECT TWIN RULE

Project Twin remains canonical.

Narrative Engine may read Project Twin.

Narrative Engine MUST NOT mutate Project Twin.

---

## NO FABRICATION RULE

Do NOT generate facts absent from Project Twin.

If content is missing:

- emit a gap;
- emit warning;
- mark readiness accordingly.

Never invent a substitute.

---

## DETERMINISM RULE

Same:

```text
Project Twin
NarrativeRequest
NarrativeProfile version
Engine version
```

must produce equivalent NarrativePlan.

---

## AUTHORIZED TECHNOLOGY

Use current approved web stack and narrowly necessary static rule/profile tooling.

No infrastructure expansion.

---

## FORBIDDEN

Do NOT add:

- OpenAI;
- Claude;
- Gemini;
- Ollama;
- AI SDKs;
- Firestore;
- Auth;
- Storage;
- Cloud Functions;
- backend;
- database;
- Claims Engine;
- Evidence Engine;
- Data Room;
- PPTX export;
- PDF export.

---

## ARCANA PILOT REQUIREMENT

Generate and verify:

```text
ARCANA_INVESTOR_10_EN
ARCANA_EXECUTIVE_5_ES
ARCANA_TECHNICAL_20_EN
```

Do not manually hard-code the resulting step sequence specifically for Arcana.

The compiler rules must be reusable.

---

## TESTING REQUIREMENTS

Before CODE_COMPLETE run:

1. typecheck;
2. architecture tests;
3. narrative domain tests;
4. profile tests;
5. policy tests;
6. determinism tests;
7. Project Twin immutability tests;
8. Arcana pilot tests;
9. Narrative Builder Playwright tests;
10. Phase 001 regression;
11. Phase 000A regression;
12. Phase 0 legacy preservation;
13. static build;
14. console validation;
15. forbidden-scope audit.

All mandatory checks must pass.

---

## REQUIRED OUTPUT

Generate:

```text
docs/evidence/PHASE_002_VERIFICATION_REPORT.md
```

Final recommendation may only be:

```text
READY_FOR_APPROVAL
```

if all mandatory acceptance criteria pass.

Otherwise:

```text
NOT_READY
```

or:

```text
BLOCKED
```

Do NOT start Phase 003.

Do NOT mark Phase 002 CLOSED.

---

# 69. Expected End State

At completion:

```text
                     PROJECT TWIN
                           │
                           ▼
                ADAPTIVE NARRATIVE ENGINE
                           │
         ┌─────────────────┼──────────────────┐
         │                 │                  │
         ▼                 ▼                  ▼
     INVESTOR          EXECUTIVE           TECHNICAL
     PROFILE            PROFILE             PROFILE
         │                 │                  │
         └─────────────────┼──────────────────┘
                           │
                           ▼
                    NARRATIVE PLAN
                           │
                 Steps / Gaps / Timing
                           │
                           ▼
                    NARRATIVE PREVIEW
```

The platform still has:

```text
NO AI
NO BACKEND
NO DATABASE
NO FIRESTORE
```

but now it can transform one Project Twin into multiple strategic narratives.

---

# 70. Exit Decision

If all criteria pass:

> **Apruebo formalmente VHOS-PHASE-002 — Adaptive Narrative Engine bajo SPEC-002 como VERIFIED/CLOSED y autorizo el inicio de VHOS-PHASE-003 — Claims & Evidence Governance, manteniendo la arquitectura Feature-Oriented Hexagonal, el enfoque web-first, la persistencia estática y el motor narrativo determinístico sin IA generativa.**
