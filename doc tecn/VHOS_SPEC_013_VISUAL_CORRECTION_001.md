# Venture Hub OS — SPEC-013 Visual Experience Correction Directive
## Workspace Premium Redesign / Presentation Mode Separation

**Document ID:** `VHOS_SPEC_013_VISUAL_CORRECTION_001`  
**Phase:** `VHOS-PHASE-013 — Conversational Intelligence & Premium Experience`  
**Status:** `REQUIRED BEFORE HUMAN DESIGN APPROVAL`  
**Baseline:** `v1.0.0` remains immutable  
**Scope:** Visual/Product Experience correction only  
**No new business features**

---

# 1. Human Owner Decision

The human owner has established the following product-design direction:

> **Mantener el Presentation/Presenter Mode como una experiencia cinematográfica independiente, pero rediseñar completamente el Workspace principal de Venture Hub OS. El Home, Project Overview, Project Twin, Data Room y Copilot no deben reutilizar el lenguaje visual del deck. Deben adoptar una interfaz premium minimalista, clara, con mayor whitespace, menor densidad, tipografía sans, navegación limpia y el Project Copilot como elemento central de interacción.**

This decision is now a mandatory Phase 013 visual acceptance requirement.

---

# 2. Core Separation Principle

Venture Hub OS SHALL contain two intentionally different experience layers:

```text
A. PRODUCT WORKSPACE
   Premium
   Minimal
   Intelligent
   Calm
   Clear
   Operational

B. PRESENTATION / PRESENTER MODE
   Cinematic
   Story-driven
   Immersive
   High-contrast
   Visual
   Full-screen
```

These two layers SHALL NOT share the same primary visual language.

---

# 3. Presentation / Presenter Mode

The current cinematic direction may remain.

It may continue using:

```text
dark environments
photographic backgrounds
brand atmosphere
high contrast
presentation-specific typography
immersive compositions
storytelling layouts
fullscreen behavior
```

This surface is intended for:

```text
investor meetings
executive briefings
board presentations
sales/pitch situations
presenter execution
```

---

# 4. Presentation Mode Refinement

Even when preserving the cinematic language, reduce unnecessary interface chrome.

Recommended:

```text
minimal top controls
progress
audience/profile
time
notes toggle
fullscreen
```

Secondary controls should appear contextually or on interaction.

Do not let presenter controls compete with slide content.

---

# 5. Workspace Must Be Visually Independent

The following SHALL NOT look like presentation slides:

```text
Organization Home
Project Overview
Project Twin
Copilot Workspace
Claims & Evidence
Data Room
Files
Administration
```

Do not reuse:

```text
cinematic hero images
presentation-style full-screen backgrounds
heavy neon borders
deck typography
large decorative branding
pitch-slide compositions
excessive pill controls
```

inside normal workspace surfaces.

---

# 6. Workspace Visual Direction

Target:

```text
premium
minimal
clean
executive
product-oriented
high whitespace
low visual noise
clear information hierarchy
subtle depth
precise typography
quiet motion
```

Reference philosophy:

```text
modern Apple-like product restraint
+
enterprise SaaS clarity
+
intelligence-first interaction
```

Do not copy proprietary Apple screens or assets.

---

# 7. Workspace Background

Prefer:

```text
light neutral canvas
soft gray/white surfaces
very restrained dark mode
```

Avoid making the entire product permanently dark.

Dark mode may exist, but the main design language should remain calm and readable.

---

# 8. Typography

Workspace typography SHALL be sans-serif.

Use semantic hierarchy:

```text
Display
Page Title
Section Title
Card Title
Body
Metadata
Metric
Code/Identifier
```

Avoid serif display typography inside the operational workspace.

Serif may remain in Presentation Mode where editorial storytelling benefits from it.

---

# 9. Whitespace

Increase spacing substantially.

Required behavior:

```text
fewer competing cards
larger section separation
larger page margins
clear grouping
breathing room around metrics
fewer visible controls at once
```

---

# 10. Information Density

Reduce density.

Do not display every possible metric simultaneously.

Use progressive disclosure:

```text
summary
   ↓
detail on demand
```

---

# 11. Navigation

Workspace navigation should be simple and predictable.

Recommended shell:

```text
Top Product Bar
+
Context Sidebar
+
Primary Content Area
+
Optional Copilot Intelligence Panel
```

Primary navigation:

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

---

# 12. Project Copilot Must Be Central

The Copilot must not feel like an accessory.

It should be a primary interaction model.

Global entry points:

```text
Ask Copilot
⌘K / Ctrl+K
Copilot Workspace
Contextual Copilot Side Panel
```

---

# 13. Organization Home — Required Redesign

The Home should no longer behave like a presentation cover.

Recommended structure:

```text
Good evening

Your ventures

[ Active Projects ]
[ Critical Risks ]
[ Diligence Gaps ]
[ Pending Decisions ]

Recent Projects

AI Insights

Recent Activity

Ask Venture Hub
[ What should I review today? ]
```

---

# 14. Project Overview — Required Redesign

This becomes the main intelligence cockpit.

Recommended:

```text
Project name
Lifecycle
Executive summary

Key Signals
- Critical unsupported claims
- Diligence gaps
- Material risks
- Narrative readiness
- Presentation readiness

Priority Actions

Recent Changes

Ask Copilot
```

---

# 15. Project Twin — Required Redesign

Recommended 3-column workspace:

```text
LEFT
Section navigation

CENTER
Canonical project content

RIGHT
Intelligence
Claims
Evidence
Copilot
```

The right side should be contextual, not permanently overloaded.

---

# 16. Data Room — Required Redesign

Data Room should look like a diligence workspace, not a deck.

Recommended:

```text
Readiness
Open Requests
Missing Documents
Expiring
Recently Added
Categories
Confidentiality
```

Copilot prompt:

```text
What is blocking diligence readiness?
```

---

# 17. Copilot Workspace — Required Redesign

The Copilot page should become one of the most refined screens in the product.

Recommended:

```text
Ask anything about this project

[ Prompt Composer ]

Suggested:
• Summarize this project
• Show critical risks
• Find unsupported claims
• What changed?
• Prepare investor briefing
```

Response structure:

```text
Answer

Grounding Status

Sources
• Project Twin / RISKS
• Claim CL-17
• Evidence E-09

Related Actions
→ Open Claim
→ View Evidence

Follow-up
```

---

# 18. Claims & Evidence — Required Redesign

Each claim should show clearly:

```text
Claim
Type
Materiality
Support
Review
Evidence count
Contradictions
```

Use restrained semantic colors.

Avoid visually loud badges everywhere.

---

# 19. Evidence Lineage

Create clean relationship view:

```text
Claim
  ↓
Evidence Link
  ↓
Evidence
  ↓
Source
```

This should feel analytical, not decorative.

---

# 20. Administration

Administration should remain utilitarian but visually aligned with the premium workspace.

Avoid cinematic treatment.

Prioritize:

```text
clarity
tables
filters
roles
ownership
health
audit
```

---

# 21. Cards & Surfaces

Workspace cards:

```text
subtle surface
minimal border
large radius
little/no shadow
clear spacing
low contrast
```

Avoid heavy glow or neon borders.

---

# 22. Color Strategy

Workspace:

```text
neutral canvas
black/dark text
soft neutral secondary text
one primary accent
restrained semantic colors
```

Presentation:

```text
may use cinematic brand colors
```

This separation is intentional.

---

# 23. Dark Mode

Workspace dark mode should use:

```text
neutral charcoal
layered surfaces
subtle borders
clear contrast
minimal glow
```

Do not reuse cinematic neon presentation styling.

---

# 24. Interaction Philosophy

Workspace:

```text
quiet
precise
immediate
predictable
```

Presentation:

```text
immersive
dramatic
story-driven
```

---

# 25. Motion

Workspace:

```text
150–250ms
fade
soft slide
small scale
layout transition
```

Presentation can use slightly richer transitions where appropriate.

---

# 26. Human Design Acceptance Questions

Before Phase 013 can be closed, the human owner should answer YES to:

```text
Does Home feel like a product workspace rather than a slide?
Does Project Overview feel like an intelligence cockpit?
Is Project Twin easy to read and navigate?
Is Data Room visually distinct from Presentation Mode?
Is Copilot visually central?
Is the interface less dense?
Is there substantially more whitespace?
Is typography cleaner and sans-serif?
Is navigation simpler?
Does Venture Hub OS now feel like a premium intelligent product?
```

---

# 27. Mandatory Screens for Human Review

Provide actual screenshots for:

```text
01 Organization Home
02 Project Overview
03 Project Twin
04 Copilot Workspace
05 Data Room
06 Claims & Evidence
07 Administration
```

And separately:

```text
08 Presentation Mode
09 Presenter Mode
```

The comparison should visibly demonstrate the intentional separation.

---

# 28. Required Visual Comparison

Create:

```text
docs/evidence/WORKSPACE_VS_PRESENTATION_VISUAL_SEPARATION.md
```

For each category:

```text
Workspace
Presentation
Reason for difference
```

Compare:

```text
background
typography
color
density
navigation
motion
branding
cards
controls
imagery
```

---

# 29. Visual Acceptance Gate

Required:

```text
WORKSPACE / PRESENTATION VISUAL SEPARATION    PASS
```

Also:

```text
Home no longer looks like presentation        PASS
Project Overview product-oriented              PASS
Project Twin product-oriented                  PASS
Data Room product-oriented                     PASS
Copilot central                                PASS
Presentation cinematic preserved               PASS
Presenter cinematic preserved                  PASS
```

---

# 30. No Fake Redesign Rule

The correction SHALL NOT be considered complete if it only changes:

```text
colors
border radius
icons
background shades
```

while keeping the same presentation-oriented structure.

A structural UX change is required.

---

# 31. No New Feature Rule

Do not add new business features.

Allowed:

```text
layout changes
design-system adjustments
navigation refinement
visual hierarchy
Copilot prominence
responsive changes
presentation chrome reduction
```

Forbidden:

```text
new product modules
billing
new AI capabilities
new canonical data model
new backend architecture
```

---

# 32. Regression Protection

Maintain:

```text
AI Acceptance 12/12                  PASS
Premium UX functional gates          PASS
Security T-69..T-78                  PASS
Architecture violations              0
Phase 012..000A regression            PASS
Legacy 45/45                          PASS
```

---

# 33. Implementation Priority

Execute in this order:

```text
1. Workspace shell
2. Organization Home
3. Project Overview
4. Copilot Workspace
5. Project Twin
6. Data Room
7. Claims & Evidence
8. Administration
9. Presentation chrome refinement
10. Human visual comparison
```

---

# 34. Final Antigravity Instruction

```text
Do not redesign Presentation Mode into a SaaS dashboard.

Do not redesign Workspace into a cinematic deck.

Maintain deliberate separation.

Workspace = premium intelligent product.
Presentation = cinematic storytelling environment.

Copilot must be central to Workspace.

Human visual approval is mandatory before Phase 013 closure.
```

---

# 35. Expected Final Outcome

```text
VENTURE HUB OS

WORKSPACE
Premium
Minimal
AI-first
Executive
Calm
Clear

          +

PRESENTATION / PRESENTER
Cinematic
Immersive
High-impact
Story-driven

          =

One product
Two intentional experience modes
```
