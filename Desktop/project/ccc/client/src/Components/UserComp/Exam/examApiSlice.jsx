import apiSlice from "../../../app/apiSlice";

const examApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getExam:build.query({
            query:(id)=>({
                url:'/exam/myExams/'.concat(id),
            }),
            providesTags: ["Exams"]
        }),


        updateExam: build.mutation({
            query: (exam) => ({
                url: "/exam/".concat(exam.lesson),
                method: "POST",
                body: {exam}
            }),
            invalidatesTags: ['Exams']
        }),
    }),
})


// })
export const { useUpdateExamMutation,useGetExamQuery } = examApiSlice