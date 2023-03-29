import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchTrendingList } from './trendingListAPI';

//初始值
const initialState: TrendingListType.List = {
    list:[]
};

//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。

export const setTrendingListAsync: any = createAsyncThunk(
    'trendingList/setTrendingListAsync',
    async (_, action) => {
        const userName: string = (action.getState() as RootState).logInInformation.personalInformation.userName
        const response: any = await fetchTrendingList(userName);
        // console.log(response.data);
        return response.data;
    }
)

export const trendingListSlice = createSlice({
    name: 'trendingList',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        // setTrendingList: (state, action: PayloadAction<any>) => {

        // },
    },
    extraReducers: (builder) => {
        builder
            //两个异步函数的成功和失败后的处理
            .addCase(setTrendingListAsync.fulfilled, (state: TrendingListType.List, action) => {
                //更新trendingList
                state = action.payload
                console.log('setTrendingListAsync')
                return state
            })

            .addCase(setTrendingListAsync.rejected, (state) => {
                console.log('error', state)
            })
    },
});

// export const { setTrendingList } = trendingListSlice.actions;

export default trendingListSlice.reducer;
