import { DatabaseFilled, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, RadioChangeEvent, Select, Space } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ModelIcon from '../../components/ModelIcon'
import { RootState } from '../../store/store';
import './index.scss'

export default function CreateItem(props: { type: string }) {
    // radio存储公有私有信息
    const [radio, setRadio] = useState<boolean>(false);
    const userName = useSelector((state: RootState) => state.logInInformation.data.personalInformation?.userName);
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { type } = props;
    const typeName = type === 'model' ? '模型' : '数据集';
    const typeIcon = type === 'model' ? <div className='colorful'><ModelIcon /></div> : <DatabaseFilled className='createDatasetIcon' />;

    const onFinish = async (values: any) => {
        let postMessage = { ...values, type };
        console.log('Success:', postMessage);
        await axios.post('/api/createItem', postMessage);
        if(type === 'model'){
            navigate(`/model/${values.itemName}`)
        } else{
            navigate(`/dataset/${values.itemName}`)
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <div className='createItem0'>
            {typeIcon}
            <span className='boldFont fontSize30'>创建一个新的{typeName}存储库</span>
            <span className='createItemSubtitle'>存储库包含所有{typeName}文件，包括修订历史。</span>
            <Form
                layout="vertical"
                size='large'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ author: userName, isPrivate: false }}
                requiredMark={false}
            >
                <Form.Item >
                    <div className='createItemInput' >
                        <Form.Item
                            name='author'
                            label={<span style={{ fontSize: 16, marginBottom: -30 }}>创建者</span>}
                            style={{ width: '40%' }}
                        >
                            <Select
                                options={[
                                    { label: userName, value: userName },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className='splitLine' >/</div>
                        </Form.Item>
                        <Form.Item
                            name='itemName'
                            label={<span style={{ fontSize: 16, marginBottom: -30 }}>{typeName}名称</span>}
                            style={{ width: '60%' }}
                            rules={[{ required: true, message: `请输入${typeName}名称!` }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item name='isPrivate'>
                    <Radio.Group
                        onChange={(e: RadioChangeEvent) => { setRadio(e.target.value) }}
                        value={radio}
                        className='radioGroup'
                    >
                        <Space direction="vertical">
                            <Radio value={false} >
                                <div className='radioItem'>
                                    <EyeOutlined className='radioIcon' />
                                    <Space direction="vertical" size={1}>
                                        <span className='radioBoldFont'>公开</span>
                                        <span>互联网上的任何人可以看到此{typeName}。只有您（个人{typeName}）或您的组织成员（组织{typeName}）可以提交更新。</span>
                                    </Space>
                                </div>
                            </Radio>
                            <Radio value={true}>
                                <div className='radioItem'>
                                    <EyeInvisibleOutlined className='radioIcon' />
                                    <Space direction="vertical" size={2}>
                                        <span className='radioBoldFont'>私人</span>
                                        <span>只有您（个人{typeName}）或您的组织成员（组织{typeName}）可以查看，并提交更新此{typeName}。</span>
                                    </Space>
                                </div>
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button type="default" htmlType="submit" size='large'>
                        创建{typeName}
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}
