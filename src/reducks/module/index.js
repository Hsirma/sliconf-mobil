import { combineReducers } from "redux"
import NavReducer from './navigator'
import EventReducer from './event'

export default combineReducers({
    //auth: AuthReducer
    event:EventReducer,
    nav: NavReducer,
});