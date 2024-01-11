
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = String(pokeDetail.id).padStart(3, '0')
    // capitalize no JS se quiser receber no objeto
    // pokemon.name = pokeDetail.name.charAt(0).toUpperCase() + pokeDetail.name.slice(1) 
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) // converte a lista de requisição para json
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url) // buscando a lista de pokemons
        .then((response) => response.json()) // converte o response para json
        .then((jsonBody) => jsonBody.results) // pegamos a lista dos resultados
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // mapeia a lista de pokemons em uma lista de requisições dos detalhes dos pokemons
        .then((detailRequests) => Promise.all(detailRequests)) // aguarando o processamento async terminar
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}
