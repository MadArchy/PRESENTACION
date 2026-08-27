# ADR-0001: Feature-Oriented Hexagonal Architecture

* **Status:** Accepted
* **Deciders:** 3i BAIRD LAB / Venture Hub OS Core Team
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-000A`

## Context
Venture Hub OS is evolving from a static presentation prototype into an enterprise-grade project intelligence and presentation platform. To prevent tight coupling between business logic and UI/storage implementations, an explicit architectural boundary is required.

## Decision
We adopt **Feature-Oriented Hexagonal Web Architecture (Ports & Adapters)**.
The layers follow the strict dependency rule:
`UI → Application → Domain`
Adapters implement domain ports. The Domain layer remains 100% pure and independent of UI, DOM, browser globals, concrete storage, or legacy runtimes.

## Consequences
* **Positive:** Complete isolation of project business rules; ease of testing without UI/browser mocks; ability to switch from static JSON to Firestore or PostgreSQL without changing domain logic.
* **Negative:** Additional boilerplate (ports, entities, value objects, use cases) compared to flat script files.
