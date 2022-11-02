const poke = {};


function convertPokemonApiToPokemon(pokeDetails) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetails.order;
    pokemon.name = pokeDetails.name;
    
    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default;
}


poke.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url).then((res) => res.json())
}

poke.getPokemons = (offset = 0, limit= 50) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((res) => res.json())
    .then((res) => res.results)
    .then((pokemons) => pokemons.map(poke.getPokemonsDetail))
    .then((details) => Promise.all(details))
    .then((pokemonsDetails) =>  pokemonsDetails) 
}