import { Form, Input, Tabs, TabsProps } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router'
import { RootState } from '../../store/store';
import ErrorStatus from '../ErrorStatus';
import LoadingStatus from '../LoadingStatus';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import './index.scss'
import DiffComponent from '../DiffComponent';
import { fetchFileContentAsync } from '../../store/features/fileContent/fileContentSlice';


export default function CodeEditor() {
    const location = useLocation().pathname;
    const { data, isLoading, isError } = useSelector((state: RootState) => state.fileContent)

    //测试时使用
    const dispatch = useDispatch()
    //更改后的代码
    const locationArr = decodeURI(location).split('/')
    //项目名
    const itemName = locationArr[2]
    //文件类型
    // import "ace-builds/src-noconflict/mode-javascript";
    const fileNameArr = locationArr[locationArr.length - 1].split('.')
    const fileType = fileNameArr[fileNameArr.length - 1]

    const filePath = locationArr.slice(4).join('/')
    const [changedCode, setChangedCode] = useState(data ? data.displayData : undefined)
    const [changedPath, setChangedPath] = useState(filePath)
    //文件路径
    // const [fileType, setFileType] = useState<string>(fileNameArr[fileNameArr.length - 1])

    useEffect(() => {
        if (data === null) {
            dispatch(fetchFileContentAsync(location))
        }
        if (!isLoading) {
            setChangedCode(data.displayData)
        }
    }, [isLoading])

    const onFinish = (values: any) => {
        console.log('onFinish', values);
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
    const getMode = useCallback(() => {
        let res: string;
        switch (fileType) {
            case 'py':
                res = 'python';
                break;
            case 'js':
                res = 'javascript';
                break;
            case 'ts':
                res = 'typescript';
                break;
            case 'md':
                res = 'markdown';
                break;
            case 'java':
                res = 'java';
                break;
            case 'json':
                res = 'json';
                break;
            default:
                return undefined
        }
        loadMode(res);
        console.log(res);
        return res;
    }, [fileType])
    const loadMode = (res: string) => {
        import(`ace-builds/src-noconflict/mode-${res}`);
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
                <div className='codeEditorContainer'>
                    <AceEditor
                        mode={getMode()}
                        defaultValue={changedCode}
                        onChange={handleChangeCode}
                        theme="textmate"
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        className="codeEditor"
                        fontSize={14}
                        width="100%"
                        focus={true}
                        enableLiveAutocompletion={true}
                        debounceChangePeriod={500}
                        highlightActiveLine={true}
                        readOnly={false}
                    />
                </div>
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
                initialValues={{ changeFilepath: filePath }}
            >
                <Form.Item
                    name='changeFilepath'
                    label={<span className='codeEditorItemName'>{`${itemName}/`}</span>}
                    rules={[{ required: true, message: '请输入文件路径' }]}
                >
                    <Input onChange={(e) => { setChangedPath(e.target.value) }} />
                </Form.Item>

                <Form.Item
                    name='editCard'
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

            </Form>
    )
}
