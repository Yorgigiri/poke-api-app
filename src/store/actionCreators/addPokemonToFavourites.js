import ADD_POKEMON_TO_FAVOURITES from "../actions/addPokemonToFavourites";


function addPokemonToFavourites(pokemon) {
    return {
        type: ADD_POKEMON_TO_FAVOURITES,
        pokemonData: pokemon,
    };
}

export default addPokemonToFavourites;