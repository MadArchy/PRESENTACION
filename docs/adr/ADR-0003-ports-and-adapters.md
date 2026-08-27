# ADR-0003: Ports and Adapters Strategy

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-000A`

## Context
Use cases need to access project data and trigger presentation launches without knowing the concrete underlying data source or DOM framework.

## Decision
We define explicit domain ports:
* `ProjectRepository` (in `src/modules/project/domain/ports/project-repository.port.ts`)
* `LegacyPresentationPort` (in `src/modules/project/domain/ports/legacy-presentation.port.ts`)

UI components and application use cases interact exclusively via these port contracts.

## Consequences
* **Positive:** Complete decoupling; the concrete implementation can be swapped effortlessly in future phases.
