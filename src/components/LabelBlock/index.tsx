import { Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import CategoryLabel from '../CategoryLabel'
import { useCallback, useEffect, useState } from 'react'
import { removeModelListAsync, setModelListAsync } from '../../store/features/model/modelSlice'
import { removeDatasetListAsync, setDatasetListAsync } from '../../store/features/dataset/datasetSlice'


//tasks块的组件，包括浅灰色描述和几个tasks标签

export default function LabelBlock(props: { type: string, children: any, value: ModelType.ActiveFiltersKey | DatasetType.ActiveFiltersKey }) {
    // let activeFilters: ModelType.ActiveFilters | DatasetType.ActiveFilters;
    const dispatch = useDispatch()
    const activeFilters = useSelector((state: RootState) => {
        if (props.type === "model") {
            return state.modelList.data.activeFilters
        } else {
            return state.datasetList.data.activeFilters
        }
    })
    useEffect(() => {
        console.log(props.value);
    })
    const handleClickLabelBlock = (e: any) => {
        if (e.target.nodeName === "SPAN" || e.target.nodeName === "BUTTON") {
            let currStateIsNotActive = !activeFilters[props.value].includes(e.target.innerText)
            if (props.type === "model") {
                console.log({ [props.value]: e.target.innerText });
                if (currStateIsNotActive) {
                    dispatch(setModelListAsync({ activeFilters: { [props.value]: e.target.innerText }, otherOptions: {}, first: false }))
                } else {
                    dispatch(removeModelListAsync({ key: [props.value], value: e.target.innerText }))
                }
            } else {
                if (currStateIsNotActive) {
                    dispatch(setDatasetListAsync({ activeFilters: { [props.value]: e.target.innerText }, otherOptions: {}, first: false }))
                } else {
                    dispatch(removeDatasetListAsync({ key: [props.value], value: e.target.innerText }))
                }
            }

            // }, [active, dispatch, props.type, props.value.buttonKey, props.value.buttonValue])
        }
    }

    return (
        <div>
            <Space size={[10, 15]} wrap onClick={handleClickLabelBlock} className={activeFilters[props.value].length === 0 ? "defaultSpace" : "activeSpace"}>
                {
                    // props.value !== 'task' ?
                    props.children ?
                        props.children.map((i: string) => {
                            return (
                                <CategoryLabel key={i} type={props.type} value={{ buttonType: activeFilters[props.value].includes(i) ? "activeStyle" : "defaultStyle", buttonValue: i }}></CategoryLabel>
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


