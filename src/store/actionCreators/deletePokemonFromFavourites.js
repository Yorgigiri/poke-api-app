import DELETE_POKEMON_FROM_FAVOURITES from "../actions/deletePokemonFromFavourites";


const deletePokemonFromFavourites = (pokemon) => ({
    type: DELETE_POKEMON_FROM_FAVOURITES,
    payload: pokemon,
})

export default deletePokemonFromFavourites;