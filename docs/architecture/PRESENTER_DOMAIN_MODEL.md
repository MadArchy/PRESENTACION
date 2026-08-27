# Presenter Domain Model — Venture Hub OS
**Document ID:** VHOS-ARCH-025  
**Specification:** `SPEC-005 — Executive Presenter Cockpit`  
**Phase:** `VHOS-PHASE-005`  

---

## 1. Domain Class Diagram

```mermaid
classDiagram
    class PresenterSessionEntity {
        -string id
        -string presentationId
        -SessionStatusVo status
        -PresenterMode mode
        -number currentSceneIndex
        -number totalElapsedSeconds
        -number sceneElapsedSeconds
        -Map sceneRuntimeStates
        -PresenterSessionEvent[] events
        +start() void
        +pause() void
        +resume() void
        +end() void
        +goToScene(index) void
        +calculateTiming(presentation) PresenterTimingState
        +buildSummary(presentation) PresenterSessionSummary
    }

    class PresenterTimingPolicy {
        +evaluate(actual, expected, total) TimingDeviation
    }

    class PresenterNote {
        +string id
        +string sceneId
        +PresenterNoteType type
        +string text
    }

    class PresenterTrustAlert {
        +string id
        +string sceneId
        +string severity
        +string code
        +string message
    }

    PresenterSessionEntity ..> PresenterTimingPolicy
```
