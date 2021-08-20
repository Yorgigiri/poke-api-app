import { combineReducers } from 'redux'
import favouritePokemonList from "./reducer";


const rootReducer = combineReducers({
    favouritePokemonList,
})

export default rootReducer;