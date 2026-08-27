# Observability & Operational Metrics Reference

**Document ID:** `OBSERVABILITY_REFERENCE`  
**Specification:** `SPEC-011 — Production Hardening, Observability & Deployment`  

---

## 1. Operational Telemetry Domains

Venture Hub OS instruments seven distinct operational telemetry domains:
1. `AUTH`: Login attempts, session refreshes, revocations, and auth failures.
2. `FIRESTORE`: Document read/write counts, query latencies, index efficiency.
3. `STORAGE`: Upload throughput, download authorization checks, size histograms.
4. `FUNCTIONS`: Execution durations, cold start frequencies, error rates, timeout counts.
5. `HOSTING`: CDN cache hit ratios, request latency, bandwidth consumption.
6. `AUDIT`: Append-only administrative event frequency, security anomaly detections.
7. `APPLICATION`: Client route transitions, Core Web Vitals (LCP, INP, CLS), client runtime errors.

---

## 2. Mandatory Observability Metrics Itemization

| Metric Name | Instrumentation & Aggregation Target | Telemetry Provider | Evidence Status |
|---|---|---|:---:|
| **request count** | Total HTTP/RPC invocations across Hosting, Functions, and API | Cloud Monitoring & Structured JSON Logs | **PASS** |
| **error count** | Total 4xx and 5xx responses segregated from business denials | Error Reporting & Structured JSON Logs | **PASS** |
| **function failures** | Cloud Function runtime exceptions, timeouts, and unhandled rejections | Cloud Functions Error Metrics | **PASS** |
| **authorization denials** | Fail-closed RBAC, Tenant isolation, and Storage authorization rejections | Structured Log Event `SECURITY_AUTH_DENIED` | **PASS** |
| **upload failures** | Aborted uploads, MIME rejections, oversized payload rejections | Structured Log Event `STORAGE_UPLOAD_FAILED` | **PASS** |
| **download denials** | Blocked downloads due to expired share, revoked grant, or tenant mismatch | Structured Log Event `STORAGE_DOWNLOAD_DENIED` | **PASS** |
| **latency** | Client-side route transition time and function execution duration (p50/p95/p99) | Performance Monitoring & Structured Logs | **PASS** |
| **deployment status** | Build version, commit SHA, release tag, and environment health state | Platform Administration Summary & Health | **PASS** |
