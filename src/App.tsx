import React, { useEffect } from 'react';
import './index.scss'
import GlobalHeader from './components/GlobalHeader';
import { ConfigProvider, Layout } from 'antd';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import './app/mock'
import  { getPersonalInformationAsync } from './store/features/personalInformation/personalInformationSlice';

const { Footer, Content } = Layout;

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPersonalInformationAsync())
    }, [dispatch])
    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#4c4e5e',
            },
        }}>
            <div className="app">
                <Layout  >
                    <GlobalHeader />
                    <Content className='contentStyle' >
                        <Outlet />
                    </Content>
                    <Footer className='footerStyle' >©2023 Created by fwnidk  华中科技大学机械科学与工程学院</Footer>
                </Layout>
            </div>
        </ConfigProvider>
    );
}

export default App;
