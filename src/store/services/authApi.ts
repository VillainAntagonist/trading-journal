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
                url: '/user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        authenticate: builder.query({
            query: () => "user/auth",
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
                    url: "user/logout",
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

export const { useLoginMutation, useAuthenticateQuery, useLogoutMutation, useLazyAuthenticateQuery } = authApi;
