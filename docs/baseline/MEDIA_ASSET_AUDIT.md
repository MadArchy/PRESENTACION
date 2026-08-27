# Media Asset Audit — Venture Hub OS
**Document ID:** VHOS-BL-007  
**Phase:** Phase 0 — Baseline & Freeze (VHOS-PHASE-000)  
**Date:** 2026-08-26  

---

## 1. Media Assets Inventory

| Category | Directory | File Count | Primary Formats | Key Assets |
| :--- | :--- | :--- | :--- | :--- |
| **Cinematic Backgrounds** | `backgrounds/` | 11 files | JPG | `bg-hub.jpg`, `bg-tutor-neural.jpg`, `bg-tutor-lumi.jpg`, `bg-fastfood-store.jpg`, `bg-fastfood-kitchen.jpg`, `bg-arcana-chain.jpg`, `bg-arcana-iot.jpg`, `bg-ia-lab.jpg`, `bg-ia-chip.jpg`, `bg-closing.jpg` |
| **Core Media & Videos** | `media/` | ~30 files | PNG, JPG, MP4, SVG | `media/demo/tutor-demo.mp4`, `media/ia/ia-models.jpg`, `media/ia/ia-memory.jpg`, `media/ia/ia-workflow.jpg`, `media/ia/ia-client.jpg` |
| **Extracted Deck Graphics** | `extracted_media/` | ~60 files | PNG, SVG | Diagram components, agent icons, workflows |
| **Arcana Extracted Assets** | `extracted_media_arcana/` | ~50 files | PNG, SVG | Cryptographic diagrams, IoT sensor badges, trust ledger icons |
| **Fast-Food Extracted Assets** | `extracted_media_fastfood/`| ~45 files | PNG, SVG | Kitchen telemetry, drive-thru HUDs, operational metrics |
| **Restaurante Extracted Assets** | `extracted_media_restaurante/` | ~35 files | PNG, SVG | POS integrations, inventory flowcharts |
| **Raw Video Sources** | `sources/raw_media/` | 1 file | MP4 | `WhatsApp Video 2026-08-14 at 9.01.53 AM.mp4` |

---

## 2. Asset Resolution & Performance Strategy in Runtime

* **Deferred Image Loading (`app.js`):** Slide images use `data-src` and are loaded on-demand via `loadSlideImages()` when nearing active slide (`primeNearbySlides()`).
* **Preloaded Hub Background:** Hub background is preloaded on initialization (`preloadUrl(SLIDE_BACKGROUNDS.hub.default)`).
* **Video Preload Optimization:** Video element preload set to `auto` (`warmupVideo()`).
* **Broken Image Fallback:** CSS background gradient fallbacks exist for all slides in case of network latency.
