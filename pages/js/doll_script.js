async function fetchData() {
    const url = '/data/dolls.json';

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
    const dolls_data = await fetchData();

    // Get doll ID
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const dollID = urlParams.get('doll');

    
    
    console.log(`Loading page for ID ${dollID}`);
    
    const doll = dolls_data[dollID];
    
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
    


    

});


