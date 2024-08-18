import {createRoot} from 'react-dom/client'
import Viewer from './Viewer.tsx'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Index.tsx";
import {TopProvider} from "./Provider.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Home/>
        ),
    },
    {
        path: "view",
        element: <Viewer/>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <TopProvider>
        <RouterProvider router={router}/>
    </TopProvider>
)
