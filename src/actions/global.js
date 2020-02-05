import { SETDEVICE } from '../constants/global'

export const setDevice= (deviceSN) => {
    return {
        type: SETDEVICE,
        deviceSN
    }
}