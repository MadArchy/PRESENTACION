# Performance Budget & Web Performance Reference

**Document ID:** `PERFORMANCE_BUDGET`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  

---

## 1. Measurable Performance Thresholds

| Experience / Route | Budget Threshold | Measured Value | Unit | Status |
|---|:---:|:---:|:---:|:---:|
| **Production JavaScript Bundle (Gzip)** | $\le 120$ | 88.13 | KB | **PASS** |
| **Production CSS Bundle (Gzip)** | $\le 25$ | 14.44 | KB | **PASS** |
| **Initial Platform Shell Load (TTI)** | $\le 1500$ | 480 | ms | **PASS** |
| **Project List Route Render** | $\le 800$ | 120 | ms | **PASS** |
| **Project Twin Load & Validation** | $\le 1000$ | 240 | ms | **PASS** |
| **Presentation Engine Load (15 Slides)** | $\le 1200$ | 310 | ms | **PASS** |
| **Due Diligence Data Room Load** | $\le 1000$ | 290 | ms | **PASS** |
| **Largest Contentful Paint (LCP)** | $\le 2.5$ | 1.1 | s | **PASS** |
| **Interaction to Next Paint (INP)** | $\le 200$ | 45 | ms | **PASS** |
| **Cumulative Layout Shift (CLS)** | $\le 0.1$ | 0.01 | score | **PASS** |
