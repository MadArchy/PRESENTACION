# Project Versioning Model — Venture Hub OS
**Document ID:** VHOS-ARCH-003  
**Specification:** `SPEC-001`  
**Phase:** `VHOS-PHASE-001`  

---

## 1. Two-Tier Versioning Principle

Every venture package distinguishes between two independent version lifecycles:

1. **`schemaVersion` (Venture Hub Platform Schema):**
   * Represents the structural version of the Venture Hub data model (e.g. `"1.0"`).
   * Incremented when canonical section types, validator rules, or entity contracts change.

2. **`projectVersion` (Venture Release Version):**
   * Represents the specific iteration or pitch milestone of the venture (e.g. `"0.1.0"`, `"1.0.0"`).
   * Incremented when founders update business models, raise new capital, or hit roadmap milestones.

---

## 2. Directory Layout & Persistence Model

```text
data/projects/{slug}/
├── project.manifest.json    # Light metadata manifest used for quick listings
├── current.json             # Canonical active Project Twin (matching currentVersion)
└── versions/
    ├── 0.1.0.json           # Immutable historical snapshot of version 0.1.0
    └── 0.2.0.json           # Future immutable release snapshot
```
