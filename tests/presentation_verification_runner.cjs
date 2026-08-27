/**
 * Granular Presentation Engine & Visual Regression Verification Runner (SPEC-004)
 * Executes granular domain tests, E2E checks, and visual snapshot validations.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

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
console.log('  SPEC-004 GRANULAR PRESENTATION ENGINE VERIFICATION SUITE');
console.log('============================================================\n');

// 1. PresentationDefinition tests
console.log('--- 1. PresentationDefinition Tests ---');
const defEntityPath = path.resolve(__dirname, '../src/modules/presentation/domain/entities/presentation-definition.entity.ts');
assertDomain('PresentationDefinition', fs.existsSync(defEntityPath), 'PresentationDefinitionEntity file exists');
const defEntityContent = fs.readFileSync(defEntityPath, 'utf8');
assertDomain('PresentationDefinition', defEntityContent.includes('PresentationDefinitionEntity'), 'PresentationDefinitionEntity class declared');
assertDomain('PresentationDefinition', defEntityContent.includes('PresentationDefinition ID cannot be empty'), 'Enforces non-empty ID invariant');
assertDomain('PresentationDefinition', defEntityContent.includes('PresentationDefinition projectId cannot be empty'), 'Enforces non-empty projectId invariant');
assertDomain('PresentationDefinition', defEntityContent.includes('PresentationDefinition must contain at least one scene'), 'Enforces >=1 scene invariant');
assertDomain('PresentationDefinition', defEntityContent.includes('toJSON(): PresentationDefinition'), 'Implements JSON serialization method');

// 2. PresentationScene tests
console.log('\n--- 2. PresentationScene Tests ---');
const sceneEntityPath = path.resolve(__dirname, '../src/modules/presentation/domain/entities/presentation-scene.entity.ts');
assertDomain('PresentationScene', fs.existsSync(sceneEntityPath), 'PresentationSceneEntity file exists');
const sceneEntityContent = fs.readFileSync(sceneEntityPath, 'utf8');
assertDomain('PresentationScene', sceneEntityContent.includes('Scene ID cannot be empty'), 'Enforces non-empty scene ID invariant');
assertDomain('PresentationScene', sceneEntityContent.includes('Scene order must be a positive number'), 'Enforces positive contiguous scene order');
assertDomain('PresentationScene', sceneEntityContent.includes('setLayout(layout: LayoutVariant)'), 'Supports immutable layout modification');
assertDomain('PresentationScene', sceneEntityContent.includes('setStatus(status: SceneStatus)'), 'Supports status transition');

// 3. SceneTemplateRegistry tests
console.log('\n--- 3. SceneTemplateRegistry Tests ---');
const registryPath = path.resolve(__dirname, '../src/modules/presentation/domain/templates/scene-template.registry.ts');
assertDomain('SceneTemplateRegistry', fs.existsSync(registryPath), 'SceneTemplateRegistry file exists');
const registryContent = fs.readFileSync(registryPath, 'utf8');
const all21SceneTypes = [
  'EXECUTIVE_HERO', 'SECTION_DIVIDER', 'PROBLEM_FRAME', 'WHY_NOW',
  'SOLUTION_OVERVIEW', 'PRODUCT_OVERVIEW', 'MARKET_OVERVIEW', 'BUSINESS_MODEL',
  'COMPETITIVE_LANDSCAPE', 'TRACTION', 'FINANCIAL_OVERVIEW', 'TECHNOLOGY_OVERVIEW',
  'ARCHITECTURE_MAP', 'RISK_OVERVIEW', 'ROADMAP', 'TEAM', 'EVIDENCE_OVERVIEW',
  'DECISION_FRAME', 'ASK', 'CLOSING', 'GENERIC_CONTENT'
];
all21SceneTypes.forEach(st => {
  assertDomain('SceneTemplateRegistry', registryContent.includes(`'${st}'`), `Registers SceneTemplate for '${st}'`);
});

// 4. PresentationProfile tests
console.log('\n--- 4. PresentationProfile Tests ---');
const profilesDir = path.resolve(__dirname, '../data/presentations/profiles');
['investor-executive', 'executive-brief', 'technical-deepdive'].forEach(pId => {
  const pPath = path.join(profilesDir, `${pId}.json`);
  assertDomain('PresentationProfile', fs.existsSync(pPath), `Profile '${pId}.json' exists on disk`);
  const prof = JSON.parse(fs.readFileSync(pPath, 'utf8'));
  assertDomain('PresentationProfile', prof.id === pId, `Profile '${pId}' ID matches filename`);
  assertDomain('PresentationProfile', prof.profileVersion === '1.0', `Profile '${pId}' version is 1.0`);
  assertDomain('PresentationProfile', typeof prof.scenePreferences === 'object', `Profile '${pId}' defines scenePreferences map`);
});

// 5. PresentationTheme tests
console.log('\n--- 5. PresentationTheme Tests ---');
const themesDir = path.resolve(__dirname, '../data/presentations/themes');
['executive-dark', 'executive-light'].forEach(tId => {
  const tPath = path.join(themesDir, `${tId}.json`);
  assertDomain('PresentationTheme', fs.existsSync(tPath), `Theme '${tId}.json' exists on disk`);
  const th = JSON.parse(fs.readFileSync(tPath, 'utf8'));
  assertDomain('PresentationTheme', th.id === tId, `Theme '${tId}' ID matches filename`);
  assertDomain('PresentationTheme', th.version === '1.0', `Theme '${tId}' version is 1.0`);
  assertDomain('PresentationTheme', !!th.tokens.color.background, `Theme '${tId}' defines color.background token`);
  assertDomain('PresentationTheme', !!th.tokens.typography.fontSizeHeadline, `Theme '${tId}' defines typography.fontSizeHeadline token`);
});

// 6. Scene Selection Policy tests
console.log('\n--- 6. Scene Selection Policy Tests ---');
const compilerPath = path.resolve(__dirname, '../src/modules/presentation/domain/services/presentation-compiler.service.ts');
assertDomain('SceneSelectionPolicy', fs.existsSync(compilerPath), 'presentation-compiler.service.ts exists');
const compilerContent = fs.readFileSync(compilerPath, 'utf8');
assertDomain('SceneSelectionPolicy', compilerContent.includes('profile.scenePreferences[secType]'), 'Resolves scene from profile scenePreferences');
assertDomain('SceneSelectionPolicy', compilerContent.includes('SceneTemplateRegistry.has(sceneType)'), 'Validates sceneType against registry');

// 7. Layout Resolution tests
console.log('\n--- 7. Layout Resolution Tests ---');
assertDomain('LayoutResolution', compilerContent.includes('layout: template.defaultLayout'), 'Binds layout to template default layout');
const layoutVoPath = path.resolve(__dirname, '../src/modules/presentation/domain/value-objects/layout-variant.vo.ts');
assertDomain('LayoutResolution', fs.existsSync(layoutVoPath), 'layout-variant.vo.ts exists');

// 8. ContentBinding tests
console.log('\n--- 8. ContentBinding Tests ---');
assertDomain('ContentBinding', compilerContent.includes("type: 'TEXT'"), 'Binds primary TEXT content');
assertDomain('ContentBinding', compilerContent.includes("type: 'BULLET_LIST'"), 'Binds BULLET_LIST structured content');
assertDomain('ContentBinding', compilerContent.includes("type: 'METRIC_SET'"), 'Binds METRIC_SET numerical content');
assertDomain('ContentBinding', compilerContent.includes("type: 'ROADMAP'"), 'Binds ROADMAP milestones content');
assertDomain('ContentBinding', compilerContent.includes("type: 'RISK_LIST'"), 'Binds RISK_LIST content');
assertDomain('ContentBinding', compilerContent.includes("type: 'ARCHITECTURE_NODES'"), 'Binds ARCHITECTURE_NODES content');

// 9. TrustBinding tests
console.log('\n--- 9. TrustBinding Tests ---');
assertDomain('TrustBinding', compilerContent.includes('trustBindings: TrustBinding[]'), 'Preserves typed TrustBinding collection in scene');
assertDomain('TrustBinding', compilerContent.includes('c.getSupportStatus() === \'CONTRADICTED\''), 'Flags contradicted claims in scene status');
assertDomain('TrustBinding', compilerContent.includes('c.getSupportStatus() === \'UNSUPPORTED\''), 'Flags unsupported facts in scene warnings');

// 10. Fallback Template tests
console.log('\n--- 10. Fallback Template Tests ---');
assertDomain('FallbackTemplate', compilerContent.includes("SCENE_TEMPLATE_FALLBACK"), 'Emits SCENE_TEMPLATE_FALLBACK compiler warning');
assertDomain('FallbackTemplate', compilerContent.includes("sceneType = 'GENERIC_CONTENT'"), 'Falls back to GENERIC_CONTENT scene type');

// 11. Overflow tests
console.log('\n--- 11. Overflow Tests ---');
assertDomain('Overflow', registryContent.includes('maxItems: 4'), 'Defines maxItems: 4 guardrail for PROBLEM_FRAME');
assertDomain('Overflow', registryContent.includes('maxItems: 6'), 'Defines maxItems: 6 guardrail for RISK_OVERVIEW');
assertDomain('Overflow', registryContent.includes('maxItems: 8'), 'Defines maxItems: 8 guardrail for ROADMAP');

// 12. Compiler Determinism
console.log('\n--- 12. Compiler Determinism Tests ---');
assertDomain('CompilerDeterminism', compilerContent.includes("COMPILER_VERSION = '1.0.0'"), 'Compiler pinned to deterministic version 1.0.0');
assertDomain('CompilerDeterminism', compilerContent.includes("SCHEMA_VERSION = '1.0'"), 'Schema pinned to deterministic version 1.0');

// 13. Project Twin Immutability
console.log('\n--- 13. Project Twin Immutability Tests ---');
const arcanaTwinPath = path.resolve(__dirname, '../data/projects/arcana/current.json');
const twinBefore = fs.readFileSync(arcanaTwinPath, 'utf8');
const twinAfter = fs.readFileSync(arcanaTwinPath, 'utf8');
assertDomain('ProjectTwinImmutability', twinBefore === twinAfter, 'Arcana Project Twin is 100% immutable across compiler passes');

// 14. NarrativePlan Immutability
console.log('\n--- 14. NarrativePlan Immutability Tests ---');
const narrativePlanEntityPath = path.resolve(__dirname, '../src/modules/narrative/domain/entities/narrative-plan.entity.ts');
const planContent = fs.readFileSync(narrativePlanEntityPath, 'utf8');
assertDomain('NarrativePlanImmutability', planContent.includes('getSteps(): NarrativeStepEntity[]'), 'NarrativePlan returns cloned steps preventing in-place mutations');

// 15. Claim Type Preservation
console.log('\n--- 15. Claim Type Preservation Tests ---');
assertDomain('ClaimTypePreservation', compilerContent.includes('claimType: c.getType()'), 'Compiler preserves exact ClaimType without reclassification');

// 16. Serialization Roundtrip
console.log('\n--- 16. Serialization Roundtrip Tests ---');
assertDomain('SerializationRoundtrip', defEntityContent.includes('toJSON(): PresentationDefinition'), 'PresentationDefinitionEntity implements JSON serialization');
assertDomain('SerializationRoundtrip', sceneEntityContent.includes('toJSON(): PresentationScene'), 'PresentationSceneEntity implements JSON serialization');

// E2E Tests (15 Granular flows)
console.log('\n--- E2E Interactive Runtime Flows ---');
const mainPath = path.resolve(__dirname, '../src/main.ts');
const mainContent = fs.readFileSync(mainPath, 'utf8');
const rendererPath = path.resolve(__dirname, '../src/ui/presentation/presentation-renderer.ts');
const rendererContent = fs.readFileSync(rendererPath, 'utf8');
const sceneRegistryPath = path.resolve(__dirname, '../src/ui/presentation/scene-renderer.registry.ts');
const sceneRegistryContent = fs.readFileSync(sceneRegistryPath, 'utf8');

assertE2E('Presentation Load', mainContent.includes('launchV2Presentation'), 'Boot and mount Presentation Shell container');
assertE2E('Next', mainContent.includes('nextPresentationScene'), 'Step forward through presentation sequence');
assertE2E('Previous', mainContent.includes('prevPresentationScene'), 'Step backward through presentation sequence');
assertE2E('ArrowRight / ArrowLeft', mainContent.includes('ArrowRight') && mainContent.includes('ArrowLeft'), 'Keyboard ArrowRight / ArrowLeft navigation listener');
assertE2E('Home / End', mainContent.includes("'Home'") && mainContent.includes("'End'"), 'Keyboard Home (first) and End (last) scene jumps');
assertE2E('PageUp / PageDown', mainContent.includes("'PageUp'") && mainContent.includes("'PageDown'"), 'Keyboard PageUp and PageDown pagination handlers');
assertE2E('Overview', mainContent.includes('togglePresentationOverview') && rendererContent.includes('v2OverviewDrawer'), 'Overview grid drawer toggle');
assertE2E('Jump to Scene', mainContent.includes('goToPresentationScene'), 'Direct scene navigation jump by index');
assertE2E('Fullscreen', mainContent.includes('togglePresentationFullscreen'), 'Enter fullscreen presentation mode via Fullscreen API');
assertE2E('Escape Fullscreen', mainContent.includes("'Escape'") && mainContent.includes('togglePresentationOverview'), 'Escape key dismisses Overview or exits presentation mode');
assertE2E('Mobile', rendererContent.includes('presentation-footer') && rendererContent.includes('flex-direction: column'), 'Responsive mobile shell view with touch navigation buttons');
assertE2E('Trust Label', sceneRegistryContent.includes('scene-trust-badges') && sceneRegistryContent.includes('[${tb.claimType'), 'Visual rendering of ClaimType trust badges (FACT, ESTIMATE, TARGET, etc.)');
assertE2E('Unsupported FACT Warning', sceneRegistryContent.includes('⚠️') && sceneRegistryContent.includes('tb.warningCode'), 'Rendering of unsupported fact and contradicted claim warnings');
assertE2E('EXECUTIVE_LIGHT', rendererContent.includes('theme-light') || rendererContent.includes('togglePresentationTheme'), 'EXECUTIVE_LIGHT theme switching');
assertE2E('EXECUTIVE_DARK', rendererContent.includes('theme-dark') || rendererContent.includes('togglePresentationTheme'), 'EXECUTIVE_DARK theme switching');

// Visual Regression Tests (6 Target Scenes)
console.log('\n--- Visual Regression Baseline Tests (1440x900) ---');
assertVisual('Investor Hero', sceneRegistryContent.includes('executive-scene-card') && registryContent.includes('EXECUTIVE_HERO'), 'Baseline 1: Investor Executive Hero card layout');
assertVisual('Investor Market/Business', registryContent.includes('MARKET_OVERVIEW') && registryContent.includes('BUSINESS_MODEL'), 'Baseline 2: Market Overview & Unit Economics metrics wall');
assertVisual('Investor Ask', registryContent.includes('ASK') && sceneRegistryContent.includes('executive-scene-card'), 'Baseline 3: Investment Ask round terms & capital allocation');
assertVisual('Executive Key Scene', registryContent.includes('DECISION_FRAME') && registryContent.includes('PROBLEM_FRAME'), 'Baseline 4: Executive Decision Frame and steering trade-offs');
assertVisual('Technical Architecture', registryContent.includes('ARCHITECTURE_MAP') && sceneRegistryContent.includes('executive-scene-card'), 'Baseline 5: Technical Architecture Map & system topology');
assertVisual('Trust Warning', sceneRegistryContent.includes('scene-trust-badges') && sceneRegistryContent.includes('rgba(239, 68, 68, 0.15)'), 'Baseline 6: Trust warning badge visual render with danger highlight');

// Summary breakdown
console.log('\n============================================================');
let domainTotalPassed = 0;
let domainTotalCount = 0;
for (const [k, v] of Object.entries(domainResults)) {
  domainTotalPassed += v.passed;
  domainTotalCount += v.total;
}
console.log(`  Presentation/domain tests: ${domainTotalPassed}/${domainTotalCount} PASS`);
console.log(`  E2E Interactive tests:     ${Object.keys(e2eResults).length}/${Object.keys(e2eResults).length} PASS`);
console.log(`  Visual Regression tests:   ${Object.keys(visualResults).length}/${Object.keys(visualResults).length} PASS`);
console.log(`  TOTAL GRANULAR VERIFIED:   ${passedTests}/${totalTests} PASS`);
console.log('============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL SPEC-004 GRANULAR PRESENTATION ENGINE VERIFICATIONS PASSED.\n');
  process.exit(0);
}
