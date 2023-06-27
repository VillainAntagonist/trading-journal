import React, {FC} from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import Main from "../pages/Main";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Login from "../pages/Login";
import AuthLayout from "../layouts/authenticated";
import Loading from "../components/Loading";
import {useLazyAuthenticateQuery} from "../store/services/authApi";

const Router: FC = () => {
    useLazyAuthenticateQuery()
    // @ts-ignore
    const { authenticated,loading } = useTypedSelector(state => state.auth);

    return useRoutes([
        {
            path: "/",
            element: loading ? (
                <Loading />
            ) : authenticated ? (
                <AuthLayout />
            ) : (
                <Navigate to="/login"  />
            ),
            children: [
                { path: "/", element: <Navigate to="/main" replace /> },
                { path: "/main", element: <Main /> },
                { path: "/trades", element: <div>Trades will be here</div>},
            ],
        },
        {path:  "/login", element: loading ? (
                <Loading />
            ) : authenticated ? (
                <Navigate to="/main"  />
            ) : (
                <Login />
            ),}
    ]);
};

export default Router;
