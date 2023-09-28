

const fs = require('fs');
const path = require('path');

function generateFolderStructure(rootDir, indent = '') {
    const files = fs.readdirSync(rootDir);

    let structure = '';
    for (const file of files) {
        list = ['.babelrc', '.env', '.git', 'node_modules','logs'];
        if (list.includes(file)) {
            continue;
        }
        // if (file === 'node_modules') {
        // Skip the "node_modules" directory
        // }

        const filePath = path.join(rootDir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // If it's a directory, recursively generate its structure
            structure += `${indent}┣ 📂${file}\n`;
            structure += generateFolderStructure(filePath, `${indent} ┃ `);
        } else {
            // If it's a file, add it to the structure
            structure += `${indent}┣ 📜${file}\n`;
        }
    }

    return structure;
}

// Define the root directory of your project
const projectRoot = path.join(__dirname);

// Generate the folder structure
const folderStructure = generateFolderStructure(projectRoot);

// Output the folder structure to the console or save it to a file
console.log(folderStructure);

