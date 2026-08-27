# Project Twin JSON Reference Specification — Venture Hub OS
**Document ID:** VHOS-ARCH-004  
**Specification:** `SPEC-001`  
**Phase:** `VHOS-PHASE-001`  

---

## 1. Top-Level Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "id": "arcana",
  "slug": "arcana",
  "name": "Arcana Trust Network",
  "shortName": "Arcana",
  "type": "DEEPTECH",
  "status": "pilot",
  "schemaVersion": "1.0",
  "currentVersion": "0.1.0",
  "defaultLanguage": "es",
  "languages": ["es", "en"],
  "theme": "arcana-purple",
  "createdAt": "2026-08-20T10:00:00Z",
  "updatedAt": "2026-08-26T15:00:00Z",
  "kicker": {
    "es": "Web3 & IoT · Pitch inversor",
    "en": "Web3 & IoT · Investor pitch"
  },
  "metadata": {},
  "versions": [
    {
      "id": "arcana-v0.1.0",
      "projectId": "arcana",
      "version": "0.1.0",
      "status": "pilot",
      "createdAt": "2026-08-20T10:00:00Z",
      "createdBy": "migration",
      "changeSummary": "Initial baseline migration",
      "sections": [
        {
          "id": "sec-problem",
          "type": "PROBLEM",
          "title": { "es": "Problema del Mercado", "en": "Market Problem" },
          "status": "VALIDATED",
          "schemaVersion": "1.0",
          "content": {},
          "sourceRefs": [
            { "type": "legacy-deck", "reference": "arcana-slide-3" }
          ],
          "updatedAt": "2026-08-26T15:00:00Z"
        }
      ]
    }
  ]
}
```
