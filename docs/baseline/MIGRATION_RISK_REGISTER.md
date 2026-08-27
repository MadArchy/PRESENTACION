# Migration Risk Register — Venture Hub OS
**Document ID:** VHOS-BL-008  
**Phase:** Phase 0 — Baseline & Freeze (VHOS-PHASE-000)  
**Date:** 2026-08-26  

---

## 1. Risk Evaluation & Mitigation Matrix

| Risk ID | Category | Description | Severity | Likelihood | Mitigation Strategy | Preservation Test |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | **Content Coupling** | Content tightly coupled inside 485 KB `index.html` static DOM. | HIGH | HIGH | Extract Project Twins incrementally without deleting legacy HTML until parity is verified. | Automated DOM parity comparison |
| **RSK-02** | **Script Overwrite** | Running legacy Python generator scripts can overwrite updated HTML/JS files. | HIGH | MEDIUM | Lock Python generator scripts in Phase 0; document warnings in manifest. | File write guard / Git audit |
| **RSK-03** | **Global State** | Runtime relies on global variables (`activeDeck`, `currentSlide`, `currentLang`, `currentTheme`, `isCommentsOpen`). | MEDIUM | HIGH | Encapsulate state into typed state machine in Phase 1; preserve global window API for tests. | State transition unit tests |
| **RSK-04** | **Unvalidated Claims** | Metrics and financial claims currently lack formal linked evidence in source files. | HIGH | MEDIUM | Implement SPEC-003 claim governance; label synthetic demo metrics as `DEMO/SYNTHETIC`. | Evidence audit pipeline |
| **RSK-05** | **Path Fragility** | Relative paths (`media/`, `backgrounds/`) can break when deploying to sub-paths (e.g. GitHub Pages). | MEDIUM | HIGH | Preserve `window.__BAIRD_BASE__` and `<base href>` resolution mechanism in `index.html`. | Network 404 URL test |
| **RSK-06** | **DOM Selectors** | Keyboard and gesture handlers depend on specific element IDs (`#slideViewport`, `#progressBar`, `#deckSelectorBtn`). | MEDIUM | HIGH | Standardize DOM ID contracts in `legacy-capabilities.json`. | DOM integrity assertion test |
| **RSK-07** | **CSS Pollution** | Monolithic `style.css` (4500+ lines) mixes global utility styles with deck-specific overrides. | MEDIUM | MEDIUM | Modularize into CSS Design System tokens and component stylesheets in Phase 2. | Visual regression tests |
| **RSK-08** | **Q&A Data Loss** | User-injected notes and comments currently live only in browser session memory. | HIGH | MEDIUM | Provide JSON export (already built) and persist to database in Phase 1. | Ingestion persistence test |
| **RSK-09** | **Mobile Layout Break** | Complex 4-column tables or diagrams can overflow small mobile screens if unconstrained. | MEDIUM | LOW | Tested responsive media queries with fluid scaling (`clamp()`) and horizontal scroll wrappers. | Responsive viewport tests |
| **RSK-10** | **Video Format Drift** | Video playback depends on MP4/H.264 browser support and container sizing. | LOW | LOW | Keep standard MP4 format and responsive 16:9 video stage container. | Video element readiness test |
| **RSK-11** | **AI Hallucination** | Future AI copilot might generate ungrounded traction metrics. | CRITICAL | MEDIUM | SPEC-006 policy gates: all AI output is draft and numerical assertions are classified as draft claims. | Claim gate test |
| **RSK-12** | **Performance Regr.** | Large image backgrounds and SVG diagrams could cause lag on lower-end devices. | MEDIUM | LOW | Maintain deferred loading (`loadSlideImages`) and optimized image caching headers. | Page load budget test |
