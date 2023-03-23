import { Pagination, PaginationProps } from 'antd'
import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setDatasetListAsync } from '../../../store/features/dataset/datasetSlice'
import { setModelListAsync } from '../../../store/features/model/modelSlice'
import { RootState } from '../../../store/store'
import './index.scss'

export default function ListPagination(props: { type: string }) {
    const { type } = props;
    let dispatch = useDispatch()
    let [numTotalItems, pageIndex] = useSelector((state: RootState) => {
        return type === 'model' ?
            [state.modelList.data.numTotalItems, state.modelList.data.otherOptions.pageIndex] :
            [state.datasetList.data.numTotalItems, state.datasetList.data.otherOptions.pageIndex]
    })

    const handleChangePagination: PaginationProps['onChange'] = useCallback((page: number) => {
        console.log("page", page);
        if(type === 'model') {
            dispatch(setModelListAsync({ activeFilters: {}, otherOptions: { pageIndex: page }, first: false }))
        } else {
            dispatch(setDatasetListAsync({ activeFilters: {}, otherOptions: { pageIndex: page }, first: false }))
        }
    }, [dispatch, type])

    return (
        <Pagination
            current={pageIndex}
            defaultPageSize={30}
            onChange={handleChangePagination}
            total={numTotalItems}
            showSizeChanger={false}
            className="listPagination" />
    )
}
