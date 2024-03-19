// import { GetDefaultMiddleware} from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "../Components/auth/authSlice"


const store=configureStore({
    reducer:{
        auth: authSliceReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(GetDefaultMiddleware)=>GetDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store
