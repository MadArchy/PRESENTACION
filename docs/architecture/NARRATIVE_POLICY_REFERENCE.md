# Narrative Policy Reference — Venture Hub OS
**Document ID:** VHOS-ARCH-007  
**Specification:** `SPEC-002`  
**Phase:** `VHOS-PHASE-002`  

---

## 1. Mathematical Scoring Formula

Every candidate section $S$ evaluated by `NarrativeCompiler` is assigned a deterministic relevance score:

$$\text{Score}(S) = \text{BasePriority}(S, A) + \text{ObjectiveModifier}(S, O) + \text{MandatoryBonus}(S) - \text{UnavailabilityPenalty}(S)$$

Where:
* $\text{BasePriority} \in [0, 100]$
* $\text{ObjectiveModifier} \in [-40, +35]$
* $\text{MandatoryBonus} = +50$ (if $S \in \text{MandatorySections}$)
* $\text{UnavailabilityPenalty} = 100$ (if status is `EMPTY` or `NOT_APPLICABLE`)
