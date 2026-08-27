# ADR-0014: Narrative Plan as Derived Projection

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-002` / `SPEC-002`

## Context
Ventures need to communicate with different audiences (investors, engineers, executives, clients) without duplicating underlying venture models or maintaining disconnected presentation decks.

## Decision
`NarrativePlan` is defined as a purely derived, read-only projection of `ProjectTwin`. The Narrative Engine reads Project Twin data, applies audience and objective rules, and produces a structured plan without mutating the source aggregate.

## Consequences
* **Positive:** Guaranteed single source of truth; updates to the Project Twin automatically flow into all narrative projections.
