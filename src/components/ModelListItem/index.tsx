import { Col, Row } from 'antd'
import ModelItem from '../ModelItem'
import './index.scss'
import { useEffect, useState } from 'react';

export default function ModelListItem(props: { list: Array<ModelType.ModelItem> }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // 清除监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <Row gutter={20} className='listItemRow' >
            {
                props.list ?
                    props.list.map((item, index) => {
                        return (
                            <Col span={windowWidth >= 1000 ? 12 : 24} key={index}>
                                < ModelItem item={item}></ModelItem>
                            </Col>
                        )
                    }) : <></>
            }
        </Row>
    )
}
