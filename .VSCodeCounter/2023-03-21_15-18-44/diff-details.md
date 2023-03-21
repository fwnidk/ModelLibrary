# Diff Details

Date : 2023-03-21 15:18:44

Directory f:\\研究生学习\\编程学习\\my_projects\\model_library_ts

Total : 130 files,  38926 codes, 502 comments, 328 blanks, all 39756 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.env](/.env) | Properties | 1 | 0 | 0 | 1 |
| [README.md](/README.md) | Markdown | 26 | 0 | 21 | 47 |
| [config/env.js](/config/env.js) | JavaScript | 59 | 35 | 11 | 105 |
| [config/getHttpsConfig.js](/config/getHttpsConfig.js) | JavaScript | 51 | 7 | 9 | 67 |
| [config/jest/babelTransform.js](/config/jest/babelTransform.js) | JavaScript | 25 | 0 | 5 | 30 |
| [config/jest/cssTransform.js](/config/jest/cssTransform.js) | JavaScript | 9 | 3 | 3 | 15 |
| [config/jest/fileTransform.js](/config/jest/fileTransform.js) | JavaScript | 31 | 4 | 6 | 41 |
| [config/modules.js](/config/modules.js) | JavaScript | 80 | 30 | 25 | 135 |
| [config/paths.js](/config/paths.js) | JavaScript | 55 | 10 | 13 | 78 |
| [config/webpack.config.js](/config/webpack.config.js) | JavaScript | 603 | 188 | 23 | 814 |
| [config/webpackDevServer.config.js](/config/webpackDevServer.config.js) | JavaScript | 63 | 58 | 7 | 128 |
| [config/webpack/persistentCache/createEnvironmentHash.js](/config/webpack/persistentCache/createEnvironmentHash.js) | JavaScript | 7 | 0 | 3 | 10 |
| [craco.config.js](/craco.config.js) | JavaScript | 2 | 1 | 0 | 3 |
| [package-lock.json](/package-lock.json) | JSON | 35,974 | 0 | 1 | 35,975 |
| [package.json](/package.json) | JSON | 187 | 0 | 1 | 188 |
| [public/font.css](/public/font.css) | CSS | 4 | 0 | 0 | 4 |
| [public/index.html](/public/index.html) | HTML | 18 | 23 | 3 | 44 |
| [public/manifest.json](/public/manifest.json) | JSON | 25 | 0 | 1 | 26 |
| [scripts/build.js](/scripts/build.js) | JavaScript | 174 | 21 | 23 | 218 |
| [scripts/start.js](/scripts/start.js) | JavaScript | 122 | 17 | 16 | 155 |
| [scripts/test.js](/scripts/test.js) | JavaScript | 36 | 7 | 10 | 53 |
| [src/App.tsx](/src/App.tsx) | TypeScript JSX | -1 | -2 | -3 | -6 |
| [src/app/getTimeAgoString.ts](/src/app/getTimeAgoString.ts) | TypeScript | 27 | 0 | 2 | 29 |
| [src/app/getTimeYMD.ts](/src/app/getTimeYMD.ts) | TypeScript | 7 | 0 | 0 | 7 |
| [src/app/icons/modelIcon.svg](/src/app/icons/modelIcon.svg) | XML | 12 | 0 | 0 | 12 |
| [src/app/icons/profile.svg](/src/app/icons/profile.svg) | XML | 11 | 0 | 0 | 11 |
| [src/app/icons/raw.svg](/src/app/icons/raw.svg) | XML | 7 | 0 | 0 | 7 |
| [src/app/mock.ts](/src/app/mock.ts) | TypeScript | 109 | 4 | 5 | 118 |
| [src/components/CategoryLabel/index.css](/src/components/CategoryLabel/index.css) | CSS | -9 | 0 | -2 | -11 |
| [src/components/CategoryLabel/index.scss](/src/components/CategoryLabel/index.scss) | SCSS | 8 | 0 | 1 | 9 |
| [src/components/CodeDisplay/index.scss](/src/components/CodeDisplay/index.scss) | SCSS | 68 | 3 | 15 | 86 |
| [src/components/CodeDisplay/index.tsx](/src/components/CodeDisplay/index.tsx) | TypeScript JSX | 105 | 12 | 11 | 128 |
| [src/components/CodeEditor/index.scss](/src/components/CodeEditor/index.scss) | SCSS | 3 | 0 | 0 | 3 |
| [src/components/CodeEditor/index.tsx](/src/components/CodeEditor/index.tsx) | TypeScript JSX | 48 | 2 | 12 | 62 |
| [src/components/Commit/index.tsx](/src/components/Commit/index.tsx) | TypeScript JSX | 20 | 0 | 4 | 24 |
| [src/components/DatasetItem/index.css](/src/components/DatasetItem/index.css) | CSS | -11 | 0 | -2 | -13 |
| [src/components/DatasetItem/index.scss](/src/components/DatasetItem/index.scss) | SCSS | 13 | 0 | 2 | 15 |
| [src/components/DatasetItem/index.tsx](/src/components/DatasetItem/index.tsx) | TypeScript JSX | 1 | 0 | 0 | 1 |
| [src/components/DatasetListItem/index.tsx](/src/components/DatasetListItem/index.tsx) | TypeScript JSX | 15 | 0 | 3 | 18 |
| [src/components/DiffComponent/index.scss](/src/components/DiffComponent/index.scss) | SCSS | 58 | 3 | 12 | 73 |
| [src/components/DiffComponent/index.tsx](/src/components/DiffComponent/index.tsx) | TypeScript JSX | 54 | 5 | 4 | 63 |
| [src/components/ErrorStatus/index.tsx](/src/components/ErrorStatus/index.tsx) | TypeScript JSX | 6 | 0 | 2 | 8 |
| [src/components/FileBreadcrumb/index.scss](/src/components/FileBreadcrumb/index.scss) | SCSS | 8 | 0 | 1 | 9 |
| [src/components/FileBreadcrumb/index.tsx](/src/components/FileBreadcrumb/index.tsx) | TypeScript JSX | 29 | 1 | 2 | 32 |
| [src/components/FilesTableHeader/index.scss](/src/components/FilesTableHeader/index.scss) | SCSS | 33 | 0 | 4 | 37 |
| [src/components/FilesTableHeader/index.tsx](/src/components/FilesTableHeader/index.tsx) | TypeScript JSX | 21 | 0 | 2 | 23 |
| [src/components/GlobalHeader/index.css](/src/components/GlobalHeader/index.css) | CSS | -51 | -4 | -8 | -63 |
| [src/components/GlobalHeader/index.scss](/src/components/GlobalHeader/index.scss) | SCSS | 49 | 1 | 9 | 59 |
| [src/components/GlobalHeader/index.tsx](/src/components/GlobalHeader/index.tsx) | TypeScript JSX | 58 | 1 | 1 | 60 |
| [src/components/HomeLoggedInItem/index.css](/src/components/HomeLoggedInItem/index.css) | CSS | -3 | 0 | 0 | -3 |
| [src/components/HomeLoggedInItem/index.tsx](/src/components/HomeLoggedInItem/index.tsx) | TypeScript JSX | -23 | 0 | -8 | -31 |
| [src/components/HomeLoggedIn/index.css](/src/components/HomeLoggedIn/index.css) | CSS | -23 | -1 | -2 | -26 |
| [src/components/HomeLoggedIn/index.tsx](/src/components/HomeLoggedIn/index.tsx) | TypeScript JSX | -50 | 0 | -2 | -52 |
| [src/components/LoadingStatus/index.scss](/src/components/LoadingStatus/index.scss) | SCSS | 5 | 1 | 0 | 6 |
| [src/components/LoadingStatus/index.tsx](/src/components/LoadingStatus/index.tsx) | TypeScript JSX | 10 | 0 | 2 | 12 |
| [src/components/ModelIcon/index.scss](/src/components/ModelIcon/index.scss) | SCSS | 15 | 0 | 4 | 19 |
| [src/components/ModelIcon/index.tsx](/src/components/ModelIcon/index.tsx) | TypeScript JSX | 8 | 0 | 2 | 10 |
| [src/components/ModelItem/index.css](/src/components/ModelItem/index.css) | CSS | -24 | -1 | -4 | -29 |
| [src/components/ModelItem/index.scss](/src/components/ModelItem/index.scss) | SCSS | 36 | 0 | 8 | 44 |
| [src/components/ModelItem/index.tsx](/src/components/ModelItem/index.tsx) | TypeScript JSX | 9 | 3 | 0 | 12 |
| [src/components/ModelListItem/index.scss](/src/components/ModelListItem/index.scss) | SCSS | 3 | 0 | 0 | 3 |
| [src/components/ModelListItem/index.tsx](/src/components/ModelListItem/index.tsx) | TypeScript JSX | 16 | 0 | 2 | 18 |
| [src/components/PersonalIcon/index.tsx](/src/components/PersonalIcon/index.tsx) | TypeScript JSX | 7 | 1 | 2 | 10 |
| [src/components/PersonalProfile/index.tsx](/src/components/PersonalProfile/index.tsx) | TypeScript JSX | -10 | 0 | -2 | -12 |
| [src/components/UpdateMessage/index.scss](/src/components/UpdateMessage/index.scss) | SCSS | 10 | 0 | 2 | 12 |
| [src/components/UpdateMessage/index.tsx](/src/components/UpdateMessage/index.tsx) | TypeScript JSX | 25 | 1 | 4 | 30 |
| [src/index.css](/src/index.css) | CSS | -8 | 0 | -1 | -9 |
| [src/index.scss](/src/index.scss) | SCSS | 38 | 1 | 9 | 48 |
| [src/models/FileContent.d.ts](/src/models/FileContent.d.ts) | TypeScript | 11 | 1 | 2 | 14 |
| [src/models/dataset.d.ts](/src/models/dataset.d.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/models/login.d.ts](/src/models/login.d.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/models/model.d.ts](/src/models/model.d.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/models/modelDetail.d.ts](/src/models/modelDetail.d.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/models/trendingList.d.ts](/src/models/trendingList.d.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [src/pages/CreateItem/index.scss](/src/pages/CreateItem/index.scss) | SCSS | 56 | 0 | 10 | 66 |
| [src/pages/CreateItem/index.tsx](/src/pages/CreateItem/index.tsx) | TypeScript JSX | 101 | 3 | 4 | 108 |
| [src/pages/DatasetDetails/components/DatasetFilesTable/index.tsx](/src/pages/DatasetDetails/components/DatasetFilesTable/index.tsx) | TypeScript JSX | 2 | 0 | 0 | 2 |
| [src/pages/Dataset/DatasetLabel/index.css](/src/pages/Dataset/DatasetLabel/index.css) | CSS | -38 | -3 | -7 | -48 |
| [src/pages/Dataset/DatasetLabel/index.scss](/src/pages/Dataset/DatasetLabel/index.scss) | SCSS | 38 | 0 | 8 | 46 |
| [src/pages/Dataset/DatasetList/index.css](/src/pages/Dataset/DatasetList/index.css) | CSS | -6 | 0 | 0 | -6 |
| [src/pages/Dataset/DatasetList/index.scss](/src/pages/Dataset/DatasetList/index.scss) | SCSS | 6 | 0 | 0 | 6 |
| [src/pages/Dataset/DatasetList/index.tsx](/src/pages/Dataset/DatasetList/index.tsx) | TypeScript JSX | 7 | 0 | 0 | 7 |
| [src/pages/Dataset/ListItem/index.tsx](/src/pages/Dataset/ListItem/index.tsx) | TypeScript JSX | -20 | 0 | -3 | -23 |
| [src/pages/Dataset/ListPagination/index.tsx](/src/pages/Dataset/ListPagination/index.tsx) | TypeScript JSX | 0 | 0 | -1 | -1 |
| [src/pages/Doc/index.css](/src/pages/Doc/index.css) | CSS | -3 | 0 | 0 | -3 |
| [src/pages/Doc/index.scss](/src/pages/Doc/index.scss) | SCSS | 10 | 0 | 1 | 11 |
| [src/pages/Doc/index.tsx](/src/pages/Doc/index.tsx) | TypeScript JSX | 38 | -1 | 1 | 38 |
| [src/pages/Home/HomeLoggedIn/index.scss](/src/pages/Home/HomeLoggedIn/index.scss) | SCSS | 39 | 2 | 8 | 49 |
| [src/pages/Home/HomeLoggedIn/index.tsx](/src/pages/Home/HomeLoggedIn/index.tsx) | TypeScript JSX | 160 | 1 | 10 | 171 |
| [src/pages/Home/index.tsx](/src/pages/Home/index.tsx) | TypeScript JSX | -6 | 6 | -1 | -1 |
| [src/pages/Login/index.css](/src/pages/Login/index.css) | CSS | -45 | 0 | -8 | -53 |
| [src/pages/Login/index.scss](/src/pages/Login/index.scss) | SCSS | 47 | 0 | 8 | 55 |
| [src/pages/Login/index.tsx](/src/pages/Login/index.tsx) | TypeScript JSX | 2 | 0 | -1 | 1 |
| [src/pages/ModelDetails/components/ModelCard/index.css](/src/pages/ModelDetails/components/ModelCard/index.css) | CSS | -23 | 0 | -6 | -29 |
| [src/pages/ModelDetails/components/ModelCard/index.scss](/src/pages/ModelDetails/components/ModelCard/index.scss) | SCSS | 23 | 0 | 6 | 29 |
| [src/pages/ModelDetails/components/ModelFilesTable/index.css](/src/pages/ModelDetails/components/ModelFilesTable/index.css) | CSS | -61 | 0 | -18 | -79 |
| [src/pages/ModelDetails/components/ModelFilesTable/index.scss](/src/pages/ModelDetails/components/ModelFilesTable/index.scss) | SCSS | 45 | 0 | 13 | 58 |
| [src/pages/ModelDetails/components/ModelFilesTable/index.tsx](/src/pages/ModelDetails/components/ModelFilesTable/index.tsx) | TypeScript JSX | -5 | 2 | -3 | -6 |
| [src/pages/ModelDetails/index.css](/src/pages/ModelDetails/index.css) | CSS | -23 | 0 | -4 | -27 |
| [src/pages/ModelDetails/index.scss](/src/pages/ModelDetails/index.scss) | SCSS | 28 | 0 | 5 | 33 |
| [src/pages/ModelDetails/index.tsx](/src/pages/ModelDetails/index.tsx) | TypeScript JSX | -2 | 0 | -2 | -4 |
| [src/pages/Model/ListHeader/index.css](/src/pages/Model/ListHeader/index.css) | CSS | -16 | -1 | -3 | -20 |
| [src/pages/Model/ListHeader/index.scss](/src/pages/Model/ListHeader/index.scss) | SCSS | 16 | 1 | 3 | 20 |
| [src/pages/Model/ListHeader/index.tsx](/src/pages/Model/ListHeader/index.tsx) | TypeScript JSX | 0 | 0 | -2 | -2 |
| [src/pages/Model/ListItem/index.tsx](/src/pages/Model/ListItem/index.tsx) | TypeScript JSX | -20 | 0 | -3 | -23 |
| [src/pages/Model/ListPagination/index.css](/src/pages/Model/ListPagination/index.css) | CSS | -6 | 0 | 0 | -6 |
| [src/pages/Model/ListPagination/index.scss](/src/pages/Model/ListPagination/index.scss) | SCSS | 6 | 0 | 0 | 6 |
| [src/pages/Model/ModelLabel/index.css](/src/pages/Model/ModelLabel/index.css) | CSS | -30 | -3 | -6 | -39 |
| [src/pages/Model/ModelLabel/index.scss](/src/pages/Model/ModelLabel/index.scss) | SCSS | 30 | 0 | 6 | 36 |
| [src/pages/Model/ModelList/index.css](/src/pages/Model/ModelList/index.css) | CSS | -5 | 0 | 0 | -5 |
| [src/pages/Model/ModelList/index.scss](/src/pages/Model/ModelList/index.scss) | SCSS | 5 | 0 | 0 | 5 |
| [src/pages/Model/ModelList/index.tsx](/src/pages/Model/ModelList/index.tsx) | TypeScript JSX | 7 | 0 | 1 | 8 |
| [src/pages/Model/index.css](/src/pages/Model/index.css) | CSS | -23 | 0 | -5 | -28 |
| [src/pages/Model/index.scss](/src/pages/Model/index.scss) | SCSS | 23 | 1 | 3 | 27 |
| [src/pages/Model/index.tsx](/src/pages/Model/index.tsx) | TypeScript JSX | 0 | -1 | 0 | -1 |
| [src/pages/Profile/index.scss](/src/pages/Profile/index.scss) | SCSS | 26 | 0 | 5 | 31 |
| [src/pages/Profile/index.tsx](/src/pages/Profile/index.tsx) | TypeScript JSX | 65 | 0 | 3 | 68 |
| [src/pages/Setting/index.tsx](/src/pages/Setting/index.tsx) | TypeScript JSX | 6 | 0 | 2 | 8 |
| [src/routes/index.tsx](/src/routes/index.tsx) | TypeScript JSX | 22 | 12 | 0 | 34 |
| [src/store/features/dataset/datasetSlice.ts](/src/store/features/dataset/datasetSlice.ts) | TypeScript | 0 | -2 | -2 | -4 |
| [src/store/features/fileContent/fileContentAPI.ts](/src/store/features/fileContent/fileContentAPI.ts) | TypeScript | 6 | 1 | 2 | 9 |
| [src/store/features/fileContent/fileContentSlice.ts](/src/store/features/fileContent/fileContentSlice.ts) | TypeScript | 34 | 29 | 13 | 76 |
| [src/store/features/login/loginSlice.ts](/src/store/features/login/loginSlice.ts) | TypeScript | 22 | -4 | 2 | 20 |
| [src/store/features/modelDetail/modelDetailSlice.ts](/src/store/features/modelDetail/modelDetailSlice.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/store/features/model/modelSlice.ts](/src/store/features/model/modelSlice.ts) | TypeScript | 9 | 8 | 0 | 17 |
| [src/store/features/personalFiles/personalFilesSlice.ts](/src/store/features/personalFiles/personalFilesSlice.ts) | TypeScript | -1 | 1 | 0 | 0 |
| [src/store/features/trendingList/trendingListAPI.ts](/src/store/features/trendingList/trendingListAPI.ts) | TypeScript | 5 | 1 | 3 | 9 |
| [src/store/features/trendingList/trendingListSlice.ts](/src/store/features/trendingList/trendingListSlice.ts) | TypeScript | 32 | 13 | 9 | 54 |
| [src/store/store.ts](/src/store/store.ts) | TypeScript | 4 | 0 | 0 | 4 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 26 | 0 | 1 | 27 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details