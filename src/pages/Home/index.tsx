
// import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';
import HomeLoggedIn from './HomeLoggedIn';
// import { logInAsync } from '../../store/features/login/loginSlice';
import { RootState } from '../../store/store';

export default function Home() {
    const { logInStatus } = useSelector((state: RootState) => state.logInInformation)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     //临时设置自动登录
    //     dispatch(logInAsync("values.username", "values.password"))
    // }, [])
    return (
        logInStatus === 1 ?
            <HomeLoggedIn /> :
            <h1>Home Not Logged In</h1>
    )
}
