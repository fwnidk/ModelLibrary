import { Space } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import CategoryLabel from '../CategoryLabel'


//tasks块的组件，包括浅灰色描述和几个tasks标签

export default function LabelBlock(props: { type: string, children: any, value: ModelType.ActiveFiltersKey | DatasetType.ActiveFiltersKey }) {
    // let activeFilters: ModelType.ActiveFilters | DatasetType.ActiveFilters;

    const activeFilters = useSelector((state: RootState) => {
        if (props.type === "model") {
            return state.modelList.data.activeFilters
        } else {
            return state.datasetList.data.activeFilters
        }
    })


    //当前Filter组件名称
    const buttonIsActive = (currLabel: string) => {
        if (activeFilters[props.value]?.length === 0) {
            return 0
        } else {
            if (activeFilters[props.value].includes(currLabel)) {
                return 1
            } else {
                return -1
            }
        }
    };

    return (
        <div>
            <Space size={[10, 15]} wrap>
                {
                    // props.value !== 'task' ?
                    props.children ?
                        props.children.map((i: string) => {
                            return (
                                <CategoryLabel key={i} type={props.type} value={{ buttonKey: props.value, buttonValue: i, active: buttonIsActive(i) }}></CategoryLabel>
                            )
                        }) : <></>
                    // :
                    // props.children.map((i: [string, ModelType.Task]) => {
                    //     return (
                    //         <CategoryLabel key={i[0]} type={props.type} value={{ buttonKey: props.value, buttonValue: i[0], active: buttonIsActive(i[0]) }}></CategoryLabel>
                    //     )
                    // })
                }
            </Space >
        </div >
    )
}
