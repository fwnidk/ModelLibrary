import React, { useEffect } from 'react'
import './index.scss'
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
import CodeEditBox from '../CodeEditBox';


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
        <>
            <FileBreadCrumb />
            <div>
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
                        <div className='codeDisplayContainer'>
                            <CodeEditBox defaultVaule={data.displayData} />
                        </div>
                        : <div className='oversizedFileTip'>文件太大无法显示，可以查看原始文件</div>
                }
            </div>
        </>
    );
}