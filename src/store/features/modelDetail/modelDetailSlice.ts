import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchModelDetail } from './modelDetailAPI';


//初始值
const initialState: LoadingStatusType.LoadingStatus<ResponseDataType.ResponseData<ModelDetailType.ModelDetail>> = {
    responseData: {
        code: 0,
        msg: "no such item",
        data: {
            activeFilters: {
                task: [],
                library: [],
                dataset: [],
                language: [],
                other: [],
            },
            lastModified: "1970-01-01T00:00:00",
            lastModifiedInformation: "",
            name: "",
            author: "",
            avatar: "",
            downloads: 0,
            id: "",
            type: "",
            isPrivate: true
        },
    },
    isLoading: true,
    isError: false,
};

//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。
//getmodelDetailAsyncRemove
export const getModelDetailAsync: any = createAsyncThunk(
    'modelDetail/getmodelDetailAsync',
    async (name: string) => {
        const response = await fetchModelDetail(name);
        // console.log(response.data)
        return response.data;
    }
)

export const modelDetailSlice: any = createSlice({
    name: 'modelDetail',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        // setActiveMenu: (state, action: PayloadAction<any>) => {
        //     state.responseData.data.activeMenu = action.payload
        // },

        // //去除activeFilter中的值
        // removeModelDetail: (state, action: PayloadAction<any>) => {
        //     let dispatchData = action.payload;
        //     //覆盖state的activeFilters
        //     state.activeFilters[dispatchData.key as ModelDetailType.ActiveFiltersKey] = state.activeFilters[dispatchData.key as ModelDetailType.ActiveFiltersKey].filter((value) => {
        //         return value !== dispatchData.value
        //     })
        //     //修改state的otherOptions            
        //     state.otherOptions.pageIndex = 1
        // },
        // //reset当前分类的activeFilter
        resetModelDetail: (state) => {

            //覆盖state的activeFilters
            state.responseData = {
                code: 0,
                msg: "no such item",
                data: {
                    activeFilters: {
                        task: [],
                        library: [],
                        dataset: [],
                        language: [],
                        other: [],
                    },
                    lastModified: "1970-01-01T00:00:00",
                    lastModifiedInformation: "",
                    name: "",
                    author: "",
                    avatar: "",
                    downloads: 0,
                    id: "",
                    type: "",
                    isPrivate: true
                },
            }
        },
    },
    // “extraReducers”字段允许切片处理其他地方定义的动作，
    // 包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            //两个异步函数的成功和失败后的处理
            .addCase(getModelDetailAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getModelDetailAsync.fulfilled, (state, action) => {
                //更新modelDetail
                if (action.payload.msg === "no such item") {
                    console.log(action);
                } else {
                    state.responseData = action.payload
                    // for (let key in state.responseData.data) {
                    //     (state.responseData.data as any)[key] = action.payload.data[key]
                    // }
                }
                state.isLoading = false;
                //更新modelDetail数量
                console.log('getModelDetailAsync')
            }).addCase(getModelDetailAsync.rejected, (state) => {
                state.isError = true;
                console.log('error', state)
            })
    },
});

// export const { setActiveMenu } = modelDetailSlice.actions;
// export const { removeModelDetail } = modelDetailSlice.actions;
// export const { resetModelDetail } = modelDetailSlice.actions;

//下面的函数称为选择器，允许我们从中选择一个值
// the state. Selectors选择器也可以在使用它们而不是
//在切片文件中。例如：`useSelector（（state:RootState）=>state.modelDetail.input）`
// export const getModelDetailFromState = (state: RootState) => state.modelDetail;

//我们也可以手动编写thunk，它可能包含同步和异步逻辑。
//下面是一个基于当前状态有条件地调度动作的示例。
// export const getmodelDetailByFilter =
//     (filter: { activeFilters: ModelDetailType.ActiveFilters, first: boolean }): AppThunk =>
//         (dispatch, getState) => {
//             const selectFilter = (state: RootState) => state.activeFilters;
//             const FiltersFromState = selectFilter(getState())
//             if(FiltersFromState)
//             dispatch(getmodelDetailAsync(filter));
//         };

export default modelDetailSlice.reducer;
