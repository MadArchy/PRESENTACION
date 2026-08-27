# Trusted Security Operations & Cloud Functions Boundary

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Location:** [`functions/src/security/trusted-security-commands.ts`](file:///c:/Users/user/Desktop/paginas%20web/presentacion/functions/src/security/trusted-security-commands.ts)  

---

## 1. Authorized Server-Side Security Commands

1. `CreateOrganization(name, slug)`
2. `AddOrganizationMember(orgId, userId, role)`
3. `ChangeOrganizationMemberRole(orgId, userId, newRole)`
4. `SuspendOrganizationMember(orgId, userId)`
5. `RevokeOrganizationMember(orgId, userId)`
6. `GrantProjectAccess(orgId, projectId, userId, role)`
7. `ChangeProjectRole(orgId, projectId, userId, newRole)`
8. `SuspendProjectAccess(orgId, projectId, userId)`
9. `RevokeProjectAccess(orgId, projectId, userId)`

Every command independently verifies caller identity and role, rejects self-escalation attempts, and appends an immutable `AuditEvent`.
