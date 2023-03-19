import { DatabaseFilled } from '@ant-design/icons'
import ModelIcon from '../ModelIcon'
import './index.scss'

//一行话，描述 模型/数据集 的更新时间
export default function HomeLoggedInItem(props: { type: string, lastModified: string }) {

    return (
        <div className='personalItem0'>
            {(props.type === 'model') ?
                <>
                    <div className='personalItem0-1'>
                        <div className='colorful'><ModelIcon /></div>
                        <span style={{ marginLeft: 10 }}>更新了model</span>
                        <span style={{ marginLeft: 20 }}>{props.lastModified}</span>
                    </div>
                </> :
                <>
                    <div>
                        <DatabaseFilled className='personalItem0-2' />
                        <span style={{ marginLeft: 10 }}>更新了dataset</span>
                        <span style={{ marginLeft: 20 }}>{props.lastModified}</span>
                    </div>
                </>
            }
        </div>
    )
}

