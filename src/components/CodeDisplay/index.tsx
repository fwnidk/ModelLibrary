import React, { useEffect } from 'react'
import AceEditor from "react-ace";
import './index.scss'
import '../../app/mock'
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import FilesTableHeader from '../FilesTableHeader';
import { Button } from 'antd';
import { DeleteOutlined, DownloadOutlined, EditOutlined, HistoryOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation } from 'react-router';
import { ReactComponent as RawIcon } from "../../app/icons/raw.svg"
import { displayNumberOfBytes } from '../../app/displayNumberOfBytes';


//代码的展示
export default function CodeDisplay() {

    // {
    //     lastModified: "@timeInteger",
    //     lastModifiedInformation: "@lastModifiedInformation",
    //     size,
    //     fileURL: "@image(200x200)",
    //     display: "@boolean",
    //     ?displayData
    // }

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case 'setCode': {
                return {
                    ...state,
                    displayData: action.payload
                }
            }
            case 'initData': {
                return {
                    ...action.payload,
                }
            }
        }
    }

    const location = useLocation().pathname
    const [state, dispatch] = React.useReducer(reducer, undefined)
    const aceEditorRef = React.useRef(null)

    useEffect(() => {
        const getData = async () => {
            const response = await axios.post('/api/getBlob', location);
            dispatch({ type: 'initData', payload: response.data })
        }
        getData().catch((err) => { console.log(err) });
    }, [location])

    const handleChange = (value: string) => {
        dispatch({ type: 'setCode', payload: value })
    }
    return (
        state === undefined ?
            <h1>loading</h1> :
            <>
                <FilesTableHeader lastModified={state.lastModified} lastModifiedInformation={state.lastModifiedInformation} ></FilesTableHeader>
                <div className='codeToolbar'>
                    <Button
                        type='link'
                        className='codeToolbarButton'
                        onClick={() => {
                            console.log(state.displayData);
                        }}
                    ><DownloadOutlined />下载</Button>
                    <Button
                        type='link'
                        className='codeToolbarButton'
                        onClick={() => {
                            console.log(state.displayData);
                        }}>
                        <div className='rawButton'>
                            <RawIcon className='rawIcon' />
                            <div className='rawSpan'>原始文件</div>
                        </div>
                    </Button>
                    <Button
                        type='link'
                        className='codeToolbarButton'

                    ><HistoryOutlined />修改历史</Button>
                    {!state.displayable || <Button
                        type='link'
                        className='codeToolbarButton'
                        onClick={
                            () => { console.log('编辑') }
                        }
                    ><EditOutlined />编辑</Button>}
                    <Button
                        type='link'
                        className='codeToolbarButton'

                    ><DeleteOutlined />删除</Button>
                    <div className='codeToolbarFileSize'>
                        {displayNumberOfBytes(state.size)}
                    </div>
                </div>

                {
                    state.displayable ?
                        <div className='codeEditorContainer'>
                            <AceEditor
                                ref={aceEditorRef}
                                mode="javascript"
                                defaultValue={state.displayData}
                                theme="textmate"
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: true }}
                                className="codeEditor"
                                fontSize={14}
                                width="100%"
                                focus={true}
                                enableLiveAutocompletion={true}
                                debounceChangePeriod={500}
                                onChange={handleChange}
                                highlightActiveLine={false}
                                readOnly={true}
                            />
                        </div>
                        : <div className='oversizedFileTip'>文件太大无法显示，可以查看原始文件</div>
                }
            </>
    );
}