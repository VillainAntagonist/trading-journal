// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./reducers/auth"
import notificationReducer from "./reducers/notifications";
import {authApi} from "./services/authApi";
import errorNotification from "./middlewares/errorNotification";
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            errorNotification
        )
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
