# Presenter Notes Reference — Venture Hub OS
**Document ID:** VHOS-ARCH-028  
**Specification:** `SPEC-005 — Executive Presenter Cockpit`  
**Phase:** `VHOS-PHASE-005`  

---

## 1. Presenter Notes Model

- Notes are scoped to `(presentationId, sceneId)`.
- Visibility is strictly `PRESENTER_ONLY`.
- Supported note types:
  - `TALKING_POINT`: Key narrative emphasis.
  - `TRANSITION`: Verbal bridge to subsequent slide.
  - `REMINDER`: Hardware or pilot detail to highlight.
  - `CAUTION`: Clarification on forward-looking claims or caveats.
  - `Q_AND_A`: Anticipated inquiry cue.
