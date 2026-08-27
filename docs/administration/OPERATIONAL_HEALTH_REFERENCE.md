# Operational Health Reference

## 1. Multi-Dimensional Diagnostic Model

Venture Hub OS evaluates 7 core operational dimensions to deliver an unambiguous system health diagnostic:

1. **AUTH**: Firebase Authentication emulator/service connectivity and token verification.
2. **FIRESTORE**: Firestore database reachability, latency, and rule execution.
3. **STORAGE**: Firebase Cloud Storage bucket accessibility and upload/download capability.
4. **FUNCTIONS**: Cloud Functions trusted command engine reachability.
5. **PROJECT_DATA**: Canonical project JSON fixtures and validation status.
6. **DATA_ROOM**: Diligence artifacts and claim-evidence graph link integrity.
7. **AUDIT**: Append-only tamper-evident audit ledger health and persistence.

## 2. Health Statuses
- `HEALTHY`: Component fully operational with no anomalies.
- `DEGRADED`: Component functional but experiencing latency or elevated retry counts.
- `UNAVAILABLE`: Component unreachable or failing critical assertions.
- `UNKNOWN`: Health check timed out or inconclusive.
