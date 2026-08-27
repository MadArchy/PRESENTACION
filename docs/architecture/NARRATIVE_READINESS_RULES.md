# Narrative Readiness Rules — Venture Hub OS
**Document ID:** VHOS-ARCH-009  
**Specification:** `SPEC-002`  
**Phase:** `VHOS-PHASE-002` / `VHOS-PHASE-002-CORR-001`  

---

## 1. Readiness State Evaluation

| State | Condition | Founder Action Required |
| :--- | :--- | :--- |
| `READY` | 0 Gaps, 0 Warnings, all mandatory sections `VALIDATED`, and duration is `WITHIN_TARGET` or `NORMAL_TOLERANCE` ($\le 10\%$). | Safe to present directly to target audience. |
| `READY_WITH_WARNINGS` | 0 Blocking Gaps, but contains `DRAFT` sections, language fallbacks, or `MODERATE_OVERFLOW` ($> 10\%$ and $\le 20\%$). | Review warnings before presentation. |
| `NOT_READY` | 1+ `HIGH`/`BLOCKING` Gaps (mandatory section missing/`EMPTY`) OR `CRITICAL_OVERFLOW` ($> 20\%$). | Complete missing sections or reduce scope before presenting. |
