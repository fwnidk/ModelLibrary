import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Doc from "../pages/Doc";
import ModelDetails from "../pages/ModelDetails";
import ModelCard from "../pages/ModelDetails/components/ModelCard";
import ModelFilesTable from "../pages/ModelDetails/components/ModelFilesTable";
import DatasetDetails from "../pages/DatasetDetails";
import App from "../App";
import DatasetCard from "../pages/DatasetDetails/components/DatasetCard";
import DatasetFilesTable from "../pages/DatasetDetails/components/DatasetFilesTable";
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";
import CreateItem from "../pages/CreateItem";
import Commit from "../components/Commit";
import CodeDisplay from "../components/CodeDisplay";
import CodeEditor from "../components/CodeEditor";
import Item from "../pages/Item";

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
                    path: "/login",
                    element: <Login />,
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


                // {

                // },
                {
                    path: "model/:search",
                    element: <ModelDetails />,
                    // loader: (params) => params,
                    children: [
                        {
                            path: "",
                            element: <ModelCard />,

                        },
                        {
                            path: "tree/*",
                            element: <ModelFilesTable />,
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
                    path: "dataset/:search",
                    element: <DatasetDetails />,
                    // loader: (params) => params,
                    children: [
                        {
                            path: "",
                            element: <DatasetCard />,

                        },
                        {
                            path: "tree/*",
                            element: <DatasetFilesTable />,
                        }
                    ]
                },
            ]
        },
    ]
)

export default router;