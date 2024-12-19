const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const prebuildsDir = path.join(__dirname, 'prebuilds');
const executeLast = 'rss-xml-generator.js';

let files = fs.readdirSync(prebuildsDir);
let lastFileIndex = files.indexOf(executeLast);

// Remove the file to be executed last from the array.
if (lastFileIndex !== -1) {
	files.splice(lastFileIndex, 1);
}

// Execute scripts.
files.forEach((file) => {
	if (path.extname(file) === '.js') {
		execSync(`node ${path.join(prebuildsDir, file)}`, { stdio: 'inherit' });
	}
});

// Execute the executeLast script file last.
if (lastFileIndex !== -1) {
	execSync(`node ${path.join(prebuildsDir, executeLast)}`, { stdio: 'inherit' });
}
