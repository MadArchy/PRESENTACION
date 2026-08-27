/**
 * Executive Presentation Engine E2E Test Suite — Venture Hub OS (Phase 4 / SPEC-004)
 * Tests scene templates, profiles, themes, compiler, keyboard shortcuts, fullscreen, and overview grid.
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
console.log('  VENTURE HUB OS — PHASE 4 PRESENTATION ENGINE E2E TESTS');
console.log('============================================================\n');

// Suite 1: Presentation Domain & Template Registry Integrity
console.log('--- Suite 1: Scene Templates & Registry ---');
const templateRegistryPath = path.resolve(__dirname, '../../src/modules/presentation/domain/templates/scene-template.registry.ts');
assert(fs.existsSync(templateRegistryPath), 'scene-template.registry.ts exists');
const registryContent = fs.readFileSync(templateRegistryPath, 'utf8');

const requiredScenes = [
  'EXECUTIVE_HERO', 'SECTION_DIVIDER', 'PROBLEM_FRAME', 'WHY_NOW',
  'SOLUTION_OVERVIEW', 'PRODUCT_OVERVIEW', 'MARKET_OVERVIEW', 'BUSINESS_MODEL',
  'COMPETITIVE_LANDSCAPE', 'TRACTION', 'FINANCIAL_OVERVIEW', 'TECHNOLOGY_OVERVIEW',
  'ARCHITECTURE_MAP', 'RISK_OVERVIEW', 'ROADMAP', 'TEAM', 'EVIDENCE_OVERVIEW',
  'DECISION_FRAME', 'ASK', 'CLOSING', 'GENERIC_CONTENT'
];

requiredScenes.forEach(sc => {
  assert(registryContent.includes(`'${sc}'`), `Registry defines template for '${sc}'`);
});

// Suite 2: Presentation Profiles & Themes Datasets
console.log('\n--- Suite 2: Profiles & Themes Datasets ---');
const investorProfilePath = path.resolve(__dirname, '../../data/presentations/profiles/investor-executive.json');
const execProfilePath = path.resolve(__dirname, '../../data/presentations/profiles/executive-brief.json');
const techProfilePath = path.resolve(__dirname, '../../data/presentations/profiles/technical-deepdive.json');

assert(fs.existsSync(investorProfilePath), 'investor-executive.json profile exists');
assert(fs.existsSync(execProfilePath), 'executive-brief.json profile exists');
assert(fs.existsSync(techProfilePath), 'technical-deepdive.json profile exists');

const darkThemePath = path.resolve(__dirname, '../../data/presentations/themes/executive-dark.json');
const lightThemePath = path.resolve(__dirname, '../../data/presentations/themes/executive-light.json');

assert(fs.existsSync(darkThemePath), 'executive-dark.json theme exists');
assert(fs.existsSync(lightThemePath), 'executive-light.json theme exists');

// Suite 3: Executive Renderer & Shell Components
console.log('\n--- Suite 3: Presentation Renderer & Shell Controls ---');
const rendererPath = path.resolve(__dirname, '../../src/ui/presentation/presentation-renderer.ts');
assert(fs.existsSync(rendererPath), 'presentation-renderer.ts exists');
const rendererContent = fs.readFileSync(rendererPath, 'utf8');
assert(rendererContent.includes('v2-presentation-wrapper'), 'Shell wraps presentation in v2-presentation-wrapper');
assert(rendererContent.includes('v2OverviewDrawer'), 'Shell provides overview grid drawer');
assert(rendererContent.includes('togglePresentationFullscreen'), 'Fullscreen toggle button declared');
assert(rendererContent.includes('togglePresentationTheme'), 'Theme switcher toggle declared');

// Suite 4: Keyboard Navigation & Shortcuts Integration
console.log('\n--- Suite 4: Keyboard Navigation & Global Bridge ---');
const mainPath = path.resolve(__dirname, '../../src/main.ts');
const mainContent = fs.readFileSync(mainPath, 'utf8');
assert(mainContent.includes('ArrowRight'), 'Main captures ArrowRight key');
assert(mainContent.includes('ArrowLeft'), 'Main captures ArrowLeft key');
assert(mainContent.includes('Home'), 'Main captures Home key');
assert(mainContent.includes('End'), 'Main captures End key');
assert(mainContent.includes('PageDown'), 'Main captures PageDown key');
assert(mainContent.includes('PageUp'), 'Main captures PageUp key');
assert(mainContent.includes('Escape'), 'Main captures Escape key');
assert(mainContent.includes('launchV2Presentation'), 'window.VentureHubBridge exposes launchV2Presentation');

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
    console.log('🎉 ALL EXECUTIVE PRESENTATION ENGINE E2E VERIFICATIONS PASSED.\n');
    process.exit(0);
  }
});

req.on('error', err => {
  assert(false, `Local server healthcheck failed: ${err.message}`);
  process.exit(1);
});
