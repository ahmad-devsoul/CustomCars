
import { API_ROUTES } from "@/libs/utils/constants";
import { api } from "./api";

export const storeApi = api.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.createBooking,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useCreateBookingMutation,
} = storeApi;
