import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchPersonalFiles } from './personalFilesAPI';

//初始值
const initialState: PersonalFilesType.List = {
    list:[]
};

//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。

//getpersonalFilesAsyncRemove
export const setPersonalFilesAsync: any = createAsyncThunk(
    'personalFiles/setPersonalFilesAsync',
    async (_, action) => {
        const userName: string = (action.getState() as RootState).loginInformation.personalInformation.userName
        const response: any = await fetchPersonalFiles(userName);
        // console.log(response.data);
        return response.data;
    }
)

export const personalFilesSlice = createSlice({
    name: 'personalFiles',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        // setPersonalFiles: (state, action: PayloadAction<any>) => {

        // },
    },
    extraReducers: (builder) => {
        builder
            //两个异步函数的成功和失败后的处理
            .addCase(setPersonalFilesAsync.fulfilled, (state: PersonalFilesType.List, action) => {
                //更新personalFiles
                state = action.payload
                console.log('setPersonalFilesAsync')
                return state
            })

            .addCase(setPersonalFilesAsync.rejected, (state) => {
                console.log('error', state)
            })
    },
});

// export const { setPersonalFiles } = personalFilesSlice.actions;

export default personalFilesSlice.reducer;
