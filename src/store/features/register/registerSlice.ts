import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
// import { RootState, AppThunk } from '../../store';
import { fetchRegister, fetchVerifyUsername } from './registerAPI';

const initialState = {
    responseData: {
        code: 0,
        msg: 'no login',
        data: {
            username: '',
            password: '',
            avatar: '',
            team: '',
        }
    },
    isLoading: false,
    isError: false,
}
//验证用户名
export const verifyUsernameAsync: any = createAsyncThunk(
    'register/verifyUsername',
    async (registerInformation: { username: string, password: string }) => {
        const response = await fetchVerifyUsername(registerInformation.username);
        return response.data;
    }
);
//提交注册表单
export const submitRegisterFormAsync: any = createAsyncThunk(
    'register/submitRegisterForm',
    async (formData: any, action) => {
        // action.dispatch(fillForm(register));
        let { username, password } = (action.getState() as RootState).register.responseData.data
        console.log('username,password', username, password);
        formData.append('username', username)
        formData.append('password', password)
        const response = await fetchRegister(formData);
        return response.data;
    }
);

export const registerSlice: any = createSlice({
    name: 'register',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        fillForm: (state, action) => {
            state.responseData.data = { ...state.responseData.data, ...action.payload }
        },
        resetPersonalInformation: (state, action) => {
            state.responseData.code = 0;
            state.responseData.msg = 'no login';
        },
        // unMountRegister: (state) => {
        //     state.code = 0;
        // }
        //使用PayloadAction类型声明`action.payload的内容`
    },
    //“extraReducers”字段允许切片处理其他地方定义的动作，
    //包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            .addCase(verifyUsernameAsync.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(verifyUsernameAsync.fulfilled, (state, action) => {
                state.responseData.code = action.payload.code;
                if (action.payload.code === 1 && action.payload.msg === 'verification successful') {
                    state.responseData.code = 1;
                    state.responseData.msg = 'verification successful'
                    state.responseData.data.username = action.meta.arg.username;
                    state.responseData.data.password = action.meta.arg.password;
                }
                state.isLoading = false
                console.log('registerAsync')
            })
            .addCase(verifyUsernameAsync.rejected, (state) => {
                state.isError = true
                console.log('error', state)
            })
            .addCase(submitRegisterFormAsync.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(submitRegisterFormAsync.fulfilled, (state, action) => {
                state.responseData = action.payload;
                state.isLoading = false
                console.log('submitRegisterFormAsync')
            })
            .addCase(submitRegisterFormAsync.rejected, (state) => {
                // state.isError = true
                console.log('error', state)
            })
    },
});
export const { fillForm } = registerSlice.actions;
export const { resetPersonalInformation } = registerSlice.actions;

export default registerSlice.reducer;
