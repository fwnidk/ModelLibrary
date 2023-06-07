import './index.scss'
import { Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import PersonalIcon from '../PersonalIcon';
import { logout } from '../../store/features/logIn/logInSlice';
import { resetPersonalInformation } from '../../store/features/personalInformation/personalInformationSlice';


export default function GlobalHeader() {
    const navigate = useNavigate();
    const { code, data } = useSelector((state: RootState) => state.personalInformation.responseData)
    const dispatch = useDispatch()
    function handleEnter(e: any) {
        navigate(`/doc/user/${e.target.value}`, { replace: false })
    }

    //登录后点击头像后生成dropdown
    const dropdownItem: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <NavLink to={`/profile`}>主页</NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <div>通知</div>
            ),
        },
        {
            key: '3',
            label: (
                <NavLink to="/createModel">创建模型</NavLink>
            ),
        },
        {
            key: '4',
            label: (
                <NavLink to="/createDataset">创建数据集</NavLink>
            ),
        },
        {
            key: '5',
            label: (
                <NavLink to="/create">创建组织</NavLink>
            ),
        },
        {
            key: '6',
            label: (
                <NavLink to="/setting">设置</NavLink>
            ),
        },
        {
            key: '7',
            label: (
                <div
                    onClick={() => {
                        dispatch(logout())
                        dispatch(resetPersonalInformation())
                        navigate("/home")
                    }}>
                    登出账号
                </div>
            ),
        },
    ]

    const items1: MenuProps['items'] = [
        { key: '0', label: <NavLink to="/home" >主页</NavLink> },
        { className: "inputStyle", key: '3', label: <Input placeholder='?' prefix={<SearchOutlined />} onPressEnter={(e) => { handleEnter(e) }}></Input> }];

    let items2: MenuProps['items'];

    if (code === 0) {
        items2 = [
            { key: '1', label: <NavLink to="/models">模型</NavLink>, },
            { key: '2', label: <NavLink to="/datasets">数据集</NavLink> },
            { key: '3', label: <NavLink to="/docs">文档</NavLink> },
            { key: '4', label: <NavLink to="/logIn">登录</NavLink> },]
    } else if (code === 1) {
        items2 = [
            { key: '1', label: <NavLink to="/models">模型</NavLink>, },
            { key: '2', label: <NavLink to="/datasets">数据集</NavLink> },
            { key: '3', label: <NavLink to="/docs">文档</NavLink> },
            {
                key: '4', label:
                    <Dropdown menu={{ items: dropdownItem }} placement="bottomRight">
                        <div><PersonalIcon avatarURL={data?.avatar || ''} /></div>
                    </Dropdown>
            },
        ]
    }

    return (
        <div className='globalHeaderShell'>
            <div className='globalHeader'>
                <Menu mode="horizontal" className="menu1" defaultSelectedKeys={['0']} items={items1} />
                <Menu mode="horizontal" className="menu2" defaultSelectedKeys={['0']} items={items2} />
            </div>
        </div>
    )
}