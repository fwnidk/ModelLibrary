import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDatasetDetail } from './datasetDetailAPI';


//初始值
const initialState: { data: DatasetDetailType.DatasetDetail, isLoading: boolean, isError: boolean } = {
    data: {
        activeFilters: {
            task: [],
            size: [],
            language: [],
            other: [],
        },
        options: {
            lastModified: "1970-01-01T00:00:00",
            lastModifiedInformation: "",
            name: "",
            author: "",
            downloads: 0,
            id: "",
            type: "",
        },
        filesTable: [],
        activeMenu: "0"
    },
    isLoading: true,
    isError: false,
};

//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。
//getdatasetDetailAsyncRemove
export const getDatasetDetailAsync: any = createAsyncThunk(
    'datasetDetail/getDatasetDetailAsync',
    async (name: string) => {
        const response = await fetchDatasetDetail(name);
        return response.data;
    }
)

export const datasetDetailSlice = createSlice({
    name: 'datasetDetail',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        setActiveMenu: (state, action: PayloadAction<any>) => {
            state.data.activeMenu = action.payload
        },
    },
    // “extraReducers”字段允许切片处理其他地方定义的动作，
    // 包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            //两个异步函数的成功和失败后的处理
            .addCase(getDatasetDetailAsync.pending, (state) => {
                state.isLoading = true;
            }).addCase(getDatasetDetailAsync.fulfilled, (state, action) => {
                //更新datasetDetail
                for (let key in state.data) {
                    (state.data as any)[key] = action.payload[key]
                }
                state.isLoading = false;
                //更新datasetDetail数量
                console.log('getDatasetDetailAsync')
            }).addCase(getDatasetDetailAsync.rejected, (state) => {
                state.isError = true;
                console.log('error', state)
            })
    },
});

export const { setActiveMenu } = datasetDetailSlice.actions;
// export const { removeDatasetDetail } = datasetDetailSlice.actions;
// export const { resetDatasetDetail } = datasetDetailSlice.actions;

//下面的函数称为选择器，允许我们从中选择一个值
// the state. Selectors选择器也可以在使用它们而不是
//在切片文件中。例如：`useSelector（（state:RootState）=>state.datasetDetail.input）`
// export const getDatasetDetailFromState = (state: RootState) => state.datasetDetail;

//我们也可以手动编写thunk，它可能包含同步和异步逻辑。
//下面是一个基于当前状态有条件地调度动作的示例。
// export const getdatasetDetailByFilter =
//     (filter: { activeFilters: DatasetDetailType.ActiveFilters, first: boolean }): AppThunk =>
//         (dispatch, getState) => {
//             const selectFilter = (state: RootState) => state.activeFilters;
//             const FiltersFromState = selectFilter(getState())
//             if(FiltersFromState)
//             dispatch(getdatasetDetailAsync(filter));
//         };

export default datasetDetailSlice.reducer;
