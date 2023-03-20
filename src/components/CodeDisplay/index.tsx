import React, { useEffect } from 'react'
import AceEditor from "react-ace";
import './index.scss'
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import FilesTableHeader from '../FilesTableHeader';
import { Button } from 'antd';
import { DeleteOutlined, DownloadOutlined, EditOutlined, HistoryOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import { ReactComponent as RawIcon } from "../../app/icons/raw.svg"
import { displayNumberOfBytes } from '../../app/displayNumberOfBytes';
import FileBreadCrumb from '../FileBreadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchFileContentAsync } from '../../store/features/fileContent/fileContentSlice';
import LoadingStatus from '../LoadingStatus';
import ErrorStatus from '../ErrorStatus';


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

    const { data, isLoading, isError } = useSelector((state: RootState) => state.fileContent)
    const dispatch = useDispatch()
    const location = useLocation().pathname
    const aceEditorRef = React.useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchFileContentAsync(location))
    }, [dispatch, location])

    // const handleChange = (value: string) => {
    //     dispatch({ type: 'setCode', payload: value })
    // }
    if (isLoading) {
        return <LoadingStatus />;
    }
    if (isError) {
        return <ErrorStatus />;
    }

    return (
        data === null ?
            <h1>loading</h1> :
            <>
                <FileBreadCrumb />
                <FilesTableHeader lastModified={data.lastModified} lastModifiedInformation={data.lastModifiedInformation} ></FilesTableHeader>
                <div className='codeToolbar'>
                    <Button
                        type='link'
                        className='codeToolbarButton'
                        onClick={() => {
                            console.log(data.displayData);
                        }}
                    ><DownloadOutlined />下载</Button>
                    <Button
                        type='link'
                        className='codeToolbarButton'
                        onClick={() => {
                            console.log(data.displayData);
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
                    {!data.displayable || <Button
                        type='link'
                        className='codeToolbarButton'
                        onClick={
                            () => {
                                let locationStr = location.split('/').slice(4).join('/');
                                navigate(`../edit/${locationStr}`)
                            }
                        }
                    ><EditOutlined />编辑</Button>}
                    <Button
                        type='link'
                        className='codeToolbarButton'

                    ><DeleteOutlined />删除</Button>
                    <div className='codeToolbarFileSize'>
                        {displayNumberOfBytes(data.size)}
                    </div>
                </div>

                {
                    data.displayable ?
                        <div className='codeEditorContainer'>
                            <AceEditor
                                ref={aceEditorRef}
                                mode="javascript"
                                defaultValue={data.displayData}
                                theme="textmate"
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: true }}
                                className="codeEditor"
                                fontSize={14}
                                width="100%"
                                focus={true}
                                enableLiveAutocompletion={true}
                                debounceChangePeriod={500}
                                highlightActiveLine={false}
                                readOnly={true}
                            />
                        </div>
                        : <div className='oversizedFileTip'>文件太大无法显示，可以查看原始文件</div>
                }
            </>
    );
}