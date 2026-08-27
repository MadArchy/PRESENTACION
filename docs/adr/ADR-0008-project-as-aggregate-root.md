# ADR-0008: Project as Aggregate Root

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-001` / `SPEC-001`

## Context
A venture consists of multiple versions, sections, strategy points, and operational parameters. To guarantee domain invariants (e.g. unique slug, valid current version, consistent section lists), a single aggregate root is required.

## Decision
`ProjectAggregate` is established as the aggregate root for the project boundary. Outside layers access sections, lifecycle state, and historical snapshots solely through this aggregate.

## Consequences
* **Positive:** Invariants are strictly enforced at runtime; domain data cannot enter an invalid state.
