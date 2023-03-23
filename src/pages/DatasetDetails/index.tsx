import { FileMarkdownOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Space, Tabs, TabsProps, Typography } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { datasetLabelConversionArray } from '../../app/labelConversionArray';
import { getDatasetDetailAsync } from '../../store/features/datasetDetail/datasetDetailSlice';
import { RootState } from '../../store/store';


export default function Details() {
    // const [activeMenu, setActiveMenu] = useState("datasetcard")
    const location = useLocation()
    const { search } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const activeFilters: DatasetDetailType.ActiveFilters = useSelector((state: RootState) => state.datasetDetail.activeFilters)
    useEffect(() => {
        console.log("dataset details: ", search);
        dispatch(getDatasetDetailAsync(search))
    }, [dispatch, search])

    const labelButtonArr = datasetLabelConversionArray
    const items: TabsProps['items'] = [
        {
            key: '',
            label: (
                // <NavLink to="" className='tabsFont'>
                <span className='tabsFont'>
                    <FileMarkdownOutlined />Dataset card
                </span>
                // </NavLink>
            ),
            // 
            // children: <DatasetCard name={search as string} />,
        },
        {
            key: 'tree/main',
            label: (
                // <NavLink to="tree/main" className='tabsFont'>
                <span className='tabsFont'>
                    <ProfileOutlined />Files
                </span>
                // </NavLink>
            ),
            // children: <FilesTable name={search as string} />,
            // <Link to="tree" className='tabsFont'>
        },
    ];

    const handleClick = useCallback((key: string) => {
        navigate(key)
    }, [navigate])
    const setActiveKey = useCallback(() => {
        return location.pathname.length === 9 + encodeURI(search as string).length ? "" : 'tree/main'
    }, [location.pathname, search])
    const handleClickLabel = useCallback((filter: string, label: string) => {
        navigate("/datasets", {
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
                <Space direction="vertical" size="large" className='detailSpace'>
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
                        className="datasetDetailMenu"
                        onTabClick={handleClick}
                        activeKey={setActiveKey()}
                    />
                    <Outlet />
                </Space>
            </div>

        </>
    )
}
