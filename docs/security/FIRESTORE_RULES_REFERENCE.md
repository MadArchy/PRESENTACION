# Firestore Security Rules Reference

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Rules Engine Version:** `rules_version = '2'`  
**File:** [`firestore.rules`](file:///c:/Users/user/Desktop/paginas%20web/presentacion/firestore.rules)  

---

## 1. Security Invariants Enforced in Rules

1. **Default Deny:** `match /{document=**} { allow read, write: if false; }`.
2. **Organization Isolation:** Verified using helper `isOrgMember(orgId)` checking active status in `members` subcollection.
3. **Project Isolation:** Verified using helper `hasProjectAccess(orgId, projectId)`.
4. **No Direct Client Role Mutations:** All member and project assignment writes require trusted server functions.
5. **No Direct Client Audit Writes:** `allow create, update, delete: if false;` on `auditEvents`.
