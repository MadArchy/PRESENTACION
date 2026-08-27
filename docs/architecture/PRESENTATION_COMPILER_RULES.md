# Presentation Compiler Rules — Venture Hub OS
**Document ID:** VHOS-ARCH-022  
**Specification:** `SPEC-004 — Executive Presentation Engine`  
**Phase:** `VHOS-PHASE-004`  

---

## 1. Deterministic Compilation Algorithm

1. **Step Ingestion**: Ingests `NarrativePlanEntity` steps and resolves corresponding `ProjectSectionEntity`.
2. **Scene Type Resolution**: Maps section type & role via `PresentationProfile` preferences.
3. **Template Resolution**: Fetches static bindings requirements from `SceneTemplateRegistry`.
4. **Data Binding**: Binds text, bullet points, metrics, tables, roadmap milestones, and risk lists.
5. **Trust Overlay Binding**: Attaches governed claim badges preserving `FACT`, `ESTIMATE`, `TARGET`, `ASSUMPTION`, and `HYPOTHESIS`.
6. **Readiness Evaluation**: Computes `PresentationReadiness` combining narrative, trust, and validation states.
