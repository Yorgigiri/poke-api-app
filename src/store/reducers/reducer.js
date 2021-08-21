import ADD_POKEMON_TO_FAVOURITES from "../actions/addPokemonToFavourites";
import DELETE_POKEMON_FROM_FAVOURITES from "../actions/deletePokemonFromFavourites";


const initialState = [];

export default function favouritePokemonList(state = initialState, action) {
    switch (action.type) {
        case ADD_POKEMON_TO_FAVOURITES:
            return [
                ...state,
                action.payload,
            ];
        case DELETE_POKEMON_FROM_FAVOURITES:
            return [
                ...state.filter((pokemon) => pokemon.id !== action.payload.id),
            ];

        default:
            return state
    }
}