import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";
import Register from "../pages/Register.tsx";
import Login from "../pages/Login.tsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },
]);

export default router;
