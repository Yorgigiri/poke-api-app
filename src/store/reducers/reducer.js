import ADD_POKEMON_TO_FAVOURITES from "../actions/addPokemonToFavourites";


const initialState = [];

export default function favouritePokemonList(state = initialState, action) {
    switch (action.type) {
        case ADD_POKEMON_TO_FAVOURITES:
            return [
                ...state,
                action.payload,
            ];

        default:
            return state
    }
}