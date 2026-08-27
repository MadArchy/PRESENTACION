# Arcana Claims & Evidence Pilot Report — Venture Hub OS
**Document ID:** VHOS-EVD-004  
**Specification:** `SPEC-003 — Claims & Evidence Governance`  
**Phase:** `VHOS-PHASE-003`  
**Pilot Venture:** Arcana Trust Network (`arcana`)  
**Date:** 2026-08-26  

---

## 1. Claim Inventory

| Claim ID | Claim Text (ES) | Type | Materiality | Section | Support Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `claim-arcana-001` | Arcana es infraestructura deeptech de confianza y notarización. | `FACT` | `HIGH` | `IDENTITY` | `SUPPORTED` |
| `claim-arcana-002` | Convierte cada día operativo en un capítulo sellado en Polygon a <$0.02. | `FACT` | `CRITICAL` | `EXECUTIVE_SUMMARY` | `SUPPORTED` |
| `claim-arcana-003` | Restaurantes sufren entre 8% y 18% de fuga de ingresos. | `ESTIMATE` | `HIGH` | `PROBLEM` | `SUPPORTED` |
| `claim-arcana-004` | Cliente objetivo son cadenas gastronómicas con 3+ sucursales. | `ASSUMPTION` | `MEDIUM` | `CUSTOMER` | `NOT_REQUIRED` |
| `claim-arcana-005` | Módulos empaquetan telemetría en árboles de Merkle en Polygon. | `FACT` | `CRITICAL` | `SOLUTION` | `SUPPORTED` |
| `claim-arcana-006` | Hardware Sentinel utiliza microcontroladores ESP32-S3. | `FACT` | `HIGH` | `PRODUCT` | `SUPPORTED` |
| `claim-arcana-007` | Precio kit hardware de $250 USD pago único por local. | `TARGET` | `HIGH` | `BUSINESS_MODEL` | `SUPPORTED` |
| `claim-arcana-008` | Suscripción SaaS proyectada en $49 USD/mes por sucursal. | `TARGET` | `HIGH` | `BUSINESS_MODEL` | `SUPPORTED` |
| `claim-arcana-009` | Margen bruto estimado del 78% en SaaS recurrente. | `ESTIMATE` | `MEDIUM` | `BUSINESS_MODEL` | `SUPPORTED` |
| `claim-arcana-010` | Protocolo realiza firmas Ed25519 en hardware. | `FACT` | `HIGH` | `TECHNOLOGY` | `SUPPORTED` |
| `claim-arcana-011` | Buffer no volátil almacena hasta 30 días de operaciones. | `FACT` | `HIGH` | `RISKS` | `SUPPORTED` |
| `claim-arcana-012` | Fase 1 completada con piloto en 5 locales en Cúcuta. | `FACT` | `CRITICAL` | `ROADMAP` | `SUPPORTED` |
| `claim-arcana-013` | Objetivo de 250 sucursales en Fase 3 en Colombia y México. | `TARGET` | `MEDIUM` | `ROADMAP` | `SUPPORTED` |
| `claim-arcana-014` | Ronda objetivo de $350,000 USD mediante SAFE. | `TARGET` | `CRITICAL` | `ASK` | `SUPPORTED` |
| `claim-arcana-015` | Ningún competidor en LatAm ofrece notarización sub-centavo POS. | `HYPOTHESIS` | `MEDIUM` | `COMPETITION` | `NOT_REQUIRED` |
| `claim-arcana-016` | TAM de telemetría gastronómica en LatAm es $4,200M USD. | `ESTIMATE` | `HIGH` | `MARKET` | `UNSUPPORTED` |

---

## 2. Evidence Inventory

| Evidence ID | Title | Type | Status | Source Type | Locator |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ev-arcana-001` | Arcana Investor Visual Presentation | `DOCUMENT` | `AVAILABLE` | `document` | `slide-1` |
| `ev-arcana-002` | Arcana 15-Slide Structured Deck Spec | `SYSTEM_RECORD` | `AVAILABLE` | `legacy-deck` | `slide-2` |
| `ev-arcana-003` | QSR Operational Loss Field Study | `CALCULATION` | `AVAILABLE` | `document` | `seccion-perdidas-invisibles` |
| `ev-arcana-004` | Target Customer Profile Matrix | `DOCUMENT` | `AVAILABLE` | `legacy-deck` | `slide-4` |
| `ev-arcana-005` | Polygon PoS Merkle Notarization Spec | `SYSTEM_RECORD` | `AVAILABLE` | `legacy-deck` | `slide-5` |
| `ev-arcana-006` | Sentinel ESP32-S3 Hardware Spec | `DOCUMENT` | `AVAILABLE` | `legacy-deck` | `slide-7` |
| `ev-arcana-007` | Unit Economics & Pricing Model v1.0 | `CALCULATION` | `AVAILABLE` | `legacy-deck` | `slide-8` |
| `ev-arcana-008` | Ed25519 Signature Benchmark Report | `EXPERIMENT` | `AVAILABLE` | `legacy-deck` | `slide-9` |
| `ev-arcana-009` | Offline Flash Buffer Logs | `SYSTEM_RECORD` | `AVAILABLE` | `legacy-deck` | `slide-10` |
| `ev-arcana-010` | Cúcuta 5-Branch Pilot Closure Report | `OBSERVATION` | `AVAILABLE` | `legacy-deck` | `slide-11` |
| `ev-arcana-011` | SAFE Investment Term Sheet | `DOCUMENT` | `AVAILABLE` | `legacy-deck` | `slide-12` |

---

## 3. Governance Summary

```text
Total Claims:               16
FACT:                        7 (6 Supported, 1 Unsupported)
ESTIMATE:                    3 (2 Supported, 1 Unsupported)
TARGET:                      4 (4 Supported via financial/roadmap models)
ASSUMPTION:                  1 (1 Not Required)
HYPOTHESIS:                  1 (1 Pending Validation)

Critical Facts Supported:    3/3 (100%)
Critical Facts Unsupported:  0
High Materiality Supported:  5/6
Contradicted Claims:         0
Unreviewed Claims:           1 (COMPETITION hypothesis)
Trust Readiness:             TRUST_READY_WITH_WARNINGS (due to Market TAM unverified estimate)
```
