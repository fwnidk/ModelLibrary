import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { clearAllModelList, setModelListAsync } from '../../store/features/model/modelSlice'
import ModelLabel from './ModelLabel'
import ModelList from './ModelList'
import "./index.css"
import { useLocation } from 'react-router-dom'

export default function Model() {
    const dispatch = useDispatch()
    let location = useLocation()
    useEffect(() => {
        if (location.state === null) {
            dispatch(setModelListAsync({ activeFilters: {}, otherOptions: {}, first: true }))
        } else {
            const { currCategory, label } = location.state
            dispatch(setModelListAsync({ activeFilters: { [currCategory]: label }, otherOptions: {}, first: false }))
        }
        return () => {
            dispatch(clearAllModelList())
        }
    }, [dispatch, location.state])

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