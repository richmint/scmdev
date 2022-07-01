import { createSlice } from '@reduxjs/toolkit'

export const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    loader:false,
    auth:undefined,
  },
  reducers: {
    fetch: (state) => ({
        loader:true,
        auth:undefined,
    }),
    success:(state,action)=>({
        loader:true,
        auth:action.payload,
    }),
    failure:(state)=>({
        loader:true,
        auth:undefined,
    })
  },
})

export const { fetch,success,failure } = LoginSlice.actions

export default LoginSlice.reducer