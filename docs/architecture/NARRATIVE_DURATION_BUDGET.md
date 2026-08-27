# Narrative Duration Budget Reference — Venture Hub OS
**Document ID:** VHOS-ARCH-008  
**Specification:** `SPEC-002`  
**Phase:** `VHOS-PHASE-002` / `VHOS-PHASE-002-CORR-001`  

---

## 1. Step Bounds & Target Timings

| Duration Bucket | Min Steps | Max Steps | Target Seconds | Typical Format |
| :--- | :--- | :--- | :--- | :--- |
| `THREE_MINUTES` | 4 | 6 | 180s | Demo Day / Lightning Pitch |
| `FIVE_MINUTES` | 6 | 8 | 300s | Executive Briefing |
| `TEN_MINUTES` | 8 | 12 | 600s | Standard Investor Meeting |
| `TWENTY_MINUTES` | 12 | 18 | 1200s | Architecture Review / Deep Dive |
| `DEEP_DIVE` | 10 | 25 | 1800s | Partner & Due Diligence Walkthrough |

---

## 2. Duration Tolerance Thresholds & Statuses

| Status | Overflow Threshold | Engine Severity | NarrativeReadiness Impact |
| :--- | :--- | :--- | :--- |
| `WITHIN_TARGET` | Exactly $\le 100\%$ of target | `NORMAL` | Permitted `READY` |
| `NORMAL_TOLERANCE` | $> 0\%$ and $\le 10\%$ over target | `NORMAL` | Permitted `READY` |
| `MODERATE_OVERFLOW` | $> 10\%$ and $\le 20\%$ over target | `WARNING` | Sets `READY_WITH_WARNINGS` |
| `CRITICAL_OVERFLOW` | $> 20\%$ over target | `CRITICAL` | Sets `NOT_READY` |

---

## 3. Duration Compression Order

When compiling a narrative exceeding the step budget or duration capacity, `NarrativeCompiler` applies:

```text
1. Preserve mandatory sections
          ↓
2. Reduce optional section depth & relative weight
          ↓
3. Reduce optional supporting content
          ↓
4. Remove lowest-priority optional narrative steps
          ↓
5. Recalculate total estimated duration
          ↓
6. Evaluate overflow tolerance (NarrativeTiming)
          ↓
7. Produce warning & update readiness
```
