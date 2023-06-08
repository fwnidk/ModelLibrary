import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchPersonalInformation } from './personalInformationAPI';

//初始值
const initialState: LoadingStatusType.LoadingStatus<ResponseDataType.ResponseData<PersonalInformation.PersonalInformation>> = {
    responseData: {
        code: 0,
        msg: "",
        data: {
            username: '',
            team: '',
            avatar: '',
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

//getPersonalInformationAsyncRemove
export const getPersonalInformationAsync: any = createAsyncThunk(
    'PersonalInformation/getPersonalInformationAsync',
    async (_, action) => {
        const response: any = await fetchPersonalInformation();
        return response.data;
    }
)

export const personalInformationSlice = createSlice({
    name: 'personalInformation',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        resetPersonalInformation: (state) => {
            state.responseData = {
                code: 0,
                msg: 'no login',
                data: {
                    username: '',
                    team: '',
                    avatar: '',
                }
            }
        },
        // setPersonalInformation: (state, action: PayloadAction<any>) => {
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPersonalInformationAsync.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getPersonalInformationAsync.fulfilled, (state, action) => {
                //更新PersonalInformation
                if (action.payload.code === 1) {
                    state.responseData = action.payload
                }
                state.isLoading = false
                console.log('getPersonalInformationAsync')
            })
            .addCase(getPersonalInformationAsync.rejected, (state, error) => {
                state.isError = true
                console.log('error', error)
            })
    },
});

export const { resetPersonalInformation } = personalInformationSlice.actions;

export default personalInformationSlice.reducer;
