import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input, Space, Typography, } from 'antd'
import './index.scss'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../store/features/login/loginSlice';
import { RootState } from '../../store/store';
import cookie from 'react-cookies'

export default function Login() {
    const dispatch = useDispatch()
    const loginStatus: LoginType.LoginStatus = useSelector((state: RootState) => state.loginInformation.loginStatus)
    const navigate = useNavigate()
    useEffect(() => {
        console.log('loginStatus: ', loginStatus);
        if (loginStatus === 1) {
            navigate('/welcome')
        }
    }, [loginStatus, navigate])

    const onFinish = async (values: any) => {
        await dispatch(loginAsync(values.username, values.password))
        cookie.save('userInfo', values.username, { path: '/' })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // const handleClickRegister = () => {
    //     console.log("handle click register");
    // }
    return (
        <div className='loginBackground' >
            <div className='loginFormCard'>
                <Space direction='vertical' align="center">
                    <Typography.Title level={2}>
                        登录
                    </Typography.Title>
                    <span>没有账号？<Link to="">注册</Link></span>
                </Space>
                <Form
                    name="normal_login"
                    className="loginForm"
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

                    {(loginStatus === 2) && <Form.Item className="errorMessage">
                        <Alert message="用户名或密码不正确。" type="error" />
                    </Form.Item>}

                    <Form.Item>
                        <Button type="default" htmlType="submit" className="loginButton">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                {/* <Link to="" className="login-form-forgot">
                    忘记密码？
                </Link> */}

            </div>
        </div>
    )
}
