# Venture Hub OS — SPEC-013
## Conversational Intelligence & Premium Experience

**Phase:** `VHOS-PHASE-013`  
**Specification:** `SPEC-013 — Conversational Intelligence & Premium Experience`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Baseline:** `Venture Hub OS v1.0.0`  
**Baseline Commit:** `c03372b0de439ef591acc1a50efb545e2affaba2`  
**Baseline Status:** `RELEASED / IMMUTABLE`  
**Recommended Development Target:** `v1.1.0`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Primary Goal:** Make Venture Hub OS visibly more intelligent, conversational, premium, and easier to operate without weakening canonical truth, authorization, multi-tenant isolation, or production controls.

---

# 1. Executive Objective

Phase 013 SHALL transform Venture Hub OS from a technically strong project operating platform into a visibly intelligent premium product.

The phase has two inseparable tracks:

```text
TRACK A
Conversational Intelligence
        +
TRACK B
Premium Product Experience
```

The result SHALL allow a user to:

```text
open a project
    ↓
ask natural-language questions
    ↓
receive grounded answers
    ↓
inspect supporting sources
    ↓
navigate to the relevant project evidence
    ↓
take an explicitly confirmed action
```

while experiencing a redesigned interface that is:

```text
premium
minimal
executive
clear
fast
contextual
responsive
visibly different from v1.0.0
```

---

# 2. Phase 013 Success Definition

Phase 013 succeeds only when all three are simultaneously true:

```text
TECHNICALLY CORRECT
        +
AI ACTUALLY USEFUL
        +
VISUALLY DIFFERENTIATED
```

Passing unit tests alone is insufficient.

---

# 3. Baseline Protection

`v1.0.0` is immutable historical evidence.

Phase 013 SHALL:

```text
branch from v1.0.0
preserve v1.0.0 tags
preserve v1.0.0 release evidence
preserve Phase 000A–012 acceptance records
```

Phase 013 SHALL NOT rewrite historical acceptance reports.

---

# 4. Canonical Invariants

The following remain mandatory:

```text
Project Twin = canonical venture truth

AI OUTPUT != PROJECT TRUTH

Narrative != Project Truth

Presentation != Project Truth

DocumentArtifact != Evidence

FileRecord != Evidence

Administration != Venture Truth
```

---

# 5. Authorization Invariant

Required:

```text
COPILOT ACCESS <= USER ACCESS
```

The Copilot SHALL NOT retrieve, infer from, summarize, or expose data the active user cannot independently access.

---

# 6. Main Product Shift

The primary experience moves from:

```text
module navigation
```

toward:

```text
project intelligence
```

The system should answer:

```text
What is happening?
What matters?
What is missing?
What is risky?
What changed?
What should I inspect next?
What supports this conclusion?
```

---

# 7. Workstreams

## WS-013-01 Discovery & Current-State Inventory
## WS-013-02 Information Architecture V2
## WS-013-03 Design System V2
## WS-013-04 Premium Navigation Shell
## WS-013-05 Executive Project Overview
## WS-013-06 Copilot Domain & Application Architecture
## WS-013-07 Grounded Retrieval
## WS-013-08 Copilot Workspace
## WS-013-09 Contextual Copilot Side Panel
## WS-013-10 Citations & Source Navigation
## WS-013-11 Claims/Evidence Experience Redesign
## WS-013-12 Data Room Experience Redesign
## WS-013-13 Presentation/Presenter Experience Redesign
## WS-013-14 Administration Visual Migration
## WS-013-15 Security & AI Threat Hardening
## WS-013-16 Accessibility / Responsive / Motion
## WS-013-17 Visual Acceptance
## WS-013-18 AI Acceptance
## WS-013-19 Regression & Release Candidate

---

# 8. Mandatory Discovery Gate

Before implementation, Antigravity SHALL generate:

```text
docs/evidence/PHASE_013_CURRENT_STATE_INVENTORY.md
```

It SHALL inventory:

```text
Current routes
Current screens
Current UI primitives
Current visual tokens
Current navigation model
Current AI components
Current AI provider adapters
Current prompt flows
Current project retrieval paths
Current authorization boundaries
Current legacy UI dependencies
Current mobile behavior
```

No blind rewrite is permitted.

---

# 9. Current AI Capability Inventory

Antigravity SHALL identify:

```text
what AI can currently read
what AI can currently generate
where AI appears in UI
whether chat exists
whether conversation persistence exists
whether citations exist
whether context resolution exists
whether current module context exists
whether user/project permission filtering exists
```

Gaps SHALL be explicitly documented.

---

# 10. Target Information Architecture

Recommended primary navigation:

```text
Overview
Project Twin
Intelligence
Evidence
Presentations
Data Room
Files
Administration
```

AI SHALL be globally reachable via:

```text
Ask Copilot
⌘K / Ctrl+K
```

---

# 11. Premium Shell

Required:

```text
Top Product Bar
Context Sidebar
Primary Content Surface
Optional Intelligence Rail / Copilot Panel
Global Command Center
```

---

# 12. Top Product Bar

At minimum:

```text
Venture Hub OS identity
Organization context
Project selector
Global search
Ask Copilot
User/account controls
```

---

# 13. Context Sidebar

Must support:

```text
Overview
Project Twin
Intelligence
Evidence
Presentations
Data Room
Files
Administration
```

The sidebar must be collapsible and responsive.

---

# 14. Global Command Center

Keyboard:

```text
⌘K
Ctrl+K
```

Must support:

```text
Navigate
Search project
Search claim
Search evidence
Search document
Ask Copilot
Open presentation
Open administration
```

---

# 15. Design System V2

Create:

```text
src/ui/design-system/
```

Substructure:

```text
tokens/
primitives/
components/
patterns/
motion/
icons/
```

---

# 16. Design Tokens

Required token categories:

```text
color
typography
spacing
radius
shadow
blur
motion
surface
border
state
z-index
```

Hard-coded visual values SHALL be minimized.

---

# 17. Visual Direction

Direction:

```text
premium
minimal
executive
modern
high whitespace
low visual noise
subtle depth
restrained motion
strong typography
```

Inspired by modern Apple-like product principles without copying proprietary UI, assets, or layouts.

---

# 18. Light Mode

Recommended characteristics:

```text
near-white canvas
white / translucent surfaces
near-black primary text
neutral gray secondary text
very subtle borders
single controlled accent
muted semantic states
```

---

# 19. Dark Mode

Must be intentionally designed.

Required:

```text
dark neutral canvas
layered dark surfaces
clear text hierarchy
subtle borders
controlled accent
accessible contrast
```

No naive color inversion.

---

# 20. Typography

Establish semantic styles:

```text
Display
Page Title
Section Title
Card Title
Body
Secondary Body
Metadata
Numeric / Metric
Code / Identifier
```

---

# 21. Motion

Motion duration target:

```text
150–250 ms
```

Preferred:

```text
fade
soft scale
slide
shared layout transition
```

Respect:

```text
prefers-reduced-motion
```

---

# 22. Core UI Primitives

At minimum:

```text
Button
IconButton
Input
Textarea
Select
SegmentedControl
Badge
Chip
Card
Surface
Dialog
Sheet
Popover
Tooltip
Tabs
CommandPalette
Skeleton
Toast
Divider
```

---

# 23. Product Patterns

At minimum:

```text
PageHeader
ProjectSwitcher
ContextSidebar
MetricCard
InsightCard
RiskIndicator
SourceChip
CopilotMessage
CopilotComposer
ActivityTimeline
EvidenceRow
EmptyState
SectionNavigator
```

---

# 24. Mandatory Redesigned Screens

Required:

```text
01 Login
02 Organization Home
03 Project Overview
04 Project Twin
05 Copilot Workspace
06 Claims & Evidence
07 Data Room
08 Presentation Workspace
09 Presenter
10 Administration
```

These ten screens must be visibly redesigned.

---

# 25. Visible Change Gate

Phase 013 SHALL fail if:

```text
the primary UI remains materially indistinguishable from v1.0.0
```

Required human-facing conclusion:

```text
VISIBLE PRODUCT CHANGE = YES
```

---

# 26. Organization Home V2

Should show:

```text
portfolio summary
active projects
critical risks
diligence gaps
pending decisions
recent activity
AI-generated project insights
```

No opaque AI score.

---

# 27. Project Overview V2

This becomes the most important project page.

At minimum:

```text
Project identity
Lifecycle status
Executive summary
Key signals
Critical unsupported claims
Diligence gaps
Material risks
Narrative readiness
Presentation readiness
Recent changes
Priority actions
Ask Copilot
```

---

# 28. Explainable Indicators

Every indicator must be traceable.

Examples:

```text
3 unsupported critical claims
2 missing diligence documents
1 high materiality risk
4 recently changed sections
```

Clicking should navigate to supporting entities.

---

# 29. Project Twin V2

Recommended layout:

```text
Left:
section navigation

Center:
section content

Right:
intelligence context
claims
evidence
copilot
```

---

# 30. Claims & Evidence V2

Each Claim should clearly display:

```text
Claim text
Type
Materiality
Support
Review
Evidence count
Contradictions
```

---

# 31. Evidence Lineage

Visual relationship:

```text
Claim
  ↓
Evidence Link
  ↓
Evidence
  ↓
Source / Provenance
```

This relationship must be understandable without reading technical documentation.

---

# 32. Data Room V2

At minimum:

```text
Readiness
Open requests
Missing documents
Expiring documents
Recently added
Categories
Confidentiality
Ask Copilot
```

---

# 33. Presentation Workspace V2

Flow:

```text
Audience
Objective
Duration
Narrative Preview
Presentation Preview
Present
```

Copilot actions:

```text
Improve narrative
Find weak claims
Prepare investor objections
Prepare Q&A
```

---

# 34. Presenter V2

Full-screen polished execution surface:

```text
current slide
next slide
speaker notes
timer
pace
trust alerts
Q&A
```

Audience view must remain clean.

---

# 35. Project Copilot

Create two surfaces:

```text
Copilot Workspace
Copilot Side Panel
```

---

# 36. Copilot Workspace

Full page for project conversation.

Required:

```text
Conversation history
Prompt composer
Mode selector
Suggested prompts
Grounded answer
Source panel
Suggested actions
Follow-up prompts
```

---

# 37. Copilot Side Panel

Available contextually from:

```text
Project Overview
Project Twin
Claims
Evidence
Data Room
Presentation
Administration
```

---

# 38. Copilot Modes

Required:

```text
EXECUTIVE
ANALYST
INVESTOR
DUE_DILIGENCE
PRESENTER
```

---

# 39. Mode Behavior

## EXECUTIVE

Focus:

```text
summary
decision
priority
risk
impact
```

## ANALYST

Focus:

```text
details
dependencies
claims
evidence
contradictions
```

## INVESTOR

Focus:

```text
problem
market
traction
economics
risk
ask
```

## DUE_DILIGENCE

Focus:

```text
missing documents
gaps
freshness
evidence
risk
```

## PRESENTER

Focus:

```text
story
talking points
objections
transitions
Q&A
```

---

# 40. Copilot Domain Entities

Recommended:

```ts
type CopilotMode =
  | 'EXECUTIVE'
  | 'ANALYST'
  | 'INVESTOR'
  | 'DUE_DILIGENCE'
  | 'PRESENTER';

interface CopilotConversation {
  id: string;
  organizationId: string;
  projectId: string;
  userId: string;
  mode: CopilotMode;
  createdAt: string;
  updatedAt: string;
}

interface CopilotMessage {
  id: string;
  conversationId: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  createdAt: string;
}

interface CopilotSourceRef {
  sourceType: string;
  sourceId: string;
  label: string;
  navigationTarget?: string;
}
```

---

# 41. Query Context

Required:

```ts
interface CopilotQueryContext {
  organizationId: string;
  projectId: string;
  userId: string;
  currentModule?: string;
  selectedEntityId?: string;
  conversationId?: string;
}
```

---

# 42. Application Services

Recommended:

```text
AskProjectCopilot
ResolveCopilotContext
RetrieveProjectIntelligence
GroundCopilotResponse
MapCopilotSources
CreateCopilotProposal
```

---

# 43. Ports

Recommended:

```text
CopilotRetrievalPort
AiModelPort
ConversationRepository
CopilotAuditPort
ClockPort
```

---

# 44. Adapters

Recommended:

```text
ProjectTwinRetrievalAdapter
ClaimsEvidenceRetrievalAdapter
DataRoomRetrievalAdapter
PresentationRetrievalAdapter
AdministrationRetrievalAdapter
OpenAiModelAdapter
OllamaModelAdapter
FirestoreConversationRepository
```

Provider SDKs SHALL NOT enter Domain.

---

# 45. Copilot Request Flow

Required:

```text
User Question
      ↓
Resolve Context
      ↓
Authorization Filter
      ↓
Retrieve Authorized Project Intelligence
      ↓
Build Context Pack
      ↓
AI Provider
      ↓
Ground Response
      ↓
Map Sources
      ↓
Render Answer
```

---

# 46. Grounding Hierarchy

Prefer:

```text
1. Project Twin
2. Claims
3. Evidence
4. Data Room
5. Approved project metadata
6. Narrative
7. Presentation
```

Derived content cannot override canonical truth.

---

# 47. Grounding States

Use:

```text
GROUNDED
PARTIALLY_GROUNDED
INSUFFICIENT_PROJECT_EVIDENCE
```

No opaque confidence percentages.

---

# 48. Insufficient Evidence Behavior

When project evidence is insufficient:

```text
INSUFFICIENT_PROJECT_EVIDENCE
```

The UI should explain:

```text
what information is missing
where to add it
which project module should be reviewed
```

No hallucinated project facts.

---

# 49. Source Citations

Every material factual answer should expose supporting refs when available.

Example:

```text
Sources
• Project Twin / MARKET
• Claim CL-17
• Evidence E-09
• Data Room Request DR-04
```

---

# 50. Clickable Sources

Each source chip should navigate to the original project entity.

Required:

```text
source type
source id
source label
navigation target
```

---

# 51. Suggested Actions

AI may suggest:

```text
Open Claim
Open Evidence
Open Data Room Request
Open Presentation
Create Draft Proposal
Generate Narrative Proposal
```

But action execution requires explicit user interaction.

---

# 52. No Silent Mutation

Forbidden:

```text
AI response
    ↓
automatic canonical write
```

Required:

```text
AI proposal
    ↓
user review
    ↓
explicit action
    ↓
authorization
    ↓
application service
```

---

# 53. Conversation Memory

Allow:

```text
conversation memory
project-scoped context
```

Forbidden:

```text
unrestricted cross-project memory
cross-org memory mixing
secret persistence
```

---

# 54. Conversation Persistence

Recommended fields:

```text
Conversation
Messages
SourceRefs
SuggestedActions
Mode
```

No AI API keys stored.

---

# 55. Retrieval Strategy — MVP

First implementation should use structured domain retrieval:

```text
typed project data
section-aware search
claim/evidence graph traversal
document metadata retrieval
exact entity lookup
```

Avoid unnecessary external vector infrastructure in the MVP.

---

# 56. Semantic Retrieval — Optional

If justified:

```text
EmbeddingPort
VectorIndexPort
```

must be adapters.

No vendor lock-in in Domain/Application.

---

# 57. Prompt Injection Defense

Project and document content is untrusted context.

Required separation:

```text
system policy
user instruction
authorized context
untrusted document/project text
```

Project content must not override AI security rules.

---

# 58. Security Threats

Add:

```text
T-69 Cross-Tenant AI Retrieval
T-70 Prompt Injection Through Project Content
T-71 AI Hallucinated Project Fact
T-72 AI Canonical Auto-Write
T-73 AI Citation Mismatch
T-74 Conversation Secret Persistence
T-75 Sensitive Context Leakage
T-76 UI Redesign Authorization Regression
T-77 Visual Redesign Hides Trust Warnings
T-78 Copilot Action Executes Without Confirmation
```

---

# 59. Threat Acceptance

Each T-69..T-78 must have:

```text
attack/failure path
control
test
evidence
residual risk
```

---

# 60. Copilot Acceptance Matrix

Mandatory:

```text
AI-01 Ask project summary                    PASS
AI-02 Ask project risks                      PASS
AI-03 Ask unsupported claims                 PASS
AI-04 Ask claim evidence                     PASS
AI-05 Ask diligence gaps                     PASS
AI-06 Ask investor summary                   PASS
AI-07 Ask presentation Q&A                   PASS
AI-08 Insufficient evidence behavior         PASS
AI-09 Unauthorized source blocked            PASS
AI-10 Source citations clickable             PASS
AI-11 Canonical mutation from chat           0
AI-12 Secret persistence                     0
```

Required:

```text
12/12 PASS
```

---

# 61. Contextual Copilot Matrix

Required contexts:

```text
Project Overview
Project Twin
Claims
Evidence
Data Room
Presentation
Administration
```

Each:

```text
context detected
correct project
correct organization
correct selected entity when applicable
correct permission filtering
```

---

# 62. Security Negative Matrix

Required:

```text
Cross-org retrieval                    DENY PASS
Cross-project retrieval                DENY PASS
Unauthorized secure file retrieval     DENY PASS
Suspended membership retrieval         DENY PASS
Unauthorized admin context retrieval   DENY PASS
```

---

# 63. Hallucination Tests

Create intentionally unanswerable project questions.

Expected:

```text
INSUFFICIENT_PROJECT_EVIDENCE
```

Invented facts:

```text
0
```

---

# 64. AI Response UX

Each response may contain:

```text
Answer
Grounding status
Sources
Related entities
Suggested actions
Follow-up prompts
```

Avoid giant unstructured paragraphs.

---

# 65. Streaming

Recommended.

Show only high-level activity such as:

```text
Reading Project Twin
Reviewing Claims
Checking Evidence
```

Never expose hidden chain-of-thought.

---

# 66. AI Latency UX Target

Targets:

```text
interaction acknowledgement <= 500 ms
retrieval progress visible
first useful streamed content target <= 2.5 s
```

External provider latency should be reported separately.

---

# 67. Accessibility

Mandatory:

```text
keyboard navigation
visible focus
semantic landmarks
accessible names
dialog focus management
contrast
reduced motion
screen-reader meaningful states
```

---

# 68. Responsive Requirements

Breakpoints must cover:

```text
desktop
tablet
mobile
```

Mobile priority:

```text
read
ask
review
navigate
```

---

# 69. Visual Baseline Matrix

Mandatory baseline screenshots:

## Desktop

```text
V-01 Login
V-02 Organization Home
V-03 Project Overview
V-04 Project Twin
V-05 Copilot Workspace
V-06 Claims & Evidence
V-07 Data Room
V-08 Presentation
V-09 Presenter
V-10 Administration
```

Required:

```text
10/10
```

## Mobile

At minimum:

```text
M-01 Organization Home
M-02 Project Overview
M-03 Project Twin
M-04 Copilot
M-05 Data Room
M-06 Presenter
```

Required:

```text
6/6
```

---

# 70. Premium UX Acceptance Matrix

Required:

```text
UX-01 New navigation shell                  PASS
UX-02 Global Command Center                 PASS
UX-03 Organization Home redesign            PASS
UX-04 Project Overview redesign             PASS
UX-05 Project Twin redesign                 PASS
UX-06 Claims/Evidence redesign              PASS
UX-07 Data Room redesign                    PASS
UX-08 Presentation redesign                 PASS
UX-09 Presenter redesign                    PASS
UX-10 Administration migration              PASS
UX-11 Light mode                            PASS
UX-12 Dark mode                             PASS
UX-13 Responsive behavior                   PASS
UX-14 Reduced motion                        PASS
UX-15 Visible change from v1.0.0            PASS
```

Required:

```text
15/15 PASS
```

---

# 71. Visual Change Report

Create:

```text
docs/evidence/VISUAL_CHANGE_REPORT.md
```

Must compare:

```text
v1.0.0 baseline
vs
Phase 013 candidate
```

For each major screen:

```text
what changed
why it changed
what user benefit it creates
```

---

# 72. Human Visible-Change Gate

Final report must explicitly ask:

```text
Can a user immediately perceive that this is a substantially redesigned product?
```

Required:

```text
YES
```

---

# 73. Performance Budgets

The redesign SHALL NOT materially regress production performance.

At minimum track:

```text
JS bundle gzip
CSS bundle gzip
LCP
INP
CLS
Project Overview interactive time
Copilot open time
```

---

# 74. Design Performance Rule

Premium UI SHALL NOT be achieved through:

```text
large decorative video backgrounds
massive image payloads
unbounded blur layers
excessive animation libraries
```

---

# 75. Legacy Preservation

All previously approved capabilities must remain functional.

Required regression:

```text
Phase 012 Final Acceptance              PASS
Phase 011 Production Hardening          PASS
Phase 010 Administration                PASS
Phase 009 Secure Storage                PASS
Phase 008 Security                      PASS
Phase 007 Data Room                     PASS
Phase 006 AI Copilot                    PASS
Phase 005 Presenter                     PASS
Phase 004 Presentation                  PASS
Phase 003 Claims/Evidence               PASS
Phase 002 Narrative                     PASS
Phase 001 Project Twin                  PASS
Phase 000A Foundation                   PASS
Phase 0 Legacy                          45/45 PASS
```

---

# 76. Architecture Gate

Required:

```text
Architecture violations = 0
```

---

# 77. Canonical Mutation Gate

Required:

```text
Unauthorized Project Twin mutations    0
Unauthorized Claim mutations           0
Unauthorized Evidence mutations        0
```

---

# 78. Secret Gate

Required:

```text
AI provider keys in repository        0
AI provider keys in browser storage   0
AI provider keys in logs              0
AI provider keys in URL               0
AI provider keys in conversation      0
```

---

# 79. New Documentation

Create:

```text
docs/ai/COPILOT_ARCHITECTURE.md
docs/ai/COPILOT_GROUNDING_POLICY.md
docs/ai/COPILOT_AUTHORIZATION_POLICY.md
docs/ai/COPILOT_CITATION_MODEL.md
docs/ai/COPILOT_PROMPT_INJECTION_DEFENSE.md

docs/design/DESIGN_SYSTEM_V2.md
docs/design/VISUAL_LANGUAGE.md
docs/design/MOTION_SYSTEM.md
docs/design/RESPONSIVE_STRATEGY.md
docs/design/COPILOT_INTERACTION_MODEL.md
```

---

# 80. Evidence Package

Create:

```text
docs/evidence/PHASE_013_ACCEPTANCE_REPORT.md
docs/evidence/SPEC_013_TRACEABILITY_MATRIX.md
docs/evidence/AI_COPILOT_ACCEPTANCE_MATRIX.md
docs/evidence/PREMIUM_UX_ACCEPTANCE_MATRIX.md
docs/evidence/VISUAL_CHANGE_REPORT.md
docs/evidence/PHASE_013_RESIDUAL_RISK_REGISTER.md
```

---

# 81. Phase 013 Severity Model

Use:

```text
P0 = blocker
P1 = must fix before release
P2 = non-blocking backlog
```

Do not create endless documentary loops for P2 findings.

---

# 82. Forbidden Scope

Phase 013 SHALL NOT include:

```text
billing
subscriptions
payments
marketplace
autonomous agents
automatic investment decisions
automatic legal/compliance conclusions
anonymous public chat
anonymous public file sharing
unbounded external web research
AI role assignment
AI ownership transfer
automatic canonical edits
large backend redesign
```

---

# 83. Work Breakdown — Discovery

### T-013-001
Create current UI inventory.

### T-013-002
Create current AI capability inventory.

### T-013-003
Create current navigation map.

### T-013-004
Create current design-token inventory.

### T-013-005
Create gap analysis.

---

# 84. Work Breakdown — Design System

### T-013-101
Create Design System V2 tokens.

### T-013-102
Create typography system.

### T-013-103
Create surface system.

### T-013-104
Create motion system.

### T-013-105
Create responsive system.

### T-013-106
Create core primitives.

### T-013-107
Create product patterns.

---

# 85. Work Breakdown — Navigation

### T-013-201
Create Top Product Bar.

### T-013-202
Create Context Sidebar.

### T-013-203
Create Global Command Center.

### T-013-204
Create project switcher.

### T-013-205
Create responsive shell.

---

# 86. Work Breakdown — Primary Screens

### T-013-301
Redesign Login.

### T-013-302
Redesign Organization Home.

### T-013-303
Redesign Project Overview.

### T-013-304
Redesign Project Twin.

### T-013-305
Redesign Claims & Evidence.

### T-013-306
Redesign Data Room.

### T-013-307
Redesign Presentation Workspace.

### T-013-308
Redesign Presenter.

### T-013-309
Migrate Administration.

---

# 87. Work Breakdown — Copilot Architecture

### T-013-401
Create Copilot domain types.

### T-013-402
Create CopilotContextResolver.

### T-013-403
Create CopilotRetrievalPort.

### T-013-404
Create authorization filtering.

### T-013-405
Create Project Twin retrieval adapter.

### T-013-406
Create Claims/Evidence retrieval adapter.

### T-013-407
Create Data Room retrieval adapter.

### T-013-408
Create Presentation retrieval adapter.

### T-013-409
Create Administration retrieval adapter.

---

# 88. Work Breakdown — Copilot UX

### T-013-501
Create Copilot Workspace.

### T-013-502
Create Copilot Side Panel.

### T-013-503
Create mode selector.

### T-013-504
Create prompt chips.

### T-013-505
Create streaming response UI.

### T-013-506
Create source chips.

### T-013-507
Create source panel.

### T-013-508
Create suggested actions.

### T-013-509
Create follow-up prompts.

---

# 89. Work Breakdown — Grounding

### T-013-601
Implement grounding hierarchy.

### T-013-602
Implement grounding state.

### T-013-603
Implement insufficient-evidence response.

### T-013-604
Implement citation mapping.

### T-013-605
Implement entity navigation.

### T-013-606
Implement prompt-injection separation.

---

# 90. Work Breakdown — Security

### T-013-701
Implement T-69 controls.

### T-013-702
Implement T-70 controls.

### T-013-703
Implement T-71 controls.

### T-013-704
Implement T-72 controls.

### T-013-705
Implement T-73 controls.

### T-013-706
Implement T-74 controls.

### T-013-707
Implement T-75 controls.

### T-013-708
Implement T-76 controls.

### T-013-709
Implement T-77 controls.

### T-013-710
Implement T-78 controls.

---

# 91. Work Breakdown — Acceptance

### T-013-801
Run AI acceptance 12/12.

### T-013-802
Run premium UX acceptance 15/15.

### T-013-803
Capture desktop visual baselines 10/10.

### T-013-804
Capture mobile visual baselines 6/6.

### T-013-805
Run accessibility smoke.

### T-013-806
Run performance budgets.

### T-013-807
Run architecture tests.

### T-013-808
Run full regression.

### T-013-809
Verify secret gates.

### T-013-810
Generate final Phase 013 evidence.

---

# 92. Implementation Order

Recommended:

```text
1. Discovery
2. Information Architecture
3. Design System V2
4. Premium Shell
5. Project Overview
6. Copilot Architecture
7. Grounded Retrieval
8. Copilot Workspace
9. Contextual Side Panel
10. Claims/Evidence
11. Data Room
12. Presentation/Presenter
13. Administration
14. Visual acceptance
15. AI acceptance
16. Regression
```

---

# 93. Do Not Start With

Forbidden initial implementation approach:

```text
random CSS edits
generic floating chatbot
large UI rewrite without inventory
direct provider SDK in UI
vector database before structured retrieval is assessed
automatic AI mutations
```

---

# 94. Required First Antigravity Response

Before implementation, Antigravity SHALL return:

```text
PHASE 013 DISCOVERY & IMPLEMENTATION PLAN
```

containing:

```text
1. Existing UI inventory
2. Existing AI inventory
3. Gap analysis
4. Target information architecture
5. Target navigation
6. Design System V2 architecture
7. Copilot architecture
8. Retrieval architecture
9. Authorization model
10. Conversation model
11. Screen migration order
12. Threat model T-69..T-78
13. AI acceptance plan
14. Visual acceptance plan
15. Work breakdown / dependency graph
```

---

# 95. Approval Gate Before Coding

Antigravity SHALL NOT begin broad Phase 013 implementation until the human owner approves the Discovery & Implementation Plan.

Allowed before approval:

```text
inventory
analysis
architecture proposal
design proposal
acceptance planning
```

Not allowed:

```text
large production code implementation
```

---

# 96. SDD Lifecycle

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

Only human owner closes.

---

# 97. Expected End State

```text
Venture Hub OS
     │
     ├── Premium visual system
     ├── New navigation shell
     ├── Executive project overview
     ├── Grounded Project Copilot
     ├── Contextual AI panel
     ├── Clickable source citations
     ├── Explainable project signals
     ├── Premium Claims/Evidence
     ├── Premium Data Room
     ├── Premium Presentation/Presenter
     └── Existing security + canonical guarantees preserved
```

---

# 98. Final Phase 013 Acceptance

Required:

```text
AI Acceptance                   12/12 PASS
Premium UX Acceptance           15/15 PASS
Desktop Visual Baselines        10/10
Mobile Visual Baselines         6/6
Visible Product Change          YES

Cross-org AI leaks              0
Cross-project AI leaks          0
Hallucinated project facts      0 in mandatory negative suite
Canonical auto-writes           0
Secret persistence              0
Architecture violations         0

Phase 012..000A regressions      PASS
Phase 0 Legacy                  45/45 PASS
```

---

# 99. Release Recommendation

Phase 013 candidate version:

```text
v1.1.0-RC1
```

Recommended final version:

```text
v1.1.0
```

If visual architecture changes become materially incompatible with prior workflows, a later human decision may promote this work to:

```text
v2.0.0
```

No automatic major-version decision.

---

# 100. Human Approval Language

If the Discovery & Implementation Plan is acceptable, the human owner may state:

> **Apruebo formalmente SPEC-013 — Conversational Intelligence & Premium Experience y autorizo el inicio de la implementación de VHOS-PHASE-013 sobre una línea de evolución posterior a v1.0.0, preservando v1.0.0 como baseline inmutable. Autorizo el desarrollo coordinado del Grounded Project Copilot, Design System V2, navegación premium, rediseño de las superficies principales y las matrices de seguridad, IA, visual y regresión definidas en SPEC-013. La IA deberá respetar en todo momento `AI OUTPUT != PROJECT TRUTH` y `COPILOT ACCESS <= USER ACCESS`, y ninguna mutación canónica podrá ejecutarse sin autorización explícita a través de los servicios de aplicación existentes.**

---

# 101. Master Instruction to Antigravity

```text
SPEC-013 is DRAFT_FOR_APPROVAL.

Do not implement broadly yet.

First produce:
PHASE 013 DISCOVERY & IMPLEMENTATION PLAN

Use v1.0.0 as immutable baseline.

Prioritize:
1. Grounded Project Copilot
2. Premium Product Experience
3. Visible user value

Do not add:
billing
autonomous agents
automatic canonical mutations
unbounded external web research

The phase must create a materially different user experience.

AI OUTPUT != PROJECT TRUTH
COPILOT ACCESS <= USER ACCESS
```
