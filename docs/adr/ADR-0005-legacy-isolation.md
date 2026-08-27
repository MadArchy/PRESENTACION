# ADR-0005: Legacy Isolation Strategy

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-000A`

## Context
The Phase 0 presentation prototype works and must be preserved with 100% fidelity. Legacy code must not be modified destructively or scattered across new modules.

## Decision
We isolate legacy files into `legacy/venture-hub-v1/` and provide a single adapter boundary `VentureHubLegacyAdapter` implementing `LegacyPresentationPort`.

## Consequences
* **Positive:** Existing decks remain 100% operational; legacy code cannot infect new domain modules.
