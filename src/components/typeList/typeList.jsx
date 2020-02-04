import Taro, { useState, useContext } from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';
import { orderingContext } from "../../pages/ordering/ordering";
import './typeList.less';

function TypeList(){
    const [typeDataList, setTypeDataList] = useState([
        {
            id:1,
            name:'分类1'
        },
        {
            id: 2,
            name: '分类2'
        },
        {
            id: 3,
            name: '分类3'
        },
    ])
    const [activeIndex, setActiveIndex] = useState(0)
    const {orderingData, dispatch } = useContext(orderingContext);
    const onScrollToLower = e => {
        console.log(e)
    }
    const typeSelect = (id,idx)=>{
        orderingData.typeId = id
        dispatch('TYPE_CHANGE')
        setActiveIndex(idx)
    }
    return (
        <ScrollView
            className='type-bar'
            scrollY
            scrollWithAnimation
            onScrollToLower={onScrollToLower}
        >
            <View className="type-list">
                {
                    typeDataList.map((v,i)=>{
                        return (
                            <View key={v.id} onClick={() => { typeSelect(v.id,i) }} className={'type-item '+(activeIndex===i?'active':'')} data-id={v.id}>{v.name}</View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default TypeList