// import { createSlice } from '@reduxjs/toolkit'
// export const LoginSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: localStorage.getItem("token") || undefined,
//   },
//   reducers: {
//     setToken: (state,action) => {
//       state.token=action.payload.token;
//     },
//     logout : (state) => {
//       state.token = undefined;
//     }
//   },
// })

// export const { setToken, logout } = LoginSlice.actions

// export default LoginSlice.reducer


import { createSlice } from '@reduxjs/toolkit'
export const LoginSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("token") || undefined,
    userId: localStorage.getItem("userId") || undefined,
    userEmail: localStorage.getItem("userEmail") || undefined,
    userRole : localStorage.getItem("userRole") || undefined
  },
  reducers: {
    setToken: (state,action) => {
      state.token=action.payload.token;
      state.userRole=action.payload.userRole;
      state.userId=action.payload.userId;
      state.userEmail=action.payload.userEmail;
    },
    logout : (state) => {
      state.token = undefined;
      state.userRole=null;
      state.userId=null;
      state.userEmail=null;
    }
  },
})

export const { setToken, logout } = LoginSlice.actions

export default LoginSlice.reducer