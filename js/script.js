// Selecionando elementos do HTML

const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// Funções

// Busca informações do Pokemon
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // Validando se o pokemon digitado existe
    if (APIResponse.status === 200){
        const data = await APIResponse.json(); // transforma resposta em JSON
        return data;
    }
}

// Renderiza dados do Pokemon na tela
const renderPokemon = async (pokemon) => {
    // Define interação de loading
    pokemonName.innerHTML = 'Loading ...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    // Validando se o pokemon digitado existe
    if (data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        input.value = ''; // limpa o input depois de pesquisar
        searchPokemon = data.id; // guarda id do pokemon pesquisado
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado!';
        pokemonNumber.innerHTML = '';
    }
}

// Capturando preenchimento do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    renderPokemon(input.value.toLowerCase());
});

// Capturando click do botão 'Anterior'
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    };
});

// Capturando click do botão 'Próximo'
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon); // renderiza sempre o primeiro pokemon