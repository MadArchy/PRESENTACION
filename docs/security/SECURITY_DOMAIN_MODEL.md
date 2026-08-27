# Security Domain Model: Venture Hub OS

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Module:** `src/modules/security/`  
**Status:** `ACTIVE`  

---

## 1. Domain Entities Architecture

```mermaid
classDiagram
    class AuthenticatedIdentity {
        +string userId
        +string email
        +string displayName
        +boolean emailVerified
        +string[] authProviderIds
        +PlatformRole platformRole
    }

    class UserProfile {
        +string userId
        +string displayName
        +string primaryEmail
        +UserStatus status
        +string createdAt
        +string updatedAt
    }

    class Organization {
        +string id
        +string name
        +string slug
        +OrganizationStatus status
        +string createdAt
        +string updatedAt
    }

    class OrganizationMembership {
        +string organizationId
        +string userId
        +OrganizationRole role
        +MembershipStatus status
        +string createdBy
        +string updatedBy
    }

    class ProjectAccessAssignment {
        +string organizationId
        +string projectId
        +string userId
        +ProjectRole role
        +AccessAssignmentStatus status
        +string createdBy
        +string updatedBy
    }

    class AuditEvent {
        +string id
        +string organizationId
        +string projectId
        +string actorUserId
        +AuditEventType type
        +string targetType
        +string targetId
        +string occurredAt
        +string requestId
        +Record metadata
        +string source
    }

    Organization --> OrganizationMembership : has members
    Organization --> ProjectAccessAssignment : scopes access
    OrganizationMembership ..> UserProfile : references
    ProjectAccessAssignment ..> UserProfile : references
    AuditEvent --> Organization : belongs to
```

---

## 2. Invariants & Guardrails

1. **Deterministic Fail-Closed:** Missing identity, missing membership, missing assignment, or inactive status results immediately in `DENY`.
2. **Coarse Platform Roles vs. Scoped Resource Roles:** Platform Admin is modeled through coarse claims (`platformAdmin: true`), while tenant and project roles reside in Firestore records.
3. **Append-Only Audit:** All security state changes emit immutable audit events generated strictly by `TRUSTED_FUNCTION`.
