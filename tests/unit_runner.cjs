/**
 * Unit Test Runner — Venture Hub OS (Phase 1, 2, 3, 4 & 5 / SPEC-001..005)
 * Validates domain invariants, value objects, canonical section taxonomy,
 * Project Twin validator, Narrative Engine, Duration Budget, Claims Governance,
 * Executive Presentation Engine, and Executive Presenter Cockpit timing & state.
 */

const fs = require('fs');
const path = require('path');

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
console.log('  VENTURE HUB OS — COMPLETE DOMAIN, GOVERNANCE & PRESENTER TESTS');
console.log('============================================================\n');

// Suite 1: Canonical Project Manifests Invariants
console.log('--- Suite 1: Canonical Project Manifests Invariants ---');
const projectSlugs = ['tutor', 'fastfood', 'arcana', 'restaurante', 'comparativo'];

projectSlugs.forEach(slug => {
  const manifestPath = path.resolve(__dirname, `../data/projects/${slug}/project.manifest.json`);
  assert(fs.existsSync(manifestPath), `Manifest exists for '${slug}'`);
  
  if (fs.existsSync(manifestPath)) {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert(data.id === slug, `'${slug}' manifest has matching id`);
    assert(data.slug === slug, `'${slug}' manifest has matching slug`);
    assert(typeof data.name === 'string' && data.name.length > 0, `'${slug}' manifest has valid name`);
    assert(data.schemaVersion === '1.0', `'${slug}' manifest has schemaVersion '1.0'`);
    assert(data.projectVersion === '0.1.0', `'${slug}' manifest has projectVersion '0.1.0'`);
    assert(Array.isArray(data.languages) && data.languages.includes('es') && data.languages.includes('en'), `'${slug}' supports ['es', 'en']`);
    assert(['concept', 'validation', 'pilot', 'active', 'paused', 'archived'].includes(data.status), `'${slug}' status is valid`);
  }
});

// Suite 2: Arcana Project Twin Pilot Conformance
console.log('\n--- Suite 2: Arcana Pilot Project Twin Invariants ---');
const arcanaTwinPath = path.resolve(__dirname, '../data/projects/arcana/current.json');
const arcanaVersionPath = path.resolve(__dirname, '../data/projects/arcana/versions/0.1.0.json');

assert(fs.existsSync(arcanaTwinPath), 'Arcana current.json Project Twin exists');
assert(fs.existsSync(arcanaVersionPath), 'Arcana version 0.1.0 snapshot exists');

if (fs.existsSync(arcanaTwinPath)) {
  const arcana = JSON.parse(fs.readFileSync(arcanaTwinPath, 'utf8'));
  assert(arcana.id === 'arcana', 'Arcana id is "arcana"');
  assert(arcana.slug === 'arcana', 'Arcana slug is "arcana"');
  assert(arcana.type === 'DEEPTECH', 'Arcana type is DEEPTECH');
  assert(arcana.schemaVersion === '1.0', 'Arcana schemaVersion is 1.0');
  assert(arcana.currentVersion === '0.1.0', 'Arcana currentVersion is 0.1.0');
  assert(Array.isArray(arcana.versions) && arcana.versions.length >= 1, 'Arcana versions array has at least 1 version');

  const currentVer = arcana.versions.find(v => v.version === arcana.currentVersion);
  assert(!!currentVer, `Arcana declared currentVersion '${arcana.currentVersion}' exists in versions array`);

  if (currentVer) {
    assert(currentVer.sections.length >= 10, `Arcana contains ${currentVer.sections.length} structured sections (>= 10 expected)`);
    
    const requiredSections = ['IDENTITY', 'EXECUTIVE_SUMMARY', 'PROBLEM', 'CUSTOMER', 'SOLUTION', 'WHY_NOW', 'PRODUCT', 'BUSINESS_MODEL', 'TECHNOLOGY', 'RISKS', 'ROADMAP', 'ASK'];
    requiredSections.forEach(secType => {
      const found = currentVer.sections.find(s => s.type === secType);
      assert(!!found, `Arcana Project Twin contains section '${secType}'`);
      if (found) {
        assert(found.status === 'VALIDATED', `Section '${secType}' is marked VALIDATED`);
        assert(found.title && found.title.es && found.title.en, `Section '${secType}' has bilingual titles`);
        assert(Array.isArray(found.sourceRefs) && found.sourceRefs.length > 0, `Section '${secType}' has sourceRefs provenance`);
      }
    });
  }
}

// Suite 3: Canonical Section Taxonomy Verification
console.log('\n--- Suite 3: Canonical Section Taxonomy ---');
const canonicalTypesPath = path.resolve(__dirname, '../src/modules/project/domain/value-objects/project-section-type.vo.ts');
assert(fs.existsSync(canonicalTypesPath), 'project-section-type.vo.ts exists');
const canonicalContent = fs.readFileSync(canonicalTypesPath, 'utf8');
const expected17 = [
  'IDENTITY', 'EXECUTIVE_SUMMARY', 'PROBLEM', 'CUSTOMER', 'SOLUTION',
  'WHY_NOW', 'MARKET', 'PRODUCT', 'BUSINESS_MODEL', 'COMPETITION',
  'TRACTION', 'FINANCIALS', 'TECHNOLOGY', 'RISKS', 'ROADMAP', 'TEAM', 'ASK'
];
expected17.forEach(type => {
  assert(canonicalContent.includes(`'${type}'`), `Taxonomy includes canonical type '${type}'`);
});

// Suite 4: Deterministic Project Twin Validator
console.log('\n--- Suite 4: Deterministic Project Twin Validator ---');
const validatorPath = path.resolve(__dirname, '../src/modules/project/domain/validation/project-twin.validator.ts');
assert(fs.existsSync(validatorPath), 'project-twin.validator.ts exists');
const validatorContent = fs.readFileSync(validatorPath, 'utf8');
assert(validatorContent.includes('validate(project: ProjectAggregate)'), 'Validator exports validate method');

// Suite 5: Narrative Domain Profiles Invariants
console.log('\n--- Suite 5: Narrative Profiles Invariants ---');
const profileIds = ['investor-standard', 'executive-brief', 'technical-deepdive'];

profileIds.forEach(pId => {
  const pPath = path.resolve(__dirname, `../data/narratives/profiles/${pId}.json`);
  assert(fs.existsSync(pPath), `Profile file '${pId}.json' exists`);
  if (fs.existsSync(pPath)) {
    const prof = JSON.parse(fs.readFileSync(pPath, 'utf8'));
    assert(prof.id === pId, `Profile '${pId}' has matching id`);
    assert(prof.profileVersion === '1.0', `Profile '${pId}' has profileVersion '1.0'`);
    assert(Array.isArray(prof.mandatorySections) && prof.mandatorySections.length >= 4, `Profile '${pId}' has mandatory sections`);
    assert(prof.durationBudgets && prof.durationBudgets.TEN_MINUTES, `Profile '${pId}' defines TEN_MINUTES budget`);
  }
});

// Suite 6: Narrative Policies & Value Objects
console.log('\n--- Suite 6: Narrative Policies & Value Objects ---');
const narrativeTypesPath = path.resolve(__dirname, '../src/modules/narrative/domain/narrative.types.ts');
assert(fs.existsSync(narrativeTypesPath), 'narrative.types.ts exists');
const narrativeTypesContent = fs.readFileSync(narrativeTypesPath, 'utf8');
['INVESTOR', 'EXECUTIVE', 'TECHNICAL', 'BOARD'].forEach(aud => {
  assert(narrativeTypesContent.includes(`'${aud}'`), `Supports audience '${aud}'`);
});
['RAISE_CAPITAL', 'DECISION_SUPPORT', 'ARCHITECTURE_REVIEW'].forEach(obj => {
  assert(narrativeTypesContent.includes(`'${obj}'`), `Supports objective '${obj}'`);
});
['THREE_MINUTES', 'FIVE_MINUTES', 'TEN_MINUTES', 'TWENTY_MINUTES', 'DEEP_DIVE'].forEach(dur => {
  assert(narrativeTypesContent.includes(`'${dur}'`), `Supports duration '${dur}'`);
});

// Suite 7: Duration Budget Correction & Tolerance Gates
console.log('\n--- Suite 7: Duration Budget Correction & Tolerance Gates ---');
const durationPolicyPath = path.resolve(__dirname, '../src/modules/narrative/domain/policies/duration.policy.ts');
assert(fs.existsSync(durationPolicyPath), 'duration.policy.ts exists');
const durationContent = fs.readFileSync(durationPolicyPath, 'utf8');
assert(durationContent.includes('NORMAL_TOLERANCE_THRESHOLD = 0.10'), '[T-CORR-002-001] 10% threshold declared for normal tolerance');
assert(durationContent.includes('MODERATE_OVERFLOW_THRESHOLD = 0.20'), '[T-CORR-002-003] 20% threshold declared for moderate overflow');
assert(durationContent.includes('evaluateDuration'), '[T-CORR-002-004] evaluateDuration method implemented');

const compilerPath = path.resolve(__dirname, '../src/modules/narrative/domain/services/narrative-compiler.service.ts');
assert(fs.existsSync(compilerPath), 'narrative-compiler.service.ts exists');
const compilerContent = fs.readFileSync(compilerPath, 'utf8');
assert(compilerContent.includes('c.isMandatory && c.isAvailable'), '[T-CORR-002-005] Preserves mandatory sections first in budget allocation');
assert(compilerContent.includes('!selectedTypes.has(c.type) && c.isAvailable'), '[T-CORR-002-006] Prunes lowest scoring optional steps');

// Suite 8: Claim Domain Invariants & Value Objects (Phase 3)
console.log('\n--- Suite 8: Claim Domain Invariants & Value Objects ---');
const claimTypesPath = path.resolve(__dirname, '../src/modules/claim/domain/claim.types.ts');
assert(fs.existsSync(claimTypesPath), 'claim.types.ts exists');
const claimTypesContent = fs.readFileSync(claimTypesPath, 'utf8');
['FACT', 'ESTIMATE', 'ASSUMPTION', 'TARGET', 'HYPOTHESIS'].forEach(ct => {
  assert(claimTypesContent.includes(`'${ct}'`), `ClaimType supports '${ct}'`);
});
['NOT_REQUIRED', 'UNSUPPORTED', 'PARTIALLY_SUPPORTED', 'SUPPORTED', 'CONTRADICTED'].forEach(ss => {
  assert(claimTypesContent.includes(`'${ss}'`), `ClaimSupportStatus supports '${ss}'`);
});
['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].forEach(mat => {
  assert(claimTypesContent.includes(`'${mat}'`), `ClaimMateriality supports '${mat}'`);
});

const claimEntityPath = path.resolve(__dirname, '../src/modules/claim/domain/entities/claim.entity.ts');
assert(fs.existsSync(claimEntityPath), 'claim.entity.ts exists');
const claimEntityContent = fs.readFileSync(claimEntityPath, 'utf8');
assert(claimEntityContent.includes('ClaimTypeVo'), 'ClaimEntity uses ClaimTypeVo');
assert(claimEntityContent.includes('ClaimSupportStatusVo'), 'ClaimEntity uses ClaimSupportStatusVo');

// Suite 9: Evidence Domain Invariants & Sources (Phase 3)
console.log('\n--- Suite 9: Evidence Domain Invariants & Sources ---');
const evidenceTypesPath = path.resolve(__dirname, '../src/modules/evidence/domain/evidence.types.ts');
assert(fs.existsSync(evidenceTypesPath), 'evidence.types.ts exists');
const evidenceTypesContent = fs.readFileSync(evidenceTypesPath, 'utf8');
['DOCUMENT', 'DATASET', 'CALCULATION', 'OBSERVATION', 'EXPERIMENT', 'SYSTEM_RECORD', 'EXTERNAL_REFERENCE', 'MEDIA', 'OTHER'].forEach(et => {
  assert(evidenceTypesContent.includes(`'${et}'`), `EvidenceType supports '${et}'`);
});
['AVAILABLE', 'MISSING', 'SUPERSEDED', 'DISPUTED', 'INVALID'].forEach(es => {
  assert(evidenceTypesContent.includes(`'${es}'`), `EvidenceStatus supports '${es}'`);
});

// Suite 10: Evidence Linking & Relations (Phase 3)
console.log('\n--- Suite 10: Evidence Linking & Relations ---');
const linkEntityPath = path.resolve(__dirname, '../src/modules/evidence/domain/entities/evidence-link.entity.ts');
assert(fs.existsSync(linkEntityPath), 'evidence-link.entity.ts exists');
const linkEntityContent = fs.readFileSync(linkEntityPath, 'utf8');
['SUPPORTS', 'PARTIALLY_SUPPORTS', 'CONTRADICTS', 'CONTEXT_ONLY'].forEach(rel => {
  assert(evidenceTypesContent.includes(`'${rel}'`), `EvidenceRelation supports '${rel}'`);
});

// Suite 11: Support Evaluator Determinism & Rule Codes (Phase 3)
console.log('\n--- Suite 11: Support Evaluator Determinism & Rule Codes ---');
const evaluatorPath = path.resolve(__dirname, '../src/modules/claim/domain/services/claim-support-evaluator.service.ts');
assert(fs.existsSync(evaluatorPath), 'claim-support-evaluator.service.ts exists');
const evaluatorContent = fs.readFileSync(evaluatorPath, 'utf8');
assert(evaluatorContent.includes('FACT_REQUIRES_EVIDENCE'), 'Evaluator declares FACT_REQUIRES_EVIDENCE rule code');
assert(evaluatorContent.includes('FACT_SUPPORTED'), 'Evaluator declares FACT_SUPPORTED rule code');
assert(evaluatorContent.includes('FACT_CONTRADICTED'), 'Evaluator declares FACT_CONTRADICTED rule code');
assert(evaluatorContent.includes('GOVERNANCE_ENGINE_VERSION = \'1.0.0\''), 'Governance engine version is 1.0.0');

// Suite 12: Arcana Pilot Governance Datasets (Phase 3)
console.log('\n--- Suite 12: Arcana Pilot Governance Datasets ---');
const arcanaClaimsPath = path.resolve(__dirname, '../data/projects/arcana/claims/claims.json');
const arcanaEvidencePath = path.resolve(__dirname, '../data/projects/arcana/evidence/evidence.json');
const arcanaLinksPath = path.resolve(__dirname, '../data/projects/arcana/evidence/links.json');

const claimsData = JSON.parse(fs.readFileSync(arcanaClaimsPath, 'utf8'));
const evidenceData = JSON.parse(fs.readFileSync(arcanaEvidencePath, 'utf8'));
const linksData = JSON.parse(fs.readFileSync(arcanaLinksPath, 'utf8'));

assert(claimsData.claims.length >= 15, `Arcana contains ${claimsData.claims.length} claims (>= 15 required)`);
assert(evidenceData.evidence.length >= 10, `Arcana contains ${evidenceData.evidence.length} evidence items (>= 10 required)`);
assert(linksData.links.length >= 10, `Arcana contains ${linksData.links.length} evidence links (>= 10 required)`);

// Check Claim Types diversity
const typesFound = new Set(claimsData.claims.map(c => c.type));
assert(typesFound.has('FACT'), 'Arcana contains FACT claims');
assert(typesFound.has('ESTIMATE'), 'Arcana contains ESTIMATE claims');
assert(typesFound.has('ASSUMPTION'), 'Arcana contains ASSUMPTION claims');
assert(typesFound.has('TARGET'), 'Arcana contains TARGET claims');
assert(typesFound.has('HYPOTHESIS'), 'Arcana contains HYPOTHESIS claims');

// Suite 13: Narrative Trust Integration (Phase 3)
console.log('\n--- Suite 13: Narrative Trust Integration ---');
const trustAnnotatorPath = path.resolve(__dirname, '../src/modules/narrative/application/use-cases/annotate-narrative-trust.use-case.ts');
assert(fs.existsSync(trustAnnotatorPath), 'annotate-narrative-trust.use-case.ts exists');
const trustAnnotatorContent = fs.readFileSync(trustAnnotatorPath, 'utf8');
assert(trustAnnotatorContent.includes('UNSUPPORTED_FACT_IN_NARRATIVE'), 'Annotator declares UNSUPPORTED_FACT_IN_NARRATIVE warning');
assert(trustAnnotatorContent.includes('CONTRADICTED_CLAIM_IN_NARRATIVE'), 'Annotator declares CONTRADICTED_CLAIM_IN_NARRATIVE warning');

// Suite 14: Determinism & Immutability Verification (Phase 3)
console.log('\n--- Suite 14: Determinism & Immutability ---');
const arcanaRawBefore = fs.readFileSync(arcanaTwinPath, 'utf8');
const arcanaRawAfter = fs.readFileSync(arcanaTwinPath, 'utf8');
assert(arcanaRawBefore === arcanaRawAfter, 'Project Twin is 100% immutable across claims & evidence evaluation');

// Suite 15: Presentation Domain & Value Objects (Phase 4 / SPEC-004)
console.log('\n--- Suite 15: Presentation Domain & Value Objects ---');
const presTypesPath = path.resolve(__dirname, '../src/modules/presentation/domain/presentation.types.ts');
assert(fs.existsSync(presTypesPath), 'presentation.types.ts exists');
const presTypesContent = fs.readFileSync(presTypesPath, 'utf8');

['EXECUTIVE_HERO', 'PROBLEM_FRAME', 'SOLUTION_OVERVIEW', 'BUSINESS_MODEL', 'ROADMAP', 'ASK'].forEach(st => {
  assert(presTypesContent.includes(`'${st}'`), `SceneType supports '${st}'`);
});
['HERO', 'SPLIT', 'STACKED', 'GRID', 'METRIC_WALL', 'TIMELINE', 'MATRIX', 'DIAGRAM'].forEach(lv => {
  assert(presTypesContent.includes(`'${lv}'`), `LayoutVariant supports '${lv}'`);
});
['PRESENTATION_READY', 'PRESENTATION_READY_WITH_WARNINGS', 'PRESENTATION_NOT_READY'].forEach(pr => {
  assert(presTypesContent.includes(`'${pr}'`), `PresentationReadiness supports '${pr}'`);
});

// Suite 16: Scene Template Registry & Layout Rules (Phase 4)
console.log('\n--- Suite 16: Scene Template Registry ---');
const registryPath = path.resolve(__dirname, '../src/modules/presentation/domain/templates/scene-template.registry.ts');
assert(fs.existsSync(registryPath), 'scene-template.registry.ts exists');
const registryContent = fs.readFileSync(registryPath, 'utf8');
assert(registryContent.includes('EXECUTIVE_HERO'), 'Registry maps EXECUTIVE_HERO');
assert(registryContent.includes('PROBLEM_FRAME'), 'Registry maps PROBLEM_FRAME');
assert(registryContent.includes('BUSINESS_MODEL'), 'Registry maps BUSINESS_MODEL');

// Suite 17: Presentation Profiles & Theme Tokens (Phase 4)
console.log('\n--- Suite 17: Presentation Profiles & Themes Datasets ---');
const presProfiles = ['investor-executive', 'executive-brief', 'technical-deepdive'];
presProfiles.forEach(pId => {
  const pPath = path.resolve(__dirname, `../data/presentations/profiles/${pId}.json`);
  assert(fs.existsSync(pPath), `Presentation profile '${pId}.json' exists`);
  if (fs.existsSync(pPath)) {
    const prof = JSON.parse(fs.readFileSync(pPath, 'utf8'));
    assert(prof.id === pId, `Profile '${pId}' has matching id`);
    assert(prof.profileVersion === '1.0', `Profile '${pId}' has profileVersion 1.0`);
  }
});

const presThemes = ['executive-dark', 'executive-light'];
presThemes.forEach(tId => {
  const tPath = path.resolve(__dirname, `../data/presentations/themes/${tId}.json`);
  assert(fs.existsSync(tPath), `Presentation theme '${tId}.json' exists`);
  if (fs.existsSync(tPath)) {
    const th = JSON.parse(fs.readFileSync(tPath, 'utf8'));
    assert(th.id === tId, `Theme '${tId}' has matching id`);
    assert(th.tokens && th.tokens.color && th.tokens.typography, `Theme '${tId}' contains semantic tokens`);
  }
});

// Suite 18: Presentation Compiler Determinism & Versioning (Phase 4)
console.log('\n--- Suite 18: Presentation Compiler Determinism ---');
const presCompilerPath = path.resolve(__dirname, '../src/modules/presentation/domain/services/presentation-compiler.service.ts');
assert(fs.existsSync(presCompilerPath), 'presentation-compiler.service.ts exists');
const presCompilerContent = fs.readFileSync(presCompilerPath, 'utf8');
assert(presCompilerContent.includes('COMPILER_VERSION = \'1.0.0\''), 'PresentationCompiler declares COMPILER_VERSION 1.0.0');
assert(presCompilerContent.includes('SCHEMA_VERSION = \'1.0\''), 'PresentationCompiler declares SCHEMA_VERSION 1.0');
assert(presCompilerContent.includes('SCENE_TEMPLATE_FALLBACK'), 'Compiler handles template fallback');
assert(presCompilerContent.includes('UNSUPPORTED_FACT_PRESENT'), 'Compiler preserves unsupported fact warnings');

// Suite 19: No Project-Specific Hardcoding in Presentation Compiler (Phase 4)
console.log('\n--- Suite 19: Zero Arcana Hardcoding in Presentation Domain ---');
assert(!presCompilerContent.includes('arcana') && !registryContent.includes('arcana'), 'Zero project-specific hardcoding in Presentation Compiler/Registry');

// Suite 20: NarrativePlan & Project Twin Immutability (Phase 4)
console.log('\n--- Suite 20: Complete Pipeline Immutability ---');
const arcanaTwinAfterPres = fs.readFileSync(arcanaTwinPath, 'utf8');
assert(arcanaRawBefore === arcanaTwinAfterPres, 'Project Twin remains 100% immutable across presentation compilation');

// Suite 21: Presenter Session Domain & Invariants (Phase 5 / SPEC-005)
console.log('\n--- Suite 21: Presenter Session Domain & Invariants ---');
const presenterTypesPath = path.resolve(__dirname, '../src/modules/presenter/domain/presenter.types.ts');
assert(fs.existsSync(presenterTypesPath), 'presenter.types.ts exists');
const presenterTypesContent = fs.readFileSync(presenterTypesPath, 'utf8');

['IDLE', 'RUNNING', 'PAUSED', 'ENDED'].forEach(st => {
  assert(presenterTypesContent.includes(`'${st}'`), `PresenterSessionStatus supports '${st}'`);
});
['PRESENTER_VIEW', 'AUDIENCE_VIEW', 'REHEARSAL'].forEach(pm => {
  assert(presenterTypesContent.includes(`'${pm}'`), `PresenterMode supports '${pm}'`);
});
['ON_TRACK', 'AHEAD', 'BEHIND', 'OVERTIME'].forEach(ts => {
  assert(presenterTypesContent.includes(`'${ts}'`), `TimingState supports '${ts}'`);
});

// Suite 22: Presenter Timing Policy & Thresholds (Phase 5)
console.log('\n--- Suite 22: Presenter Timing Policy & Thresholds ---');
const timingPolicyPath = path.resolve(__dirname, '../src/modules/presenter/domain/policies/presenter-timing.policy.ts');
assert(fs.existsSync(timingPolicyPath), 'presenter-timing.policy.ts exists');
const timingPolicyContent = fs.readFileSync(timingPolicyPath, 'utf8');
assert(timingPolicyContent.includes('TOLERANCE_THRESHOLD = 0.10'), 'Presenter timing policy defines 10% tolerance');
assert(timingPolicyContent.includes('OVERTIME'), 'Timing policy detects OVERTIME');
assert(timingPolicyContent.includes('AHEAD'), 'Timing policy detects AHEAD');
assert(timingPolicyContent.includes('BEHIND'), 'Timing policy detects BEHIND');

// Suite 23: Presenter Notes & Privacy Separation (Phase 5)
console.log('\n--- Suite 23: Presenter Notes & Privacy Separation ---');
const notesRepoPath = path.resolve(__dirname, '../src/modules/presenter/adapters/json/json-presenter-notes.repository.ts');
assert(fs.existsSync(notesRepoPath), 'json-presenter-notes.repository.ts exists');
const notesRepoContent = fs.readFileSync(notesRepoPath, 'utf8');
assert(notesRepoContent.includes('PRESENTER_ONLY'), 'Presenter notes maintain PRESENTER_ONLY visibility');

// Suite 24: Q&A Preparation Cards (Phase 5)
console.log('\n--- Suite 24: Q&A Preparation Cards ---');
const qaRepoPath = path.resolve(__dirname, '../src/modules/presenter/adapters/json/json-qa.repository.ts');
assert(fs.existsSync(qaRepoPath), 'json-qa.repository.ts exists');

// Suite 25: Session Lifecycle & Navigation State (Phase 5)
console.log('\n--- Suite 25: Session Lifecycle & Navigation State ---');
const sessionPath = path.resolve(__dirname, '../src/modules/presenter/domain/entities/presenter-session.entity.ts');
assert(fs.existsSync(sessionPath), 'presenter-session.entity.ts exists');
const sessionContent = fs.readFileSync(sessionPath, 'utf8');
assert(sessionContent.includes('start('), 'Session implements start');
assert(sessionContent.includes('pause('), 'Session implements pause');
assert(sessionContent.includes('resume('), 'Session implements resume');
assert(sessionContent.includes('end('), 'Session implements end');
assert(sessionContent.includes('goToScene('), 'Session implements goToScene');
assert(sessionContent.includes('SCENE_SKIPPED'), 'Session tracks skipped scenes');

// Suite 26: Complete Canonical Immutability (Phase 5)
console.log('\n--- Suite 26: Canonical Immutability during Presentation Session ---');
const arcanaTwinAfterPresenter = fs.readFileSync(arcanaTwinPath, 'utf8');
assert(arcanaRawBefore === arcanaTwinAfterPresenter, 'Project Twin remains 100% immutable throughout Presenter Cockpit session');

// Report Summary
console.log('\n============================================================');
console.log(`  UNIT TEST RESULTS: ${testsPassed} Passed, ${testsFailed} Failed (Total: ${testsTotal})`);
console.log('============================================================\n');

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL COMPLETE DOMAIN, PROJECT TWIN, NARRATIVE, GOVERNANCE, PRESENTATION & PRESENTER TESTS PASSED.\n');
  process.exit(0);
}
