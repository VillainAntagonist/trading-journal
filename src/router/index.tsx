import React, {FC, useEffect} from 'react';
import {Navigate, useLocation, useRoutes} from "react-router-dom";
import Main from "../pages/Main";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Login from "../pages/Login";
import AuthLayout from "../layouts/authenticated";
import Loading from "../components/Loading";
import {useAuthenticateQuery} from "../store/services/authApi";
import NotFound from "../pages/NotFound";

const Router: FC = () => {

     useAuthenticateQuery("")
    const { authenticated,loading } = useTypedSelector(state => state.auth);
    const location = useLocation();


    const pathname = location.pathname + location.search;
    return useRoutes([
        {
            path: "/",
            element: loading ? (
                <Loading />
            ) : authenticated ? (
                <AuthLayout />
            ) : (
                <Navigate to="/login" state={pathname} />
            ),
            children: [
                { path: "/", element: <Navigate to="/main" replace /> },
                { path: "/main", element: <Main /> },
                { path: "/trades", element: <div>Trades will be here</div>},
                {path: "/404", element: <NotFound/>},
                {path: "*", element: <Navigate to="404" />},
            ],
        },
        {path:  "/login", element: loading ? (
                <Loading />
            ) : (
                <Login />
            ),}
    ]);
};

export default Router;
