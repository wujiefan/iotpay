import Taro, { useState, useEffect } from '@tarojs/taro';
import { ScrollView, View, Image } from '@tarojs/components';
import { useSelector,useDispatch } from '@tarojs/redux'
import { CHANGECART } from '../../constants/oredring'
import api from '../../services/api'

import './dishList.less';
import dishImage from '../../static/images/dish1.png'

function DishList() {
    const [dishDataList, setDishDataList] = useState([
        {
            id: 1,
            name: '菜品1',
            image: dishImage,
            price: 2
        },
        {
            id: 2,
            name: '菜品2',
            image: dishImage,
            price: 2
        },
        {
            id: 3,
            name: '菜品3',
            image: dishImage,
            price: 2
        },
        {
            id: 4,
            name: '菜品1',
            image: dishImage,
            price: 2
        },
        {
            id: 5,
            name: '菜品2',
            image: dishImage,
            price: 2
        },
        {
            id: 6,
            name: '菜品3',
            image: dishImage,
            price: 2
        },
        {
            id: 7,
            name: '菜品1',
            image: dishImage,
            price: 2
        },
        {
            id: 8,
            name: '菜品2',
            image: dishImage,
            price: 2
        },
        {
            id: 9,
            name: '菜品3',
            image: dishImage,
            price: 2
        },
        {
            id: 10,
            name: '菜品1',
            image: dishImage,
            price: 2
        },
        {
            id: 11,
            name: '菜品2',
            image: dishImage,
            price: 2
        },
        {
            id: 12,
            name: '菜品3',
            image: dishImage,
            price: 2
        },
    ])
    const ordering = useSelector(state => state.ordering)
    const dispatch = useDispatch()

    const onScrollToLower = e => {
        console.log(e)
    }
    function getDishList(){
        let r = my.ix.getSysPropSync({key: 'ro.serialno'});
        let devicesSN = r?r.value:''

        api.get('secondParty/getDishes',{devicesSN,dishTypeId:ordering.typeId})
        .then(res => {
            console.log(res.data)
            if(res.result){
                setDishDataList(res.data)
            }
        })
        .catch(res=>{
            Taro.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
            })
        })
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
                            <View key={v.id} className='dish-item' data-id={v.id} onClick={() => { dishSelect(v) }} >
                                <Image className="image" src={v.image}/>
                                <View className="name" >{v.name}</View>
                                <View className="price">{v.price}</View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default DishList