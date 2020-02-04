import Taro, { useState,useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './payResult.less'

function PayResult() {
    const [timer, setTimer] = useState(0)
    const [canteenName, setCanteenName] = useState('佳和旺餐厅')
    const [resultMessage, setResultMessage] = useState('支付成功！请稍等片刻...')
    const [totalPrice, setTotalPrice] = useState(100)
    const [containueTimer, setContainueTimer] = useState(null)
    const timeOut = 5;
    const setContainueInterval = ()=>{
        if(containueTimer){
            clearInterval(containueTimer)
            setContainueTimer(null)
        }
        setTimer(timeOut)

        setContainueTimer(setInterval(() => {
            setTimer(timer=>{
                if (timer>0){
                    return timer - 1
                }else{
                    clearInterval(containueTimer)
                    return timer
                }
            })
        }, 1000))
    }
    return (
        <View className='container'>
            <View className="content">
                <View className="head">
                    <View className="name">{canteenName}</View>
                    <Image className="image" src={require('../../static/images/text.png')}/>
                    <View className="message">{resultMessage}</View>
                    <View className="price">¥ {totalPrice.toFixed(2)}</View>
                </View>
                <View className="bottom">
                    <View className="btn-containue" onClick={setContainueInterval}>
                        继续点餐
                        {timer?<Text>({timer})</Text>:''}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PayResult