# ADR-0028: PresentationDefinition as Derived Projection
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Storing static slides as the canonical truth creates fragmentation when venture data changes.
- **Decision:** Presentation definitions are derived projections compiled on-demand from Project Twin and Narrative plans.
- **Consequences:** Single source of truth across all decks and formats.

---

# ADR-0029: Scene-Based Presentation Domain
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Need presentation vocabulary independent of PowerPoint or HTML DOM quirks.
- **Decision:** Model the visual unit as `PresentationScene` with typed roles, layouts, and data bindings.
- **Consequences:** Clean domain separation with pluggable renderers.

---

# ADR-0030: Deterministic Presentation Compilation
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Presentation rendering must be 100% reproducible without random AI generation.
- **Decision:** Implement pure rule-based compilation in `PresentationCompiler`.
- **Consequences:** Predictable presentation output for auditability.

---

# ADR-0031: Versioned Presentation Profiles
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Different audiences (Investor, Executive, Technical) require different scene selections.
- **Decision:** Define versioned presentation profiles in static JSON.
- **Consequences:** Easily customizable presentation templates per audience.

---

# ADR-0032: Versioned Presentation Themes
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Decouple visual styling from domain content.
- **Decision:** Create semantic theme tokens (`executive-dark`, `executive-light`) in static JSON.
- **Consequences:** Instant theme switching without modifying presentation definitions.

---

# ADR-0033: Typed Content Bindings
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Presenting structured metrics, bullet lists, roadmaps, and risk matrices.
- **Decision:** Define typed `ContentBinding` schemas mapped directly to ProjectSection content.
- **Consequences:** High-fidelity data rendering without ad-hoc string formatting.

---

# ADR-0034: Trust-Aware Rendering
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Presentation must not deceive investors by rendering forward-looking targets as verified facts.
- **Decision:** Bind governed Claim metadata directly to scene rendering with visible badge indicators.
- **Consequences:** Transparent, trustworthy presentation cockpit.

---

# ADR-0035: Scene Renderer Registry
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Decoupling UI layout components from domain compilation logic.
- **Decision:** UI maintains a `SceneRendererRegistry` mapping SceneType to rendering functions.
- **Consequences:** Modular and easily extensible scene library.

---

# ADR-0036: V2 Presentation Coexistence with Legacy
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Protect Phase 0 legacy decks while enabling the new derived presentation engine.
- **Decision:** Support both V1 legacy presentations and V2 derived presentations side-by-side.
- **Consequences:** Zero regressions with full backward compatibility.
