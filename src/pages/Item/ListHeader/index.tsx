import { Space, Input, Typography, Dropdown, Button, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDatasetListAsync } from '../../../store/features/dataset/datasetSlice';
import { setModelListAsync } from '../../../store/features/model/modelSlice';
import { RootState } from '../../../store/store';
import './index.scss'

const { Text } = Typography;
export default function ListHeader(props: { type: string }) {
    const { type } = props;
    let numTotalItems = useSelector((state: RootState) => type === 'model' ? state.modelList.data.numTotalItems : state.datasetList.data.numTotalItems)
    const dispatch = useDispatch()
    let [sortType, setSortType] = useState('Most Downloads')
    //搜索框改变信息后触发dispatch，发送filterByName: value 
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        label: "Most Downloads",
    }, {
        key: 'Recently Updated',
        label: "Recently Updated"
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

    return (
        <div className='listHeader'>
            <Space size="large" wrap >
                <Text className='fontSize20'>{type === 'model' ? 'Models' : 'Datasets'}</Text>
                <Text type="secondary" className='fontSize20'> {(numTotalItems || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                <Input placeholder='Filter by name' onChange={handleChange} className="inputStyle" ></Input>
            </Space>
            <Dropdown menu={{ items, onClick }} placement="bottomLeft" className='dropdownStyle'>
                <Button >Sort: {sortType}</Button>
            </Dropdown>
        </div>
    )
}