# Venture Hub OS — Phase 011: Production Hardening, Observability & Deployment

**Document ID:** `VHOS-PHASE-011`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Version:** `1.0`  
**Status:** `DRAFT_FOR_APPROVAL`  
**Date:** `2026-08-26`  
**Depends on:** `VHOS-PHASE-010 — Organization & Project Administration`  
**Architecture:** Feature-Oriented Hexagonal Web Architecture  
**Primary Objective:** Prepare Venture Hub OS for controlled production deployment without changing core product semantics  
**Next Phase:** `VHOS-PHASE-012 — Release Candidate & Final Acceptance`

---

# 1. Executive Purpose

Phases 000A–010 established the full functional platform.

Phase 011 SHALL NOT add a new business engine.

Its purpose is to answer:

```text
Can this platform be deployed safely?
Can environments be isolated?
Can deployments be reproduced?
Can failures be detected?
Can releases be rolled back?
Can data be restored?
Can abuse be constrained?
Can secrets remain protected?
Can performance remain acceptable?
Can operators understand system health?
```

Target state:

```text
DEVELOPMENT
   ↓
STAGING
   ↓
PRODUCTION
   ↓
OBSERVABILITY
   ↓
ALERTING
   ↓
RECOVERY
   ↓
ROLLBACK
   ↓
OPERATIONS
```

---

# 2. Governing Principle

```text
PRODUCTION HARDENING ≠ NEW PRODUCT SCOPE
```

Phase 011 may modify infrastructure, configuration, security posture, telemetry, deployment workflows, recovery procedures and performance characteristics.

It SHALL NOT redefine:

```text
Project Twin
Claims
Evidence
Narrative
Presentations
Presenter
Copilot
Data Room
Secure Storage
RBAC
Administration
```

except where required to enforce production safety.

---

# 3. Primary Outcomes

At completion, Venture Hub OS SHALL have:

```text
Environment Isolation
Production Configuration
CI/CD
Deployment Gates
Rollback Procedure
Security Headers
CSP
App Check
Runtime Observability
Structured Logging
Operational Metrics
Error Monitoring
Health Probes
Backup Policy
Restore Procedure
Firestore Index Validation
Storage Lifecycle Policy
Rate / Abuse Protection
Performance Budget
Bundle Optimization
Cost Guardrails
Production Runbooks
Incident Response
Release Checklist
```

---

# 4. Environments

Required:

```text
LOCAL
TEST
STAGING
PRODUCTION
```

At minimum Firebase projects/resources SHALL be separated for:

```text
STAGING
PRODUCTION
```

Production MUST NOT reuse emulator data or test credentials.

---

# 5. Environment Configuration

Create an explicit configuration contract.

Recommended:

```ts
interface RuntimeEnvironmentConfig {
  environment: 'LOCAL' | 'TEST' | 'STAGING' | 'PRODUCTION';

  firebaseProjectId: string;
  firebaseAuthDomain: string;
  firebaseStorageBucket: string;

  appCheckEnabled: boolean;
  observabilityEnabled: boolean;

  buildVersion: string;
  commitSha: string;
}
```

No secrets in client config beyond public Firebase web configuration.

---

# 6. Environment Separation Invariant

Required:

```text
STAGING DATA != PRODUCTION DATA
STAGING USERS != PRODUCTION USERS
STAGING STORAGE != PRODUCTION STORAGE
STAGING AUDIT != PRODUCTION AUDIT
```

---

# 7. Environment Guard

Production build SHALL refuse unsafe configurations such as:

```text
localhost emulator hosts
test project IDs
mock adapters
development-only flags
debug secrets
```

---

# 8. CI/CD Pipeline

Required stages:

```text
Install
  ↓
Typecheck
  ↓
Architecture Tests
  ↓
Unit Tests
  ↓
Security Rules Tests
  ↓
Functions Tests
  ↓
E2E
  ↓
Visual Regression
  ↓
Secret Scan
  ↓
Static Asset Scan
  ↓
Production Build
  ↓
Artifact Integrity
  ↓
Deploy Staging
  ↓
Smoke Test
  ↓
Production Approval Gate
  ↓
Deploy Production
  ↓
Production Smoke Test
```

---

# 9. Production Approval Gate

Production deployment SHALL require explicit human approval.

No automatic direct deploy from arbitrary feature branches.

---

# 10. Branch / Release Policy

Recommended:

```text
feature/*
   ↓
main
   ↓
release candidate tag
   ↓
production deployment
```

Exact branch model may adapt to repository reality.

---

# 11. Artifact Versioning

Each production build SHALL identify:

```text
version
commit SHA
build timestamp
environment
```

No secret data.

---

# 12. Deployment Immutability

Deployments should use previously verified build artifacts.

Avoid:

```text
rebuilding different source during production deploy
```

where feasible.

---

# 13. Rollback

Required documented rollback path.

At minimum:

```text
Current release N
   ↓ failure
Rollback
   ↓
Previous known-good release N-1
```

Rollback SHALL cover:

```text
Hosting
Functions
Firestore Rules
Storage Rules
Configuration
```

subject to provider capabilities.

---

# 14. Data Migration Rule

Phase 011 SHALL NOT introduce destructive schema migrations without explicit rollback strategy.

---

# 15. Security Headers

Production Hosting SHALL define appropriate headers.

Required review:

```text
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Strict-Transport-Security
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy where safe
```

Do not add headers that break required Firebase behavior without testing.

---

# 16. CSP

Create explicit Content Security Policy.

CSP SHALL restrict:

```text
script-src
connect-src
img-src
style-src
font-src
frame-src
object-src
base-uri
form-action
frame-ancestors
```

Avoid broad:

```text
*
unsafe-eval
```

unless technically unavoidable and documented.

---

# 17. CSP Report

Required evidence:

```text
docs/security/CONTENT_SECURITY_POLICY.md
```

---

# 18. App Check

Production SHALL enable App Check for supported Firebase services where appropriate.

At minimum evaluate:

```text
Firestore
Storage
Functions
```

App Check does NOT replace Auth or RBAC.

---

# 19. App Check Failure Policy

Invalid/missing App Check in production:

```text
DENY
```

where enforcement is enabled.

---

# 20. Authentication Hardening

Review production Firebase Auth configuration:

```text
authorized domains
email/password provider
email verification
password policy
session behavior
account enumeration protections where available
```

Do not expose test providers in production.

---

# 21. Firestore Production Hardening

Required:

```text
rules deployed from source control
indexes validated
tenant isolation regression
privileged writes denied
audit append-only preserved
```

---

# 22. Firestore Indexes

Create/verify:

```text
firestore.indexes.json
```

No required production query should depend on missing composite indexes.

---

# 23. Storage Production Hardening

Required:

```text
storage.rules deployed
public access disabled
tenant/project path isolation
confidentiality enforcement
direct update/delete restrictions preserved
```

---

# 24. Storage Lifecycle

Define policy for:

```text
orphaned upload objects
deleted/superseded versions
retention
temporary artifacts
```

No physical cleanup without governed retention rules.

---

# 25. Backup Strategy

Define:

```text
Firestore backup/export strategy
Storage backup/retention strategy
Configuration backup
Rules source control
```

---

# 26. Recovery Objectives

Document:

```text
RPO target
RTO target
```

These may be operational targets, not SLA commitments.

---

# 27. Restore Procedure

Required documented restore exercise.

Restore test SHALL use non-production environment.

---

# 28. Disaster Recovery Invariant

A backup that has never been restored is not considered verified.

---

# 29. Logging

Create structured logging policy.

Required fields where applicable:

```text
timestamp
severity
component
requestId
organizationId?
projectId?
actorId?
eventCode
```

Sensitive fields must be excluded.

---

# 30. Log Redaction

Never log:

```text
passwords
Firebase ID tokens
refresh tokens
download tokens
signed URLs
service-account keys
AI provider API keys
raw confidential file contents
```

---

# 31. Correlation IDs

Trusted functions and significant operations SHOULD use correlation/request IDs.

---

# 32. Observability Domains

Required:

```text
AUTH
FIRESTORE
STORAGE
FUNCTIONS
HOSTING
AUDIT
APPLICATION
```

---

# 33. Operational Metrics

At minimum track:

```text
request count
error count
function failures
authorization denials
storage upload failures
storage download denials
latency
build/deploy status
```

Avoid collecting sensitive payloads.

---

# 34. Error Monitoring

Production errors SHALL be distinguishable from handled business denials.

Example:

```text
PERMISSION_DENIED
```

handled correctly is not necessarily application failure.

---

# 35. Alert Classes

Recommended:

```text
CRITICAL
HIGH
MEDIUM
INFO
```

---

# 36. Critical Alerts

Potential critical conditions:

```text
production deploy failure
auth outage
Firestore unavailable
Storage unavailable
Functions failure spike
unexpected cross-tenant authorization anomaly
secret leakage gate failure
backup failure
```

---

# 37. Alerting Boundary

Phase 011 may implement provider-native alerting or equivalent.

Do not create a large custom incident platform.

---

# 38. Health Endpoints / Checks

Production operational checks should validate:

```text
hosting reachable
Firebase config loaded
Firestore reachable
Storage reachable
Functions reachable
```

without leaking data.

---

# 39. Health Detail Security

Health endpoints/UI SHALL NOT expose:

```text
service credentials
stack traces
internal tokens
private storage paths
```

---

# 40. Rate / Abuse Protection

Review and implement appropriate safeguards for:

```text
login attempts
trusted functions
file uploads
share grant operations
AI Copilot calls
```

Exact enforcement may use Firebase/provider-native controls.

---

# 41. AI Cost / Abuse Guard

Copilot production use SHALL have explicit limits.

At minimum:

```text
per-user or per-session request guard
provider error handling
timeout
max output/context constraints
```

No unlimited silent retry loops.

---

# 42. Function Timeouts

Trusted functions SHALL define deterministic timeouts and failure handling.

---

# 43. Retry Policy

Retries SHALL be bounded.

Avoid duplicate privileged mutations.

---

# 44. Idempotency

Privileged commands with retry risk SHOULD support request IDs/idempotency where appropriate.

Critical examples:

```text
CreateProject
TransferOwnership
FinalizeUpload
CreateShareGrant
DeleteSecureFile
```

---

# 45. Performance Budget

Define budgets for key experiences.

Recommended initial targets:

```text
Initial admin shell load
Project list
Project Twin load
Presentation load
Data Room list
```

Use measurable thresholds.

---

# 46. Web Performance

Measure:

```text
bundle size
LCP
INP
CLS
route load time
```

where technically applicable.

---

# 47. Bundle Optimization

Required:

```text
production minification
dead-code elimination
source map policy
asset compression
lazy loading where valuable
```

---

# 48. Source Maps

Production source-map policy SHALL balance debugging and source exposure.

Document decision.

---

# 49. Asset Caching

Public static assets may use long cache with fingerprinting.

Sensitive files MUST remain outside public static asset caching.

---

# 50. Browser Compatibility

Verify supported browsers.

Minimum recommended:

```text
Chrome current
Edge current
Safari current
Firefox current
```

Mobile validation:

```text
iOS Safari
Android Chrome
```

---

# 51. Accessibility Smoke Gate

Phase 011 SHALL add production accessibility smoke checks for major flows.

At minimum:

```text
keyboard access
focus visibility
form labels
button names
basic contrast
dialog focus management
```

This is not a full WCAG certification.

---

# 52. Production Data Seeding

Production SHALL NOT use Arcana test fixtures as production data unless intentionally imported as demo content under a governed process.

---

# 53. Demo Data Boundary

If demo project exists in production:

```text
clearly marked DEMO
isolated from customer organizations
```

---

# 54. Cost Guardrails

Document expected cost-sensitive services:

```text
Firestore reads/writes
Storage bytes/download
Functions invocations
AI provider calls
Hosting bandwidth
```

---

# 55. Cost Alerts

Configure practical budget/usage alerts where provider supports them.

---

# 56. Production Secrets

Server-only secrets SHALL use provider secret management / environment secret facilities.

Never repository or client bundle.

---

# 57. Secret Rotation Runbook

Required documented process for:

```text
AI provider keys
service credentials
webhook/provider secrets if any
```

---

# 58. Dependency Security

Required:

```text
dependency vulnerability scan
lockfile integrity
outdated critical dependency review
```

Do not blindly auto-upgrade major dependencies in this phase.

---

# 59. Supply Chain

CI SHALL use pinned/reviewed actions where practical.

Avoid untrusted arbitrary script execution.

---

# 60. Static Security Scan

Required:

```text
secret scan
sensitive asset scan
unsafe configuration scan
```

---

# 61. Production Configuration Scan

Detect:

```text
emulator endpoints
debug flags
mock adapters
test identities
localhost-only references
public storage config
```

in production bundle/config.

---

# 62. Incident Response

Create:

```text
docs/operations/INCIDENT_RESPONSE_RUNBOOK.md
```

Minimum:

```text
identify
contain
investigate
recover
verify
document
```

---

# 63. Security Incident Classes

Examples:

```text
credential exposure
cross-tenant access anomaly
unauthorized admin mutation
public binary exposure
malicious upload
data loss
```

---

# 64. Audit Preservation

Incident response SHALL preserve audit evidence where possible.

---

# 65. Deployment Runbook

Required:

```text
docs/operations/PRODUCTION_DEPLOYMENT_RUNBOOK.md
```

---

# 66. Rollback Runbook

Required:

```text
docs/operations/ROLLBACK_RUNBOOK.md
```

---

# 67. Backup / Restore Runbook

Required:

```text
docs/operations/BACKUP_RESTORE_RUNBOOK.md
```

---

# 68. Secrets Runbook

Required:

```text
docs/operations/SECRET_ROTATION_RUNBOOK.md
```

---

# 69. Operational Ownership

Each runbook SHOULD identify:

```text
owner role
trigger
required evidence
exit condition
```

No personal names required.

---

# 70. Production Readiness Dashboard

Create read-only administrative readiness view or report.

Required categories:

```text
Security
Auth
Firestore
Storage
Functions
Hosting
Backups
Observability
Performance
Deployment
```

---

# 71. ProductionReadinessStatus

Required:

```text
READY
READY_WITH_WARNINGS
NOT_READY
UNKNOWN
```

No opaque score.

---

# 72. ProductionReadinessCheck

Explainable:

```ts
interface ProductionReadinessCheck {
  id: string;
  category: string;
  status: 'PASS' | 'WARN' | 'FAIL' | 'UNKNOWN';
  evidence: string[];
}
```

---

# 73. No Black-Box Readiness Score

Do not create a single unexplained percentage.

---

# 74. Production Release Candidate

Phase 011 may generate:

```text
RC-1
```

but final product acceptance belongs to Phase 012.

---

# 75. Threat Model Extension

Extend with:

```text
T-46 Staging/Production Environment Mix-Up
T-47 Production Emulator Endpoint Exposure
T-48 Missing CSP / Script Injection Expansion
T-49 App Check Bypass / Missing Enforcement
T-50 Production Secret Leakage
T-51 Unsafe Deployment Without Approval
T-52 Deployment Artifact Drift
T-53 Rollback Failure
T-54 Backup Exists But Restore Fails
T-55 Logging Sensitive Tokens
T-56 Alerting Blind Spot
T-57 Unbounded Retry Duplicate Mutation
T-58 AI Request Abuse / Cost Explosion
T-59 Public Cache Exposure of Sensitive Content
T-60 Dependency / Supply Chain Compromise
```

Each:

```text
attack/failure path
control
verification
residual risk
```

---

# 76. Workstreams

## WS-011-01 Environment Isolation
## WS-011-02 CI/CD
## WS-011-03 Security Headers & CSP
## WS-011-04 App Check
## WS-011-05 Observability & Logging
## WS-011-06 Backup / Restore
## WS-011-07 Rollback
## WS-011-08 Rate / Abuse Protection
## WS-011-09 Performance
## WS-011-10 Dependency / Supply Chain
## WS-011-11 Cost Guardrails
## WS-011-12 Runbooks
## WS-011-13 Production Readiness
## WS-011-14 Verification

---

# 77. Task Breakdown — Environment

### T-011-001
Define environment configuration contract.

### T-011-002
Create staging environment.

### T-011-003
Create production environment configuration.

### T-011-004
Implement environment guard.

### T-011-005
Block emulator endpoints in production.

### T-011-006
Block mock adapters in production.

### T-011-007
Document environment separation.

---

# 78. Task Breakdown — CI/CD

### T-011-101
Create/upgrade CI workflow.

### T-011-102
Run typecheck gate.

### T-011-103
Run architecture gate.

### T-011-104
Run unit/regression gate.

### T-011-105
Run Firestore Rules gate.

### T-011-106
Run Storage Rules gate.

### T-011-107
Run Functions gate.

### T-011-108
Run E2E gate.

### T-011-109
Run visual regression gate.

### T-011-110
Run secret scan.

### T-011-111
Run static asset scan.

### T-011-112
Run production configuration scan.

### T-011-113
Create production build artifact.

### T-011-114
Deploy staging.

### T-011-115
Run staging smoke tests.

### T-011-116
Add production approval gate.

### T-011-117
Deploy production.

### T-011-118
Run production smoke tests.

---

# 79. Task Breakdown — Security Headers

### T-011-201
Create CSP.

### T-011-202
Add X-Content-Type-Options.

### T-011-203
Add Referrer-Policy.

### T-011-204
Add Permissions-Policy.

### T-011-205
Add HSTS.

### T-011-206
Review COOP/CORP.

### T-011-207
Test Firebase compatibility.

---

# 80. Task Breakdown — App Check

### T-011-301
Configure staging App Check.

### T-011-302
Configure production App Check.

### T-011-303
Enforce Firestore where applicable.

### T-011-304
Enforce Storage where applicable.

### T-011-305
Enforce Functions where applicable.

### T-011-306
Test invalid App Check denial.

---

# 81. Task Breakdown — Observability

### T-011-401
Create logging policy.

### T-011-402
Implement structured logging.

### T-011-403
Implement token/secret redaction.

### T-011-404
Add request/correlation IDs.

### T-011-405
Create operational metrics.

### T-011-406
Create error monitoring integration.

### T-011-407
Create alert classes.

### T-011-408
Create critical alerts.

### T-011-409
Create health/readiness dashboard.

---

# 82. Task Breakdown — Backup / Recovery

### T-011-501
Define Firestore backup strategy.

### T-011-502
Define Storage retention/backup policy.

### T-011-503
Define RPO/RTO targets.

### T-011-504
Create restore procedure.

### T-011-505
Execute staging restore exercise.

### T-011-506
Produce restore evidence.

---

# 83. Task Breakdown — Rollback

### T-011-601
Document release rollback.

### T-011-602
Test Hosting rollback.

### T-011-603
Test Functions rollback.

### T-011-604
Test Rules rollback.

### T-011-605
Test configuration rollback.

### T-011-606
Create rollback evidence.

---

# 84. Task Breakdown — Abuse / Reliability

### T-011-701
Review login abuse protections.

### T-011-702
Add trusted function abuse guard.

### T-011-703
Add upload abuse guard.

### T-011-704
Add share operation abuse guard.

### T-011-705
Add Copilot request guard.

### T-011-706
Add bounded retries.

### T-011-707
Add idempotency where required.

---

# 85. Task Breakdown — Performance

### T-011-801
Define performance budgets.

### T-011-802
Measure production bundle.

### T-011-803
Measure key route loads.

### T-011-804
Measure presentation route.

### T-011-805
Measure Data Room route.

### T-011-806
Optimize bundle.

### T-011-807
Validate asset caching.

### T-011-808
Validate sensitive content no-cache behavior.

---

# 86. Task Breakdown — Browser / Accessibility

### T-011-901
Chrome smoke test.

### T-011-902
Edge smoke test.

### T-011-903
Firefox smoke test.

### T-011-904
Safari smoke test.

### T-011-905
Android Chrome smoke test.

### T-011-906
iOS Safari smoke test.

### T-011-907
Keyboard smoke test.

### T-011-908
Focus/label/dialog accessibility smoke.

---

# 87. Task Breakdown — Supply Chain

### T-011-1001
Run dependency vulnerability scan.

### T-011-1002
Review critical/high findings.

### T-011-1003
Validate lockfile.

### T-011-1004
Review CI action pinning.

### T-011-1005
Document accepted residual risks.

---

# 88. Task Breakdown — Cost Guardrails

### T-011-1101
Document Firestore cost drivers.

### T-011-1102
Document Storage cost drivers.

### T-011-1103
Document Functions cost drivers.

### T-011-1104
Document AI provider cost drivers.

### T-011-1105
Configure budget/usage alerts where supported.

---

# 89. Task Breakdown — Documentation

### T-011-1201
Create environment reference.

### T-011-1202
Create CI/CD reference.

### T-011-1203
Create CSP reference.

### T-011-1204
Create App Check reference.

### T-011-1205
Create observability reference.

### T-011-1206
Create backup/restore runbook.

### T-011-1207
Create rollback runbook.

### T-011-1208
Create production deployment runbook.

### T-011-1209
Create incident response runbook.

### T-011-1210
Create secret rotation runbook.

### T-011-1211
Create performance budget reference.

### T-011-1212
Create cost guardrail reference.

### T-011-1213
Create SPEC-011 traceability matrix.

### T-011-1214
Create Phase 011 verification report.

---

# 90. Mandatory Environment Gates

Required:

```text
Local uses emulators                         PASS
Staging isolated from Production             PASS
Production emulator endpoints                0
Production mock adapters                     0
Production test credentials                  0
Production test organization fixtures        0
```

---

# 91. Mandatory CI/CD Gates

Required individually:

```text
Typecheck
Architecture
Unit/Domain
Firestore Rules
Storage Rules
Functions
E2E
Visual
Secret Scan
Sensitive Asset Scan
Production Config Scan
Production Build
Staging Deploy
Staging Smoke
Production Approval
Production Deploy
Production Smoke
```

---

# 92. Mandatory Security Header Matrix

Required:

```text
CSP
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
HSTS
```

Each:

```text
PRESENT
VALIDATED
PASS
```

---

# 93. Mandatory CSP Negative Tests

Required:

```text
Inline/eval policy reviewed
Unexpected external script origin denied
Unexpected external connect origin denied
frame-ancestors policy validated
object-src blocked
```

---

# 94. Mandatory App Check Matrix

Required:

```text
Valid App Check Firestore           ALLOW PASS
Invalid App Check Firestore         DENY PASS

Valid App Check Storage             ALLOW PASS
Invalid App Check Storage           DENY PASS

Valid App Check Functions           ALLOW PASS
Invalid App Check Functions         DENY PASS
```

where provider enforcement is technically supported.

---

# 95. Mandatory Logging / Redaction Matrix

Required:

```text
Password logged                     0
Firebase ID token logged            0
Refresh token logged                0
Storage download token logged       0
Signed URL logged                   0
AI provider secret logged           0
Confidential file body logged       0
```

---

# 96. Mandatory Backup / Restore Gate

Required:

```text
Backup policy documented            PASS
Staging backup created              PASS
Staging restore executed            PASS
Restored data validated             PASS
RPO documented                      PASS
RTO documented                      PASS
```

---

# 97. Mandatory Rollback Gate

Required:

```text
Hosting rollback                    PASS
Functions rollback                  PASS
Firestore Rules rollback            PASS
Storage Rules rollback              PASS
Config rollback procedure           PASS
Rollback smoke test                 PASS
```

---

# 98. Mandatory Reliability Gate

Required:

```text
Bounded retry policy                PASS
Duplicate privileged mutation       0
Idempotency critical commands       PASS
Function timeout policy             PASS
```

---

# 99. Mandatory Performance Gate

Define exact thresholds before measuring.

Minimum report:

```text
Production bundle size
Initial shell load
Project list load
Project Twin load
Presentation load
Data Room load
LCP
INP
CLS
```

Result:

```text
PASS / WARN / FAIL
```

with documented thresholds.

---

# 100. Mandatory Browser Matrix

Required:

```text
Chrome current          PASS
Edge current            PASS
Firefox current         PASS
Safari current          PASS
Android Chrome          PASS
iOS Safari              PASS
```

---

# 101. Mandatory Accessibility Smoke Matrix

Required:

```text
Keyboard navigation     PASS
Visible focus           PASS
Form labels             PASS
Button accessible names PASS
Dialog focus            PASS
Basic contrast          PASS
```

---

# 102. Mandatory Dependency Security Gate

Required:

```text
Critical vulnerabilities     0
Unresolved high findings      0 or documented accepted risk
Lockfile integrity            PASS
CI action review              PASS
```

---

# 103. Mandatory Cost Guardrail Gate

Required:

```text
Firestore budget visibility       PASS
Storage budget visibility         PASS
Functions budget visibility       PASS
AI cost visibility                PASS
Budget/usage alerting             PASS or documented unsupported
```

---

# 104. Production Readiness Matrix

Required categories:

```text
Security
Authentication
Firestore
Storage
Functions
Hosting
CI/CD
Observability
Backups
Rollback
Performance
Browser Compatibility
Accessibility
Dependencies
Costs
```

No opaque percentage.

---

# 105. Mandatory Production Smoke E2E

Minimum:

```text
1 Login
2 Organization Load
3 Project Load
4 Project Twin Read
5 Presentation Load
6 Presenter Load
7 Data Room Load
8 Secure File Authorized Read
9 Secure File Unauthorized Denial
10 Copilot Permission Check
11 Administrative Audit Read
12 Health/Readiness View
```

Required:

```text
12/12 PASS
```

No destructive test on real customer data.

---

# 106. Production Data Safety

Production smoke tests SHALL use:

```text
dedicated production smoke-test organization/project
```

or non-destructive read-only checks.

No Arcana development fixture mutation in production.

---

# 107. Forbidden Scope

Final report MUST state:

```text
New Business Features                   NOT IMPLEMENTED
Billing                                 NOT IMPLEMENTED
Subscriptions                           NOT IMPLEMENTED
Payments                                NOT IMPLEMENTED
Public Marketplace                      NOT IMPLEMENTED
General-Purpose Backend API             NOT IMPLEMENTED
Canonical Project Twin Migration        NOT IMPLEMENTED
Canonical Claims Migration              NOT IMPLEMENTED
Canonical Evidence Migration            NOT IMPLEMENTED
AI Administrative Auto-Write            NOT IMPLEMENTED
Anonymous Public File Sharing           NOT IMPLEMENTED
```

---

# 108. Canonical Safety Gate

Required:

```text
Production hardening Project Twin fact mutations   0
Production hardening Claims mutations              0
Production hardening Evidence mutations            0
```

---

# 109. Secret Scan Gate

Required:

```text
Repository private keys          0
Service account JSON             0
Firebase Admin private keys      0
Storage access tokens            0
Signed URL secrets               0
AI provider keys                 0
Production bundle secrets        0
```

---

# 110. Runtime Gate

Required:

```text
Critical console errors          0
Unhandled exceptions             0
Critical asset 404s              0
```

---

# 111. Regression Gate

Required:

```text
Phase 011 Production Hardening         PASS
Phase 010 Administration               PASS
Phase 009 Secure Storage               PASS
Phase 008 Security                     PASS
Phase 007 Data Room                    PASS
Phase 006 AI Copilot                   PASS
Phase 005 Presenter                    PASS
Phase 004 Presentation                 PASS
Phase 003 Claims/Evidence              PASS
Phase 002 Narrative                    PASS
Phase 001 Project Twin                 PASS
Phase 000A Foundation                  PASS
Phase 0 Legacy                         45/45 PASS minimum
```

---

# 112. Required Documentation

Create:

```text
docs/production/ENVIRONMENT_REFERENCE.md
docs/production/PRODUCTION_CONFIGURATION_POLICY.md
docs/production/CI_CD_PIPELINE_REFERENCE.md
docs/production/PRODUCTION_READINESS_MODEL.md
docs/production/PERFORMANCE_BUDGET.md
docs/production/COST_GUARDRAILS.md

docs/security/CONTENT_SECURITY_POLICY.md
docs/security/APP_CHECK_POLICY.md
docs/security/PRODUCTION_SECRET_POLICY.md

docs/operations/PRODUCTION_DEPLOYMENT_RUNBOOK.md
docs/operations/ROLLBACK_RUNBOOK.md
docs/operations/BACKUP_RESTORE_RUNBOOK.md
docs/operations/INCIDENT_RESPONSE_RUNBOOK.md
docs/operations/SECRET_ROTATION_RUNBOOK.md

docs/observability/OBSERVABILITY_REFERENCE.md
docs/observability/LOGGING_REDACTION_POLICY.md
docs/observability/ALERTING_POLICY.md

docs/evidence/SPEC_011_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_011_VERIFICATION_REPORT.md
docs/evidence/PRODUCTION_READINESS_REPORT.md
```

---

# 113. Recommended ADRs

Create:

```text
ADR-0099 Environment Isolation for Production
ADR-0100 Immutable Verified Deployment Artifacts
ADR-0101 Human Production Approval Gate
ADR-0102 Production CSP and Security Headers
ADR-0103 App Check Complements Auth/RBAC
ADR-0104 Structured Logging with Mandatory Redaction
ADR-0105 Verified Backup Requires Restore Exercise
ADR-0106 Rollback to Known-Good Release
ADR-0107 Bounded Retries and Idempotent Privileged Operations
ADR-0108 Explainable Production Readiness
ADR-0109 Production Hardening Does Not Change Canonical Venture Truth
```

---

# 114. Required Verification Report

Generate:

```text
docs/evidence/PHASE_011_VERIFICATION_REPORT.md
```

Required sections:

## Identification

```text
Phase
SPEC
date
branch
starting commit
ending commit
release candidate
staging project identifier
production project identifier
build artifact identifier
```

No secrets.

## Environment Isolation

Report all environment gates.

## CI/CD

Report every stage.

## Security Headers / CSP

Report matrix and negative tests.

## App Check

Report ALLOW/DENY matrix.

## Auth

Report production auth configuration.

## Firestore

Report rules/indexes.

## Storage

Report rules/private access.

## Functions

Report deployment/timeouts/idempotency.

## Observability

Report logs, metrics, alerts.

## Redaction

Report zero leaked sensitive categories.

## Backup / Restore

Report actual staging restore exercise.

## Rollback

Report all rollback tests.

## Performance

Report measured thresholds.

## Browsers

Report six targets.

## Accessibility

Report smoke matrix.

## Dependencies

Report vulnerability status.

## Costs

Report visibility/alerts.

## Production Smoke

Report 12/12 individually.

## Threat Model

Report T-46..T-60 individually.

## Canonical Safety

Report zero mutations.

## Runtime

Report 0/0/0.

## Regression

Report all previous phases.

## Forbidden Scope

Explicit.

## Final Recommendation

Allowed:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

---

# 115. SDD State Machine

```text
DRAFT_FOR_APPROVAL
        ↓
APPROVED
        ↓
IMPLEMENTING
        ↓
CODE_COMPLETE
        ↓
VERIFIED
        ↓
CLOSED
```

IDE must not self-close.

---

# 116. Change Control

Any proposal to add:

```text
new business module
billing
subscription system
customer marketplace
new canonical schema migration
general-purpose backend API
```

requires:

```text
CHANGE_REQUEST_011_XXX.md
```

---

# 117. AI IDE Master Execution Prompt

## AUTHORIZED WORK ITEM

`VHOS-PHASE-011 — Production Hardening, Observability & Deployment`

under:

`SPEC-011 — Production Hardening, Observability & Deployment`

Previous phase:

`VHOS-PHASE-010 — Organization & Project Administration`

is approved CLOSED.

---

## PRIMARY OBJECTIVE

Prepare the existing Venture Hub OS platform for controlled production operation.

Do not expand product scope.

---

## BEFORE WRITING CODE

You MUST:

1. read Phase 008–010 security/storage/admin architecture;
2. inspect existing Firebase environments;
3. inspect current CI;
4. inspect hosting headers;
5. inspect Firestore and Storage rules;
6. inspect current Functions configuration;
7. inspect logging;
8. inspect secrets/config handling;
9. inspect build output;
10. inspect existing backup/restore capability;
11. run full baseline;
12. extend threat model T-46..T-60;
13. map tasks to T-011-*.

---

## IMPLEMENTATION ORDER

```text
Baseline
 ↓
Environment Isolation
 ↓
Production Config Guard
 ↓
CI/CD Gates
 ↓
Security Headers/CSP
 ↓
App Check
 ↓
Observability/Redaction
 ↓
Backup & Restore
 ↓
Rollback
 ↓
Reliability / Idempotency
 ↓
Performance
 ↓
Browser / Accessibility
 ↓
Dependency Security
 ↓
Cost Guardrails
 ↓
Runbooks
 ↓
Production Readiness
 ↓
Verification
```

---

## CRITICAL RULE 1

```text
NO NEW BUSINESS FEATURES
```

---

## CRITICAL RULE 2

```text
NO PRODUCTION EMULATOR ENDPOINTS
```

---

## CRITICAL RULE 3

```text
NO SECRETS IN REPO OR CLIENT BUNDLE
```

---

## CRITICAL RULE 4

```text
BACKUP IS NOT VERIFIED UNTIL RESTORE PASSES
```

---

## CRITICAL RULE 5

```text
PRODUCTION DEPLOYMENT REQUIRES HUMAN APPROVAL
```

---

## CRITICAL RULE 6

```text
PRODUCTION HARDENING MUST NOT MUTATE CANONICAL VENTURE TRUTH
```

---

## REQUIRED FINAL OUTPUTS

Create:

```text
docs/evidence/SPEC_011_TRACEABILITY_MATRIX.md
docs/evidence/PHASE_011_VERIFICATION_REPORT.md
docs/evidence/PRODUCTION_READINESS_REPORT.md
```

Final status only:

```text
READY_FOR_APPROVAL
NOT_READY
BLOCKED
```

Do NOT mark Phase 011 CLOSED.

Do NOT start Phase 012.

---

# 118. Expected End State

```text
                        VENTURE HUB OS
                              │
                      VERIFIED APPLICATION
                              │
                              ▼
                     STAGING ENVIRONMENT
                              │
                       FULL RELEASE GATES
                              │
                              ▼
                   HUMAN PRODUCTION APPROVAL
                              │
                              ▼
                     PRODUCTION DEPLOYMENT
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
    OBSERVABILITY          BACKUPS              SECURITY
         │                    │                    │
         ▼                    ▼                    ▼
      ALERTING             RESTORE              APP CHECK
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
                          OPERATIONS
                              │
                              ▼
                         PHASE 012
                    FINAL ACCEPTANCE
```

---

# 119. Definition of Done

Phase 011 becomes `CODE_COMPLETE` when all implementation workstreams exist.

Phase 011 becomes `VERIFIED` only when:

```text
Environment Isolation                    PASS
Production Config Guard                  PASS
CI/CD                                    PASS
Security Headers                         PASS
CSP                                      PASS
App Check                                PASS
Auth Production Configuration            PASS
Firestore Production Rules               PASS
Storage Production Rules                 PASS
Functions Production Configuration       PASS

Logging                                  PASS
Sensitive Log Leakage                    0
Observability                            PASS
Alerting                                 PASS

Backup Policy                            PASS
Restore Exercise                         PASS
Rollback                                 PASS

Bounded Retries                          PASS
Idempotency                              PASS

Performance                              PASS / accepted documented WARN
Browser Matrix                           PASS
Accessibility Smoke                      PASS

Critical Dependency Vulnerabilities      0
Unresolved High Findings                 0 or accepted documented risk

Cost Visibility                          PASS
Budget Alerts                            PASS / documented provider limitation

Production Smoke                         12/12 PASS

Threats T-46..T-60                      PASS

Canonical Project Twin Mutations         0
Canonical Claims Mutations               0
Canonical Evidence Mutations             0

Critical Console Errors                  0
Unhandled Exceptions                     0
Critical Asset 404s                      0

Phase 010..000A Regression               PASS
Phase 0 Legacy                           45/45 PASS

Forbidden Scope                          PASS
```

Only human approval may set:

```text
VERIFIED/CLOSED
```

---

# 120. Exit Decision

If all mandatory gates pass:

> **Apruebo formalmente VHOS-PHASE-011 — Production Hardening, Observability & Deployment bajo SPEC-011 como VERIFIED/CLOSED y autorizo el inicio de VHOS-PHASE-012 — Release Candidate & Final Acceptance, manteniendo la arquitectura Feature-Oriented Hexagonal, el aislamiento estricto de entornos, el despliegue reproducible con aprobación humana, la observabilidad segura, la restauración verificada, el rollback a versión conocida, la autorización fail-closed y la prohibición de mutaciones a la verdad canónica durante el hardening productivo.**
