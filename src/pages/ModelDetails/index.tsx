import { FileMarkdownOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Space, Tabs, TabsProps, Typography } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { modelLabelConversionArray } from '../../app/LabelConversionArray';
import { getModelDetailAsync } from '../../store/features/modelDetail/modelDetailSlice';
import { RootState } from '../../store/store';

import './index.scss'

export default function Details() {
    // const [activeMenu, setActiveMenu] = useState("modelcard")
    const location = useLocation()
    const { search } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const activeFilters: ModelDetailType.ActiveFilters = useSelector((state: RootState) => state.modelDetail.activeFilters)
    useEffect(() => {
        dispatch(getModelDetailAsync(search))
    }, [dispatch, search])

    const labelButtonArr = modelLabelConversionArray
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
            key: 'tree',
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
        return location.pathname.length === 7 + encodeURI(search as string).length ? "" : 'tree'
    }, [location.pathname, search])
    const handleClickLabel = useCallback((filter: string, label: string) => {
        navigate("/models", {
            state: {
                currCategory: filter,
                label
            }
        })
    }, [navigate])

    const getConversionArray = (item: string) => {
        for (let arri of labelButtonArr) {
            if (arri[1] === item) {
                return arri[0]
            }
        }
        return null
    }

    return (
        <>
            <div className='detail'>
                <Typography.Title level={2} style={{ margin: 0 }}>{search}</Typography.Title>
                <Space wrap size='large'>
                    {Object.entries(activeFilters).map((item: [string, Array<string>], index1) => {
                        return (
                            <Space key={index1}>
                                <span>{getConversionArray(item[0])} :</span>
                                {item[1].map((label, index2) => {
                                    return (<Button className='detailButton' key={index2} onClick={() => handleClickLabel(item[0], label)}>{label}</Button>)
                                })}
                            </Space>
                        )
                    })}
                </Space>
                <Tabs
                    items={items}
                    className="modelDetailMenu"
                    onTabClick={handleClick}
                    activeKey={setActiveKey()}
                />
                <Outlet />
            </div>
        </>
    )
}
