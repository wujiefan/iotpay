import { CHANGECART,CHANGETYPE,DISHCLICK } from '../constants/oredring'

const INITIAL_STATE = {
    cartList: [],
    typeId: 0,
}
export default function oredring (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGECART:
            return {
                ...state,
                cartList: action.cartList
            }
        case CHANGETYPE:
            return {
                ...state,
                typeId: action.typeId
            }
        case DISHCLICK:
            return {
                ...state,
                cartList: action.cartList
            }
        default:
            return state
    }
}