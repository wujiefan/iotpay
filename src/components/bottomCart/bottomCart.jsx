import Taro, { useState, useMemo, useEffect} from '@tarojs/taro';
import {ScrollView, View, Text, Image } from '@tarojs/components';
import { useSelector,useDispatch } from '@tarojs/redux'
import { CHANGECART } from '../../constants/oredring'

import {accMul} from '../../utils/util.js'
import './bottomCart.less';

function BottomCart(params) {
    const [showCover, setShowCover] = useState(false)
    const ordering = useSelector(state => state.ordering)
    const dispatch = useDispatch()

    const onScrollToLower = e => {
        console.log(e)
    }
    function amountPrice() {
        let price = 0
        ordering.cartList.forEach(v => {
            price += accMul(v.price,v.count)
        })
        return price
    }
    function auountCount() {
        let count = 0
        ordering.cartList.forEach(v => {
            count += v.count
        })
        return count
    }
    const totalPirce = useMemo(() => {
        return amountPrice()
    })
    const totalCount= useMemo(() => {
        return auountCount()
    })
    useEffect(()=>{
        console.log("bottomCart")
    })
    function minusCount(item,idx){
        if(item.count === 1){
            ordering.cartList.splice(idx,1)
        }else{
            item.count--
        }
        dispatch({type:CHANGECART,cartList:ordering.cartList})
    }
    function addCount(item){
        item.count++
        dispatch({type:CHANGECART,cartList:ordering.cartList})
    }
    return (
        <View className="bottom-bar">
            <View className="bottom-left">
                <View className="cart" onClick={() => {setShowCover(!showCover)}}>
                    <View className="count">{totalCount}</View>
                </View>
                <View>共{totalCount}件</View>
            </View>
            <View className="bottom-right">
                <View className="total-price">
                    合计：
                    <Text className="price">¥{totalPirce}</Text>
                </View>
                <View className="btn-primary">去结算</View>
            </View>
            <View className={'bottom-cover '+(showCover?'show':'')}>
                <View className="bootom-slider">
                    <View className="title"> 购物车 </View>
                    <ScrollView
                        className='cart-list-bar'
                        scrollY
                        scrollWithAnimation
                        onScrollToLower={onScrollToLower}
                    >
                        <View className="cart-list">
                            {
                                ordering.cartList.map((v,i)=>{
                                    return (
                                        <View className="cart-item" key={v.id} data-id={v.id}>
                                            <View className="item-left">
                                                <Image className="image" src={v.image}></Image>
                                                <View>
                                                    <View className="name">{v.name}</View>
                                                    <View className="price">¥{v.price.toFixed(2)}</View>
                                                </View>
                                            </View>
                                            <View className="item-rigth">
                                                <Image onClick={() => { minusCount(v, i) }} src={require('../../static/images/subtract.png')} className="image-btn" />{v.count}<Image onClick={() => { addCount(v) }} src={require('../../static/images/add.png')} className="image-btn"/>
                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default BottomCart