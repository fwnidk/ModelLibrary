import { Space } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { getTimeAgoString } from '../../app/getTimeAgoString'
import { RootState } from '../../store/store'
import PersonalIcon from '../PersonalIcon'
import './index.scss'

export default function FilesTableHeader(props: { lastModified: number, lastModifiedInformation: string}) {
    const { lastModified, lastModifiedInformation} = props
    const type = useLocation().pathname.split('/')[1]
    const { avatar, author, } = useSelector((state: RootState) => type === 'model' ? state.modelDetail.data.options : state.datasetDetail.data.options)
    return (
        <div className='filesTableHeader'>
            <Space size='large' className='filesTableHeaderLeft'>
                <span className='authorHeader'><PersonalIcon avatarURL={avatar} size={20} />{author}</span>
                <span className='lastModifiedInformationHeader'>
                    {lastModifiedInformation}   
                </span>
            </Space>
            <div className='filesTableHeaderRight'>{getTimeAgoString(lastModified)}</div>
        </div>
    )
}
