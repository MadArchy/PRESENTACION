# Presentation Domain Model — Venture Hub OS
**Document ID:** VHOS-ARCH-017  
**Specification:** `SPEC-004 — Executive Presentation Engine`  
**Phase:** `VHOS-PHASE-004`  

---

## 1. Domain Class Diagram

```mermaid
classDiagram
    class PresentationDefinitionEntity {
        -string id
        -string projectId
        -string projectVersion
        -string narrativePlanId
        -string presentationProfileId
        -string themeId
        -Language language
        -AudienceType audience
        -NarrativeObjective objective
        -PresentationReadiness readiness
        -PresentationSceneEntity[] scenes
        -PresentationTrustSummary trustSummary
        +getId() string
        +getScenes() PresentationSceneEntity[]
        +getReadiness() PresentationReadiness
    }

    class PresentationSceneEntity {
        -string id
        -number order
        -SceneTypeVo type
        -SceneRoleVo role
        -SceneStatusVo status
        -BilingualText title
        -LayoutVariantVo layout
        -ContentBinding[] bindings
        -TrustBinding[] trustBindings
        -MediaBinding[] mediaBindings
        +getId() string
        +getOrder() number
        +getType() SceneType
        +getLayout() LayoutVariant
    }

    PresentationDefinitionEntity *-- PresentationSceneEntity
```

---

## 2. Invariants

1. Scenes are derived projections from `ProjectTwin`, `NarrativePlan`, and `NarrativeTrustContext`.
2. Scene ordering is strictly contiguous and 1-indexed.
3. Every scene references its source `NarrativeStep` and canonical `ProjectSectionType`.
4. Presentation models are 100% immutable across rendering cycles.
