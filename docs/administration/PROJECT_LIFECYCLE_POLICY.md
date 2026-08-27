# Project Lifecycle Policy

## 1. Lifecycle State Machine

```
   [ DRAFT ] ──────────┐
      │                │
      ▼                ▼
   [ ACTIVE ] ⇄ [ PAUSED ]
      │                │
      ▼                ▼
   [ ARCHIVED ] ───────┘
      │
      ▼ (Reactivation)
   [ ACTIVE ]
```

## 2. Transition Rules and Write Protection

| State | Reads Allowed | Writes Allowed | AI Execution | Valid Next States |
|---|---|---|---|---|
| `DRAFT` | Yes | Yes | Yes | `ACTIVE`, `ARCHIVED` |
| `ACTIVE` | Yes | Yes | Yes | `PAUSED`, `ARCHIVED` |
| `PAUSED` | Yes | **No** (`PROJECT_PAUSED`) | **No** (`PROJECT_PAUSED`) | `ACTIVE`, `ARCHIVED` |
| `ARCHIVED` | Yes (Historical) | **No** (`PROJECT_ARCHIVED`) | **No** (`PROJECT_ARCHIVED`) | `ACTIVE` |

### Write Protection Enforcement
Write mutations across all domain engines (Project Twin, Claims, Evidence, Narratives, Presentations, Data Room Uploads, and Share Grants) consult `LifecyclePolicy.canWriteProject(status)`. If `allowed: false`, mutations abort immediately with a domain error.
