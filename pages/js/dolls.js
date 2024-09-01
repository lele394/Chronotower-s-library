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


async function createButtons() {
    const url = '/data/dolls.json'; // Replace with your actual URL
    const data = await fetchData(url);
    if (!data) return;

    const container = document.getElementById('doll_list_container');
    for (const id in data) {
        if(["5", "7", "20", "21", "26", "40", "44", "46", "50", "54", "58", "60", "62", "117"].includes(id)){continue};
        if (data.hasOwnProperty(id)) {
            const button = document.createElement('button');
            button.className = 'doll_button';
            button.id = id;
            button.textContent = '';
            button.style.setProperty('--doll-icon-link', `url('${data[id].profile_img}')`);
            button.onclick = () => load_page(id);

            const doll_name = document.createElement('p');
            doll_name.className = "doll_name";
            doll_name.textContent = data[id].name;
            button.appendChild(doll_name);

            container.appendChild(button);
        }
    }
}

createButtons();



function load_page(id) {
    // console.log(`Loading page for ID: ${id}`);
    // Implement your page loading logic here

    loadPage(`/pages/doll_dynamic.html?doll=${id}`)
}