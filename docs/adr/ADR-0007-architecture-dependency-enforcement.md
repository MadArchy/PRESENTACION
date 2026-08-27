# ADR-0007: Automated Architecture Dependency Enforcement

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-000A`

## Context
Architectural layer rules (e.g. Domain must not import UI/Adapters/Browser APIs) can easily degrade over time if not verified automatically in CI.

## Decision
We introduce an automated architecture dependency test suite (`tests/architecture/dependency_rules_runner.cjs`) executed via `npm run test:architecture` that statically inspects TypeScript imports across `src/` and fails if any forbidden import boundary is breached.

## Consequences
* **Positive:** Permanent, automated protection of hexagonal layer boundaries in local development and CI pipelines.
