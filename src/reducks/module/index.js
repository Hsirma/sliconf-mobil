import { combineReducers } from "redux"
import NavReducer from './navigator'
import AuthReducer from './auth'
import EventReducer from './event'
import CommentReducer from './comment'
import DrawerReducer from './drawer'

export default combineReducers({
    auth: AuthReducer,
    event:EventReducer,
    nav: NavReducer,
    drawer: DrawerReducer,
    comment:CommentReducer
});