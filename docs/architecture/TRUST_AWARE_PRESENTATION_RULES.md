# Trust-Aware Presentation Rules — Venture Hub OS
**Document ID:** VHOS-ARCH-023  
**Specification:** `SPEC-004 — Executive Presentation Engine`  
**Phase:** `VHOS-PHASE-004`  

---

## 1. Non-Negotiable Semantic Rules

1. **No Reclassification**: Presentation compilers and renderers MUST NOT convert `TARGET`, `ESTIMATE`, `ASSUMPTION`, or `HYPOTHESIS` to `FACT`.
2. **Unsupported Fact Warnings**: If a scene presents an unsupported `HIGH` or `CRITICAL` materiality fact, a visible warning indicator is rendered on that scene card.
3. **Contradiction Alert**: Any contradicted assertion produces a critical badge and sets `SceneStatus` to `BLOCKED`.
