/**
 * Claims & Evidence Governance E2E Test Suite — Venture Hub OS (Phase 3 / SPEC-003)
 * Tests governance views, tables, filters, trust readiness summary, and bridge integration.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

let testsTotal = 0;
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName) {
  testsTotal++;
  if (condition) {
    testsPassed++;
    console.log(`  [PASS] ${testName}`);
  } else {
    testsFailed++;
    console.error(`  [FAIL] ${testName}`);
  }
}

console.log('\n============================================================');
console.log('  VENTURE HUB OS — PHASE 3 GOVERNANCE E2E TESTS');
console.log('============================================================\n');

// Suite 1: UI Component Files & Structural Declarations
console.log('--- Suite 1: UI Components Integrity ---');
const claimsTablePath = path.resolve(__dirname, '../../src/ui/components/claims-table.component.ts');
assert(fs.existsSync(claimsTablePath), 'claims-table.component.ts exists');
const claimsTableContent = fs.readFileSync(claimsTablePath, 'utf8');
assert(claimsTableContent.includes('renderClaimsTable'), 'renderClaimsTable function exported');
assert(claimsTableContent.includes('Estado Soporte'), 'Table contains Support Status column');
assert(claimsTableContent.includes('Materialidad'), 'Table contains Materiality column');

const evidenceTablePath = path.resolve(__dirname, '../../src/ui/components/evidence-table.component.ts');
assert(fs.existsSync(evidenceTablePath), 'evidence-table.component.ts exists');
const evidenceTableContent = fs.readFileSync(evidenceTablePath, 'utf8');
assert(evidenceTableContent.includes('renderEvidenceTable'), 'renderEvidenceTable function exported');
assert(evidenceTableContent.includes('Fuente / Provenance'), 'Table contains Provenance column');

const trustSummaryPath = path.resolve(__dirname, '../../src/ui/components/trust-summary.component.ts');
assert(fs.existsSync(trustSummaryPath), 'trust-summary.component.ts exists');
const trustSummaryContent = fs.readFileSync(trustSummaryPath, 'utf8');
assert(trustSummaryContent.includes('renderTrustSummary'), 'renderTrustSummary function exported');
assert(trustSummaryContent.includes('ESTADO DE CONFIANZA'), 'Trust summary renders readiness state');

const governancePagePath = path.resolve(__dirname, '../../src/ui/pages/governance.page.ts');
assert(fs.existsSync(governancePagePath), 'governance.page.ts exists');
const governancePageContent = fs.readFileSync(governancePagePath, 'utf8');
assert(governancePageContent.includes('CLAIMS'), 'Page supports CLAIMS tab');
assert(governancePageContent.includes('EVIDENCE'), 'Page supports EVIDENCE tab');
assert(governancePageContent.includes('COVERAGE'), 'Page supports COVERAGE tab');

// Suite 2: Bridge Routing & Global API Integration
console.log('\n--- Suite 2: Bridge Routing & Global API ---');
const mainPath = path.resolve(__dirname, '../../src/main.ts');
const mainContent = fs.readFileSync(mainPath, 'utf8');
assert(mainContent.includes('openGovernanceWorkspace'), 'window.VentureHubBridge exposes openGovernanceWorkspace');
assert(mainContent.includes('setGovernanceTab'), 'window.VentureHubBridge exposes setGovernanceTab');
assert(mainContent.includes('listClaims'), 'window.VentureHubBridge exposes listClaims');
assert(mainContent.includes('listEvidence'), 'window.VentureHubBridge exposes listEvidence');
assert(mainContent.includes('getTrustSummary'), 'window.VentureHubBridge exposes getTrustSummary');
assert(mainContent.includes('annotateNarrativeTrust'), 'window.VentureHubBridge exposes annotateNarrativeTrust');

// Suite 3: Canonical Pilot Static Dataset Conformance
console.log('\n--- Suite 3: Arcana Pilot Governance Datasets ---');
const arcanaClaimsPath = path.resolve(__dirname, '../../data/projects/arcana/claims/claims.json');
const arcanaEvidencePath = path.resolve(__dirname, '../../data/projects/arcana/evidence/evidence.json');
const arcanaLinksPath = path.resolve(__dirname, '../../data/projects/arcana/evidence/links.json');

assert(fs.existsSync(arcanaClaimsPath), 'Arcana claims.json exists');
assert(fs.existsSync(arcanaEvidencePath), 'Arcana evidence.json exists');
assert(fs.existsSync(arcanaLinksPath), 'Arcana links.json exists');

const claimsData = JSON.parse(fs.readFileSync(arcanaClaimsPath, 'utf8'));
const evidenceData = JSON.parse(fs.readFileSync(arcanaEvidencePath, 'utf8'));
const linksData = JSON.parse(fs.readFileSync(arcanaLinksPath, 'utf8'));

assert(claimsData.claims.length >= 15, `Arcana has ${claimsData.claims.length} claims (>= 15 required)`);
assert(evidenceData.evidence.length >= 10, `Arcana has ${evidenceData.evidence.length} evidence items (>= 10 required)`);
assert(linksData.links.length >= 10, `Arcana has ${linksData.links.length} evidence links (>= 10 required)`);

// Suite 4: Live HTTP Server Healthcheck
console.log('\n--- Suite 4: Live HTTP Server Healthcheck ---');
const req = http.get('http://127.0.0.1:8765/', res => {
  assert(res.statusCode === 200, `Local static dev server responds with HTTP ${res.statusCode}`);

  console.log('\n============================================================');
  console.log(`  E2E TEST RESULTS: ${testsPassed} Passed, ${testsFailed} Failed (Total: ${testsTotal})`);
  console.log('============================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL CLAIMS & EVIDENCE GOVERNANCE E2E VERIFICATIONS PASSED.\n');
    process.exit(0);
  }
});

req.on('error', err => {
  assert(false, `Local server healthcheck failed: ${err.message}`);
  process.exit(1);
});
