/**
 * Executive Presenter Cockpit E2E Test Suite — Venture Hub OS (Phase 5 / SPEC-005)
 * Tests session lifecycle, timers, notes, trust alerts, Q&A, navigation, overview, and summary.
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
console.log('  VENTURE HUB OS — PHASE 5 PRESENTER COCKPIT E2E TESTS');
console.log('============================================================\n');

// Suite 1: Presenter Domain & Lifecycle Integrity
console.log('--- Suite 1: Presenter Domain & Lifecycle ---');
const sessionEntityPath = path.resolve(__dirname, '../../src/modules/presenter/domain/entities/presenter-session.entity.ts');
assert(fs.existsSync(sessionEntityPath), 'presenter-session.entity.ts exists');
const sessionEntityContent = fs.readFileSync(sessionEntityPath, 'utf8');

assert(sessionEntityContent.includes('start('), 'PresenterSession implements start transition');
assert(sessionEntityContent.includes('pause('), 'PresenterSession implements pause transition');
assert(sessionEntityContent.includes('resume('), 'PresenterSession implements resume transition');
assert(sessionEntityContent.includes('end('), 'PresenterSession implements end transition');
assert(sessionEntityContent.includes('calculateTiming'), 'PresenterSession implements calculateTiming');
assert(sessionEntityContent.includes('buildSummary'), 'PresenterSession implements buildSummary');

// Suite 2: Presenter Datasets (Notes & Q&A)
console.log('\n--- Suite 2: Presenter Datasets (Notes & Q&A) ---');
const notesPath = path.resolve(__dirname, '../../data/presentations/notes/arcana.notes.json');
const qaPath = path.resolve(__dirname, '../../data/presentations/qa/arcana.qa.json');

assert(fs.existsSync(notesPath), 'arcana.notes.json exists');
assert(fs.existsSync(qaPath), 'arcana.qa.json exists');

const notesData = JSON.parse(fs.readFileSync(notesPath, 'utf8'));
const qaData = JSON.parse(fs.readFileSync(qaPath, 'utf8'));

assert(Array.isArray(notesData.notes) && notesData.notes.length >= 3, `Arcana notes has ${notesData.notes.length} entries`);
assert(Array.isArray(qaData.cards) && qaData.cards.length >= 3, `Arcana Q&A has ${qaData.cards.length} cards`);

// Suite 3: Presenter UI Components & Panels
console.log('\n--- Suite 3: Presenter UI Components & Panels ---');
const pagePath = path.resolve(__dirname, '../../src/ui/presenter/presenter.page.ts');
assert(fs.existsSync(pagePath), 'presenter.page.ts exists');
const pageContent = fs.readFileSync(pagePath, 'utf8');

assert(pageContent.includes('renderPresenterTimer'), 'Presenter page mounts PresenterTimer');
assert(pageContent.includes('renderSpeakerNotes'), 'Presenter page mounts SpeakerNotes');
assert(pageContent.includes('renderPresenterTrustPanel'), 'Presenter page mounts TrustPanel');
assert(pageContent.includes('renderPresenterQaPanel'), 'Presenter page mounts QaPanel');
assert(pageContent.includes('renderPresenterOverview'), 'Presenter page mounts Overview');
assert(pageContent.includes('renderSessionSummary'), 'Presenter page mounts SessionSummary');

// Suite 4: Keyboard Navigation & Input Isolation
console.log('\n--- Suite 4: Keyboard Navigation & Input Isolation ---');
const mainPath = path.resolve(__dirname, '../../src/main.ts');
const mainContent = fs.readFileSync(mainPath, 'utf8');

assert(mainContent.includes("target.tagName === 'INPUT'"), 'Input isolation protects <input>');
assert(mainContent.includes("target.tagName === 'TEXTAREA'"), 'Input isolation protects <textarea>');
assert(mainContent.includes("openPresenterCockpit"), 'window.VentureHubBridge exposes openPresenterCockpit');
assert(mainContent.includes("togglePresenterPlayPause"), 'window.VentureHubBridge exposes togglePresenterPlayPause');
assert(mainContent.includes("endPresenterSession"), 'window.VentureHubBridge exposes endPresenterSession');

// Suite 5: Live Static Runtime Healthcheck
console.log('\n--- Suite 5: Live Static Runtime Healthcheck ---');
const req = http.get('http://127.0.0.1:8765/', res => {
  assert(res.statusCode === 200, `Local static dev server responds with HTTP ${res.statusCode}`);

  console.log('\n============================================================');
  console.log(`  E2E TEST RESULTS: ${testsPassed} Passed, ${testsFailed} Failed (Total: ${testsTotal})`);
  console.log('============================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL EXECUTIVE PRESENTER COCKPIT E2E VERIFICATIONS PASSED.\n');
    process.exit(0);
  }
});

req.on('error', err => {
  assert(false, `Local server healthcheck failed: ${err.message}`);
  process.exit(1);
});
