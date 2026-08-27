# ADR-0011: Typed Core + Extensible Section Content

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-001` / `SPEC-001`

## Context
Different project sections hold distinct structured data (e.g. `Problem` needs pain points and financial impact; `Ask` needs target amount, instrument, and use of funds). Using a single untyped JSON block reduces domain safety.

## Decision
We define explicit TypeScript interfaces for all 17 canonical section schemas (`section-schemas.ts`) while wrapping them in a generic, validated `ProjectSectionEntity<T>`.

## Consequences
* **Positive:** Type-safe development in use cases and UI; structured validation catches missing or malformed fields.
