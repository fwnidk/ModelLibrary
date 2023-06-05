import { ArrowDownOutlined } from '@ant-design/icons'
import { Space, Tag } from 'antd'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { getTimeYMD } from '../../app/getTimeYMD'
import ModelIcon from '../ModelIcon'
import './index.scss'
import { displayBigNumber } from '../../app/displayBigNumber'

export default function ModelItem(props: { item: ModelType.ModelItem }) {
    // const [hover, setHover] = React.useState(false)
    const navigate = useNavigate()
    const handleClickCard = useCallback((name: string) => {
        navigate(`/model/${name}`, { replace: false })
    }, [navigate])

    return (
        <div
            // onMouseEnter={() => setHover(true)}
            // onMouseLeave={() => setHover(false)}
            onClick={() => handleClickCard(props.item.name)}
            className="itemCard modelListItemCard" >
            <div className='itemTitle'>
                <ModelIcon />
                <Space>
                    <span style={{ marginLeft: 5 }}>
                        {props.item.name}
                    </span>
                    {props.item.isPrivate && <Tag className='itemTag'>私有</Tag>}
                </Space>
            </div>
            <div className='itemDescription '> • 更新时间： {getTimeYMD(props.item.lastModified)} • <ArrowDownOutlined style={{ fontSize: 13 }} />{displayBigNumber(props.item.downloads)} • 作者：{props.item.author}</div>
        </div>
    )
}
