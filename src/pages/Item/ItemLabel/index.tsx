import React, { useCallback, useEffect, useState } from "react"
import { Space, Button, Input } from "antd"
import './index.scss'
import TasksMainPage from "../../../components/TasksMainPage"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
// import "../../../app/mock"
import LabelBlock from "../../../components/LabelBlock"
import { labelConversionArray } from "../../../app/labelConversionArray"
import { resetModelListAsync } from "../../../store/features/model/modelSlice"
import { resetDatasetListAsync } from "../../../store/features/dataset/datasetSlice"


export default function ItemLabel(props: { locationState: any, type: string }) {
    const { type } = props;
    const [allFiltersSearched, setAllFiltersSearched] = useState<any>(type === 'model' ? { task: [], library: [], dataset: [], other: [], language: [] } : { task: [], size: [], other: [], language: [] })
    let { locationState } = props
    const [currCategory, setCurrCategory] = useState<any>(locationState ? locationState.currCategory : "task")
    const [inputValue, setInputValue] = useState<string>("")
    const dispatch = useDispatch();
    const [activeFilters, allFilters] = useSelector((state: RootState) => type === 'model' ?
        [state.modelList.data.activeFilters, state.modelList.data.allFilters] :
        [state.datasetList.data.activeFilters, state.datasetList.data.allFilters])
    // axios获取数据
    useEffect(() => {
        setAllFiltersSearched(allFilters)
    }, [allFilters])

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
        if (currCategory !== "task") {
            newExpandedKeys = ((allFilters as any)[currCategory] as Array<string>)
                .filter((item) => {
                    return item.toLowerCase().indexOf(value.toLowerCase()) > -1
                })
        } else {
            newExpandedKeys = (allFilters as any)[currCategory].filter((item: any) => {
                return item[0].toLowerCase().indexOf(value.toLowerCase()) > -1
            })
        }
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
        if (currCategory === "task") {
            return <TasksMainPage type={type}>{allFiltersSearched[currCategory]}</TasksMainPage>
        } else {
            return <LabelBlock type={type} value={currCategory}>{allFiltersSearched[currCategory]}</LabelBlock >
        }
    }, [allFiltersSearched, type])

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
        </Space>
    )
}
