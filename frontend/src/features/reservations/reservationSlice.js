import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllReservations,
  getMyReservations,
  updateReservationStatus,
} from "../../api/reservation";


export const fetchAllReservations = createAsyncThunk(
  "reservations/fetchAll",
  async () => {
    return await getAllReservations();
  }
);

export const fetchMyReservations = createAsyncThunk(
  "reservations/fetchMine",
  async () => {
    return await getMyReservations();
  }
);

export const changeReservationStatus = createAsyncThunk(
  "reservations/changeStatus",
  async ({ id, status }) => {
    const updated = await updateReservationStatus(id, status);
    return updated;
  }
);


const reservationSlice = createSlice({
  name: "reservations",
  initialState: {
    all: [], // for admin
    mine: [], // for user
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All reservations
      .addCase(fetchAllReservations.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      // My reservations
      .addCase(fetchMyReservations.fulfilled, (state, action) => {
        state.mine = action.payload;
      })
      // Update status
      .addCase(changeReservationStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        // Update in all
        state.all = state.all.map((r) =>
          r._id === updated._id ? updated : r
        );
        // Update in mine
        state.mine = state.mine.map((r) =>
          r._id === updated._id ? updated : r
        );
      });
  },
});

export default reservationSlice.reducer;
