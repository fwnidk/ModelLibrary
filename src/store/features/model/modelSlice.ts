import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchModelList } from './modelAPI';


//初始值
const initialState: ModelType.ModelList = {
    activeFilters: {
        task: [],
        library: [],
        dataset: [],
        other: [],
        language: []
    },
    otherOptions: {
        pageIndex: 1,
        sortType: "Most Downloads",
        filterByName: ""
    },
    models: [],
    numTotalItems: 0,
    loadingCompleted: false,
};

//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。

//getmodelListAsyncRemove
export const setModelListAsync: any = createAsyncThunk(
    'modelList/setModelListAsync',
    async (filter: { activeFilters: ModelType.ActiveFiltersPost, otherOptions: ModelType.OtherOptions, first: boolean }, action) => {
        //如果first为false，则为后续更新activeFilters数据
        if (!filter.first) {
            action.dispatch(setModelList(filter))
        }
        //如果重置页面索引，则resetPageIndex为true
        let resetPageIndex = true;
        if (filter.otherOptions.hasOwnProperty("pageIndex")) {
            resetPageIndex = false;
        }
        const response: any = await fetchModelList((action.getState() as RootState).modelList.activeFilters, (action.getState() as RootState).modelList.otherOptions, filter.first, resetPageIndex);
        return response.data;
    }
)

export const removeModelListAsync: any = createAsyncThunk(
    'modelList/removeModelListAsync',
    async (filter, action) => {
        action.dispatch(removeModelList(filter))
        const response: any = await fetchModelList((action.getState() as RootState).modelList.activeFilters, (action.getState() as RootState).modelList.otherOptions, false, true);
        return response.data;
    }
)

export const resetModelListAsync: any = createAsyncThunk(
    'modelList/resetModelListAsync',
    async (filter, action) => {
        action.dispatch(resetModelList(filter))
        const response: any = await fetchModelList((action.getState() as RootState).modelList.activeFilters, (action.getState() as RootState).modelList.otherOptions, false, true);
        return response.data;
    }
)
export const clearAllModelListAsync: any = createAsyncThunk(
    'modelList/clearAllListAsync',
    async (filter, action) => {
        action.dispatch(clearAllModelList(filter))
        const response: any = await fetchModelList((action.getState() as RootState).modelList.activeFilters, (action.getState() as RootState).modelList.otherOptions, false, true);
        return response.data;
    }
)


export const modelListSlice: any = createSlice({
    name: 'modelList',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        setModelList: (state, action: PayloadAction<any>) => {
            let dispatchData: ModelType.PostFilter = action.payload;
            //覆盖state的activeFilters
            if (JSON.stringify(dispatchData.activeFilters) !== "{}")
                for (let key in dispatchData.activeFilters) {
                    state.activeFilters[key as ModelType.ActiveFiltersKey].push(dispatchData.activeFilters[key as ModelType.ActiveFiltersKey] as string)
                }
            //修改state的otherOptions
            state.otherOptions = { ...state.otherOptions, ...dispatchData.otherOptions }
            if (!dispatchData.otherOptions.hasOwnProperty("pageIndex")) {
                state.otherOptions.pageIndex = 1
            }
        },
        //去除activeFilter中的值
        removeModelList: (state, action: PayloadAction<any>) => {
            let dispatchData = action.payload;
            //覆盖state的activeFilters
            state.activeFilters[dispatchData.key as ModelType.ActiveFiltersKey] = state.activeFilters[dispatchData.key as ModelType.ActiveFiltersKey].filter((value) => {
                return value !== dispatchData.value
            })
            //修改state的otherOptions            
            state.otherOptions.pageIndex = 1
        },
        //reset当前分类的activeFilter
        resetModelList: (state, action: PayloadAction<any>) => {
            let dispatchData: Array<string> = action.payload;
            //覆盖state的activeFilters
            for (let i of dispatchData) {
                state.activeFilters[i as ModelType.ActiveFiltersKey] = []
            }
            state.otherOptions.pageIndex = 1
        },
        //清空activeFilter
        clearAllModelList: () => {
            return {
                activeFilters: {
                    task: [],
                    library: [],
                    dataset: [],
                    other: [],
                    language: []
                },
                otherOptions: {
                    pageIndex: 1,
                    sortType: "Most Downloads",
                    filterByName: ""
                },
                models: [],
                numTotalItems: 0,
                loadingCompleted: false,
            }
        }
    },
    //“extraReducers”字段允许切片处理其他地方定义的动作，
    //包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            //两个异步函数的成功和失败后的处理
            .addCase(setModelListAsync.fulfilled, (state: ModelType.ModelList, action) => {
                //更新modelList
                state.models = action.payload.modelList
                //更新modelList数量
                if (action.payload.hasOwnProperty('numTotalItems')) {
                    state.numTotalItems = action.payload.numTotalItems;
                }
                state.loadingCompleted = true;
                console.log('setModelListAsync')
            })
            .addCase(removeModelListAsync.fulfilled, (state: ModelType.ModelList, action) => {
                //更新modelList
                state.models = action.payload.modelList
                //更新modelList数量             
                state.numTotalItems = action.payload.numTotalItems;
                state.loadingCompleted = true;
                console.log('removeModelListAsync')
            })
            .addCase(resetModelListAsync.fulfilled, (state: ModelType.ModelList, action) => {
                //更新modelList
                state.models = action.payload.modelList
                //更新modelList数量             
                state.numTotalItems = action.payload.numTotalItems;
                state.loadingCompleted = true;
                console.log('resetModelListAsync')
            })
            // .addCase(clearAllModelListAsync.fulfilled, (state: ModelType.ModelList, action) => {
            //     //更新modelList
            //     state.models = action.payload.modelList
            //     //更新modelList数量             
            //     state.numTotalItems = action.payload.numTotalItems;
            //     console.log('clearAllModelListAsync')
            // })
            .addCase(setModelListAsync.rejected, (state) => {
                console.log('error', state)
            })
            .addCase(removeModelListAsync.rejected, (state) => {
                console.log('error', state)
            })
            .addCase(resetModelListAsync.rejected, (state) => {
                console.log('error', state)
            })
        // .addCase(clearAllModelListAsync.rejected, (state) => {
        //     console.log('error', state)
        // })
    },
});

export const { setModelList } = modelListSlice.actions;
export const { removeModelList } = modelListSlice.actions;
export const { resetModelList } = modelListSlice.actions;
export const { clearAllModelList } = modelListSlice.actions;

//下面的函数称为选择器，允许我们从中选择一个值
// the state. Selectors选择器也可以在使用它们而不是
//在切片文件中。例如：`useSelector（（state:RootState）=>state.modelList.input）`
// export const getModelListFromState = (state: RootState) => state.modelList;

//我们也可以手动编写thunk，它可能包含同步和异步逻辑。
//下面是一个基于当前状态有条件地调度动作的示例。
// export const getmodelListByFilter =
//     (filter: { activeFilters: ModelType.ActiveFilters, first: boolean }): AppThunk =>
//         (dispatch, getState) => {
//             const selectFilter = (state: RootState) => state.activeFilters;
//             const FiltersFromState = selectFilter(getState())
//             if(FiltersFromState)
//             dispatch(getmodelListAsync(filter));
//         };

export default modelListSlice.reducer;
