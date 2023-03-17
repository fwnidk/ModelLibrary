import { Button } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setDatasetListAsync, removeDatasetListAsync } from '../../store/features/dataset/datasetSlice';
import { setModelListAsync, removeModelListAsync } from '../../store/features/model/modelSlice';
import "./index.css"

export default function CategoryLabel(props: { value: any, type: string }) {
    const active = props.value.active
    const dispatch = useDispatch();
    const [buttonStyle, setGrayStyle] = useState("defaultStyle");
    useEffect(() => {
        if (active === 0) {
            setGrayStyle("defaultStyle");
        } else if (active === 1) {
            setGrayStyle("activeStyle");
        } else {
            setGrayStyle("grayStyle");
        }
    }, [active])


    const handleClickButton = useCallback((e: React.MouseEvent) => {
        if (props.type === "model") {
            active <= 0 ?
                dispatch(setModelListAsync({ activeFilters: { [props.value.buttonKey]: props.value.buttonValue }, otherOptions: {}, first: false })) :
                dispatch(removeModelListAsync({ key: [props.value.buttonKey], value: props.value.buttonValue }))
        } else {
            active <= 0 ?
                dispatch(setDatasetListAsync({ activeFilters: { [props.value.buttonKey]: props.value.buttonValue }, otherOptions: {}, first: false })) :
                dispatch(removeDatasetListAsync({ key: [props.value.buttonKey], value: props.value.buttonValue }))
        }

    }, [active, dispatch, props.type, props.value.buttonKey, props.value.buttonValue])
     
    

    return (
        <Button size='small' onClick={handleClickButton} className={buttonStyle} >{props.value.buttonValue}</Button>
    )
}
