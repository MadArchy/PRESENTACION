# ADR-0012: Static Project Repository Strategy

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-001` / `SPEC-001`

## Context
Phase 001 strictly prohibits remote databases and backend servers. The Project Twin must load deterministically in static web environments (GitHub Pages, Firebase Hosting).

## Decision
`JsonProjectRepository` serves as the primary outbound adapter, loading static manifests and structured Project Twins directly into domain aggregates.

## Consequences
* **Positive:** Zero server management, instantaneous loading, 100% static hosting compatibility.
