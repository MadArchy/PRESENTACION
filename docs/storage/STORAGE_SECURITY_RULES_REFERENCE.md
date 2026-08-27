# Storage Security Rules Reference: Phase 009

**Specification:** `SPEC-009 — Secure Storage & Controlled Data Room Sharing`  
**Version:** `2.0`  
**File:** `storage.rules`  

---

## 1. Storage Security Rules Matrix (27 Assertions)

All 27 storage rule assertions are verified with 100% pass rate:

| Gate # | Assertion Name | Evaluated Rule Expression | Enforcement Result |
| :--- | :--- | :--- | :--- |
| **1** | Anonymous secure file read | `request.auth == null` | **DENY PASS** |
| **2** | Anonymous secure upload | `request.auth == null` | **DENY PASS** |
| **3** | Suspended user secure file read | `isUserActive() == false` | **DENY PASS** |
| **4** | Cross-org secure file read | `isOrgMember(orgId) == false` | **DENY PASS** |
| **5** | Cross-org secure upload | `isOrgMember(orgId) == false` | **DENY PASS** |
| **6** | Cross-project secure file read | `hasProjectAccess(orgId, projectId) == false` | **DENY PASS** |
| **7** | Cross-project secure upload | `hasProjectAccess(orgId, projectId) == false` | **DENY PASS** |
| **8** | Project viewer upload | `getProjectRole() == 'PROJECT_VIEWER'` | **DENY PASS** |
| **9** | Authorized project editor upload | `getProjectRole() in ['PROJECT_ADMIN', 'PROJECT_EDITOR']` | **ALLOW PASS** |
| **10** | CONFIDENTIAL unauthorized read | `data_room.read_confidential` missing | **DENY PASS** |
| **11** | CONFIDENTIAL authorized read | `data_room.read_confidential` present | **ALLOW PASS** |
| **12** | HIGHLY_CONFIDENTIAL unauthorized read | `data_room.read_highly_confidential` missing | **DENY PASS** |
| **13** | HIGHLY_CONFIDENTIAL authorized read | `data_room.read_highly_confidential` present | **ALLOW PASS** |
| **14** | File not AVAILABLE read | `file.status != 'AVAILABLE'` | **DENY PASS** |
| **15** | Quarantined file read | `file.status == 'QUARANTINED'` | **DENY PASS** |
| **16** | Deleted file read | `file.status == 'DELETED'` | **DENY PASS** |
| **17** | Oversized upload | `request.resource.size > 50MB` | **DENY PASS** |
| **18** | Disallowed media type upload | `!(request.resource.contentType in ALLOWED)` | **DENY PASS** |
| **19** | Client direct object delete | `allow update, delete: if false;` | **DENY PASS** |
| **20** | Active valid share grant read | Valid `ShareGrant` active | **ALLOW PASS** |
| **21** | Missing share grant read | External reviewer lacking grant | **DENY PASS** |
| **22** | Expired share grant read | `expiresAt <= now` | **DENY PASS** |
| **23** | Revoked share grant read | `grant.status == 'REVOKED'` | **DENY PASS** |
| **24** | Out-of-scope file via share | `!(fileId in grant.fileIds)` | **DENY PASS** |
| **25** | Confidentiality ceiling exceeded | `file.confidentiality > grant.ceiling` | **DENY PASS** |
| **26** | Metadata tenant mismatch | `intent.orgId != caller.orgId` | **DENY PASS** |
| **27** | Storage path tenant mismatch | Object path org != caller org | **DENY PASS** |
