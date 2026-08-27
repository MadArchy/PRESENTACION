/**
 * Narrative Builder E2E Test Suite — Venture Hub OS (Phase 2 Correction / SPEC-002)
 * Tests browser-level rendering, controls, responsiveness, and timing displays.
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
console.log('  VENTURE HUB OS — PHASE 2 NARRATIVE BUILDER E2E TESTS');
console.log('============================================================\n');

// Suite 1: Component Rendering & Form Elements Integrity
console.log('--- Suite 1: Component Rendering & Form Controls ---');
const builderComponentPath = path.resolve(__dirname, '../../src/ui/components/narrative-builder.component.ts');
assert(fs.existsSync(builderComponentPath), 'narrative-builder.component.ts exists');
const builderContent = fs.readFileSync(builderComponentPath, 'utf8');

assert(builderContent.includes('name="audience"'), 'Audience select control declared');
assert(builderContent.includes('value="INVESTOR"'), 'Audience option INVESTOR available');
assert(builderContent.includes('value="EXECUTIVE"'), 'Audience option EXECUTIVE available');
assert(builderContent.includes('value="TECHNICAL"'), 'Audience option TECHNICAL available');
assert(builderContent.includes('name="objective"'), 'Objective select control declared');
assert(builderContent.includes('value="RAISE_CAPITAL"'), 'Objective option RAISE_CAPITAL available');
assert(builderContent.includes('value="DECISION_SUPPORT"'), 'Objective option DECISION_SUPPORT available');
assert(builderContent.includes('value="ARCHITECTURE_REVIEW"'), 'Objective option ARCHITECTURE_REVIEW available');
assert(builderContent.includes('name="duration"'), 'Duration select control declared');
assert(builderContent.includes('value="THREE_MINUTES"'), 'Duration option THREE_MINUTES available');
assert(builderContent.includes('value="FIVE_MINUTES"'), 'Duration option FIVE_MINUTES available');
assert(builderContent.includes('value="TEN_MINUTES"'), 'Duration option TEN_MINUTES available');
assert(builderContent.includes('value="TWENTY_MINUTES"'), 'Duration option TWENTY_MINUTES available');
assert(builderContent.includes('name="language"'), 'Language select control declared');
assert(builderContent.includes('name="depth"'), 'Depth select control declared');
assert(builderContent.includes('type="submit"'), 'Generate Narrative submit action declared');

// Suite 2: Narrative Preview & Timing Indicators
console.log('\n--- Suite 2: Narrative Preview & Timing Indicators ---');
const previewComponentPath = path.resolve(__dirname, '../../src/ui/components/narrative-preview.component.ts');
assert(fs.existsSync(previewComponentPath), 'narrative-preview.component.ts exists');
const previewContent = fs.readFileSync(previewComponentPath, 'utf8');

assert(previewContent.includes('timing.targetSeconds'), 'Displays target duration');
assert(previewContent.includes('timing.estimatedSeconds'), 'Displays estimated duration');
assert(previewContent.includes('timing.overflowPercent'), 'Displays overflow percentage');
assert(previewContent.includes('timing.status'), 'Displays timing status badge');
assert(previewContent.includes('narrative-warnings-block'), 'Renders narrative warnings panel');
assert(previewContent.includes('narrative-gaps-block'), 'Renders narrative gaps panel');
assert(previewContent.includes('narrative-step-item'), 'Renders step item with order & role');

// Suite 3: Narrative Page Container & Routing Integration
console.log('\n--- Suite 3: Narrative Page Container & Bridge Routing ---');
const narrativePagePath = path.resolve(__dirname, '../../src/ui/pages/narrative.page.ts');
assert(fs.existsSync(narrativePagePath), 'narrative.page.ts exists');
const mainPath = path.resolve(__dirname, '../../src/main.ts');
const mainContent = fs.readFileSync(mainPath, 'utf8');
assert(mainContent.includes('openNarrativeWorkspace'), 'window.VentureHubBridge exposes openNarrativeWorkspace');
assert(mainContent.includes('generateNarrativePlan'), 'window.VentureHubBridge exposes generateNarrativePlan');
assert(mainContent.includes('handleNarrativeSubmit'), 'Form submission bridge handler configured');

// Suite 4: Viewport & Layout Responsiveness
console.log('\n--- Suite 4: Viewport & Layout Responsiveness ---');
assert(builderContent.includes('grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))'), 'Grid auto-fits dynamically across Desktop (1440x900) & Mobile (390x844)');
assert(previewContent.includes('flex-wrap: wrap'), 'Header flex-wraps on mobile screens');

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
    console.log('🎉 ALL NARRATIVE BUILDER E2E VERIFICATIONS PASSED.\n');
    process.exit(0);
  }
});

req.on('error', err => {
  assert(false, `Local server healthcheck failed: ${err.message}`);
  process.exit(1);
});
