import Taro, { useState, useEffect } from '@tarojs/taro';
import { ScrollView, View, Image } from '@tarojs/components';
import { useSelector,useDispatch } from '@tarojs/redux'
import { CHANGECART } from '../../constants/oredring'
import api from '../../services/api'

import './dishList.less';
import dishImage from '../../static/images/dish1.png'

function DishList() {
    const [dishDataList, setDishDataList] = useState([])
    const ordering = useSelector(state => state.ordering)
    const global = useSelector(state => state.global)
    const dispatch = useDispatch()

    const onScrollToLower = e => {
        console.log(e)
    }
    function getDishList(){
        api.get('secondParty/getDishes',{deviceSN:global.deviceSN,dishTypeId:ordering.typeId})
        .then(res => {
            console.log(res.data)
            if(res.result){
                setDishDataList(res.data)
            }
        }).catch((e) => {});
    }

    useEffect(() => {
        if(ordering.typeId){
            console.log('dishList')
            getDishList()
        }
    }, [ordering.typeId])

    const dishSelect = (item)=>{
        let changeItem = ordering.cartList.filter(v => { return v.id == item.id })
        if (changeItem.length !== 0){
            changeItem[0].count++
        }else{
            ordering.cartList.push({...item,count:1})
        }
        dispatch({type:CHANGECART,cartList:ordering.cartList})
    }

    return (
        <ScrollView
            className='dish-bar'
            scrollY
            scrollWithAnimation
            onScrollToLower={onScrollToLower}
        >
            <View className="dish-list">
                {
                    dishDataList.map((v, i) => {
                        return (
                            <View key={v.dishId} className='dish-item' data-id={v.dishId} onClick={() => { dishSelect(v) }} >
                                <Image className="image" src={v.dishHeaderUrl}/>
                                <View className="name" >{v.dishName}</View>
                                <View className="price">¥ {v.dishPrice}</View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default DishList