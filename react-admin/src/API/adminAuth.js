import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constant/appConstant'


// Define a service using a base URL and expected endpoints
export const adminAuthApi = createApi({
  reducerPath: 'adminAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    signIn:builder.mutation({
        query:(payload)=>{
          return {
            url : "/login",
            method : "post",
            body:payload,
        }
      }
    })
  }),
})

export const { useSignInMutation } = adminAuthApi