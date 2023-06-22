import React, {FC} from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import Main from "../pages/Main";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Login from "../pages/Login";

const Router: FC = () => {
    const { authenticated } = useTypedSelector(state => state.auth);

    return useRoutes([
        { path: '/', element: authenticated ? <Navigate to="/main" /> : <Navigate to="/login" /> },
        { path: '/login', element: <Login /> },
        {
            path: '/main',
            element: authenticated ? <Main /> : <Navigate to="/login" />,
        },
    ]);
};

export default Router;
