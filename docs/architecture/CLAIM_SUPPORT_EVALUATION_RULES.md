# Claim Support Evaluation Rules — Venture Hub OS
**Document ID:** VHOS-ARCH-014  
**Specification:** `SPEC-003 — Claims & Evidence Governance`  
**Phase:** `VHOS-PHASE-003`  

---

## 1. Deterministic Evaluation Algorithm

```text
Claim + Active EvidenceLinks + Evidence Items
                     ↓
        Check Contradictory Evidence
       /                            \
     YES                            NO
      ↓                              ↓
CONTRADICTED                  Evaluate by ClaimType
                              ┌──────────────┼──────────────┐
                              ▼              ▼              ▼
                            FACT          ESTIMATE    TARGET/ASSUMPTION/HYPOTHESIS
                              │              │              │
                   ┌──────────┼──────────┐   │              │
                   ▼          ▼          ▼   ▼              ▼
               SUPPORTED   PARTIAL   UNSUPPORTED        DOCUMENTED / NOT_REQUIRED
```

---

## 2. Rule Codes

- `FACT_SUPPORTED`: Verified evidence exists and is available.
- `FACT_PARTIALLY_SUPPORTED`: Available evidence provides partial coverage.
- `FACT_REQUIRES_EVIDENCE`: Fact lacks verified repository evidence.
- `FACT_CONTRADICTED`: Active evidence contradicts the assertion.
- `ESTIMATE_SUPPORTED`: Documented calculation or model exists.
- `ESTIMATE_MISSING_CALCULATION`: Calculation lacks full provenance.
- `TARGET_DOCUMENTED`: Target is formally registered in business plan/deck.
- `ASSUMPTION_EVIDENCE_NOT_REQUIRED`: Planning assumptions do not require external verification.
- `HYPOTHESIS_PENDING_VALIDATION`: Hypotheses await field testing results.
