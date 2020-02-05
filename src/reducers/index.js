import { combineReducers } from 'redux'
import ordering from './ordering'
import global from './global'


export default combineReducers({
    ordering,
    global,
})