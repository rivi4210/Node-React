 import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

 const apiSlice=createApi({
      reducerPath:'api',
      baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5225',
        credentials:'include',
        prepareHeaders: (headers, { getState }) => {
          const token = getState().auth.token
          if (token) {
          headers.set("authorization", `Bearer ${token}`)
          }
          const user = getState().auth.user
          if (user) {
          headers.set("user", user)
          }
          return headers
          }
    }),
    endpoints:()=>({})
 })
 export default apiSlice