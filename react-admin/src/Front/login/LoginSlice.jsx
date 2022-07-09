import { createSlice } from '@reduxjs/toolkit'
export const LoginSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("token") || undefined,
  },
  reducers: {
    setToken: (state,action) => {
      state.token=action.payload.token;
    },
    logout : (state) => {
      state.token = undefined;
    }
  },
})

export const { setToken, logout } = LoginSlice.actions

export default LoginSlice.reducer