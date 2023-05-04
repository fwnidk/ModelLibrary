import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllModelList, setModelLabelAsync, setModelListAsync } from '../../store/features/model/modelSlice'
import { clearAllDatasetList, setDatasetLabelAsync, setDatasetListAsync } from '../../store/features/dataset/datasetSlice'
import ItemLabel from './ItemLabel'
import ItemList from './ItemList'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../store/store'
import LoadingStatus from '../../components/LoadingStatus'
import ErrorStatus from '../../components/ErrorStatus'
import './index.scss'

export default function Item(props: { type: string }) {
    const { type } = props
    const dispatch = useDispatch()
    let location = useLocation()
    const { isLoading1, isLoading2, isError } = useSelector((state: RootState) => type === 'model' ? state.modelList : state.datasetList)
    useEffect(() => {
        console.log('mount: ', type);
        if (type === 'model') {
            if (location.state === null) {
                dispatch(setModelListAsync({ activeFilters: {}, otherOptions: {}, first: true }))
            } else {
                const { currCategory, label } = location.state
                dispatch(setModelListAsync({ activeFilters: { [currCategory]: label }, otherOptions: {}, first: true }))
            }
            dispatch(setModelLabelAsync())
        } else {
            if (location.state === null) {
                dispatch(setDatasetListAsync({ activeFilters: {}, otherOptions: {}, first: true }))
            } else {
                const { currCategory, label } = location.state
                dispatch(setDatasetListAsync({ activeFilters: { [currCategory]: label }, otherOptions: {}, first: true }))
            }
            dispatch(setDatasetLabelAsync())
        }
        return () => {
            console.log('unmount');
            if (type === 'model') {
                dispatch(clearAllModelList())
            } else {
                dispatch(clearAllDatasetList())
            }
        }
    }, [type])
    if (isLoading1 || isLoading2) {
        return <LoadingStatus />
    }
    if (isError) {
        return <ErrorStatus />
    }
    return (
        <>
            <Row className='rowStyle' >
                <Col span={7} className="left"  >
                    <ItemLabel type={type} locationState={location.state || undefined}></ItemLabel>
                </Col >
                <Col span={17} className="right" >
                    <ItemList type={type}></ItemList>
                </Col>
            </Row>
        </>
    )
}