import { Space } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { getTimeAgoString } from '../../app/getTimeAgoString'
import { RootState } from '../../store/store'
import PersonalIcon from '../PersonalIcon'
import './index.css'

export default function FilesTableHeader(props: { lastModified: number, lastModifiedInformation: string }) {
    const { avatar, author, } = useSelector((state: RootState) => state.modelDetail.options)
    return (
        <div className='filesTableHeader'>
            <Space size='large' className='filesTableHeaderLeft'>
                <span className='authorHeader'><PersonalIcon avatarURL={avatar} size={20} />{author}</span>
                <span className='lastModifiedInformationHeader'>
                    {props.lastModifiedInformation}
                </span>
            </Space>
            <div className='filesTableHeaderRight'>{getTimeAgoString(props.lastModified)}</div>
        </div>
    )
}
