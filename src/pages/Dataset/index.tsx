import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { clearAllDatasetList, setDatasetListAsync } from '../../store/features/dataset/datasetSlice'
import DatasetLabel from './DatasetLabel'
import DatasetList from './DatasetList'
import { useLocation } from 'react-router-dom'

export default function Dataset() {
    const dispatch = useDispatch()
    let location = useLocation()
    useEffect(() => {
        if (location.state === null) {
            dispatch(setDatasetListAsync({ activeFilters: {}, otherOptions: {}, first: true }))
        } else {
            const { currCategory, label } = location.state
            dispatch(setDatasetListAsync({ activeFilters: { [currCategory]: label }, otherOptions: {}, first: false }))
        }
        return () => {
            dispatch(clearAllDatasetList())
        }
    }, [dispatch, location.state])

    return (
        <>
            <Row className='rowStyle'>
                <Col span={7} className="left"  >
                    <DatasetLabel locationState={location.state || undefined}></DatasetLabel>
                </Col >
                <Col span={17} className="right" >
                    <DatasetList></DatasetList>
                </Col>
            </Row>
        </>
    )
}