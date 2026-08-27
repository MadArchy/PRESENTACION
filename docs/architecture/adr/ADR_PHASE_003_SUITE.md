# ADR-0020: Claims as First-Class Domain Entities
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Assertions in decks and pitches are frequently conflated between facts, estimates, and goals.
- **Decision:** Model Claim as a first-class immutable aggregate root in `src/modules/claim/domain/`.
- **Consequences:** Every material statement has explicit lifecycle, support status, and section association.

---

# ADR-0021: Evidence as Reusable Provenance Objects
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Evidence artifacts (field studies, financial models, telemetry logs) support multiple claims across different sections.
- **Decision:** Decouple evidence records from claims and connect them via explicit `EvidenceLink` entities.
- **Consequences:** Many-to-many relationship without duplicate data storage.

---

# ADR-0022: Explicit Claim Type Semantics
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Presentation engines often present targets as established achievements.
- **Decision:** Mandate strict domain value objects (`FACT`, `ESTIMATE`, `ASSUMPTION`, `TARGET`, `HYPOTHESIS`) that cannot be reclassified by narrative engines.
- **Consequences:** Complete semantic integrity and transparent labeling for investors.

---

# ADR-0023: Deterministic Support Evaluation
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Need transparent verification without opaque AI scoring or nondeterministic LLM calls.
- **Decision:** Implement pure rule-based evaluation in `ClaimSupportEvaluator` emitting explicit rule codes and explanation objects.
- **Consequences:** 100% reproducible and testable governance outcomes.

---

# ADR-0024: Many-to-Many Claim-Evidence Links
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Multiple claims may share a single spreadsheet model or master pitch deck slide.
- **Decision:** Link claim ID and evidence ID with explicit relationship types (`SUPPORTS`, `PARTIALLY_SUPPORTS`, `CONTRADICTS`, `CONTEXT_ONLY`).
- **Consequences:** Flexible provenance modeling.

---

# ADR-0025: Trust Summary Without Opaque Scoring
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Artificial "Trust Score" percentages create false confidence without actionable insight.
- **Decision:** Expose verified counts, unsupported critical facts, and discrete trust readiness states.
- **Consequences:** Clear, auditable intelligence for founders and investors.

---

# ADR-0026: Narrative Trust as Derived Overlay
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Need trust awareness without destabilizing the canonical Phase 2 Narrative Engine.
- **Decision:** Build `AnnotateNarrativeTrustUseCase` as an integration overlay producing `NarrativeTrustContext`.
- **Consequences:** Phase 2 compilation remains pure, fast, and deterministic.

---

# ADR-0027: Static Governance Persistence
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Static web hosting deployment constraint without SQL/NoSQL databases or Firebase runtime.
- **Decision:** Persist claims and evidence in versioned static JSON files under `data/projects/<slug>/`.
- **Consequences:** Zero backend overhead, portable client-side evaluation.
