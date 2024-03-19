import apiSlice from "../../../app/apiSlice";

const wordApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getQuestionByIdLess: build.query({
            query: (_id) => ({
                url: '/question/lesson/'.concat(_id)
            }),
            providesTags: ["Question"]
        }),
        getQuestionById: build.query({
            query: (_id) => ({
                url: '/question/lesson/'.concat(_id)
            }),
            providesTags: ["Question"]
        }),
        // }),
        deleteQuestion: build.mutation({
            query: (_id) => ({
                url: "/question",
                method: "DELETE",
                body: { "_id": _id }
            }),
            invalidatesTags: ['Question']
        }),
        addQestion: build.mutation({
            query: (question) => ({
                url: "/question",
                method: "POST",
                body: question
            }),
            invalidatesTags: ['Question']
        }),
        updateQuestion: build.mutation({
            query: (question) => ({
                url: "/question",
                method: "PUT",
                body: question
                // headers:{"autorization":}
            }),
            invalidatesTags: ['Question']
        }),
    }),
})


// })
export const { useAddQestionMutation, useDeleteQuestionMutation, useUpdateQuestionMutation, useGetQuestionByIdLessQuery } = wordApiSlice