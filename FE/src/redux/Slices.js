import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loginInfo: null,
  staffInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
    setLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
    },
    clearLoginInfo: (state) => {
      state.loginInfo = null;
    },
    setStaffInfo: (state, action) => {
      state.staffInfo = action.payload;
    },
    clearStaffInfo: (state) => {
      state.staffInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo,setLoginInfo, clearLoginInfo, setStaffInfo, clearStaffInfo } = userSlice.actions;

export default userSlice.reducer;
