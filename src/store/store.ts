import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import modelListReducer from './features/model/modelSlice';
import modelDetailReducer from './features/modelDetail/modelDetailSlice';
import datasetListReducer from './features/dataset/datasetSlice';
import datasetDetailReducer from './features/datasetDetail/datasetDetailSlice';
import logInReducer from './features/logIn/logInSlice';
import signUpReducer from './features/signUp/signUpSlice';
import personalFilesReducer from './features/personalFiles/personalFilesSlice';
import trendingListReducer from './features/trendingList/trendingListSlice';
import fileContentReducer from './features/fileContent/fileContentSlice';
import personalInformationReducer from './features/personalInformation/personalInformationSlice';

export const store: any = configureStore({
    reducer: {
        search: searchReducer,
        modelList: modelListReducer,
        datasetList: datasetListReducer,
        modelDetail: modelDetailReducer,
        datasetDetail: datasetDetailReducer,
        logIn: logInReducer,
        signUpInformation: signUpReducer,
        personalFiles: personalFilesReducer,
        trendingList: trendingListReducer,
        fileContent: fileContentReducer,
        personalInformation:personalInformationReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
