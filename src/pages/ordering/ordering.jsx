import Taro, { createContext,useReducer } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './ordering.less'

import TypeList from "../../components/typeList/typeList";
import DishList from "../../components/dishList/dishList";
import BottomCart from "../../components//bottomCart/bottomCart";

export const Ordering = ()=>{
    return(
        <View className='container'>
            <View className="content">
                <TypeList></TypeList>
                <DishList></DishList>
            </View>
            <BottomCart></BottomCart>
        </View>
    )
}

