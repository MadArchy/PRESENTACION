# Copilot Conversational Architecture & Grounding Policy

**Document ID:** `COPILOT_ARCHITECTURE`  
**Specification:** `SPEC-013 — Conversational Intelligence & Premium Experience`  
**Version:** `1.0.0`  

---

## 1. System Architecture

The Project Copilot is built on a provider-agnostic, domain-grounded conversational pipeline:

```text
User Question (Workspace or Contextual Side Panel)
                     │
                     ▼
           CopilotContextResolver
  (Resolves OrgId, ProjectId, UserId, CurrentModule, SelectedEntity)
                     │
                     ▼
           AuthorizationFilter
        (Enforces: Copilot Access <= User Access)
                     │
                     ▼
        CopilotRetrievalService (Multi-Source Domain Port)
  ├── ProjectTwinRetrievalAdapter
  ├── ClaimsEvidenceRetrievalAdapter
  ├── DataRoomRetrievalAdapter
  ├── PresentationRetrievalAdapter
  └── AdministrationRetrievalAdapter
                     │
                     ▼
            Context Pack Builder
  (Separates: System Policy + User Query + Untrusted Project Content)
                     │
                     ▼
               AiModelPort
       (OpenAiModelAdapter / GroundedAiModelAdapter)
                     │
                     ▼
     CopilotGrounding & Citation Service
  ├── Grounding Classifier (GROUNDED | PARTIALLY_GROUNDED | INSUFFICIENT)
  └── Source Reference Mapper (Clickable Entity Navigation Targets)
                     │
                     ▼
     Interactive Copilot UI Response
  (Formatted Answer + Grounding Badge + Source Chips + Action Buttons)
```

---

## 2. Core Invariants

1. **`AI OUTPUT != PROJECT TRUTH`**: AI outputs represent proposals and advisory insights; no automatic canonical writes are permitted.
2. **`COPILOT ACCESS <= USER ACCESS`**: Context packs strictly exclude data the user cannot independently access.
3. **`INSUFFICIENT_PROJECT_EVIDENCE`**: Unsubstantiated queries return explicit evidence gap notices rather than hallucinations.
4. **`CLICKABLE CITATIONS`**: Factual claims cite verified entity IDs that navigate directly to source records.
