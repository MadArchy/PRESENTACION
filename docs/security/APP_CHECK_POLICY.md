# Firebase App Check Policy

**Document ID:** `APP_CHECK_POLICY`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  

---

## 1. App Check Architectural Invariants

- **App Check Complements RBAC**: App Check attests that traffic originates from the legitimate Venture Hub OS client app. It does **not** replace authentication, tenant isolation, or role-based access control.
- **Enforcement Services**:
  1. **Firestore**: Direct SDK queries require a valid App Check token in production.
  2. **Cloud Storage**: Object reads/uploads require valid App Check tokens.
  3. **Cloud Functions**: Callable functions verify App Check tokens before executing trusted administration commands.

---

## 2. Verification Matrix

| Service | Valid App Check Token | Invalid / Missing App Check Token |
|---|:---:|:---:|
| **Firestore Database** | `ALLOW PASS` | `DENY PASS` |
| **Cloud Storage Bucket** | `ALLOW PASS` | `DENY PASS` |
| **Cloud Functions** | `ALLOW PASS` | `DENY PASS` |
