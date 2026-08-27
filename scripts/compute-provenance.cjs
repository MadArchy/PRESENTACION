const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results.sort();
}

// 1. Exactly 82 build artifacts excluding artifact-manifest.json
const buildFiles = getFiles('dist').filter(f => !f.endsWith('artifact-manifest.json'));
console.log('DEPLOYED PAYLOAD FILE COUNT:', buildFiles.length);

let deployedBytes = 0;
const deployedStreamHash = crypto.createHash('sha256');

buildFiles.forEach(f => {
  const content = fs.readFileSync(f);
  deployedBytes += content.length;
  const posixPath = f.replace(/\\/g, '/').replace(/^dist\//, '');
  const fileSha = crypto.createHash('sha256').update(content).digest('hex');
  const record = posixPath + '\0' + content.length + '\0' + fileSha + '\n';
  deployedStreamHash.update(record, 'utf8');
});

const deployedTreeSha256 = deployedStreamHash.digest('hex');
console.log('DEPLOYED PAYLOAD BYTES:', deployedBytes);
console.log('DEPLOYED PAYLOAD TREE SHA-256:', deployedTreeSha256);

// 2. Post-deploy manifest verification against deployed payload
const manifestContent = JSON.parse(fs.readFileSync('dist/artifact-manifest.json', 'utf8'));
console.log('MANIFEST ENTRIES:', manifestContent.length);

let missing = 0;
let extra = 0;
let hashMismatches = 0;
let sizeMismatches = 0;
const pathSet = new Set();
let duplicatePaths = 0;

const deployedMap = new Map();
buildFiles.forEach(f => {
  const content = fs.readFileSync(f);
  const posixPath = f.replace(/\\/g, '/').replace(/^dist\//, '');
  const fileSha = crypto.createHash('sha256').update(content).digest('hex');
  deployedMap.set(posixPath, { size: content.length, sha256: fileSha });
});

manifestContent.forEach(entry => {
  if (pathSet.has(entry.relativePath)) {
    duplicatePaths++;
  }
  pathSet.add(entry.relativePath);

  const deployed = deployedMap.get(entry.relativePath);
  if (!deployed) {
    extra++;
  } else {
    if (deployed.size !== entry.byteSize) sizeMismatches++;
    if (deployed.sha256 !== entry.sha256) hashMismatches++;
  }
});

deployedMap.forEach((val, key) => {
  if (!pathSet.has(key)) missing++;
});

console.log('Missing:', missing);
console.log('Extra:', extra);
console.log('Hash mismatches:', hashMismatches);
console.log('Size mismatches:', sizeMismatches);
console.log('Duplicate paths:', duplicatePaths);

// 3. Post-deploy manifest info
const manifestBuf = fs.readFileSync('dist/artifact-manifest.json');
console.log('MANIFEST BYTES:', manifestBuf.length);
console.log('MANIFEST SHA-256:', crypto.createHash('sha256').update(manifestBuf).digest('hex'));

// 4. Current 83-file distribution package
const allDistFiles = getFiles('dist');
console.log('CURRENT DIST FILE COUNT:', allDistFiles.length);

let totalDistBytes = 0;
const currentDistStreamHash = crypto.createHash('sha256');

allDistFiles.forEach(f => {
  const content = fs.readFileSync(f);
  totalDistBytes += content.length;
  const posixPath = f.replace(/\\/g, '/').replace(/^dist\//, '');
  const fileSha = crypto.createHash('sha256').update(content).digest('hex');
  const record = posixPath + '\0' + content.length + '\0' + fileSha + '\n';
  currentDistStreamHash.update(record, 'utf8');
});

console.log('CURRENT DIST BYTES:', totalDistBytes);
console.log('CURRENT DIST TREE SHA-256:', currentDistStreamHash.digest('hex'));
