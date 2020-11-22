import ADD_POKEMON_TO_FAVOURITES from "../actions/addPokemonToFavourites";


const initialState = [];

export default function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POKEMON_TO_FAVOURITES:
            return [
                ...state,
                action.pokemonData,
            ];

        default:
            return state
    }
}