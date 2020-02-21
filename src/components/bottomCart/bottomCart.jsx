import Taro, { useState, useMemo, useEffect} from '@tarojs/taro';
import {ScrollView, View, Text, Image } from '@tarojs/components';
import { useSelector,useDispatch } from '@tarojs/redux'
import { CHANGECART } from '../../constants/oredring'

import {accMul} from '../../utils/util.js'
import './bottomCart.less';
import api from '../../services/api'

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
            price += accMul(v.dishPrice,v.count)
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
    const totalKind = useMemo(() => {
        return ordering.cartList.length
    },[ordering.cartList.length])
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
    function toRecharge(){
        let bizNo = new Date().getTime();

        if(ordering.cartList.length === 0){
            Taro.showToast({
                title: '请先选择菜品！',
                icon: 'none',
                duration: 2000
            })
            return
        }
        toPay({deviceSN:'zy72423105204203',barCode:'281027885253915882'})
        // my.ix.startApp({
        //     appName: 'cashier',
        //     bizNo,
        //     totalAmount: totalPirce,
        //     success: (res) => {
        //         toPay(res)
        //     },
        //     fail:function(res){
        //         console.log(res)
        //     }
        // });
    }
    function toPay(data){
        let orderDishes = ordering.cartList.map(v=>{
            let {dishId,dishName,count} = v
            return {dish_id:dishId,dish_name:dishName,dish_quantity:count}
        })
        console.log(orderDishes)
        api.post('secondParty/facePay',{
            deviceSN:data.deviceSn,
            qrCode:data.barCode,
            consumePrice:totalPirce,
            orderDishes
        })
        .then(res => {
            console.log(res.data)
            if(res.result){
                Taro.navigateTo({ 
                    url: '/pages/payResult/payResult?canteenName='+'绿谷餐厅'+'&totalprice='+totalPirce ,
                    success(){
                        dispatch({type:CHANGECART,cartList:[]})
                    }
                })
            }
        }).catch((e) => {});
    }
    return (
        <View className="bottom-bar">
            <View className="bottom-left">
                <View className="cart" onClick={() => {setShowCover(!showCover)}}>
                    <View className="count">{totalKind}</View>
                </View>
                <View>共{totalCount}件</View>
            </View>
            <View className="bottom-right">
                <View className="total-price">
                    合计：
                    <Text className="price">¥{totalPirce}</Text>
                </View>
                <View className="btn-primary" onClick={toRecharge}>去结算</View>
            </View>
            <View className={'bottom-cover '+(showCover?'show':'')} onClick={()=>{setShowCover(false)}}>
                <View className="bootom-slider" onClick={(e)=>{e.stopPropagation()}}>
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
                                        <View className="cart-item" key={v.dishId} data-id={v.dishId}>
                                            <View className="item-left">
                                                <Image className="image" src={v.dishHeaderUrl}></Image>
                                                <View>
                                                    <View className="name">{v.dishName}</View>
                                                    <View className="price">¥{v.dishPrice.toFixed(2)}</View>
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