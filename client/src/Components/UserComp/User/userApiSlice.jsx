import apiSlice from "../../../app/apiSlice";

const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getUser:build.query({
            query:()=>({
                url:'/user/'.concat(0),
            }),
            providesTags: ["User"]
        }),
    }),
})
export const{ 
    useGetUserQuery
}=userApiSlice
