# Venture Hub OS — Phase 005: Executive Presenter Cockpit

**Document ID:** `VHOS-PHASE-005`  
**Specification:** `SPEC-005 — Executive Presenter Cockpit`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-004 — Executive Presentation Engine`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Deployment Model:** Web-first / Static Hosting  
**Persistence Model:** In-memory session + optional browser-local preferences  
**AI Runtime:** NOT AUTHORIZED  
**Backend Services:** NOT AUTHORIZED  
**Firebase Runtime Services:** NOT AUTHORIZED  
**PPTX/PDF Export:** NOT AUTHORIZED  
**Next Phase:** `VHOS-PHASE-006 — AI Copilot` (NOT AUTHORIZED / NOT STARTED)

---

# 1. Executive Purpose

Phase 005 introduces the execution layer for live executive presentations:

> **Executive Presenter Cockpit**

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
      ↓
EXECUTIVE PRESENTATION ENGINE
      ↓
PRESENTATION DEFINITION
```

Phase 005 adds:

```text
PRESENTATION DEFINITION
      ↓
PRESENTER SESSION
      ↓
EXECUTIVE PRESENTER COCKPIT
```

The Presenter Cockpit SHALL help a human presenter execute a presentation with better control, timing, context, trust awareness, and navigation.

It SHALL NOT alter the project truth.

---

# 2. Core Product Principle

The Presenter Cockpit is an execution surface.

It is NOT:

- a Project Twin editor;
- a Narrative Engine;
- a Claims & Evidence editor;
- a Presentation Compiler;
- an AI coach;
- a remote audience telemetry system;
- a collaboration platform.

Its responsibility is:

> **to help a presenter deliver an already-compiled executive presentation safely and effectively.**

---

# 3. Canonical Execution Chain

The required architecture is:

```text
PROJECT TWIN
     ↓
NARRATIVE PLAN
     ↓
TRUST CONTEXT
     ↓
PRESENTATION DEFINITION
     ↓
PRESENTER SESSION
     ↓
PRESENTER COCKPIT
```

The Presenter Session is ephemeral operational state.

---

# 4. Primary Outcome

At the end of Phase 005, Venture Hub OS SHALL support a dedicated presenter experience containing:

```text
Current Scene
Next Scene
Pitch Timer
Scene Timer
Narrative Timing
Speaker Notes
Trust Alerts
Presentation Overview
Scene Navigation
Q&A Preparation
Session Controls
Fullscreen Presentation
Presenter View
Audience View
```

All without modifying the canonical presentation data.

---

# 5. Architectural Mandate

Create:

```text
src/modules/presenter/
```

Recommended structure:

```text
src/modules/presenter/
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
│   ├── commands/
│   ├── queries/
│   └── use-cases/
│
├── adapters/
│   └── browser/
│
└── tests/
```

UI remains under:

```text
src/ui/presenter/
```

---

# 6. Dependency Direction

Preserve:

```text
UI
 ↓
Application
 ↓
Domain
```

Presenter domain MAY depend on stable presentation contracts.

Presenter domain MUST NOT depend on:

- DOM;
- CSS;
- browser globals;
- Firebase;
- legacy runtime;
- AI providers;
- concrete storage implementation;
- direct repository JSON paths.

---

# 7. Integration Boundary

Presenter SHALL consume:

```text
PresentationDefinition
PresentationReadiness
PresentationTrustSummary
Scene metadata
```

through explicit DTOs or stable module contracts.

Do NOT allow Presenter domain to reach into:

```text
ProjectRepository
ClaimRepository
NarrativeCompiler
PresentationCompiler internals
```

during session execution.

Everything needed to present should already be available through PresentationDefinition and approved read-only presentation context.

---

# 8. Immutability Mandate

Presenter Cockpit MUST NOT mutate:

```text
Project Twin
NarrativePlan
NarrativeTrustContext
PresentationDefinition
Claim
Evidence
```

Presenter session state is separate.

Required test:

```text
canonical objects before presenter session
==
canonical objects after presenter session
```

---

# 9. Scope

## 9.1 In Scope

Phase 005 SHALL implement:

- PresenterSession;
- PresenterSessionId;
- PresenterSessionStatus;
- PresenterMode;
- ScenePlaybackState;
- PresentationTimer;
- SceneTimer;
- TimingState;
- TimingDeviation;
- CurrentScene;
- NextScene;
- PreviousScene;
- scene navigation;
- speaker notes;
- presenter notes model;
- notes visibility;
- trust alerts;
- current-scene trust summary;
- presentation-level trust summary;
- overview navigator;
- presenter command bar;
- presenter keyboard shortcuts;
- fullscreen coordination;
- audience view;
- presenter view;
- session start/pause/resume/end;
- optional local presenter preferences;
- Q&A preparation cards/checklist;
- session event log in memory;
- Arcana Presenter Cockpit pilot;
- unit tests;
- E2E tests;
- visual regression;
- architecture tests;
- documentation;
- verification report.

## 9.2 Explicitly Out of Scope

Do NOT implement:

- AI speaker coaching;
- AI Q&A generation;
- AI notes generation;
- speech recognition;
- microphone analysis;
- voice transcription;
- sentiment analysis;
- eye tracking;
- audience analytics;
- remote audience polling;
- remote control from mobile;
- collaboration;
- Firestore;
- Firebase Auth;
- Firebase Storage;
- Cloud Functions;
- backend API;
- database;
- persistent cloud session history;
- PPTX export;
- PDF export;
- calendar integration;
- meeting integrations;
- recording;
- video conferencing.

---

# 10. PresenterSession

A PresenterSession represents one live execution of a PresentationDefinition.

Conceptual contract:

```ts
interface PresenterSession {
  id: string;
  presentationId: string;

  status: PresenterSessionStatus;
  mode: PresenterMode;

  currentSceneIndex: number;

  startedAt?: string;
  pausedAt?: string;
  endedAt?: string;

  totalElapsedSeconds: number;
  sceneElapsedSeconds: number;

  timing: PresenterTimingState;

  notesState: PresenterNotesState;
  trustState: PresenterTrustState;

  events: PresenterSessionEvent[];
}
```

Times may be sourced through an injected clock.

---

# 11. PresenterSessionStatus

Required:

```text
IDLE
RUNNING
PAUSED
ENDED
```

Allowed transitions:

```text
IDLE
 ↓ start
RUNNING
 ↓ pause
PAUSED
 ↓ resume
RUNNING
 ↓ end
ENDED
```

Also:

```text
RUNNING
 ↓ end
ENDED
```

Invalid transitions MUST fail explicitly.

---

# 12. PresenterMode

Required:

```text
PRESENTER_VIEW
AUDIENCE_VIEW
```

Recommended optional:

```text
REHEARSAL
```

If `REHEARSAL` is implemented, it must not add AI behavior.

---

# 13. Presenter View

Presenter View SHALL expose operational context not intended for the audience.

Minimum:

```text
Current Scene
Next Scene
Elapsed Time
Target Time
Scene Time
Timing Status
Speaker Notes
Trust Alerts
Overview
Controls
```

---

# 14. Audience View

Audience View SHALL show only the rendered presentation experience.

It MUST NOT expose:

- private presenter notes;
- developer metadata;
- internal trust explanation detail not meant for presentation;
- session event log;
- debug controls.

Trust labels required by governance SHALL remain visible.

---

# 15. Presenter/Audience Separation

The separation must be explicit.

Recommended:

```text
/present/:presentationId
```

for audience-facing presentation mode,

and:

```text
/presenter/:presentationId
```

for Presenter Cockpit.

Equivalent static-compatible routes are acceptable.

---

# 16. Session Isolation

Presenter operational state SHALL be independent from PresentationDefinition.

Example:

```text
PresentationDefinition
= immutable

PresenterSession
= mutable ephemeral runtime state
```

---

# 17. Presentation Timer

Required domain service/value object:

```text
PresentationTimer
```

It SHALL track:

```text
target duration
elapsed duration
remaining duration
overtime duration
```

---

# 18. Scene Timer

Required:

```text
SceneTimer
```

It SHALL track:

```text
scene target seconds
scene elapsed seconds
scene deviation
```

---

# 19. Timing State

Required:

```text
ON_TRACK
AHEAD
BEHIND
OVERTIME
```

Exact thresholds SHALL be explicit.

---

# 20. Timing Policy

Recommended default:

```text
Within ±10% of expected cumulative time
→ ON_TRACK
```

```text
More than 10% faster than expected
→ AHEAD
```

```text
More than 10% slower than expected
→ BEHIND
```

```text
Past total target duration
→ OVERTIME
```

Thresholds must be configurable through policy, not magic numbers.

---

# 21. Cumulative Timing

Timing evaluation SHOULD compare:

```text
actual elapsed time
```

against:

```text
expected cumulative time by current scene
```

This is better than judging only individual scene timers.

---

# 22. Timing Deviation

Recommended:

```ts
interface TimingDeviation {
  expectedSeconds: number;
  actualSeconds: number;
  deltaSeconds: number;
  deltaPercent: number;
  state: TimingState;
}
```

---

# 23. No Automatic Content Mutation

If presenter is behind schedule, Cockpit SHALL NOT automatically:

- remove scenes;
- reorder scenes;
- change NarrativePlan;
- change PresentationDefinition.

It may display:

```text
BEHIND
```

and optionally suggest low-priority upcoming scenes for manual skip if that information already exists.

No automatic mutation.

---

# 24. Scene Navigation

Required commands:

```text
NEXT_SCENE
PREVIOUS_SCENE
GO_TO_SCENE
FIRST_SCENE
LAST_SCENE
```

Presenter and audience views SHALL remain synchronized in the same browser session state.

No remote synchronization required.

---

# 25. Scene Skip

Presenter MAY jump over a scene manually.

The session log SHOULD record:

```text
SCENE_SKIPPED
```

The PresentationDefinition remains unchanged.

---

# 26. Current Scene Context

Presenter SHALL see:

```text
Scene number
Scene title
Scene type
Narrative role
Target seconds
Elapsed seconds
Trust state
Speaker notes
```

---

# 27. Next Scene Preview

Presenter View SHALL expose the next scene.

Minimum:

```text
title
scene type
target duration
key trust warning indicator
```

Do not render the entire next scene at full audience size unless needed.

---

# 28. Previous Scene Context

Optional.

Can be shown in overview/navigation.

No need for simultaneous three-screen complexity.

---

# 29. Speaker Notes

Phase 005 SHALL create a dedicated presenter notes model.

Speaker notes are NOT Project Twin facts.

They are presentation execution aids.

---

# 30. PresenterNote

Conceptual:

```ts
interface PresenterNote {
  id: string;
  presentationId: string;
  sceneId: string;

  type: PresenterNoteType;
  text: string;

  visibility: "PRESENTER_ONLY";

  source?: PresenterNoteSource;
}
```

---

# 31. PresenterNoteType

Required:

```text
TALKING_POINT
TRANSITION
REMINDER
CAUTION
Q_AND_A
```

---

# 32. PresenterNoteSource

Required:

```text
STATIC
MANUAL
MIGRATED
```

No AI-generated source in Phase 005.

---

# 33. Notes Persistence

Default:

```text
session/in-memory
```

Optional browser-local persistence is allowed through an existing or explicit browser-storage port.

If implemented:

- no cloud;
- no credentials;
- no sensitive data assumption;
- user can clear local notes.

Do not store confidential material automatically.

---

# 34. Presenter Notes Port

Recommended:

```ts
export interface PresenterNotesRepository {
  listByPresentation(presentationId: string): Promise<PresenterNote[]>;
  listByScene(sceneId: string): Promise<PresenterNote[]>;
}
```

Browser adapter MAY implement:

```text
LocalPresenterNotesRepository
```

Only if required.

---

# 35. Static Notes

Phase 005 MAY load static notes from:

```text
data/presentations/notes/
```

through a port.

UI MUST NOT import JSON directly.

---

# 36. Notes Editing

Lightweight local note editing MAY be implemented.

It MUST NOT become a collaborative content management system.

Allowed:

```text
Create local note
Edit local note
Delete local note
```

If persistence is not implemented, note editing may remain session-only.

---

# 37. Trust Alerts

Presenter Cockpit SHALL surface trust-sensitive information from Phase 003/004.

Examples:

```text
UNSUPPORTED MATERIAL FACT
CONTRADICTED CLAIM
TARGET
ASSUMPTION
ESTIMATE
HYPOTHESIS
```

---

# 38. Presenter Trust Alert

Conceptual:

```ts
interface PresenterTrustAlert {
  id: string;
  sceneId: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  code: string;
  message: string;
  claimId?: string;
}
```

---

# 39. Trust Alert Rules

Required:

```text
Contradicted material claim
→ CRITICAL
```

```text
Unsupported HIGH/CRITICAL FACT
→ WARNING or CRITICAL according to governance result
```

```text
TARGET
→ INFO semantic reminder when useful
```

```text
ASSUMPTION
→ INFO/WARNING according to materiality
```

No new evidence evaluation occurs in Presenter.

Presenter displays already-derived trust context.

---

# 40. Trust Alert Privacy

Presenter may see more detailed trust explanation than audience view.

Audience view SHALL still preserve mandatory semantic labels from Phase 004.

---

# 41. Presentation Trust Summary

Presenter View SHALL expose a compact summary:

```text
TrustReadiness
Unsupported Material Facts
Contradicted Claims
Targets
Assumptions
Estimates
Hypotheses
```

No opaque score.

---

# 42. Q&A Preparation

Phase 005 SHALL provide deterministic Q&A preparation support.

No AI generation.

---

# 43. Q&A Card

Conceptual:

```ts
interface QaPreparationCard {
  id: string;
  sceneId?: string;
  category: QaCategory;
  question: string;
  answerNotes?: string;
  source: "STATIC" | "MANUAL" | "MIGRATED";
}
```

---

# 44. Q&A Categories

Required:

```text
STRATEGY
MARKET
BUSINESS_MODEL
FINANCIALS
TECHNOLOGY
RISK
TRACTION
TEAM
ASK
TRUST
OTHER
```

---

# 45. Q&A Policy

The system MAY provide static/manual Q&A cards.

It SHALL NOT claim an answer is factual unless supported by existing governed content.

No automatic answer generation.

---

# 46. Q&A UI

Required:

```text
Q&A Preparation panel
```

Capabilities:

- list cards;
- filter by category;
- jump from card to related scene;
- mark reviewed locally.

No audience chat.

---

# 47. Presenter Command Bar

Required controls:

```text
Start
Pause
Resume
End
Previous
Next
Overview
Fullscreen
Notes
Q&A
Trust
```

Exact layout may differ.

---

# 48. Keyboard Shortcuts

Required:

```text
ArrowRight → Next
ArrowLeft  → Previous
PageDown   → Next
PageUp     → Previous
Home       → First
End        → Last
Escape     → Exit overlay/fullscreen as appropriate
```

Recommended:

```text
N → Notes
Q → Q&A
O → Overview
T → Timer focus
```

Shortcuts must not fire while typing into text inputs.

---

# 49. Keyboard Isolation

Critical rule:

When focus is inside:

```text
input
textarea
contenteditable
```

presentation navigation shortcuts SHALL NOT interfere with typing.

---

# 50. Fullscreen Coordination

Presenter Cockpit SHALL coordinate Fullscreen API safely.

Audience presentation fullscreen may be separate from Presenter Cockpit layout.

If browser blocks fullscreen:

- session continues;
- fallback is non-blocking;
- warning may be shown.

---

# 51. Presenter Layout

Recommended desktop layout:

```text
┌─────────────────────────────────────────────┐
│ Session / Timer / Trust / Controls         │
├───────────────────────┬─────────────────────┤
│ Current Scene Preview │ Next Scene          │
│                       │                     │
├───────────────────────┼─────────────────────┤
│ Speaker Notes         │ Q&A / Trust Alerts  │
└───────────────────────┴─────────────────────┘
```

This is conceptual, not mandatory pixel layout.

---

# 52. Presenter Responsive Behavior

Presenter Cockpit is primarily desktop/tablet.

Required viewports:

```text
1440×900
1280×720
1024×768
```

Mobile must remain usable for basic session controls:

```text
390×844
```

but does not need simultaneous multi-panel display.

---

# 53. Mobile Presenter Mode

Required mobile essentials:

```text
Current Scene
Next/Previous
Timer
Scene Position
Trust Alert indicator
Notes drawer
Q&A drawer
```

---

# 54. Overview Navigator

Presenter overview SHALL show:

```text
scene order
title
scene type
timing target
trust warning indicator
visited/skipped/current state
```

---

# 55. Scene Runtime State

Required:

```text
NOT_VISITED
CURRENT
VISITED
SKIPPED
```

This belongs to PresenterSession, not PresentationDefinition.

---

# 56. Session Event Log

In-memory log required.

Possible events:

```text
SESSION_STARTED
SESSION_PAUSED
SESSION_RESUMED
SESSION_ENDED
SCENE_ENTERED
SCENE_EXITED
SCENE_SKIPPED
FULLSCREEN_ENTERED
FULLSCREEN_EXITED
NOTES_OPENED
QA_OPENED
TRUST_ALERT_VIEWED
```

---

# 57. Event Log Purpose

Event log supports:

- deterministic session tests;
- debugging;
- future rehearsal analytics.

It is NOT persisted to a server.

---

# 58. PresenterSessionEvent

Conceptual:

```ts
interface PresenterSessionEvent {
  type: PresenterSessionEventType;
  timestamp: string;
  sceneId?: string;
  metadata?: Record<string, unknown>;
}
```

Use injected clock where needed.

---

# 59. Session Start

Starting a session SHALL:

1. validate PresentationDefinition;
2. set current scene;
3. initialize timers;
4. load notes;
5. load trust summary;
6. create first session event;
7. set status RUNNING.

---

# 60. Session Pause

Pause SHALL freeze:

```text
presentation elapsed timer
scene elapsed timer
```

No automatic scene navigation.

---

# 61. Session Resume

Resume SHALL continue from current scene.

---

# 62. Session End

End SHALL:

- stop timers;
- preserve in-memory summary;
- set status ENDED;
- prevent navigation commands unless a new/restarted session is created.

---

# 63. Session Restart

Optional.

If implemented:

```text
new session ID
```

recommended.

Do not silently reset an ended session object in place.

---

# 64. Presenter Timing Summary

At session end, produce deterministic summary:

```text
Target Duration
Actual Duration
Delta
Scenes Visited
Scenes Skipped
Average Scene Deviation
Final Timing State
```

No performance scoring.

---

# 65. No Presenter Score

Do NOT create:

```text
Presenter Score 87/100
```

or opaque coaching metrics.

Phase 005 is execution tooling, not AI coaching.

---

# 66. Rehearsal Mode

Optional.

If implemented, REHEARSAL MAY expose:

- timing summary;
- scene timing deviations;
- skipped scenes;
- notes review.

No speech analysis.

---

# 67. Session Repository

No cloud session repository.

A port MAY exist:

```ts
export interface PresenterSessionStore {
  save(session: PresenterSession): Promise<void>;
  load(id: string): Promise<PresenterSession | null>;
}
```

but production implementation SHALL be either:

```text
InMemoryPresenterSessionStore
```

or approved browser-local adapter.

No Firebase.

---

# 68. Presenter Preferences

Optional browser-local preferences:

```text
preferred presenter layout
notes panel open/closed
timer visibility
theme preference
font scale
```

No sensitive data.

---

# 69. Presenter Preferences Port

Recommended:

```ts
export interface PresenterPreferenceStore {
  get(): Promise<PresenterPreferences>;
  save(preferences: PresenterPreferences): Promise<void>;
}
```

Browser adapter only.

---

# 70. Font Scale

Presenter notes MAY support:

```text
SMALL
MEDIUM
LARGE
```

Audience scene typography is controlled by PresentationTheme, not Presenter preferences.

---

# 71. Presenter Theme

Presenter Cockpit MAY have its own application UI theme.

Do NOT alter PresentationTheme semantics.

---

# 72. Current/Next Preview Safety

Presenter preview components MUST consume PresentationScene data.

They SHALL NOT query project repositories directly.

---

# 73. Scene Preview Rendering

Current scene can use:

```text
PresentationRenderer
```

in embedded preview mode.

Avoid duplicating scene business rendering logic.

---

# 74. Audience Window

Phase 005 MAY support an in-app audience view.

Do NOT implement cross-window browser synchronization unless straightforward and fully testable.

A same-app route/state solution is acceptable.

---

# 75. Multi-Monitor Support

Advanced multi-monitor/window management is NOT required.

Document as future enhancement if needed.

---

# 76. Trust Alert Acknowledgement

Presenter MAY mark a trust alert:

```text
VIEWED
```

during session.

This is session state only.

It does NOT change ClaimReviewStatus.

---

# 77. Q&A Review State

Q&A card MAY be:

```text
UNREVIEWED
REVIEWED
```

session/local only.

No governance status changes.

---

# 78. Notes and Governance Separation

Presenter notes SHALL NOT automatically become:

- Project Twin content;
- Claims;
- Evidence;
- Narrative steps.

Future promotion would require an explicit workflow not authorized here.

---

# 79. Presentation Integrity

Presenter commands SHALL never modify:

```text
scene title
scene bindings
scene trust status
scene order in PresentationDefinition
```

Skipping only affects session state.

---

# 80. Error Model

Required:

```text
PresenterSessionNotFoundError
InvalidPresenterSessionTransitionError
InvalidSceneNavigationError
PresentationNotReadyForSessionError
PresenterNoteNotFoundError
QaCardNotFoundError
TimerStateError
```

---

# 81. Presentation Readiness Gate

Default:

```text
PRESENTATION_READY
→ session may start
```

```text
PRESENTATION_READY_WITH_WARNINGS
→ session may start with warning acknowledgement
```

```text
PRESENTATION_NOT_READY
→ presenter session may open in REHEARSAL/PREVIEW only
```

If REHEARSAL not implemented:

```text
PRESENTATION_NOT_READY
→ session start blocked
```

---

# 82. Trust Readiness Gate

Trust readiness SHALL NOT necessarily block all sessions.

Recommended:

```text
TRUST_READY
→ normal
```

```text
TRUST_READY_WITH_WARNINGS
→ allow with visible alerts
```

```text
TRUST_NOT_READY
→ allow rehearsal/preview; live start requires explicit owner override only if such override is modeled
```

For Phase 005, simplest safe rule is acceptable:

```text
TRUST_NOT_READY
→ visible critical warning
```

Do not invent approval workflow.

---

# 83. Presenter Start Confirmation

If:

```text
PRESENTATION_READY_WITH_WARNINGS
```

or trust has critical warnings, UI MAY require:

```text
Start anyway
```

local confirmation.

No electronic signature.

---

# 84. Application Use Cases

Required:

```text
CreatePresenterSession
StartPresenterSession
PausePresenterSession
ResumePresenterSession
EndPresenterSession
NavigateToNextScene
NavigateToPreviousScene
GoToPresenterScene
GetPresenterSession
GetCurrentSceneContext
GetNextSceneContext
GetPresenterTiming
GetPresenterTrustAlerts
ListPresenterNotes
ListQaPreparationCards
BuildPresenterSessionSummary
```

---

# 85. Optional Use Cases

Allowed:

```text
CreatePresenterNote
UpdatePresenterNote
DeletePresenterNote
MarkQaCardReviewed
MarkTrustAlertViewed
SavePresenterPreferences
```

---

# 86. Presenter Session Service

Core domain/application service MAY orchestrate:

```text
PresenterSessionController
```

Avoid one giant UI controller.

---

# 87. Timer Port

To keep tests deterministic:

```ts
export interface ClockPort {
  now(): Date;
}
```

Use:

```text
SystemClockAdapter
TestClockAdapter
```

---

# 88. Fullscreen Port

Browser-specific fullscreen behavior SHOULD be behind an adapter/port.

Conceptual:

```ts
export interface FullscreenPort {
  enter(elementRef?: unknown): Promise<void>;
  exit(): Promise<void>;
  isActive(): boolean;
}
```

Domain should not know DOM details.

---

# 89. Keyboard Adapter

Keyboard events are inbound UI/browser adapter concerns.

Map keys to Presenter commands.

---

# 90. Browser Storage Adapter

If notes/preferences persistence is implemented:

```text
BrowserPresenterPreferenceStore
BrowserPresenterNotesRepository
```

No direct `localStorage` access from domain/application.

---

# 91. Presenter UI Modules

Recommended:

```text
src/ui/presenter/
├── presenter.page.ts
├── presenter-shell.component.ts
├── current-scene-panel.component.ts
├── next-scene-panel.component.ts
├── presenter-timer.component.ts
├── speaker-notes.component.ts
├── presenter-trust-panel.component.ts
├── presenter-qa-panel.component.ts
├── presenter-overview.component.ts
├── presenter-command-bar.component.ts
└── session-summary.component.ts
```

Exact filenames may vary.

---

# 92. Presenter Timer UI

Required:

```text
Elapsed
Remaining
Timing State
```

Recommended:

```text
Scene elapsed
Scene target
Cumulative expected
```

---

# 93. Timing Visual Semantics

Timing state must not rely only on color.

Use text/icon labels:

```text
ON TRACK
AHEAD
BEHIND
OVERTIME
```

---

# 94. Speaker Notes UI

Required:

- scene-specific notes;
- readable type;
- scrolling;
- presenter-only;
- no audience leakage.

---

# 95. Trust Panel UI

Required:

```text
Current Scene Alerts
Presentation Trust Summary
```

Warnings should be concise but traceable.

---

# 96. Q&A Panel UI

Required:

- category;
- question;
- answer notes if available;
- related scene;
- reviewed state.

---

# 97. Session Summary UI

At end:

```text
Target Duration
Actual Duration
Delta
Visited Scenes
Skipped Scenes
Timing State
Warnings Seen
```

No presenter ranking.

---

# 98. Arcana Pilot

Use the three compiled Arcana presentations:

```text
ARCANA_INVESTOR_10_EN
ARCANA_EXECUTIVE_5_ES
ARCANA_TECHNICAL_20_EN
```

---

# 99. Arcana Investor Presenter Pilot

Required:

```text
Target Duration: 10 minutes
Presentation: Investor
Language: EN
```

Verify:

- timer;
- current/next;
- notes;
- trust alerts;
- Q&A;
- overview;
- navigation;
- session summary.

---

# 100. Arcana Executive Presenter Pilot

Required:

```text
Target Duration: 5 minutes
Presentation: Executive
Language: ES
```

Verify same presenter capabilities.

---

# 101. Arcana Technical Presenter Pilot

Required:

```text
Target Duration: 20 minutes
Presentation: Technical
Language: EN
```

Verify technical trust alerts and architecture-scene presenter workflow.

---

# 102. No Arcana Hard-Coding

No presenter logic such as:

```text
if projectId === "arcana"
```

Arcana is only pilot data.

---

# 103. Presenter Notes Pilot

Create a small set of source-grounded/manual notes for Arcana where appropriate.

Do NOT invent business facts.

Notes may include:

```text
"Pause before moving to architecture."
```

or:

```text
"Clarify that this value is a TARGET."
```

These are presenter instructions, not facts.

---

# 104. Q&A Pilot

Create static/manual Q&A preparation cards from existing project material.

Do not fabricate unsupported answers.

If answer is not available:

```text
answerNotes: "Not established in current Project Twin."
```

is acceptable.

---

# 105. Session Determinism

Given:

```text
same PresentationDefinition
same command sequence
same clock inputs
```

the resulting PresenterSession state MUST be equivalent.

---

# 106. Presenter Event Determinism

Session events SHALL be deterministic under injected clock/test inputs.

---

# 107. Workstreams

## WS-005-01 — Presenter Domain

Implement PresenterSession, statuses, state, events.

## WS-005-02 — Timing Engine

Implement presentation/scene timers and timing policy.

## WS-005-03 — Notes

Implement presenter notes model and access boundary.

## WS-005-04 — Trust Alerts

Expose trust context for live presenter use.

## WS-005-05 — Q&A Preparation

Implement deterministic Q&A cards.

## WS-005-06 — Application Use Cases

Implement presenter session commands/queries.

## WS-005-07 — Browser Adapters

Clock, fullscreen, optional local preferences/notes.

## WS-005-08 — Presenter UI

Build cockpit panels and command bar.

## WS-005-09 — Arcana Pilot

Verify three presenter scenarios.

## WS-005-10 — Testing & Visual Regression

Unit, architecture, E2E, visual, regression.

## WS-005-11 — Documentation & Evidence

ADRs, architecture docs, traceability, verification.

---

# 108. Task Breakdown — Presenter Domain

### T-005-001
Create PresenterSession.

### T-005-002
Create PresenterSessionId.

### T-005-003
Create PresenterSessionStatus.

### T-005-004
Create PresenterMode.

### T-005-005
Create SceneRuntimeState.

### T-005-006
Create PresenterSessionEvent.

### T-005-007
Create PresenterSessionEventType.

### T-005-008
Implement session invariants.

### T-005-009
Implement valid session transitions.

### T-005-010
Implement scene navigation invariants.

---

# 109. Task Breakdown — Timing

### T-005-101
Create PresentationTimer.

### T-005-102
Create SceneTimer.

### T-005-103
Create TimingState.

### T-005-104
Create TimingDeviation.

### T-005-105
Create PresenterTimingPolicy.

### T-005-106
Implement cumulative expected timing.

### T-005-107
Implement AHEAD.

### T-005-108
Implement ON_TRACK.

### T-005-109
Implement BEHIND.

### T-005-110
Implement OVERTIME.

### T-005-111
Create ClockPort.

### T-005-112
Create SystemClockAdapter.

### T-005-113
Create TestClockAdapter.

---

# 110. Task Breakdown — Notes

### T-005-201
Create PresenterNote.

### T-005-202
Create PresenterNoteType.

### T-005-203
Create PresenterNoteSource.

### T-005-204
Create PresenterNotesRepository port.

### T-005-205
Create static/session notes adapter.

### T-005-206
Create list notes use case.

### T-005-207
Implement optional local note editing if authorized by implementation simplicity.

---

# 111. Task Breakdown — Trust

### T-005-301
Create PresenterTrustAlert.

### T-005-302
Create PresenterTrustState.

### T-005-303
Map PresentationTrustSummary.

### T-005-304
Map current-scene trust alerts.

### T-005-305
Implement contradicted-claim alert.

### T-005-306
Implement unsupported-fact alert.

### T-005-307
Implement target/assumption semantic reminders.

### T-005-308
Verify no new support evaluation occurs in presenter.

---

# 112. Task Breakdown — Q&A

### T-005-401
Create QaPreparationCard.

### T-005-402
Create QaCategory.

### T-005-403
Create Q&A repository port.

### T-005-404
Create static Q&A adapter.

### T-005-405
Create list Q&A use case.

### T-005-406
Create related-scene mapping.

### T-005-407
Create reviewed-state session behavior.

---

# 113. Task Breakdown — Application

### T-005-501
Create CreatePresenterSessionUseCase.

### T-005-502
Create StartPresenterSessionUseCase.

### T-005-503
Create PausePresenterSessionUseCase.

### T-005-504
Create ResumePresenterSessionUseCase.

### T-005-505
Create EndPresenterSessionUseCase.

### T-005-506
Create NextSceneUseCase.

### T-005-507
Create PreviousSceneUseCase.

### T-005-508
Create GoToSceneUseCase.

### T-005-509
Create GetCurrentSceneContextUseCase.

### T-005-510
Create GetNextSceneContextUseCase.

### T-005-511
Create GetPresenterTimingUseCase.

### T-005-512
Create GetPresenterTrustAlertsUseCase.

### T-005-513
Create BuildPresenterSessionSummaryUseCase.

---

# 114. Task Breakdown — Browser Adapters

### T-005-601
Create FullscreenPort.

### T-005-602
Create BrowserFullscreenAdapter.

### T-005-603
Create keyboard inbound adapter.

### T-005-604
Implement input/textarea/contenteditable isolation.

### T-005-605
Create optional PresenterPreferenceStore.

### T-005-606
Create BrowserPresenterPreferenceStore if used.

---

# 115. Task Breakdown — UI

### T-005-701
Create Presenter route.

### T-005-702
Create PresenterShell.

### T-005-703
Create CurrentScenePanel.

### T-005-704
Create NextScenePanel.

### T-005-705
Create PresenterTimer.

### T-005-706
Create SpeakerNotesPanel.

### T-005-707
Create PresenterTrustPanel.

### T-005-708
Create PresenterQaPanel.

### T-005-709
Create PresenterOverview.

### T-005-710
Create PresenterCommandBar.

### T-005-711
Create SessionSummary.

### T-005-712
Create mobile presenter layout.

### T-005-713
Create audience/presenter mode separation.

---

# 116. Task Breakdown — Arcana

### T-005-801
Create Arcana Investor presenter pilot.

### T-005-802
Create Arcana Executive presenter pilot.

### T-005-803
Create Arcana Technical presenter pilot.

### T-005-804
Create Arcana presenter notes dataset.

### T-005-805
Create Arcana Q&A preparation dataset.

### T-005-806
Validate trust alerts.

### T-005-807
Validate timing.

### T-005-808
Validate session summary.

### T-005-809
Create Arcana Presenter Pilot Report.

---

# 117. Task Breakdown — Tests

### T-005-901
Test PresenterSession invariants.

### T-005-902
Test session transitions.

### T-005-903
Test navigation state.

### T-005-904
Test scene skip state.

### T-005-905
Test PresentationTimer.

### T-005-906
Test SceneTimer.

### T-005-907
Test TimingPolicy ON_TRACK.

### T-005-908
Test TimingPolicy AHEAD.

### T-005-909
Test TimingPolicy BEHIND.

### T-005-910
Test TimingPolicy OVERTIME.

### T-005-911
Test deterministic clock behavior.

### T-005-912
Test presenter notes.

### T-005-913
Test trust alert mapping.

### T-005-914
Test no governance re-evaluation.

### T-005-915
Test Q&A cards.

### T-005-916
Test Project Twin immutability.

### T-005-917
Test NarrativePlan immutability.

### T-005-918
Test PresentationDefinition immutability.

### T-005-919
Test session determinism.

### T-005-920
Test Presenter route E2E.

### T-005-921
Test start/pause/resume/end E2E.

### T-005-922
Test keyboard E2E.

### T-005-923
Test keyboard input isolation E2E.

### T-005-924
Test fullscreen E2E.

### T-005-925
Test notes E2E.

### T-005-926
Test trust alerts E2E.

### T-005-927
Test Q&A E2E.

### T-005-928
Test overview E2E.

### T-005-929
Test mobile E2E.

### T-005-930
Test session summary E2E.

### T-005-931
Create visual regression baselines.

### T-005-932
Run architecture tests.

### T-005-933
Run Phase 004 regression.

### T-005-934
Run Phase 003 regression.

### T-005-935
Run Phase 002 regression.

### T-005-936
Run Phase 001 regression.

### T-005-937
Run Phase 000A regression.

### T-005-938
Run Phase 0 legacy preservation.

---

# 118. Task Breakdown — Documentation

### T-005-1001
Create Presenter Domain Model.

### T-005-1002
Create Presenter Session State Machine.

### T-005-1003
Create Presenter Timing Policy Reference.

### T-005-1004
Create Presenter Notes Reference.

### T-005-1005
Create Presenter Trust Alert Reference.

### T-005-1006
Create Q&A Preparation Reference.

### T-005-1007
Create Presenter Keyboard Reference.

### T-005-1008
Create Presenter Responsive Guidelines.

### T-005-1009
Create Arcana Presenter Pilot Report.

### T-005-1010
Create SPEC-005 Traceability Matrix.

### T-005-1011
Create Phase 005 Verification Report.

---

# 119. Acceptance Criteria

## AC-005-001 — Session Isolation

PresenterSession SHALL be separate from PresentationDefinition.

---

## AC-005-002 — Canonical Immutability

Presenter session SHALL NOT mutate Project Twin, NarrativePlan, Trust Context, or PresentationDefinition.

---

## AC-005-003 — Session Lifecycle

IDLE/RUNNING/PAUSED/ENDED transitions SHALL be deterministic and validated.

---

## AC-005-004 — Timing

Pitch timer and scene timer SHALL work through deterministic clock abstraction.

---

## AC-005-005 — Timing State

ON_TRACK/AHEAD/BEHIND/OVERTIME SHALL derive from explicit policy.

---

## AC-005-006 — Current/Next

Presenter View SHALL show current and next scene context.

---

## AC-005-007 — Speaker Notes

Presenter-only notes SHALL never appear in Audience View.

---

## AC-005-008 — Trust Alerts

Current-scene material trust issues SHALL be visible to presenter.

---

## AC-005-009 — No Governance Mutation

Viewing/acknowledging trust alerts SHALL NOT modify claim/evidence governance states.

---

## AC-005-010 — Q&A Preparation

Presenter SHALL have access to deterministic/manual Q&A preparation cards.

---

## AC-005-011 — Keyboard Navigation

Required navigation shortcuts SHALL operate without interfering with text inputs.

---

## AC-005-012 — Fullscreen

Fullscreen control SHALL work where browser permits.

---

## AC-005-013 — Overview

Presenter Overview SHALL expose runtime states: current/visited/skipped/not visited.

---

## AC-005-014 — Session Summary

Ended session SHALL produce deterministic timing/navigation summary.

---

## AC-005-015 — Audience Separation

Audience View SHALL not expose notes, internal alerts detail, or presenter controls.

---

## AC-005-016 — Mobile

Core Presenter functions SHALL remain usable on required mobile viewport.

---

## AC-005-017 — Arcana Investor

Investor presenter pilot SHALL pass.

---

## AC-005-018 — Arcana Executive

Executive presenter pilot SHALL pass.

---

## AC-005-019 — Arcana Technical

Technical presenter pilot SHALL pass.

---

## AC-005-020 — Static Build

Application SHALL remain static-hostable.

---

## AC-005-021 — Architecture

Presenter domain SHALL preserve hexagonal dependency rules.

---

## AC-005-022 — Regression

All prior phase tests SHALL remain passing.

---

## AC-005-023 — Forbidden Scope

No AI, backend, database, Firebase runtime, speech analysis, or collaboration may be introduced.

---

# 120. Required Arcana Presenter Pilot Report

Create:

```text
docs/evidence/ARCANA_PRESENTER_COCKPIT_PILOT_REPORT.md
```

For each:

```text
Investor
Executive
Technical
```

report:

```text
Presentation ID
Target Duration
Scene Count
Notes Count
Q&A Cards
Trust Alerts
Timing State
Scenes Visited
Scenes Skipped
Session Summary
```

---

# 121. Required Presenter E2E Matrix

Playwright SHALL explicitly verify:

| Flow | Result |
|---|---|
| Presenter Load | |
| Session Create | |
| Start | |
| Pause | |
| Resume | |
| End | |
| Next | |
| Previous | |
| Go To Scene | |
| Current Scene | |
| Next Scene | |
| Timer | |
| Scene Timer | |
| Timing State | |
| Notes | |
| Notes Privacy | |
| Trust Alerts | |
| Q&A | |
| Overview | |
| Scene Skip | |
| Keyboard | |
| Input Isolation | |
| Fullscreen | |
| Mobile | |
| Session Summary | |

---

# 122. Required Visual Regression Baselines

Minimum:

```text
Presenter Main Cockpit
Presenter Timer Ahead/Behind State
Speaker Notes Panel
Trust Alert Panel
Q&A Panel
Overview Grid
Mobile Presenter
Session Summary
```

Recommended viewport:

```text
1440×900
```

Mobile:

```text
390×844
```

---

# 123. Browser Runtime Gate

Required:

```text
Critical console errors: 0
Unhandled exceptions: 0
Critical asset 404s: 0
```

---

# 124. Architecture Gate

Required:

```text
0 dependency violations
```

Presenter domain MUST NOT import:

```text
UI
DOM
Firebase
legacy runtime
AI
browser storage concrete implementation
```

---

# 125. Regression Gate

Required:

```text
Phase 005 tests             PASS
Phase 004 regression        PASS
Phase 003 regression        PASS
Phase 002 regression        PASS
Phase 001 regression        PASS
Phase 000A regression       PASS
Phase 0 legacy              45/45 PASS minimum
```

---

# 126. Forbidden Scope Audit

Final report MUST explicitly state:

```text
OpenAI: NOT IMPLEMENTED
Claude: NOT IMPLEMENTED
Gemini: NOT IMPLEMENTED
Ollama: NOT IMPLEMENTED
AI SDK: NOT IMPLEMENTED
AI Speaker Coaching: NOT IMPLEMENTED
AI Q&A: NOT IMPLEMENTED
Speech Recognition: NOT IMPLEMENTED
Audio Analysis: NOT IMPLEMENTED

Firestore: NOT IMPLEMENTED
Firebase Auth: NOT IMPLEMENTED
Firebase Storage: NOT IMPLEMENTED
Cloud Functions: NOT IMPLEMENTED

Backend: NOT IMPLEMENTED
Database: NOT IMPLEMENTED
Cloud Session History: NOT IMPLEMENTED

Collaboration: NOT IMPLEMENTED
Remote Presenter Control: NOT IMPLEMENTED
Audience Telemetry: NOT IMPLEMENTED
PPTX Export: NOT IMPLEMENTED
PDF Export: NOT IMPLEMENTED

Static Web Architecture: PRESERVED
```

---

# 127. Definition of Done

Phase 005 may become `CODE_COMPLETE` only when:

- PresenterSession exists;
- session lifecycle exists;
- timers exist;
- timing policy exists;
- notes model exists;
- trust alerts exist;
- Q&A cards exist;
- use cases exist;
- presenter UI exists;
- audience/presenter separation exists;
- keyboard works;
- fullscreen works;
- overview works;
- session summary works;
- Arcana pilots pass;
- tests exist;
- visual baselines exist;
- architecture passes;
- static build passes;
- forbidden scope remains absent.

Phase 005 becomes `VERIFIED` only if:

```text
TYPECHECK                         PASS
ARCHITECTURE                      PASS
PRESENTER DOMAIN TESTS            PASS
SESSION STATE TESTS               PASS
TIMING TESTS                      PASS
CLOCK DETERMINISM                 PASS
NOTES TESTS                       PASS
TRUST ALERT TESTS                 PASS
Q&A TESTS                         PASS
PROJECT TWIN IMMUTABILITY         PASS
NARRATIVE PLAN IMMUTABILITY       PASS
PRESENTATION DEFINITION IMMUTABILITY PASS
SESSION DETERMINISM               PASS
PRESENTER E2E                     PASS
SESSION LIFECYCLE E2E             PASS
KEYBOARD E2E                      PASS
INPUT ISOLATION E2E               PASS
FULLSCREEN E2E                    PASS
NOTES PRIVACY E2E                 PASS
TRUST ALERT E2E                   PASS
Q&A E2E                           PASS
OVERVIEW E2E                      PASS
MOBILE E2E                        PASS
SESSION SUMMARY E2E               PASS
VISUAL REGRESSION                 PASS
PHASE 004 REGRESSION              PASS
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

# 128. Required Documentation

Create:

```text
docs/architecture/PRESENTER_DOMAIN_MODEL.md
docs/architecture/PRESENTER_SESSION_STATE_MACHINE.md
docs/architecture/PRESENTER_TIMING_POLICY.md
docs/architecture/PRESENTER_NOTES_REFERENCE.md
docs/architecture/PRESENTER_TRUST_ALERT_REFERENCE.md
docs/architecture/PRESENTER_QA_REFERENCE.md
docs/architecture/PRESENTER_KEYBOARD_REFERENCE.md
docs/architecture/PRESENTER_RESPONSIVE_GUIDELINES.md

docs/evidence/ARCANA_PRESENTER_COCKPIT_PILOT_REPORT.md
docs/evidence/SPEC_005_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_005_VERIFICATION_REPORT.md
```

---

# 129. Recommended ADRs

Create:

```text
ADR-0037 PresenterSession as Ephemeral Runtime State
ADR-0038 Canonical Presentation Immutability During Presentation
ADR-0039 Deterministic Presenter Timing
ADR-0040 Presenter/Audience View Separation
ADR-0041 Presenter Notes as Non-Canonical Content
ADR-0042 Trust Alerts as Read-Only Governance Projection
ADR-0043 Static Q&A Preparation
ADR-0044 Browser Adapter Boundaries for Fullscreen and Clock
ADR-0045 No-AI Presenter Cockpit in Phase 005
```

---

# 130. Required Verification Report

Generate:

```text
docs/evidence/PHASE_005_VERIFICATION_REPORT.md
```

Required sections:

## Identification

- phase;
- SPEC;
- branch;
- starting commit;
- ending commit;
- date;
- Presenter domain version if defined;
- timing policy version.

## Task Matrix

Every `T-005-*`.

Statuses:

```text
DONE
PARTIAL
BLOCKED
NOT_STARTED
```

## Presenter Domain

Report:

```text
Session statuses
Presenter modes
Scene runtime states
Event types
Timing states
```

## Timing

Report:

```text
Timing thresholds
Clock abstraction
ON_TRACK tests
AHEAD tests
BEHIND tests
OVERTIME tests
```

## Notes

Report:

```text
Notes source
Notes count
Persistence mode
Privacy verification
```

## Trust

Report:

```text
Trust alerts
Unsupported FACT alerts
Contradicted claim alerts
Semantic type reminders
```

## Q&A

Report:

```text
Q&A card count
Categories
Source mode
Reviewed-state behavior
```

## Arcana Pilots

Investor / Executive / Technical:

```text
Target duration
Scene count
Session lifecycle
Notes
Q&A
Trust alerts
Timing result
Summary
```

## Test Matrix

Include all required unit and E2E gates.

## Visual Regression

Report:

```text
baseline count
viewport(s)
unexpected changes
result
```

## Regression

Report all previous phases explicitly.

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

# 131. SDD State Machine

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

# 132. Change Control

If additional scope is required:

1. stop affected task;
2. create:

```text
docs/specs/changes/CHANGE_REQUEST_005_XXX.md
```

3. document:
   - problem;
   - proposed change;
   - impact;
   - alternatives;
   - risk;
4. wait for owner approval.

---

# 133. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-005 — Executive Presenter Cockpit`

under:

`SPEC-005 — Executive Presenter Cockpit`

Previous phase:

`VHOS-PHASE-004 — Executive Presentation Engine`

is approved CLOSED.

---

## PRIMARY OBJECTIVE

Implement a deterministic Executive Presenter Cockpit over immutable `PresentationDefinition`.

The cockpit must provide:

```text
Current Scene
Next Scene
Presentation Timer
Scene Timer
Timing State
Speaker Notes
Trust Alerts
Q&A Preparation
Overview
Presenter Controls
Session Summary
```

---

## BEFORE WRITING CODE

You MUST:

1. read Phase 0 baseline;
2. read Phase 000A architecture;
3. read Phase 001 Project Twin;
4. read Phase 002 Narrative Engine;
5. read Phase 003 Claims & Evidence;
6. read Phase 004 Presentation Engine;
7. run the full current verification suite;
8. confirm baseline passes;
9. inspect the three Arcana PresentationDefinitions;
10. map work to `T-005-*`;
11. document implementation plan.

Do NOT begin with visual polish.

Start with PresenterSession domain and timing model.

---

## IMPLEMENTATION ORDER

Required:

```text
Presenter Domain
      ↓
Session State Machine
      ↓
Clock / Timing
      ↓
Notes Model
      ↓
Trust Alert Projection
      ↓
Q&A Model
      ↓
Application Use Cases
      ↓
Browser Adapters
      ↓
Presenter UI
      ↓
Arcana Pilots
      ↓
E2E / Visual Regression
```

---

## IMMUTABILITY RULE

Presenter MUST NOT mutate:

```text
Project Twin
NarrativePlan
NarrativeTrustContext
PresentationDefinition
Claims
Evidence
```

PresenterSession is a separate runtime object.

---

## PRESENTER/AUDIENCE RULE

Presenter-only information MUST NOT leak into Audience View.

This includes:

```text
Speaker Notes
Internal Q&A Cards
Session Events
Detailed Internal Trust Explanation
Debug Metadata
```

Mandatory claim labels defined by Phase 004 remain visible to the audience.

---

## TIMING RULE

Use deterministic ClockPort.

Do NOT depend directly on:

```text
Date.now()
```

inside pure domain logic.

Timing states must come from explicit policy.

---

## NO AUTO-EDIT RULE

Being behind schedule MUST NOT cause automatic modification of:

```text
NarrativePlan
PresentationDefinition
Scene order
Scene content
```

Presenter may manually skip scenes.

---

## TRUST RULE

Presenter displays existing trust context.

Do NOT re-evaluate claims or evidence in Presenter.

Do NOT modify ClaimReviewStatus.

---

## NOTES RULE

Presenter notes are execution aids.

They SHALL NOT become Project Twin facts, Claims, Evidence, or NarrativeSteps.

---

## Q&A RULE

Use static/manual Q&A preparation only.

Do NOT generate questions or answers with AI.

Do NOT fabricate answers.

---

## AUTHORIZED TECHNOLOGY

Use existing approved static frontend stack.

Allowed browser adapters:

```text
Clock
Fullscreen
Keyboard
Optional browser-local preferences/notes
```

No infrastructure expansion.

---

## FORBIDDEN

Do NOT implement:

- OpenAI;
- Claude;
- Gemini;
- Ollama;
- AI SDKs;
- AI Presenter Coaching;
- AI Q&A;
- Speech Recognition;
- Audio Analysis;
- Firestore;
- Auth;
- Storage;
- Cloud Functions;
- backend;
- database;
- collaboration;
- remote control;
- audience telemetry;
- PPTX export;
- PDF export.

---

## ARCANA PILOT

Verify:

```text
ARCANA_INVESTOR_10_EN
ARCANA_EXECUTIVE_5_ES
ARCANA_TECHNICAL_20_EN
```

in Presenter Cockpit.

Do not add Arcana-specific presenter domain logic.

---

## REQUIRED TESTING

Before CODE_COMPLETE run:

1. typecheck;
2. architecture tests;
3. PresenterSession domain tests;
4. state transition tests;
5. timer tests;
6. timing policy tests;
7. clock determinism;
8. notes tests;
9. trust alert tests;
10. Q&A tests;
11. Project Twin immutability;
12. NarrativePlan immutability;
13. PresentationDefinition immutability;
14. session determinism;
15. Presenter E2E;
16. lifecycle E2E;
17. keyboard E2E;
18. input isolation E2E;
19. fullscreen E2E;
20. notes privacy E2E;
21. trust alert E2E;
22. Q&A E2E;
23. overview E2E;
24. mobile E2E;
25. session summary E2E;
26. visual regression;
27. Phase 004 regression;
28. Phase 003 regression;
29. Phase 002 regression;
30. Phase 001 regression;
31. Phase 000A regression;
32. Phase 0 legacy preservation;
33. static build;
34. browser console validation;
35. forbidden-scope audit.

All mandatory gates must pass.

---

## REQUIRED OUTPUT

Generate:

```text
docs/evidence/PHASE_005_VERIFICATION_REPORT.md
```

Final recommendation may be:

```text
READY_FOR_APPROVAL
```

only if all mandatory gates pass.

Otherwise:

```text
NOT_READY
```

or:

```text
BLOCKED
```

Do NOT start Phase 006.

Do NOT mark Phase 005 CLOSED.

---

# 134. Expected End State

```text
                    PRESENTATION DEFINITION
                             │
                             ▼
                      PRESENTER SESSION
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
          TIMING           NOTES            TRUST
            │                │                │
            ├────────────┬───┴───────┬────────┤
            ▼            ▼           ▼        ▼
        CURRENT       NEXT SCENE     Q&A    OVERVIEW
          SCENE
            │
            └────────────┬─────────────────────┘
                         ▼
                EXECUTIVE PRESENTER
                      COCKPIT
```

The platform remains:

```text
WEB-FIRST
STATIC
DETERMINISTIC
TRUST-AWARE
PRESENTER-AWARE
NO AI
NO BACKEND
NO DATABASE
NO FIREBASE RUNTIME
```

---

# 135. Exit Decision

If all criteria pass:

> **Apruebo formalmente VHOS-PHASE-005 — Executive Presenter Cockpit bajo SPEC-005 como VERIFIED/CLOSED y autorizo la definición de la siguiente fase, manteniendo la arquitectura Feature-Oriented Hexagonal, el enfoque web-first, la persistencia estática, la inmutabilidad de Project Twin/NarrativePlan/PresentationDefinition y la gobernanza explícita de Claims & Evidence sin IA generativa.**
