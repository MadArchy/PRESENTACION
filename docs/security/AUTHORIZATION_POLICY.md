# Authorization Policy & Decision Engine

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Policy Version:** `1.0`  
**Status:** `ACTIVE`  

---

## 1. Fail-Closed Evaluation Decision Tree

```mermaid
graph TD
    Start[Access Request] --> AuthCheck{Identity Valid & Authenticated?}
    AuthCheck -- No --> DenyAuth[DENY: UNAUTHENTICATED]
    AuthCheck -- Yes --> EmailCheck{Email Verified?}
    EmailCheck -- No --> DenyEmail[DENY: EMAIL_NOT_VERIFIED]
    EmailCheck -- Yes --> UserCheck{User Status ACTIVE?}
    UserCheck -- No --> DenyUser[DENY: USER_SUSPENDED]
    UserCheck -- Yes --> AdminCheck{Platform Admin?}
    AdminCheck -- Yes --> Allow[ALLOW: PLATFORM_ADMIN]
    AdminCheck -- No --> OrgCheck{Organization Valid & ACTIVE?}
    OrgCheck -- No --> DenyOrg[DENY: ORG_NOT_FOUND / SUSPENDED]
    OrgCheck -- Yes --> MemCheck{Membership ACTIVE?}
    MemCheck -- No --> DenyMem[DENY: MEMBERSHIP_MISSING / INACTIVE]
    MemCheck -- Yes --> ProjCheck{Project Access ACTIVE?}
    ProjCheck -- No --> DenyProj[DENY: PROJECT_ACCESS_MISSING / INACTIVE]
    ProjCheck -- Yes --> ConfCheck{Confidentiality Permissions OK?}
    ConfCheck -- No --> DenyConf[DENY: CONFIDENTIALITY_PERMISSION_MISSING]
    ConfCheck -- Yes --> PermCheck{Permission in Granted Set?}
    PermCheck -- No --> DenyPerm[DENY: PERMISSION_MISSING]
    PermCheck -- Yes --> AllowFinal[ALLOW: RBAC Policy 1.0]
```
