import { createSlice } from "@reduxjs/toolkit";

interface BookingState {
  carType: string;
  serviceType: string;
  selectedServices: number[];
  slot: {
    date: string; // Store as an ISO string
    time: string;
  };
  paymentDetails: {
    name: string;
    phone: string;
    paymentMethod: string;
  },
  discount: number;
  voucherCode: string;
}

const initialState: BookingState = {
  carType: "SEDAN",
  serviceType: "POLISHING",
  selectedServices: [],
  slot: {
    date: new Date().toISOString(), // Store as a string
    time: "12:00 PM",
  },
  paymentDetails: {
    name: "",
    phone: "",
    paymentMethod: "",
  },
  discount: 0,
  voucherCode: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCarType: (state, action) => {
      state.carType = action.payload;
    },
    setServiceType: (state, action) => {
      state.serviceType = action.payload;
    },
    setSelectedServices: (state, action) => {
      state.selectedServices = action.payload;
    },
    setSlot: (state, action) => {
      state.slot = {
        ...state.slot,
        ...action.payload,
      };
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = {
        ...state.paymentDetails,
        ...action.payload,
      };
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setVoucherCode: (state, action) => {
      state.voucherCode = action.payload;
    },
  },
});

export const { setCarType, setServiceType, setSelectedServices, setSlot, setPaymentDetails, setDiscount, setVoucherCode } =
  bookingSlice.actions;
export default bookingSlice.reducer;