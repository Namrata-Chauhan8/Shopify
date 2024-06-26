import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/account/Login";
import Signup from "../pages/account/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "forgot-password",
                element: <div>Forgot Password</div>,
            }
        ],
    },
]);

export default router