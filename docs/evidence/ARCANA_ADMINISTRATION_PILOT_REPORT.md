# Arcana Administration Pilot Report

## 1. Pilot Entity Census & Authoritative Metrics

### Organization Administration
- **Organization ID**: `org-arcana`
- **Name**: Arcana Trust Network
- **Slug**: `arcana`
- **Status**: `ACTIVE`
- **Owner User ID**: `usr-founder-arcana`
- **Active Members**: 3 (`usr-founder-arcana`, `usr-sec-lead`, `usr-dev-01`)
- **Active Projects**: 1 (`arcana`)
- **Archived Projects**: 0
- **Storage Consumption**: 22,445,000 bytes (`21.405 MiB` / `22.445 MB`)

### Project Administration
- **Project ID**: `arcana`
- **Organization ID**: `org-arcana`
- **Name**: Arcana Trust Network Venture
- **Slug**: `arcana`
- **Status**: `ACTIVE`
- **Owner User ID**: `usr-founder-arcana`
- **Project Twin ID**: `twin-arcana-pilot`
- **Data Room Module**: `ENABLED`
- **AI Copilot Module**: `ENABLED`
- **Executive Presenter Module**: `ENABLED`

---

## 2. Individual Pilot Verification Evidence

| Operation / Invariant Check | Verification Result |
|---|:---:|
| **Organization settings** | `PASS` |
| **Project settings** | `PASS` |
| **ACTIVE → PAUSED** | `PASS` |
| **Paused read** | `ALLOW PASS` |
| **Paused write** | `DENY PASS` |
| **Paused upload** | `DENY PASS` |
| **Paused share mutation** | `DENY PASS` |
| **PAUSED → ACTIVE** | `PASS` |
| **Authorized write after reactivation** | `ALLOW PASS` |
| **→ ARCHIVED** | `PASS` |
| **Archived historical read** | `ALLOW PASS` |
| **Archived write** | `DENY PASS` |
| **Archived upload** | `DENY PASS` |
| **Archived share mutation** | `DENY PASS` |
| **Organization ownership transfer** | `ALLOW PASS` |
| **Project ownership transfer** | `ALLOW PASS` |
| **Usage** | `PASS` |
| **Storage bytes (22,445,000)** | `22,445,000 PASS` |
| **Health (7/7 Dimensions)** | `7/7 HEALTHY` |
| **Administrative Audit** | `PASS` |

### Fixture Reset Policy
The test harness runs deterministic seeds (`InMemoryAdministrationStore.seedDefaults()`) on each test runner execution cycle to guarantee state isolation without persistent test contamination.

---

## 3. Secret Scan & Canonical Safety Verification

- **Repository private keys**: `0`
- **Service account JSON**: `0`
- **Firebase Admin keys**: `0`
- **Storage secrets/tokens**: `0`
- **AI provider keys**: `0`
- **Production bundle secrets**: `0`

### Canonical Safety
- **Administrative Project Twin mutations**: `0`
- **Administrative Claims mutations**: `0`
- **Administrative Evidence mutations**: `0`

---

## 4. Security & Rules Isolation Evidence

- **Architecture Rules**: `0 violations`
- **Firestore Security Rules**: `PASS`
- **Functions Emulator**: `PASS`
- **Critical Console Errors**: `0`
- **Unhandled Exceptions**: `0`
- **Critical Asset 404s**: `0`
- **Direct Client Write to Org/Project Records**: `DENY PASS` (`allow write: if false;`)
- **Direct Client Write to Audit Log**: `DENY PASS` (`allow create, update, delete: if false;`)
- **Last Owner Direct Downgrade / Self-Removal**: `DENY PASS` (`OWNER_PROTECTION`)
