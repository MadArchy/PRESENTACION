# ADR-0010: Project Versioning Strategy

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-001` / `SPEC-001`

## Context
Ventures evolve over time (pivots, updated financials, new roadmap phases). Prior versions must remain immutable for audit and historical comparison.

## Decision
Each `ProjectAggregate` maintains an array of immutable `ProjectVersionEntity` instances (`versions/0.1.0.json`, etc.) with an explicit pointer to `currentVersion`.

## Consequences
* **Positive:** Complete historical auditability; ability to compare version diffs in future phases without data loss.
