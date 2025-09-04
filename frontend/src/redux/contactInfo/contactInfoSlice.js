import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchContactInfo, updateContactInfo } from "../../api/contactInfo";

export const getContactInfo = createAsyncThunk("contactInfo/get", async () => {
  const res = await fetchContactInfo();
  return res.data;
});

export const saveContactInfo = createAsyncThunk("contactInfo/save", async (data) => {
  const res = await updateContactInfo(data);
  return res.data.info;
});

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: { info: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(getContactInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveContactInfo.fulfilled, (state, action) => {
        state.info = action.payload;
      });
  },
});

export default contactInfoSlice.reducer;
