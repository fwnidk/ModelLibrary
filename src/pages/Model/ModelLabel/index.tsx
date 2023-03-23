import React, { useCallback, useEffect, useRef, useState } from "react"
import { Space, Button, Input } from "antd"
import './index.scss'
import TasksMainPage from "../../../components/TasksMainPage"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import "../../../app/mock"
import { resetModelListAsync } from "../../../store/features/model/modelSlice"
import LabelBlock from "../../../components/LabelBlock"
import { modelLabelConversionArray } from "../../../app/labelConversionArray"


export default function ModelLabel(props: { locationState: any }) {
    const [allFiltersSearched, setAllFiltersSearched] = useState<ModelType.AllFilters>({ task: [], library: [], dataset: [], other: [], language: [] })
    let { locationState } = props
    const [currCategory, setCurrCategory] = useState<ModelType.ActiveFiltersKey>(locationState ? locationState.currCategory : "task")
    const [inputValue, setInputValue] = useState<string>("")
    const inputRef: any = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch();
    const [activeFilters, allFilters]: [ModelType.ActiveFilters, ModelType.AllFilters] = useSelector((state: RootState) => [state.modelList.data.activeFilters, state.modelList.data.allFilters])

    const labelButtonArr = modelLabelConversionArray;
    // axios获取数据
    useEffect(() => {
        console.log(allFilters);
        setAllFiltersSearched(allFilters)
    }, [allFilters])

    //点击切换标签分类按钮
    const handleClickCategory = useCallback((name: ModelType.ActiveFiltersKey) => {
        return () => {
            setInputValue('')
            setAllFiltersSearched(allFilters)
            setCurrCategory(name);
        }
    }, [allFilters])

    //input输入信息后过滤modelLabel
    const inputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value)
        let newExpandedKeys;
        if (currCategory !== "task") {
            newExpandedKeys = (allFilters[currCategory] as Array<string>)
                .filter((item) => {
                    return item.toLowerCase().indexOf(value.toLowerCase()) > -1
                })
        } else {
            newExpandedKeys = allFilters[currCategory].filter((item) => {
                return item[0].toLowerCase().indexOf(value.toLowerCase()) > -1
            })
        }
        setAllFiltersSearched({ ...allFiltersSearched, [currCategory]: newExpandedKeys })
        console.log(allFiltersSearched);
    }, [currCategory, allFilters, allFiltersSearched])

    const resetActiveFilters = useCallback(() => {
        dispatch(resetModelListAsync([currCategory]))
    }, [dispatch, currCategory])

    //根据当前点击的分类按钮渲染对应组件
    const renderCurrCategory = useCallback((currCategory: ModelType.ActiveFiltersKey) => {
        if (currCategory === "task") {
            return <TasksMainPage type="model">{allFiltersSearched[currCategory]}</TasksMainPage>
        } else {
            return <LabelBlock type="model" value={currCategory}>{allFiltersSearched[currCategory]}</LabelBlock >
        }
    }, [allFiltersSearched])

    return (
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
                <Input placeholder={`Filter ${currCategory} by name`} onChange={inputOnChange} ref={inputRef} value={inputValue} width="100%"></Input>
                {activeFilters[currCategory].length === 0 ?
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
        </Space>
    )
}
