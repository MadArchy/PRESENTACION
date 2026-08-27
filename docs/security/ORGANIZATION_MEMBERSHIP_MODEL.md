# Organization & Membership Security Model

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Status:** `ACTIVE`  

---

## 1. Multi-Tenant Organization Scoping

1. **Tenant Isolation:** All project and security metadata are strictly scoped to an `Organization`.
2. **Organization Roles:**
   - `ORG_OWNER`: Full administrative authority over organization, members, and all projects.
   - `ORG_ADMIN`: Manages members, project access, and security settings.
   - `ORG_MEMBER`: General organization participant.
   - `ORG_VIEWER`: Read-only organization viewer.
3. **Project-Scoped Roles:**
   - `PROJECT_ADMIN`: Full governance, narrative, presentation, and data room management.
   - `PROJECT_EDITOR`: Editing of project twin, claims, evidence, and narrative generation.
   - `PROJECT_ANALYST`: Analysis, copilot, and trust evaluation.
   - `PROJECT_REVIEWER`: Governance claim review and assessment.
   - `PROJECT_PRESENTER`: Presentation playback and presenter cockpit usage.
   - `PROJECT_VIEWER`: Read-only access to project artifacts.
   - `EXTERNAL_REVIEWER`: Restrictive diligence reviewer access.
