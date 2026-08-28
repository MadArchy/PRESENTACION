# Workspace vs Presentation Visual Separation Architecture

**Document ID:** `WORKSPACE_VS_PRESENTATION_VISUAL_SEPARATION`  
**Specification:** `SPEC-013 Visual Experience Correction Directive (VHOS_SPEC_013_VISUAL_CORRECTION_001)`  
**Status:** `VERIFIED_PASS`  
**Principle:** One Product — Two Intentional Experience Modes  

---

## 1. Architectural Philosophy

Venture Hub OS strictly divides its user experience into two purpose-built layers:

```text
┌──────────────────────────────────────────────┐
│            PRODUCT WORKSPACE                 │
│  • Premium & Minimal Executive SaaS          │
│  • Clean Sans-Serif Typography               │
│  • High Whitespace & Calm Information Flow   │
│  • Copilot Intelligence as Central Hub       │
│  • Operational Cockpits & Diligence Rails    │
└──────────────────────┬───────────────────────┘
                       │ Launch Presentation Deck
                       ▼
┌──────────────────────────────────────────────┐
│        PRESENTATION & PRESENTER MODE         │
│  • Cinematic & High-Contrast Visuals         │
│  • Immersive Photographic Backdrops          │
│  • Storytelling Compositions & Video Theater │
│  • Distraction-Free Minimalist Chrome        │
│  • Fullscreen Execution for Pitches & Boards │
└──────────────────────────────────────────────┘
```

---

## 2. Dimensional Comparison Matrix

| Dimension | Product Workspace Layer | Presentation / Presenter Mode Layer | Rationale for Intentional Separation |
|---|---|---|---|
| **Primary Goal** | High-efficiency analysis, diligence management, editing, governance, and AI questioning | High-impact storytelling, investor pitching, executive briefings, and board reviews | Workspace demands cognitive calm and speed; Presentation demands emotional engagement and visual drama. |
| **Background & Atmosphere** | Light neutral canvas (`#F8FAFC`) / layered deep slate neutrals (`#0B0F17`, `#161F2E`). Zero photo noise. | Atmospheric photographic scenes (`bg-arcana-chain.jpg`, `bg-tutor-neural.jpg`), cinematic dark gradients. | Eliminates visual fatigue during prolonged analytical work while preserving theatrical impact on big screens. |
| **Typography** | Crisp modern sans-serif (`Outfit`, `Plus Jakarta Sans`, `-apple-system`). No display serifs. | Editorial typography (`Fraunces` display serif paired with `Outfit` titles). | Editorial serif brings gravitas to narrative decks; sans-serif delivers maximum legibility for data tables and copilot chat. |
| **Color & Accents** | Neutral monochromatic foundation with a single calm primary accent (`#2563EB`) and subtle semantic tags. | Rich neon gradients (`#06b6d4`, `#a855f7`, `#38bdf8`), glowing highlights, audience-tinted cards. | Restrained palette keeps focus on project facts; vibrant gradients emphasize pitch energy and vision. |
| **Information Density** | Progressive disclosure: high-level KPI signal cards $\rightarrow$ drill-down modals $\rightarrow$ drawer inspectors. | High-impact slide scenes (1 core thesis + 3 supporting proof points per slide). | Operational tools must display multi-faceted data cleanly; slides must communicate one message in 10 seconds. |
| **Navigation Shell** | Fixed **Top Product Bar** with breadcrumbs + **Context Sidebar** + **Universal `⌘K` Command Center**. | Unobtrusive floating controls (Progress bar, Audience filter, Pace Timer toggle, Fullscreen switch). | Workspace requires instant multi-module jumps; Presentation requires distraction-free audience immersion. |
| **AI Copilot Role** | Central cognitive partner: universal search prompt, contextual side panel, full-page workspace. | Dedicated Q&A helper and speaker notes drawer during rehearsals and execution. | Copilot is the primary engine for analyzing workspace data; in presentation mode it acts as a silent prompter. |
| **Surfaces & Cards** | Clean flat surfaces with subtle 1px border (`rgba(255,255,255,0.08)`), generous inner padding, no heavy glows. | Translucent neon glass cards, backdrop blur (16px), glowing borders on active audience focus. | Workspace cards provide clear structure without decoration; presentation glass cards float theatrically over backgrounds. |
| **Controls & Inputs** | Standardized accessible buttons, command palette, tabs, structured forms, and search inputs. | Keyboard-first shortcuts (`Space`, `ArrowRight`, `Esc`), laser pointer mode, minimalist icon pills. | Form inputs are essential for editing and querying; presentation controls must be invisible to the audience. |
| **Motion & Transitions** | Quiet, snappy transitions (150–220ms ease-out) for panels, tabs, and command palette. Respects reduced motion. | Slide transitions (300ms cubic-bezier), laser ripples, video theater modal reveals. | Snappy transitions keep SaaS operations fast; smooth transitions guide audience attention through narrative steps. |

---

## 3. Screen-by-Screen Conformance Audit

### 01. Organization Home
- **Workspace State:** Minimal executive greeting, 3 top-level portfolio metric cards, clean venture grid with status badges, AI portfolio recommendations, and quick "Ask Copilot" trigger.
- **Separation Result:** **PASS** (Zero presentation slides or photographic hero noise).

### 02. Executive Project Overview
- **Workspace State:** High-level project cockpit with explainable KPI signals (unsupported claims count, diligence document gaps, verified evidence count, Project Twin sections count), AI insights, and single-click launch presentation button.
- **Separation Result:** **PASS** (Clear executive dashboard; no full-screen slide behavior).

### 03. Project Twin V2
- **Workspace State:** 3-column structured workspace (Left: Section hierarchy nav; Center: Canonical markdown editor; Right: Contextual intelligence and claim grounding rail).
- **Separation Result:** **PASS** (Pure authoring and intelligence surface).

### 04. Copilot Workspace
- **Workspace State:** Full-page conversational intelligence workspace with 5 mode pills (`EXECUTIVE`, `ANALYST`, `INVESTOR`, `DUE_DILIGENCE`, `PRESENTER`), prompt suggestion chips, grounded message stream, and clickable source chips.
- **Separation Result:** **PASS** (Centralized AI interaction hub).

### 05. Data Room V2
- **Workspace State:** Diligence readiness progress bar, categorized document status cards (`VERIFIED`, `MISSING`, `EXPIRED`), confidentiality tier badges, and diligence gap inspector.
- **Separation Result:** **PASS** (Functional due diligence virtual data room).

### 06. Claims & Evidence Governance
- **Workspace State:** Visual lineage flow graph (`Claim -> EvidenceLink -> Evidence -> Source`) with materiality and verification badges.
- **Separation Result:** **PASS** (Analytical provenance graph).

### 07. Administration
- **Workspace State:** Utilitarian membership tables, project lifecycle manager (`ACTIVE`, `PAUSED`, `ARCHIVED`), and audit log stream.
- **Separation Result:** **PASS** (Clean governance controls).

### 08 & 09. Presentation Engine & Presenter Cockpit
- **Presentation State:** 15-slide thematic decks with audience personalization (`Investor`, `B2B`, `Tech`), photographic scenes, video theater, pace timer, and speaker notes prompter.
- **Separation Result:** **PASS** (Cinematic storytelling experience preserved with reduced, non-intrusive chrome).

---

## 4. Final Separation Verification Decision

```text
WORKSPACE / PRESENTATION VISUAL SEPARATION    PASS
Home no longer looks like presentation        PASS
Project Overview product-oriented              PASS
Project Twin product-oriented                  PASS
Data Room product-oriented                     PASS
Copilot central                                PASS
Presentation cinematic preserved               PASS
Presenter cinematic preserved                  PASS
```
