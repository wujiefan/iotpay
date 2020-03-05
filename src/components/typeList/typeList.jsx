import Taro, { useState,useEffect } from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';
import { useSelector,useDispatch } from '@tarojs/redux'
import api from '../../services/api'

import './typeList.less';
import { CHANGETYPE } from '../../constants/oredring'

function TypeList(){
    const [typeDataList, setTypeDataList] = useState([])
    const [activeIndex, setActiveIndex] = useState(-1)
    const ordering = useSelector(state => state.ordering)
    const global = useSelector(state => state.global)
    const dispatch = useDispatch()

    const onScrollToLower = e => {
        console.log(e)
    }
    const typeSelect = (id,idx)=>{
        dispatch({type:CHANGETYPE,typeId:id})
        setActiveIndex(idx)
    }
    function getTypeList(){
        api.get('secondParty/alipay/dishTypes',{deviceSN:global.deviceSN})
        .then(res => {
            console.log(res)
            if(res.result){
                setTypeDataList(res.data)
                typeSelect(res.data[0].id,0)
            }
        }).catch((e) => {});
    }
    useEffect(()=>{
        getTypeList()
    },[])
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