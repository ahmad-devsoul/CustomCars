import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "@/libs/utils/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_ROUTES.BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },

  prepareHeaders: (headers, {}) => {
    // const token = getCookie("auth-token");
    // console.log("token", token);

    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }

    return headers;
  },
});
export const api = createApi({
  baseQuery: baseQuery,
  keepUnusedDataFor: 5,
  endpoints: () => ({}),
});

