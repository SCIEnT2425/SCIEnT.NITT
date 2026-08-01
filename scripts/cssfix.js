const fs = require('fs');

// Read the minified CSS file
const cssFile = './build/static/css/main.3d1903de.css';
const content = fs.readFileSync(cssFile, 'utf8');

// Replace unescaped forward slashes with escaped ones
const fixedContent = content.replace(/([^:/])\/([^/])/g, '$1\\/$2');

// Write back the fixed content
fs.writeFileSync(cssFile, fixedContent);

console.log('CSS file fixed!');