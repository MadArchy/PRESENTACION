# Content Coupling Audit — Venture Hub OS
**Document ID:** VHOS-BL-005  
**Phase:** Phase 0 — Baseline & Freeze (VHOS-PHASE-000)  
**Date:** 2026-08-26  

---

## 1. Executive Summary

This audit identifies all tightly-coupled, hard-coded data points, slide limits, background bindings, and text templates currently embedded across runtime files (`index.html`, `app.js`, `style.css`) and generator scripts.

In Phase 1 and Phase 2, these hard-coded dependencies will be migrated into structured **Project Twin** schemas and the **Narrative Compiler**.

---

## 2. Hard-Coded Coupling Matrix

### A. Hard-Coded Deck Keys & Slide Limits (`app.js`)
* **Deck Keys:** `'hub'`, `'tutor'`, `'fastfood'`, `'arcana'`, `'restaurante'`, `'comparativo'`.
* **Deck Limits Dictionary:**
  ```javascript
  const DECK_SLIDE_COUNTS = { tutor: 15, fastfood: 15, arcana: 15, restaurante: 10, comparativo: 10 };
  ```
* **Deck Metadata Dictionary (`DECK_CONFIG`):** Titles, kickers, and inline SVG icons are declared directly in `app.js` (lines 41–84).

### B. Hard-Coded Background Mappings (`app.js`)
* Slide-to-image mappings are static dictionaries inside `SLIDE_BACKGROUNDS` (lines 97–160):
  * `tutor`: 8 background overrides mapped to `backgrounds/bg-tutor-*.jpg`.
  * `fastfood`: 9 background overrides mapped to `backgrounds/bg-fastfood-*.jpg`.
  * `arcana`: 8 background overrides mapped to `backgrounds/bg-arcana-*.jpg`.
  * `restaurante`: 10 background overrides.
  * `comparativo`: 10 background overrides mapped to `backgrounds/bg-ia-*.jpg`.

### C. Hard-Coded HTML Slide Markups (`index.html`)
* All 65 slide sections are statically rendered inside `<div class="deck-container" id="deck-*">`.
* Bilingual text is duplicated in every single element using `<span class="lang-es">...</span><span class="lang-en">...</span>`.
* Metric values, percentages, currency symbols, and customer logos are hard-coded in HTML tags without schema binding.

### D. Hard-Coded Seed Q&A Questions (`app.js`)
* `CURATED_SLIDE_QA` dictionary spans over 1,500 lines of `app.js` with embedded questions, answers, and tags for `comparativo`, `restaurante`, `tutor`, `fastfood`, and `arcana`.

### E. Template Duplication in Python Generator Scripts
* `scripts/generators/build_multideck_app.py`, `generate_15_slide_decks.py`, `generate_arcana_deck.py`, etc., contain duplicated HTML string templates. Running an older script can overwrite manual improvements in `index.html`.

---

## 3. Decoupling Roadmap for Phase 1 & 2

1. **Extract Canonical Project JSONs:** Unify deck definitions into canonical `Project` and `ProjectSection` JSON schemas.
2. **Move Backgrounds & Assets into Manifests:** Map media assets dynamically per project section.
3. **Dynamic Node Rendering:** Render slides dynamically via component templates rather than 485 KB of static HTML.
