# Architecture Decision Records: Phase 011 Suite (ADR-0099 .. ADR-0109)

## ADR-0099: Environment Isolation for Production
- **Status:** Accepted
- **Context:** Staging and production workloads must be fully isolated to avoid cross-tenant contamination or data leakage.
- **Decision:** Separate Firebase project IDs, storage buckets, and auth domains for staging and production. Enforce `EnvironmentGuardPolicy` fail-closed in production builds.

## ADR-0100: Immutable Verified Deployment Artifacts
- **Status:** Accepted
- **Context:** Rebuilding code during production deployment introduces non-deterministic artifact drift.
- **Decision:** Build once in CI/CD, run all test gates, deploy to staging, and release the identical immutable artifact to production upon approval.

## ADR-0101: Human Production Approval Gate
- **Status:** Accepted
- **Context:** Automated continuous deployment directly to production poses operational risk.
- **Decision:** Require explicit human operator sign-off in GitHub Actions / deployment pipeline before releasing to production.

## ADR-0102: Production CSP and Security Headers
- **Status:** Accepted
- **Context:** Web clients must be protected against clickjacking, script injection, and MIME-sniffing.
- **Decision:** Define strict CSP, HSTS, X-Content-Type-Options: nosniff, Referrer-Policy, and COOP headers in `firebase.json`.

## ADR-0103: App Check Complements Auth/RBAC
- **Status:** Accepted
- **Context:** Direct API queries from unauthorized clients or bots can incur cost and abuse.
- **Decision:** Enforce Firebase App Check on Firestore, Storage, and Functions to complement (not replace) user Auth and RBAC.

## ADR-0104: Structured Logging with Mandatory Redaction
- **Status:** Accepted
- **Context:** Application logs can inadvertently capture sensitive tokens, passwords, or confidential file contents.
- **Decision:** Implement JSON structured logging with correlation IDs and deep metadata sanitization in `LogRedactionPolicy`.

## ADR-0105: Verified Backup Requires Restore Exercise
- **Status:** Accepted
- **Context:** Backups that have never been tested for restoration cannot be trusted in disaster recovery scenarios.
- **Decision:** Require scheduled automated exports and periodic verified restore exercises in the staging environment.

## ADR-0106: Rollback to Known-Good Release
- **Status:** Accepted
- **Context:** In the event of a production incident, rapid recovery is essential.
- **Decision:** Establish documented runbooks to roll back Hosting, Functions, and Rules to the previous known-good release $N-1$.

## ADR-0107: Bounded Retries and Idempotent Privileged Operations
- **Status:** Accepted
- **Context:** Network retries on state-mutating commands risk duplicate mutations or corrupted states.
- **Decision:** Implement `IdempotencyPolicy` and request IDs for critical administrative commands (e.g. `CreateProject`, `TransferOwnership`).

## ADR-0108: Explainable Production Readiness
- **Status:** Accepted
- **Context:** Single-number black-box readiness scores obscure specific risks and actionable failures.
- **Decision:** Implement a 10-category diagnostic model with explicit evidence checklists and status evaluations (`PASS`/`WARN`/`FAIL`).

## ADR-0109: Production Hardening Does Not Change Canonical Venture Truth
- **Status:** Accepted
- **Context:** Infrastructure and observability changes must never modify business logic, domain models, or venture truth.
- **Decision:** Project Twin facts, Claims, and Evidence remain immutable throughout production hardening.
