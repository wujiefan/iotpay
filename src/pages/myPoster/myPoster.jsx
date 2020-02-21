import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './myPoster.less'

function MyPoster() {
    const [showDefault, setShowDefault] = useState(false)
    const onDisplaySuccess = ()=>{
        console.log('poster display success');
        setShowDefault(true)
    }
    const onDisplayFail = (e)=>{
        console.log('poster display fail, error = ' + e.detail.error);
    }
    return (
        <View className="container">
            <View className="poster-container">
                {
                    showDefault
                    ? <poster class="my-poster" posid="idle_pos"  onSuccess={onDisplaySuccess}  onFail={onDisplayFail}/>
                    : <Image class="default-poster" src={require('../../static/images/bill.jpg')} />
                }

            </View>
            <View className="action-area">
                <View className="btn-bottom" onClick={() => { Taro.navigateTo({ url: '/pages/ordering/ordering' })}}>开始点餐</View>
            </View>
        </View>
    )
}
MyPoster.config= {
    navigationBarTitleText: '首页'
}
export default MyPoster