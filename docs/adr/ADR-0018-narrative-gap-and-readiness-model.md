# ADR-0018: Narrative Gap & Readiness Model

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-002` / `SPEC-002`

## Context
When critical sections are missing (e.g. asking for capital without an `ASK` or `BUSINESS_MODEL` section), the engine must not invent content or pretend the pitch is complete.

## Decision
The engine emits explicit `NarrativeGap` and `NarrativeWarning` items, computing overall readiness as `READY`, `READY_WITH_WARNINGS`, or `NOT_READY`.

## Consequences
* **Positive:** Unambiguous visibility into pitch gaps; founders know exactly what data must be added to Project Twin before presenting.
