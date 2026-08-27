# Visual Baseline & Viewport Matrix — Venture Hub OS
**Document ID:** VHOS-BL-009  
**Phase:** Phase 0 — Baseline & Freeze (VHOS-PHASE-000)  
**Date:** 2026-08-26  

---

## 1. Supported Viewports & Target Matrix

| Viewport Category | Resolution | Target Devices | Visual Conformance Checks |
| :--- | :--- | :--- | :--- |
| **Desktop 4K / UHD** | 3840×2160 (16:9) | Boardroom displays, executive TVs | High-contrast typography, max-width 1560px container centering, crisp SVG scaling. |
| **Standard Desktop** | 1920×1080 (16:9) | Full HD monitors, projectors | Default presentation aspect, 4-column grids, laser pointer precision. |
| **Compact Laptop** | 1440×900 / 1366×768 | MacBook Air, 13" Ultrabooks | 2-column grid reflow, scaled headlines (`clamp()`), complete HUD visibility. |
| **Tablet Landscape** | 1024×768 (4:3) | iPad landscape, Surface Pro | Reflow to 2-column cards, scaled 3D prism, touch button targets >= 44px. |
| **Tablet Portrait** | 768×1024 (3:4) | iPad portrait, tablets | 1-column card stack, swipe gesture active, collapsed secondary HUD items. |
| **Mobile Phone** | 375×812 / 414×896 | iPhone, Android flagship | Vertical Hub layout, thumb-accessible venture pills, mobile swipe banner. |
| **Mobile Landscape** | 812×375 (low height) | Smartphones rotated | Compact HUD (40px), independent slide scroll, side-by-side hero presentation. |

---

## 2. Core Visual Atmosphere Registry

| Deck Key | Primary Accent | Secondary Accent | Ambient Glow | Themed Backdrop |
| :--- | :--- | :--- | :--- | :--- |
| **Executive Hub (`hub`)** | `#06b6d4` (Cyan) | `#a855f7` (Purple) | Gold (`#c9a46a`) drop-shadow | `bg-hub.jpg` + isometric animated prism |
| **Multi-Agent Tutor (`tutor`)** | `#22d3ee` (Cyan) | `#818cf8` (Indigo) | Cyan Neural Glow | `bg-tutor-neural.jpg`, `bg-tutor-lumi.jpg` |
| **Smart Fast-Food (`fastfood`)** | `#f59e0b` (Amber) | `#10b981` (Emerald) | Amber Warm Glow | `bg-fastfood-store.jpg`, `bg-fastfood-kitchen.jpg` |
| **Arcana Trust (`arcana`)** | `#c084fc` (Purple) | `#22d3ee` (Cyan) | Violet Ledger Glow | `bg-arcana-chain.jpg`, `bg-arcana-iot.jpg` |
| **Arcana Restaurante (`restaurante`)** | `#f59e0b` (Amber) | `#10b981` (Emerald) | Amber Gold Glow | `bg-fastfood-store.jpg`, `bg-arcana-iot.jpg` |
| **Infraestructura IA (`comparativo`)** | `#c9a46a` (Gold) | `#f3e2b0` (Champagne) | Gold DeepTech Glow | `bg-ia-lab.jpg`, `bg-ia-chip.jpg` |
