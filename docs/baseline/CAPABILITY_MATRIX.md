# Capability Matrix — Venture Hub OS
**Document ID:** VHOS-BL-003  
**Phase:** Phase 0 — Baseline & Freeze (VHOS-PHASE-000)  
**Date:** 2026-08-26  

---

## 1. Protected Runtime Capabilities

| ID | Capability | Description | Verification Method | Status |
| :--- | :--- | :--- | :--- | :--- |
| **CAP-01** | **Multi-Deck Executive Hub** | Landing dashboard with 3 primary venture pills (*AI EdTech*, *FoodTech QSR*, *Web3 & IoT*) + secondary decks. | Click venture pill or call `launchDeck(key)`. Ensure correct container activates and HUD updates. | ✅ ACTIVE |
| **CAP-02** | **Slide Navigation & Progress** | Forward/backward slide transitions with numeric counter (`01 / 15`) and dynamic progress bar. | Keyboard `→`/`←`, on-screen buttons, or mobile edge triggers. Verify counter and progress bar width. | ✅ ACTIVE |
| **CAP-03** | **Directional Slide Motion** | Direction-aware slide entry animations (`slide-enter-next`, `slide-enter-prev`) with auto-scroll reset to top. | Navigate forward/backward. Verify CSS animation class application and `scrollTop === 0`. | ✅ ACTIVE |
| **CAP-04** | **Audience Switching** | Dynamic switching between *Inversor*, *B2B Corp*, and *CTO / Tech* with contextual card borders/glows. | Click audience buttons or press `A`. Verify `data-audience` on `html` and `.aud-focus-*` highlights. | ✅ ACTIVE |
| **CAP-05** | **Boardroom Pitch Clock** | Pitch timer modal with presets (3m, 5m, 10m, 20m, count-up), HUD mini-display, and time alerts. | Click timer button or press `P`. Start countdown. Verify HUD time updates and warning pulses. | ✅ ACTIVE |
| **CAP-06** | **Discreet Q&A & Notes Drawer** | Slide-specific talking points, objections library, manual question injection, bulk ingestion, and JSON export. | Click Q&A button or press `C`/`Q`. Verify 3 tabs (List, Add, Bulk) and slide-specific filtered Q&A. | ✅ ACTIVE |
| **CAP-07** | **Bilingual Translation (ES/EN)** | Live instant language toggle across all slides, buttons, HUD controls, drawer placeholders, and toast notifications. | Click ES/EN or press `L`. Verify `html[data-lang]` attribute and bilingual text swaps. | ✅ ACTIVE |
| **CAP-08** | **Dark / Light Mode** | Seamless color scheme toggling between Futuristic Deep Space and Clean Executive Light theme. | Click theme button or press `T`. Verify `html[data-theme]` attribute and CSS variable updates. | ✅ ACTIVE |
| **CAP-09** | **Executive Slide Navigator (Grid)** | 15-slide visual thumbnail grid modal for jumping to any slide directly. | Click grid button or press `G`/`O`. Click any thumbnail. Verify navigation to that slide and drawer close. | ✅ ACTIVE |
| **CAP-10** | **Virtual Laser Pointer & Spotlight** | Executive laser dot with pulsing halo and mouse tracking for highlighting slide details during pitches. | Click laser button or press `K`. Move mouse. Verify `.laser-pointer-dot` tracks cursor. | ✅ ACTIVE |
| **CAP-11** | **Image Lightbox & Zoom** | Fullscreen modal overlay for zooming high-resolution architecture diagrams and hardware photos. | Click diagram preview or hardware card. Verify lightbox opens with enlarged asset. Press `Esc` to close. | ✅ ACTIVE |
| **CAP-12** | **Venture Video Theater** | Fullscreen video player with control bar and replay/skip ending cards for video pitches. | Click "Reproducir Video" on EdTech pill. Verify video stage loads and plays `media/demo/tutor-demo.mp4`. | ✅ ACTIVE |
| **CAP-13** | **Mobile Touch & Gesture Engine** | Horizontal swipe gestures (left/right) with velocity check, pull-down to dismiss drawers, and floating touch edge controls. | Swipe horizontally on touch screen or simulate touch events. Verify slide changes without vertical lock. | ✅ ACTIVE |
| **CAP-14** | **Fullscreen Presentation** | Native browser fullscreen toggle for boardroom projector and display mode. | Click fullscreen button or press `F`. Verify `document.fullscreenElement` state changes. | ✅ ACTIVE |
| **CAP-15** | **Print / PDF Export Layout** | Clean printer-friendly stylesheet hiding HUD, drawers, and animations while paginating all slides cleanly. | Trigger `window.print()` or click print button. Verify `@media print` rules isolate slides. | ✅ ACTIVE |
| **CAP-16** | **Live KPI Counter Animations** | Automated integer/percent counting animation when KPI slides become active. | Navigate to a metrics slide (e.g. Arcana slide 3 or Restaurante slide 4). Verify numbers count up smoothly. | ✅ ACTIVE |
