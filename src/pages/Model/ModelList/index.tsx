import { Space } from 'antd'
import './index.scss'
import React from 'react'

import ModelListItem from '../../../components/ModelListItem'
import ListPagination from '../ListPagination'
import ListHeader from '../ListHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

export default function ModelList() {
    let modelListArr: Array<ModelType.ModelItem> = useSelector((state: RootState) => state.modelList.data.models)
    return (
            <>
                <Space direction="vertical" className="rightSpace">
                    <ListHeader></ListHeader>
                    <ModelListItem list={modelListArr}></ModelListItem>
                </Space>
                <ListPagination ></ListPagination>
            </> 
    )
}
