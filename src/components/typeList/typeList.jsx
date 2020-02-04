import Taro, { useState,useEffect } from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';
import { useSelector,useDispatch } from '@tarojs/redux'
import api from '../../services/api'

import './typeList.less';
import { CHANGETYPE } from '../../constants/oredring'

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
    const [activeIndex, setActiveIndex] = useState(-1)
    const ordering = useSelector(state => state.ordering)
    const dispatch = useDispatch()

    const onScrollToLower = e => {
        console.log(e)
    }
    const typeSelect = (id,idx)=>{
        dispatch({type:CHANGETYPE,typeId:id})
        setActiveIndex(idx)
    }

    function getTypeList(){
        let r = my.ix.getSysPropSync({key: 'ro.serialno'});
        let devicesSN = r?r.value:''
        api.get('secondParty/dishTypes',{devicesSN})
        .then(res => {
            console.log(res.data)
            typeSelect(1,0)
            if(res.result){
                setTypeDataList(res.data)
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