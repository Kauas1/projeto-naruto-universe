document.addEventListener('DOMContentLoaded', () => {
    const urlParam = new URLSearchParams(window.location.search);
    const paramId = urlParam.get('id');
    console.log(paramId)

    const url = `https://narutodb.xyz/api/character/${paramId}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro de rede: Código ' + response.status);
            }
            return response.json();
        })
        .then((data) => {
            showCharacterDetails(data);

            console.log(data)
        })
        .catch((err) => console.log(err));



    function showCharacterDetails(character) {
        const personagemImg = document.querySelector('.person-img');
        const nome = document.querySelector('.name');
        const alturaValue = document.querySelector('.height-value');
        const jutsuValue = document.querySelector('.jutsu-value');
        const natureTypeValue = document.querySelector('.natureType-value');
        const kekkeiMōraValue = document.querySelector('.kekkeiMōra-value');
        const affiliationValue = document.querySelector('.affiliation-value');
        
       
        personagemImg.src = character.images[0];
        nome.innerHTML = ` ${character.name}`;
        alturaValue.textContent = `${character.personal.height}`
        jutsuValue.innerHTML = ` ${character.jutsu}`;
        natureTypeValue.innerHTML = ` ${character.personal.natureType}`;
        kekkeiMōraValue.innerHTML = ` ${character.personal.kekkeiMōra}`;
        affiliationValue.innerHTML = ` ${character.personal.affiliation}`;

   

}
});


