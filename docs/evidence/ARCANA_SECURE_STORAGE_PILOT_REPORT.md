# Arcana Secure Storage Pilot Report: Phase 009

**Project:** Arcana Trust Network (`arcana`)  
**Organization:** `org-arcana`  
**Specification:** `SPEC-009 — Secure Storage & Controlled Data Room Sharing`  
**Status:** `READY_FOR_APPROVAL`  
**Date:** `2026-08-26`  

---

## 1. Census of Arcana Due Diligence FileRecords

| FileRecord ID | DocumentArtifact ID | Confidentiality | Exact Bytes | FileVersion | Storage Path / Object |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `sfile-arcana-corp-01` | `doc-arcana-corp-01` | `PUBLIC` | 245,000 | `sver-arcana-1-v1` | `organizations/org-arcana/projects/arcana/data-room/sfile-arcana-corp-01/versions/sver-arcana-1-v1/arcana_incorporation.pdf` |
| `sfile-arcana-corp-02` | `doc-arcana-corp-02` | `INTERNAL` | 1,200,000 | `sver-arcana-2-v1` | `organizations/org-arcana/projects/arcana/data-room/sfile-arcana-corp-02/versions/sver-arcana-2-v1/arcana_bylaws.pdf` |
| `sfile-arcana-fin-01` | `doc-arcana-fin-01` | `INTERNAL` | 3,400,000 | `sver-arcana-3-v1` | `organizations/org-arcana/projects/arcana/data-room/sfile-arcana-fin-01/versions/sver-arcana-3-v1/arcana_financials_2025.pdf` |
| `sfile-arcana-fin-02` | `doc-arcana-fin-02` | `CONFIDENTIAL` | 4,800,000 | `sver-arcana-4-v1` | `organizations/org-arcana/projects/arcana/data-room/sfile-arcana-fin-02/versions/sver-arcana-4-v1/arcana_model_v1.xlsx` |
| `sfile-arcana-tech-01` | `doc-arcana-tech-01` | `CONFIDENTIAL` | 8,100,000 | `sver-arcana-5-v1` | `organizations/org-arcana/projects/arcana/data-room/sfile-arcana-tech-01/versions/sver-arcana-5-v1/arcana_architecture_whitepaper.pdf` |
| `sfile-arcana-tech-02` | `doc-arcana-tech-02` | `CONFIDENTIAL` | 2,900,000 | `sver-arcana-6-v1` | `organizations/org-arcana/projects/arcana/data-room/sfile-arcana-tech-02/versions/sver-arcana-6-v1/arcana_sec_audit.pdf` |
| `sfile-arcana-cap-01` | `doc-arcana-cap-01` | `HIGHLY_CONFIDENTIAL` | 1,800,000 | `sver-arcana-7-v1` | `organizations/org-arcana/projects/arcana/data-room/sfile-arcana-cap-01/versions/sver-arcana-7-v1/arcana_captable_q3.xlsx` |

---

## 2. Reconciled Census Metrics

- **FileRecords:** 7
- **FileVersions:** 7
- **Storage objects:** 7
- **PUBLIC:** 1 (245,000 bytes)
- **INTERNAL:** 2 (4,600,000 bytes)
- **CONFIDENTIAL:** 3 (15,800,000 bytes)
- **HIGHLY_CONFIDENTIAL:** 1 (1,800,000 bytes)
- **Sum classifications:** 1 + 2 + 3 + 1 = **7**
- **Sum exact file bytes:** 245,000 + 1,200,000 + 3,400,000 + 4,800,000 + 8,100,000 + 2,900,000 + 1,800,000 = **22,445,000 bytes**
- **Reported total bytes:** **22,445,000 bytes (22.45 MB)**
- **Sum exact file bytes = Reported total bytes:** **VERIFIED**
- **Missing documents:** **1** (`doc-arcana-reg-01` deliberately missing, 0 bytes, exercising gap detection)
- **Fake binaries created:** **0**

---

## 3. External Reviewer Controlled Access Verification

- Allowed external reviewer file (`sfile-arcana-corp-01`, `sfile-arcana-fin-02`, `sfile-arcana-tech-01`): **ALLOW PASS**
- Out-of-scope file (`sfile-arcana-corp-02`, `sfile-arcana-fin-01`, `sfile-arcana-tech-02`): **DENY PASS**
- Confidentiality ceiling (`sfile-arcana-cap-01` HIGHLY_CONFIDENTIAL vs CONFIDENTIAL ceiling): **DENY PASS**
- Revoked grant: **DENY PASS**
- Expired grant: **DENY PASS**

---

## 4. Canonical Safety & Invariants

- Evidence created by upload: **0**
- ClaimSupportStatus mutations: **0**
- Project Twin mutations: **0**
- Claims mutations: **0**
- Evidence mutations: **0**
- Invariant `DocumentArtifact ≠ FileRecord ≠ Evidence`: **PRESERVED**
