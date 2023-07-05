import React, { useCallback, useEffect, useState } from "react"
import { Space, Button, Input } from "antd"
import './index.scss'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import LabelBlock from "../../../components/LabelBlock"
import { labelConversionArray } from "../../../app/labelConversionArray"
import { resetModelListAsync } from "../../../store/features/model/modelSlice"
import { resetDatasetListAsync } from "../../../store/features/dataset/datasetSlice"


export default function ItemLabel(props: { locationState: any, type: string }) {
    const { type,locationState } = props;
    const [allFiltersSearched, setAllFiltersSearched] = useState<any>(type === 'model' ? { task: [], library: [], dataset: [], other: [], language: [] } : { task: [], size: [], other: [], language: [] })
    const [currCategory, setCurrCategory] = useState<any>(locationState ? locationState.currCategory : "task")
    const [inputValue, setInputValue] = useState<string>("")
    const dispatch = useDispatch();
    const [activeFilters, allFilters, isLoading] = useSelector((state: RootState) => type === 'model' ?
        [state.modelList.data.activeFilters, state.modelList.data.allFilters, state.modelList.isLoading1] :

        [state.datasetList.data.activeFilters, state.datasetList.data.allFilters, state.datasetList.isLoading1])
    useEffect(() => {
        console.log('type changed');
        setCurrCategory("task")
        setAllFiltersSearched(type === 'model' ? { task: [], library: [], dataset: [], other: [], language: [] } : { task: [], size: [], other: [], language: [] })
    }, [type])
    useEffect(() => {
        setAllFiltersSearched(allFilters)
    }, [allFilters])
    // axios获取数据
    const labelButtonArr = labelConversionArray(type);
    //点击切换标签分类按钮
    const handleClickCategory = useCallback((name: any) => {
        return () => {
            setInputValue('')
            setAllFiltersSearched(allFilters)
            setCurrCategory(name);
        }
    }, [allFilters])

    //input输入信息后过滤itemLabel
    const inputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value)
        let newExpandedKeys;
        //更新：暂时不需要对task进行二级分类
        // if (currCategory !== "task") {
        //     newExpandedKeys = ((allFilters as any)[currCategory] as Array<string>)
        //         .filter((item) => {
        //             return item.toLowerCase().indexOf(value.toLowerCase()) > -1
        //         })
        // } else {
        newExpandedKeys = (allFilters as any)[currCategory].filter((item: any) => {
            return item[0].toLowerCase().indexOf(value.toLowerCase()) > -1
        })
        // }
        setAllFiltersSearched({ ...allFiltersSearched, [currCategory]: newExpandedKeys })
        console.log(allFiltersSearched);
    }, [currCategory, allFilters, allFiltersSearched])

    const resetActiveFilters = useCallback(() => {
        if (type === 'model') {
            dispatch(resetModelListAsync([currCategory]))
        } else {
            dispatch(resetDatasetListAsync([currCategory]))
        }

    }, [type, dispatch, currCategory])

    //根据当前点击的分类按钮渲染对应组件
    const renderCurrCategory = useCallback((currCategory: any) => {
        // if (currCategory === "task") {
        //     return <TasksMainPage type={type}>{allFiltersSearched[currCategory]}</TasksMainPage>
        // } else {
        return <LabelBlock type={type} value={currCategory}>{allFiltersSearched[currCategory]}</LabelBlock >
        // }
    }, [allFiltersSearched, type])
    return ((activeFilters as any)[currCategory] ?
        <Space direction="vertical" size="large">
            <Space wrap>
                {labelButtonArr.map((name) => {
                    let isCurrCategory: boolean = (name[1] === currCategory)
                    return (
                        <Button
                            type={isCurrCategory ? "primary" : "text"}
                            shape="round"
                            size="small"
                            className="activeFiltersButton"
                            key={name[1]}
                            onClick={handleClickCategory(name[1])}>
                            {name[0]}
                            {activeFilters[name[1]].length !== 0 ?
                                <span className={isCurrCategory ? "activeFilterNumber-active" : "activeFilterNumber-inactive"}>{activeFilters[name[1]].length}</span> :
                                null}
                        </Button>
                    )
                })}
            </Space>
            <div className="searchDiv">
                <Input placeholder={`Filter ${currCategory} by name`} onChange={inputOnChange} value={inputValue} width="100%"></Input>
                {(activeFilters as any)[currCategory].length === 0 ?
                    null :
                    <Button
                        onClick={resetActiveFilters}
                        shape="round"
                        className="resetButtonStyle"
                    >
                        Reset {currCategory}
                    </Button>
                }
            </div>
            {renderCurrCategory(currCategory)}
        </Space> :
        <></>
    )
}
