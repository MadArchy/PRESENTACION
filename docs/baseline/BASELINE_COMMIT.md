# Baseline Commit Record — Venture Hub OS
**Document ID:** VHOS-BL-001  
**Phase:** Phase 0 — Baseline & Freeze (VHOS-PHASE-000)  
**Status:** FROZEN_BASELINE  
**Date:** 2026-08-26  

---

## 1. Git Repository State

* **Repository Corpus:** `MadArchy/PRESENTACION`
* **Local Root:** `c:\Users\user\Desktop\paginas web\presentacion`
* **Current Branch:** `main`
* **Frozen Commit SHA:** `c03372b0de439ef591acc1a50efb545e2affaba2`
* **Commit Message:** `fix: make GitHub Pages hub navigation and asset paths reliable`
* **Target Tags:** `v0-legacy-baseline`, `legacy-reference`

---

## 2. Reproducibility & Execution Protocol

The baseline application is guaranteed to run cleanly from scratch without external runtime dependencies (other than a standard Python 3 or static HTTP server):

### Local Execution Command
```bash
# Option 1: Native Python concurrent server (serving on port 8765)
python serve.py

# Option 2: Generic static server
npx serve -l 8765 .
```

### Local Endpoint
* **URL:** `http://127.0.0.1:8765/`
* **Entrypoint:** `index.html`

### GitHub Pages Remote Endpoint
* **URL:** `https://madarchy.github.io/PRESENTACION/`

---

## 3. Preservation Checksum Baseline

Key entrypoint runtime files:
* `index.html` (485+ KB) — Multi-deck presentation structure and modal shells.
* `app.js` (128+ KB) — Core presentation controller, state machine, Q&A ingestion, and gesture handling.
* `style.css` (95+ KB) — Design system tokens, glassmorphism, responsive breakpoints, and animations.
* `serve.py` (1.3 KB) — Threaded local development server.

All assets, data files, PPTX sources, and Python generator scripts are fully preserved in place without deletion.
