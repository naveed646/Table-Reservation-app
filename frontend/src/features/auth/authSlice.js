import { createSlice } from "@reduxjs/toolkit";


let savedUser = null;
try {
  const stored = localStorage.getItem("user");
  if (stored && stored !== "undefined") {
    savedUser = JSON.parse(stored);
  }
} catch {
  savedUser = null;
}

const initialState = {
  user: savedUser, // will store user id, name etc..
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
