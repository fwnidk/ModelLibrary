import { Space, Input, Typography, Dropdown, Button, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDatasetListAsync } from '../../../store/features/dataset/datasetSlice';
import { setModelListAsync } from '../../../store/features/model/modelSlice';
import { RootState } from '../../../store/store';
import './index.scss'
import { debounce } from '../../../app/debounce';

const { Text } = Typography;
export default function ListHeader(props: { type: string }) {
    const { type } = props;
    let numTotalItems = useSelector((state: RootState) => type === 'model' ? state.modelList.data.numTotalItems : state.datasetList.data.numTotalItems)
    const dispatch = useDispatch()
    let [sortType, setSortType] = useState('Most Downloads')
    //搜索框改变信息后触发dispatch，发送filterByName: value 
    function handleChange(e: any) {
        const { value } = e.target
        if (type === 'model') {
            dispatch(setModelListAsync({ activeFilters: {}, otherOptions: { filterByName: value }, first: false }))
        } else {
            dispatch(setDatasetListAsync({ activeFilters: {}, otherOptions: { filterByName: value }, first: false }))
        }
    }
    // 初始化dropdown的信息
    const items: MenuProps['items'] = [{
        key: 'Most Downloads',
        label: "下载量",
    }, {
        key: 'Recently Updated',
        label: "最近更新"
    },]
    //dropdown点击事件，触发dispatch，发送
    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key !== sortType) {
            setSortType(key);
            if (type === 'model') {
                dispatch(setModelListAsync({ activeFilters: {}, otherOptions: { sortType: key }, first: false }))
            } else {
                dispatch(setDatasetListAsync({ activeFilters: {}, otherOptions: { sortType: key }, first: false }))
            }
        }
    }
    const getLabel = (key: string): string => {
        for (let i of items) {
            if (i?.key === key) {
                return (i as any).label
            }
        }
        return ''
    }

    return (
        <div className='listHeader'>
            <Space size="large" wrap >
                <Text className='fontSize20'>{type === 'model' ? '模型' : '数据集'}</Text>
                <Text type="secondary" className='fontSize20'> {(numTotalItems || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                <Input placeholder='Filter by name' onChange={debounce(handleChange, 500)} onPressEnter={handleChange} className="inputStyle" ></Input>
            </Space>
            <Dropdown menu={{ items, onClick }} placement="bottomLeft" className='dropdownStyle'>
                <Button >排序方式：{getLabel(sortType)}</Button>
            </Dropdown>
        </div>
    )
}