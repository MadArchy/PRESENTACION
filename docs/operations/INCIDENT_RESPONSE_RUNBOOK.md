# Incident Response Runbook

**Document ID:** `INCIDENT_RESPONSE_RUNBOOK`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  
**Owner Role:** Incident Response Commander  

---

## 1. Six-Stage Incident Lifecycle

1. **IDENTIFY**: Detect anomaly via structured logs, alerts, or user reports. Classify severity (`CRITICAL`, `HIGH`, `MEDIUM`, `INFO`).
2. **CONTAIN**: Apply rate limits, suspend affected user/organization if malicious, or initiate rollback.
3. **INVESTIGATE**: Correlate request IDs across Cloud Logging and Firestore audit logs without tampering with evidence.
4. **RECOVER**: Deploy hotfix via CI/CD pipeline or restore verified backup.
5. **VERIFY**: Run complete verification runner and production smoke tests.
6. **DOCUMENT**: Post-mortem analysis and update threat mitigations in `SECURITY_THREAT_MODEL.md`.
