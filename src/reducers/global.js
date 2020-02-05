import { SETDEVICE } from '../constants/global'

const INITIAL_STATE = {
    deviceSN:''
}
export default function global (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SETDEVICE:
            return {
                ...state,
                deviceSN: action.deviceSN
            }
        default:
            return state
    }
}