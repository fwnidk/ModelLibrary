import { Avatar } from 'antd'

export default function PersonalIcon(props: { size?: number, avatarURL: string }) {
    return (
        <Avatar src={props.avatarURL} size={props.size || 30} />
    )
}