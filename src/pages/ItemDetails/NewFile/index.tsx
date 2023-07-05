import { Button, Form, Input, Space, Tabs, TabsProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'
// import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import './index.scss'
import LoadingStatus from '../../../components/LoadingStatus';
import CodeEditBox from '../../../components/CodeEditBox';
import DiffComponent from '../../../components/DiffComponent';

export default function NewFile() {
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
    const filePath = locationArr.slice(4).join('/')
    const [changedCode, setChangedCode] = useState('')
    const [newFileName, setNewFileName] = useState('')
    const onFinish = (values: any) => {
        if (values.codeEditorCommit === undefined || values.codeEditorCommit === '') {
            values.codeEditorCommit = `Create ${newFileName}`
        }
        console.log('onFinish', { ...values, changedCode });
    }
    const onFinishFailed = (error: any) => {
        console.log(error);
    }

    const handleChangeCode = (value: any) => {
        setChangedCode(value)
    }
    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: '编辑',
            children:
                <CodeEditBox defaultVaule={changedCode} onChange={handleChangeCode} />
        },
        {
            key: '2',
            label: '预览',
            children: <div className='codeEditorDiff' >
                <DiffComponent diffDataList={[{
                    oldFileName: newFileName,
                    newFileName: newFileName,
                    prevData: '',
                    newData: changedCode
                }]} documentChangesOverview={false} />
            </div>
        }
        //oldFileName || "",
        //  newFileName || "",
        //   oldString,
        //    newString
    ]

    return (
        changedCode === undefined ? <LoadingStatus /> :
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                size='large'
                colon={false}
                requiredMark={false}
            >
                <Form.Item
                    name='fileName'
                    label={<span className='codeEditorItemName'>{`${filePathWithItemName}/`}</span>}
                    rules={[{ required: true, message: '请输入文件路径' }]}
                >
                    <Input
                        onChange={(e) => {
                            setNewFileName(e.target.value);
                        }}
                        placeholder="命名新文件" />
                </Form.Item>
                <div className='editCardBorder'>
                    <Form.Item
                    >
                        <Tabs
                            defaultActiveKey="1"
                            items={tabItems}
                            className='editTabs'
                            destroyInactiveTabPane={true}
                        >
                        </Tabs>
                    </Form.Item>
                    <div className='codeEditorCommit'>
                        <Form.Item
                            name='codeEditorCommit'
                        >
                            <Space direction='vertical' style={{ width: '100%' }}>
                                <span style={{ fontSize: 16, fontWeight: 600 }}>更改描述</span>
                                <Input placeholder={newFileName === '' ? `Create new file` : `Create ${newFileName}`} />
                            </Space>
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                {/* 判断是否变动，是否可以提交更改 */}
                                <Button disabled={newFileName === ''} htmlType="submit">创建新文件</Button>
                                <Button onClick={() => { navigate(`../tree/${filePath}`) }}>取消</Button>
                            </Space>
                        </Form.Item>
                    </div>
                </div>
            </Form>
    )
}