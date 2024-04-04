import apiSlice from "../../../app/apiSlice";

const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getUser:build.query({
            query:()=>({
                url:'/user/'.concat(0),
            }),
            providesTags: ["User"]
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: "/user",
                method: "PUT",
                body: user
                // headers:{"autorization":}
            }),
            invalidatesTags: ['User']
        }),
    }),
})
export const{ 
    useGetUserQuery,useUpdateUserMutation
}=userApiSlice
