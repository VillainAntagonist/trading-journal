import React, {FC} from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import Main from "../pages/Main";

const Router: FC = () => {
    return useRoutes([
        {path: '/', element: <Navigate to="/main"/>},
        {children: [{
            path: '/main', element: <Main/>
            }]}
    ])
};

export default Router;
