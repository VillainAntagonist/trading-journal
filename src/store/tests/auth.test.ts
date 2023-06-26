import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import authReducer, { setUser, clearUser, startLoading, finishLoading } from "../reducers/auth";

describe('authSlice', () => {
    let initialState: { user: IUser | null; loading: boolean; authenticated: boolean };

    beforeEach(() => {
        initialState = {
            user: null,
            loading: false,
            authenticated: false,
        };
    });

    it('should handle setUser', () => {
        const user: IUser = { id: '1', name: 'John Doe' };
        const action: PayloadAction<IUser> = setUser(user);

        const newState = authReducer(initialState, action);

        expect(newState.user).toEqual(user);
    });

    it('should handle clearUser', () => {
        initialState.user = { id: '1', name: 'John Doe' };

        const action: PayloadAction<void> = clearUser();

        const newState = authReducer(initialState, action);

        expect(newState.user).toBeNull();
    });

    it('should handle startLoading', () => {
        const action: PayloadAction<void> = startLoading();

        const newState = authReducer(initialState, action);

        expect(newState.loading).toBe(true);
    });

    it('should handle finishLoading', () => {
        initialState.loading = true;

        const action: PayloadAction<void> = finishLoading();

        const newState = authReducer(initialState, action);

        expect(newState.loading).toBe(false);
    });
});
