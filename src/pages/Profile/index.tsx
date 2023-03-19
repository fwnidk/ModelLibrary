import { DatabaseFilled } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import DatasetListItem from '../../components/DatasetListItem';
import ModelIcon from '../../components/ModelIcon';
import ModelListItem from '../../components/ModelListItem';
import PersonalIcon from '../../components/PersonalIcon';
import { setPersonalFilesAsync } from '../../store/features/personalFiles/personalFilesSlice';
import { RootState } from '../../store/store';
import './index.scss'

export default function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const personalFilesList: Array<any> = useSelector((state: RootState) => state.personalFiles.list)
    const personalInformation: LoginType.PersonalInformation = useSelector((state: RootState) => state.loginInformation.personalInformation)
    useEffect(() => {
        dispatch(setPersonalFilesAsync())
    }, [dispatch, personalInformation])
    const modelList = personalFilesList.filter((item) => item.type === 'model')
    const datasetList = personalFilesList.filter((item) => item.type === 'dataset')

    return (
        <Row className='profile'>
            <Col span={6} className="profileLeft">
                <Space direction='vertical' size='large' >
                    <PersonalIcon avatarURL={personalInformation.avatar} size={192} />
                    <span className='boldFont fontSize24'>{personalInformation.userName}</span>
                    <Space wrap>
                        <Button type='primary' >编辑个人资料</Button>
                        <Button type='primary' onClick={() => { navigate('/setting') }}>设置</Button>
                    </Space>
                    <Space direction='vertical' size='small'>
                        <span className='boldFont'>研究方向</span>
                        <span>{personalInformation.reserchInterest}</span>
                    </Space>
                    <Space direction='vertical' size='small'>
                        <span className='boldFont'>组织</span>
                        <span>{personalInformation.team}</span>
                    </Space>
                </Space>
            </Col>
            <Col span={18} className="profileRight0">
                <Space direction='vertical'>
                    <div className='profileRight1'>
                        <Space className='profileRight2'>
                            <ModelIcon />
                            模型
                            {modelList.length}
                        </Space>
                        <ModelListItem list={modelList}></ModelListItem>
                    </div>
                    <div>
                        <Space className='profileRight2'>
                            <DatabaseFilled className='profileRight3' />
                            数据集
                            {datasetList.length}
                        </Space>
                        <DatasetListItem list={datasetList}></DatasetListItem>
                    </div>
                </Space>
            </Col>
        </Row >
    )
}
