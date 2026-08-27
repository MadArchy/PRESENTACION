# Due Diligence Data Room Domain Model

**Specification:** `SPEC-007 — Due Diligence Data Room`  
**Module:** `src/modules/data-room/`  
**Status:** `ACTIVE`  

---

## 1. Domain Architecture Diagram

```mermaid
classDiagram
    class DataRoomEntity {
        +string id
        +string projectId
        +string projectVersion
        +DataRoomStatus status
        +DiligenceCategoryType[] categories
        +string[] documentIds
        +string[] requestIds
        +string checklistId
        +string policyVersion
    }

    class DocumentArtifactEntity {
        +string id
        +string projectId
        +string title
        +DocumentKind kind
        +DiligenceCategoryType category
        +DocumentStatus status
        +ConfidentialityLevel confidentiality
        +DocumentSource source
        +string[] projectSectionRefs
        +string[] claimRefs
        +string[] evidenceRefs
        +string[] requestRefs
    }

    class DiligenceRequestEntity {
        +string id
        +string projectId
        +DiligenceCategoryType category
        +string title
        +DiligencePriority priority
        +DiligenceRequestStatus status
        +DocumentKind[] requiredDocumentKinds
        +string[] linkedDocumentIds
        +string[] linkedClaimIds
        +string[] linkedEvidenceIds
    }

    class DiligenceChecklistEntity {
        +string id
        +string version
        +string name
        +DiligenceChecklistItemEntity[] items
    }

    DataRoomEntity --> DocumentArtifactEntity : contains references
    DataRoomEntity --> DiligenceRequestEntity : contains references
    DataRoomEntity --> DiligenceChecklistEntity : conforms to
    DiligenceRequestEntity ..> DocumentArtifactEntity : resolved by
```

---

## 2. Core Invariants & Governance Rules

1. **Deterministic Taxonomy:** Enforces **23 document kinds** (`CORPORATE`, `LEGAL`, `FINANCIAL`, `TAX`, `COMMERCIAL`, `CUSTOMER`, `MARKET`, `PRODUCT`, `TECHNICAL`, `SECURITY`, `IP`, `REGULATORY`, `TEAM`, `HR`, `OPERATIONS`, `RISK`, `INSURANCE`, `CONTRACT`, `POLICY`, `REPORT`, `MODEL`, `DATASET`, `OTHER`), 16 diligence categories, 9 document statuses, and 4 confidentiality levels.
2. **Strict Traceability:** Document artifacts reference canonical Project Twin sections (`projectSectionRefs`), Claim entities (`claimRefs`), and Evidence objects (`evidenceRefs`).
3. **Informational Security Labels:** Confidentiality tags are metadata labels; access control enforcement is strictly deferred to Phase 008.
4. **Canonical Non-Mutation:** Diligence operations never mutate Project Twin, Claims, or Evidence records.
