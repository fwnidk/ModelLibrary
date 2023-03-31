import { Button, Form, Input, message, Space, UploadProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'
// import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import './index.scss'
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

export default function UploadFile() {
    const location = useLocation().pathname;
    const navigate = useNavigate()
    const [fileList, setFileList] = useState<any>([])
    //测试时使用
    //更改后的代码
    const locationArr = decodeURI(location).split('/')
    const filePathWithItemName = useMemo(() => {
        const arr = locationArr.slice(5);
        arr.unshift(locationArr[2]);
        return arr.join('/')
    }, [locationArr])
    const filePath = locationArr.slice(4).join('/')

    const onFinish = (values: any) => {
        if (values.codeEditorCommit === undefined || values.codeEditorCommit === '') {
            values.codeEditorCommit = `Create ${fileList.length} files`
        }
        console.log('onFinish', { ...values, fileList });
    }
    const onFinishFailed = (error: any) => {
        console.log(error);
    }

    const filesUploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        action: '/api/filesPost',
        onChange(info) {
            const { status } = info.file;
            console.log('status: ', status);
            // if (status !== 'uploading') {
            //     console.log(info.file, info.fileList);
            // }
            if (status === 'done') {
                setFileList(info.fileList)
                message.success(`${info.file.name} 文件上传成功.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败.`);
            } else if (status === 'removed') {
                setFileList(info.fileList)
                message.success(`${info.file.name} 文件删除成功.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        className: 'filesUploadDragger'
    };

    return (
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size='large'
            colon={false}
            requiredMark={false}

        >
            <Form.Item
                label={<span className='codeEditorItemName'>{`${filePathWithItemName}/`}</span>}
            >
            </Form.Item>
            <div className='uploadCardBorder'>
                <div className='uploadCardHeader'><div className='uploadCardTitle'>上传文件/文件夹</div></div>
                <Dragger {...filesUploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">将文件/文件夹拖到这里，或点击从你的电脑上浏览。</p>
                </Dragger>
                <div className='codeEditorCommit'>
                    <Form.Item
                        name='codeEditorCommit'
                    >
                        <Space direction='vertical' style={{ width: '100%' }}>
                            <span style={{ fontSize: 16, fontWeight: 600 }}>更改描述</span>
                            <Input placeholder={`Create ${fileList.length} files `} />
                        </Space>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            {/* disabled={newFileName === ''} */}
                            <Button disabled={fileList.length === 0} htmlType="submit">上传文件/文件夹</Button>
                            <Button onClick={() => { navigate(`../tree/${filePath}`) }}>取消</Button>
                        </Space>
                    </Form.Item>
                </div>
            </div>
        </Form>
    )
}