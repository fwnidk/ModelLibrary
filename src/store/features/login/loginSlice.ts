import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../store';
import { fetchLogIn } from './logInAPI';

const initialState: LoadingStatusType.Wrapper<LogInType.LogInInformation> = {
    data: {
        personalInformation: null,
        logInStatus: 0
    },
    isLoading: false,
    isError: false,
}

//下面的函数称为thunk，允许我们执行异步逻辑。它
//可以像常规操作一样进行调度：“dispatch（incrementAsync（10））”。这
//将使用“dispatch”函数作为第一个参数调用thunk。异步
//然后可以执行代码并分派其他操作。Thunks是
//通常用于发出异步请求。
// fetches logIn information from the server
// logInSlice.ts

export const logInAsync: any = createAsyncThunk(
    'logIn/fetchLogIn',
    async (logInInformation: LogInType.LogInForm) => {
        const response = await fetchLogIn(logInInformation);
        return response.data;
    }
);

export const logInByCookieAsync: any = createAsyncThunk(
    'logIn/fetchLogInByCookie',
    async (userInfo: string) => {
        const response = await fetchLogIn(userInfo);
        return response.data;
    }
);

export const logInSlice: any = createSlice({
    name: 'logIn',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        logout: (state) => {
            state.data = {
                personalInformation: null,
                logInStatus: 0
            }
        },
        //使用PayloadAction类型声明`action.payload的内容`

    },
    //“extraReducers”字段允许切片处理其他地方定义的动作，
    //包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            .addCase(logInAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logInByCookieAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logInAsync.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false
                console.log('logInAsync')
            })
            .addCase(logInByCookieAsync.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false
                console.log('logInByCookieAsync')
            })
            .addCase(logInAsync.rejected, (state) => {
                state.isError = true;
                console.log('error', state)
            })
            .addCase(logInByCookieAsync.rejected, (state) => {
                state.isError = true;
                console.log('error', state)
            })
    },
});

export const { logout } = logInSlice.actions;

//下面的函数称为选择器，允许我们从中选择一个值
// the state. Selectors选择器也可以在使用它们而不是
//在切片文件中。例如：`useSelector（（state:RootState）=>state.logIn.input）`
// export const selectLogIn = (state: RootState) => state.logIn.input;

// //我们也可以手动编写thunk，它可能包含同步和异步逻辑。
// //下面是一个基于当前状态有条件地调度动作的示例。
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentinput = selectLogIn(getState());
//             if (currentinput % 2 === 1) {
//                 dispatch(incrementByAmount(amount));
//             }
//         };

export default logInSlice.reducer;
