# ADR-0016: Versioned Narrative Profiles

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-002` / `SPEC-002`

## Context
Narrative heuristics change as venture communication best practices evolve. Past narrative plans must record the exact profile version under which they were generated.

## Decision
All narrative profiles specify a explicit `profileVersion` and `profileId`. Generated `NarrativePlan` captures these fields alongside `engineVersion`.

## Consequences
* **Positive:** Complete historical reproducibility of generated plans.
