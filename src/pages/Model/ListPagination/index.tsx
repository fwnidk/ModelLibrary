import { Pagination, PaginationProps } from 'antd'
import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setModelListAsync } from '../../../store/features/model/modelSlice'
import { RootState } from '../../../store/store'
import './index.scss'

export default function ListPagination() {

    let dispatch = useDispatch()
    let [numTotalItems, pageIndex] = useSelector((state: RootState) => {
        return [state.modelList.data.numTotalItems, state.modelList.data.otherOptions.pageIndex]
    })

    const handleChangePagination: PaginationProps['onChange'] = useCallback((page:number) => {
        console.log("page", page);
        dispatch(setModelListAsync({ activeFilters: {}, otherOptions: { pageIndex: page }, first: false }))
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
