import { Button, Form, Input, Space } from 'antd';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router'
// import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import './index.scss'
import { FileOutlined } from '@ant-design/icons';

export default function DeleteFile() {
    const location = useLocation().pathname;
    const navigate = useNavigate()
    //测试时使用
    //更改后的代码
    const locationArr = decodeURIComponent(location).split('/')
    const filePathWithItemName = useMemo(() => {
        const arr = locationArr.slice(5);
        arr.unshift(locationArr[2]);
        return arr.join('/')
    }, [locationArr])
    const filePath = locationArr.slice(5).join('/')

    const onFinish = (values: any) => {
        if (values.codeEditorCommit === undefined || values.codeEditorCommit === '') {
            values.codeEditorCommit = `Delete ${filePath} `
        }
        console.log('onFinish', values);
    }
    const onFinishFailed = (error: any) => {
        console.log(error);
    }


    return (
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size='large'
            colon={false}
            requiredMark={false}
        >
            <Form.Item
                label={<span className='codeEditorItemName'>{`${filePathWithItemName}`}</span>}
            >
            </Form.Item>
            <div className='uploadCardBorder'>
                <div className='uploadCardHeader'><div className='deleteCardTitle'>删除文件</div></div>
                <Space direction='vertical' className='deleteCard' size={15} >
                    <span>以下文件将被删除：</span>
                    <Space className='deleteCardFileList' >
                        <FileOutlined />
                        {filePath}
                    </Space>
                </Space>
                <div className='codeEditorCommit'>
                    <Form.Item
                        name='codeEditorCommit'
                    >
                        <Space direction='vertical' style={{ width: '100%' }}>
                            <span style={{ fontSize: 16, fontWeight: 600 }}>更改描述</span>
                            <Input placeholder={`Delete ${filePath} `} />
                        </Space>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            {/* disabled={newFileName === ''} */}
                            <Button htmlType="submit">删除文件</Button>
                            <Button onClick={() => { navigate(`../tree/main/${filePath}`) }}>取消</Button>
                        </Space>
                    </Form.Item>
                </div>
            </div>
        </Form>
    )
}