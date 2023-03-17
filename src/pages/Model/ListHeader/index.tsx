import { Space, Input, Typography, Dropdown, Button, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModelListAsync } from '../../../store/features/model/modelSlice';
import { RootState } from '../../../store/store';
import './index.css'

const { Text } = Typography;
export default function ListHeader() {
    let numTotalItems = useSelector((state: RootState) => state.modelList.numTotalItems)
    const dispatch = useDispatch()
    let [sortType, setSortType] = useState('Most Downloads')
    //搜索框改变信息后触发dispatch，发送filterByName: value 
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        dispatch(setModelListAsync({ activeFilters: {}, otherOptions: { filterByName: value }, first: false }))
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
            dispatch(setModelListAsync({ activeFilters: {}, otherOptions: { sortType: key }, first: false }))
        }
    }

    return (
        <div className='listHeader'>
            <Space size="large" wrap >
                <Text className='fontSize20'>Models</Text>
                <Text type="secondary" className='fontSize20'> {(numTotalItems || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                <Input placeholder='Filter by name' onChange={handleChange} className="inputStyle" ></Input>
            </Space>
            <Dropdown menu={{ items, onClick }} placement="bottomLeft" className='dropdownStyle'>
                <Button >Sort: {sortType}</Button>
            </Dropdown>
        </div>
    )
}