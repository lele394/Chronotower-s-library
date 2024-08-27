const express = require('express');
const path = require('path');

// Create an instance of Express
const app = express();

// Define the port
const PORT = 3000; // You can change the port if needed

// Serve the current directory as static content
app.use(express.static(__dirname));



function AddFilePathToServer(remote, local) {
    app.get(remote, (req, res) => {
        res.sendFile(path.join(__dirname, local)); // Ensure index.html is in the current directory
    });
}


AddFilePathToServer('/', '../pages/index.html');
AddFilePathToServer('/dolls', '../pages/dolls.html');
AddFilePathToServer('/equipment', '../pages/equipment.html');
AddFilePathToServer('/story', '../pages/story.html');
AddFilePathToServer('/about', '../pages/about.html');

AddFilePathToServer('/building-it', '../pages/building-it.html');



/*
// Optionally, serve other static content from a subfolder (e.g., 'public')
app.use('/other-content', express.static(path.join(__dirname, 'other-content')));
// ^Modify to serve CSS files and JS later
*/

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
