import {fetchBaseQuery} from "@reduxjs/toolkit/query";

const baseUrl = process.env.API_HOST

export const rawBaseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
});
