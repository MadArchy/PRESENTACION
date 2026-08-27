# ADR-0002: Vite and TypeScript Static Web Foundation

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-000A`

## Context
The platform must remain web-first, static-hostable (GitHub Pages, Firebase Hosting), and fast to build without requiring a backend runtime server during Phase 0 and Phase 1.

## Decision
We adopt **Vite** as the build tool and **TypeScript (strict mode)** as the implementation language.
React is intentionally omitted in Phase 000A to keep the runtime lightweight, dependency-free, and migration-safe.

## Consequences
* **Positive:** Instant HMR during development, sub-second production builds, type safety at compile time, static output compatible with any CDN/static host.
* **Negative:** None.
