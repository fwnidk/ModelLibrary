import { FileMarkdownOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Space, Tabs, TabsProps, Tag, Typography } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { labelConversionArray } from '../../app/labelConversionArray';
import ErrorStatus from '../../components/ErrorStatus';
import LoadingStatus from '../../components/LoadingStatus';
import { getDatasetDetailAsync } from '../../store/features/datasetDetail/datasetDetailSlice';
import { getModelDetailAsync, resetModelDetail } from '../../store/features/modelDetail/modelDetailSlice';
import { RootState } from '../../store/store';
import './index.scss'
import NotFoundPage from '../NotFoundPage';

export default function ItemDetails(props: { type: string }) {
    const { type } = props;
    const location = useLocation()
    const { search } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { responseData, isLoading, isError } = useSelector((state: RootState) => type === 'model' ? state.modelDetail : state.datasetDetail)
    const labelButtonArr = labelConversionArray(type)
    useEffect(() => {
        if (type === 'model') {
            dispatch(getModelDetailAsync(search))
        } else {
            dispatch(getDatasetDetailAsync(search))
        }
        return () => {
            dispatch(resetModelDetail())
        }
        // Object.entries(data.activeFilters as any).map((item: any, index1) => {
        //     console.log('labelButtonArr: ', labelButtonArr);
        //     console.log(item, getConversionArray(item[0]), index1);
        // });
    }, [dispatch, search, type])
    const items: TabsProps['items'] = [
        {
            key: '',
            label: (
                <span className='tabsFont'>
                    <FileMarkdownOutlined />模型简介
                </span>
            ),
        },
        {
            key: 'tree/main',
            label: (
                <span className='tabsFont'>
                    <ProfileOutlined />文件
                </span>
            ),
        },
    ];

    const handleClick = useCallback((key: string) => {
        navigate(key)
    }, [navigate])
    const setActiveKey = useCallback(() => {
        return location.pathname.length === (type === 'model' ? 7 : 9) + encodeURIComponent(search as string).length ? "" : 'tree'
    }, [location.pathname.length, search, type])
    const handleClickLabel = useCallback((filter: string, label: string) => {
        navigate(type === 'model' ? "/models" : "/datasets", {
            state: {
                currCategory: filter,
                label
            }
        })
    }, [navigate, type])

    const getConversionArray = (item: string) => {
        for (let arri of labelButtonArr) {
            if (arri[1] === item) {
                return arri[0]
            }
        }
        return null
    }
    if (isLoading) {
        return <LoadingStatus />
    }
    if (isError) {
        return <ErrorStatus />
    }
    return (
        responseData.msg === "no such item" ?
            <NotFoundPage /> :
            <div className='detail'>
                <Typography.Title level={2} style={{ margin: 0 }}>
                    {search}
                    {responseData.data.isPrivate && <Tag>私有</Tag>}
                </Typography.Title>
                <Space wrap size='large'>
                    {Object.entries(responseData.data.activeFilters as any).map((item: any, index1) => {
                        return (
                            item[1].length > 0 ?
                                <Space key={index1}>
                                    <span>{getConversionArray(item[0])} :</span>
                                    {item[1].map((label: any, index2: any) => {
                                        return (<Button className='detailButton' key={index2} onClick={() => handleClickLabel(item[0], label)}>{label}</Button>)
                                    })}
                                </Space> : <></>
                        )
                    })}
                </Space>
                <Tabs
                    items={items}
                    className="itemDetailMenu"
                    onTabClick={handleClick}
                    activeKey={setActiveKey()}
                />
                <Outlet />
            </div>
    )
}