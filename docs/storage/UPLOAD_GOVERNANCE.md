# Upload Governance: Phase 009

**Specification:** `SPEC-009 — Secure Storage & Controlled Data Room Sharing`  
**Policy Version:** `1.0` (`STORAGE_UPLOAD_POLICY_VERSION = "1.0"`)  

---

## 1. Upload Lifecycle

```text
[Client] -> CreateUploadIntent -> [StorageAuthorizationService] -> Intent (AUTHORIZED)
[Client] -> Direct Firebase Storage Upload -> [storage.rules verification] -> Object stored (PENDING)
[Client] -> FinalizeUpload (Trusted Function) -> FileRecord (AVAILABLE) + FileVersion + Audit Event
```

---

## 2. Allowed Media Types & Size Limits

| Media Type Category | Allowed MIME Types | Maximum Size |
| :--- | :--- | :--- |
| **Documents & Spreadsheets** | `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `application/vnd.openxmlformats-officedocument.presentationml.presentation` | **50 MB** |
| **Images** | `image/png`, `image/jpeg`, `image/webp` | **20 MB** |
| **Plaintext & Data** | `text/plain`, `text/markdown`, `text/csv` | **10 MB** |

All other media types (including executables, scripts, archives) are **REJECTED** by default policy and storage security rules.
