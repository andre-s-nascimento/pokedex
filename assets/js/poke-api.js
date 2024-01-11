
const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json()) // converte a lista de requisição para json

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
