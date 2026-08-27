# Keyboard Controls Specification — Venture Hub OS
**Document ID:** VHOS-BL-004  
**Phase:** Phase 0 — Baseline & Freeze (VHOS-PHASE-000)  
**Date:** 2026-08-26  

---

## 1. Master Keyboard Shortcuts Matrix

| Key(s) | Action | Scope | Handler in `app.js` |
| :--- | :--- | :--- | :--- |
| <kbd>→</kbd> / <kbd>Espacio</kbd> / <kbd>PageDown</kbd> / <kbd>N</kbd> | **Next Slide** (Avanzar diapositiva) | Active Deck | `nextSlide()` |
| <kbd>←</kbd> / <kbd>PageUp</kbd> / <kbd>Backspace</kbd> | **Previous Slide** (Retroceder diapositiva) | Active Deck | `prevSlide()` |
| <kbd>Home</kbd> | **First Slide** (Ir a la primera diapositiva) | Active Deck | `goToSlide(1, 'prev')` |
| <kbd>End</kbd> | **Last Slide** (Ir a la última diapositiva) | Active Deck | `goToSlide(totalSlides(), 'next')` |
| <kbd>M</kbd> / <kbd>H</kbd> | **Return to Executive Hub** (Volver al Hub principal) | Global | `openExecutiveHub()` |
| <kbd>G</kbd> / <kbd>O</kbd> | **Toggle Slide Navigator** (Índice de 15 diapositivas) | Active Deck | `toggleOverview()` |
| <kbd>C</kbd> / <kbd>Q</kbd> | **Toggle Q&A & Notes Drawer** (Panel de preguntas y notas) | Active Deck | `toggleCommentsDrawer()` |
| <kbd>A</kbd> | **Cycle Audience Profile** (Alternar perfil de audiencia) | Global | `cycleAudience()` |
| <kbd>P</kbd> | **Toggle Pitch Timer Popover** (Abrir/Cerrar temporizador) | Global | `togglePitchTimerPanel()` |
| <kbd>K</kbd> | **Toggle Laser Pointer / Focus** (Puntero láser ejecutivo) | Global | `toggleLaserPointer()` |
| <kbd>T</kbd> | **Toggle Theme** (Modo Oscuro / Modo Claro) | Global | `toggleTheme()` |
| <kbd>L</kbd> | **Toggle Language** (Cambiar idioma ES / EN) | Global | `toggleLanguage()` |
| <kbd>F</kbd> | **Toggle Fullscreen** (Pantalla completa) | Global | `toggleFullscreen()` |
| <kbd>Esc</kbd> | **Close Active Modal / Return to Hub** (Cerrar modal o volver) | Global | Closes Timer -> Q&A -> Overview -> Hub |

---

## 2. Input Isolation Policy

When focus is within an editable element (`<input>`, `<textarea>`, `<select>`), single-character shortcuts (such as `C`, `A`, `P`, `T`, `N`, `Espacio`) are ignored by default to prevent accidental presentation jumping during text entry.
