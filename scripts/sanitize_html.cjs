const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace all unescaped < not followed by a tag name or / or ! or ?
const sanitized = html.replace(/<(?![a-zA-Z\/!?])/g, '&lt;');

fs.writeFileSync(htmlPath, sanitized, 'utf8');
console.log('Sanitized all invalid < characters across index.html');
