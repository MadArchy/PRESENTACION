# Scene Template Reference — Venture Hub OS
**Document ID:** VHOS-ARCH-019  
**Specification:** `SPEC-004 — Executive Presentation Engine`  
**Phase:** `VHOS-PHASE-004`  

---

## 1. Scene Template Registry Design

The `SceneTemplateRegistry` provides static, deterministic binding declarations:
- Supported layout variants (`HERO`, `SPLIT`, `STACKED`, `GRID`, `METRIC_WALL`, `TIMELINE`, `MATRIX`, `DIAGRAM`, `FULL_BLEED_MEDIA`, `CONTENT_PLUS_EVIDENCE`, `MINIMAL`).
- Required content binding types (e.g. `TEXT`, `BULLET_LIST`, `METRIC_SET`, `ROADMAP`, `RISK_LIST`).
- Optional binding slots and maximum density guardrails.
- Trust badge support flags.
