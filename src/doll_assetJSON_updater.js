const fs = require('fs');
const path = require('path');

// The main directory containing the doll folders
const dollsDirectory = './assets/dolls';

// List of subfolders to check
const subfolders = ['break', 'default', 'gif', 'v1', 'v2'];

// Function to check if a folder exists
function folderExists(folderPath) {
    return fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory();
}

// Function to process the gif folder and create a gif-specific info.json
function processGifFolder(gifFolderPath) {
    // Read all files in the gif folder 
    const files = fs.readdirSync(gifFolderPath);
    
    // Filter for .gif files
    const gifFiles = files.filter(file => path.extname(file).toLowerCase() === '.gif');

    // Create an object with the gif file names
    const gifInfo = {
        content: gifFiles
    };

    // Write the gif-specific info.json file
    const gifInfoPath = path.join(gifFolderPath, 'info.json');
    fs.writeFileSync(gifInfoPath, JSON.stringify(gifInfo, null, 4));
    console.log(`Created gif info.json in ${gifFolderPath}`);
}

// Function to process each doll directory
function processDollDirectory(dollPath) {
    // Create an object to store the presence of subfolders
    const info = {};

    // Check for each subfolder
    subfolders.forEach(folder => {
        const folderPath = path.join(dollPath, folder);
        info[folder] = folderExists(folderPath);

        // If the gif folder exists, process it
        if (folder === 'gif' && info[folder]) {
            processGifFolder(folderPath);
        }
    });

    // Write the main info.json file inside the doll directory
    const infoPath = path.join(dollPath, 'info.json');
    fs.writeFileSync(infoPath, JSON.stringify(info, null, 4));
    console.log(`Created info.json for ${path.basename(dollPath)}`);
}

// Function to iterate over all doll directories
function processAllDolls() {
    // Get all folders inside the main dolls directory
    const dollFolders = fs.readdirSync(dollsDirectory);

    dollFolders.forEach(dollFolder => {
        const dollPath = path.join(dollsDirectory, dollFolder);

        // Ensure it's a directory before processing
        if (fs.lstatSync(dollPath).isDirectory()) {
            processDollDirectory(dollPath);
        }
    });
}

// Start processing
processAllDolls();