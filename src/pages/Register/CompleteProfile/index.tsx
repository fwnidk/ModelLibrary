import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Space, Typography, Upload, UploadProps, } from 'antd'
import { useDispatch } from 'react-redux';
import { submitRegisterFormAsync } from '../../../store/features/register/registerSlice';
import './index.scss'
import { RcFile } from 'antd/es/upload';
// import '../../../app/icons/mock'
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';

export default function CompleteProfile() {
    const [file, setFile] = useState<any>(null);
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(file);
    }, [file])
    const onFinish = (values: any) => {
        console.log(values, file)
        let formData = new FormData();
        formData.append('team', values.team);
        formData.append('avatar', file);
        // console.log('formData: ', formData, formData.get('team'), formData.get('avatar'));
        dispatch(submitRegisterFormAsync(formData));
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('你只能上传 JPG/PNG 图片文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('上传的图片必须小于2MB!');
        }
        return false;
    };
    const handleFileChange = (info: any) => {
        setFile(info.file);
    };
    const uploadOptions: UploadProps = {
        name: 'file',
        beforeUpload: beforeUpload,
        maxCount: 1,
        onChange: handleFileChange
        // action: '/api/avatarPost',
        // headers: {
        //     authorization: 'authorization-text',
        // },
    }
    // const handleChange: UploadProps['onChange'] = (info) => {
    //     if (newFile.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj as RcFile, (url) => {
    //             setImageUrl(url);
    //         });
    //     }
    // };
    // const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result as string));
    //     reader.readAsDataURL(img);
    // };

    return (
        <div className='logInFormCard'>
            <Space direction='vertical' align="center">
                <Typography.Title level={2}>
                    完善个人信息
                </Typography.Title>
            </Space>
            <Form
                name="normal_logIn"
                className="logInForm"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                size="large"
                autoComplete="new-password"
            >
                <Form.Item
                    name="avatar"
                    label={<span>用户头像<span className='optionalFont'>（可选）</span></span>}
                    className="usernameForm"
                    hasFeedback
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload {...uploadOptions}>
                        <Button icon={<UploadOutlined />}>点击上传图片</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="team"
                    label={<span>组织<span className='optionalFont'>（可选）</span></span>}
                    className="usernameForm"
                >
                    <Input placeholder="组织" autoComplete="new-password" />
                </Form.Item>
                <Form.Item
                    name="researchInterests"
                    label={<span>研究方向<span className='optionalFont'>（可选）</span></span>}
                    className="passwordForm"
                >
                    <TextArea rows={4} placeholder="研究方向" autoComplete="new-password" />
                </Form.Item>
                <Form.Item>
                    <Button type="default" htmlType="submit" className="logInButton">
                        创建账号
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
