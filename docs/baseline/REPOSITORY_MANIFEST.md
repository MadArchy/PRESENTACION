# Repository Manifest — Venture Hub OS
**Document ID:** VHOS-BL-002  
**Phase:** Phase 0 — Baseline & Freeze (VHOS-PHASE-000)  
**Date:** 2026-08-26  

---

## 1. Summary Overview

* **Total Tracked & Untracked Files:** ~337 files (excluding `.git/`)
* **Total File Types:** PNG (152), SVG (105), JPG (25), PY (17), JSON (15), PPTX (5), TXT (4), MD (4), HTML (3), MP4 (3), JS (1), CSS (1).

---

## 2. Comprehensive File Categorization

### A. Runtime Files (`runtime`)
Files executed directly in the browser or used to serve the presentation:
| File | Size | Role |
| :--- | :--- | :--- |
| `index.html` | ~485 KB | Main SPA shell, Executive Hub, 5 presentation decks, modal drawers, and video theater |
| `app.js` | ~128 KB | Runtime state machine, deck switcher, Q&A ingestion, pitch clock, touch gestures, laser pointer |
| `style.css` | ~95 KB | Futuristic Enterprise Design System, dark/light theme tokens, glassmorphism, responsive queries |
| `serve.py` | 1.3 KB | Multithreaded Python server with CORS and cache headers |
| `.nojekyll` | 0 B | GitHub Pages build bypass configuration |

### B. Canonical Source Files (`source`)
Original executive decks, pitches, and strategy documents provided as source material:
* `sources/pptx/Expert_MultiAgent_Tutor_Investors_EN_VISUAL.pptx` (13.2 MB)
* `sources/pptx/Pitch_Investor_Smart_Fast_Food_EN_VISUAL.pptx` (22.3 MB)
* `sources/pptx/Arcana_Investor_Presentation_EN_VISUAL.pptx` (20.5 MB)
* `sources/pptx/arcana_presentacion_dueno_restaurante.pptx` (19.5 MB)
* `sources/pptx/comparativo_equipos_ia_local.pptx` (559 KB)
* `sources/raw_media/WhatsApp Video 2026-08-14 at 9.01.53 AM.mp4` (1.7 MB)
* `Estrategia Ejecutiva de Infraestructura para Inteligencia Artificial.md` (11.9 KB)
* `exposicion-beneficio-arcana-dueno-restaurante.md` (23.9 KB)

### C. Data Assets & Deck JSONs (`data`)
Extracted and structured deck definitions:
* `data/decks/deck_tutor_15.json` (31.9 KB) — Multi-Agent Tutor 15-slide structured deck
* `data/decks/deck_fastfood_15.json` (32.1 KB) — Smart Fast-Food 15-slide structured deck
* `data/decks/deck_arcana_15.json` (33.6 KB) — Arcana Trust Network 15-slide structured deck
* `data/decks/deck_restaurante.json` (9.8 KB) & `deck_restaurante_detailed.json` (7.2 KB) — Restaurant owner deck
* `data/decks/deck_infraestructura_ia.json` (7.1 KB) — AI Infrastructure executive comparison deck
* `data/decks/arcana_slides.json` (36.6 KB), `fastfood_slides.json` (23.8 KB), `extracted_slides.json` (22.3 KB)
* `data/decks/deck_arcana_data.json` (63.9 KB), `deck_fastfood_data.json` (55.9 KB), `deck_data.json` (46.4 KB)
* `data/extracts/all_slides_details.txt`, `arcana_overview.txt`, `fastfood_overview.txt`, `slides_overview.txt`

### D. Generator & Extractor Scripts (`script`)
Python scripts used to parse PPTX sources, compile HTML templates, and inject seed data:
* `scripts/generators/build_multideck_app.py` (47 KB) — Primary multideck compiler
* `scripts/generators/build_enhanced_deck.py` (67.5 KB) & `build_html.py` (53.5 KB)
* `scripts/generators/generate_15_slide_decks.py` (92.4 KB)
* `scripts/generators/generate_arcana_deck.py` (61.7 KB)
* `scripts/generators/generate_fastfood_deck.py` (51.9 KB)
* `scripts/generators/generate_restaurante_deck.py` (68.8 KB)
* `scripts/generators/generate_ia_infraestructura_deck.py` (62.1 KB)
* `scripts/generators/enrich_bilingual_qa.py` (57.6 KB) & `enrich_all_slides_qa.py` (29 KB)
* `scripts/extractors/inject_comparativo.py` (2.5 KB) & `update_index_enhanced_restaurante.py` (1.7 KB)

### E. Visual & Media Assets (`media`)
* `backgrounds/` — Curated cinematic backdrops (`bg-hub.jpg`, `bg-tutor-neural.jpg`, `bg-fastfood-store.jpg`, `bg-arcana-chain.jpg`, `bg-ia-lab.jpg`, etc.)
* `media/` — Core architecture diagrams, product mockups, and videos (`media/ia/`, `media/demo/`, etc.)
* `extracted_media/`, `extracted_media_arcana/`, `extracted_media_fastfood/`, `extracted_media_restaurante/` — 150+ vector icons, PNG screenshots, and equipment diagrams extracted directly from source decks.

### F. Documentation & SDD Assets (`docs`)
* `doc tecn/Venture_Hub_OS_MASTER_SPEC.md` — Master Specification Pack
* `README.md` — Repository documentation
* `docs/baseline/*` — Phase 0 baseline deliverables
