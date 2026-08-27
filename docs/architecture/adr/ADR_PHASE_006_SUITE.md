# Venture Hub OS — Architecture Decision Records Suite: Phase 006

**Document ID:** `ADR-SUITE-006`  
**Phase:** `VHOS-PHASE-006: AI Copilot`  
**Status:** `APPROVED`  
**Date:** `2026-08-26`  

---

## ADR-0046: Governing Invariant: AI Output is NOT Project Truth
- **Context:** The introduction of generative AI creates a risk of hallucinated or unverified facts contaminating canonical venture data.
- **Decision:** Establish as an unalterable platform invariant that all AI completions are purely advisory recommendations and drafts. Canonical modifications require explicit human review and application.
- **Consequences:** AI Copilot has zero write privileges to repository storage.

## ADR-0047: Pure Read-Only Context Projections
- **Context:** Large language models should only analyze relevant venture information.
- **Decision:** Context is assembled into isolated, read-only immutable DTOs (`CopilotContextBundle`) with explicit provenance identifiers.
- **Consequences:** ProjectTwin, Claims, Evidence, and Narrative structures cannot be mutated in-place by Copilot operations.

## ADR-0048: Memory-Only Session Credential Management
- **Context:** Venture Hub OS operates on a web-first static hosting model without a backend.
- **Decision:** External provider API keys (OpenAI, Anthropic, Google) are kept exclusively in a volatile, in-memory store (`MemorySessionKeyAdapter`). Keys are discarded on browser reload or tab closure.
- **Consequences:** Zero API keys are ever written to `localStorage`, `sessionStorage`, `IndexedDB`, static JSON, or git repositories.

## ADR-0049: Context Minimization Policy by Task Risk
- **Context:** Transmitting excessive context inflates latency, token consumption, and exposure of unrelated project data.
- **Decision:** Enforce `ContextMinimizationPolicy` mapping each of the 12 `CopilotTaskType` values strictly to its required scopes (e.g., `TRUST_REVIEW` queries only Claims, Evidence, and Trust summaries).
- **Consequences:** Minimized payload size, increased model focus, and strict boundary compliance.

## ADR-0050: Delimiter Isolation for Prompt Injection Defense
- **Context:** Untrusted venture text or slide content might contain adversarial prompt injection strings.
- **Decision:** Enclose all context payloads inside explicit delimiters (`<<<BEGIN_UNTRUSTED_VENTURE_CONTEXT>>>` / `<<<END_UNTRUSTED_VENTURE_CONTEXT>>>`) accompanied by strict system safety instructions.
- **Consequences:** Model treats all venture content as passive data to analyze rather than executable instructions.

## ADR-0051: Explicit CopilotProposal Lifecycle with Human Review
- **Context:** Generative rewriting of section content or speaker notes needs clear workflow tracking.
- **Decision:** Any actionable recommendation is encapsulated in a `CopilotProposalEntity` with state machine: `PENDING_REVIEW` $\rightarrow$ `APPROVED` | `REJECTED` | `EDITED` $\rightarrow$ `APPLIED`.
- **Consequences:** Transparent human oversight and full auditability of all generative modifications.

## ADR-0052: Deterministic Mock Provider for Offline Verification
- **Context:** Automated testing and offline runtime environments require reliable, zero-cost execution.
- **Decision:** Implement `MockAiModelAdapter` simulating grounded analytical findings and structured proposals for all 12 tasks using canonical datasets.
- **Consequences:** 100% reproducible test suites with zero external network dependencies.

## ADR-0053: Pluggable Multi-Provider Architecture
- **Context:** The system must avoid vendor lock-in with single AI providers.
- **Decision:** Implement `AiModelPort` decoupling the application use cases from specific providers (OpenAI, Anthropic, Google, Ollama, Mock).
- **Consequences:** Providers can be switched dynamically at runtime without domain layer modifications.

## ADR-0054: Zero Backend / Static Deployment Continuity
- **Context:** Venture Hub OS must remain deployable as static assets on any static web host.
- **Decision:** Copilot execution runs entirely in browser memory; no backend proxies, Firebase services, or cloud daemons are introduced.
- **Consequences:** Preserves the zero-maintenance static architecture of Venture Hub OS.
