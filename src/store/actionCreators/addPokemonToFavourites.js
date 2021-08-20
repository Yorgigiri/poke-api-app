import ADD_POKEMON_TO_FAVOURITES from "../actions/addPokemonToFavourites";


const addPokemonToFavourites = (pokemon) => ({
    type: ADD_POKEMON_TO_FAVOURITES,
    payload: pokemon,
})

export default addPokemonToFavourites;