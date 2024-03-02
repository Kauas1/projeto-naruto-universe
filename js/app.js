// characters: 'https://narutodb.xyz/api/character,
// clans:  https://narutodb.xyz/api/clan,
// village:   https://narutodb.xyz/api/village

const page = 2;
const baseURL = `https://narutodb.xyz/api/`;



const loadCharacter = async () => {
    const res = await fetch(`${baseURL}character?page=${page}`);
    return await res.json();
}

const loadVillage = async () => {
    const res = await fetch(`${baseURL}clan`);
    return await res.json();
}

const loadEpisode = async () => {
    const res = await fetch(`${baseURL}village`);
    return await res.json();
}

const loadAllWithPromiseAll = async () => {
    const [characters, clan, village] = await Promise.all([
        loadCharacter(),
        loadVillage(),
        loadEpisode()
    ]);

    showCharacter(characters.characters);
    // Showclan( clan.characters )
    // ShowEpisodes( episode.characters)
}

loadAllWithPromiseAll();

function showCharacter(character) {
    const characterContainer = document.getElementById("character-container");

    characterContainer.innerHTML = '';

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('character-grid');
    characterContainer.appendChild(gridContainer);

    character.forEach((characters) => {
        const divCharacterElement = document.createElement('div');
        divCharacterElement.id = `Character${characters.id}`;

        let affiliation = characters.personal.affiliation;
        let clan = characters.personal.clan;

        divCharacterElement.innerHTML = `
            <div class="container-character">
                <div class="character-info">
                   // <img src="${characters.images[0]}" alt="${characters.name}'s Image not found">
                    <div class="box-info">
                        <li>
                            <span class="nome-Personagem">Nome: ${characters.name}</span>
                        </li>
                        <li>
                            <span class="location">Afiliações:</span>
                            <a href="https://narutodb.xyz/api/village/search?name=${affiliation}">
                                <span style="${affiliation === undefined ? 'color: red;' : ''}">
                                    ${affiliation === undefined ? 'Unknown' : affiliation}
                                </span>
                            </a>
                        </li>
                        <li>
                            <span class="clan">Clan: </span>
                            <a href="https://narutodb.xyz/api/clan/search?name=${clan}" style="${clan === undefined ? 'color: red;' : ''}">
                                ${clan === undefined ? 'Unknown' : clan}
                            </a>
                        </li>
                    </div>
                </div>
            </div>
        `;

        gridContainer.appendChild(divCharacterElement);
    });
}

