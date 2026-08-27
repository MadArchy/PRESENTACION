# Backup & Restore Runbook

**Document ID:** `BACKUP_RESTORE_RUNBOOK`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Owner Role:** Database Administrator / Platform Administrator  

---

## 1. Backup Strategy & RPO / RTO Targets

- **Recovery Point Objective (RPO)**: 24 hours (daily scheduled automated exports) with point-in-time recovery (PITR) enabled.
- **Recovery Time Objective (RTO)**: 2 hours from disaster declaration to staging/production validation.
- **Firestore Exports**: Daily automated export to dedicated backup Cloud Storage bucket `gs://vhos-production-backups/firestore/`.
- **Storage Lifecycle Policy**: Soft-delete retention of 30 days for deleted/superseded document versions.

---

## 2. Staging Restore Exercise Verification

A backup is not considered verified until a full restore is executed and validated in a non-production staging environment.

### Exercise Protocol:
1. Export latest Firestore collections from production backup.
2. Restore to isolated staging project `vhos-staging`.
3. Verify collection document counts (Organizations, Members, Projects, Claims, Evidence, Storage Records).
4. Run automated E2E smoke tests against restored staging database.
5. Record verification status: `STAGING_RESTORE_VERIFIED_PASS`.
