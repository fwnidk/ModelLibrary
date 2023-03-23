import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllModelList, setModelLabelAsync, setModelListAsync } from '../../store/features/model/modelSlice'
import ModelLabel from './ModelLabel'
import ModelList from './ModelList'
import './index.scss'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../store/store'
import LoadingStatus from '../../components/LoadingStatus'
import ErrorStatus from '../../components/ErrorStatus'

export default function Model() {
    const dispatch = useDispatch()
    let location = useLocation()
    const { isLoading1, isLoading2, isError } = useSelector((state: RootState) => state.modelList)
    useEffect(() => {
        // console.log(location,isLoading, isError, data);
        if (location.state === null) {
            dispatch(setModelListAsync({ activeFilters: {}, otherOptions: {}, first: true }))
        } else {
            const { currCategory, label } = location.state
            dispatch(setModelListAsync({ activeFilters: { [currCategory]: label }, otherOptions: {}, first: false }))
        }
        dispatch(setModelLabelAsync())
        return () => {
            dispatch(clearAllModelList())
        }
    }, [])
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
                    <ModelLabel locationState={location.state || undefined}></ModelLabel>
                </Col >
                <Col span={17} className="right" >
                    <ModelList></ModelList>
                </Col>
            </Row>
        </>
    )
}