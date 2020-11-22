import { combineReducers } from 'redux'
import pokemonReducer from "./reducer";


const rootReducer = combineReducers({
    pokemonReducer,
})

export default rootReducer;