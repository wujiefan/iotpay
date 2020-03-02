import Taro, { useState, useEffect, useRef } from '@tarojs/taro';
import { ScrollView, View, Image } from '@tarojs/components';
import { useSelector,useDispatch } from '@tarojs/redux'
import { CHANGECART } from '../../constants/oredring'
import api from '../../services/api'

import './dishList.less';
import dishImage from '../../static/images/dish1.png'

function DishList() {
    const [dishDataList, setDishDataList] = useState([])
    const [showAnmimation,setShowAnmimation] = useState(true)
    const [animation,setAnimation] = useState('')
    const ordering = useSelector(state => state.ordering)
    const global = useSelector(state => state.global)
    const dispatch = useDispatch()
    const arrow = useRef(null)

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

    const dishSelect = (item,event)=>{
        let changeItem = ordering.cartList.filter(v => { return v.dishId == item.dishId })
        let clientX = event.currentTarget.clientX
        let clientY = event.currentTarget.clientY
        let {windowHeight} = Taro.getSystemInfoSync()

        if (changeItem.length !== 0){
            changeItem[0].count++
        }else{
            ordering.cartList.push({...item,count:1})
        }
        // 加入购物车动画
        let _animation = Taro.createAnimation()
        let _animations = Taro.createAnimation()
        _animation.left(clientX).top(clientY).opacity(1).step({duration:0});
        setAnimation(_animation.export())
        // setShowAnmimation(true) )
        setTimeout(() => {
            _animations.left(0).top(windowHeight).opacity(0).step({duration:400});
            setAnimation(_animations.export())
        }, 100);

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
                            <View key={v.dishId} className='dish-item' data-id={v.dishId} onClick={(e) => { dishSelect(v,e) }} >
                                <Image className="image" src={v.dishHeaderUrl}/>
                                <View className="name" >{v.dishName}</View>
                                <View className="price">¥ {v.dishPrice}</View>
                            </View>
                        )
                    })
                }
                {
                    showAnmimation && <View class='arrow' animation={animation} ref={arrow} ></View>
                }
            </View>
        </ScrollView>
    )
}

export default DishList