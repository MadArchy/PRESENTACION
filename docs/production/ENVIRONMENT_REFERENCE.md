# Environment Reference: Venture Hub OS

**Document ID:** `ENVIRONMENT_REFERENCE`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Status:** `ACTIVE`  

---

## 1. Environment Topology & Isolation

Venture Hub OS isolates four operational runtime environments:

| Environment | Purpose | Firebase Project Target | App Check | Observability | Emulator Endpoints |
|---|---|---|:---:|:---:|:---:|
| **LOCAL** | Local development and interactive inspection | Local Emulators (`vhos-demo-local`) | Disabled | Local console | `ALLOWED` |
| **TEST** | Automated headless testing and CI runner gates | Ephemeral In-Memory / Test Mock | Disabled | Headless | `ALLOWED` |
| **STAGING** | Pre-production validation and restore exercises | Dedicated Staging Project (`vhos-staging`) | Enforced | Cloud Logging & Metrics | `FORBIDDEN` |
| **PRODUCTION** | Live multi-tenant operational workloads | Dedicated Production Project (`vhos-production`) | Enforced | Full Observability & Alerting | `FORBIDDEN` |

---

## 2. Environment Separation Invariant

```text
STAGING DATA    != PRODUCTION DATA
STAGING USERS   != PRODUCTION USERS
STAGING STORAGE != PRODUCTION STORAGE
STAGING AUDIT   != PRODUCTION AUDIT
```

The production build pipeline enforces `EnvironmentGuardPolicy`, rejecting any configuration referencing localhost, emulator endpoints, mock adapters, or development credentials.
