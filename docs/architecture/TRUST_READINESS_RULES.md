# Trust Readiness Rules — Venture Hub OS
**Document ID:** VHOS-ARCH-015  
**Specification:** `SPEC-003 — Claims & Evidence Governance`  
**Phase:** `VHOS-PHASE-003`  

---

## 1. Readiness States & Evaluation Criteria

| Trust Readiness | Governance Criteria | Impact on Venture Presentation |
| :--- | :--- | :--- |
| **`TRUST_READY`** | 0 Contradicted claims, 0 Unsupported Critical Facts, and all High Materiality facts supported. | Verified for executive and investor presentation without governance warnings. |
| **`TRUST_READY_WITH_WARNINGS`** | 0 Contradicted claims, 0 Unsupported Critical Facts, but contains unsupported high-materiality assertions or unreviewed claims. | Presentation allowed with visible warning indicators on unverified claims. |
| **`TRUST_NOT_READY`** | 1+ Contradicted claims OR 1+ Unsupported Critical Facts. | Presentation blocked until facts are verified or assertions downgraded in scope. |
