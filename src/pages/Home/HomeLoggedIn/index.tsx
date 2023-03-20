import { LineChartOutlined, MailFilled, PlusOutlined, SettingFilled } from '@ant-design/icons'
import { Avatar, Button, Col, Dropdown, MenuProps, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getTimeAgoString } from '../../../app/getTimeAgoString'
import { setPersonalFilesAsync } from '../../../store/features/personalFiles/personalFilesSlice'
import { setTrendingListAsync } from '../../../store/features/trendingList/trendingListSlice'
import { RootState } from '../../../store/store'
import DatasetItem from '../../../components/DatasetItem'
import ModelItem from '../../../components/ModelItem'
import UpdateMessage from '../../../components/UpdateMessage'
import './index.scss'
import { ReactComponent as ProfileIcon } from "../../../app/icons/profile.svg"

export default function HomeLoggedIn() {
    const personalInformation: LoginType.PersonalInformation = useSelector((state: RootState) => state.loginInformation.personalInformation)
    const personalFilesList: Array<any> = useSelector((state: RootState) => state.personalFiles.list)
    const trendingList: Array<any> = useSelector((state: RootState) => state.trendingList.list)
    const [currCategory, setCurrCategory] = useState<number>(0)
    const [currTrendingCategory, setCurrTrendingCategory] = useState<number>(0)
    const buttonArr = ["所有", "Models", "Datasets", "组织"];
    const buttonArr2 = ["所有", "Models", "Datasets"];
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPersonalFilesAsync())
        dispatch(setTrendingListAsync())
        // console.log(personalFilesList)
    }, [dispatch])

    const getHomeLoggedInItem = () => {
        let prevType: string = ''
        let prevtimeAgoString: string = ''
        let res: Array<JSX.Element> = [];
        let index = 0;
        personalFilesList.forEach((item) => {
            if ((item.type === 'model' && (currCategory === 2 || currCategory === 3)) ||
                (item.type === 'dataset' && (currCategory === 1 || currCategory === 3))) {
                return;
            }
            let timeAgoString = getTimeAgoString(item.lastModified);
            if (item.type !== prevType || timeAgoString !== prevtimeAgoString) {
                prevType = item.type;
                prevtimeAgoString = timeAgoString;
                res.push(<UpdateMessage type={item.type} lastModified={timeAgoString} key={index++} />)
            }
            if (getItemCard(item) !== null) {
                res.push(getItemCard(item) as JSX.Element)
            }
        })
        return res;

        function getItemCard(item: any): JSX.Element | null {
            if (item.type === 'model' && (currCategory === 0 || currCategory === 1)) {
                return <ModelItem item={item} key={index++} />
            }
            if (item.type === 'dataset' && (currCategory === 0 || currCategory === 2)) {
                return <DatasetItem item={item} key={index++} />
            }
            else {
                return null
            }
        }
    }

    const getTrendingList = trendingList.map((item, index) => {
        if (item.type === 'model' && (currTrendingCategory === 0 || currTrendingCategory === 1)) {
            return <ModelItem item={item} key={index} />
        } else if (item.type === 'dataset' && (currTrendingCategory === 0 || currTrendingCategory === 2)) {
            return <DatasetItem item={item} key={index} />
        }
        return null
    })


    const createNewItem = () => {
        console.log("createNewItem");
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (<NavLink to="/createModel">
                模型
            </NavLink>
            ),
        },
        {
            key: '2',
            label: (<NavLink to="/createDataset">
                数据集
            </NavLink>),
        },
    ]

    return (
        <Row className='homeLoggedIn'>
            <Col span={4} className="homeLoggedIn1">
                <Space direction='vertical' size={30}>
                    <Dropdown menu={{ items }} placement="bottomLeft">
                        <Button onClick={createNewItem}><PlusOutlined />创建</Button>
                    </Dropdown>
                    <Space direction='vertical' size='small'>
                        <div className='homeLoggedIn1Title'>
                            {personalInformation.userName}
                        </div>
                        <NavLink to='/profile' style={{ display: 'flex', alignItems: 'center', color: "#000" }}>
                            <ProfileIcon style={{ width: 16, height: 16, marginLeft: -3, marginRight: 8, color: '#9599a0' }} />
                            简介
                        </NavLink>
                        <span><MailFilled className='grayIcon' /> 通知 (0)</span>
                        <NavLink to='/setting' style={{ color: "#000" }}><SettingFilled className='grayIcon' /> 设置</NavLink>
                    </Space>
                    <Space direction='vertical' size='small'>
                        <div className='homeLoggedIn1Title'>
                            组织
                        </div>
                    </Space>
                </Space>
            </Col>
            <Col span={14} className="homeLoggedIn2">
                <div className='space0'>
                    <Space direction="horizontal" size="small" className='space0-1'>
                        <Avatar src={personalInformation.avatar} />
                        {personalInformation.userName}的动态
                    </Space>
                    <Space direction="horizontal" size="small" className='space0-2'>
                        {buttonArr2.map((item, index) => {
                            return (
                                <Button
                                    size='small'
                                    shape="round"
                                    type={currCategory === index ? "primary" : "text"}
                                    key={index}
                                    onClick={() => { setCurrCategory(index) }}>
                                    {item}
                                </Button>
                            )
                        })}
                    </Space>
                    {personalFilesList.length !== 0 ? getHomeLoggedInItem() : <h1>暂无动态</h1>}
                </div>
            </Col>
            <Col span={6} className="homeLoggedIn3">
                <div className='space0'>
                    <Space direction="horizontal" size="small" className='space0-1'>
                        <LineChartOutlined />
                        最近七天
                    </Space>
                    <Space direction="horizontal" size="small" className='space0-2'>
                        {buttonArr.map((item, index) => {
                            return (
                                <Button
                                    size='small'
                                    shape="round"
                                    type={currTrendingCategory === index ? "primary" : "text"}
                                    key={index}
                                    onClick={() => { setCurrTrendingCategory(index) }}>
                                    {item}
                                </Button>
                            )
                        })}
                    </Space>
                    {trendingList.length !== 0 ? getTrendingList : <h1>暂无信息</h1>}
                </div>

            </Col>
        </Row>
    )
}
