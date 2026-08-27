# Claim Type Governance Reference — Venture Hub OS
**Document ID:** VHOS-ARCH-012  
**Specification:** `SPEC-003 — Claims & Evidence Governance`  
**Phase:** `VHOS-PHASE-003`  

---

## 1. Taxonomy & Governance Requirements

| Claim Type | Semantic Definition | Support Requirement | Downstream Presentation Rule |
| :--- | :--- | :--- | :--- |
| **`FACT`** | Objective, verifiable assertion of past or present reality. | Strict evidence required if `HIGH` or `CRITICAL` materiality. | Must display verified badge or unsupported warning. |
| **`ESTIMATE`** | Calculation or approximation based on source inputs. | Methodology or model calculation provenance required. | Must display `ESTIMATE` tag and calculation source. |
| **`ASSUMPTION`** | Operating baseline adopted for planning purposes. | Evidence not strictly required; rationale recommended. | Must preserve explicit `ASSUMPTION` label. |
| **`TARGET`** | Forward-looking managerial goal or business milestone. | Planning model or deck documentation required. | Must NEVER be represented as achieved fact. |
| **`HYPOTHESIS`** | Speculative assertion awaiting operational testing. | Validation evidence not required prior to testing. | Must display `HYPOTHESIS` badge. |
