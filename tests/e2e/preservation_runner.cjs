/**
 * Venture Hub OS — Phase 0 Automated Preservation & Integrity Test Runner
 * Validates baseline capabilities, contract conformance, media resolution, and runtime integrity.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT_DIR = path.resolve(__dirname, '../../');

const REPORT = {
  total: 0,
  passed: 0,
  failed: 0,
  failures: []
};

function assert(condition, description) {
  REPORT.total++;
  if (condition) {
    REPORT.passed++;
    console.log(`  [PASS] ${description}`);
  } else {
    REPORT.failed++;
    REPORT.failures.push(description);
    console.error(`  [FAIL] ${description}`);
  }
}

async function runSuite() {
  console.log('\n============================================================');
  console.log('  VENTURE HUB OS — PHASE 0 PRESERVATION TEST SUITE');
  console.log('============================================================\n');

  // Test 1: Core Runtime Files Existence
  console.log('--- Suite 1: Runtime Files & Architecture Integrity ---');
  const indexHtmlPath = path.join(ROOT_DIR, 'index.html');
  const appJsPath = path.join(ROOT_DIR, 'app.js');
  const styleCssPath = path.join(ROOT_DIR, 'style.css');
  const servePyPath = path.join(ROOT_DIR, 'serve.py');

  assert(fs.existsSync(indexHtmlPath), 'index.html entrypoint exists');
  assert(fs.existsSync(appJsPath), 'app.js presentation controller exists');
  assert(fs.existsSync(styleCssPath), 'style.css design system stylesheet exists');
  assert(fs.existsSync(servePyPath), 'serve.py local development server exists');

  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  const appJs = fs.readFileSync(appJsPath, 'utf8');
  const styleCss = fs.readFileSync(styleCssPath, 'utf8');

  // Test 2: Contract Conformance with legacy-capabilities.json
  console.log('\n--- Suite 2: Contract Conformance with legacy-capabilities.json ---');
  const contractPath = path.join(ROOT_DIR, 'docs/baseline/legacy-capabilities.json');
  assert(fs.existsSync(contractPath), 'legacy-capabilities.json contract exists');
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

  contract.protectedDecks.forEach(deck => {
    const containerId = deck.key === 'hub' ? 'deck-hub' : `deck-${deck.key}`;
    const hasContainer = indexHtml.includes(`id="${containerId}"`);
    assert(hasContainer, `Deck container #${containerId} is declared in HTML`);

    if (deck.key !== 'hub') {
      // Find the deck container block in indexHtml
      const startIdx = indexHtml.indexOf(`id="${containerId}"`);
      const nextDeckIdx = indexHtml.indexOf('class="deck-container"', startIdx + 20);
      const deckBlock = nextDeckIdx !== -1 ? indexHtml.substring(startIdx, nextDeckIdx) : indexHtml.substring(startIdx);
      
      const slideMatches = deckBlock.match(/<section[^>]*class="[^"]*slide[^"]*"/g) || [];
      assert(slideMatches.length === deck.slides, `Deck '${deck.key}' contains exactly ${deck.slides} declared slides (found ${slideMatches.length})`);
    }
  });

  // Test 3: Audience Profiles & Contextual Highlighting
  console.log('\n--- Suite 3: Audience Profiles & Contextual Highlighting ---');
  contract.audienceProfiles.forEach(aud => {
    assert(indexHtml.includes(`data-audience="${aud.id}"`), `Audience option '${aud.id}' exists in HTML switcher`);
    assert(styleCss.includes(`data-audience="${aud.id}"`), `CSS has contextual rules for data-audience="${aud.id}"`);
  });

  // Test 4: Presentation Controls & Modals
  console.log('\n--- Suite 4: Executive Presenter Cockpit & Modals ---');
  assert(indexHtml.includes('id="pitchTimerPopover"'), 'Pitch Timer popover modal declared (#pitchTimerPopover)');
  assert(indexHtml.includes('id="commentsDrawer"'), 'Q&A and Speaker Notes drawer declared (#commentsDrawer)');
  assert(indexHtml.includes('id="overviewDrawer"'), '15-Slide Overview grid drawer declared (#overviewDrawer)');
  assert(indexHtml.includes('id="lightboxModal"'), 'Image Lightbox modal declared (#lightboxModal)');
  assert(indexHtml.includes('id="videoTheater"'), 'Venture Video Theater modal declared (#videoTheater)');

  // Test 5: Keyboard Shortcuts Coverage in app.js
  console.log('\n--- Suite 5: Keyboard Navigation & Shortcuts ---');
  const keyShortcuts = ['ArrowRight', 'ArrowLeft', 'Home', 'End', 'PageDown', 'PageUp', 'Escape'];
  keyShortcuts.forEach(key => {
    assert(appJs.includes(`'${key}'`), `Keyboard handler captures '${key}'`);
  });

  // Test 6: Mobile Touch & Responsive Features
  console.log('\n--- Suite 6: Mobile Touch Gestures & Responsive Elements ---');
  assert(indexHtml.includes('id="mobileEdgePrev"'), 'Mobile edge previous button present');
  assert(indexHtml.includes('id="mobileEdgeNext"'), 'Mobile edge next button present');
  assert(indexHtml.includes('id="mobileSwipeHint"'), 'Mobile swipe hint banner present');
  assert(appJs.includes('setupTouchGestures'), 'Touch gesture engine initialized in app.js');

  // Test 7: Media Assets Integrity
  console.log('\n--- Suite 7: Critical Media Assets Resolution ---');
  const criticalMedia = [
    'backgrounds/bg-hub.jpg',
    'backgrounds/bg-tutor-neural.jpg',
    'backgrounds/bg-fastfood-store.jpg',
    'backgrounds/bg-arcana-chain.jpg',
    'backgrounds/bg-ia-lab.jpg',
    'media/ai-edtech-hd.mp4'
  ];
  criticalMedia.forEach(mediaRel => {
    const fullPath = path.join(ROOT_DIR, mediaRel);
    assert(fs.existsSync(fullPath), `Media asset '${mediaRel}' exists on disk`);
  });

  // Test 8: Live HTTP Server Endpoint (if active)
  console.log('\n--- Suite 8: Local HTTP Server Healthcheck ---');
  await new Promise((resolve) => {
    const req = http.get('http://127.0.0.1:8765/', (res) => {
      assert(res.statusCode === 200, `Local server http://127.0.0.1:8765/ responds with HTTP ${res.statusCode}`);
      resolve();
    });
    req.on('error', (err) => {
      console.log(`  [NOTE] Server not reachable on 8765 (${err.message}) - skipping live HTTP check.`);
      resolve();
    });
  });

  // Report Summary
  console.log('\n============================================================');
  console.log(`  TEST RESULTS: ${REPORT.passed} Passed, ${REPORT.failed} Failed (Total: ${REPORT.total})`);
  console.log('============================================================\n');

  if (REPORT.failed > 0) {
    console.error('FAILURES:');
    REPORT.failures.forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
    process.exit(1);
  } else {
    console.log('🎉 ALL PRESERVATION VERIFICATIONS PASSED WITH 100% SUCCESS.\n');
    process.exit(0);
  }
}

runSuite().catch(err => {
  console.error('Test Suite Error:', err);
  process.exit(1);
});
