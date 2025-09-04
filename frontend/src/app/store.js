import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import reservationReducer from "../redux/reservations/reservationSlice";
import contactInfoReducer from "../redux/contactInfo/contactInfoSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reservations: reservationReducer,
     contactInfo: contactInfoReducer,
  },
});
