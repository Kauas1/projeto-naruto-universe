
const baseURL = 'https://narutodb.xyz/api/';

const loadCharacter = async () => {
    const res = await fetch(`${baseURL}character?limit=1431`);
    return await res.json();
};

const loadClan = async () => {
    const res = await fetch(`${baseURL}clan`);
    return await res.json();
};

const loadVillage = async () => {
    const res = await fetch(`${baseURL}village`);
    return await res.json();
};

const loadAllWithPromiseAll = async () => {
    try {
        const [characters, clans, villages] = await Promise.all([
            loadCharacter(),
            loadClan(),
            loadVillage()
        ]);

        showCharacters(characters.characters);
        // showClans(clans.clans);
        // showVillages(villages.villages);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
};

loadAllWithPromiseAll();

function showCharacters(characters) {
    const characterContainer = document.getElementById('character-container');


    characterContainer.innerHTML = '';

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('character-grid');
    characterContainer.appendChild(gridContainer);

    characters.forEach((character, index) => {
        const divCharacterElement = document.createElement('div');
        divCharacterElement.id = `Character${character.id}`;

        let affiliation = character.personal.affiliation;
        let clan = character.personal.clan;

        divCharacterElement.innerHTML = `
            <div class="container-character">
                <div class="character-info">
                    <img src="${character.images[0]}" alt="${character.name}'s Image not found">
                    <div class="box-info">
                        <li>    
                            <span class="nome-Personagem">Nome:${character.name} </span>
                        </li>
                        <li>
                            <span class="location">Afiliações:</span>
                            <a href="${affiliation ? `https://narutodb.xyz/api/village/search?name=${affiliation}` : '#'}">
                                <span style="${!affiliation ? 'color: red;' : ''}">
                                    ${affiliation || 'Unknown'}
                                </span>
                            </a>
                        </li>
                        <li>
                            <span class="clan">Clan: </span>
                            <a href="${clan ? `https://narutodb.xyz/api/clan/search?name=${clan}` : '#'}" style="${!clan ? 'color: red;' : ''}">
                                ${clan || 'Unknown'}
                            </a>
                        </li>
                    </div>
                </div>
            </div>
        `;

        divCharacterElement.addEventListener('click', () => {
            createLinkHref(index)
        })

        gridContainer.appendChild(divCharacterElement);
    });

    function createLinkHref(id) {
        window.location.href = `../pages/person.html?id=${id}`
    }
}


