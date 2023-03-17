import { Avatar } from 'antd'
import React from 'react'

export default function PersonalIcon(props: { size?: number, avatarURL: string }) {
    // const avatarURL = useSelector((state: RootState) => state.loginInformation.personalInformation.avatar)
    return (
        <Avatar src={props.avatarURL} size={props.size || 30} />
    )
}
