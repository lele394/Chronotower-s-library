async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching the JSON data:', error);
    }
}




const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const dollID = urlParams.get('doll');

let available_data = await fetchData(`/assets/dolls/${dollID}/info.json`);




// Create Pixi.js application with transparent background

let app = null;
if(available_data.l2d) {

    app = new PIXI.Application({
        view: document.getElementById('l2d'),
        backgroundColor: 0x101010,
        transparent: true
    });
}


let model = null;

// Function to load and display a Live2D model
async function loadModel(modelPath) {
    if (app.stage.children.length > 0) {
        // Remove the existing model from the stage
        app.stage.removeChild(app.stage.children[0]);
    }

    // Load the new Live2D model
    model = await PIXI.live2d.Live2DModel.from(modelPath);
    app.stage.addChild(model);

    // Function to adjust the model size and position
    function adjustModelSize() {
        const canvasWidth = app.screen.width;
        const canvasHeight = app.screen.height;

        // Get model dimensions
        const modelWidth = model.width;
        const modelHeight = model.height;

        // Calculate scaling factors to fit the model within the canvas
        const scaleX = canvasWidth / modelWidth;
        const scaleY = canvasHeight / modelHeight;
        
        // Use the smaller scale factor to ensure the model fits
        const scale = Math.min(scaleX, scaleY);

        // Apply scaling
        model.scale.set(scale*0.7);

        // Center the model on the canvas
        model.position.set(canvasWidth / 2, canvasHeight / 2);
        model.anchor.set(0.5, 0.5);
    }

    // Initial adjustment
    app.renderer.resize(window.innerWidth, window.innerHeight);
    adjustModelSize();


    
}

// Initially load a model
// await loadModel('../assets/dolls/97/l2d/default/char097.model3.json');





// L2D selectors JS

// Create selector
const l2dSelector = document.getElementById('l2d-selector');

if(available_data.l2d) {
    const l2ds = await fetchData(`/assets/dolls/${dollID}/l2d/info.json`)
    
    // Iterate through the JSON object and create options
    for (const [key, value] of Object.entries(l2ds)) {
        // Create a new option element
        const option = document.createElement('option');
        
        // Set the text to the key and value to the corresponding value in the JSON
        option.textContent = key;
        option.value = value;
        
        // Append the option to the select element
        l2dSelector.appendChild(option);
    }
}






async function OnSelect(event) {
    const selectedValue = event.target.value;
    console.log(`Selected value: ${selectedValue}`);

    if(selectedValue === "") {
        if (app.stage.children.length > 0) {
            // Remove the existing model from the stage
            app.stage.removeChild(app.stage.children[0]);
        }
        return;
    }

    await loadModel(`../assets/dolls/${dollID}/l2d/${selectedValue}`); 
}

if(available_data.l2d) {
    
    // Attach the event listener to the select element
    document.getElementById('l2d-selector').addEventListener('change', OnSelect);
}
