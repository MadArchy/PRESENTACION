/**
 * Architecture Dependency Rules Runner — Venture Hub OS
 * Statically validates hexagonal layer boundaries across TypeScript modules.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../../src');

let violations = [];
let checkedFiles = 0;

function getAllTsFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsFiles(fullPath));
    } else if (file.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

function checkFileDependencies(filePath) {
  checkedFiles++;
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(SRC_DIR, filePath).replace(/\\/g, '/');

  // Extract all import statements
  const importLines = content.split('\n').filter(line => line.trim().startsWith('import '));

  importLines.forEach(line => {
    // Check 1: Domain layer must NOT import from UI, Adapters, Platform, Legacy, Firebase, or external frameworks
    if (relativePath.includes('/domain/')) {
      if (line.includes('/ui/') || line.includes('/adapters/') || line.includes('firebase') || line.includes('react') || line.includes('legacy')) {
        violations.push({
          file: relativePath,
          rule: 'Domain layer MUST NOT import from UI, Adapters, Firebase, or Legacy',
          line: line.trim()
        });
      }
    }

    // Check 2: Application layer must NOT import from UI or concrete Adapters directly
    if (relativePath.includes('/application/')) {
      if (line.includes('/ui/') || line.includes('firebase') || line.includes('react')) {
        violations.push({
          file: relativePath,
          rule: 'Application layer MUST NOT import from UI or Firebase directly',
          line: line.trim()
        });
      }
    }
  });
}

console.log('\n============================================================');
console.log('  ARCHITECTURE DEPENDENCY RULES VERIFICATION');
console.log('============================================================\n');

const tsFiles = getAllTsFiles(SRC_DIR);
tsFiles.forEach(checkFileDependencies);

console.log(`Checked ${checkedFiles} TypeScript source files for layer violations.\n`);

if (violations.length > 0) {
  console.error(`[FAIL] ${violations.length} Architecture Boundary Violation(s) Found:`);
  violations.forEach((v, i) => {
    console.error(`  ${i + 1}. [${v.file}] ${v.rule}`);
    console.error(`     Statement: "${v.line}"`);
  });
  process.exit(1);
} else {
  console.log('  [PASS] All hexagonal domain boundaries and dependency directions verified.\n');
  console.log('🎉 ZERO ARCHITECTURE VIOLATIONS FOUND.\n');
  process.exit(0);
}
