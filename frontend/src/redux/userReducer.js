import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "Menti_user",
  initialState: {
    userDetails: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload;
      localStorage.setItem("Menti_User", action.payload);
    },
    logout: (state, action) => {
      state.isUserLoggedIn = false;
      state.userInfo = {};
      localStorage.removeItem("chat_me_user");
    },
  },
});

export const userReducer = userSlice.reducer;
export const { login, logout } = userSlice.actions;
