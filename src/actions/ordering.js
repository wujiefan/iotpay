import { ADDCART,MINUSCART,CHANGETYPE,DISHCLICK } from '../constants/oredring'
  
export const addCart = () => {
    return {
        type: ADDCART,
    }
}

export const minusCart = () => {
    return {
        type: MINUSCART,
    }
}

export const changeType = (typeId) => {
    console.log(typeId)
    return {
        type: CHANGETYPE,
        typeId
    }
}

export const dishClick = () => {
    return {
        type: DISHCLICK,
    }
}

// 异步的 action
export function asyncAdd () {
    return dispatch => {
        setTimeout(() => {
            dispatch(add())
        }, 2000)
    }
}