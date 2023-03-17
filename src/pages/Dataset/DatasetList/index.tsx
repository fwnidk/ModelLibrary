import { Space } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'


import ListHeader from '../ListHeader'
import DatasetListItem from '../../../components/DatasetListItem'
import ListPagination from '../ListPagination'

export default function DatasetList() {
    const loadingCompleted = useSelector((state: RootState) => state.datasetList.loadingCompleted)
    let datasetListArr: Array<DatasetType.DatasetItem> = useSelector((state: RootState) => state.datasetList.datasets)

    return (
        loadingCompleted ?
            <>
                <Space direction="vertical" className="rightSpace">
                    <ListHeader></ListHeader>
                    <DatasetListItem list={datasetListArr}></DatasetListItem>
                </Space>
                <ListPagination></ListPagination>
            </> :
            <div className="rightSpace" />
    )
}
