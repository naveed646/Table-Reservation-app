import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import reservationReducer from "../redux/reservations/reservationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reservations: reservationReducer,
  },
});
