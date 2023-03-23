import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './index.scss'
import "../../../../app/mock"
import { displayNumberOfBytes } from '../../../../app/displayNumberOfBytes';
import { ArrowDownOutlined, FileOutlined, FolderFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getTimeAgoString } from '../../../../app/getTimeAgoString';
import FilesTableHeader from '../../../../components/FilesTableHeader';
import FileBreadCrumb from '../../../../components/FileBreadcrumb';
import LoadingStatus from '../../../../components/LoadingStatus';
//详情页面的文件展示表格
export default function ModelFilesTable() {
    const [filesTable, setFilesTable] = useState<ModelDetailType.FilesTable>()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation().pathname
    const { lastModified, lastModifiedInformation } = useSelector((state: RootState) => state.modelDetail.data.options)
    useEffect(() => {
        //获取表格数据
        const getData = async () => {
            let response = await axios.post("/api/filesTable", location)
            let result = response.data.filesTable.sort((a: ModelDetailType.FilesItem, b: ModelDetailType.FilesItem) => {
                if (!a.isAFolder && b.isAFolder) {
                    return 1;
                }
                return -1;
            })
            for (let index = 0; index < result.length; index++) {
                result[index].lastModified = getTimeAgoString(result[index].lastModified)
            }
            // console.log(result);
            console.log(response.data);
            setFilesTable(result)
            setIsLoading(false)
        };
        getData().catch(console.error);
    }, [location])

    const downloadFile = async (fileURL: string, fileName: string) => {
        console.log(fileURL);
        try {
            let res = await axios({
                method: 'get',
                url: "/200/09f/fff.png",
                responseType: 'blob',
            })
            console.log(res.headers['content-type']);
            let url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.download = fileName
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error);
        }
    }

    const naviagteDiff = () => {
        return {
            onClick: () => {
                navigate(`../commit`)
            }
        }
    }

    const columns: ColumnsType<ModelDetailType.FilesItem> = [
        {
            dataIndex: 'fileName',
            key: 'fileName',
            render: (fileName, item) => {
                return (
                    <Space>
                        {item.isAFolder ? <FolderFilled className='isAFolderIcon folderFilled' /> : <FileOutlined className='isAFolderIcon' />}
                        <span className='fileTableFileName'>{fileName}</span>
                    </Space>
                )
            },
            width: "28%",
            onCell: (record: ModelDetailType.FilesItem) => {
                return {
                    onClick: () => {
                        if (record.isAFolder) {
                            navigate(`${location}/${encodeURI(record.fileName)}`)
                        } else {
                            let locationStr = location.split('/').slice(4).join('/');
                            if (locationStr === '') {
                                navigate(`../blob/${encodeURI(record.fileName)}`)
                            } else {
                                navigate(`../blob/${locationStr}/${encodeURI(record.fileName)}`)
                            }
                        }
                    }
                }
            }
        },
        {
            dataIndex: 'size',
            key: 'size',
            render: (number) => number === undefined ? null : <span>{displayNumberOfBytes(number)} <ArrowDownOutlined /></span>,
            width: "10%",
            className: "bytes",
            onCell: (record: ModelDetailType.FilesItem) => {
                return {
                    onClick: () => {
                        if (!record.isAFolder) {
                            downloadFile(record.fileURL as string, record.fileName)
                        }
                    }
                }
            }
        },
        {
            dataIndex: 'lastModifiedInformation',
            key: 'lastModifiedInformation',
            render: (item) => <span>{item}</span>,
            className: "lastModifiedInformation",
            onCell: naviagteDiff
        },
        {
            // title: latestModified,
            dataIndex: 'lastModified',
            key: 'lastModified',
            render: (item) => <span>{item}</span>,
            className: "lastModified",
            align: 'right',
            width: "10%",
            onCell: naviagteDiff
        },]
    if (isLoading) {
        return <LoadingStatus />
    }
    return (
        <>
            <FileBreadCrumb />
            <div>
                <FilesTableHeader lastModified={lastModified} lastModifiedInformation={lastModifiedInformation} type='model' />
                <Table
                    columns={columns}
                    dataSource={filesTable}
                    className="filesTable"
                    pagination={false}
                    size="small"
                    showHeader={false}
                // bordered
                // title={() =>
                //     <FilesTableHeader />
                // }
                />
            </div>
        </>
    )

}
