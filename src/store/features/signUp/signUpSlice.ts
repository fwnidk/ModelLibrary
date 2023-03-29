import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../store';
import { fetchSignUp } from './signUpAPI';

const initialState = {
    signUpStatus: 0
}

export const signUpAsync: any = createAsyncThunk(
    'signUp/fetchSignUp',
    async (signUpInformation: SignUpType.SignUp) => {
        const response = await fetchSignUp(signUpInformation);
        return response.data;
    }
);

export const signUpSlice: any = createSlice({
    name: 'signUp',
    initialState,
    //“reducers”字段允许我们定义reducers并生成相关操作
    reducers: {
        //使用PayloadAction类型声明`action.payload的内容`
    },
    //“extraReducers”字段允许切片处理其他地方定义的动作，
    //包括createAsyncThunk或其他切片中生成的动作。
    extraReducers: (builder) => {
        builder
            .addCase(signUpAsync.fulfilled, (state, action) => {
                state.signUpStatus = action.payload;
                console.log('signUpAsync')
            })
            .addCase(signUpAsync.rejected, (state) => {
                console.log('error', state)
            })
    },
});

export default signUpSlice.reducer;
