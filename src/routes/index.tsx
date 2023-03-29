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
import ItemCard from "../pages/ItemDetails/components/ItemCard";
import ItemFilesTable from "../pages/ItemDetails/components/ItemFilesTable";
import SignUp from "../pages/SignUp";

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
                    path: "/signUp",
                    element: <SignUp />,
                },
                {
                    path: "/welcome",
                    element: <Welcome />,
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
                    path: "dataset/:search",
                    element: <ItemDetails type='dataset' />,
                    // loader: (params) => params,
                    children: [
                        {
                            path: "",
                            element: <ItemCard />,

                        },
                        {
                            path: "tree/*",
                            element: <ItemFilesTable type='dataset' />,
                        },
                        {
                            path: "commit",
                            element: <Commit />
                        },
                        {
                            path: "blob/*",
                            element: <CodeDisplay />
                        },
                        {
                            path: "edit/*",
                            element: <CodeEditor />
                        }
                    ]
                },
                {
                    path: "model/:search",
                    element: <ItemDetails type='model' />,
                    // loader: (params) => params,
                    children: [
                        {
                            path: "",
                            element: <ItemCard />,

                        },
                        {
                            path: "tree/*",
                            element: <ItemFilesTable type='model' />,
                        },
                        {
                            path: "commit",
                            element: <Commit />
                        },
                        {
                            path: "blob/*",
                            element: <CodeDisplay />
                        },
                        {
                            path: "edit/*",
                            element: <CodeEditor />
                        }
                    ]
                },
            ]
        },
    ]
)

export default router;