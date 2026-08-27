# ADR-0006: Schema Versioning vs Project Versioning

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-000A`

## Context
Project data contains two independent life cycles: the data model structure of the Venture Hub platform itself, and the individual venture's evolution.

## Decision
Every project definition must distinguish:
* `schemaVersion`: Version of the Venture Hub data model (e.g. `"1.0"`).
* `projectVersion`: Release version of the specific venture/pitch (e.g. `"0.1.0"`).

## Consequences
* **Positive:** Clear separation between platform schema migrations and venture content updates.
