const express = require('express');
const path = require('path');

// Create an instance of Express
const app = express();

// Define the port
const PORT = 3000; // You can change the port if needed

// Serve the current directory as static content
app.use(express.static(__dirname));

// Optionally, serve other static content from a subfolder (e.g., 'public')
app.use('/other-content', express.static(path.join(__dirname, 'other-content')));

// Route for the root of the website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html')); // Ensure index.html is in the current directory
});

// Dolls
app.get('/dolls', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/dolls.html')); // Ensure index.html is in the current directory
});

// Equipment
app.get('/equimpent', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/equipment.html')); // Ensure index.html is in the current directory
});

// Story
app.get('/story', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/story.html')); // Ensure index.html is in the current directory
});

// About
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/about.html')); // Ensure index.html is in the current directory
});



// About
app.get('/building-it', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/building-it.html')); // Ensure index.html is in the current directory
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
