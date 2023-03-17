import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchDatasetList } from './datasetAPI';


//初始值
const initialState: DatasetType.DatasetList = {
    activeFilters: {
        task: [],
        other: [],
        language: [],
        size: [],

    },
    otherOptions: {
        pageIndex: 1,
        sortType: "Most Downloads",
        filterByName: ""
    },
    datasets: [],
    numTotalItems: 0,
    loadingCompleted: false,
};

//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。

//getDatasetListAsyncRemove
export const setDatasetListAsync: any = createAsyncThunk(
    'datasetList/getDatasetListAsync',
    async (filter: {
        activeFilters: DatasetType.ActiveFilters
        , otherOptions: DatasetType.OtherOptions, first: boolean
    }, action) => {
        action.dispatch(setDatasetList(filter))
        // console.log('filter: ', filter);
        //如果重置页面索引，则resetPageIndex为true
        let resetPageIndex = true;
        if (filter.otherOptions.hasOwnProperty("pageIndex")) {
            resetPageIndex = false;
        }
        const response = await fetchDatasetList((action.getState() as RootState).datasetList.activeFilters, (action.getState() as RootState).datasetList.otherOptions, filter.first, resetPageIndex);
        return response.data;
    }
)

export const removeDatasetListAsync: any = createAsyncThunk(
    'datasetList/removeDatasetListAsync',
    async (filter, action) => {
        action.dispatch(removeDatasetList(filter))
        const response: any = await fetchDatasetList((action.getState() as RootState).datasetList.activeFilters, (action.getState() as RootState).datasetList.otherOptions, false, true);
        return response.data;
    }
)

export const resetDatasetListAsync: any = createAsyncThunk(
    'datasetList/resetDatasetListAsync',
    async (filter, action) => {
        action.dispatch(resetDatasetList(filter))
        const response: any = await fetchDatasetList((action.getState() as RootState).datasetList.activeFilters, (action.getState() as RootState).datasetList.otherOptions, false, true);
        return response.data;
    }
)

export const datasetListSlice = createSlice({
    name: 'datasetList',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        setDatasetList: (state, action: PayloadAction<any>) => {
            let dispatchData: DatasetType.PostFilter = action.payload;
            //覆盖state的activeFilters
            if (JSON.stringify(dispatchData.activeFilters) !== "{}")
                for (let key in dispatchData.activeFilters) {
                    state.activeFilters[key as DatasetType.ActiveFiltersKey].push(dispatchData.activeFilters[key as DatasetType.ActiveFiltersKey] as string)
                }
            //修改state的otherOptions
            state.otherOptions = { ...state.otherOptions, ...dispatchData.otherOptions }
            if (!dispatchData.otherOptions.hasOwnProperty("pageIndex")) {
                state.otherOptions.pageIndex = 1
            }
        },
        //去除activeFilter中的值
        removeDatasetList: (state, action: PayloadAction<any>) => {
            let dispatchData = action.payload;
            //覆盖state的activeFilters
            state.activeFilters[dispatchData.key as DatasetType.ActiveFiltersKey] = state.activeFilters[dispatchData.key as DatasetType.ActiveFiltersKey].filter((value) => {
                return value !== dispatchData.value
            })
            //修改state的otherOptions            
            state.otherOptions.pageIndex = 1
        },
        //reset当前分类的activeFilter
        resetDatasetList: (state, action: PayloadAction<any>) => {
            let dispatchData = action.payload;
            //覆盖state的activeFilters
            state.activeFilters[dispatchData as DatasetType.ActiveFiltersKey] = []
            state.otherOptions.pageIndex = 1
        },
        clearAllDatasetList: () => {
            return {
                activeFilters: {
                    task: [],
                    other: [],
                    language: [],
                    size: [],

                },
                otherOptions: {
                    pageIndex: 1,
                    sortType: "Most Downloads",
                    filterByName: ""
                },
                datasets: [],
                numTotalItems: 0,
                loadingCompleted: false,
            }
        },
    },
    //“extraReducers”字段允许切片处理其他地方定义的动作，
    //包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            // 两个异步函数的成功和失败后的处理
            .addCase(setDatasetListAsync.fulfilled, (state: DatasetType.DatasetList, action) => {
                //更新datasetList
                state.datasets = action.payload.datasetList
                //更新datasetList数量
                if (action.payload.hasOwnProperty('numTotalItems')) {
                    state.numTotalItems = action.payload.numTotalItems;
                }
                state.loadingCompleted = true;
                console.log('setDatasetListAsync')
            })
            .addCase(removeDatasetListAsync.fulfilled, (state: DatasetType.DatasetList, action) => {
                //更新datasetList
                state.datasets = action.payload.datasetList
                //更新datasetList数量
                state.numTotalItems = action.payload.numTotalItems;
                state.loadingCompleted = true;
                console.log('removeDatasetListAsync')
            })
            .addCase(resetDatasetListAsync.fulfilled, (state: DatasetType.DatasetList, action) => {
                //更新datasetList
                state.datasets = action.payload.datasetList
                //更新datasetList数量
                state.numTotalItems = action.payload.numTotalItems;
                state.loadingCompleted = true;
                console.log('resetDatasetListAsync')
            })
            .addCase(setDatasetListAsync.rejected, (state) => {
                console.log('error', state)
            })
            .addCase(removeDatasetListAsync.rejected, (state) => {
                console.log('error', state)
            })
            .addCase(resetDatasetListAsync.rejected, (state) => {
                console.log('error', state)
            })
    },
});

export const { setDatasetList } = datasetListSlice.actions;
export const { removeDatasetList } = datasetListSlice.actions;
export const { resetDatasetList } = datasetListSlice.actions;
export const { clearAllDatasetList } = datasetListSlice.actions;


//下面的函数称为选择器，允许我们从中选择一个值
// the state. Selectors选择器也可以在使用它们而不是
//在切片文件中。例如：`useSelector（（state:RootState）=>state.datasetList.input）`
// export const getDatasetListFromState = (state: RootState) => state.datasetList;

//我们也可以手动编写thunk，它可能包含同步和异步逻辑。
//下面是一个基于当前状态有条件地调度动作的示例。
// export const getdatasetListByFilter =
//     (filter: { activeFilters: IactiveFilters, first: boolean }): AppThunk =>
//         (dispatch, getState) => {
//             const selectFilter = (state: RootState) => state.activeFilters;
//             const FiltersFromState = selectFilter(getState())
//             if(FiltersFromState)
//             dispatch(getDatasetListAsync(filter));
//         };

export default datasetListSlice.reducer;
