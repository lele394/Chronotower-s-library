const fs = require('fs');
const path = require('path');

// The main directory containing the doll folders
const dollsDirectory = './assets/dolls';

// List of subfolders to check
const subfolders = ['break', 'default', 'gif', 'v1', 'v2', 'l2d'];

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

// Function to process the l2d folder and create the required JSON file
function processL2DFolder(l2dFolderPath) {
    const l2dInfo = {};

    // Read all subfolders inside the l2d folder
    const subFolders = fs.readdirSync(l2dFolderPath).filter(subFolder => {
        const subFolderPath = path.join(l2dFolderPath, subFolder);
        return fs.lstatSync(subFolderPath).isDirectory();
    });

    // Iterate over each subfolder
    subFolders.forEach(subFolder => {
        const subFolderPath = path.join(l2dFolderPath, subFolder);

        // Find the first JSON file inside the subfolder
        const jsonFiles = fs.readdirSync(subFolderPath).filter(file => path.extname(file).toLowerCase() === '.json');

        if (jsonFiles.length > 0) {
            // Add the subfolder and the first JSON file found to the l2dInfo object
            l2dInfo[subFolder] = path.join(subFolder, jsonFiles[0]);
        }
    });

    // Write the l2d-specific info.json file
    const l2dInfoPath = path.join(l2dFolderPath, 'info.json');
    fs.writeFileSync(l2dInfoPath, JSON.stringify(l2dInfo, null, 4));
    console.log(`Created l2d info.json in ${l2dFolderPath}`);
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

        // If the l2d folder exists, process it
        if (folder === 'l2d' && info[folder]) {
            processL2DFolder(folderPath);
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
