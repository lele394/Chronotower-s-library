
// Left right naviagtion using arrows
document.addEventListener('keydown', function(event) {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const dollID = parseInt(urlParams.get('doll'));

    // Check which key was pressed
    if (event.key === 'ArrowLeft') {
        // Load the URL for left arrow key press
        window.location.href = `/pages/doll_dynamic.html?doll=${(dollID - 1)%125 || 124}`;
    } else if (event.key === 'ArrowRight') {
        // Load the URL for right arrow key press
        window.location.href = `/pages/doll_dynamic.html?doll=${(dollID + 1)%125  || 1}`;
    }
});














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



function updateTextById(id, text) {
    // Get the element by its ID
    const element = document.getElementById(id);

    // Check if the element exists
    if (element) {
        // Update the inner text of the element
        element.innerText = text;
    } else {
        console.error(`Element with ID "${id}" not found.`);
    }
}






// Update page on load
document.addEventListener('DOMContentLoaded', async () => {
    const dolls_data = await fetchData('/data/dolls.json');

    // Get doll ID
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const dollID = urlParams.get('doll');

    
    
    console.log(`Loading page for ID ${dollID}`);
    
    const doll = dolls_data[dollID];

    // Set pfp url
    document.getElementById("doll_pfp").style.setProperty('--doll-icon-link', `url('${doll.profile_img}')`);
    
    // Update title
    document.title = `${doll.name} - Chronotower's Library`;

    // replaces element here
    updateTextById('doll_name', doll.name);
    updateTextById('title', doll.title);
    updateTextById('vocation', doll.vocation.name);
    updateTextById('gender', doll.gender);
    updateTextById('birthday', doll.birthday);

    // replaces artists
    updateTextById('original_artist', doll.original_artist);
    updateTextById('overseas_artist', doll.overseas_artist);
    updateTextById('CN_voice', doll.CN_voice);
    updateTextById('JP_voice', doll.JP_voice);

    //backstories
    updateTextById('backstory1', doll.backstory[0]);
    updateTextById('backstory2', doll.backstory[1]);
    updateTextById('backstory3', doll.backstory[2]);


    //special equipment 
    // SHould add special logic to remove or add special text
    // If no special equipment is available
    // Add handling for equipmentID 0 in linker?
    updateTextById('special_name', doll.special_equip.name);
    updateTextById('special_description', doll.special_equip.description);



    // Skills
    updateTextById('skill1_name', doll.skills.skill1.name);
    updateTextById('skill1_description', doll.skills.skill1.description);

    updateTextById('skill2_name', doll.skills.skill2.name);
    updateTextById('skill2_description', doll.skills.skill2.description);

    updateTextById('skill3_name', doll.skills.skill3.name);
    updateTextById('skill3_description', doll.skills.skill3.description);
    

    // Art part 
    let available_data = await fetchData(`/assets/dolls/${dollID}/info.json`);


    // GIF stuff with loop
    if(available_data.gif) { // Makes sure the gif folder is available
        let data = await fetchData(`/assets/dolls/${dollID}/gif/info.json`);
    
    
        const gifsContainer = document.getElementById('gifs');
    
        data.content.forEach(file => {
            // Create the gif-container div
            const gifContainer = document.createElement('div');
            gifContainer.className = 'gif-container';
        
            // Create the gif-template div
            const gifTemplate = document.createElement('div');
            gifTemplate.className = 'gif-template';
            const relativeGifPath = `/assets/dolls/${dollID}/gif/${file}`; // Store the path
            gifTemplate.style.setProperty('--gif-url', `url(${relativeGifPath})`);
            gifTemplate.style.cursor = 'pointer'; // Add a visual cue that it's clickable
        
            // Create the gif-title p element
            const gifTitle = document.createElement('p');
            gifTitle.className = 'gif-title';
            const originalTitleText = file.slice(0, -4); // Store original title for later
            gifTitle.textContent = originalTitleText;
        
            // --- NEW: Add click event listener to the gif-template ---
            gifTemplate.addEventListener('click', () => {
                // Construct the full URL (assuming the site root is the base)
                // Use window.location.origin to get the base URL (e.g., "https://www.example.com")
                const fullGifUrl = `${window.location.origin}${relativeGifPath}`;
        
                // Use the Clipboard API to copy the text
                navigator.clipboard.writeText(fullGifUrl)
                    .then(() => {
                        // Success feedback: Temporarily change the title
                        console.log(`Copied to clipboard: ${fullGifUrl}`);
                        gifTitle.textContent = 'Copied!';
                        // Optionally, reset the title after a short delay
                        setTimeout(() => {
                            gifTitle.textContent = originalTitleText;
                        }, 1500); // Reset after 1.5 seconds
                    })
                    .catch(err => {
                        // Error feedback
                        console.error('Failed to copy URL: ', err);
                        gifTitle.textContent = 'Copy Failed!';
                         // Optionally, reset the title after a short delay
                         setTimeout(() => {
                            gifTitle.textContent = originalTitleText;
                        }, 2000); // Reset after 2 seconds
                        // You might want to alert the user or provide more prominent feedback
                        // alert('Could not copy URL to clipboard.');
                    });
            });
            
            // Consider adding role="button" and tabindex="0" for accessibility if needed
            // gifTemplate.setAttribute('role', 'button');
            // gifTemplate.setAttribute('tabindex', '0');
        
            // Append gif-template and gif-title to gif-container
            gifContainer.appendChild(gifTemplate);
            gifContainer.appendChild(gifTitle);
        
            // Append gif-container to the gifs div (assuming gifsContainer is defined elsewhere)
            gifsContainer.appendChild(gifContainer);
        });
    }



// Function to load either .webp or .png depending on availability
async function loadImage(dollID, variant, callback) {
    const imageBasePath = `/assets/dolls/${dollID}/${variant}/card`;
    let imageUrl = '';

    // Try loading .webp first
    try {
        const response = await fetch(`${imageBasePath}.webp`);
        if (response.ok) {
            imageUrl = `${imageBasePath}.webp`;
        } else {
            throw new Error('webp not found');
        }
    } catch (error) {
        // If .webp fails, fall back to .png
        try {
            const response = await fetch(`${imageBasePath}.png`);
            if (response.ok) {
                imageUrl = `${imageBasePath}.png`;
            } else {
                throw new Error('png not found');
            }
        } catch (pngError) {
            console.error('No image available for this variant:', pngError);
            return;
        }
    }

    // Once an image is found, call the callback with the image URL
    callback(imageUrl);
}

// Variant stuff
const variantsContainer = document.getElementById('variants');

// Default variant
if (available_data.default) {
    loadImage(dollID, 'default', (imgUrl) => {
        const variantDiv = document.createElement('div');
        variantDiv.className = 'variant';
        variantDiv.style.setProperty('--img-url', `url(${imgUrl})`);
        variantsContainer.appendChild(variantDiv);
    });
}

// Break variant
if (available_data.break) {
    loadImage(dollID, 'break', (imgUrl) => {
        const variantDiv = document.createElement('div');
        variantDiv.className = 'variant';
        variantDiv.style.setProperty('--img-url', `url(${imgUrl})`);
        variantsContainer.appendChild(variantDiv);
    });
}

// v1 variant
if (available_data.v1) {
    loadImage(dollID, 'v1', (imgUrl) => {
        const variantDiv = document.createElement('div');
        variantDiv.className = 'variant';
        variantDiv.style.setProperty('--img-url', `url(${imgUrl})`);
        variantsContainer.appendChild(variantDiv);
    });
}

// v2 variant
if (available_data.v2) {
    loadImage(dollID, 'v2', (imgUrl) => {
        const variantDiv = document.createElement('div');
        variantDiv.className = 'variant';
        variantDiv.style.setProperty('--img-url', `url(${imgUrl})`);
        variantsContainer.appendChild(variantDiv);
    });
}












    // Once all is done, adapt color tags from invalid HTML to valid colors

    // Select all elements containing the custom <color> tags
    // Get all the elements that contain text where the <color> tag might be used
    const elements = document.querySelectorAll("p");
    
    console.log("Parsing color tags");
    elements.forEach(element => {
        // Get the innerHTML of the element
        let htmlContent = element.innerHTML;

        // Replace all <color=#XXXXXX>text</color> with <span style="color:#XXXXXX">text</span>
        htmlContent = htmlContent.replace(/&lt;color=#([A-Fa-f0-9]{6})&gt;(.*?)&lt;\/color&gt;/g, (match, colorCode, textContent) => {
            return `<span style="color:#${colorCode}">${textContent}</span>`;
        });

        // Update the element's innerHTML
        element.innerHTML = htmlContent;
    });


    

});


