import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
// import { RootState, AppThunk } from '../../store';
import { fetchSignUp, fetchVerifyUsername } from './signUpAPI';

const initialState = {
    code: 0,
    msg: 'no login',
    data: {
        username: '',
        password: '',
        avatar: '',
        team: '',
    }
}
//验证用户名
export const verifyUsernameAsync: any = createAsyncThunk(
    'signUp/verifyUsername',
    async (signUpInformation: { username: string, password: string }) => {
        const response = await fetchVerifyUsername(signUpInformation.username);
        return response.data;
    }
);
//提交注册表单
export const submitSignUpFormAsync: any = createAsyncThunk(
    'signUp/submitSignUpForm',
    async (signUpInformation: any, action) => {
        action.dispatch(fillForm(signUpInformation));
        let form = (action.getState() as RootState).signUpInformation.data
        const response = await fetchSignUp(form);
        return response.data;
    }
);

export const signUpSlice: any = createSlice({
    name: 'signUp',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        fillForm: (state, action) => {
            state.data = { ...state.data, ...action.payload }
        }
        // unMountSignUp: (state) => {
        //     state.code = 0;
        // }
        //使用PayloadAction类型声明`action.payload的内容`
    },
    //“extraReducers”字段允许切片处理其他地方定义的动作，
    //包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            .addCase(verifyUsernameAsync.fulfilled, (state, action) => {
                state.code = action.payload;
                if (state.code === 1 && state.msg === 'verification successful') {
                    state.data.username = action.meta.arg.username;
                    state.data.password = action.meta.arg.password;
                }
                console.log('signUpAsync')
            })
            .addCase(verifyUsernameAsync.rejected, (state) => {
                console.log('error', state)
            })
            .addCase(submitSignUpFormAsync.fulfilled, (state, action) => {
                state = action.payload;
                console.log('submitSignUpFormAsync')
            })
            .addCase(submitSignUpFormAsync.rejected, (state) => {
                console.log('error', state)
            })
    },
});
export const { fillForm } = signUpSlice.actions;

export default signUpSlice.reducer;
