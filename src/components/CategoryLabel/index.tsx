import { Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './index.scss'

const CategoryLabel = React.memo((props: { value: any, type: string }) => {

    // const handleClickButton = useCallback((e: React.MouseEvent) => {
    //     if (props.type === "model") {
    //         active <= 0 ?
    //             dispatch(setModelListAsync({ activeFilters: { [props.value.buttonKey]: props.value.buttonValue }, otherOptions: {}, first: false })) :
    //             dispatch(removeModelListAsync({ key: [props.value.buttonKey], value: props.value.buttonValue }))
    //     } else {
    //         active <= 0 ?
    //             dispatch(setDatasetListAsync({ activeFilters: { [props.value.buttonKey]: props.value.buttonValue }, otherOptions: {}, first: false })) :
    //             dispatch(removeDatasetListAsync({ key: [props.value.buttonKey], value: props.value.buttonValue }))
    //     }

    // }, [active, dispatch, props.type, props.value.buttonKey, props.value.buttonValue])



    return (
        <Button size='small' className={props.value.buttonType} >{props.value.buttonValue}</Button>
    )
})
export default CategoryLabel
