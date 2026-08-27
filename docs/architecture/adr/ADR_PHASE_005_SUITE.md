# ADR-0037: PresenterSession as Ephemeral Runtime State
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Presenter execution generates live timing, navigation jumps, and notes visibility states that must not contaminate canonical presentation definitions.
- **Decision:** Model `PresenterSession` as an ephemeral aggregate root separate from `PresentationDefinition`.
- **Consequences:** Clean separation of operational state from project and presentation intelligence.

---

# ADR-0038: Canonical Presentation Immutability During Presentation
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Presenting or running behind schedule must never silently reorder or delete slides in canonical storage.
- **Decision:** Presenter actions (skipping, jumping) mutate only runtime session state; canonical objects remain 100% immutable.
- **Consequences:** 0 unexpected presentation data corruption.

---

# ADR-0039: Deterministic Presenter Timing
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Timing status (`ON_TRACK`, `AHEAD`, `BEHIND`, `OVERTIME`) must be testable and predictable.
- **Decision:** Ingest cumulative expected time vs actual elapsed time through a pure `PresenterTimingPolicy` and injectable `ClockPort`.
- **Consequences:** 100% reproducible session timing assertions.

---

# ADR-0040: Presenter/Audience View Separation
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Private presenter notes and internal governance alerts must never leak to the audience screen.
- **Decision:** Explicit separation between audience-facing presentation mode and presenter cockpit view.
- **Consequences:** Safe and professional live presentations.

---

# ADR-0041: Presenter Notes as Non-Canonical Content
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Speaker reminders and cues are delivery aids, not canonical project facts.
- **Decision:** Store presenter notes in non-canonical presentation datasets without promoting them to Project Twin facts.
- **Consequences:** Truth integrity maintained in Project Twin.

---

# ADR-0042: Trust Alerts as Read-Only Governance Projection
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Presenters need to be alerted of unsupported facts or forward-looking statements before speaking.
- **Decision:** Project existing Claim & Evidence trust metadata into read-only presenter trust alerts without modifying review status.
- **Consequences:** In-cockpit governance compliance.

---

# ADR-0043: Static Q&A Preparation
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Providing anticipated questions and vetted answers for the presenter.
- **Decision:** Implement static, grounded Q&A preparation cards categorized by domain.
- **Consequences:** Reliable Q&A support without AI hallucination.

---

# ADR-0044: Browser Adapter Boundaries for Fullscreen and Clock
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Web APIs (Fullscreen, Clock, Keyboards) must be decoupled from domain entities.
- **Decision:** Implement Hexagonal ports (`ClockPort`, `FullscreenPort`) with browser adapters.
- **Consequences:** High testability with zero DOM coupling in domain.

---

# ADR-0045: No-AI Presenter Cockpit in Phase 005
- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Context:** Focus on rock-solid deterministic presenter tooling before introducing AI assistants.
- **Decision:** Strictly prohibit AI coaching, speech transcription, or auto-generated answers in Phase 005.
- **Consequences:** Stable, deterministic foundation ready for Phase 006 Copilot.
