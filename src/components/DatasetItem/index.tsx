import { ArrowDownOutlined, DatabaseFilled } from '@ant-design/icons'
import { Space, Tag } from 'antd'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { getTimeYMD } from '../../app/getTimeYMD'
import './index.scss'
import { displayBigNumber } from '../../app/displayBigNumber'

export default function DatasetItem(props: { item: DatasetType.DatasetItem }) {
    const navigate = useNavigate()
    const handleClickCard = useCallback((name: string) => {
        navigate(`/dataset/${encodeURIComponent(name)}`, { replace: false })
    }, [navigate])

    return (
        <div onClick={() => handleClickCard(props.item.name)} className="itemCard datasetListItemCard" >
            <div className='itemTitle'>
                <DatabaseFilled className='databaseIcon' />
                <Space style={{ marginLeft: 5 }}>{props.item.name}
                    {props.item.isPrivate && <Tag className='itemTag'>私有</Tag>}
                </Space>
            </div>
            <div className='itemDescription '> • 更新日期：{getTimeYMD(props.item.lastModified)} • <ArrowDownOutlined style={{ fontSize: 13 }} />{displayBigNumber(props.item.downloads)} • 作者：{props.item.author}</div>
        </div>
    )
}

