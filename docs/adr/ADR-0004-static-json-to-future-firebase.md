# ADR-0004: Static JSON Today, Firebase Later

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-000A`

## Context
Phase 000A prohibits backend databases, Firestore, Authentication, and Cloud Functions until Phase 1 and 7. However, the architecture must accommodate future database integration seamlessly.

## Decision
In Phase 000A, `JsonProjectRepository` implements `ProjectRepository` using static manifest files (`data/projects/*/project.manifest.json`). When Firestore is introduced in later phases, a `FirestoreProjectRepository` can be added without modifying domain or use case logic.

## Consequences
* **Positive:** Zero hosting cost, zero backend latency, static portability today, clean upgrade path tomorrow.
