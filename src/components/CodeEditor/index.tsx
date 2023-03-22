import { Button, Form, Input, Space, Tabs, TabsProps } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router'
import { RootState } from '../../store/store';
import ErrorStatus from '../ErrorStatus';
import LoadingStatus from '../LoadingStatus';
// import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import './index.scss'
import DiffComponent from '../DiffComponent';
import { fetchFileContentAsync } from '../../store/features/fileContent/fileContentSlice';
import CodeEditBox from '../CodeEditBox';


export default function CodeEditor() {
    const location = useLocation().pathname;
    const { data, isLoading, isError } = useSelector((state: RootState) => state.fileContent)
    const navigate = useNavigate()
    //测试时使用
    const dispatch = useDispatch()
    //更改后的代码
    const locationArr = decodeURI(location).split('/')
    //项目名
    const itemName = locationArr[2]

    const filePath = locationArr.slice(4).join('/')
    const [changedCode, setChangedCode] = useState(data ? data.displayData : undefined)
    const [changedPath, setChangedPath] = useState(filePath)
    useEffect(() => {
        if (data === null) {
            dispatch(fetchFileContentAsync(location))
        }
        if (!isLoading) {
            setChangedCode(data.displayData)
        }
    }, [isLoading])

    const onFinish = (values: any) => {
        console.log('onFinish', { ...values, changedCode });
    }
    const onFinishFailed = (error: any) => {
        console.log(error);
    }
    const handleChange = (key: string) => {
        // console.log(key);
    }
    const handleChangeCode = (value: any) => {
        setChangedCode(value)
    }

    const noDifference = () => {
        if (filePath === changedPath && data.displayData === changedCode) {
            return true;
        }
        return false;
    }

    if (isLoading) {
        return <LoadingStatus />
    }
    if (isError) {
        return <ErrorStatus />
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
                    oldFileName: filePath,
                    newFileName: changedPath,
                    prevData: data.displayData,
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
                initialValues={{ changeFilepath: filePath, codeEditorCommit: `Update ${filePath}` }}
            >
                <Form.Item
                    name='changeFilepath'
                    label={<span className='codeEditorItemName'>{`${itemName}/`}</span>}
                    rules={[{ required: true, message: '请输入文件路径' }]}
                >
                    <Input onChange={(e) => { setChangedPath(e.target.value) }} />
                </Form.Item>
                <div className='editCardBorder'>

                    <Form.Item
                    >
                        <Tabs
                            defaultActiveKey="1"
                            items={tabItems}
                            onChange={handleChange}
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
                                <Input placeholder={`Update ${filePath}`} />
                            </Space>
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                {/* 判断是否变动，是否可以提交更改 */}
                                <Button disabled={noDifference()} htmlType="submit">提交更改</Button>
                                <Button onClick={() => { navigate(`../blob/${filePath}`) }}>取消</Button>
                            </Space>
                        </Form.Item>
                    </div>
                </div>
            </Form>
    )
}
