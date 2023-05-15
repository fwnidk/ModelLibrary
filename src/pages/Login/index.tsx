import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input, Space, Typography, } from 'antd'
import './index.scss'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logInAsync } from '../../store/features/logIn/logInSlice';
import { RootState } from '../../store/store';

export default function LogIn() {
    const dispatch = useDispatch()
    const { code, msg } = useSelector((state: RootState) => state.logIn.responseData)
    const navigate = useNavigate()
    useEffect(() => {
        if (code === 1) {
            navigate('/welcome')
        }
    }, [code, navigate])

    const onFinish = async (values: any) => {
        await dispatch(logInAsync(values))
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // const handleClickRegister = () => {
    //     console.log("handle click register");
    // }
    return (
        <div className='logInBackground' >
            <div className='logInFormCard'>
                <Space direction='vertical' align="center">
                    <Typography.Title level={2}>
                        登录
                    </Typography.Title>
                    <span style={{ color: "#66696c" }}>没有账号？<Link to="/signUp">注册</Link></span>
                </Space>
                <Form
                    name="normal_logIn"
                    className="logInForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    size="large"
                    requiredMark='optional'
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                        className="usernameForm"
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: '请输入密码!' }]}
                        className="passwordForm"
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    {code === 0 && msg !== 'no login' && <Form.Item className="errorMessage">
                        <Alert message={msg} type="error" />
                    </Form.Item>}

                    <Form.Item>
                        <Button type="default" htmlType="submit" className="logInButton">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                {/* <Link to="" className="logIn-form-forgot">
                    忘记密码？
                </Link> */}
            </div>
        </div>
    )
}
