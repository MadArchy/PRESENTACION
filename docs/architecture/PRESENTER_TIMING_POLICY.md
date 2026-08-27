# Presenter Timing Policy — Venture Hub OS
**Document ID:** VHOS-ARCH-027  
**Specification:** `SPEC-005 — Executive Presenter Cockpit`  
**Phase:** `VHOS-PHASE-005`  

---

## 1. Timing Policy Rules & Thresholds

```text
1. actualElapsedSeconds > totalTargetSeconds  ==> OVERTIME
2. deltaPercent > +0.10 (10% behind pace)    ==> BEHIND
3. deltaPercent < -0.10 (10% ahead of pace)  ==> AHEAD
4. within [-0.10, +0.10]                     ==> ON_TRACK
```

Expected cumulative duration is dynamically computed by aggregating target durations up to the active scene index.
