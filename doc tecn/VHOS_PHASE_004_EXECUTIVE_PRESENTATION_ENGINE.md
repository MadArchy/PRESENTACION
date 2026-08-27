# Venture Hub OS — Phase 004: Executive Presentation Engine

**Document ID:** `VHOS-PHASE-004`  
**Specification:** `SPEC-004 — Executive Presentation Engine`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-003 — Claims & Evidence Governance`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Deployment Model:** Web-first / Static Hosting  
**Persistence Model:** Static JSON / Derived Runtime Definitions  
**AI Runtime:** NOT AUTHORIZED  
**Backend Services:** NOT AUTHORIZED  
**Firebase Runtime Services:** NOT AUTHORIZED  
**PPTX/PDF Export:** NOT AUTHORIZED  
**Next Phase:** `VHOS-PHASE-005 — Executive Presenter Cockpit`

---

# 1. Executive Purpose

Phase 004 introduces the visual compilation layer of Venture Hub OS:

> **Executive Presentation Engine**

The platform already contains:

```text
PROJECT TWIN
      ↓
ADAPTIVE NARRATIVE ENGINE
      ↓
NARRATIVE PLAN
      ↓
CLAIMS & EVIDENCE
      ↓
TRUST CONTEXT
```

Phase 004 transforms those structured assets into a deterministic executive presentation definition:

```text
PROJECT TWIN
      ↓
NARRATIVE PLAN
      ↓
TRUST CONTEXT
      ↓
PRESENTATION COMPILER
      ↓
PRESENTATION DEFINITION
      ↓
EXECUTIVE RENDERER
```

The central design decision is:

> Slides/scenes are derived views. They are no longer hand-authored as the source of truth.

---

# 2. Product Thesis

Traditional presentation systems start with slides.

Venture Hub OS SHALL start with structured project intelligence.

The same Project Twin can generate different visual presentation structures for:

```text
INVESTOR
EXECUTIVE
BOARD
COMMERCIAL
TECHNICAL
DUE DILIGENCE
```

without duplicating project truth.

The Presentation Engine SHALL decide:

- which scene type represents each narrative step;
- what structured data is bound to that scene;
- which visual hierarchy applies;
- which trust labels must remain visible;
- which theme and layout rules apply;
- how the scene behaves responsively;
- how to preserve accessibility and readability.

---

# 3. Primary Outcome

At the end of Phase 004, Venture Hub OS SHALL be able to take:

```text
Project Twin
NarrativePlan
NarrativeTrustContext
PresentationTheme
PresentationProfile
```

and produce:

```text
PresentationDefinition
```

that can be rendered consistently in-browser.

Example:

```text
ARCANA
Investor
10 minutes
English
Raise Capital
```

may produce:

```text
Scene 01 — Executive Hero
Scene 02 — Problem Frame
Scene 03 — Why Now
Scene 04 — Solution
Scene 05 — Market
Scene 06 — Business Model
Scene 07 — Technology Differentiator
Scene 08 — Evidence / Trust
Scene 09 — Roadmap
Scene 10 — Investment Ask
```

The same project under:

```text
Technical
20 minutes
Architecture Review
```

may produce:

```text
Scene 01 — Technical Context
Scene 02 — Problem Constraints
Scene 03 — System Overview
Scene 04 — Product Architecture
Scene 05 — Technology Deep Dive
Scene 06 — Data / Control Flow
Scene 07 — Trust & Evidence
Scene 08 — Operational Risks
Scene 09 — Technical Roadmap
Scene 10 — Open Questions
```

---

# 4. Architectural Mandate

Create:

```text
src/modules/presentation/
```

Recommended structure:

```text
src/modules/presentation/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── services/
│   ├── policies/
│   ├── ports/
│   ├── events/
│   └── errors/
│
├── application/
│   ├── queries/
│   ├── commands/
│   └── use-cases/
│
├── adapters/
│   ├── json/
│   └── browser/
│
└── tests/
```

UI components remain under:

```text
src/ui/
```

The Presentation domain MUST NOT depend on:

- DOM;
- CSS files;
- browser globals;
- Firebase;
- legacy decks;
- OpenAI or other AI providers;
- concrete JSON file paths;
- UI components.

---

# 5. Dependency Direction

Preserve:

```text
UI
 ↓
Application
 ↓
Domain
```

Presentation adapters may depend inward.

Presentation domain SHALL depend only on:

- presentation-domain primitives;
- stable shared primitives;
- stable project/narrative contracts when integration is required through explicit mapping boundaries.

Avoid direct deep imports into unrelated module internals.

---

# 6. Integration Boundaries

Phase 004 SHALL consume previous-phase outputs through explicit integration contracts.

Recommended:

```text
NarrativePlanView
NarrativeTrustView
ProjectPresentationView
```

or equivalent mapping DTOs.

Do NOT make the Presentation domain depend directly on:

```text
JsonProjectRepository
JsonClaimRepository
Narrative UI
Governance UI
```

---

# 7. Scope

## 7.1 In Scope

Phase 004 SHALL implement:

- PresentationDefinition;
- PresentationScene;
- SceneType;
- SceneRole;
- SceneStatus;
- PresentationProfile;
- PresentationTheme;
- LayoutVariant;
- ContentBinding;
- TrustBinding;
- MediaBinding;
- SceneTemplate;
- SceneTemplateRegistry;
- deterministic PresentationCompiler;
- narrative-to-scene mapping;
- section-to-scene mapping;
- trust annotation binding;
- theme tokens;
- responsive executive renderer;
- presentation preview route;
- scene navigation;
- scene overview/grid;
- full-screen presentation mode foundation;
- Arcana investor/executive/technical presentation pilots;
- architecture tests;
- unit tests;
- E2E tests;
- visual regression baseline;
- documentation and verification report.

## 7.2 Explicitly Out of Scope

Do NOT implement:

- AI slide generation;
- AI image generation;
- AI copy generation;
- OpenAI;
- Claude;
- Gemini;
- Ollama;
- automatic web image search;
- Firestore;
- Firebase Auth;
- Firebase Storage;
- Cloud Functions;
- backend API;
- database;
- collaborative editing;
- PPTX export;
- PDF export;
- PowerPoint compatibility layer;
- presenter notes authoring engine;
- speaker coaching;
- live audience telemetry;
- remote control;
- real-time collaboration;
- billing;
- multi-user accounts.

Those belong to later phases.

---

# 8. Presentation Definition Principle

A PresentationDefinition is:

> A structured, versioned, deterministic description of an executive presentation derived from project intelligence.

It is NOT raw HTML.

It is NOT a DOM tree.

It is NOT a PowerPoint file.

It is NOT a collection of hard-coded slide IDs.

---

# 9. PresentationDefinition

Conceptual contract:

```ts
interface PresentationDefinition {
  id: string;

  projectId: string;
  projectVersion: string;

  narrativePlanId: string;
  narrativeProfileId: string;
  narrativeProfileVersion: string;

  presentationProfileId: string;
  presentationProfileVersion: string;

  themeId: string;
  themeVersion: string;

  language: string;
  audience: string;
  objective: string;

  scenes: PresentationScene[];

  trustSummary?: PresentationTrustSummary;

  compilerVersion: string;
  schemaVersion: string;
}
```

Timestamps MAY exist outside deterministic equality checks.

---

# 10. Presentation Scene

A `PresentationScene` is the canonical visual unit.

Use the term:

```text
Scene
```

rather than making the domain PowerPoint-specific.

Conceptual contract:

```ts
interface PresentationScene {
  id: string;
  order: number;

  type: SceneType;
  role: SceneRole;
  status: SceneStatus;

  title?: LocalizedText;
  eyebrow?: LocalizedText;
  subtitle?: LocalizedText;

  layout: LayoutVariant;

  bindings: ContentBinding[];

  trustBindings?: TrustBinding[];
  mediaBindings?: MediaBinding[];

  sourceNarrativeStepId: string;
  sourceSectionId?: string;

  estimatedSeconds?: number;
}
```

---

# 11. Scene Invariants

At minimum:

1. scene ID required;
2. order required;
3. order unique;
4. order contiguous after compilation;
5. SceneType valid;
6. SceneRole valid;
7. layout valid;
8. source NarrativeStep required;
9. NarrativeStep must belong to compiled NarrativePlan;
10. scene content must derive from authorized source bindings;
11. trust-sensitive claim labels must be preserved;
12. unsupported FACT warnings must not disappear;
13. TARGET/ASSUMPTION/HYPOTHESIS semantics must be preserved;
14. no scene may mutate Project Twin;
15. no scene may mutate NarrativePlan.

---

# 12. Scene Types

Phase 004 SHALL support a reusable executive scene library.

Minimum required:

```text
EXECUTIVE_HERO
SECTION_DIVIDER
PROBLEM_FRAME
WHY_NOW
SOLUTION_OVERVIEW
PRODUCT_OVERVIEW
MARKET_OVERVIEW
BUSINESS_MODEL
COMPETITIVE_LANDSCAPE
TRACTION
FINANCIAL_OVERVIEW
TECHNOLOGY_OVERVIEW
ARCHITECTURE_MAP
RISK_OVERVIEW
ROADMAP
TEAM
EVIDENCE_OVERVIEW
DECISION_FRAME
ASK
CLOSING
GENERIC_CONTENT
```

Do not create Arcana-specific scene types.

---

# 13. Scene Roles

Required:

```text
OPENING
CONTEXT
PROBLEM
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

These should align conceptually with Phase 002 NarrativeRole.

---

# 14. Scene Status

Required:

```text
READY
READY_WITH_WARNINGS
INCOMPLETE
BLOCKED
```

Scene readiness SHALL derive from:

- available content;
- required bindings;
- trust warnings;
- media availability;
- template rules.

---

# 15. Presentation Profile

A `PresentationProfile` defines how narrative meaning maps into visual scenes.

Example:

```json
{
  "id": "investor-executive",
  "profileVersion": "1.0",
  "audience": "INVESTOR",
  "scenePreferences": {
    "OPENING": ["EXECUTIVE_HERO"],
    "PROBLEM": ["PROBLEM_FRAME"],
    "OPPORTUNITY": ["WHY_NOW", "MARKET_OVERVIEW"],
    "SOLUTION": ["SOLUTION_OVERVIEW", "PRODUCT_OVERVIEW"],
    "ECONOMICS": ["BUSINESS_MODEL", "FINANCIAL_OVERVIEW"],
    "PROOF": ["TRACTION", "EVIDENCE_OVERVIEW"],
    "RISK": ["RISK_OVERVIEW"],
    "EXECUTION": ["ROADMAP"],
    "ASK": ["ASK"],
    "CLOSING": ["CLOSING"]
  }
}
```

Profiles SHALL be external policy data.

---

# 16. Presentation Profile Versioning

Required:

```text
profileVersion
```

Generated PresentationDefinition SHALL store:

```text
presentationProfileId
presentationProfileVersion
```

---

# 17. Required Presentation Profiles

Minimum production-ready:

```text
INVESTOR_EXECUTIVE
EXECUTIVE_BRIEF
TECHNICAL_DEEP_DIVE
```

Recommended:

```text
BOARD_REVIEW
COMMERCIAL_PITCH
```

Do not implement Due Diligence-specific visual experience beyond generic support in this phase.

---

# 18. Scene Template

A SceneTemplate defines structured render expectations.

Conceptual:

```ts
interface SceneTemplate {
  id: string;
  sceneType: SceneType;
  supportedLayouts: LayoutVariant[];
  requiredBindingTypes: ContentBindingType[];
  optionalBindingTypes: ContentBindingType[];
  supportsTrust: boolean;
  supportsMedia: boolean;
}
```

SceneTemplate is not HTML.

---

# 19. Scene Template Registry

Required domain/application service:

```text
SceneTemplateRegistry
```

Responsibilities:

- resolve SceneType;
- expose supported layouts;
- validate required bindings;
- prevent unsupported scene combinations.

Do NOT instantiate UI components directly inside domain registry.

UI may maintain a separate render component registry mapped by SceneType.

---

# 20. ContentBinding

Presentation content SHALL be bound through typed data bindings.

Required binding types:

```text
TEXT
BULLET_LIST
KEY_VALUE
METRIC
METRIC_SET
TABLE
COMPARISON
TIMELINE
ROADMAP
RISK_LIST
ARCHITECTURE_NODES
ARCHITECTURE_EDGES
CLAIM
CLAIM_SET
EVIDENCE_SUMMARY
MEDIA
```

---

# 21. Content Binding Contract

Conceptual:

```ts
interface ContentBinding {
  id: string;
  type: ContentBindingType;

  sourceType:
    | "PROJECT_SECTION"
    | "NARRATIVE_STEP"
    | "CLAIM"
    | "EVIDENCE"
    | "DERIVED";

  sourceRef: string;

  field?: string;

  label?: LocalizedText;
  value: unknown;

  presentationHints?: PresentationHints;
}
```

`DERIVED` data must be deterministic and traceable.

---

# 22. No Untraceable Content

Every material scene value SHALL be traceable to:

- Project Twin;
- NarrativePlan;
- Claim;
- Evidence;
- approved deterministic derived transformation.

No arbitrary presentation-only fact may exist without provenance.

---

# 23. Presentation Hints

Allowed hints MAY include:

```text
emphasis
priority
format
alignment
density
```

Do NOT store raw CSS in domain data.

Example:

```json
{
  "emphasis": "PRIMARY",
  "format": "PERCENT",
  "priority": 100
}
```

---

# 24. TrustBinding

Trust metadata SHALL be presentation-safe.

Conceptual:

```ts
interface TrustBinding {
  claimId: string;
  claimType: ClaimType;
  supportStatus: ClaimSupportStatus;
  materiality: ClaimMateriality;
  labelRequired: boolean;
  warningCode?: string;
}
```

The Presentation Engine MUST preserve Phase 003 semantics.

---

# 25. Trust Label Rules

At minimum:

```text
TARGET
→ visible semantic label when material
```

```text
ASSUMPTION
→ visible semantic label when material
```

```text
ESTIMATE
→ visible semantic label where quantitative
```

```text
HYPOTHESIS
→ visible semantic label where presented as unresolved
```

```text
UNSUPPORTED material FACT
→ visible warning indicator
```

```text
CONTRADICTED claim
→ critical warning indicator
```

Visual styling belongs to UI/theme.

Semantic presence is domain requirement.

---

# 26. PresentationTrustSummary

Recommended:

```ts
interface PresentationTrustSummary {
  referencedClaims: number;
  supportedMaterialFacts: number;
  unsupportedMaterialFacts: number;
  contradictedClaims: number;
  targets: number;
  assumptions: number;
  estimates: number;
  hypotheses: number;
  readiness:
    | "TRUST_READY"
    | "TRUST_READY_WITH_WARNINGS"
    | "TRUST_NOT_READY";
}
```

No opaque trust score.

---

# 27. Presentation Compiler

Core service:

```text
PresentationCompiler
```

Conceptual flow:

```text
Project Twin
      +
NarrativePlan
      +
NarrativeTrustContext
      +
PresentationProfile
      +
Theme
      ↓
Validate Inputs
      ↓
Resolve Scene Type
      ↓
Resolve Template
      ↓
Build Bindings
      ↓
Attach Trust Bindings
      ↓
Resolve Layout
      ↓
Validate Scene
      ↓
Compile PresentationDefinition
```

---

# 28. Deterministic Compilation

Given the same:

```text
Project Twin
Project Version
NarrativePlan
NarrativeTrustContext
PresentationProfile Version
Theme Version
Compiler Version
```

the engine MUST produce an equivalent PresentationDefinition.

No randomness.

No AI.

---

# 29. Compiler Version

Required:

```text
presentationCompilerVersion
```

Recommended:

```text
1.0.0
```

---

# 30. Scene Selection Policy

Scene type SHALL be selected from:

```text
NarrativeRole
ProjectSectionType
Audience
PresentationProfile
Available Content
Trust Context
```

Selection logic MUST be explicit and testable.

---

# 31. Scene Selection Example

Narrative:

```text
Role = ECONOMICS
Section = BUSINESS_MODEL
Audience = INVESTOR
```

may resolve:

```text
BUSINESS_MODEL
```

Narrative:

```text
Role = SOLUTION
Section = TECHNOLOGY
Audience = TECHNICAL
```

may resolve:

```text
ARCHITECTURE_MAP
```

Same section may map differently depending on narrative context.

---

# 32. Fallback Scene

Required:

```text
GENERIC_CONTENT
```

If no specialized SceneType is valid:

```text
GENERIC_CONTENT
```

may render supported content.

Fallback MUST emit a compiler warning:

```text
SCENE_TEMPLATE_FALLBACK
```

Do not fail silently.

---

# 33. Missing Required Binding

If a SceneTemplate requires content not available:

```text
SceneStatus = INCOMPLETE
```

or:

```text
BLOCKED
```

depending on severity.

Do NOT invent placeholder business facts.

---

# 34. LayoutVariant

Required layout primitives:

```text
HERO
SPLIT
STACKED
GRID
METRIC_WALL
TIMELINE
MATRIX
DIAGRAM
FULL_BLEED_MEDIA
CONTENT_PLUS_EVIDENCE
MINIMAL
```

Layouts represent visual structure, not CSS implementation.

---

# 35. Layout Resolution

Layout MAY depend on:

- SceneType;
- available binding count;
- media availability;
- audience;
- density;
- viewport category.

Domain SHALL select semantic layout.

UI SHALL implement responsive rendering.

---

# 36. Theme System

Phase 004 SHALL introduce versioned presentation themes.

Theme is composed of semantic tokens.

Recommended:

```text
color roles
typography roles
spacing scale
radius scale
shadow scale
surface hierarchy
data visualization tokens
motion tokens
```

Do NOT hard-code project-specific styling throughout components.

---

# 37. Theme Contract

Conceptual:

```ts
interface PresentationTheme {
  id: string;
  version: string;
  name: string;

  tokens: {
    color: ThemeColorTokens;
    typography: ThemeTypographyTokens;
    spacing: ThemeSpacingTokens;
    radius: ThemeRadiusTokens;
    elevation: ThemeElevationTokens;
    motion: ThemeMotionTokens;
  };
}
```

---

# 38. Required Themes

Minimum:

```text
EXECUTIVE_LIGHT
EXECUTIVE_DARK
```

Arcana MAY define a project theme mapping through tokens.

Do not create a separate component library just for Arcana.

---

# 39. Project Theme Mapping

Allowed:

```text
Project metadata
→ preferred theme ID
```

Example:

```text
arcana
→ executive-dark
```

Theme choice must remain replaceable.

---

# 40. Renderer

Create browser renderer layer.

Recommended:

```text
PresentationRenderer
SceneRendererRegistry
```

`PresentationRenderer` consumes:

```text
PresentationDefinition
```

It does NOT compile business meaning.

---

# 41. Renderer Registry

UI registry maps:

```text
SceneType
→ Scene Component
```

Example:

```text
EXECUTIVE_HERO
→ ExecutiveHeroScene
```

```text
MARKET_OVERVIEW
→ MarketOverviewScene
```

```text
GENERIC_CONTENT
→ GenericContentScene
```

The UI registry is an adapter/UI concern.

---

# 42. Scene Components

Minimum scene components SHALL cover all required SceneTypes.

Components SHOULD:

- be data-driven;
- receive typed scene props;
- avoid global project lookups;
- avoid reading repositories;
- avoid business rule calculations;
- avoid direct access to NarrativeCompiler.

---

# 43. Presentation Preview Route

Required route:

```text
/presentation/:projectId/:presentationId
```

or equivalent static-compatible route strategy.

The route SHALL:

- resolve compiled definition;
- render scenes;
- support navigation;
- expose scene count;
- expose trust warnings where applicable.

---

# 44. Scene Navigation

Phase 004 SHALL implement basic presentation navigation.

Required:

```text
Next
Previous
Home
End
ArrowRight
ArrowLeft
PageDown
PageUp
```

This preserves important Phase 0 behavior.

---

# 45. Fullscreen Foundation

Required:

```text
Enter Fullscreen
Exit Fullscreen
Escape
```

The full Presenter Cockpit belongs to Phase 005.

Phase 004 only needs a clean presentation mode.

---

# 46. Overview Grid

Required:

```text
Presentation Overview
```

showing scene thumbnails/cards or summaries.

It MAY be simpler than the legacy overview.

Must remain responsive.

---

# 47. Presentation Progress

Required:

```text
current scene
total scenes
progress %
```

No real-time pitch coaching.

---

# 48. Basic Scene Metadata

Presentation runtime MAY show developer/inspection metadata in a debug or preview panel:

```text
Scene Type
Narrative Role
Source Section
Trust State
Template
Layout
```

This is useful for verification.

Do not show engineering metadata in normal presentation mode unless requested.

---

# 49. Accessibility

Required baseline:

- keyboard navigation;
- semantic headings;
- readable contrast;
- focus-visible controls;
- non-color trust indicators;
- reduced motion support;
- responsive text;
- usable mobile layout.

---

# 50. Responsive Requirements

At minimum:

```text
1920 × 1080
1440 × 900
1280 × 720
1024 × 768
390 × 844
```

Presentation may optimize primarily for landscape executive display.

Mobile still must remain navigable and readable.

---

# 51. Density Modes

Recommended:

```text
COMPACT
STANDARD
SPACIOUS
```

PresentationProfile MAY select density.

Avoid user-configurable complexity in this phase unless needed.

---

# 52. Typography Rules

Theme SHALL define semantic roles:

```text
display
headline
subheadline
body
caption
metric
label
```

Avoid arbitrary font sizes per scene.

---

# 53. Content Density Guardrails

Scene templates SHALL have limits.

Examples:

```text
Problem Frame
max 4 pain points
```

```text
Metric Wall
max 6 metrics
```

```text
Roadmap
max 8 milestones
```

```text
Risk Overview
max 6 material risks
```

Overflow MUST be handled by:

- prioritization;
- pagination/splitting only if compiler policy authorizes;
- compiler warning.

Do NOT silently truncate material content.

---

# 54. Scene Splitting

Phase 004 MAY support deterministic scene splitting.

Example:

```text
ROADMAP
8 items
```

may remain one scene.

If:

```text
ROADMAP
16 items
```

compiler MAY produce:

```text
Roadmap Part 1
Roadmap Part 2
```

Splitting policy MUST be deterministic.

---

# 55. Scene Merge

Scene merge is OPTIONAL.

Do not overcomplicate Phase 004.

If implemented, it must be deterministic and profile-driven.

---

# 56. Metrics

Metric binding SHALL support semantic format:

```text
NUMBER
CURRENCY
PERCENT
RATIO
DURATION
DATE
TEXT
```

Formatting belongs to UI/application adapters.

Raw business meaning remains traceable.

---

# 57. Financial Presentation Safety

Financial values SHALL preserve ClaimType when governed.

Example:

```text
Revenue 2027
ClaimType: ESTIMATE
```

must not render as an unlabeled historical FACT.

---

# 58. Market Presentation Safety

Market size values MUST preserve:

```text
FACT / ESTIMATE / ASSUMPTION
```

semantics from Claims Governance.

---

# 59. Technology Presentation Safety

Absolute claims such as:

```text
100% secure
impossible to hack
zero failures
```

must surface claim governance status.

The Presentation Engine SHALL NOT suppress unsupported/contradicted status for visual cleanliness.

---

# 60. MediaBinding

Conceptual:

```ts
interface MediaBinding {
  id: string;
  type: "IMAGE" | "VIDEO" | "ICON" | "DIAGRAM";
  sourceRef: string;
  alt?: string;
  caption?: string;
  role?: string;
}
```

---

# 61. Media Policy

Phase 004 may use existing repository media.

It SHALL NOT perform:

- web search;
- remote media scraping;
- AI image generation.

Missing media must have deterministic fallback.

---

# 62. Media Fallback

If a media binding fails:

- scene remains renderable where possible;
- fallback surface appears;
- warning is logged;
- critical media failure is included in verification.

No broken raw `<img>` icon in executive mode.

---

# 63. Diagrams

Phase 004 MAY implement deterministic diagrams for:

```text
ARCHITECTURE_MAP
ROADMAP
COMPARISON
```

using structured data.

Do not introduce a heavy diagram engine unless justified.

SVG/HTML/CSS is acceptable.

---

# 64. Architecture Map Binding

Recommended:

```text
ARCHITECTURE_NODES
ARCHITECTURE_EDGES
```

No need for free-form drawing editor.

---

# 65. Presentation Repository Port

Required:

```ts
export interface PresentationProfileRepository {
  list(): Promise<PresentationProfile[]>;
  findById(id: string): Promise<PresentationProfile | null>;
}
```

Required theme port:

```ts
export interface PresentationThemeRepository {
  list(): Promise<PresentationTheme[]>;
  findById(id: string): Promise<PresentationTheme | null>;
}
```

---

# 66. Presentation Definition Repository

Optional.

Because definitions are derived, they MAY remain in memory.

If persistence is implemented:

```text
JsonPresentationDefinitionRepository
```

must remain static/local.

Do NOT add server persistence.

---

# 67. JSON Adapters

Required:

```text
JsonPresentationProfileRepository
JsonPresentationThemeRepository
```

UI MUST NOT import profile/theme JSON directly.

---

# 68. Application Use Cases

Required:

```text
GeneratePresentationDefinition
GetPresentationProfile
ListPresentationProfiles
GetPresentationTheme
ListPresentationThemes
ValidatePresentationDefinition
PreviewPresentation
```

Recommended:

```text
InspectPresentationDefinition
```

---

# 69. GeneratePresentationDefinitionUseCase

Inputs:

```text
projectId
projectVersion
narrativePlanId / NarrativePlan
trustContext
presentationProfileId
themeId
```

Output:

```text
PresentationDefinition
```

---

# 70. Validation

Create:

```text
PresentationDefinitionValidator
```

Validation SHALL inspect:

- scene order;
- required bindings;
- template support;
- trust label rules;
- missing media;
- unsupported layouts;
- unresolved source refs;
- duplicate scene IDs;
- profile/theme version metadata.

---

# 71. Validation Issue Model

Recommended:

```ts
interface PresentationValidationIssue {
  code: string;
  severity: "INFO" | "WARNING" | "ERROR" | "BLOCKING";
  sceneId?: string;
  message: string;
}
```

---

# 72. Compiler Warning Codes

Recommended:

```text
SCENE_TEMPLATE_FALLBACK
MISSING_REQUIRED_BINDING
SCENE_CONTENT_OVERFLOW
MEDIA_UNAVAILABLE
TRUST_LABEL_REQUIRED
UNSUPPORTED_FACT_PRESENT
CONTRADICTED_CLAIM_PRESENT
LAYOUT_FALLBACK
UNRESOLVED_SOURCE_REFERENCE
```

---

# 73. Presentation Readiness

Required:

```text
PRESENTATION_READY
PRESENTATION_READY_WITH_WARNINGS
PRESENTATION_NOT_READY
```

This is separate from:

```text
NarrativeReadiness
TrustReadiness
```

---

# 74. Readiness Inputs

PresentationReadiness SHALL consider:

- NarrativeReadiness;
- TrustReadiness;
- compiler validation;
- required scene completeness;
- critical media failures;
- blocking template failures.

---

# 75. Readiness Example

```text
NarrativeReadiness = READY
TrustReadiness = TRUST_READY_WITH_WARNINGS
Presentation validation = no blockers
```

Result:

```text
PRESENTATION_READY_WITH_WARNINGS
```

---

# 76. Blocking Rule Example

If:

```text
NarrativeReadiness = NOT_READY
```

default:

```text
PRESENTATION_NOT_READY
```

unless profile explicitly allows preview-only compilation.

---

# 77. Preview vs Present

The system MAY compile a NOT_READY presentation for inspection.

But UI MUST clearly indicate:

```text
PREVIEW ONLY
```

It must not appear production-ready.

---

# 78. Arcana Pilot

Compile three Phase 002/003 pilot experiences:

```text
ARCANA_INVESTOR_10_EN
ARCANA_EXECUTIVE_5_ES
ARCANA_TECHNICAL_20_EN
```

into:

```text
PresentationDefinition
```

---

# 79. Arcana Investor Presentation

Required:

```text
Audience:
INVESTOR

Objective:
RAISE_CAPITAL

Duration:
10 minutes

Language:
EN

Presentation Profile:
INVESTOR_EXECUTIVE
```

Expected:

- strong executive hierarchy;
- clear problem/solution;
- market/business model;
- trust-aware metrics;
- roadmap;
- ask.

Do not force all possible scenes.

---

# 80. Arcana Executive Presentation

Required:

```text
Audience:
EXECUTIVE

Objective:
DECISION_SUPPORT

Duration:
5 minutes

Language:
ES

Presentation Profile:
EXECUTIVE_BRIEF
```

Expected:

- concise;
- high signal;
- decision-oriented;
- minimal scene count;
- explicit warnings if relevant.

---

# 81. Arcana Technical Presentation

Required:

```text
Audience:
TECHNICAL

Objective:
ARCHITECTURE_REVIEW

Duration:
20 minutes

Language:
EN

Presentation Profile:
TECHNICAL_DEEP_DIVE
```

Expected:

- system/problem context;
- architecture;
- technology;
- risk;
- evidence;
- roadmap.

---

# 82. Arcana No-Hardcode Rule

No logic such as:

```text
if project === "arcana"
```

inside:

- compiler;
- template selection;
- layout policy;
- trust labeling.

Arcana is only pilot data.

---

# 83. Legacy Compatibility

Phase 0 legacy decks remain preserved.

Phase 004 SHALL NOT delete them.

Project Workspace MAY expose:

```text
Open Legacy Presentation
Open V2 Presentation
```

during migration period.

---

# 84. Legacy Preservation

Required:

```text
45/45 PASS minimum
```

No legacy protected capability may regress.

---

# 85. Navigation Compatibility

Phase 004 V2 presentation mode SHOULD cover the key navigation expectations of legacy:

```text
ArrowRight
ArrowLeft
Home
End
PageDown
PageUp
Escape
```

Touch/swipe preservation is recommended and SHOULD be included if practical.

---

# 86. Mobile Navigation

Required:

- previous;
- next;
- clear scene position;
- swipe or explicit controls.

No hover-only interaction.

---

# 87. Basic Fullscreen

Required desktop browser behavior:

```text
Enter fullscreen
Navigate scenes
Exit with Escape
```

If browser Fullscreen API unavailable:

- presentation still works;
- fallback documented.

---

# 88. Visual Regression

Phase 004 SHALL introduce visual regression baselines for V2.

Minimum pilot screenshots:

```text
Investor Hero
Investor Market/Business scene
Investor Ask
Executive key scene
Technical Architecture scene
Trust warning scene
```

At:

```text
1440×900
```

Recommended mobile baseline:

```text
390×844
```

---

# 89. Visual Regression Policy

Visual baseline changes MUST be reviewed.

Do not auto-accept screenshots in CI without explicit update procedure.

---

# 90. Design System Separation

Presentation design tokens SHALL NOT replace general application UI tokens blindly.

Recommended:

```text
Application UI Tokens
Presentation Theme Tokens
```

with deliberate shared primitives where appropriate.

---

# 91. Executive Visual Principles

Default scene design SHALL prioritize:

1. hierarchy;
2. readability;
3. whitespace;
4. evidence clarity;
5. limited visual noise;
6. one dominant message per scene;
7. responsive behavior;
8. consistent typography;
9. semantic data formatting;
10. trust transparency.

---

# 92. No Decorative Overload

Do not convert every scene into:

- gradients;
- glassmorphism;
- charts;
- icons;
- animations.

Visual elements must serve narrative meaning.

---

# 93. Motion

Motion MAY include:

```text
scene transition
subtle reveal
focus transition
```

Motion MUST respect:

```text
prefers-reduced-motion
```

No complex animation choreography required.

---

# 94. Charts

Phase 004 MAY include limited deterministic charts if Project Twin contains suitable structured data.

Required minimum chart-like visualizations are NOT mandatory.

Do not invent series/data just to demonstrate charts.

---

# 95. Table Safety

Large tables SHOULD be summarized for presentation.

Full detailed tables belong to project workspace or later Data Room.

---

# 96. Content Truncation

No material content may be silently truncated.

If scene cannot display all required content:

```text
SCENE_CONTENT_OVERFLOW
```

must be emitted.

Compiler may select a denser layout or split scene deterministically.

---

# 97. Presentation Inspection Mode

Recommended developer/owner view:

```text
Scene
Source
Bindings
Claims
Trust
Validation
```

Useful for SDD verification.

---

# 98. Presentation Definition Serialization

PresentationDefinition SHALL be serializable to JSON.

This does NOT authorize PowerPoint/PDF export.

---

# 99. Serialization Test

Required:

```text
compile
→ serialize
→ deserialize
→ equivalent PresentationDefinition
```

---

# 100. Workstreams

## WS-004-01 — Presentation Domain

Implement PresentationDefinition and scene primitives.

## WS-004-02 — Scene Library

Implement scene types, templates, layouts.

## WS-004-03 — Presentation Profiles

Implement audience-oriented visual policies.

## WS-004-04 — Presentation Compiler

Compile narrative/trust into scenes.

## WS-004-05 — Theme System

Implement versioned executive themes.

## WS-004-06 — Renderer

Implement reusable data-driven scene rendering.

## WS-004-07 — Presentation Runtime

Navigation, overview, fullscreen, progress.

## WS-004-08 — Arcana Pilot

Compile and render three pilot presentations.

## WS-004-09 — Trust-Aware Rendering

Preserve claim/evidence semantics.

## WS-004-10 — Testing & Visual Regression

Unit, architecture, E2E, visual, regression.

## WS-004-11 — Documentation & Evidence

ADRs, architecture docs, traceability, report.

---

# 101. Task Breakdown — Domain

### T-004-001
Create PresentationDefinition.

### T-004-002
Create PresentationScene.

### T-004-003
Create SceneType.

### T-004-004
Create SceneRole.

### T-004-005
Create SceneStatus.

### T-004-006
Create LayoutVariant.

### T-004-007
Create ContentBinding.

### T-004-008
Create ContentBindingType.

### T-004-009
Create TrustBinding.

### T-004-010
Create MediaBinding.

### T-004-011
Create PresentationTrustSummary.

### T-004-012
Create PresentationReadiness.

### T-004-013
Implement invariants.

---

# 102. Task Breakdown — Templates

### T-004-101
Create SceneTemplate.

### T-004-102
Create SceneTemplateRegistry.

### T-004-103
Define EXECUTIVE_HERO template.

### T-004-104
Define PROBLEM_FRAME template.

### T-004-105
Define WHY_NOW template.

### T-004-106
Define SOLUTION_OVERVIEW template.

### T-004-107
Define PRODUCT_OVERVIEW template.

### T-004-108
Define MARKET_OVERVIEW template.

### T-004-109
Define BUSINESS_MODEL template.

### T-004-110
Define COMPETITIVE_LANDSCAPE template.

### T-004-111
Define TRACTION template.

### T-004-112
Define FINANCIAL_OVERVIEW template.

### T-004-113
Define TECHNOLOGY_OVERVIEW template.

### T-004-114
Define ARCHITECTURE_MAP template.

### T-004-115
Define RISK_OVERVIEW template.

### T-004-116
Define ROADMAP template.

### T-004-117
Define TEAM template.

### T-004-118
Define EVIDENCE_OVERVIEW template.

### T-004-119
Define DECISION_FRAME template.

### T-004-120
Define ASK template.

### T-004-121
Define CLOSING template.

### T-004-122
Define GENERIC_CONTENT fallback.

---

# 103. Task Breakdown — Profiles

### T-004-201
Create PresentationProfile schema.

### T-004-202
Create INVESTOR_EXECUTIVE profile.

### T-004-203
Create EXECUTIVE_BRIEF profile.

### T-004-204
Create TECHNICAL_DEEP_DIVE profile.

### T-004-205
Add profile versioning.

### T-004-206
Create profile validation.

### T-004-207
Create profile repository port.

### T-004-208
Create JSON profile adapter.

---

# 104. Task Breakdown — Compiler

### T-004-301
Create PresentationCompiler.

### T-004-302
Create narrative-role to scene policy.

### T-004-303
Create section-to-scene policy.

### T-004-304
Create scene selection policy.

### T-004-305
Create layout resolution policy.

### T-004-306
Create binding mapper.

### T-004-307
Create trust binding mapper.

### T-004-308
Create media binding mapper.

### T-004-309
Implement fallback template behavior.

### T-004-310
Implement content overflow detection.

### T-004-311
Implement optional deterministic scene splitting.

### T-004-312
Implement presentation readiness.

### T-004-313
Add compiler version.

### T-004-314
Implement deterministic compilation tests.

---

# 105. Task Breakdown — Themes

### T-004-401
Create PresentationTheme schema.

### T-004-402
Create theme repository port.

### T-004-403
Create JSON theme adapter.

### T-004-404
Create EXECUTIVE_LIGHT theme.

### T-004-405
Create EXECUTIVE_DARK theme.

### T-004-406
Create semantic color tokens.

### T-004-407
Create typography tokens.

### T-004-408
Create spacing tokens.

### T-004-409
Create motion tokens.

### T-004-410
Create reduced-motion behavior.

---

# 106. Task Breakdown — Application

### T-004-501
Create GeneratePresentationDefinitionUseCase.

### T-004-502
Create ValidatePresentationDefinitionUseCase.

### T-004-503
Create ListPresentationProfilesUseCase.

### T-004-504
Create GetPresentationProfileUseCase.

### T-004-505
Create ListPresentationThemesUseCase.

### T-004-506
Create GetPresentationThemeUseCase.

### T-004-507
Create PreviewPresentationUseCase.

### T-004-508
Create InspectPresentationDefinitionUseCase.

---

# 107. Task Breakdown — Renderer

### T-004-601
Create PresentationRenderer.

### T-004-602
Create SceneRendererRegistry.

### T-004-603
Create ExecutiveHeroScene.

### T-004-604
Create ProblemFrameScene.

### T-004-605
Create WhyNowScene.

### T-004-606
Create SolutionOverviewScene.

### T-004-607
Create ProductOverviewScene.

### T-004-608
Create MarketOverviewScene.

### T-004-609
Create BusinessModelScene.

### T-004-610
Create CompetitiveLandscapeScene.

### T-004-611
Create TractionScene.

### T-004-612
Create FinancialOverviewScene.

### T-004-613
Create TechnologyOverviewScene.

### T-004-614
Create ArchitectureMapScene.

### T-004-615
Create RiskOverviewScene.

### T-004-616
Create RoadmapScene.

### T-004-617
Create TeamScene.

### T-004-618
Create EvidenceOverviewScene.

### T-004-619
Create DecisionFrameScene.

### T-004-620
Create AskScene.

### T-004-621
Create ClosingScene.

### T-004-622
Create GenericContentScene.

---

# 108. Task Breakdown — Runtime

### T-004-701
Create V2 Presentation route.

### T-004-702
Create scene navigation state.

### T-004-703
Implement previous/next.

### T-004-704
Implement ArrowLeft/ArrowRight.

### T-004-705
Implement Home/End.

### T-004-706
Implement PageUp/PageDown.

### T-004-707
Implement Escape behavior.

### T-004-708
Implement fullscreen.

### T-004-709
Implement progress indicator.

### T-004-710
Implement overview grid.

### T-004-711
Implement mobile navigation.

### T-004-712
Implement swipe if compatible.

### T-004-713
Implement presentation debug/inspection mode.

---

# 109. Task Breakdown — Trust Rendering

### T-004-801
Render ClaimType labels.

### T-004-802
Render unsupported FACT indicator.

### T-004-803
Render contradicted claim indicator.

### T-004-804
Render evidence summary.

### T-004-805
Render TrustReadiness summary.

### T-004-806
Verify TARGET remains TARGET.

### T-004-807
Verify ASSUMPTION remains ASSUMPTION.

### T-004-808
Verify ESTIMATE remains ESTIMATE.

### T-004-809
Verify HYPOTHESIS remains HYPOTHESIS.

---

# 110. Task Breakdown — Arcana Pilot

### T-004-901
Compile Arcana Investor PresentationDefinition.

### T-004-902
Render Arcana Investor presentation.

### T-004-903
Compile Arcana Executive PresentationDefinition.

### T-004-904
Render Arcana Executive presentation.

### T-004-905
Compile Arcana Technical PresentationDefinition.

### T-004-906
Render Arcana Technical presentation.

### T-004-907
Validate trust annotations.

### T-004-908
Validate scene source traceability.

### T-004-909
Validate presentation readiness.

### T-004-910
Create Arcana presentation pilot report.

---

# 111. Task Breakdown — Tests

### T-004-1001
Test PresentationDefinition invariants.

### T-004-1002
Test PresentationScene invariants.

### T-004-1003
Test SceneTemplateRegistry.

### T-004-1004
Test profile validation.

### T-004-1005
Test theme validation.

### T-004-1006
Test scene selection policy.

### T-004-1007
Test layout resolution.

### T-004-1008
Test binding mapper.

### T-004-1009
Test trust binding mapper.

### T-004-1010
Test fallback template warning.

### T-004-1011
Test missing binding behavior.

### T-004-1012
Test overflow handling.

### T-004-1013
Test deterministic compilation.

### T-004-1014
Test Project Twin immutability.

### T-004-1015
Test NarrativePlan immutability.

### T-004-1016
Test claim type preservation.

### T-004-1017
Test serialization roundtrip.

### T-004-1018
Test investor pilot.

### T-004-1019
Test executive pilot.

### T-004-1020
Test technical pilot.

### T-004-1021
Test presentation runtime E2E.

### T-004-1022
Test keyboard navigation E2E.

### T-004-1023
Test fullscreen E2E.

### T-004-1024
Test overview E2E.

### T-004-1025
Test mobile E2E.

### T-004-1026
Test trust warning E2E.

### T-004-1027
Create visual regression baselines.

### T-004-1028
Run architecture tests.

### T-004-1029
Run Phase 003 regression.

### T-004-1030
Run Phase 002 regression.

### T-004-1031
Run Phase 001 regression.

### T-004-1032
Run Phase 000A regression.

### T-004-1033
Run Phase 0 legacy preservation.

---

# 112. Task Breakdown — Documentation

### T-004-1101
Create Presentation Domain Model.

### T-004-1102
Create Scene Type Reference.

### T-004-1103
Create Scene Template Reference.

### T-004-1104
Create Presentation Profile Reference.

### T-004-1105
Create Theme System Reference.

### T-004-1106
Create Presentation Compiler Rules.

### T-004-1107
Create Trust-Aware Presentation Rules.

### T-004-1108
Create Responsive Presentation Guidelines.

### T-004-1109
Create Arcana Presentation Pilot Report.

### T-004-1110
Create SPEC-004 Traceability Matrix.

### T-004-1111
Create Phase 004 Verification Report.

---

# 113. Acceptance Criteria

## AC-004-001 — Derived Presentation

PresentationDefinition SHALL be generated from structured project/narrative/trust inputs.

No hand-authored slide list shall be the canonical source.

---

## AC-004-002 — Determinism

Same inputs and versions SHALL produce equivalent PresentationDefinition.

---

## AC-004-003 — Scene Traceability

Every scene SHALL reference its source NarrativeStep.

Material bindings SHALL remain traceable.

---

## AC-004-004 — No Semantic Reclassification

Claims SHALL preserve FACT/ESTIMATE/ASSUMPTION/TARGET/HYPOTHESIS semantics.

---

## AC-004-005 — Trust Visibility

Unsupported or contradicted material claims SHALL remain visible as trust warnings.

---

## AC-004-006 — Reusable Scene System

At least the required core scene library SHALL be reusable across projects.

No Arcana-only component logic.

---

## AC-004-007 — Profile Variation

Investor, Executive, and Technical profiles SHALL produce materially different presentation structures from the same Project Twin.

---

## AC-004-008 — Theme Variation

EXECUTIVE_LIGHT and EXECUTIVE_DARK SHALL render the same PresentationDefinition without business logic changes.

---

## AC-004-009 — Responsive Rendering

Required desktop and mobile viewports SHALL remain usable.

---

## AC-004-010 — Keyboard Navigation

Arrow/Home/End/Page navigation SHALL work in V2 presentation mode.

---

## AC-004-011 — Fullscreen

Presentation SHALL enter and exit fullscreen where supported.

---

## AC-004-012 — Overview

Presentation Overview SHALL expose all scenes and allow navigation.

---

## AC-004-013 — No Silent Overflow

Material content overflow SHALL generate deterministic handling/warning.

---

## AC-004-014 — Serialization

PresentationDefinition SHALL serialize/deserialize without semantic loss.

---

## AC-004-015 — Arcana Investor

Investor pilot SHALL compile and render.

---

## AC-004-016 — Arcana Executive

Executive pilot SHALL compile and render.

---

## AC-004-017 — Arcana Technical

Technical pilot SHALL compile and render.

---

## AC-004-018 — Static Build

Application SHALL remain static-hostable.

---

## AC-004-019 — Architecture

Presentation domain SHALL preserve hexagonal rules.

---

## AC-004-020 — Regression

All prior phase gates SHALL remain passing.

---

## AC-004-021 — Forbidden Scope

No AI, backend, database, Firebase runtime, PPTX export, or PDF export may be introduced.

---

# 114. Required Arcana Presentation Pilot Report

Create:

```text
docs/evidence/ARCANA_PRESENTATION_ENGINE_PILOT_REPORT.md
```

Required sections:

## Investor

```text
Narrative
Presentation Profile
Theme
Scene Count
Scene Types
PresentationReadiness
TrustReadiness
Warnings
Fallback scenes
```

## Executive

Same fields.

## Technical

Same fields.

## Traceability

For each scene:

| Scene | Type | Narrative Step | Project Section | Claim Refs | Trust State |
|---|---|---|---|---|---|

## Limitations

List:

- missing content;
- media fallback;
- generic scene fallback;
- unsupported bindings;
- trust warnings.

---

# 115. Required UI E2E Flows

Playwright SHALL validate:

```text
Open Project Workspace
Generate/open V2 presentation
Render first scene
Next
Previous
Home
End
PageDown
PageUp
Overview
Jump to scene
Fullscreen
Exit fullscreen
Mobile navigation
Trust label rendering
Unsupported FACT warning
Theme light
Theme dark
```

---

# 116. Required Viewports

Minimum:

```text
1440 × 900
1280 × 720
390 × 844
```

Recommended:

```text
1920 × 1080
1024 × 768
```

---

# 117. Browser Runtime Gate

Required:

```text
Critical console errors: 0
Unhandled exceptions: 0
Critical asset 404s: 0
```

---

# 118. Visual Regression Gate

Required baseline screenshots SHALL be captured and tracked.

Visual changes must have documented update procedure.

---

# 119. Regression Gate

Required:

```text
Phase 004 tests             PASS
Phase 003 regression        PASS
Phase 002 regression        PASS
Phase 001 regression        PASS
Phase 000A regression       PASS
Phase 0 legacy              45/45 PASS minimum
```

---

# 120. Architecture Gate

Required:

```text
0 dependency violations
```

Presentation domain MUST NOT import:

```text
UI
browser adapters
Firebase
legacy runtime
AI
```

---

# 121. Forbidden Scope Audit

Final report MUST state:

```text
OpenAI: NOT IMPLEMENTED
Claude: NOT IMPLEMENTED
Gemini: NOT IMPLEMENTED
Ollama: NOT IMPLEMENTED
AI SDK: NOT IMPLEMENTED
AI Slide Generation: NOT IMPLEMENTED
AI Copy Generation: NOT IMPLEMENTED
AI Image Generation: NOT IMPLEMENTED

Firestore: NOT IMPLEMENTED
Firebase Auth: NOT IMPLEMENTED
Firebase Storage: NOT IMPLEMENTED
Cloud Functions: NOT IMPLEMENTED

Backend: NOT IMPLEMENTED
Database: NOT IMPLEMENTED

PPTX Export: NOT IMPLEMENTED
PDF Export: NOT IMPLEMENTED
Collaboration: NOT IMPLEMENTED
Presenter Coaching: NOT IMPLEMENTED

Static Web Architecture: PRESERVED
```

---

# 122. Definition of Done

Phase 004 may become `CODE_COMPLETE` only when:

- PresentationDefinition exists;
- PresentationScene exists;
- scene library exists;
- templates exist;
- profiles exist;
- themes exist;
- compiler exists;
- trust bindings work;
- renderer exists;
- V2 presentation route works;
- keyboard navigation works;
- fullscreen works;
- overview works;
- Arcana pilots compile/render;
- tests exist;
- visual baselines exist;
- architecture passes;
- static build passes;
- forbidden scope remains absent.

Phase 004 becomes `VERIFIED` only if:

```text
TYPECHECK                         PASS
ARCHITECTURE                      PASS
PRESENTATION DOMAIN TESTS         PASS
TEMPLATE TESTS                    PASS
PROFILE TESTS                     PASS
THEME TESTS                       PASS
COMPILER DETERMINISM              PASS
PROJECT TWIN IMMUTABILITY         PASS
NARRATIVE PLAN IMMUTABILITY       PASS
CLAIM TYPE PRESERVATION           PASS
SERIALIZATION                     PASS
ARCANA INVESTOR                   PASS
ARCANA EXECUTIVE                  PASS
ARCANA TECHNICAL                  PASS
PRESENTATION E2E                  PASS
KEYBOARD E2E                      PASS
FULLSCREEN E2E                    PASS
OVERVIEW E2E                      PASS
MOBILE E2E                        PASS
TRUST WARNING E2E                 PASS
VISUAL REGRESSION                 PASS
PHASE 003 REGRESSION              PASS
PHASE 002 REGRESSION              PASS
PHASE 001 REGRESSION              PASS
PHASE 000A REGRESSION             PASS
PHASE 0 LEGACY                    PASS
STATIC BUILD                      PASS
CONSOLE                           PASS
FORBIDDEN SCOPE                   PASS
```

Only human approval may set:

```text
CLOSED
```

---

# 123. Required Documentation

Create:

```text
docs/architecture/PRESENTATION_DOMAIN_MODEL.md
docs/architecture/SCENE_TYPE_REFERENCE.md
docs/architecture/SCENE_TEMPLATE_REFERENCE.md
docs/architecture/PRESENTATION_PROFILE_REFERENCE.md
docs/architecture/PRESENTATION_THEME_SYSTEM.md
docs/architecture/PRESENTATION_COMPILER_RULES.md
docs/architecture/TRUST_AWARE_PRESENTATION_RULES.md
docs/architecture/RESPONSIVE_PRESENTATION_GUIDELINES.md

docs/evidence/ARCANA_PRESENTATION_ENGINE_PILOT_REPORT.md
docs/evidence/SPEC_004_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_004_VERIFICATION_REPORT.md
```

---

# 124. Recommended ADRs

Create:

```text
ADR-0028 PresentationDefinition as Derived Projection
ADR-0029 Scene-Based Presentation Domain
ADR-0030 Deterministic Presentation Compilation
ADR-0031 Versioned Presentation Profiles
ADR-0032 Versioned Presentation Themes
ADR-0033 Typed Content Bindings
ADR-0034 Trust-Aware Rendering
ADR-0035 Scene Renderer Registry
ADR-0036 V2 Presentation Coexistence with Legacy
```

---

# 125. Required Verification Report

Generate:

```text
docs/evidence/PHASE_004_VERIFICATION_REPORT.md
```

Required sections:

## Identification

- phase;
- SPEC;
- branch;
- starting commit;
- ending commit;
- date;
- presentation compiler version;
- profile versions;
- theme versions.

## Task Matrix

Every `T-004-*`.

Statuses:

```text
DONE
PARTIAL
BLOCKED
NOT_STARTED
```

## Presentation Domain

Report:

- SceneTypes;
- layouts;
- bindings;
- readiness states;
- compiler version.

## Profiles

Report:

```text
INVESTOR_EXECUTIVE
EXECUTIVE_BRIEF
TECHNICAL_DEEP_DIVE
```

with versions.

## Themes

Report:

```text
EXECUTIVE_LIGHT
EXECUTIVE_DARK
```

with versions.

## Arcana Pilot

For each:

```text
Investor
Executive
Technical
```

report:

```text
Scene count
Scene types
Warnings
Fallback scenes
PresentationReadiness
TrustReadiness
```

## E2E Matrix

| Flow | Result |
|---|---|
| Presentation Load | |
| Next / Previous | |
| Home / End | |
| Page Up / Down | |
| Overview | |
| Fullscreen | |
| Mobile | |
| Trust labels | |
| Unsupported FACT warning | |
| Light Theme | |
| Dark Theme | |

## Visual Regression

Report:

- baseline count;
- viewport;
- pass/fail;
- changed baselines.

## Regression

Report all previous phases.

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

# 126. SDD State Machine

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

# 127. Change Control

If additional scope is required:

1. stop the affected task;
2. create:

```text
docs/specs/changes/CHANGE_REQUEST_004_XXX.md
```

3. document:
   - problem;
   - proposed change;
   - impact;
   - alternatives;
   - risk;
4. wait for owner approval.

---

# 128. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-004 — Executive Presentation Engine`

under:

`SPEC-004 — Executive Presentation Engine`

Previous phase:

`VHOS-PHASE-003 — Claims & Evidence Governance`

is approved CLOSED.

---

## PRIMARY OBJECTIVE

Implement a deterministic Executive Presentation Engine that compiles:

```text
Project Twin
NarrativePlan
NarrativeTrustContext
PresentationProfile
PresentationTheme
```

into:

```text
PresentationDefinition
```

and renders it as a reusable executive web presentation.

---

## BEFORE WRITING CODE

You MUST:

1. read Phase 0 baseline;
2. read Phase 000A architecture;
3. read Phase 001 Project Twin;
4. read Phase 002 Narrative Engine;
5. read Phase 003 Claims & Evidence;
6. run complete existing verification suite;
7. confirm all baseline gates pass;
8. inspect Arcana pilot assets/data;
9. map implementation to `T-004-*`;
10. document implementation plan.

Do NOT start with visual polishing.

Start with Presentation Domain and compiler.

---

## IMPLEMENTATION ORDER

Required:

```text
Presentation Domain
        ↓
Scene Types / Templates
        ↓
Presentation Profiles
        ↓
Theme Contracts
        ↓
Presentation Compiler
        ↓
Trust Binding
        ↓
Application Use Cases
        ↓
Renderer
        ↓
Presentation Runtime
        ↓
Arcana Pilots
        ↓
E2E / Visual Regression
```

---

## CORE RULE

Presentations are derived projections.

Do NOT make hand-authored slide HTML the canonical source.

Do NOT embed project truth directly into scene components.

---

## DOMAIN RULE

Presentation domain MUST NOT depend on:

- DOM;
- CSS implementation;
- UI;
- browser globals;
- Firebase;
- legacy runtime;
- AI providers;
- concrete JSON paths.

---

## CONTENT TRACEABILITY RULE

Every material scene binding must be traceable to:

- Project Twin;
- NarrativePlan;
- Claim;
- Evidence;
- approved deterministic derived data.

Do NOT invent presentation-only business facts.

---

## TRUST RULE

Preserve:

```text
FACT
ESTIMATE
ASSUMPTION
TARGET
HYPOTHESIS
```

semantics.

Do NOT hide material unsupported or contradicted claim warnings.

Visual elegance MUST NOT override governance integrity.

---

## DETERMINISM RULE

Same:

```text
Project Twin
NarrativePlan
Trust Context
Presentation Profile Version
Theme Version
Compiler Version
```

must produce equivalent PresentationDefinition.

---

## ARCANA RULE

Generate:

```text
ARCANA Investor
ARCANA Executive
ARCANA Technical
```

using reusable compiler rules.

No Arcana-specific compiler logic.

---

## VISUAL RULE

Build executive, restrained, high-information layouts.

Prioritize:

- hierarchy;
- readability;
- whitespace;
- trust transparency;
- audience relevance;
- responsive behavior.

Avoid decorative overload.

---

## AUTHORIZED TECHNOLOGY

Use current approved stack and narrowly necessary static/frontend test tools.

No infrastructure expansion.

---

## FORBIDDEN

Do NOT implement:

- OpenAI;
- Claude;
- Gemini;
- Ollama;
- AI SDKs;
- AI slide generation;
- AI copy generation;
- AI image generation;
- Firestore;
- Auth;
- Storage;
- Cloud Functions;
- backend;
- database;
- PPTX export;
- PDF export;
- collaboration;
- presenter coaching.

---

## REQUIRED TESTING

Before CODE_COMPLETE run:

1. typecheck;
2. architecture tests;
3. presentation domain tests;
4. template tests;
5. profile tests;
6. theme tests;
7. compiler determinism;
8. Project Twin immutability;
9. NarrativePlan immutability;
10. claim type-preservation tests;
11. serialization;
12. Arcana Investor test;
13. Arcana Executive test;
14. Arcana Technical test;
15. Presentation E2E;
16. keyboard E2E;
17. fullscreen E2E;
18. overview E2E;
19. mobile E2E;
20. trust warning E2E;
21. visual regression;
22. Phase 003 regression;
23. Phase 002 regression;
24. Phase 001 regression;
25. Phase 000A regression;
26. Phase 0 legacy preservation;
27. static build;
28. console validation;
29. forbidden-scope audit.

All mandatory gates must pass.

---

## REQUIRED OUTPUT

Generate:

```text
docs/evidence/PHASE_004_VERIFICATION_REPORT.md
```

Final recommendation may be:

```text
READY_FOR_APPROVAL
```

only when all mandatory gates pass.

Otherwise:

```text
NOT_READY
```

or:

```text
BLOCKED
```

Do NOT start Phase 005.

Do NOT mark Phase 004 CLOSED.

---

# 129. Expected End State

```text
                         PROJECT TWIN
                              │
                              ▼
                        NARRATIVE PLAN
                              │
                              ▼
                         TRUST CONTEXT
                              │
                              ▼
                  EXECUTIVE PRESENTATION ENGINE
                              │
                     ┌────────┴────────┐
                     ▼                 ▼
             PRESENTATION PROFILE    THEME
                     │                 │
                     └────────┬────────┘
                              ▼
                  PRESENTATION DEFINITION
                              │
                              ▼
                    EXECUTIVE RENDERER
                              │
               ┌──────────────┼──────────────┐
               ▼              ▼              ▼
            Investor       Executive       Technical
```

The platform remains:

```text
WEB-FIRST
STATIC
DETERMINISTIC
TRUST-AWARE
NO AI
NO BACKEND
NO DATABASE
NO FIREBASE RUNTIME
```

---

# 130. Exit Decision

If all criteria pass:

> **Apruebo formalmente VHOS-PHASE-004 — Executive Presentation Engine bajo SPEC-004 como VERIFIED/CLOSED y autorizo el inicio de VHOS-PHASE-005 — Executive Presenter Cockpit, manteniendo la arquitectura Feature-Oriented Hexagonal, el enfoque web-first, la persistencia estática, los motores determinísticos de Narrative y Presentation, y la gobernanza explícita de Claims & Evidence sin IA generativa.**
