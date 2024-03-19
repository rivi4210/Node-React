import apiSlice from "../../../app/apiSlice";

const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getQuestionByIdLess: build.query({
            query: (_id) => ({
                url: '/question/lesson/'.concat(_id)
            }),
            providesTags: ["Question"]
        }),

    }),
})


// })
export const { useGetQuestionByIdLessQuery } = questionApiSlice