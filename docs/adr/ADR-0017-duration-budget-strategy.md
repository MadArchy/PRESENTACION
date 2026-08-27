# ADR-0017: Duration Budget Strategy

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-002` / `SPEC-002`

## Context
A pitch or meeting has rigid time boundaries (e.g. 3m demo, 5m executive, 10m partner pitch, 20m deep dive). A narrative engine must shape content into realistic step budgets.

## Decision
Semantic duration buckets (`THREE_MINUTES`, `FIVE_MINUTES`, `TEN_MINUTES`, `TWENTY_MINUTES`, `DEEP_DIVE`) enforce minimum and maximum step caps, and assign per-step timing estimates based on depth and section role.

## Consequences
* **Positive:** Prevents presenter overload; ensures critical points fit into allotted stage time.
