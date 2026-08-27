# Claims Domain Model — Venture Hub OS
**Document ID:** VHOS-ARCH-010  
**Specification:** `SPEC-003 — Claims & Evidence Governance`  
**Phase:** `VHOS-PHASE-003`  

---

## 1. Domain Entities & Value Objects

```mermaid
classDiagram
    class ClaimEntity {
        -string id
        -string projectId
        -string projectVersion
        -ProjectSectionType sectionType
        -BilingualText text
        -ClaimTypeVo type
        -ClaimStatusVo status
        -ClaimSupportStatusVo supportStatus
        -ClaimReviewStatusVo reviewStatus
        -ClaimMaterialityVo materiality
        -string[] evidenceLinkIds
        -SourceReference[] sourceRefs
        +getId() string
        +getType() ClaimType
        +getSupportStatus() ClaimSupportStatus
        +getMateriality() ClaimMateriality
    }

    class ClaimTypeVo {
        -ClaimType value
        +isFact() boolean
        +requiresEvidence() boolean
    }

    class ClaimSupportStatusVo {
        -ClaimSupportStatus value
        +isSupported() boolean
        +isContradicted() boolean
    }

    class ClaimMaterialityVo {
        -ClaimMateriality value
        +isCriticalOrHigh() boolean
    }

    ClaimEntity *-- ClaimTypeVo
    ClaimEntity *-- ClaimSupportStatusVo
    ClaimEntity *-- ClaimMaterialityVo
```

---

## 2. Invariants

1. Every claim is strictly bound to a `projectId` and `projectVersion`.
2. Every claim belongs to a canonical `ProjectSectionType`.
3. Claims have bilingual text representation (`BilingualText`).
4. Type classification (`FACT`, `ESTIMATE`, `ASSUMPTION`, `TARGET`, `HYPOTHESIS`) is immutable by presentation layers.
