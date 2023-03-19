import { Col, Row } from 'antd'
import ModelItem from '../ModelItem'
import './index.scss'

export default function ModelListItem(props: { list: Array<ModelType.ModelItem> }) {
    return (
        <Row gutter={20} className='listItemRow' >
            {props.list.map((item, index) => {
                return (
                    <Col span={12} key={index}>
                        < ModelItem item={item}></ModelItem>
                    </Col>
                )
            })}
        </Row>
    )
}
