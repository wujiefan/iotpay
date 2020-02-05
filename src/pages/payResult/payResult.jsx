import Taro, { useState,useEffect,useRef } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './payResult.less'

function PayResult() {
    const [timer, setTimer] = useState(0)
    const [canteenName, setCanteenName] = useState('佳和旺餐厅')
    const [resultMessage, setResultMessage] = useState('支付成功！请稍等片刻...')
    const [totalPrice, setTotalPrice] = useState(100)
    const timeOut = 5;
    const intervalRef = useRef(null)

    useEffect(()=>{
        setCanteenName(this.$router.params.canteenName)
        setTotalPrice(this.$router.params.totalprice)
        setContainueInterval()
        return ()=>{
            clearInterval(intervalRef.containueTimer)
            intervalRef.containueTimer = null
        }
    },[])

    const setContainueInterval = ()=>{
        if(intervalRef.containueTimer){
            clearInterval(intervalRef.containueTimer)
            intervalRef.containueTimer = null
        }
        setTimer(timeOut)
        intervalRef.containueTimer = setInterval(() => {
            setTimer(timer=>{
                if (timer>1){
                    return timer - 1
                }else{
                    // clearInterval(intervalRef.containueTimer)
                    Taro.navigateBack()
                }
            })
        }, 1000)
    }
    return (
        <View className='container'>
            <View className="content">
                <View className="head">
                    <View className="name">{canteenName}</View>
                    <Image className="image" src={require('../../static/images/text.png')}/>
                    <View className="message">{resultMessage}</View>
                    <View className="price">¥ {totalPrice}</View>
                </View>
                <View className="bottom">
                    <View className="btn-containue" onClick={()=>{
                        Taro.navigateBack()
                    }}>
                        继续点餐
                        {timer?<Text>({timer})</Text>:''}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PayResult