import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input, Space, Typography, } from 'antd'
import './index.scss'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { signUpAsync } from '../../store/features/signUp/signUpSlice';

export default function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signUpStatus: number = useSelector((state: RootState) => state.signUpInformation.signUpStatus)
    useEffect(() => {
        console.log('signUpStatus', signUpStatus);
        if (signUpStatus === 1) {
            console.log("sign up success");
        }
    }, [navigate, signUpStatus])

    const onFinish = (values: any) => {
        console.log(values);
        dispatch(signUpAsync(values));
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
                        注册账号
                    </Typography.Title>
                    <span style={{ color: "#66696c" }}>已有账号？<Link to="/logIn">登录</Link></span>
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
                    autoComplete="new-password"
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{ required: true, message: '请输入用户名!' }, { min: 2, message: '用户名不能小于2' }]}
                        className="usernameForm"
                        hasFeedback
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名" autoComplete="new-password" />
                    </Form.Item>
                    {(signUpStatus === 2) && <Form.Item className="errorMessage">
                        <Alert message="用户名已被注册。" type="error" />
                    </Form.Item>}
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: '请输入密码!' }, { min: 6, message: '密码长度不能小于6' }]}
                        className="usernameForm"
                        hasFeedback
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="密码"
                            autoComplete="new-password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: '请再次确认密码！' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致!'));
                                },
                            }),
                        ]}
                        className="passwordForm"
                        hasFeedback
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="密码"
                            autoComplete="new-password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="default" htmlType="submit" className="logInButton">
                            下一步
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
