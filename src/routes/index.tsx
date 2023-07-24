import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Doc from "../pages/Doc";
import App from "../App";
import LogIn from "../pages/LogIn";
import Welcome from "../pages/Welcome";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";
import CreateItem from "../pages/CreateItem";
import Commit from "../components/Commit";
import CodeDisplay from "../components/CodeDisplay";
import CodeEditor from "../components/CodeEditor";
import Item from "../pages/Item";
import ItemDetails from "../pages/ItemDetails";
import ItemCard from "../pages/ItemDetails/ItemCard";
import ItemFilesTable from "../pages/ItemDetails/ItemFilesTable";
import Register from "../pages/Register";
import Notification from "../pages/Notification";
import NewFile from "../pages/ItemDetails/NewFile";
import UploadFile from "../pages/ItemDetails/UploadFile";
import DeleteFile from "../pages/ItemDetails/DeleteFile";
import NotFoundPage from "../pages/NotFoundPage";
import NotLoggedIn from "../pages/NotLoggedIn";

const getChildrenArr = (type: string) => {
    return [
        {
            path: "",
            element: <ItemCard />,

        },
        {
            path: "tree/*",
            element: <ItemFilesTable type={type} />,
        },
        {
            path: "commit/*",
            element: <Commit />
        },
        {
            path: "blob/*",
            element: <CodeDisplay />
        },
        {
            path: "edit/*",
            element: <CodeEditor />
        },
        {
            path: "new/*",
            element: <NewFile />
        },
        {
            path: "upload/*",
            element: <UploadFile />
        },
        {
            path: "delete/*",
            element: <DeleteFile />
        },
    ]
}

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/home",
                    element: <Home />,
                },
                {
                    path: "/models",
                    element: <Item type="model" />
                },
                {
                    path: "/datasets",
                    element: <Item type="dataset" />
                },
                {
                    path: "/docs",
                    element: <Doc />,
                },
                {
                    path: "/logIn",
                    element: <LogIn />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
                {
                    path: "/welcome",
                    element: <Welcome />,
                },
                {
                    path: "/notification",
                    element: <Notification />,
                },
                {
                    path: "/setting",
                    element: <Setting />,
                },
                {
                    path: "/profile",
                    element: <Profile />,
                },
                {
                    path: "/createModel",
                    element: < CreateItem type="model" />,
                },
                {
                    path: "/createDataset",
                    element: < CreateItem type="dataset" />,
                },
                {
                    path: "/dataset/:search",
                    element: <ItemDetails type='dataset' />,
                    children: getChildrenArr('dataset')
                },
                {
                    path: "/model/:search",
                    element: <ItemDetails type='model' />,
                    children: getChildrenArr('model')
                },
                {
                    path: "/notLoggedin",
                    element: <NotLoggedIn/>,
                },
                {
                    path: "*",
                    element: <NotFoundPage/>,
                }
            ]
        },
    ]
)

export default router;