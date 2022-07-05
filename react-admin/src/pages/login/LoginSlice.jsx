import { createSlice } from '@reduxjs/toolkit'
export const LoginSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    token: localStorage.getItem("auth_token") || undefined,
  },
  reducers: {
    setToken: (state,action) => {
      state.token=action.payload.token;
    },
    makeLogout : (state) => {
      state.token = undefined;
    }
  },
})

export const { setToken, makeLogout } = LoginSlice.actions

export default LoginSlice.reducer