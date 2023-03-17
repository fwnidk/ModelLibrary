import { Space, Input, Typography, Dropdown, Button, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDatasetListAsync } from '../../../store/features/dataset/datasetSlice';
import { RootState } from '../../../store/store';

const { Text } = Typography;
export default function ListHeader() {
    let numTotalItems = useSelector((state: RootState) => state.datasetList.numTotalItems)
    const dispatch = useDispatch()
    let [sortType, setSortType] = useState('Most Downloads')

    //搜索框改变信息后触发dispatch，发送filterByName: value 
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        dispatch(setDatasetListAsync({ activeFilters: {}, otherOptions: { filterByName: value }, first: false }))
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
            dispatch(setDatasetListAsync({ activeFilters: {}, otherOptions: { sortType: key }, first: false }))
        }
    }

    return (
        <div className='listHeader'>
            <Space size="large" wrap >
                <Text className='fontSize20'>Datasets</Text>
                <Text type="secondary" className='fontSize20'> {(numTotalItems || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}</Text>
                <Input placeholder='Filter by name' onChange={handleChange} className="inputStyle" ></Input>
            </Space>
            <Dropdown menu={{ items, onClick }} placement="bottomLeft" className='dropdownStyle'>
                <Button >Sort: {sortType}</Button>
            </Dropdown>
        </div>
    )
}
