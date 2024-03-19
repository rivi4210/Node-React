import apiSlice from "../../../app/apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: '/user'
            }),
            providesTags: ["Users"]
        }),

        // }),
        deleteUser: build.mutation({
            query: (_id) => ({
                url: "/user",
                method: "DELETE",
                body: { "_id": _id }
            }),
            invalidatesTags: ['Users']
        }),
        addUser: build.mutation({
            query: (user) => ({
                url: "/user",
                method: "POST",
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: "/user",
                method: "PUT",
                body: user
                // headers:{"autorization":}
            }),
            invalidatesTags: ['Users']
        }),
    }),
})


// })
export const {
    useGetUsersQuery, useDeleteUserMutation,

    useUpdateUserMutation, useAddUserMutation
} = usersApiSlice