# Evidence Domain Model — Venture Hub OS
**Document ID:** VHOS-ARCH-011  
**Specification:** `SPEC-003 — Claims & Evidence Governance`  
**Phase:** `VHOS-PHASE-003`  

---

## 1. Evidence Entities & Relationships

```mermaid
classDiagram
    class EvidenceEntity {
        -string id
        -string projectId
        -string projectVersion
        -EvidenceTypeVo type
        -EvidenceStatusVo status
        -string title
        -string description
        -EvidenceSource source
        +getId() string
        +getStatus() EvidenceStatus
        +getSource() EvidenceSource
    }

    class EvidenceLinkEntity {
        -string id
        -string claimId
        -string evidenceId
        -string projectId
        -EvidenceRelationVo relation
        -EvidenceLinkStatus status
        +getRelation() EvidenceRelation
        +isActive() boolean
    }

    EvidenceEntity "1" <.. "many" EvidenceLinkEntity : referenced by
```

---

## 2. Evidence Types & Statuses

- **Types:** `DOCUMENT`, `DATASET`, `CALCULATION`, `OBSERVATION`, `EXPERIMENT`, `SYSTEM_RECORD`, `EXTERNAL_REFERENCE`, `MEDIA`, `OTHER`
- **Statuses:** `AVAILABLE`, `MISSING`, `SUPERSEDED`, `DISPUTED`, `INVALID`
- **Relations:** `SUPPORTS`, `PARTIALLY_SUPPORTS`, `CONTRADICTS`, `CONTEXT_ONLY`
