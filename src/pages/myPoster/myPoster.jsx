import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './myPoster.less'

function MyPoster() {
    const [showDefault, setShowDefault] = useState(false)
    const onDisplaySuccess = ()=>{
        setShowDefault(true)
    }
    return (
        <View className="container">
            <View className="poster-container">
                {
                    showDefault
                    ? <poster class="my-poster" posid="idle_pos"  onSuccess={onDisplaySuccess} />
                    : <Image class="default-poster" src={require('../../static/images/bill.jpg')} />
                }

            </View>
            <View className="action-area">
                <View className="btn-bottom" onClick={() => { Taro.navigateTo({ url: '/pages/ordering/ordering' })}}>开始点餐</View>
            </View>
        </View>
    )
}

export default MyPoster