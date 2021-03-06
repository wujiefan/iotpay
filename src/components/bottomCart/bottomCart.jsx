import Taro, { useState, useMemo, useEffect} from '@tarojs/taro';
import {ScrollView, View, Text, Image } from '@tarojs/components';
import { useSelector,useDispatch } from '@tarojs/redux'
import { CHANGECART } from '../../constants/oredring'

import { accAdd, accMul, showToast} from '../../utils/util.js'
import printer from '../../utils/printer'

import './bottomCart.less';
import api from '../../services/api'

function BottomCart(params) {
    const [showCover, setShowCover] = useState(false)
    const ordering = useSelector(state => state.ordering)
    // const global = useSelector(state => state.global)
    const dispatch = useDispatch()
    let _keyEventListener = null
    let inputPrice = 0
    let waitTime = 0

    const onScrollToLower = e => {
        console.log(e)
    }
    function amountPrice() {
        let price = 0
        ordering.cartList.forEach(v => {
            price = accAdd(price,accMul(v.dishPrice,v.count))
        })
        return price
    }
    function auountCount() {
        let count = 0
        ordering.cartList.forEach(v => {
            count = accAdd(count,v.count)
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
        console.log('bind keyEventListener')
        _keyEventListener = onKeyPress
        my.ix.onKeyEventChange(_keyEventListener)

        printer.initPrinter();

        return ()=>{
            console.log('unbind keyEventListener')
            printer.closePrinter();
            if (_keyEventListener){
                my.ix.offKeyEventChange(_keyEventListener)
                _keyEventListener = null
            }
        }
    },[])
    useEffect(()=>{
        console.log("bottomCart updata")
        // 获取节点
        // const query = Taro.createSelectorQuery().select('.cart').boundingClientRect();
        // query.exec(res => {
        //     console.log('这是res',res);
        // })
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
        callCashier(1)
        // toPay({ deviceSN: global.deviceSN,barCode:'281027885253915882'})
    }
    function toPay(data,type){
        let orderDishes = []
        let consumePrice = 0
        if(type === 1){
            orderDishes = ordering.cartList.map(v => {
                let { dishId, dishName, count } = v
                return { dish_id: dishId, dish_name: dishName, dish_quantity: count }
            })
            consumePrice = totalPirce
        }else{
            consumePrice = inputPrice
        }
        console.log(consumePrice,orderDishes)
        api.post('secondParty/alipay/facePay',{
            deviceSN:data.deviceSn,
            qrCode:data.barCode,
            consumePrice,
            orderDishes
        })
        .then(res => {
            console.log(res)
            if(res.result){
                inputPrice = 0
                Taro.showLoading({
                    title: '',
                    mask: true
                })
                setTimeout(() => {
                    Taro.hideLoading()
                    Taro.navigateTo({
                        url: '/pages/payResult/payResult?canteenName=' + res.data + '&totalprice=' + consumePrice,
                        success() {
                            console.log('pay callback')
                            dispatch({ type: CHANGECART, cartList: [] })
                            setShowCover(false)
                        }
                    })
                }, waitTime*1000);
            }else{
                console.log(res.message)
                showToast(res.message)
            }
        }).catch((e) => {});
    }
    function onKeyPress(r) {
        console.log('KeyEvent', r);
        switch (r.keyCode) {
            case 131:
                setTimeout(() => {
                    inputPrice =  Number(r.amount)
                    callCashier(2)
                }, 200)
                break;
        }
    }
    function callCashier(type) {//1结算2手动
        let bizNo = new Date().getTime();
        let amount = type === 1 ? totalPirce : inputPrice
        //打开收银机
        my.ix.startApp({
            appName: 'cashier',
            bizNo,
            totalAmount: amount.toFixed(2),
            success: (res) => {
                console.log(res)
                if (res.success) {
                    if (res.codeType === "C") {
                        waitTime = 3
                        toPay(res,type)
                    } else if (res.codeType === "F"){
                        waitTime = 0
                        toPay(res, type)
                    }
                } else {
                    showToast(res.errorMessage)
                }
            },
            fail: function (res) {
                console.log(res)
                showToast('未能完成支付')
            }
        });
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
                    <Text className="price">¥{totalPirce.toFixed(2)}</Text>
                </View>
                <View className="btn-primary" onClick={toRecharge}>去结算</View>
                <View onClick={() => {printer.printOrder()}}>打印</View>
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