# ADR-0015: Deterministic Narrative Compilation

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-002` / `SPEC-002`

## Context
Narrative structuring must be auditable, repeatable, and testable without non-deterministic AI variance.

## Decision
The narrative compiler uses explicit mathematical weighting: `score = basePriority + objectiveModifier + availabilityBonus` and deterministic ordering policies.

## Consequences
* **Positive:** Identical inputs produce bit-for-bit equivalent step sequences; 100% reproducible for compliance and audits.
