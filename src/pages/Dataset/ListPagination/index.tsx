import { Pagination, PaginationProps } from 'antd'
import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setDatasetListAsync } from '../../../store/features/dataset/datasetSlice'
import { RootState } from '../../../store/store'

export default function ListPagination() {

    let dispatch = useDispatch()
    let [numTotalItems, pageIndex] = useSelector((state: RootState) => {
        return [state.datasetList.numTotalItems, state.datasetList.otherOptions.pageIndex]
    })

    const handleChangePagination: PaginationProps['onChange'] = useCallback((page: number) => {
        console.log("page", page);
        dispatch(setDatasetListAsync({ activeFilters: {}, otherOptions: { pageIndex: page }, first: false }))
    }, [dispatch])

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
