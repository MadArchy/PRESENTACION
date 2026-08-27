# Authentication Architecture

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Provider:** Firebase Authentication (with Offline Emulator Adapter)  
**Status:** `ACTIVE`  

---

## 1. Authentication Lifecycle

1. **Initialization:** Client checks persistent session state via `onAuthStateChanged`.
2. **Sign In:** Email and Password authentication verified by Firebase Auth or InMemory adapter.
3. **Email Verification:** Required by default policy for tenant and project access.
4. **Token Generation:** Produces verified ID tokens with `platformAdmin` custom claim where applicable.
5. **Session Termination:** Complete token invalidation and security context teardown.
