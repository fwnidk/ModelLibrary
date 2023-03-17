import React, { useCallback, useEffect, useRef, useState } from "react"
import { Space, Button, Input } from "antd"
import axios from "axios"
import "./index.css"
import TasksMainPage from "../../../components/TasksMainPage"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { resetDatasetListAsync } from "../../../store/features/dataset/datasetSlice"
import '../../../app/mock'
import LabelBlock from "../../../components/LabelBlock"
import { datasetLabelConversionArray } from "../../../app/LabelConversionArray"


export default function DatasetLabel(props: { locationState: any }) {

    const [datasetLabel, setDatasetLabel] = useState<DatasetType.DatasetLabelData>({ task: [], size: [], language: [], other: [], })
    const [datasetLabelSearched, setDatasetLabelSearched] = useState<DatasetType.DatasetLabelData>({ task: [], size: [], language: [], other: [], })
    let { locationState } = props;
    const [currCategory, setCurrCategory] = useState<DatasetType.ActiveFiltersKey>(locationState ? locationState.currCategory : "task")
    const [inputValue, setInputValue] = useState<string>("")
    const inputRef: any = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch();
    const activeFilters: DatasetType.ActiveFilters = useSelector((state: RootState) => state.datasetList.activeFilters)

    const labelButtonArr = datasetLabelConversionArray;
    // axios获取数据
    useEffect(() => {
        const getData = async () => {
            let response = await axios.get("/api/datasetLabel")
            let result = response.data
            setDatasetLabel(result)
            setDatasetLabelSearched(result)
        };
        getData().catch(console.error);
    }, [])

    //点击切换标签分类按钮
    const handleClickCategory = useCallback((name: DatasetType.ActiveFiltersKey) => {
        return () => {
            setInputValue('')
            setDatasetLabelSearched(datasetLabel)
            setCurrCategory(name);
        }
    }, [datasetLabel])
    //根据当前点击的分类按钮渲染对应组件

    //input输入信息后过滤datasetLabel
    const inputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value)
        let newExpandedKeys;
        if (currCategory !== "task") {
            newExpandedKeys = (datasetLabel[currCategory] as Array<string>)
                .filter((item) => {
                    return item.toLowerCase().indexOf(value.toLowerCase()) > -1
                })
        } else {
            newExpandedKeys = datasetLabel[currCategory].filter((item) => {
                return item[0].toLowerCase().indexOf(value.toLowerCase()) > -1
            })
        }
        setDatasetLabelSearched({ ...datasetLabelSearched, [currCategory]: newExpandedKeys })
        console.log(datasetLabelSearched);
    }, [currCategory, datasetLabel, datasetLabelSearched])

    const resetActiveFilters = useCallback(() => {
        dispatch(resetDatasetListAsync(currCategory))
    }, [currCategory, dispatch])

    const renderCurrCategory = (currCategory: DatasetType.ActiveFiltersKey) => {
        if (currCategory === "task") {
            return <TasksMainPage type="dataset" >{datasetLabelSearched[currCategory]}</TasksMainPage>
        } else {
            return <LabelBlock type="dataset" value={currCategory}>{datasetLabelSearched[currCategory]}</LabelBlock>
        }
    }

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
