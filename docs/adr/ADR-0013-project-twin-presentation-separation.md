# ADR-0013: Project Twin / Presentation Separation

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-001` / `SPEC-001`

## Context
In the legacy prototype, presentation slides were the only representation of a venture. This tightly coupled content with visual layout, order, CSS, and slide counts.

## Decision
We separate the Project Twin (source of truth for strategy, technology, economics, risks) from Presentation Views. The presentation is merely one projection of the Project Twin.

## Consequences
* **Positive:** The venture can be viewed as an interactive workspace, an executive pitch deck, a due diligence room, or a narrative brief without duplicating domain data.
