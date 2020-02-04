import Taro, { createContext,useReducer } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './ordering.less'
import TypeList from "../../components/typeList/typeList";
import DishList from "../../components/dishList/dishList";
import BottomCart from "../../components//bottomCart/bottomCart";
const reducer = (state, action) => {
    console.log(state, action)
    switch (action) {
        case 'TYPE_CHANGE':
            return state;
        case 'DISH_CHANGE':
            return state;
        case 'DATA_UPDATE':
            return state;
        default:
            return state
    }
}
export const orderingContext = createContext(0)
export const Ordering = ()=>{
    const [orderingData, dispatch] = useReducer(reducer, {
        typeId:0,
        cartList:[]
    })
    return(
        <orderingContext.Provider value={{ orderingData, dispatch }}>
            <View className='container'>
                <View className="content">
                    <TypeList></TypeList>
                    <DishList></DishList>
                </View>
                <BottomCart></BottomCart>
            </View>
        </orderingContext.Provider>
    )
}

