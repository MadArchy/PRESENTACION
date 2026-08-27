# Content Security Policy (CSP) Reference & Negative Verification Tests

**Document ID:** `CONTENT_SECURITY_POLICY`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Policy Version:** `1.1 (Hardened)`  

---

## 1. Hardened Production CSP Specification

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' blob:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebasestorage.googleapis.com https://*.cloudfunctions.net; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';
```

---

## 2. Mandatory CSP Violation Checks (0 Violations Across All Workspaces)

| Workspace / Engine Execution Flow | Observed CSP Violations | Status |
|---|:---:|:---:|
| **Platform Boot & Hub Initialization** | 0 | **PASS** |
| **Project Load & Twin Validation** | 0 | **PASS** |
| **Presentation Engine 15-Slide Deck Load** | 0 | **PASS** |
| **Executive Presenter Cockpit & Timer Modals** | 0 | **PASS** |
| **Due Diligence Data Room & File View** | 0 | **PASS** |
| **Organization & Platform Administration** | 0 | **PASS** |

---

## 3. Mandatory CSP Negative Verification Tests

| Security Control / Negative Test | Policy Directive | Verification Result |
|---|---|:---:|
| **Unexpected External Script Origin** | Script sources restricted to `'self'`, Google APIs & GStatic | **DENY PASS** |
| **Unexpected External Connect Origin** | Connect sources restricted to `'self'`, Firebase & Google APIs | **DENY PASS** |
| **Clickjacking / Frame Embedding** | `frame-ancestors 'none'` | **PASS** |
| **Plugin / Binary Object Execution** | `object-src 'none'` | **BLOCKED PASS** |
| **Base URI Manipulation** | `base-uri 'self'` | **PASS** |
| **Form Action Redirection** | `form-action 'self'` | **PASS** |

---

## 4. Script & Style Directive Audit

### `script-src` Audit:
- `'unsafe-inline'` has been completely removed from `script-src`.
- All JavaScript bundles and runtime scripts are loaded strictly as external same-origin ES modules (`'self'`) or Google identity libraries (`https://apis.google.com https://www.gstatic.com`).

### `style-src` Audit:
- `'unsafe-inline'` is scoped strictly to `style-src` to support dynamic CSS transform matrices for slide layout transitions, CSS custom property theming, and responsive UI grid dimensions.
- **Residual Risk**: **LOW**. Text inputs are never parsed as HTML styles; untrusted user inputs are bounded to standard text nodes without style attribute evaluation.
