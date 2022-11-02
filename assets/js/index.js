const pokemonList = document.getElementById('pokemonList');
const btnMorePokemon = document.getElementById('btn-morePokemons');
let limit = 5;
let offset = 0;


function convertPokemonTypesLi(PokemonTypes) {
  return PokemonTypes.map((typeSlot) => `<li class="slot">${typeSlot.type.name}</li>`)
};
// Coloca pokemons no HTML
function convertToPokemonLi(pokemon) {
  return `
    <li class="pokemon">
        <span class="number">${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
          ${convertPokemonTypesLi(pokemon.types).join('')}
          </ol>
          <img src="${pokemon.sprites.other.dream_world.front_default}" alt="">
        </div>
      </li>
    `
};

// Chamada de lista de pokemons
function loadPokemon(offset, limit) {
  poke.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
    <li class="pokemon">
        <span class="number">${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
          ${convertPokemonTypesLi(pokemon.types).join('')}
          </ol>
          <img src="${pokemon.sprites.other.dream_world.front_default}" alt="">
        </div>
      </li>
    `).join('')
    pokemonList.innerHTML += newHtml
  })
};

loadPokemon(offset, limit);

btnMorePokemon.addEventListener('click', () => {
  offset += limit
  loadPokemon(offset, limit)
});