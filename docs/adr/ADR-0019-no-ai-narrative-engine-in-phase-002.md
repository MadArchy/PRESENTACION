# ADR-0019: No-AI Narrative Engine in Phase 002

* **Status:** Accepted
* **Date:** 2026-08-26
* **Specification:** `VHOS-PHASE-002` / `SPEC-002`

## Context
Generative AI introduces hallucination risk, API costs, non-deterministic latency, and offline fragility.

## Decision
Phase 002 implements narrative selection, ordering, depth budgeting, and role assignment purely using deterministic rule policies and static JSON profiles, with zero external AI provider dependencies.

## Consequences
* **Positive:** 100% offline capability, zero cloud token costs, deterministic execution, and fast client-side performance.
