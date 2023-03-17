
// import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';
import HomeLoggedIn from './HomeLoggedIn';
// import { loginAsync } from '../../store/features/login/loginSlice';
import { RootState } from '../../store/store';

export default function Home() {
    const { loginStatus } = useSelector((state: RootState) => state.loginInformation)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     //临时设置自动登录
    //     dispatch(loginAsync("values.username", "values.password"))
    // }, [])
    return (
        loginStatus === 1 ?
            <HomeLoggedIn /> :
            <h1>Home Not Logged In</h1>
    )
}
