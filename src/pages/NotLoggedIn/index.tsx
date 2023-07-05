import React, { useEffect } from 'react'
import "./index.scss"
import { useNavigate } from 'react-router'

export default function NotLoggedIn() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate("/logIn", {
                replace: true
            })
        }, 5000)
    })
    return (
        <div className='notLoggedIn'>用户未登录，五秒后跳转至登录页面</div>
    )
}
