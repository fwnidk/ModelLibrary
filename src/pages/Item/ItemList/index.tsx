import { Space } from 'antd'
import './index.scss'
import React from 'react'

import ModelListItem from '../../../components/ModelListItem'
import ListPagination from '../ListPagination'
import ListHeader from '../ListHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import DatasetListItem from '../../../components/DatasetListItem'

export default function ItemList(props: { type: string }) {
    const { type } = props;
    let itemListArr: Array<any> = useSelector((state: RootState) => type === 'model' ? state.modelList.data.models : state.datasetList.data.datasets)
    return (
        <>
            <Space direction="vertical" className="rightSpace">
                <ListHeader type={type}></ListHeader>
                {type === 'model' ?
                <ModelListItem list={itemListArr}></ModelListItem>:
                <DatasetListItem list={itemListArr}></DatasetListItem>}
            </Space>
            <ListPagination type={type} ></ListPagination>
        </>
    )
}
