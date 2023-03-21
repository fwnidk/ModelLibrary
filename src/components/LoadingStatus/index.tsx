import { Spin } from 'antd'
import React from 'react'
import './index.scss'

export default function LoadingStatus() {
    return (
        <div className='loadingStatus'>
            <Spin />
        </div>
    )
}
