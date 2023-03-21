import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../store';
import { fetchFileContent } from './fileContentAPI';



const initialState = {
    data: null,
    isLoading: true,
    isError: null,
}

//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。
// fetches fetchFileContent information from the server
// FileContentSlice.ts


export const fetchFileContentAsync: any = createAsyncThunk(
    'fetchFileContent/fetchFileContent',
    async (filepath: string) => {
        const response = await fetchFileContent(filepath);
        return response.data;
    }
);


export const fileContentSlice: any = createSlice({
    name: 'fetchFileContent',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        //使用PayloadAction类型声明`action.payload的内容`
    },
    //“extraReducers”字段允许切片处理其他地方定义的动作，
    //包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            // .addCase(fetchFileContentAsync.pending, (state) => {
            // })
            .addCase(fetchFileContentAsync.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                console.log('fetchFileContentAsync')
            })
            .addCase(fetchFileContentAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error;
                console.log('error', action.error)
            })
    },
});

// export const { logout } = fileContentSlice.actions;

//下面的函数称为选择器，允许我们从中选择一个值
// the state. Selectors选择器也可以在使用它们而不是
//在切片文件中。例如：`useSelector（（state:RootState）=>state.fetchFileContent.input）`
// export const selectFileContent = (state: RootState) => state.fetchFileContent.input;

// //我们也可以手动编写thunk，它可能包含同步和异步逻辑。
// //下面是一个基于当前状态有条件地调度动作的示例。
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentinput = selectFileContent(getState());
//             if (currentinput % 2 === 1) {
//                 dispatch(incrementByAmount(amount));
//             }
//         };

export default fileContentSlice.reducer;
