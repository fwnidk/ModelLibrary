import { ArrowDownOutlined, DatabaseFilled } from '@ant-design/icons'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { getTimeYMD } from '../../app/getTimeYMD'
import './index.scss'

export default function DatasetItem(props: { item: DatasetType.DatasetItem }) {
    const navigate = useNavigate()
    const handleClickCard = useCallback((name: string) => {
        navigate(`/dataset/${name}`, { replace: false })
    }, [navigate])

    return (
        <div onClick={() => handleClickCard(props.item.name)} className="itemCard datasetListItemCard" >
            <div className='itemTitle'><DatabaseFilled className='databaseIcon' /><span style={{ marginLeft: 5 }}>{props.item.name}</span></div>
            <div className='itemDescription '> • Updated {getTimeYMD(props.item.lastModified)} • <ArrowDownOutlined style={{ fontSize: 13 }} />{props.item.downloads} • by:{props.item.author}</div>
        </div>
    )
}

