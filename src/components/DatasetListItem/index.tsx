import { Col, Row } from 'antd'
import DatasetItem from '../DatasetItem'

export default function DatasetListItem(props: { list: Array<DatasetType.DatasetItem> }) {

    return (
        <Row gutter={20} className='listItemRow' >
            {props.list ? props.list.map((item, index) => {
                return (
                    <Col span={12} key={index}>
                        <DatasetItem item={item} />
                    </Col>
                )
            }) : <></>}
        </Row>
    )
}
