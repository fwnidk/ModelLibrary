import { ArrowDownOutlined } from '@ant-design/icons'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { getTimeYMD } from '../../app/getTimeYMD'
import ModelIcon from '../ModelIcon'
import './index.scss'

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
                <ModelIcon/>
                <span style={{ marginLeft: 5 }}>
                    {props.item.name}
                </span>
            </div>
            <div className='itemDescription '> • Updated {getTimeYMD(props.item.lastModified)} • <ArrowDownOutlined style={{ fontSize: 13 }} />{props.item.downloads} • by:{props.item.author}</div>
        </div>
    )
}
