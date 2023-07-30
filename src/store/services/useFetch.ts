import {createApi} from "@reduxjs/toolkit/query/react";
import {rawBaseQuery} from "../baseURL";

export const useFetch = createApi({
    reducerPath: "useFetch",
    baseQuery: rawBaseQuery,
    endpoints: (builder) => ({
        get: builder.query({
            query: (arg) => `${typeof arg === "string" ? arg : arg.url}`,
            providesTags: (result, error, arg) => {
                const tags = arg.tag ? [].concat(arg.tag) : [arg.split("/")[0]];
                return ["all", ...tags];
            },
        }),
        getOptions: builder.query({
            query: ({url, labelName}) => url,
            transformResponse: (response: {_id: string, [key:string]:string}[],meta, {labelName}) => {
                return response.filter(item=>item[labelName]).map((item) => ({
                    value: item._id,
                    label: item[labelName],
                }));
            },
        }),
        post: builder.mutation({
            query({ url, tag, ...values }) {
                return {
                    url: url,
                    method: "POST",
                    body: values,
                };
            },
            invalidatesTags: (result, error, { url, tag = true }) => {
                let invalidateTag;
                if (tag) {
                    invalidateTag = typeof tag === "string" ? tag : url.split("/")[0];
                } else {
                    invalidateTag = "";
                }
                return [invalidateTag];
            },
        }),
        put: builder.mutation({
            query({ url, tag, ...values }) {
                return {
                    url: url,
                    method: "PUT",
                    body: values,
                };
            },
            invalidatesTags: (result, error, { url, tag = true }) => {
                let invalidateTag;
                if (tag) {
                    invalidateTag = typeof tag === "string" ? tag : url.split("/")[0];
                } else {
                    invalidateTag = "";
                }
                return [invalidateTag];
            },
        }),
        patch: builder.mutation({
            query({ url, values }) {
                return {
                    url: url,
                    method: "PATCH",
                    body: values,
                };
            },
            invalidatesTags: (result, error, { url, tag = true }) => {
                let invalidateTag;
                if (tag) {
                    invalidateTag = typeof tag === "string" ? tag : url.split("/")[0];
                } else {
                    invalidateTag = "";
                }
                return [invalidateTag];
            },
        }),
        handleDelete: builder.mutation({
            query(arg) {
                return {
                    url: typeof arg === "string" ? arg : arg.url,
                    method: "DELETE",
                };
            },
            invalidatesTags: (result, error, { url, tag = true }) => {
                const invalidateTag = tag
                    ? typeof tag === "string"
                        ? tag
                        : url.split("/")[0]
                    : "";
              return  [invalidateTag];
            },
        }),
        handleDeleteMultiple: builder.mutation({
            query({ url, tag, values }) {
                return {
                    url: url,
                    method: "DELETE",
                    body: values,
                };
            },
            invalidatesTags: (result, error, { url, tag = true }) => {
                const invalidateTag = tag
                    ? typeof tag === "string"
                        ? tag
                        : url.split("/")[0]
                    : "";
                return  [invalidateTag];
            },
        })
    })});

export const { useGetQuery, usePostMutation, usePutMutation, usePatchMutation, useHandleDeleteMutation, useHandleDeleteMultipleMutation, useGetOptionsQuery } = useFetch;
