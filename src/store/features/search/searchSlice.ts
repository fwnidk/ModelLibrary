import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../store';
import { fetchSearch } from './searchAPI';

export interface SearchState {
    input: string;
    getMessage: Array<any>
    // status: 'idle' | 'loading' | 'failed';
}

const initialState: SearchState = {
    input: "",
    getMessage: [],
    //     status: 'idle',
};

//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。
export const searchAsync: any = createAsyncThunk(
    'search/fetchSearch',
    async (str: string) => {
        const response = await fetchSearch(str);
        console.log(response.data.items);
        //我们返回的值成为“已完成”的操作负载
        return response.data.items;
    }
);

export const searchSlice:any = createSlice({
    name: 'search',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        changeSearchMessage: (state, action: PayloadAction<string>) => {
            state.input = action.payload
        },
        //使用PayloadAction类型声明`action.payload的内容`

    },
    //“extraReducers”字段允许切片处理其他地方定义的动作，
    //包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            // .addCase(searchAsync.pending, (state) => {
            // })
            .addCase(searchAsync.fulfilled, (state, action) => {
                state.getMessage = action.payload;
                console.log('finished',)
            })
            .addCase(searchAsync.rejected, (state) => {
                console.log('error', state)
            });
    },
});

export const { changeSearchMessage } = searchSlice.actions;

//下面的函数称为选择器，允许我们从中选择一个值
// the state. Selectors选择器也可以在使用它们而不是
//在切片文件中。例如：`useSelector（（state:RootState）=>state.search.input）`
// export const selectCount = (state: RootState) => state.search.input;

// //我们也可以手动编写thunk，它可能包含同步和异步逻辑。
// //下面是一个基于当前状态有条件地调度动作的示例。
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentinput = selectCount(getState());
//             if (currentinput % 2 === 1) {
//                 dispatch(incrementByAmount(amount));
//             }
//         };

export default searchSlice.reducer;
