# Generator Dependency Matrix — Venture Hub OS
**Document ID:** VHOS-BL-006  
**Phase:** Phase 0 — Baseline & Freeze (VHOS-PHASE-000)  
**Date:** 2026-08-26  

---

## 1. Inventory of Scripts & Generators

| Script Path | Primary Input(s) | Output Target(s) | Purpose | Safety Warning |
| :--- | :--- | :--- | :--- | :--- |
| `scripts/generators/build_multideck_app.py` | `data/decks/*.json`, `sources/pptx/*` | `index.html`, `app.js` | Main multi-deck builder | ⚠️ OVERWRITES `index.html` — Do not run in Phase 0 |
| `scripts/generators/build_enhanced_deck.py` | `data/decks/deck_tutor_15.json` | Standalone HTML | Single deck builder | Legacy |
| `scripts/generators/build_html.py` | `data/decks/deck_data.json` | Standalone HTML | Early prototype builder | Legacy |
| `scripts/generators/generate_15_slide_decks.py` | PPTX raw extracts | `data/decks/*_15.json` | Converts PPTX outlines to JSON | Safe for JSON generation |
| `scripts/generators/generate_arcana_deck.py` | `data/decks/deck_arcana_data.json` | `data/decks/deck_arcana_15.json` | Arcana 15-slide generator | Safe for JSON generation |
| `scripts/generators/generate_fastfood_deck.py` | `data/decks/deck_fastfood_data.json` | `data/decks/deck_fastfood_15.json` | FastFood 15-slide generator | Safe for JSON generation |
| `scripts/generators/generate_restaurante_deck.py` | `data/decks/deck_restaurante_detailed.json` | `data/decks/deck_restaurante.json` | Restaurant deck generator | Safe for JSON generation |
| `scripts/generators/generate_ia_infraestructura_deck.py` | `Estrategia Ejecutiva...md` | `data/decks/deck_infraestructura_ia.json` | AI Hardware comparison deck generator | Safe for JSON generation |
| `scripts/generators/enrich_bilingual_qa.py` | `app.js` | `app.js` | Enriches Q&A dictionary in `app.js` | ⚠️ OVERWRITES `app.js` |
| `scripts/generators/enrich_all_slides_qa.py` | `app.js` | `app.js` | Slide question injector | ⚠️ OVERWRITES `app.js` |
| `scripts/extractors/inject_comparativo.py` | `data/extracts/deck_comparativo_fragment.html` | `index.html` | Injected comparison slides into HTML | Single-use migration script |
| `scripts/extractors/update_index_enhanced_restaurante.py` | `data/decks/deck_restaurante.json` | `index.html` | Injected restaurant slides into HTML | Single-use migration script |

---

## 2. Execution Policy for Phase 0 & Phase 1

1. **Freeze Execution:** All generator scripts modifying `index.html` or `app.js` directly are **LOCKED** in Phase 0 to prevent unintentional regressions.
2. **Phase 2 Replacement:** In Phase 2 (Narrative Compiler), these ad-hoc Python scripts will be replaced by the typed, deterministic **Narrative Compiler** engine.
