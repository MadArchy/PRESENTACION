# Venture Hub OS — Phase 002 Verification Correction & Closure Gate

**Document ID:** `VHOS-PHASE-002-CORR-001`  
**Related Phase:** `VHOS-PHASE-002 — Adaptive Narrative Engine`  
**Specification:** `SPEC-002 — Adaptive Narrative Engine`  
**Version:** `1.0`  
**Status:** `APPROVED_FOR_EXECUTION`  
**Purpose:** Verification correction before formal Phase 002 closure  
**Scope Type:** Verification / Correction Only  
**Next Phase:** `VHOS-PHASE-003 — Claims & Evidence Governance`  
**IMPORTANT:** Phase 003 is NOT authorized by this document.

---

# 1. Executive Instruction

The implementation of `VHOS-PHASE-002 — Adaptive Narrative Engine` is considered:

```text
CODE_COMPLETE
VERIFICATION_CORRECTION_REQUIRED
```

Do NOT begin `VHOS-PHASE-003`.

Do NOT add new product functionality.

Do NOT modify Project Twin architecture.

Do NOT add AI, backend services, databases, Firestore, authentication, or any Phase 003 functionality.

This work item exists only to:

1. correct Duration Budget behavior;
2. integrate duration overflow into NarrativeReadiness;
3. execute and explicitly report missing E2E/browser gates;
4. verify regression gates;
5. verify browser console and critical asset resolution;
6. update `PHASE_002_VERIFICATION_REPORT.md`;
7. return a final recommendation.

---

# 2. Current Verified Baseline

The following implementation results are accepted as current baseline and MUST remain green:

```text
TypeScript                         PASS — 0 errors
Architecture Tests                 PASS — 0 violations
Unit Tests                         PASS — 149/149
Legacy Preservation                PASS — 45/45
Vite Production Build              PASS
Narrative Engine Version           1.0.0
Project Twin Immutability          PASS
Forbidden Scope Audit              PASS
Static Web Architecture            PRESERVED
```

The correction MUST NOT regress any of these results.

---

# 3. Problem Requiring Correction

The current Arcana pilot reports:

```text
ARCANA_INVESTOR_10_EN
Target: 10 minutes
Estimated: ~676 seconds
Actual estimate: ~11.2 minutes
Overflow: ~12.7%
Readiness: READY_WITH_WARNINGS

ARCANA_EXECUTIVE_5_ES
Target: 5 minutes
Estimated: ~248 seconds
Actual estimate: ~4.1 minutes
Readiness: READY

ARCANA_TECHNICAL_20_EN
Target: 20 minutes
Estimated: ~1494 seconds
Actual estimate: ~24.9 minutes
Overflow: ~24.5%
Readiness: READY
```

The Technical narrative presents a critical inconsistency.

A narrative targeting 20 minutes but estimated at approximately 24.9 minutes MUST NOT be classified as `READY` without an explicit duration policy permitting it.

The Duration Budget and NarrativeReadiness models therefore require correction.

---

# 4. Authorized Correction Scope

Only the following areas may be modified:

```text
Narrative Duration Policy
Narrative Compiler
Narrative Readiness Rules
Narrative Warning / Gap output
Narrative timing tests
Narrative E2E tests
Verification documentation
```

Files outside these areas may only be modified if strictly necessary to execute or test the correction.

All such modifications MUST be documented.

---

# 5. Duration Budget Policy

Implement or formalize the following default duration tolerance policy.

## 5.1 Target

```text
Target Duration = 100%
```

## 5.2 Tolerance

Recommended default:

```text
0% – 10% over target
NORMAL_TOLERANCE

>10% – 20% over target
MODERATE_OVERFLOW

>20% over target
CRITICAL_OVERFLOW
```

Equivalent naming is acceptable if semantics remain identical.

The thresholds MUST be explicit, versioned, testable, and documented.

They MUST NOT be hidden magic numbers inside the compiler.

---

# 6. Duration Resolution Order

When a compiled narrative exceeds its duration target, the engine MUST apply correction in this order:

```text
1. Preserve mandatory sections
          ↓
2. Reduce optional section depth
          ↓
3. Reduce optional supporting content
          ↓
4. Remove lowest-priority optional narrative steps
          ↓
5. Recalculate total estimated duration
          ↓
6. Evaluate overflow tolerance
          ↓
7. Produce warning/readiness result
```

Mandatory narrative sections MUST NOT be silently removed.

---

# 7. No Arcana Hard-Coding

The correction MUST NOT contain project-specific logic such as:

```text
if project === "arcana"
```

or:

```text
if narrativeId === "ARCANA_TECHNICAL_20_EN"
```

The correction must be implemented through reusable:

```text
DurationPolicy
NarrativeCompiler
NarrativeReadinessPolicy
```

or equivalent domain components.

---

# 8. NarrativeReadiness Integration

Duration MUST become one explicit input into NarrativeReadiness evaluation.

Minimum default behavior:

```text
WITHIN TARGET OR NORMAL TOLERANCE
→ READY
```

subject to existing content/gap rules.

```text
MODERATE OVERFLOW
→ READY_WITH_WARNINGS
```

```text
CRITICAL OVERFLOW
→ NOT_READY
```

unless a versioned NarrativeProfile explicitly defines a different policy.

Any profile override MUST be explicit and testable.

---

# 9. Required Duration Warning

Create or formalize a warning code equivalent to:

```text
DURATION_OVERFLOW
```

Recommended warning structure:

```ts
{
  code: "DURATION_OVERFLOW",
  severity: "WARNING" | "CRITICAL",
  targetSeconds: number,
  estimatedSeconds: number,
  overflowSeconds: number,
  overflowPercent: number,
  message: string
}
```

Exact implementation may vary.

The information MUST remain available for UI and verification.

---

# 10. Required Timing Metadata

Each NarrativePlan SHALL expose sufficient timing data to determine:

```text
target duration
estimated duration
overflow seconds
overflow percentage
duration status
```

Recommended conceptual structure:

```ts
interface NarrativeTiming {
  targetSeconds: number;
  estimatedSeconds: number;
  overflowSeconds: number;
  overflowPercent: number;
  status:
    | "WITHIN_TARGET"
    | "NORMAL_TOLERANCE"
    | "MODERATE_OVERFLOW"
    | "CRITICAL_OVERFLOW";
}
```

Equivalent implementation is acceptable.

---

# 11. Required Unit Tests

Add or update tests covering at minimum:

## T-CORR-002-001

Narrative within target.

Expected:

```text
READY
```

if no other readiness blockers exist.

## T-CORR-002-002

Narrative within 10% tolerance.

Expected:

```text
READY
```

or profile-defined equivalent.

## T-CORR-002-003

Narrative >10% and <=20% over target.

Expected:

```text
READY_WITH_WARNINGS
DURATION_OVERFLOW
```

## T-CORR-002-004

Narrative >20% over target.

Expected:

```text
NOT_READY
CRITICAL DURATION_OVERFLOW
```

## T-CORR-002-005

Mandatory sections remain after duration compression.

## T-CORR-002-006

Lowest-priority optional steps are removed before mandatory steps.

## T-CORR-002-007

Project Twin remains immutable during duration optimization.

## T-CORR-002-008

Same request produces deterministic timing and step selection.

## T-CORR-002-009

No Arcana-specific project logic exists in DurationPolicy/compiler.

---

# 12. Required Arcana Revalidation

Re-run all three mandatory pilot narratives.

## 12.1 Investor

```text
Narrative:
ARCANA_INVESTOR_10_EN

Audience:
INVESTOR

Objective:
RAISE_CAPITAL

Target:
600 seconds
```

Report:

```text
Final step count
Estimated seconds
Estimated minutes
Overflow seconds
Overflow %
Duration status
NarrativeReadiness
Warnings
Gaps
Omitted optional sections
```

---

## 12.2 Executive

```text
Narrative:
ARCANA_EXECUTIVE_5_ES

Audience:
EXECUTIVE

Objective:
DECISION_SUPPORT

Target:
300 seconds
```

Report same fields.

---

## 12.3 Technical

```text
Narrative:
ARCANA_TECHNICAL_20_EN

Audience:
TECHNICAL

Objective:
ARCHITECTURE_REVIEW

Target:
1200 seconds
```

Report same fields.

If final estimated duration remains >20% above target:

```text
NarrativeReadiness MUST NOT equal READY.
```

---

# 13. Narrative Builder E2E Verification

Execute Playwright/browser-level verification.

Explicitly test:

```text
Application boot
Project selection
Narrative Builder route
Audience selector
Objective selector
Duration selector
Language selector
Depth selector
Profile resolution/selection
Generate Narrative action
Narrative Preview rendering
Narrative step ordering
Timing display
Gap panel
Warning panel
NarrativeReadiness indicator
```

The report MUST include exact counts:

```text
Narrative Builder E2E:
X/X PASS
0 FAIL
```

Do not report only:

```text
PASS
```

without test counts.

---

# 14. Required Viewports

At minimum verify:

```text
Desktop
1440 × 900 or equivalent

Mobile
390 × 844 or equivalent
```

Required:

```text
Desktop Narrative Builder: PASS
Mobile Narrative Builder: PASS
```

---

# 15. Browser Console Gate

Run the application in browser/runtime preview and report:

```text
Critical console errors: 0
Unhandled exceptions: 0
Critical asset 404s: 0
```

Warnings that are expected and non-critical may be documented separately.

---

# 16. Static Production Preview Gate

Execute:

```bash
npm run build
```

Then serve the generated production artifact using:

```bash
npm run preview
```

or an equivalent Firebase Hosting local preview.

Verify:

```text
dist/ generated
application loads
project registry loads
Arcana Project Twin loads
Narrative Builder loads
narrative generation works
critical media resolves
```

Required result:

```text
STATIC PRODUCTION PREVIEW: PASS
```

---

# 17. Regression Gates

Explicitly execute and report:

```text
Phase 002 Narrative Tests
Phase 001 Project Twin Regression
Phase 000A Web/Architecture Regression
Phase 0 Legacy Preservation
```

Required minimum:

```text
Phase 0 Legacy:
45/45 PASS
```

No existing passing test may be removed merely to make the correction pass.

---

# 18. Architecture Gate

Re-run:

```bash
npm run test:architecture
```

Required:

```text
0 violations
```

The correction MUST preserve:

```text
UI
 ↓
Application
 ↓
Domain
```

Narrative domain still MUST NOT depend on:

```text
UI
DOM
Firebase
Legacy implementation
Browser storage implementation
AI providers
```

---

# 19. Forbidden Scope Audit

Confirm explicitly:

```text
OpenAI: NOT IMPLEMENTED
Claude: NOT IMPLEMENTED
Gemini: NOT IMPLEMENTED
Ollama: NOT IMPLEMENTED
AI SDK: NOT IMPLEMENTED

Firestore: NOT IMPLEMENTED
Firebase Auth: NOT IMPLEMENTED
Firebase Storage: NOT IMPLEMENTED
Cloud Functions: NOT IMPLEMENTED

Backend: NOT IMPLEMENTED
Database: NOT IMPLEMENTED

Claims Engine: NOT IMPLEMENTED
Evidence Engine: NOT IMPLEMENTED
Data Room: NOT IMPLEMENTED

Phase 003: NOT STARTED
```

---

# 20. Files That MUST Be Updated

At minimum update:

```text
docs/evidence/PHASE_002_VERIFICATION_REPORT.md
```

Also update relevant architecture documentation if duration/readiness rules changed:

```text
docs/architecture/NARRATIVE_DURATION_BUDGET.md
docs/architecture/NARRATIVE_READINESS_RULES.md
```

If the implemented policy materially changes an ADR, update or supersede:

```text
ADR-0017 Duration Budget Strategy
ADR-0018 Narrative Gap & Readiness Model
```

Do not rewrite unrelated ADRs.

---

# 21. Required Verification Report Addendum

`PHASE_002_VERIFICATION_REPORT.md` MUST include a dedicated section:

```text
Duration Budget Correction
```

with:

| Narrative | Target | Estimated | Overflow % | Duration Status | Readiness |
|---|---:|---:|---:|---|---|
| ARCANA_INVESTOR_10_EN | 600s | | | | |
| ARCANA_EXECUTIVE_5_ES | 300s | | | | |
| ARCANA_TECHNICAL_20_EN | 1200s | | | | |

---

# 22. Required Final Verification Matrix

The final report MUST contain:

| Gate | Required Result | Actual Result |
|---|---|---|
| Typecheck | 0 errors | |
| Architecture | 0 violations | |
| Unit tests | PASS | |
| Duration policy tests | PASS | |
| Determinism | PASS | |
| Project Twin immutability | PASS | |
| Investor pilot | PASS | |
| Executive pilot | PASS | |
| Technical pilot | PASS | |
| Narrative Builder E2E | PASS | |
| Desktop | PASS | |
| Mobile | PASS | |
| Static preview | PASS | |
| Console critical errors | 0 | |
| Critical asset 404s | 0 | |
| Phase 001 regression | PASS | |
| Phase 000A regression | PASS | |
| Phase 0 legacy | 45/45 PASS | |
| Forbidden scope | PASS | |

---

# 23. Completion States

This correction work item may end only in:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

Use:

```text
READY_FOR_APPROVAL
```

only if every mandatory gate passes.

Do NOT declare:

```text
VHOS-PHASE-002 CLOSED
```

Only the human owner may close Phase 002.

---

# 24. Required Final IDE Response

When execution finishes, return:

```text
VHOS-PHASE-002
Verification Correction Complete

Status:
READY_FOR_APPROVAL | NOT_READY | BLOCKED

Duration Budget:
PASS | FAIL

Narrative Builder E2E:
X/X PASS

Architecture:
0 violations

Unit Tests:
X/X PASS

Legacy:
45/45 PASS

Static Preview:
PASS | FAIL

Critical Console Errors:
0 | X

Critical Asset 404:
0 | X

Forbidden Scope:
PASS | FAIL

Updated:
docs/evidence/PHASE_002_VERIFICATION_REPORT.md
```

Then STOP.

Do NOT begin Phase 003.

---

# 25. MASTER EXECUTION PROMPT FOR ANTIGRAVITY

You are working on Venture Hub OS.

Your ONLY authorized work item is:

`VHOS-PHASE-002-CORR-001 — Phase 002 Verification Correction & Closure Gate`

The main implementation of:

`VHOS-PHASE-002 — Adaptive Narrative Engine / SPEC-002`

is already CODE_COMPLETE.

Do NOT redesign it.

Do NOT start Phase 003.

## Objective

Correct the duration/readiness inconsistency and complete the missing verification evidence required before Phase 002 may be formally closed.

## Mandatory correction

The current results include:

```text
ARCANA_INVESTOR_10_EN
Target 10 min
Estimated ~11.2 min

ARCANA_TECHNICAL_20_EN
Target 20 min
Estimated ~24.9 min
Readiness currently READY
```

This must be corrected through reusable narrative duration/readiness policies.

Do NOT hard-code Arcana.

## Default policy

Implement or formalize:

```text
0–10% overflow
NORMAL_TOLERANCE

>10–20%
MODERATE_OVERFLOW

>20%
CRITICAL_OVERFLOW
```

Default readiness:

```text
NORMAL_TOLERANCE
→ READY

MODERATE_OVERFLOW
→ READY_WITH_WARNINGS

CRITICAL_OVERFLOW
→ NOT_READY
```

subject to existing content/gap blockers and explicit versioned profile rules.

## Compression order

When above budget:

```text
Preserve mandatory sections
↓
Reduce optional depth
↓
Reduce optional supporting content
↓
Remove lowest-priority optional steps
↓
Recalculate timing
↓
Evaluate readiness
```

Never silently remove mandatory sections.

## Required tests

Add/update tests for:

- within target;
- <=10% tolerance;
- >10–20% overflow;
- >20% overflow;
- mandatory section preservation;
- optional step pruning;
- deterministic compilation;
- Project Twin immutability;
- no Arcana-specific duration logic.

## Required browser verification

Run and explicitly report:

- Narrative Builder E2E;
- desktop;
- mobile;
- project selection;
- all narrative selectors;
- generation;
- preview;
- gap panel;
- warning panel;
- readiness indicator;
- timing display.

## Required runtime validation

Run static production preview and report:

```text
Critical console errors: 0
Unhandled exceptions: 0
Critical asset 404s: 0
```

## Required regressions

Run and explicitly report:

```text
Phase 001 regression PASS
Phase 000A regression PASS
Phase 0 legacy 45/45 PASS
```

## Forbidden work

Do NOT implement:

- Claims;
- Evidence;
- Data Room;
- AI;
- OpenAI;
- Claude;
- Gemini;
- Ollama;
- Firestore;
- Auth;
- Storage;
- Cloud Functions;
- backend;
- database.

## Required documentation

Update:

```text
docs/evidence/PHASE_002_VERIFICATION_REPORT.md
docs/architecture/NARRATIVE_DURATION_BUDGET.md
docs/architecture/NARRATIVE_READINESS_RULES.md
```

Update ADR-0017 / ADR-0018 only if necessary.

## Final recommendation

Return ONLY one:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

Do NOT mark Phase 002 CLOSED.

Do NOT begin Phase 003.
