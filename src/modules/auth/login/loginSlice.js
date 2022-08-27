import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const logInSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    isOtpVerify: true,
    numberOfVerifyOtpFail: 0,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.numberOfVerifyOtpFail = 0;
    },
    needVerifyOtp: (state) => {
      state.isOtpVerify = true;
    },
    authSuccess: (state, action) => {
      state.isOtpVerify = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    verifyOtpFail: (state) => {
      state.numberOfVerifyOtpFail += 1;
    },
  },
});

export default logInSlice.reducer;
