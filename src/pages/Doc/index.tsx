import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../app/axiosInterceptor'

export default function Doc() {
    let [docData, setDocData] = useState('未登录')
    useEffect(() => {
        axiosInstance.get('api/test?abc=123 123').then((res) => {
            if (res.data.code === 0) {
                setDocData('未登录')
            } else {
                setDocData('已登录')
            }
        })
    })
    return <>
        <h1>{docData}</h1>
    </>
}
