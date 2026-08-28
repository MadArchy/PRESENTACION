# Phase 013 Discovery: Current-State Inventory & Gap Analysis

**Document ID:** `PHASE_013_CURRENT_STATE_INVENTORY`  
**Specification:** `SPEC-013 — Conversational Intelligence & Premium Experience`  
**Release Baseline:** `Venture Hub OS v1.0.0` (Immutable Commit `c03372b0de439ef591acc1a50efb545e2affaba2`)  
**Status:** `DISCOVERY_COMPLETE`  

---

## 1. Existing UI & Screen Inventory

| Screen / Route | Existing UI Component | Visual & Interaction State | Limitations / Gaps for Phase 013 |
|---|---|---|---|
| **Login / Session** | `src/ui/security/components/login.component.ts` | Functional form with email/password and mock buttons | Basic form layout, lacking premium surface treatment and micro-interactions |
| **Workspace / Hub** | `src/ui/pages/hub.page.ts`, `workspace.page.ts` | Card grid listing projects, section navigator | Information density low, no executive signals, lacks portfolio insights |
| **Project Twin** | `src/ui/components/section-renderer.component.ts` | Vertical section rendering and draft editing | Lacks 3-pane layout (nav / content / intelligence context), no inline Copilot |
| **Claims & Evidence** | `src/ui/pages/governance.page.ts`, `claims-table.component.ts` | Tabular list with support badges | Table-heavy feel; lacks visual lineage graph (Claim $\rightarrow$ Link $\rightarrow$ Evidence $\rightarrow$ Source) |
| **Data Room** | `src/ui/data-room/data-room.page.ts` | Document catalog and readiness summary | Functional list; lacks conversational diligence query integration and categorized gap views |
| **Narrative Builder** | `src/ui/pages/narrative.page.ts` | Form controls for audience/objective/duration | Form-heavy; lacks interactive narrative coaching and objection preparation |
| **Presentation Engine** | `src/ui/presentation/presentation-renderer.ts` | 15-slide deck execution view | Presentation works well, but builder workspace needs seamless integrated preview |
| **Presenter Cockpit** | `src/ui/presenter/presenter.page.ts` | Dual-view drawers with timer and notes | Solid foundation, but needs full-screen immersive chrome and trust alert overlays |
| **Administration** | `src/ui/administration/organization-admin.page.ts` | Multi-panel tenant and project admin | Functional enterprise layout; needs migration to Design System V2 tokens |

---

## 2. Existing AI Capability Inventory

| Capability Dimension | Current v1.0.0 State | Target Phase 013 State | Gap Identified |
|---|---|---|---|
| **AI Form Factor** | Modal Copilot dialog (`copilot.page.ts`) | Permanent Copilot Workspace + Contextual Side Panel | No persistent chat interface or global side panel |
| **Retrieval Depth** | Basic section context extraction | Grounded multi-source retrieval (Twin + Claims + Evidence + Data Room + Admin) | Retrieval lacks structured entity graph traversal |
| **Conversation Memory** | Single request/response proposals | Multi-turn conversation history per project session | No conversation entity or multi-turn thread persistence |
| **Response Grounding** | Text suggestions with basic confidence | Explicit Grounding Status (`GROUNDED`, `PARTIALLY_GROUNDED`, `INSUFFICIENT`) | Lacks formal grounding classifier and fallback prompts |
| **Source Citations** | Unlinked text mentions | Interactive, clickable Source Chips navigating to entities | No entity navigation from AI citations |
| **Conversational Modes** | Single general assistant mode | 5 dedicated modes (`EXECUTIVE`, `ANALYST`, `INVESTOR`, `DUE_DILIGENCE`, `PRESENTER`) | No domain-specific prompt and tone steering |
| **Permission Filter** | Checked at route level | Strict per-query filter: `Copilot Access <= User Access` | Needs formal query-time authorization adapter |
| **Command Shortcut** | None | Universal `⌘K` / `Ctrl+K` Global Command Center | No keyboard-first command palette |

---

## 3. Design System & Token Gap Analysis

- **Current Tokens (`src/ui/tokens/design-tokens.ts`)**: Basic CSS custom properties for primary colors, spacing, and font sizes.
- **Design System V2 Requirements**:
  - Comprehensive token taxonomy in `src/ui/design-system/tokens/` (Color, Typography, Spacing, Radius, Shadow, Blur, Motion, Surface, Border, State, Z-Index).
  - True dual-theme support (Apple-inspired minimal Light Mode + Layered Dark Mode).
  - Reusable UI primitives (`Button`, `Card`, `Badge`, `Chip`, `CommandPalette`, `Sheet`, `Skeleton`, `Tabs`).
  - Product patterns (`MetricCard`, `InsightCard`, `SourceChip`, `CopilotComposer`, `ActivityTimeline`).

---

## 4. Discovery Conclusion

The v1.0.0 architecture provides rock-solid domain services and security invariants. Phase 013 will build directly upon these interfaces without rewriting backend contracts, introducing the **Grounded Project Copilot** and **Design System V2** in a strictly non-destructive, modular manner.
