import React, { useCallback, useEffect, useRef, useState } from "react"
import { Space, Button, Input } from "antd"
import axios from "axios"
import './index.scss'
import TasksMainPage from "../../../components/TasksMainPage"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import "../../../app/mock"
import { resetModelListAsync } from "../../../store/features/model/modelSlice"
import LabelBlock from "../../../components/LabelBlock"
import { modelLabelConversionArray } from "../../../app/LabelConversionArray"


export default function ModelLabel(props: { locationState: any }) {
    const [modelLabel, setModelLabel]: [ModelType.ModelLabelData, any] = useState({ task: [], library: [], dataset: [], other: [], language: [] })
    const [modelLabelSearched, setModelLabelSearched] = useState<ModelType.ModelLabelData>({ task: [], library: [], dataset: [], other: [], language: [] })
    let { locationState } = props
    const [currCategory, setCurrCategory] = useState<ModelType.ActiveFiltersKey>(locationState ? locationState.currCategory : "task")
    const [inputValue, setInputValue] = useState<string>("")
    const inputRef: any = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch();
    const activeFilters: ModelType.ActiveFilters = useSelector((state: RootState) => state.modelList.activeFilters)

    const labelButtonArr = modelLabelConversionArray;
    // axios获取数据
    useEffect(() => {
        const getData = async () => {
            let response = await axios.get("/api/modelLabel")
            let result = response.data
            setModelLabel(result)
            setModelLabelSearched(result)
        };
        getData().catch(console.error);
    }, [])

    //点击切换标签分类按钮
    const handleClickCategory = useCallback((name: ModelType.ActiveFiltersKey) => {
        return () => {
            setInputValue('')
            setModelLabelSearched(modelLabel)
            setCurrCategory(name);
        }
    }, [modelLabel])

    //input输入信息后过滤modelLabel
    const inputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value)
        let newExpandedKeys;
        if (currCategory !== "task") {
            newExpandedKeys = (modelLabel[currCategory] as Array<string>)
                .filter((item) => {
                    return item.toLowerCase().indexOf(value.toLowerCase()) > -1
                })
        } else {
            newExpandedKeys = modelLabel[currCategory].filter((item) => {
                return item[0].toLowerCase().indexOf(value.toLowerCase()) > -1
            })
        }
        setModelLabelSearched({ ...modelLabelSearched, [currCategory]: newExpandedKeys })
        console.log(modelLabelSearched);
    }, [currCategory, modelLabel, modelLabelSearched])

    const resetActiveFilters = useCallback(() => {
        dispatch(resetModelListAsync([currCategory]))
    }, [dispatch, currCategory])

    //根据当前点击的分类按钮渲染对应组件
    const renderCurrCategory = useCallback((currCategory: ModelType.ActiveFiltersKey) => {
        if (currCategory === "task") {
            return <TasksMainPage type="model">{modelLabelSearched[currCategory]}</TasksMainPage>
        } else {
            return <LabelBlock type="model" value={currCategory}>{modelLabelSearched[currCategory]}</LabelBlock >
        }
    }, [modelLabelSearched])

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
