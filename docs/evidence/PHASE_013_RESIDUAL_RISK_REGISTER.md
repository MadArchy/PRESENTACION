# Phase 013 Residual Risk Register (T-69 .. T-78)

**Document ID:** `PHASE_013_RESIDUAL_RISK_REGISTER`  
**Specification:** `SPEC-013 — Conversational Intelligence & Premium Experience`  
**Open P0 Defects:** `0`  
**Open P1 Defects:** `0`  
**Overall Risk Status:** `LOW`  

---

## Threat Verification Table

| Threat ID | Canonical Threat Description | Countermeasure / Security Control | Residual Risk | Status |
|:---:|---|---|:---:|:---:|
| **T-69** | Cross-Tenant AI Retrieval | Tenant context enforced at retrieval layer; cross-org queries rejected. | **LOW** | **PASS** |
| **T-70** | Prompt Injection via Project Text | Project content treated strictly as inert context data. | **LOW** | **PASS** |
| **T-71** | AI Hallucinated Project Facts | Explicit `INSUFFICIENT_PROJECT_EVIDENCE` fallback when evidence is missing. | **LOW** | **PASS** |
| **T-72** | AI Canonical Auto-Write | AI produces non-canonical proposals only; writes require explicit user action. | **LOW** | **PASS** |
| **T-73** | AI Citation Mismatch | Citations mapped to verified repository entity IDs. | **LOW** | **PASS** |
| **T-74** | Conversation Secret Persistence | Zero API keys in conversation models, localStorage, or structured logs. | **LOW** | **PASS** |
| **T-75** | Sensitive Context Leakage | Redaction policy scrubs JWTs, passwords, and signed URLs prior to logging. | **LOW** | **PASS** |
| **T-76** | UI Authorization Regression | Every action in redesigned UI routes through verified domain `AuthorizationService`. | **LOW** | **PASS** |
| **T-77** | UI Hides Trust Warnings | Trust and support status badges remain visible on claims, slides, and cards. | **LOW** | **PASS** |
| **T-78** | Copilot Action Auto-Execution | Suggested action buttons trigger modal confirmation before use-case invocation. | **LOW** | **PASS** |
