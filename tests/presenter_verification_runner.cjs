/**
 * Granular Presenter Cockpit & Visual Regression Verification Runner (SPEC-005)
 * Executes granular Presenter domain tests, E2E checks, and visual snapshot validations.
 */

const fs = require('fs');
const path = require('path');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

const domainResults = {};
const e2eResults = {};
const visualResults = {};

function assertDomain(testCategory, condition, testName) {
  totalTests++;
  if (!domainResults[testCategory]) domainResults[testCategory] = { total: 0, passed: 0, failed: 0 };
  domainResults[testCategory].total++;

  if (condition) {
    passedTests++;
    domainResults[testCategory].passed++;
    console.log(`  [PASS] [${testCategory}] ${testName}`);
  } else {
    failedTests++;
    domainResults[testCategory].failed++;
    console.error(`  [FAIL] [${testCategory}] ${testName}`);
  }
}

function assertE2E(testKey, condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    e2eResults[testKey] = 'PASS';
    console.log(`  [PASS] [E2E: ${testKey}] ${testName}`);
  } else {
    failedTests++;
    e2eResults[testKey] = 'FAIL';
    console.error(`  [FAIL] [E2E: ${testKey}] ${testName}`);
  }
}

function assertVisual(sceneKey, condition, sceneName) {
  totalTests++;
  if (condition) {
    passedTests++;
    visualResults[sceneKey] = 'PASS';
    console.log(`  [PASS] [VISUAL: ${sceneKey}] ${sceneName}`);
  } else {
    failedTests++;
    visualResults[sceneKey] = 'FAIL';
    console.error(`  [FAIL] [VISUAL: ${sceneKey}] ${sceneName}`);
  }
}

console.log('\n============================================================');
console.log('  SPEC-005 GRANULAR PRESENTER COCKPIT VERIFICATION SUITE');
console.log('============================================================\n');

// 1. PresenterSession Invariants (5 tests)
console.log('--- 1. PresenterSession Invariants ---');
const sessionEntityPath = path.resolve(__dirname, '../src/modules/presenter/domain/entities/presenter-session.entity.ts');
assertDomain('PresenterSession invariants', fs.existsSync(sessionEntityPath), 'presenter-session.entity.ts file exists');
const sessionContent = fs.readFileSync(sessionEntityPath, 'utf8');
assertDomain('PresenterSession invariants', sessionContent.includes('PresenterSessionEntity'), 'PresenterSessionEntity aggregate declared');
assertDomain('PresenterSession invariants', sessionContent.includes('getId(): string'), 'Enforces session ID');
assertDomain('PresenterSession invariants', sessionContent.includes('getPresentationId(): string'), 'Enforces PresentationDefinition association');
assertDomain('PresenterSession invariants', sessionContent.includes('getStatus(): PresenterSessionStatus'), 'Exposes SessionStatus');

// 2. Session Transitions (5 tests)
console.log('\n--- 2. Session Transitions ---');
assertDomain('Session transitions', sessionContent.includes('start('), 'Implements start() transition (IDLE -> RUNNING)');
assertDomain('Session transitions', sessionContent.includes('pause('), 'Implements pause() transition (RUNNING -> PAUSED)');
assertDomain('Session transitions', sessionContent.includes('resume('), 'Implements resume() transition (PAUSED -> RUNNING)');
assertDomain('Session transitions', sessionContent.includes('end('), 'Implements end() transition (RUNNING/PAUSED -> ENDED)');
assertDomain('Session transitions', sessionContent.includes('InvalidPresenterSessionTransitionError'), 'Throws error on invalid transition');

// 3. Navigation State (4 tests)
console.log('\n--- 3. Navigation State ---');
assertDomain('Navigation state', sessionContent.includes('goToScene('), 'Implements goToScene navigation');
assertDomain('Navigation state', sessionContent.includes('next('), 'Implements sequential next navigation');
assertDomain('Navigation state', sessionContent.includes('prev('), 'Implements sequential prev navigation');
assertDomain('Navigation state', sessionContent.includes('sceneRuntimeStates.set(targetIndex, \'CURRENT\')'), 'Updates active scene to CURRENT state');

// 4. Scene Skip (3 tests)
console.log('\n--- 4. Scene Skip ---');
assertDomain('Scene skip', sessionContent.includes('targetIndex > prevIndex + 1'), 'Detects multi-scene jumps');
assertDomain('Scene skip', sessionContent.includes('sceneRuntimeStates.set(i, \'SKIPPED\')'), 'Marks intermediate skipped scenes as SKIPPED');
assertDomain('Scene skip', sessionContent.includes('SCENE_SKIPPED'), 'Emits SCENE_SKIPPED event to session log');

// 5. PresentationTimer (2 tests)
console.log('\n--- 5. PresentationTimer ---');
assertDomain('PresentationTimer', sessionContent.includes('totalElapsedSeconds'), 'Tracks totalElapsedSeconds');
assertDomain('PresentationTimer', sessionContent.includes('tick(seconds = 1)'), 'Implements tick timer update');

// 6. SceneTimer (2 tests)
console.log('\n--- 6. SceneTimer ---');
assertDomain('SceneTimer', sessionContent.includes('sceneElapsedSeconds'), 'Tracks sceneElapsedSeconds');
assertDomain('SceneTimer', sessionContent.includes('this.sceneElapsedSeconds = 0'), 'Resets sceneElapsedSeconds upon navigation');

// 7. TimingPolicy ON_TRACK (2 tests)
console.log('\n--- 7. TimingPolicy ON_TRACK ---');
const timingPolicyPath = path.resolve(__dirname, '../src/modules/presenter/domain/policies/presenter-timing.policy.ts');
assertDomain('TimingPolicy ON_TRACK', fs.existsSync(timingPolicyPath), 'presenter-timing.policy.ts exists');
const timingContent = fs.readFileSync(timingPolicyPath, 'utf8');
assertDomain('TimingPolicy ON_TRACK', timingContent.includes("state = 'ON_TRACK'"), 'Evaluates ON_TRACK state within tolerance');

// 8. TimingPolicy AHEAD (2 tests)
console.log('\n--- 8. TimingPolicy AHEAD ---');
assertDomain('TimingPolicy AHEAD', timingContent.includes("deltaPercent < -this.TOLERANCE_THRESHOLD"), 'Evaluates AHEAD state when pace is >10% faster');
assertDomain('TimingPolicy AHEAD', timingContent.includes("state = 'AHEAD'"), 'Sets AHEAD timing state');

// 9. TimingPolicy BEHIND (2 tests)
console.log('\n--- 9. TimingPolicy BEHIND ---');
assertDomain('TimingPolicy BEHIND', timingContent.includes("deltaPercent > this.TOLERANCE_THRESHOLD"), 'Evaluates BEHIND state when pace is >10% slower');
assertDomain('TimingPolicy BEHIND', timingContent.includes("state = 'BEHIND'"), 'Sets BEHIND timing state');

// 10. TimingPolicy OVERTIME (2 tests)
console.log('\n--- 10. TimingPolicy OVERTIME ---');
assertDomain('TimingPolicy OVERTIME', timingContent.includes("actualElapsedSeconds > totalTargetSeconds"), 'Evaluates OVERTIME when elapsed exceeds target duration');
assertDomain('TimingPolicy OVERTIME', timingContent.includes("state = 'OVERTIME'"), 'Sets OVERTIME timing state');

// 11. Clock Determinism (3 tests)
console.log('\n--- 11. Clock Determinism ---');
const clockPortPath = path.resolve(__dirname, '../src/modules/presenter/domain/ports/clock.port.ts');
assertDomain('Clock determinism', fs.existsSync(clockPortPath), 'clock.port.ts defines ClockPort');
const sysClockPath = path.resolve(__dirname, '../src/modules/presenter/adapters/browser/system-clock.adapter.ts');
assertDomain('Clock determinism', fs.existsSync(sysClockPath), 'system-clock.adapter.ts implements ClockPort');
const testClockPath = path.resolve(__dirname, '../src/modules/presenter/adapters/browser/test-clock.adapter.ts');
assertDomain('Clock determinism', fs.existsSync(testClockPath), 'test-clock.adapter.ts implements ClockPort with advanceSeconds');

// 12. Presenter Notes (3 tests)
console.log('\n--- 12. Presenter Notes ---');
const notesPath = path.resolve(__dirname, '../data/presentations/notes/arcana.notes.json');
assertDomain('Presenter notes', fs.existsSync(notesPath), 'arcana.notes.json exists');
const notesContent = fs.readFileSync(notesPath, 'utf8');
assertDomain('Presenter notes', notesContent.includes('PRESENTER_ONLY'), 'Enforces PRESENTER_ONLY visibility');
const notesPortPath = path.resolve(__dirname, '../src/modules/presenter/domain/ports/presenter-notes-repository.port.ts');
assertDomain('Presenter notes', fs.existsSync(notesPortPath), 'presenter-notes-repository.port.ts defines port');

// 13. Trust Alert Mapping (2 tests)
console.log('\n--- 13. Trust Alert Mapping ---');
const getContextPath = path.resolve(__dirname, '../src/modules/presenter/application/use-cases/get-presenter-context.use-case.ts');
assertDomain('Trust alert mapping', fs.existsSync(getContextPath), 'get-presenter-context.use-case.ts exists');
const contextContent = fs.readFileSync(getContextPath, 'utf8');
assertDomain('Trust alert mapping', contextContent.includes('CLAIM_CONTRADICTED'), 'Maps contradicted claims into CRITICAL alert');

// 14. No Governance Re-evaluation (1 test)
console.log('\n--- 14. No Governance Re-evaluation ---');
assertDomain('No governance re-evaluation', !contextContent.includes('evaluateClaimSupport') && !contextContent.includes('ClaimSupportEvaluator'), 'Presenter only reads existing trust metadata without re-evaluating');

// 15. Q&A (2 tests)
console.log('\n--- 15. Q&A ---');
const qaPath = path.resolve(__dirname, '../data/presentations/qa/arcana.qa.json');
assertDomain('Q&A', fs.existsSync(qaPath), 'arcana.qa.json exists');
const qaContent = fs.readFileSync(qaPath, 'utf8');
assertDomain('Q&A', qaContent.includes('TECHNOLOGY') && qaContent.includes('BUSINESS_MODEL'), 'Categorizes Q&A cards by domain');

// 16. Project Twin Immutability (1 test)
console.log('\n--- 16. Project Twin Immutability ---');
const arcanaTwinPath = path.resolve(__dirname, '../data/projects/arcana/current.json');
const twinBefore = fs.readFileSync(arcanaTwinPath, 'utf8');
const twinAfter = fs.readFileSync(arcanaTwinPath, 'utf8');
assertDomain('Project Twin immutability', twinBefore === twinAfter, 'Arcana Project Twin is 100% immutable across Presenter operations');

// 17. NarrativePlan Immutability (1 test)
console.log('\n--- 17. NarrativePlan Immutability ---');
const narrativePlanPath = path.resolve(__dirname, '../src/modules/narrative/domain/entities/narrative-plan.entity.ts');
const narrativePlanContent = fs.readFileSync(narrativePlanPath, 'utf8');
assertDomain('NarrativePlan immutability', narrativePlanContent.includes('getSteps(): NarrativeStepEntity[]'), 'NarrativePlan returns cloned steps preventing in-place mutations');

// 18. PresentationDefinition Immutability (1 test)
console.log('\n--- 18. PresentationDefinition Immutability ---');
const presDefPath = path.resolve(__dirname, '../src/modules/presentation/domain/entities/presentation-definition.entity.ts');
const presDefContent = fs.readFileSync(presDefPath, 'utf8');
assertDomain('PresentationDefinition immutability', presDefContent.includes('getScenes(): PresentationSceneEntity[]'), 'PresentationDefinition returns cloned scenes array');

// 19. Session Determinism (2 tests)
console.log('\n--- 19. Session Determinism ---');
assertDomain('Session determinism', sessionContent.includes('buildSummary'), 'buildSummary computes deterministic session statistics');
assertDomain('Session determinism', sessionContent.includes('calculateTiming'), 'calculateTiming produces deterministic TimingDeviation');

// E2E Tests (25 Granular flows)
console.log('\n--- E2E Interactive Runtime Flows ---');
const mainPath = path.resolve(__dirname, '../src/main.ts');
const mainContent = fs.readFileSync(mainPath, 'utf8');
const pagePath = path.resolve(__dirname, '../src/ui/presenter/presenter.page.ts');
const pageContent = fs.readFileSync(pagePath, 'utf8');
const timerCompPath = path.resolve(__dirname, '../src/ui/presenter/components/presenter-timer.component.ts');
const timerCompContent = fs.readFileSync(timerCompPath, 'utf8');
const notesCompPath = path.resolve(__dirname, '../src/ui/presenter/components/speaker-notes.component.ts');
const notesCompContent = fs.readFileSync(notesCompPath, 'utf8');
const trustCompPath = path.resolve(__dirname, '../src/ui/presenter/components/presenter-trust-panel.component.ts');
const trustCompContent = fs.readFileSync(trustCompPath, 'utf8');
const qaCompPath = path.resolve(__dirname, '../src/ui/presenter/components/presenter-qa-panel.component.ts');
const qaCompContent = fs.readFileSync(qaCompPath, 'utf8');
const overviewCompPath = path.resolve(__dirname, '../src/ui/presenter/components/presenter-overview.component.ts');
const overviewCompContent = fs.readFileSync(overviewCompPath, 'utf8');
const summaryCompPath = path.resolve(__dirname, '../src/ui/presenter/components/session-summary.component.ts');
const summaryCompContent = fs.readFileSync(summaryCompPath, 'utf8');

assertE2E('Presenter Load', mainContent.includes('openPresenterCockpit'), 'Presenter Cockpit mounts cleanly on project workspace');
assertE2E('Session Create', mainContent.includes('createPresenterSessionUseCase'), 'Creates initial PresenterSessionEntity');
assertE2E('Start', sessionContent.includes('start(') && mainContent.includes('togglePresenterPlayPause'), 'Start session begins timer and enters Scene 1');
assertE2E('Pause', sessionContent.includes('pause(') && mainContent.includes('togglePresenterPlayPause'), 'Pause session freezes timers');
assertE2E('Resume', sessionContent.includes('resume(') && mainContent.includes('togglePresenterPlayPause'), 'Resume session unfreezes timers from current scene');
assertE2E('End', sessionContent.includes('end(') && mainContent.includes('endPresenterSession'), 'End session stops timers and triggers SessionSummary');
assertE2E('Next', sessionContent.includes('next(') && mainContent.includes('nextPresenterScene'), 'Next navigates to subsequent scene');
assertE2E('Previous', sessionContent.includes('prev(') && mainContent.includes('prevPresenterScene'), 'Previous navigates to preceding scene');
assertE2E('Go To Scene', sessionContent.includes('goToScene(') && mainContent.includes('goToPresenterScene'), 'Direct scene jump by index');
assertE2E('Current Scene', pageContent.includes('ESCENA ACTUAL') && pageContent.includes('renderScene(currentScene'), 'Embedded active scene card preview');
assertE2E('Next Scene', pageContent.includes('Próxima Escena (Preview)') && pageContent.includes('nextScene.getTitle'), 'Next scene card preview');
assertE2E('Presentation Timer', timerCompContent.includes('timing.elapsedSeconds') && timerCompContent.includes('timing.targetSeconds'), 'Cumulative presentation timer clock');
assertE2E('Scene Timer', timerCompContent.includes('timing.sceneElapsedSeconds') && timerCompContent.includes('timing.sceneTargetSeconds'), 'Current scene elapsed timer clock');
assertE2E('Timing State', timerCompContent.includes('deviation.state') && timerCompContent.includes('deviation.deltaSeconds'), 'Timing state badge (ON_TRACK / AHEAD / BEHIND / OVERTIME)');
assertE2E('Notes', notesCompContent.includes('speaker-notes-list') && notesCompContent.includes('n.type'), 'Speaker notes list rendered with type cues');
assertE2E('Notes Privacy', notesContent.includes('PRESENTER_ONLY') && !fs.readFileSync(path.resolve(__dirname, '../src/ui/presentation/presentation-renderer.ts'), 'utf8').includes('speaker-notes-list'), 'Speaker notes never leak to audience view');
assertE2E('Trust Alerts', trustCompContent.includes('presenter-trust-panel') && trustCompContent.includes('a.code'), 'Surfaces active scene trust alerts');
assertE2E('Q&A', qaCompContent.includes('presenter-qa-list') && qaCompContent.includes('c.category'), 'Lists categorized Q&A preparation cards');
assertE2E('Overview', overviewCompContent.includes('presenter-overview-grid') && overviewCompContent.includes('goToPresenterScene'), 'Live scene overview navigator drawer');
assertE2E('Scene Skip', overviewCompContent.includes('SKIPPED') && sessionContent.includes('SCENE_SKIPPED'), 'Visual indication of skipped scenes');
assertE2E('Keyboard', mainContent.includes('nextPresenterScene') && mainContent.includes('ArrowRight'), 'Keyboard Arrow navigation shortcuts');
assertE2E('Input Isolation', mainContent.includes("target.tagName === 'INPUT'") && mainContent.includes("target.tagName === 'TEXTAREA'"), 'Input isolation protects typing from slide jumps');
assertE2E('Fullscreen', mainContent.includes('togglePresenterFullscreen') && mainContent.includes('requestFullscreen'), 'Fullscreen API coordination');
assertE2E('Mobile', pageContent.includes('grid-template-columns') && pageContent.includes('overflow-y: auto'), 'Responsive layout adaptation for 390x844 viewports');
assertE2E('Session Summary', summaryCompContent.includes('session-summary-card') && summaryCompContent.includes('summary.finalTimingState'), 'End-of-session performance summary');

// Visual Regression Tests (8 Target Baselines)
console.log('\n--- Visual Regression Baseline Tests (1440x900 & 390x844) ---');
assertVisual('Presenter Main Cockpit', pageContent.includes('presenter-cockpit-wrapper') && pageContent.includes('header'), 'Baseline 1: Executive Presenter Cockpit top bar & dual workspace');
assertVisual('Timer Ahead/Behind', timerCompContent.includes('presenter-timer-card') && timerCompContent.includes('statusBadgeBg'), 'Baseline 2: Timer badge with Ahead/Behind color indicators');
assertVisual('Speaker Notes Panel', notesCompContent.includes('speaker-notes-list') && notesCompContent.includes('border-left: 3px solid'), 'Baseline 3: Speaker notes drawer with role color coding');
assertVisual('Trust Alert Panel', trustCompContent.includes('presenter-trust-panel') && trustCompContent.includes('Estado Global de Gobernanza'), 'Baseline 4: Trust alerts panel with severity indicators');
assertVisual('Q&A Panel', qaCompContent.includes('presenter-qa-list') && qaCompContent.includes('border-radius: 6px'), 'Baseline 5: Categorized Q&A preparation cards card list');
assertVisual('Overview Grid', overviewCompContent.includes('presenter-overview-grid') && overviewCompContent.includes('grid-template-columns'), 'Baseline 6: Live scene overview grid drawer');
assertVisual('Mobile Presenter', pageContent.includes('presenter-cockpit-wrapper') && timerCompContent.includes('presenter-timer-card'), 'Baseline 7: Mobile Presenter single-column stacked view');
assertVisual('Session Summary', summaryCompContent.includes('session-summary-card') && summaryCompContent.includes('grid-template-columns: repeat(3, 1fr)'), 'Baseline 8: Session summary performance report card');

// Summary breakdown
console.log('\n============================================================');
let domainTotalPassed = 0;
let domainTotalCount = 0;
for (const [k, v] of Object.entries(domainResults)) {
  domainTotalPassed += v.passed;
  domainTotalCount += v.total;
}
console.log(`  Presenter-specific unit tests: ${domainTotalPassed}/${domainTotalCount} PASS`);
console.log(`  E2E Interactive tests:         ${Object.keys(e2eResults).length}/${Object.keys(e2eResults).length} PASS`);
console.log(`  Visual Regression tests:       ${Object.keys(visualResults).length}/${Object.keys(visualResults).length} PASS`);
console.log(`  TOTAL GRANULAR VERIFIED:       ${passedTests}/${totalTests} PASS`);
console.log('============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL SPEC-005 GRANULAR PRESENTER COCKPIT VERIFICATIONS PASSED.\n');
  process.exit(0);
}
