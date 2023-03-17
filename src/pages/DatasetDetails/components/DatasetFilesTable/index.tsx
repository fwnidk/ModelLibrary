import { Breadcrumb, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../../../../app/mock"
import { displayNumberOfBytes } from '../../../../app/displayNumberOfBytes';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getTimeAgoString } from '../../../../app/getTimeAgoString';
//详情页面的文件展示表格
export default function DatasetTable() {
    const [filesTable, setFilesTable] = useState<DatasetDetailType.FilesTable>()
    const [latestModified, setTableLatestModified] = useState<[string, string]>(["", ""])
    const navigate = useNavigate()
    const location = useLocation().pathname
    const author = useSelector((state: RootState) => state.datasetDetail.options.author)
    useEffect(() => {
        //获取表格数据
        const getData = async () => {
            let response = await axios.post("/api/filesTable", location)
            let result = response.data.filesTable.sort((a: DatasetDetailType.FilesItem, b: DatasetDetailType.FilesItem) => {
                if (!a.isAFolder && b.isAFolder) {
                    return 1;
                }
                return -1;
            })
            let latestIndex = 0;
            let latestDate = result[0];
            for (let index = 0; index < result.length; index++) {
                if (result[index].lastModified > latestDate) {
                    latestDate = result[index].lastModified
                    latestIndex = index;
                }
                result[index].lastModified = getTimeAgoString(result[index].lastModified)
            }
            setTableLatestModified([result[latestIndex].lastModifiedInformation, result[latestIndex].lastModified])
            // console.log(result);
            setFilesTable(result)
        };
        getData().catch(console.error);
    }, [location])


    //生成面包屑
    const locationArr = decodeURI(location).split('/')
    const fileName = locationArr[2]
    const breadcrumbContent: Array<string> = locationArr.slice(5);
    let currRoute: string = `/dataset/${fileName}/tree/main`
    const breadcrumbItemsInformation: Array<[string, string]> = breadcrumbContent.map((item) => {
        currRoute = currRoute + '/' + item;
        return [item, currRoute]
    })
    breadcrumbItemsInformation.unshift([fileName, `/dataset/${fileName}/tree/main`])

    const onRow = useCallback((record: DatasetDetailType.FilesItem) => {
        return {
            onClick: () => {
                if (record.isAFolder) {
                    navigate(location + '/' + encodeURI(record.fileName))
                } else {
                    downloadFile(record.fileURL as string, record.fileName)
                }
            },
        };
    }, [location, navigate])

    const breadcrumbItems = breadcrumbItemsInformation.map((item: [string, string], index) => {
        return (
            <Breadcrumb.Item key={index}>
                <Link to={item[1]} className='breadcrumb'>{item[0]}</Link>
            </Breadcrumb.Item >
        )
    })

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


    const columns: ColumnsType<DatasetDetailType.FilesItem> = [
        {

            dataIndex: 'fileName',
            key: 'fileName',
            render: (fileName, item) => {
                return (
                    <Space>
                        {item.isAFolder ? <FolderOutlined className='isAFolderIcon' /> : <FileOutlined className='isAFolderIcon' />}
                        <span className='fileTableFileName'>{fileName}</span>
                    </Space>
                )
            },
            width: "28%",
        },
        {
            dataIndex: 'size',
            key: 'size',
            render: (number) => number === undefined ? null : <span>{displayNumberOfBytes(number)}</span>,
            width: "10%",
            className: "bytes"
        },
        {
            dataIndex: 'lastModifiedInformation',
            key: 'lastModifiedInformation',
            className: "lastModifiedInformation"
        },
        {
            // title: latestModified,
            dataIndex: 'lastModified',
            key: 'lastModified',
            className: "lastModified",
            align: 'right',
            width: "10%",
        },]

    return (
        <Space direction="vertical" className="filesTableSpace">
            <Breadcrumb >{breadcrumbItems}</Breadcrumb>
            <Table
                columns={columns}
                dataSource={filesTable}
                className="filesTable"
                pagination={false}
                size="small"
                showHeader={false}
                // bordered
                title={() =>
                    <div className='filesTableHeader'>
                        <div className='filesTableHeaderLeft'>
                            <Space size='large' >
                                <span className='authorHeader'>{author}</span>
                                <span className='lastModifiedInformationHeader'>
                                    {latestModified[0]}
                                </span>
                            </Space>
                        </div>
                        <div className='filesTableHeaderRight'>{latestModified[1]}</div>
                    </div>}
                onRow={onRow}
            />
        </Space >
    )
}
