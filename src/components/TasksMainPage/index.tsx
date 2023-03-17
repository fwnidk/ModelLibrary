// import React, { useEffect, useState } from 'react'
// import { Space, Input, Button } from 'antd'
// import CategoryLabel from '../../../../components/GlobalHeader/CategoryLabel'

import LabelBlock from '../LabelBlock'
import { Space, Typography } from 'antd'
// import { useSelector } from 'react-redux'

const { Text } = Typography;

export default function TasksMainPage(props: any) {
    const taskLabel: Array<[string, ModelType.Task]> = props.children
    //filter数据给每个TasksLabel组件 
    //如果搜索内容后，taskClassification没有对应的数组，则不渲染该taskClassification的块
    return (
        <Space direction="vertical" size='large'>
            {['Natural Language Processing', 'Computer Vision', 'Multimodal', 'Audio']
                .map((tasksClassification, index) => {
                    return (
                        taskLabel.find((i) => {
                            return i[1] === tasksClassification
                        }) ? (
                            <Space direction="vertical" size="small" key={index}>
                                <Text type="secondary">{tasksClassification}</Text>
                                <LabelBlock type={props.type} value={"task"} >
                                    {taskLabel.filter((j) => {
                                        return j[1] === tasksClassification
                                    })}
                                </LabelBlock>
                            </Space>
                        )
                            : null
                    )
                })}
        </Space>
    )
}
