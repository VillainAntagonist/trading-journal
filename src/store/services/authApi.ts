import {rawBaseQuery} from "../baseURL";
import {clearUser, finishLoading, setUser, startLoading} from "../reducers/auth";
import {createApi} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: rawBaseQuery,
    endpoints: (builder) => ({
        // Define your authentication endpoints here
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        authenticate: builder.query({
            query: () => "user",
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                dispatch(startLoading());
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser( data ));
                } catch (err) {}
                dispatch(finishLoading());
            },
        }),
        logout: builder.mutation({
            query() {
                return {
                    url: "auth/logout",
                    credentials: "include",
                };
            },
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                dispatch(startLoading());
                try {
                    await queryFulfilled;
                    dispatch(clearUser);
                } catch (err) {}
                dispatch(finishLoading());
            },
        }),    }),

});

export const { useLoginMutation, useAuthenticateQuery, useLogoutMutation } = authApi;
