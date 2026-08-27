# Logging & Redaction Policy

**Document ID:** `LOGGING_REDACTION_POLICY`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Policy Version:** `1.0`  

---

## 1. Zero Sensitive Leakage Mandate

All application logs emitted to stdout, stderr, or Cloud Logging pass through `LogRedactionPolicy`, guaranteeing zero leakage across the following critical categories:

| Prohibited Category | Sanitization Behavior | Verification Gate |
|---|---|:---:|
| **User Passwords** | Value replaced with `[REDACTED]` | **PASS (0 Leaked)** |
| **Firebase ID Tokens (JWT)** | Replaced with `[REDACTED_JWT]` | **PASS (0 Leaked)** |
| **Refresh & Access Tokens** | Value replaced with `[REDACTED]` | **PASS (0 Leaked)** |
| **Storage Download Tokens** | Regex matched and replaced with `token=[REDACTED_TOKEN]` | **PASS (0 Leaked)** |
| **Signed URLs / Query Signatures** | Signature params replaced with `Signature=[REDACTED]` | **PASS (0 Leaked)** |
| **AI Provider API Keys** | Key values replaced with `[REDACTED]` | **PASS (0 Leaked)** |
| **Confidential File Bodies** | Binary and base64 bodies stripped from metadata | **PASS (0 Leaked)** |
