# Narrative Domain Model — Venture Hub OS
**Document ID:** VHOS-ARCH-005  
**Specification:** `SPEC-002 — Adaptive Narrative Engine`  
**Phase:** `VHOS-PHASE-002`  

---

## 1. Domain Architecture Overview

```mermaid
classDiagram
    class NarrativeCompiler {
        +compile(project, request, profile) NarrativePlanEntity
    }

    class NarrativePlanEntity {
        +string id
        +string projectId
        +string projectVersion
        +string profileId
        +string profileVersion
        +NarrativeRequest request
        +NarrativeReadiness readiness
        +number totalEstimatedSeconds
        +NarrativeStepEntity[] steps
        +NarrativeWarning[] warnings
        +NarrativeGap[] gaps
        +ProjectSectionType[] omittedSectionTypes
        +string generatedAt
        +string engineVersion
    }

    class NarrativeStepEntity {
        +string id
        +number order
        +NarrativeRole role
        +ProjectSectionType sectionType
        +string title
        +number priority
        +NarrativeDepth depth
        +number estimatedSeconds
        +string rationale
        +NarrativeStepStatus status
        +string sourceSectionId
        +boolean isLanguageFallback
    }

    class NarrativeProfile {
        +string id
        +string name
        +string profileVersion
        +AudienceType audience
        +NarrativeObjective[] supportedObjectives
        +ProjectSectionType[] mandatorySections
        +Record sectionPriorities
        +Record roleMappings
        +Record durationBudgets
    }

    NarrativeCompiler --> NarrativePlanEntity : compiles
    NarrativePlanEntity "1" *-- "*" NarrativeStepEntity : contains steps
    NarrativeCompiler ..> NarrativeProfile : reads policy from
```
