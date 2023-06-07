import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchPersonalFiles } from './personalFilesAPI';

//初始值
const initialState: LoadingStatusType.LoadingStatus<ResponseDataType.ResponseData<PersonalFilesType.List>> = {
    responseData: {
        code: 0,
        msg: "",
        data: {
            list: []
        },
    },
    isLoading: false,
    isError: false,
};
//加载状态包装器
//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。

//getpersonalFilesAsyncRemove
export const getPersonalFilesAsync: any = createAsyncThunk(
    'personalFiles/getPersonalFilesAsync',
    async (_, action) => {
        const userName: string = (action.getState() as RootState).logInInformation.data.personalInformation.userName
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
            .addCase(getPersonalFilesAsync.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getPersonalFilesAsync.fulfilled, (state, action) => {
                //更新personalFiles
                state.responseData.data = action.payload
                state.isLoading = false
                console.log('setPersonalFilesAsync')
            })
            .addCase(getPersonalFilesAsync.rejected, (state, error) => {
                state.isError = false
                console.log('error', error)
            })
    },
});

// export const { setPersonalFiles } = personalFilesSlice.actions;

export default personalFilesSlice.reducer;
