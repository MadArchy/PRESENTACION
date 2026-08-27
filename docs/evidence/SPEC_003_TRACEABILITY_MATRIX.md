# SPEC-003 Traceability Matrix — Claims & Evidence Governance
**Document ID:** VHOS-EVD-005  
**Specification:** `SPEC-003`  
**Phase:** `VHOS-PHASE-003`  

---

| Spec Section | Requirement | Module / Artifact | Verification Evidence |
| :--- | :--- | :--- | :--- |
| **Sec 8-16** | Claim Entity & Value Objects | `src/modules/claim/domain/` | Unit Tests Suite 8 (100% PASS) |
| **Sec 17-22**| Evidence Entity & Types | `src/modules/evidence/domain/` | Unit Tests Suite 9 (100% PASS) |
| **Sec 23-26**| Many-to-Many Evidence Links | `src/modules/evidence/domain/entities/evidence-link.entity.ts` | Unit Tests Suite 10 (100% PASS) |
| **Sec 27-34**| Deterministic Support Rules | `src/modules/claim/domain/services/claim-support-evaluator.service.ts` | Unit Tests Suite 11 (100% PASS) |
| **Sec 35-40**| Repositories & Static JSON | `src/modules/claim/adapters/` & `src/modules/evidence/adapters/` | Unit Tests Suite 12 (100% PASS) |
| **Sec 41-47**| Application Use Cases | `src/modules/claim/application/` & `src/modules/evidence/application/` | Unit Tests Suite 12 (100% PASS) |
| **Sec 48-53**| Narrative Trust Integration | `src/modules/narrative/application/use-cases/annotate-narrative-trust.use-case.ts` | Unit Tests Suite 13 (100% PASS) |
| **Sec 54-59**| Governance UI Components | `src/ui/components/` & `src/ui/pages/governance.page.ts` | E2E Governance Tests (100% PASS) |
| **Sec 60-72**| Arcana Governance Pilot | `data/projects/arcana/claims/` & `data/projects/arcana/evidence/` | 16 Grounded Claims & 11 Evidence Items |
