
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IUser} from "../../types/user";
interface AuthState {
    user: IUser | null;
    authenticated: boolean;
    loading: boolean;
    // Add other authentication-related state properties as needed
}



const initialState: AuthState = {
    user: null,
    authenticated: false,
    loading: true,
    // Initialize other authentication-related state properties
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.authenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.authenticated = false;
        },
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { setUser, clearUser, startLoading, finishLoading } = authSlice.actions;

export default authSlice.reducer;
