import apiSlice from "../../../app/apiSlice";

const lessonsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // getLesson: build.query({
        //     query: () => ({
        //         url: '/lesson'
        //     }),
        //     providesTags: ["Lessons"]
        // }),

        getLessonByLevel: build.query({
            query: (level) => ({
                url: '/lesson/level/'.concat(level)
            }),
            providesTags: ["Lessons"]
        }),

        // }),
        // deleteLesson: build.mutation({
        //     query: (_id) => ({
        //         url: "/lesson",
        //         method: "DELETE",
        //         body: { "_id": _id }
        //     }),
        //     invalidatesTags: ['Lessons']
        // }),
        // addLesson: build.mutation({
        //     query: (lesson) => ({
        //         url: "/lesson",
        //         method: "POST",
        //         body: lesson
        //     }),
        //     invalidatesTags: ['Lessons']
        // }),
        // updateLesson: build.mutation({
        //     query: (lesson) => ({
        //         url: "/lesson",
        //         method: "PUT",
        //         body: lesson
        //         // headers:{"autorization":}
        //     }),
        //     invalidatesTags: ['Lessons']
        // }),
    }),
})


// })
export const {
    // useGetLessonQuery, useDeleteLessonMutation,useUpdateLessonMutation, useAddLessonMutation,
    useGetLessonByLevelQuery
} = lessonsApiSlice