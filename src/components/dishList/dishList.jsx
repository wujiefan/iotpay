import Taro, { useState, useEffect, useContext } from '@tarojs/taro';
import { ScrollView, View, Image } from '@tarojs/components';
import { orderingContext } from "../../pages/ordering/ordering";
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
    const { orderingData, dispatch } = useContext(orderingContext);
    const onScrollToLower = e => {
        console.log(e)
    }
    useEffect(() => {
        console.log('dishList')
    }, [orderingData.typeId])
    const dishSelect = (item)=>{
        let changeItem = orderingData.cartList.filter(v => { return v.id == item.id })
        if (changeItem.length !== 0){
            changeItem[0].count++
        }else{
            orderingData.cartList.push({...item,count:1})
        }
        dispatch('DISH_CHANGE')
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