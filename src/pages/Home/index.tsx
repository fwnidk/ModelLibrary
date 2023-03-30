
// import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import HomeLoggedIn from './HomeLoggedIn';
// import { logInAsync } from '../../store/features/login/loginSlice';
import { RootState } from '../../store/store';
import LoadingStatus from '../../components/LoadingStatus';
import ErrorStatus from '../../components/ErrorStatus';

export default function Home() {
    const { data, isLoading, isError } = useSelector((state: RootState) => state.logInInformation)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     //临时设置自动登录
    //     dispatch(logInAsync("values.username", "values.password"))
    // }, [])
    if (isLoading) {
        return <LoadingStatus />
    }
    if (isError) {
        return <ErrorStatus />
    }
    return (
        data.logInStatus === 1 ?
            <HomeLoggedIn /> :
            <h1>Home Not Logged In</h1>
    )
}
