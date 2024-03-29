import { Button, Dropdown, MenuProps, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './index.scss'
// import "../../../app/icons/mock"
import { displayNumberOfBytes } from '../../../app/displayNumberOfBytes';
import { ArrowDownOutlined, CaretDownOutlined, FileOutlined, FolderFilled, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getTimeAgoString } from '../../../app/getTimeAgoString';
import FilesTableHeader from '../../../components/FilesTableHeader';
import FileBreadCrumb from '../../../components/FileBreadcrumb';
import LoadingStatus from '../../../components/LoadingStatus';
import { NavLink } from 'react-router-dom';
import { axiosInstance } from '../../../app/axiosInterceptor';
//详情页面的文件展示表格
export default function ItemFilesTable(props: { type: string }) {
    const { type } = props
    const [filesTable, setFilesTable] = useState<any>()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation().pathname;
    const locationStr = location.split('/').slice(4).join('/');
    const fileName = decodeURIComponent(location.split('/')[2])
    const { data } = useSelector((state: RootState) => type === 'model' ? state.modelDetail.responseData : state.datasetDetail.responseData)
    useEffect(() => {
        console.log('fileName: ', fileName);
        //获取表格数据
        const getData = async () => {
            let fetchURL = `/api/filesTable?name=${fileName}&type=${type}`
            console.log("fetchURL", fetchURL);
            let response = await axiosInstance.get(fetchURL)
            let responseData = response.data
            // console.log(responseData)
            let result = responseData.data.filesTable.sort((a: any, b: any) => {
                if (!a.isAFolder && b.isAFolder) {
                    return 1;
                }
                return -1;
            })
            for (let index = 0; index < result.length; index++) {
                result[index].lastModified = getTimeAgoString(result[index].lastModified)
            }
            setFilesTable(result)
            setIsLoading(false)
        };
        getData().catch(console.error);
    }, [location])

    const downloadFile = async (fileURL: string, fileName: string) => {
        // console.log(fileURL);
        try {
            let res = await axios({
                method: 'get',
                url: "/200/09f/fff.png",
                responseType: 'blob',
            })
            // console.log(res.headers['content-type']);
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

    const columns: ColumnsType<any> = [
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
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        if (record.isAFolder) {
                            navigate(`${location}/${encodeURIComponent(record.fileName)}`)
                        } else {
                            navigate(`../blob/${locationStr}/${encodeURIComponent(record.fileName)}`)
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
    const dropdownItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <NavLink to={`../new/${locationStr}`}>在线创建文件</NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <NavLink to={`../upload/${locationStr}`}>上传文件/文件夹</NavLink>
            ),
        },
    ]
    if (isLoading) {
        return <LoadingStatus />
    }
    return (
        <>

            <div className='filesTableTitle'>
                <FileBreadCrumb />
                <Dropdown menu={{ items: dropdownItems }} placement="bottomRight" className='addFileDropdown'>
                    <Button><PlusOutlined />添加文件<CaretDownOutlined style={{ fontSize: 10 }} /></Button>
                </Dropdown>
            </div>
            <div>
                <FilesTableHeader lastModified={data.lastModified} lastModifiedInformation={data.lastModifiedInformation} />
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
